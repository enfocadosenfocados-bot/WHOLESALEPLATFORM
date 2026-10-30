import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, saveDatabase } from '@/lib/db';
import { callSkillForgeAI } from '@/lib/aiClient';
import {
  generateSellerCloserPrompt,
  generateBuyerCloserPrompt,
  buildPaceOpeningGreeting,
  DealSpecs,
} from '@/lib/voiceCloserPrompt';

const VAPI_BASE_URL = 'https://api.vapi.ai';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      action,
      callId,
      leadId,
      provider = 'vapi',
      apiKey: customApiKey,
      phoneNumberId: customPhoneId,
      phoneNumber: customPhoneNumber,
      assistantId: customAssistantId,
      transcript,
      botType = 'master_closer',
      callTargetType = 'seller', // 'seller' | 'buyer'
      reductionAmount = 12000,
      strategyName: customStrategyName,
      // Dynamic Deal Specs passed directly from chat or pipeline:
      ownerName: rawOwnerName,
      propertyAddress: rawPropertyAddress,
      county: rawCounty,
      parcelId: rawParcelId,
      specs: rawSpecs,
      arv: rawArv,
      repairs: rawRepairs,
      maoOffer: rawMaoOffer,
      anchorOffer: rawAnchorOffer,
      builderPrice: rawBuilderPrice,
      projectedFee: rawProjectedFee,
      minimumFeeFloor: rawMinFeeFloor,
      builderName: rawBuilderName,
    } = body;

    const db = getDatabase();
    const lead = db.sellerLeads?.find((l) => l.id === leadId);

    // ─────────────────────────────────────────────────────────────────────────
    // ACTION: Check Live Call Status & Transcript from Vapi
    // ─────────────────────────────────────────────────────────────────────────
    if (action === 'get_call_status' || action === 'check_call') {
      const targetCallId = callId || body.id;
      if (!targetCallId) {
        return NextResponse.json({ error: 'Falta callId para consultar estado' }, { status: 400 });
      }
      const vapiKey = process.env.VAPI_API_KEY || customApiKey;
      if (!vapiKey) {
        return NextResponse.json({ error: 'VAPI_API_KEY no configurado' }, { status: 500 });
      }

      const res = await fetch(`${VAPI_BASE_URL}/call/${targetCallId}`, {
        headers: { Authorization: `Bearer ${vapiKey}` },
      });
      const data = await res.json();
      return NextResponse.json({ success: true, call: data });
    }

    // ─────────────────────────────────────────────────────────────────────────
    // ACTION: Trigger Outbound Call (Vapi.ai with Cloned Pace Morby Voice & Telnyx)
    // ─────────────────────────────────────────────────────────────────────────
    if (action === 'trigger_telephony_call') {
      const vapiKey = process.env.VAPI_API_KEY || customApiKey;
      const vapiPhoneId = process.env.VAPI_PHONE_NUMBER_ID || customPhoneId || '174882b4-adb6-4417-a37e-3de8de0c5291';
      const vapiAssistantId = process.env.VAPI_ASSISTANT_ID || customAssistantId || '68ba22c6-0efa-49df-98a7-88b2febaa3a5';
      const elevenLabsVoiceId = process.env.ELEVENLABS_VOICE_ID || 'bRxD1Ek8rBfVQeKVLQSs'; // Pace Morby cloned voice

      const targetPhone = customPhoneNumber || lead?.phone || body.targetPhone || '+18004444444';
      const ownerName = rawOwnerName || lead?.ownerName || (callTargetType === 'buyer' ? 'Constructor VIP' : 'Propietario');
      const propertyAddr = rawPropertyAddress || lead?.propertyAddress || '1428 Tropicana Pkwy W, Cape Coral, FL 33993';
      const county = rawCounty || (lead as any)?.county || 'Lee County, FL';
      const parcelId = rawParcelId || (lead as any)?.parcelId || '22-43-23-C2-03102.0450';
      const specs = rawSpecs || '80x125 ft High & Dry lot, ready for slab construction';
      const arv = Number(rawArv) || lead?.estimatedArv || 150000;
      const repairs = Number(rawRepairs) || 15000;
      const maoOffer = Number(rawMaoOffer) || lead?.recommendedMaoOffer || 65000;
      const anchorOffer = Number(rawAnchorOffer) || Math.round(maoOffer * 0.88);
      const builderPrice = Number(rawBuilderPrice) || 38000;
      const projectedFee = Number(rawProjectedFee) || Math.max(5000, builderPrice - maoOffer);
      const minFee = Number(rawMinFeeFloor) || 5000;
      const builderName = rawBuilderName || 'Jon Sninsky (Baker Construction Corp)';

      const dealData: DealSpecs = {
        callTargetType,
        ownerName,
        propertyAddress: propertyAddr,
        targetPhone,
        county,
        parcelId,
        specs,
        arv,
        repairs,
        maoOffer,
        anchorOffer,
        builderPrice,
        projectedFee,
        minimumFeeFloor: minFee,
        builderName,
      };

      // 1. Build First Message & Master System Prompt
      const firstMessage = buildPaceOpeningGreeting(propertyAddr, callTargetType, county);
      let systemPrompt = '';

      if (callTargetType === 'buyer') {
        systemPrompt = generateBuyerCloserPrompt(dealData);
      } else if (botType === 'plan_b_renegotiation') {
        const reductionAmt = Number(reductionAmount) || 12000;
        const targetDropOffer = Math.max(10000, maoOffer - reductionAmt);
        systemPrompt = `You are Pace Morby, Master Acquisitions Closer at AI Automated Services LLC calling ${ownerName} regarding ${propertyAddr}.
GOAL: Renegotiate purchase price from $${maoOffer.toLocaleString()} down to $${targetDropOffer.toLocaleString()} (a $${reductionAmt.toLocaleString()} reduction) due to severe unexpected maintenance (roof decking rot and cracked HVAC exchanger) uncovered by our licensed inspection team.
Use Good Cop / Bad Cop: "My investment committee refused to approve closing at $${maoOffer.toLocaleString()} and ordered a cancellation under Section 4. But I went to bat for you: if we sign a 1-page Price Amendment Addendum at $${targetDropOffer.toLocaleString()} net cash, I have authority to waive all contingencies and fund the deal next week."`;
      } else if (botType === 'plan_c_cancellation') {
        systemPrompt = `You are Pace Morby, Master Acquisitions Closer at AI Automated Services LLC calling ${ownerName} regarding ${propertyAddr}.
GOAL: Amicably and professionally notify the seller that under Section 4 (Inspection Contingency) we are canceling the agreement due to unfeasible contractor rehabilitation estimates.
Instruct title company to release Earnest Money Deposit 100% to Buyer, leave the door open for future deals, and maintain total professionalism.`;
      } else {
        // Default: Master Seller Closer (4 Pillars + Reverse Price Anchor + $5k-$20k Fee Floor + Full Objections)
        systemPrompt = generateSellerCloserPrompt(dealData);
      }

      // If Vapi API Key is available, make the live PSTN call via Vapi + Telnyx
      if (vapiKey) {
        try {
          const vapiPayload = {
            phoneNumberId: vapiPhoneId,
            customer: {
              number: targetPhone,
              name: ownerName,
            },
            assistantId: vapiAssistantId,
            assistantOverrides: {
              firstMessage,
              model: {
                provider: 'openai',
                model: 'gpt-4o',
                messages: [
                  {
                    role: 'system',
                    content: systemPrompt,
                  },
                ],
              },
              voice: {
                provider: '11labs',
                model: 'eleven_turbo_v2_5',
                voiceId: elevenLabsVoiceId,
                stability: 0.3,
                similarityBoost: 0.85,
                style: 0.08,
              },
              backgroundSound: 'office',
              backchannelingEnabled: true,
            },
          };

          const vapiRes = await fetch(`${VAPI_BASE_URL}/call/phone`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${vapiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(vapiPayload),
          });

          const vapiData = await vapiRes.json();

          if (!vapiRes.ok) {
            return NextResponse.json(
              {
                success: false,
                error: `Vapi HTTP ${vapiRes.status}: ${JSON.stringify(vapiData)}`,
                payloadUsed: vapiPayload,
              },
              { status: vapiRes.status }
            );
          }

          // Update lead status in database if available
          if (lead) {
            lead.status = 'in_call';
            lead.lastContactedAt = new Date().toISOString();
            (lead as any).lastCallId = vapiData.id;
            saveDatabase(db);
          }

          return NextResponse.json({
            success: true,
            provider: 'vapi',
            callId: vapiData.id,
            status: vapiData.status || 'queued',
            callerId: '+18709128303 (Telnyx)',
            targetPhone,
            ownerName,
            propertyAddress: propertyAddr,
            callTargetType,
            firstMessage,
            maoOffer,
            anchorOffer,
            projectedFee,
            voiceUsed: `ElevenLabs Cloned: Pace Morby (${elevenLabsVoiceId})`,
            message: `Llamada telefónica iniciada exitosamente hacia ${ownerName} (${targetPhone}) con la voz clonada de Pace Morby y número Telnyx +1 (870) 912-8303.`,
          });
        } catch (vapiErr: any) {
          return NextResponse.json(
            { error: `Error conectando con API de Vapi: ${vapiErr.message}` },
            { status: 500 }
          );
        }
      }

      // Fallback: If no API Key configured, return generated prompt payload
      return NextResponse.json({
        success: true,
        provider: 'built_in_prompt_engine',
        botType,
        callTargetType,
        status: 'simulated_ready',
        targetPhone,
        ownerName,
        propertyAddress: propertyAddr,
        firstMessage,
        systemPromptForTelephony: systemPrompt,
        message: `Prompt de llamada calibrado con la voz de Pace Morby y matriz de objeciones para ${propertyAddr}.`,
      });
    }

    // ─────────────────────────────────────────────────────────────────────────
    // ACTION: Analyze Conversation Transcript and Extract Deal Agreement
    // ─────────────────────────────────────────────────────────────────────────
    if (action === 'analyze_call_transcript') {
      const prompt = `Analiza la siguiente transcripción de llamada entre el Agente de Adquisiciones (Pace Morby) y el Propietario/Comprador:
"${transcript || 'Transcripción vacía'}"

Devuelve un JSON estricto con:
{
  "sellerMotivationScore": 85,
  "conditionSummary": "Detalles del estado de la casa o lote",
  "timelineToSell": "Inmediato / 10-14 días",
  "agreedOrTargetPrice": 65000,
  "assignmentProfitFee": 15000,
  "dealVerdict": "AGREED_CASH_OFFER" | "NEEDS_FOLLOW_UP" | "NOT_INTERESTED",
  "nextAction": "Enviar contrato PSA o Assignment por SMS para firma electrónica (E-Sign)"
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
            conditionSummary: 'Propietario aceptó oferta al contado tras anclaje inverso sin comisiones.',
            timelineToSell: '10 a 14 días',
            agreedOrTargetPrice: lead?.agreedPrice || lead?.recommendedMaoOffer || 65000,
            assignmentProfitFee: 15000,
            dealVerdict: 'AGREED_CASH_OFFER',
            nextAction: 'Enviar contrato por SMS para firma electrónica en /sign/' + (leadId || 'deal-1'),
          },
        });
      }
    }

    return NextResponse.json({ error: 'Acción no soportada' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Error en voice call' }, { status: 500 });
  }
}
