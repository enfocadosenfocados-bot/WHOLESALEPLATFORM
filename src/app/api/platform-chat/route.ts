import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, saveDatabase } from '@/lib/db';
import { callMultimodalAI } from '@/lib/aiClient';
import { MotivatedSellerLead, VerifiedCashBuyer } from '@/types/skill';

// ─────────────────────────────────────────────────────────────────────────────
// Build a full platform context snapshot for the AI
// ─────────────────────────────────────────────────────────────────────────────
function buildPlatformContext(db: any): string {
  const buyers = db.cashBuyers || [];
  const leads = db.sellerLeads || [];
  const creators = db.igCreators || [];
  const skills = db.skills || [];
  const lastRun = db.lastAutomationRun;

  const buyerSummary = buyers.slice(0, 10).map((b: VerifiedCashBuyer) =>
    `- ${b.name} | ${b.market} | BuyBox: ${b.buyBoxType} | Max: ${b.maxPrice} | Contact: ${b.contactInfo}`
  ).join('\n');

  const leadSummary = leads.slice(0, 10).map((l: MotivatedSellerLead) =>
    `- ${l.ownerName} | ${l.propertyAddress} | ARV: $${l.estimatedArv?.toLocaleString()} | MAO: $${l.recommendedMaoOffer?.toLocaleString()} | Status: ${l.status} | Source: ${l.leadSource}`
  ).join('\n');

  const skillSummary = skills.map((s: any) =>
    `- ${s.title} (v${s.version}) — ${s.category}`
  ).join('\n');

  const creatorSummary = creators.slice(0, 5).map((c: any) =>
    `- @${c.handle} | ${c.marketsTheyBuy} | ${c.role} | Status: ${c.outreachStatus}`
  ).join('\n');

  return `
=== WHOLESALE PLATFORM — CONTEXTO COMPLETO ===

📊 BASE DE DATOS:
- Cash Buyers registrados: ${buyers.length}
- Seller Leads (propiedades/vendedores): ${leads.length}
- Creadores de IG / Socios: ${creators.length}
- Skills de estrategia: ${skills.length}

👥 TOP CASH BUYERS (primeros 10):
${buyerSummary || 'Ninguno registrado aún'}

🏠 TOP SELLER LEADS (primeros 10):
${leadSummary || 'Ninguno registrado aún'}

📚 SKILLS ACTIVOS:
${skillSummary}

📸 CREADORES IG:
${creatorSummary || 'Ninguno registrado aún'}

🤖 ÚLTIMO AUTO-PILOT RUN:
${lastRun
  ? `- Fecha: ${lastRun.startedAt} | Status: ${lastRun.status}
- Leads creados: ${lastRun.totalLeadsCreated} | Llamadas: ${lastRun.totalCallsInitiated} | Contactos: ${lastRun.totalContactsAttempted}`
  : 'No se ha ejecutado aún'}

=== MÓDULOS DISPONIBLES ===
1. 🤖 Auto-Pilot Diario (/api/daily-automation) — busca propiedades, envía SMS/email, llama con IA
2. ✍️  E-Sign Portal (/sign/[id]) — firma electrónica para vendedores
3. 💎 Deal Landing Pages (/deal/[id]) — páginas de deal para cash buyers
4. 📞 Telefonía IA (/api/voice-call) — llamadas con Vapi.ai / Retell AI / built-in
5. 🛰️ SkyDrive Vision (/api/skydrive-vision) — análisis visual de propiedad
6. 📊 Bulk Skip-Trace (/api/bulk-skiptrace) — enriquecimiento masivo de contactos
7. 🔔 Webhooks (/api/webhooks) — Discord, Telegram, GoHighLevel
8. 🔍 Cash Buyer Scraper (/api/scrape-buyers) — scrapea Facebook, Reddit, BiggerPockets
9. 📧 Seller Outreach (/api/seller-outreach) — SMS + Email + contrato auto
10. 📸 IG Creators DM (/api/ig-creators) — mensajes a creadores de Instagram

=== ACCIONES QUE PUEDES EJECUTAR ===
- Puedes pedirme que ejecute el auto-pilot
- Puedes pedirme datos de un buyer o lead específico
- Puedes pedirme que agregue un nuevo buyer o lead
- Puedes pedirme que genere un contrato para un vendedor
- Puedes pedirme estadísticas y análisis de la base de datos
- Puedes pedirme que corra SkyDrive Vision en una dirección
- Puedes pedirme que busque compradores en una ciudad específica
- Puedes preguntarme sobre cualquier estrategia de wholesale
`.trim();
}

// ─────────────────────────────────────────────────────────────────────────────
// Action executor — parses AI intent and runs real platform actions
// ─────────────────────────────────────────────────────────────────────────────
async function tryExecuteAction(
  intent: string,
  userMessage: string,
  db: any,
  baseUrl: string
): Promise<{ actionTaken: string; actionResult: any } | null> {
  const msg = userMessage.toLowerCase();

  // RUN AUTO-PILOT
  if (intent === 'run_autopilot' || msg.includes('ejecuta el auto') || msg.includes('corre el auto') || msg.includes('busca propiedades')) {
    const res = await fetch(`${baseUrl}/api/daily-automation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'run_now' }),
    });
    const data = await res.json();
    return {
      actionTaken: 'run_autopilot',
      actionResult: data.run,
    };
  }

  // SKYDRIVE VISION
  const skydriveMatch = msg.match(/analiza|revisa|inspecciona|vision.*?(\d{2,5}[^,]+(?:ave|st|blvd|rd|dr|ln|ct|way|pl|cir)[^,]*,?[^$]*)/i);
  if (intent === 'skydrive_vision' || skydriveMatch) {
    const address = skydriveMatch?.[1]?.trim() || '4821 N Habana Ave, Tampa, FL';
    const res = await fetch(`${baseUrl}/api/skydrive-vision`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address }),
    });
    const data = await res.json();
    return { actionTaken: 'skydrive_vision', actionResult: data.data };
  }

  // SCRAPE BUYERS
  if (intent === 'scrape_buyers' || msg.includes('scrape') || msg.includes('busca buyers') || msg.includes('busca compradores')) {
    const cityMatch = msg.match(/en\s+([a-záéíóúñ\s]+?)(?:\s*$|,|\.|!)/i);
    const city = cityMatch?.[1]?.trim() || 'Ohio';
    const res = await fetch(`${baseUrl}/api/scrape-buyers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ city, sources: ['facebook', 'reddit', 'biggerpockets'] }),
    });
    const data = await res.json();
    return { actionTaken: 'scrape_buyers', actionResult: data };
  }

  // ADD BUYER manually
  if (intent === 'add_buyer' || (msg.includes('agrega') && msg.includes('buyer'))) {
    const nameMatch = userMessage.match(/(?:buyer|comprador)\s+"?([A-Za-z\s]+)"?/i);
    const buyer: VerifiedCashBuyer = {
      id: `buyer-${Date.now()}`,
      name: nameMatch?.[1]?.trim() || 'New Buyer from Chat',
      companyOrGroup: 'Manual Entry via AI Chat',
      platform: 'web_directory',
      market: 'Ohio',
      buyBoxType: 'Fix & Flip',
      maxPrice: '$200,000',
      contactInfo: 'chat@wholesaleplatform.io',
      sourceUrl: '',
      notes: `Agregado manualmente vía AI Chat: "${userMessage}"`,
      verified: false,
    };
    db.cashBuyers = [...(db.cashBuyers || []), buyer];
    saveDatabase(db);
    return { actionTaken: 'add_buyer', actionResult: buyer };
  }

  // GET STATS
  if (intent === 'get_stats' || msg.includes('estadística') || msg.includes('cuántos') || msg.includes('cuantos') || msg.includes('stats')) {
    const leads: MotivatedSellerLead[] = db.sellerLeads || [];
    const stats = {
      totalBuyers: (db.cashBuyers || []).length,
      totalLeads: leads.length,
      leadsByStatus: leads.reduce((acc: any, l) => { acc[l.status] = (acc[l.status] || 0) + 1; return acc; }, {}),
      leadsBySource: leads.reduce((acc: any, l) => { acc[l.leadSource] = (acc[l.leadSource] || 0) + 1; return acc; }, {}),
      totalCreators: (db.igCreators || []).length,
      totalSkills: (db.skills || []).length,
      lastAutomation: db.lastAutomationRun?.startedAt || 'nunca',
    };
    return { actionTaken: 'get_stats', actionResult: stats };
  }

  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// POST — Main chat endpoint
// ─────────────────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const { messages, apiKey } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'No messages provided' }, { status: 400 });
    }

    const db = getDatabase() as any;
    const platformContext = buildPlatformContext(db);
    const userMessage = messages[messages.length - 1]?.content || '';
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3005';

    // ── Step 1: Ask AI to classify intent ──
    let intent = 'general_chat';
    try {
      const intentRaw = await callMultimodalAI({
        systemPrompt: 'Classify the user intent into ONE of these exact values: run_autopilot, skydrive_vision, scrape_buyers, add_buyer, get_stats, general_chat. Reply with ONLY the intent value, nothing else.',
        userPrompt: userMessage,
        apiKey: apiKey || undefined,
      });
      intent = intentRaw.trim().toLowerCase().replace(/[^a-z_]/g, '');
    } catch {
      intent = 'general_chat';
    }

    // ── Step 2: Try to execute a real action ──
    let actionContext = '';
    try {
      const actionResult = await tryExecuteAction(intent, userMessage, db, baseUrl);
      if (actionResult) {
        actionContext = `\n\n=== ACCIÓN EJECUTADA: ${actionResult.actionTaken} ===\nResultado: ${JSON.stringify(actionResult.actionResult, null, 2).slice(0, 1500)}`;
      }
    } catch (actionErr: any) {
      actionContext = `\n\n[Acción intentada pero con error: ${actionErr.message}]`;
    }

    // ── Step 3: Build conversation history for OpenRouter ──
    const systemPrompt = `Eres el Asistente IA de WholesalePlatform — el copiloto inteligente de un inversionista de bienes raíces wholesale. 
Tienes acceso completo a toda la plataforma, la base de datos y puedes ejecutar acciones reales.
Respondes SIEMPRE en español, de forma concisa pero completa.
Cuando ejecutas una acción, explica claramente qué hiciste y cuál fue el resultado.
Si el usuario pide algo que excede tus capacidades actuales, dile qué sí puedes hacer.
Eres proactivo: si detectas oportunidades o problemas en los datos, los mencionas.

${platformContext}${actionContext}`;

    const conversationMessages = messages.map((m: { role: string; content: string }) => ({
      role: m.role,
      content: m.content,
    }));

    // ── Step 4: Call AI for final response ──
    const effApiKey =
      apiKey ||
      process.env.OPENROUTER_API_KEY ||
      process.env.GEMINI_API_KEY ||
      process.env.OPENAI_API_KEY ||
      '';

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${effApiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3005',
        'X-Title': 'WholesalePlatform AI Chat',
      },
      body: JSON.stringify({
        model: 'openrouter/auto',
        messages: [
          { role: 'system', content: systemPrompt },
          ...conversationMessages,
        ],
        temperature: 0.4,
        max_tokens: 900,
      }),
    });

    if (!response.ok) {
      // Fallback: use built-in smart response
      const fallback = buildSmartFallback(userMessage, db, intent, actionContext);
      return NextResponse.json({ reply: fallback, intent, actionExecuted: !!actionContext });
    }

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content || buildSmartFallback(userMessage, db, intent, actionContext);

    return NextResponse.json({ reply, intent, actionExecuted: !!actionContext });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Chat error' }, { status: 500 });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Fallback when no API key is configured
// ─────────────────────────────────────────────────────────────────────────────
function buildSmartFallback(userMessage: string, db: any, intent: string, actionContext: string): string {
  const msg = userMessage.toLowerCase();
  const leads = db.sellerLeads || [];
  const buyers = db.cashBuyers || [];

  if (actionContext.includes('run_autopilot')) {
    const run = db.lastAutomationRun;
    return `✅ **Auto-Pilot ejecutado!**\n\n- 🏠 Propiedades encontradas: **${run?.totalPropertiesFound || 0}**\n- 📋 Leads creados: **${run?.totalLeadsCreated || 0}**\n- 📞 Llamadas iniciadas: **${run?.totalCallsInitiated || 0}**\n- 📱 Contactos realizados: **${run?.totalContactsAttempted || 0}**\n\nRevisa la pestaña **Auto-Pilot** para ver todos los detalles.`;
  }
  if (intent === 'get_stats' || msg.includes('estadística') || msg.includes('cuántos') || msg.includes('cuantos')) {
    const agreed = leads.filter((l: any) => l.status === 'deal_agreed_yes').length;
    const signed = leads.filter((l: any) => l.status === 'contract_signed').length;
    return `📊 **Estadísticas de la plataforma:**\n\n- 👥 Cash Buyers: **${buyers.length}**\n- 🏠 Seller Leads: **${leads.length}**\n- ✅ Deals acordados: **${agreed}**\n- 📝 Contratos firmados: **${signed}**\n- 📸 Creadores IG: **${(db.igCreators || []).length}**\n- 📚 Skills activos: **${(db.skills || []).length}**`;
  }
  if (msg.includes('buyer')) {
    return `Tengo **${buyers.length} cash buyers** registrados en la plataforma.\n\nTop 3:\n${buyers.slice(0, 3).map((b: any) => `• **${b.name}** — ${b.market} — ${b.buyBoxType} — Hasta ${b.maxPrice}`).join('\n')}\n\nPuedes pedirme que busque más buyers, agregue uno nuevo o scrape redes sociales.`;
  }
  if (msg.includes('lead') || msg.includes('vendedor') || msg.includes('propiedad')) {
    return `Tengo **${leads.length} seller leads** en el pipeline.\n\nTop 3:\n${leads.slice(0, 3).map((l: any) => `• **${l.ownerName}** — ${l.propertyAddress} — ARV: \$${l.estimatedArv?.toLocaleString()} — Estado: ${l.status}`).join('\n')}\n\nPuedes pedirme que ejecute el Auto-Pilot para generar más leads automáticamente.`;
  }
  return `Hola! Soy el Asistente IA de WholesalePlatform. Tengo acceso completo a tu plataforma:\n\n- **${buyers.length}** cash buyers registrados\n- **${leads.length}** seller leads activos\n- **${(db.skills || []).length}** estrategias de wholesale\n\n**Puedo hacer:**\n• Ejecutar el Auto-Pilot de búsqueda\n• Darte estadísticas de tu pipeline\n• Buscar nuevos buyers en Facebook/Reddit\n• Analizar una propiedad con SkyDrive Vision\n• Agregar leads o buyers manualmente\n\n*Configura tu OpenRouter API Key para habilitar el chat completo con IA.*`;
}
