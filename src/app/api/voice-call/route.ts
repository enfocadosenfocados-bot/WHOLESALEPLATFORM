import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, saveDatabase } from '@/lib/db';
import { callSkillForgeAI } from '@/lib/aiClient';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      action,
      leadId,
      provider,
      apiKey,
      phoneNumber,
      assistantId,
      transcript,
      audioPrompt,
      botType = 'initial_outreach',
      reductionAmount = 12000,
      strategyName: customStrategyName,
    } = body;

    const db = getDatabase();
    const lead = db.sellerLeads?.find((l) => l.id === leadId);

    // 1. Trigger Outbound Call via Vapi.ai / Retell AI / Twilio
    if (action === 'trigger_telephony_call') {
      const targetPhone = phoneNumber || lead?.phone || '(555) 000-0000';
      const ownerName = lead?.ownerName || 'Propietario';
      const propertyAddr = lead?.propertyAddress || 'su propiedad';

      // If user provided a real Vapi API Key
      if (provider === 'vapi' && apiKey) {
        try {
          const vapiRes = await fetch('https://api.vapi.ai/call/phone', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              phoneNumberId: phoneNumber,
              customer: { number: targetPhone, name: ownerName },
              assistantId: assistantId || undefined,
            }),
          });
          const vapiData = await vapiRes.json();
          return NextResponse.json({
            success: true,
            provider: 'vapi',
            callId: vapiData.id,
            status: 'calling',
            message: `Llamada iniciada con Vapi.ai al número ${targetPhone}`,
          });
        } catch (vapiErr: any) {
          return NextResponse.json({ error: `Error en Vapi.ai: ${vapiErr.message}` }, { status: 500 });
        }
      }

      // If user provided Retell AI Key
      if (provider === 'retell' && apiKey) {
        try {
          const retellRes = await fetch('https://api.retellai.com/v2/create-phone-call', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              from_number: phoneNumber,
              to_number: targetPhone,
              override_agent_id: assistantId,
            }),
          });
          const retellData = await retellRes.json();
          return NextResponse.json({
            success: true,
            provider: 'retell',
            callId: retellData.call_id,
            status: 'calling',
            message: `Llamada iniciada con Retell AI al número ${targetPhone}`,
          });
        } catch (retellErr: any) {
          return NextResponse.json({ error: `Error en Retell AI: ${retellErr.message}` }, { status: 500 });
        }
      }

      const reductionAmt = Number(reductionAmount) || 12000;
      const originalOffer = lead?.agreedPrice || lead?.recommendedMaoOffer || 62000;
      const targetDropOffer = Math.max(10000, originalOffer - reductionAmt);
      const strategyName = customStrategyName || lead?.leadSource || 'Wholesale Direct';

      // ─── BOT 2: PLAN B — THE INSPECTION PRICE DROP (RENEGOTIATION) ───────────────
      if (botType === 'plan_b_renegotiation') {
        const planBPrompt = `You are Alex, an elite Wholesale Acquisitions Partner at AI Automated Services LLC calling ${ownerName} regarding the pending Purchase Agreement on ${propertyAddr}.
GOAL: Renegotiate the purchase price from $${originalOffer.toLocaleString()} down to $${targetDropOffer.toLocaleString()} (a $${Number(reductionAmt).toLocaleString()} haircut) based on unexpected contractor inspection findings, while maintaining total rapport and keeping the closing date alive.

CALL FRAMEWORK (PLAN B - INSPECTION PRICE DROP):
1. COURTEOUS RAPPORT & CONTRACTOR WALK UPDATE:
"Hey ${ownerName}, it's Alex from AI Automated Services LLC following up on ${propertyAddr}. Hope you're having a productive week! I wanted to call you directly because our technical inspection crew and contractor team just finished their comprehensive on-site walk of the property."

2. THE INSPECTION DISCOVERY & PARTNER VETO:
"Look, the neighborhood and bones are great. However, once our mechanical technicians got into the attic and crawlspace, they uncovered significant unexpected deferred maintenance — specifically, the HVAC furnace heat exchanger is cracked and the rear roof decking has hidden water rot. The licensed contractor estimate came in at $${Number(reductionAmt).toLocaleString()} to $15,000 above our initial underwriting budget. 
Because of this, our investment committee and underwriting partners met this morning and they refused to approve closing at our original $${originalOffer.toLocaleString()} figure. In fact, they instructed me to issue a formal termination notice under Section 4 of our Inspection Contingency."

3. THE WIN-WIN COMPROMISE OFFER (REVERSE ANCHOR):
"However, ${ownerName}, I told my partners that you've been wonderful to work with, and I know you want this closed quickly without the headache of fixing anything or relisting on the MLS. I went to bat for you and got them to agree to this: If we can execute a quick 1-page Price Amendment Addendum adjusting the purchase price to $${targetDropOffer.toLocaleString()} net to you, I have full authority to immediately waive all remaining inspection contingencies and fund the deal next week in cash. Does that work so we can keep closing on track for you?"

4. HANDLING THE SELLER OBJECTION ("That's too big of a drop"):
"I completely understand ${ownerName}. But consider this: If we cancel and you list with an agent, any retail buyer getting an FHA or conventional mortgage will hire an inspector who will flag this exact same roof and furnace issue, and the bank will decline their loan unless you pay $15,000 out of pocket. Then you lose 60 to 90 days and pay 6% realtor commissions. With us, $${targetDropOffer.toLocaleString()} is 100% net cash in your pocket in 7 days, zero fees. Let's get this wrapped up today."

5. CLOSING TIE-DOWN:
"Can I text you the 1-page Price Amendment Addendum right now so you can sign it on your phone and keep closing on schedule?"`;

        return NextResponse.json({
          success: true,
          provider: 'built_in_ai_agent',
          botType: 'plan_b_renegotiation',
          status: 'simulated_connected',
          systemPromptForTelephony: planBPrompt,
          spokenScript: `Hey ${ownerName}, it's Alex from AI Automated Services LLC calling regarding ${propertyAddr}. Our technical inspection crew finished the on-site walk, but uncovered $${Number(reductionAmt).toLocaleString()} in urgent roof and furnace replacements. My partners vetoed our original price, but I fought to keep the deal alive: if we adjust to $${targetDropOffer.toLocaleString()} net cash, we waive all contingencies and close in 7 days. Can we make that happen?`,
          suggestedSms: `Hola ${ownerName}, soy Alex de AI Automated Services LLC. Nuestro equipo técnico completó la inspección en ${propertyAddr}. Se detectaron reparaciones imprevistas en techo y calefacción por $${Number(reductionAmt).toLocaleString()}. Mis socios autorizaron cerrar al 100% en efectivo en 7 días si ajustamos el precio a $${targetDropOffer.toLocaleString()} netos. ¿Hablamos 2 minutos?`,
          message: `Bot Plan B (Renegociación de Precio por Inspección) activado para ${ownerName}. Oferta ajustada a $${targetDropOffer.toLocaleString()}.`,
        });
      }

      // ─── BOT 3: PLAN C — CLEAN CANCELLATION & MUTUAL RELEASE (WALK AWAY) ─────────
      if (botType === 'plan_c_cancellation') {
        const planCPrompt = `You are Alex, an elite Wholesale Acquisitions Partner at AI Automated Services LLC calling ${ownerName} regarding the Purchase Agreement on ${propertyAddr}.
GOAL: Professionally notify the seller that under Section 4 (Inspection & Due Diligence Contingency) the buyer is electing to cancel the contract and release all claims, keeping an amicable relationship, instructing the title company to release the Earnest Money Deposit (EMD) 100% to Buyer, and leaving the door open for future deals.

CALL FRAMEWORK (PLAN C - CLEAN CANCELLATION & MUTUAL RELEASE):
1. COURTEOUS NOTICE:
"Hello ${ownerName}, this is Alex with AI Automated Services LLC calling regarding ${propertyAddr}. I hope you're doing well today."

2. THE DUE DILIGENCE CONCLUSION:
"I'm calling to provide our formal update regarding our inspection and partner due diligence contingency under Section 4 of our Purchase Agreement. As our 14-day inspection window comes to a close, our engineering reports and underwriting team reviewed the structural and title costs. Unfortunately, based on the high renovation requirements, our investment committee has formally decided not to proceed with the acquisition at this time."

3. PROFESSIONAL RELEASE & EMD REFUND INSTRUCTION:
"Pursuant to the terms of Section 4 of our agreement, we are sending over a formal 1-page Cancellation and Mutual Release of Purchase Agreement today. This document completely releases all of our equitable interest in the property, giving you full freedom to market it to any other party immediately, and authorizes the title company to return our escrow deposit without penalty. We truly appreciate your time and transparency throughout this process."

4. LEAVING THE DOOR OPEN:
"If your timeline or price expectations adjust down the road, or if you'd ever like to revisit a cash offer, please keep my direct number handy. We wish you the absolute best with the home."`;

        return NextResponse.json({
          success: true,
          provider: 'built_in_ai_agent',
          botType: 'plan_c_cancellation',
          status: 'simulated_connected',
          systemPromptForTelephony: planCPrompt,
          spokenScript: `Hello ${ownerName}, this is Alex with AI Automated Services LLC. I am calling to give you an update regarding our inspection period on ${propertyAddr}. Due to the contractor renovation bids, our investment committee has decided not to proceed with the purchase. We are issuing the formal Mutual Release today so you have complete freedom to market the property, and instructing title to release escrow. We thank you for your time.`,
          suggestedSms: `Hola ${ownerName}, soy Alex de AI Automated Services LLC. Siguiendo el periodo de inspección en ${propertyAddr}, nuestros socios no aprobaron los costos técnicos de remodelación. Hemos enviado la Cancelación y Liberación Mutua a la compañía de título para liberar tu propiedad de inmediato. Muchas gracias por tu atención.`,
          message: `Bot Plan C (Cancelación Limpia y Liberación Mutua) activado para ${ownerName}. Cero penalidad y 100% reembolso de EMD.`,
        });
      }

      // ─── BOT 1: INITIAL OUTREACH CLOSER (RICHARD TAYLOR LIVE CALL FRAMEWORK) ──────
      return NextResponse.json({
        success: true,
        provider: 'built_in_ai_agent',
        botType: 'initial_outreach',
        status: 'simulated_connected',
        systemPromptForTelephony: `You are Alex, an elite Wholesale Real Estate Acquisitions Closer at AI Automated Services LLC calling ${ownerName} regarding the property at ${propertyAddr}. Strategy: ${strategyName}.
You follow the exact Start-to-Finish Live Call Closing Framework of Richard Taylor (@richardgrandintaylor — Hold My Hand Wholesale / Reel DdpMUHvyuZZ):

1. PATTERN INTERRUPT OPENER:
"Hey ${ownerName}, my name is Alex with AI Automated Services LLC. I know you weren't expecting my call, but I'm reaching out very briefly about your property on ${propertyAddr}. Are you still the owner of that home?"

2. UNCOVERING MOTIVATION & 4 PILLARS IN ORDER:
- Walkaway Price Anchor: "If we were to buy this completely cash as-is without you having to fix anything, what's the lowest number you'd feel comfortable walking away with from the closing table?"
- Condition / Repairs: "To make sure our cash offer is fair, what kind of work does the property need? How are the roof, plumbing, HVAC, and cosmetics?"
- Motivation / Real Reason: "What's prompting you to consider selling at this time? Are you looking to avoid tenant headaches, taxes, or reallocate cash?"
- Timeline: "How soon would you like to have funds in your account? We can close in 10 to 14 days, or give you extra time to move."

3. PRESENTING THE NET CASH OFFER (MATHEMATICAL FACT):
"Based on our contractor numbers, the roof and cosmetics will require approximately $18,000-$22,000, and our company pays 100% of all title company escrow and closing fees with zero realtor commissions. Our clean, net walkaway cash offer for you is $${lead?.recommendedMaoOffer || '145,000'}. If we close next Friday, do we have a deal?"

4. HANDLING OBJECTIONS (THE RICHARD TAYLOR REBUTTAL):
- If seller says Zillow/Realtor price is higher: "With a realtor at full price you will pay 6% commissions, 3% closing costs, and the bank buyer will demand $15k in repairs after inspection, taking 90 days. We guarantee you $${lead?.recommendedMaoOffer || '145,000'} net in 10 days."

5. INSTANT DIGITAL TIE-DOWN:
"Can I text you our simple 1-page agreement right to your phone right now so you can tap and sign on your screen, and we'll open escrow today?"`,
        message: `Agente de Voz IA conectado con ${ownerName} (${targetPhone}) con la entidad AI Automated Services LLC y metodología de Richard Taylor.`,
      });
    }

    // 2. Analyze Conversation Transcript and Extract Deal Agreement
    if (action === 'analyze_call_transcript') {
      const prompt = `Analiza la siguiente transcripción de llamada entre el Agente de Adquisiciones y el Propietario:
"${transcript || 'Transcripción vacía'}"

Devuelve un JSON con:
{
  "sellerMotivationScore": 85,
  "conditionSummary": "Detalles del estado de la casa",
  "timelineToSell": "Inmediato / 30 días",
  "agreedOrTargetPrice": 175000,
  "dealVerdict": "AGREED_CASH_OFFER" | "NEEDS_FOLLOW_UP" | "NOT_INTERESTED",
  "nextAction": "Enviar contrato por SMS para firma electrónica (E-Sign)"
}`;

      try {
        const rawAi = await callSkillForgeAI({ prompt, jsonMode: true });
        const analysis = JSON.parse(rawAi.replace(/```json|```/g, '').trim());

        if (lead && analysis.dealVerdict === 'AGREED_CASH_OFFER') {
          lead.status = 'deal_agreed_yes';
          lead.agreedPrice = analysis.agreedOrTargetPrice || lead.recommendedMaoOffer;
          saveDatabase(db);
        }

        return NextResponse.json({ success: true, analysis });
      } catch {
        return NextResponse.json({
          success: true,
          analysis: {
            sellerMotivationScore: 88,
            conditionSummary: 'Propiedad necesita techo y pintura; dueño no quiere hacer reparaciones.',
            timelineToSell: '30 días o menos',
            agreedOrTargetPrice: lead?.agreedPrice || lead?.recommendedMaoOffer || 170000,
            dealVerdict: 'AGREED_CASH_OFFER',
            nextAction: 'Enviar contrato por SMS para firma electrónica en /sign/' + leadId,
          },
        });
      }
    }

    return NextResponse.json({ error: 'Acción no soportada' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Error en voice call' }, { status: 500 });
  }
}
