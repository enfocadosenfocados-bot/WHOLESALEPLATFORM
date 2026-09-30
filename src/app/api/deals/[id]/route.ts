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
      return NextResponse.json({ error: 'Trato no encontrado' }, { status: 404 });
    }

    const arv = lead.estimatedArv || 320000;
    const purchasePrice = lead.agreedPrice || lead.recommendedMaoOffer || 180000;
    const targetAssignmentFee = lead.assignmentFeeProjected || 20000;
    const buyerAskingPrice = purchasePrice + targetAssignmentFee;
    const estimatedRehab = Math.round(arv * 0.15);
    const projectedBuyerProfit = arv - buyerAskingPrice - estimatedRehab - Math.round(arv * 0.08);

    const dealPacket = {
      id: lead.id,
      title: `Off-Market Wholesale Opportunity: ${lead.propertyAddress}`,
      propertyAddress: lead.propertyAddress,
      cityState: lead.cityState,
      specs: '3 Beds / 2 Baths / 1,450 SqFt (Single Family)',
      leadSource: lead.leadSource,
      financials: {
        buyerAskingPrice,
        arv,
        estimatedRehab,
        projectedBuyerProfit,
        roiPercentage: Math.round((projectedBuyerProfit / (buyerAskingPrice + estimatedRehab)) * 100),
        requiredEmd: 5000,
        titleCompany: 'Investor-Friendly Title & Escrow LLC (Clear & Marketable Title)',
      },
      status: lead.status,
      comps: [
        { address: 'Propiedad Comparable 1 (Vendida hace 32 días)', price: Math.round(arv * 0.98), dist: '0.2 millas', beds: '3/2' },
        { address: 'Propiedad Comparable 2 (Vendida hace 45 días)', price: Math.round(arv * 1.02), dist: '0.4 millas', beds: '3/2' },
        { address: 'Propiedad Comparable 3 (Vendida hace 60 días)', price: Math.round(arv * 0.96), dist: '0.5 millas', beds: '3/2' },
      ],
      offers: (lead as any).buyerOffers || [],
    };

    return NextResponse.json({ success: true, deal: dealPacket });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Error en deal' }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { buyerName, buyerEmail, buyerPhone, offerPrice, closingDays, proofOfFundsUrl, notes } =
      await req.json();

    if (!buyerName || !buyerEmail || !offerPrice) {
      return NextResponse.json({ error: 'Faltan datos obligatorios de la oferta' }, { status: 400 });
    }

    const db = getDatabase();
    const leadIndex = db.sellerLeads?.findIndex((l) => l.id === id);

    if (leadIndex === undefined || leadIndex < 0 || !db.sellerLeads) {
      return NextResponse.json({ error: 'Lead no encontrado' }, { status: 404 });
    }

    const lead = db.sellerLeads[leadIndex];
    if (!(lead as any).buyerOffers) {
      (lead as any).buyerOffers = [];
    }

    const newOffer = {
      id: `offer-${Date.now()}`,
      buyerName,
      buyerEmail,
      buyerPhone: buyerPhone || '',
      offerPrice: Number(offerPrice),
      closingDays: closingDays || '14 días',
      proofOfFundsUrl: proofOfFundsUrl || '',
      notes: notes || '',
      submittedAt: new Date().toISOString(),
    };

    (lead as any).buyerOffers.push(newOffer);
    saveDatabase(db);

    return NextResponse.json({
      success: true,
      message: '¡Oferta enviada con éxito! El equipo de Dispo revisará tus fondos en 1 hora.',
      offer: newOffer,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Error al guardar oferta' }, { status: 500 });
  }
}
