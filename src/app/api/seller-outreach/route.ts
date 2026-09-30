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
PARTE 1: REAL ESTATE PURCHASE AND SALE AGREEMENT (AS-IS)
===================================================================
Effective Date: ${today}
Strategy Applied: ${lead.leadSource} (AI Automated Services LLC Closing Engine)

1. PARTIES TO AGREEMENT:
- Seller(s): ${lead.ownerName} ("Seller")
- Buyer: AI Automated Services LLC and/or assigns ("Buyer")

2. SUBJECT PROPERTY:
Seller agrees to sell and Buyer agrees to purchase the real property located at:
${lead.propertyAddress}, ${lead.cityState}
(Together with all improvements, fixtures, and appurtenances thereon).

3. AGREED PURCHASE PRICE & PAYOFF OF ARREARS/LIENS:
- Total Purchase Price: $${agreedPrice.toLocaleString()} USD (Payable in Cash at Closing)
- Existing Tax/Mortgage Arrears ($${lead.taxOrMortgageArrears.toLocaleString()} USD): To be paid off directly out of closing proceeds by Title Company so Seller receives clear net funds.
- Earnest Money Deposit (EMD): $1,000.00 USD to be deposited with Investor-Friendly Title Company within 5 business days after inspection.

4. MANDATORY ASSIGNMENT & EQUITABLE INTEREST:
Buyer reserves the unencumbered and absolute right to assign, convey, or transfer this Agreement and all rights herein to any third-party investor, partner, or Cash Buyer ("Assignee") for a net assignment fee without requiring additional consent or approval from Seller.

5. INSPECTION & DUE DILIGENCE CONTINGENCY (100% ESCROW PROTECTION):
Buyer's obligation to close is expressly contingent upon Buyer's satisfactory inspection and approval of the Property, in Buyer's sole and absolute discretion, within fourteen (14) business days of the Effective Date. If Buyer determines that the physical condition, repair estimates, or partner underwriting is unsatisfactory, Buyer may terminate this Agreement by written notice to Seller prior to expiration, whereupon all earnest money deposits shall be returned immediately in full to Buyer without penalty.

6. AS-IS CONDITION & CLOSING COSTS:
Property is sold strictly "AS-IS, WHERE-IS". Seller shall not be required to make any repairs or clean out the property. Buyer (or Buyer's Assignee) shall pay all standard closing costs and title transfer charges.

SELLER SIGNATURE: _______________________________   Date: ${today}
Printed Name: ${lead.ownerName} | Phone: ${lead.phone}

BUYER SIGNATURE:  _______________________________   Date: ${today}
Printed Name: AI Automated Services LLC and/or assigns

===================================================================
PARTE 2: ASSIGNMENT OF CONTRACT (PARA EL CASH BUYER)
===================================================================
- Assignor (Original Buyer): AI Automated Services LLC
- Assignee (Third-Party Cash Buyer): ${buyerPartnerName}
- Property: ${lead.propertyAddress}, ${lead.cityState}
- Original Contract Price with Seller: $${agreedPrice.toLocaleString()} USD
- Total Price to Cash Buyer (Assignee): $${endBuyerPrice.toLocaleString()} USD
- YOUR NET ASSIGNMENT FEE (WIRE AT CLOSING): $${projectedFee.toLocaleString()} USD
- Required Non-Refundable EMD from Cash Buyer: $5,000.00 USD (due within 24 hours at Title Company)`;
}

function generatePriceAmendmentAddendum(
  lead: MotivatedSellerLead,
  originalPrice: number,
  newPrice: number,
  reductionAmount: number
): string {
  const today = new Date().toISOString().split('T')[0];
  return `===================================================================
PRICE AMENDMENT ADDENDUM TO PURCHASE AND SALE AGREEMENT (PLAN B)
===================================================================
Effective Date of Addendum: ${today}
Reference Contract Date: Executed Purchase Agreement for ${lead.propertyAddress}
Property Address: ${lead.propertyAddress}, ${lead.cityState}
Seller(s): ${lead.ownerName}
Buyer: AI Automated Services LLC and/or assigns

WHEREAS, Seller and Buyer previously entered into that certain Purchase and Sale Agreement ("Agreement") for the subject property; and
WHEREAS, Buyer's technical inspection and contractor due diligence conducted pursuant to Section 4 of the Agreement uncovered unforeseen structural, mechanical (HVAC), and/or roof repair requirements in the amount of approximately $${reductionAmount.toLocaleString()} USD; and
WHEREAS, the parties desire to modify the Purchase Price to reflect these physical condition findings so the transaction may proceed smoothly to immediate closing;

NOW, THEREFORE, for valuable consideration, Seller and Buyer mutually agree to amend the Agreement as follows:

1. MODIFICATION OF PURCHASE PRICE:
Section 3 of the Agreement is hereby amended. The Purchase Price is reduced from the original price of $${originalPrice.toLocaleString()} USD to the new, net walkaway price of:
   $${newPrice.toLocaleString()} USD (CASH AT CLOSING)

2. FULL WAIVER OF INSPECTION CONTINGENCY:
Upon execution of this Addendum, Buyer hereby waives any further inspection contingencies under Section 4 and confirms readiness to proceed to closing within seven (7) business days.

3. RATIFICATION OF REMAINING TERMS:
All other terms, conditions, and provisions of the original Agreement, including AS-IS conveyance, title requirements, and assignability, shall remain in full force and effect.

SELLER SIGNATURE: _______________________________   Date: ${today}
Printed Name: ${lead.ownerName}

BUYER SIGNATURE:  _______________________________   Date: ${today}
Printed Name: AI Automated Services LLC and/or assigns`;
}

function generateCancellationMutualRelease(
  lead: MotivatedSellerLead,
  originalPrice: number,
  reason: string
): string {
  const today = new Date().toISOString().split('T')[0];
  return `===================================================================
CANCELLATION AND MUTUAL RELEASE OF PURCHASE AGREEMENT (PLAN C)
===================================================================
Effective Date: ${today}
Property Address: ${lead.propertyAddress}, ${lead.cityState}
Seller(s): ${lead.ownerName}
Buyer: AI Automated Services LLC and/or assigns
Escrow / Title Company: Title One / Investor-Friendly Title Company
Reference Contract Purchase Price: $${originalPrice.toLocaleString()} USD

WHEREAS, Seller and Buyer executed that certain Purchase and Sale Agreement ("Agreement") dated for the real property described above; and
WHEREAS, Section 4 of said Agreement contains an express Inspection and Due Diligence Contingency granting Buyer the right to terminate said Agreement at Buyer's sole and absolute discretion prior to the expiration of the Inspection Period; and
WHEREAS, Buyer's inspection, contractor underwriting, and/or partner review was unsatisfactory to Buyer (${reason});

NOW, THEREFORE, the parties hereby agree as follows:

1. TERMINATION OF AGREEMENT:
The Purchase and Sale Agreement between Seller and Buyer is hereby terminated and deemed null, void, and of no further legal force or effect.

2. RELEASE OF EQUITABLE INTEREST:
Buyer hereby releases and relinquishes any and all right, title, claim, or equitable interest in or to the subject Property, restoring Seller to full and unencumbered ownership with the unrestricted right to market, list, or sell the property to any third party.

3. FULL REFUND OF EARNEST MONEY DEPOSIT (EMD):
Seller and Buyer hereby jointly instruct Escrow Agent / Title Company to immediately disburse and refund one hundred percent (100%) of all earnest money deposits held in escrow to Buyer (AI Automated Services LLC), without deductions, penalties, or delay.

4. MUTUAL RELEASE OF ALL CLAIMS:
Seller and Buyer, each for themselves and their respective heirs, successors, and assigns, do hereby completely release, acquit, and forever discharge each other from any and all claims, demands, liabilities, or causes of action arising out of or related to the Agreement.

SELLER SIGNATURE: _______________________________   Date: ${today}
Printed Name: ${lead.ownerName}

BUYER SIGNATURE:  _______________________________   Date: ${today}
Printed Name: AI Automated Services LLC and/or assigns`;
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

    // ACTION: PLAN B — RENEGOTIATE PRICE DROP (INSPECTION PRICE DROP ADDENDUM)
    if (body.action === 'renegotiate_price_drop' && body.leadId) {
      const lead = db.sellerLeads.find((l) => l.id === body.leadId);
      if (!lead) {
        return NextResponse.json({ error: 'Lead no encontrado' }, { status: 404 });
      }

      const originalPrice = Number(lead.agreedPrice || lead.recommendedMaoOffer || 62000);
      const reductionAmount = Number(body.reductionAmount || 12000);
      const newPrice = Math.max(10000, Number(body.newPrice || (originalPrice - reductionAmount)));

      lead.agreedPrice = newPrice;
      lead.status = 'renegotiation_pending';
      const addendumText = generatePriceAmendmentAddendum(
        lead,
        originalPrice,
        newPrice,
        reductionAmount
      );
      (lead as any).priceAddendumText = addendumText;
      saveDatabase(db);

      const smsScript = `Hola ${lead.ownerName}, soy Alex de AI Automated Services LLC. Nuestro equipo técnico finalizó la inspección en ${lead.propertyAddress} y reportó $${reductionAmount.toLocaleString()} en reparaciones imprevistas de techo y calefacción. Mis socios aprueban cerrar en 7 días al contado si ajustamos a $${newPrice.toLocaleString()} netos. ¿Revisamos el addendum de 1 página hoy?`;
      const emailScript = `Asunto: Addendum de Inspección — Ajuste de Precio a $${newPrice.toLocaleString()} (Cierre en 7 días) — ${lead.propertyAddress}\n\nEstimado ${lead.ownerName},\nAdjuntamos el Addendum de Enmienda de Precio tras el reporte técnico de contratistas. Reduciendo a $${newPrice.toLocaleString()} netos, liberamos todas las contingencias y cerramos la próxima semana sin comisiones.`;

      return NextResponse.json({
        success: true,
        lead,
        addendumText,
        smsScript,
        emailScript,
        newPrice,
        reductionAmount,
        db,
      });
    }

    // ACTION: PLAN C — CANCEL CONTRACT & MUTUAL RELEASE (WALK AWAY WITH 100% EMD REFUND)
    if (body.action === 'cancel_and_release' && body.leadId) {
      const lead = db.sellerLeads.find((l) => l.id === body.leadId);
      if (!lead) {
        return NextResponse.json({ error: 'Lead no encontrado' }, { status: 404 });
      }

      const originalPrice = Number(lead.agreedPrice || lead.recommendedMaoOffer || 62000);
      const reason = body.reason || 'Costos de renovación exceden parámetros de suscripción técnica según Sección 4';

      lead.status = 'cancelled_mutual_release';
      const mutualReleaseText = generateCancellationMutualRelease(
        lead,
        originalPrice,
        reason
      );
      (lead as any).mutualReleaseText = mutualReleaseText;
      saveDatabase(db);

      const smsScript = `Hola ${lead.ownerName}, soy Alex de AI Automated Services LLC. Te notifico con respeto que bajo la Sección 4 de inspección, nuestros socios no pudieron validar los costos de remodelación. Hemos firmado la Liberación Mutua para devolver el depósito de garantía y liberar tu propiedad de inmediato. Te deseamos mucho éxito.`;

      return NextResponse.json({
        success: true,
        lead,
        mutualReleaseText,
        smsScript,
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
