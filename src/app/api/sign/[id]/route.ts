import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, saveDatabase } from '@/lib/db';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = getDatabase();
    const lead = db.sellerLeads?.find((l) => l.id === id);

    if (!lead) {
      return NextResponse.json({ error: 'Contrato no encontrado' }, { status: 404 });
    }

    const contractText =
      lead.signedContractText ||
      `PURCHASE AND SALE AGREEMENT (STANDARD RESIDENTIAL WHOLESALE CONTRACT)
DATE: ${new Date().toLocaleDateString('en-US')}
SELLER: ${lead.ownerName}
BUYER: WholesalePlatform Capital LLC and/or Assigns (Buyer)
PROPERTY ADDRESS: ${lead.propertyAddress}, ${lead.cityState}

1. PURCHASE PRICE: Buyer agrees to pay Seller the total purchase price of $${(
        lead.agreedPrice || lead.recommendedMaoOffer
      ).toLocaleString()} USD, payable in cash or certified funds at closing.

2. CLOSING DATE & ESCROW: Closing shall take place on or before forty-five (45) business days from effective date at a licensed Investor-Friendly Title Company chosen by Buyer.

3. INSPECTION PERIOD: Buyer shall have a period of twenty-one (21) business days from effective date ("Inspection Period") to inspect property, verify title, obtain partner approvals, or conduct feasibility tests.

4. ASSIGNMENT CLAUSE (THIRD PARTY): Buyer expressly reserves the right to assign this Agreement and all rights hereunder to any third party for a net gain or assignment fee without release of liability or modification of terms.

5. AS-IS CONDITION: Seller warrants that property is being conveyed strictly in "AS-IS, WHERE-IS" condition, and Seller shall not be required to make any repairs, clean-outs, or modifications prior to closing.

6. ACCESS: Seller agrees to provide Buyer, Buyer's partners, contractors, and prospective end-buyers reasonable access to the property upon 24 hours notice for inspection purposes.`;

    return NextResponse.json({
      success: true,
      lead: {
        id: lead.id,
        ownerName: lead.ownerName,
        propertyAddress: lead.propertyAddress,
        cityState: lead.cityState,
        agreedPrice: lead.agreedPrice || lead.recommendedMaoOffer,
        status: lead.status,
        contractText,
        isSigned: lead.status === 'contract_signed',
        signedAt: (lead as any).signedAt || null,
        signerName: (lead as any).signerName || null,
        signatureImage: (lead as any).signatureImage || null,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Error en contrato' }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { signerName, signatureImage, agreedToTerms } = await req.json();

    if (!signerName || !signatureImage || !agreedToTerms) {
      return NextResponse.json(
        { error: 'Faltan campos obligatorios para firmar el contrato' },
        { status: 400 }
      );
    }

    const db = getDatabase();
    const leadIndex = db.sellerLeads?.findIndex((l) => l.id === id);

    if (leadIndex === undefined || leadIndex < 0 || !db.sellerLeads) {
      return NextResponse.json({ error: 'Lead no encontrado' }, { status: 404 });
    }

    const lead = db.sellerLeads[leadIndex];
    lead.status = 'contract_signed';
    (lead as any).signedAt = new Date().toISOString();
    (lead as any).signerName = signerName;
    (lead as any).signatureImage = signatureImage;
    (lead as any).signerIp = req.headers.get('x-forwarded-for') || '127.0.0.1';

    saveDatabase(db);

    return NextResponse.json({
      success: true,
      message: '¡Contrato firmado electrónicamente con éxito!',
      signedAt: (lead as any).signedAt,
      lead,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Error al firmar' }, { status: 500 });
  }
}
