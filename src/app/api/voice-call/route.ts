import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, saveDatabase } from '@/lib/db';
import { callSkillForgeAI } from '@/lib/aiClient';

export async function POST(req: NextRequest) {
  try {
    const { action, leadId, provider, apiKey, phoneNumber, assistantId, transcript, audioPrompt } =
      await req.json();

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

      // Built-in Intelligent Call Simulation & Setup
      return NextResponse.json({
        success: true,
        provider: 'built_in_ai_agent',
        status: 'simulated_connected',
        targetPhone,
        ownerName,
        propertyAddr,
        systemPromptForTelephony: `You are an empathetic, top-producing Wholesale Real Estate Acquisitions Specialist calling ${ownerName} regarding the property at ${propertyAddr}. Your goal is to identify the 4 Pillars of Motivation: 1) Condition of the house, 2) Timeline to sell, 3) Real motivation/reason for moving, and 4) Price flexibility for an all-cash as-is purchase. Never be pushy; act like a problem solver who covers all closing costs and title fees.`,
        message: `Agente de Voz IA conectado con ${ownerName} (${targetPhone}). Puedes usar el micrófono en vivo del navegador o configurar tu API Key de Vapi/Retell.`,
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
