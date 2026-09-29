import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, saveDatabase } from '@/lib/db';
import { callMultimodalAI } from '@/lib/aiClient';
import { MotivatedSellerLead } from '@/types/skill';

function generateAutoContractForSeller(
  lead: MotivatedSellerLead,
  agreedPrice: number,
  buyerPartnerName: string,
  projectedFee: number
): string {
  const today = new Date().toISOString().split('T')[0];
  const endBuyerPrice = agreedPrice + projectedFee;

  return `===================================================================
PARTE 1: REAL ESTATE PURCHASE AND SALE AGREEMENT (PARA EL VENDEDOR)
===================================================================
Effective Date: ${today}
Strategy Applied: ${lead.leadSource} (SkillForge Automated Closer)

1. PARTIES TO AGREEMENT:
- Seller(s): ${lead.ownerName} ("Seller")
- Buyer: Tu Inversiones Wholesale LLC and/or assigns ("Buyer")

2. SUBJECT PROPERTY:
Seller agrees to sell and Buyer agrees to purchase the real property located at:
${lead.propertyAddress}, ${lead.cityState}
(Together with all improvements, fixtures, and appurtenances thereon).

3. AGREED PURCHASE PRICE & PAYOFF OF ARREARS/LIENS:
- Total Purchase Price: $${agreedPrice.toLocaleString()} USD (Payable in Cash at Closing)
- Existing Tax/Mortgage Arrears ($${lead.taxOrMortgageArrears.toLocaleString()} USD): To be paid off directly out of closing proceeds by the Title Company so Seller receives clear relief.
- Earnest Money Deposit (EMD): $100.00 USD to be deposited with Investor-Friendly Title Company (e.g. GoldKeyTC.com) within 5 business days after Inspection Period.

4. MANDATORY THIRD-PARTY ASSIGNMENT CLAUSE (CLÁUSULA DE TERCER COMPRADOR):
Buyer shall have the absolute and unrestricted right to market this Agreement and assign all rights, title, and interest herein to a third-party investor, partner, or Cash Buyer ("Assignee") for a net gain / Assignment Fee without requiring further consent from Seller. Upon assignment, the third-party Assignee shall fund the purchase and assume all closing obligations.

5. INSPECTION & DUE DILIGENCE CONTINGENCY PERIOD (100% RISK PROTECTION):
Buyer shall have fourteen (14) business days from the Effective Date to inspect the Property, verify title, and confirm final underwriting with Buyer's financial partners. Buyer may cancel this Agreement at Buyer's sole discretion prior to the end of the Inspection Period by written notice and receive a full refund of any Earnest Money Deposit.

6. AS-IS CONDITION & CLOSING COSTS:
Property is sold strictly "AS-IS, WHERE-IS" — Seller shall not be required to make any repairs, paint, or clean out the property. Buyer (or Buyer's Assignee) shall pay all standard closing costs, escrow fees, and an additional $500 Transaction Coordinator fee at closing.

SELLER SIGNATURE: _______________________________   Date: ${today}
Printed Name: ${lead.ownerName} | Phone: ${lead.phone}

BUYER SIGNATURE:  _______________________________   Date: ${today}
Printed Name: Tu Inversiones Wholesale LLC and/or assigns

===================================================================
PARTE 2: ASSIGNMENT OF CONTRACT (PARA EL TERCER COMPRADOR / CASH BUYER)
===================================================================
- Assignor (Original Buyer): Tu Inversiones Wholesale LLC
- Assignee (Third-Party Cash Buyer): ${buyerPartnerName}
- Property: ${lead.propertyAddress}, ${lead.cityState}
- Original Contract Price with Seller: $${agreedPrice.toLocaleString()} USD
- Total Price to Cash Buyer (Assignee): $${endBuyerPrice.toLocaleString()} USD
- YOUR NET ASSIGNMENT FEE (WIRE AT CLOSING): $${projectedFee.toLocaleString()} USD
- Required Non-Refundable EMD from Cash Buyer: $5,000.00 USD (due within 24 hours at Title Company)`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const db = getDatabase();
    if (!db.sellerLeads) db.sellerLeads = [];

    if (body.action === 'add_lead') {
      const arv = Number(body.estimatedArv || 250000);
      const asking = Number(body.askingOrAssessedPrice || arv);
      const arrears = Number(body.taxOrMortgageArrears || 0);
      const mao = Math.round(arv * 0.7 - 25000 - 15000);
      const lowball60 = Math.round(asking * 0.6);

      const newLead: MotivatedSellerLead = {
        id: `lead-${Date.now()}`,
        ownerName: body.ownerName || 'Propietario Motivado',
        propertyAddress: body.propertyAddress || '123 Main St',
        cityState: body.cityState || 'Tampa, FL',
        phone: body.phone || '(813) 555-0199',
        email: body.email || 'owner@example.com',
        leadSource: body.leadSource || 'Tax Foreclosure GIS',
        estimatedArv: arv,
        taxOrMortgageArrears: arrears,
        askingOrAssessedPrice: asking,
        recommendedMaoOffer: Math.max(20000, mao),
        lowball60Offer: Math.max(15000, lowball60),
        status: 'new',
        assignedBuyerName:
          db.cashBuyers?.[0]?.name || 'Red de Cash Buyers Verificados',
        assignmentFeeProjected: 15000,
      };

      db.sellerLeads.unshift(newLead);
      saveDatabase(db);
      return NextResponse.json({ success: true, db, lead: newLead });
    }

    if (body.action === 'mark_contacted' && body.leadId) {
      const lead = db.sellerLeads.find((l) => l.id === body.leadId);
      if (lead && lead.status === 'new') {
        lead.status = 'contacted_sms_email';
        saveDatabase(db);
      }
      return NextResponse.json({ success: true, db });
    }

    if (body.action === 'handle_seller_objection' && body.leadId) {
      const lead = db.sellerLeads.find((l) => l.id === body.leadId);
      if (!lead) {
        return NextResponse.json({ error: 'Lead no encontrado' }, { status: 404 });
      }

      const sellerObjection =
        body.sellerObjection ||
        'Tu oferta de ' +
          lead.lowball60Offer +
          ' es muy baja, ¿por qué tan poco y cómo sé que esto es real?';

      const systemPrompt = `Eres el Agente Cerrador de Llamadas número 1 de Wholesale Real Estate (entrenado con los guiones de Flip With Rick, Richard Taylor, Rowan Gill y Olivia Schremmer).
El vendedor de la propiedad en ${lead.propertyAddress} (${lead.cityState}) acaba de decir en la llamada: "${sellerObjection}".
Datos del trato:
- Nombre del vendedor: ${lead.ownerName}
- Fuente / Problema: ${lead.leadSource} (Deuda/Atrasos: $${lead.taxOrMortgageArrears.toLocaleString()})
- Valor ARV: $${lead.estimatedArv.toLocaleString()}
- Oferta Ancla 60%: $${lead.lowball60Offer.toLocaleString()} | Oferta Máxima (MAO): $${lead.recommendedMaoOffer.toLocaleString()}

Responde con LAS PALABRAS EXACTAS (en inglés y en español) que el agente debe decirle ahora mismo por teléfono para empatizar, derribar la objeción, usar el Reverse Price Anchor ("mi socio financiero") y hacer que diga SÍ al acuerdo hoy mismo.`;

      let aiRebuttal = '';
      try {
        aiRebuttal = await callMultimodalAI({
          systemPrompt,
          userPrompt: `Objeción del vendedor: "${sellerObjection}". Dame la respuesta ganadora para cerrar el trato ahora mismo.`,
        });
      } catch {
        aiRebuttal = `🇬🇧 RESPUESTA GANADORA (INGLÉS):
"I completely understand, ${lead.ownerName}. Look, if I were in your shoes I'd want the highest number possible too. The only reason my financial partner had us at $${lead.lowball60Offer.toLocaleString()} is because we're paying off the $${lead.taxOrMortgageArrears.toLocaleString()} arrears in full, covering 100% of closing costs, charging zero realtor commissions, and taking the house completely AS-IS so you don't have to fix or clean a single thing. If I fight with my partner right now to stretch our budget up to $${lead.recommendedMaoOffer.toLocaleString()} net to you so you can walk away clean this month, would you be ready to sign the 1-page agreement today?"

🇪🇸 RESPUESTA GANADORA (ESPAÑOL):
"Te entiendo perfectamente, ${lead.ownerName}. Si yo estuviera en tu lugar también querría el monto más alto posible. La única razón por la que mi socio financiero me puso en $${lead.lowball60Offer.toLocaleString()} es porque nosotros vamos a liquidar los $${lead.taxOrMortgageArrears.toLocaleString()} de atrasos, pagamos el 100% de los gastos de cierre, cero comisiones de realtor y recibimos la propiedad tal cual está (As-Is). Si peleo ahora mismo con mi socio para subir hasta $${lead.recommendedMaoOffer.toLocaleString()} libres para ti, ¿firmaríamos el acuerdo de 1 página hoy mismo?"`;
      }

      lead.status = 'in_call';
      saveDatabase(db);

      return NextResponse.json({
        success: true,
        aiRebuttal,
        db,
      });
    }

    if (body.action === 'deal_agreed_generate_contract' && body.leadId) {
      const lead = db.sellerLeads.find((l) => l.id === body.leadId);
      if (!lead) {
        return NextResponse.json({ error: 'Lead no encontrado' }, { status: 404 });
      }

      const finalPrice = Number(body.agreedPrice || lead.recommendedMaoOffer);
      const projectedFee = Number(body.assignmentFee || lead.assignmentFeeProjected || 15000);
      const buyerName =
        body.assignedBuyerName ||
        lead.assignedBuyerName ||
        db.cashBuyers?.[0]?.name ||
        'Cash Buyer Verificado LLC';

      lead.agreedPrice = finalPrice;
      lead.assignmentFeeProjected = projectedFee;
      lead.assignedBuyerName = buyerName;
      lead.status = 'deal_agreed_yes';
      lead.signedContractText = generateAutoContractForSeller(
        lead,
        finalPrice,
        buyerName,
        projectedFee
      );

      saveDatabase(db);

      return NextResponse.json({
        success: true,
        lead,
        contractText: lead.signedContractText,
        db,
      });
    }

    return NextResponse.json({ error: 'Acción inválida' }, { status: 400 });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : 'Error en Seller Outreach';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
