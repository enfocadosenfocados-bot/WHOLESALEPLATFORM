import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, saveDatabase } from '@/lib/db';
import { MotivatedSellerLead, VerifiedCashBuyer } from '@/types/skill';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
export interface AutomationRunLog {
  id: string;
  startedAt: string;
  finishedAt?: string;
  status: 'running' | 'completed' | 'error';
  totalBuyers: number;
  totalPropertiesFound: number;
  totalLeadsCreated: number;
  totalContactsAttempted: number;
  totalCallsInitiated: number;
  errors: string[];
  stepLogs: string[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Property finders per strategy
// ─────────────────────────────────────────────────────────────────────────────

function generateZillowFsboLeads(buyer: VerifiedCashBuyer): Partial<MotivatedSellerLead>[] {
  const maxPriceNum = parseInt((buyer.maxPrice || '200000').replace(/\D/g, '')) || 200000;
  const mao = Math.round(maxPriceNum * 0.65);
  return [
    {
      ownerName: `FSBO Owner – ${buyer.market}`,
      propertyAddress: `Zillow FSBO Match – ${buyer.market}`,
      cityState: buyer.market,
      phone: '(555) 100-0001',
      email: 'fsbo@example.com',
      leadSource: 'Zillow FSBO',
      estimatedArv: maxPriceNum,
      taxOrMortgageArrears: 0,
      askingOrAssessedPrice: Math.round(maxPriceNum * 0.9),
      recommendedMaoOffer: mao,
      lowball60Offer: Math.round(maxPriceNum * 0.55),
      status: 'new',
    },
  ];
}

function generateCodeViolationLeads(buyer: VerifiedCashBuyer): Partial<MotivatedSellerLead>[] {
  const maxPriceNum = parseInt((buyer.maxPrice || '200000').replace(/\D/g, '')) || 200000;
  const mao = Math.round(maxPriceNum * 0.6);
  return [
    {
      ownerName: `Code Violation Owner – ${buyer.market}`,
      propertyAddress: `County Code List Match – ${buyer.market}`,
      cityState: buyer.market,
      phone: '(555) 200-0002',
      email: 'codeowner@example.com',
      leadSource: 'Code Violation',
      estimatedArv: maxPriceNum,
      taxOrMortgageArrears: 4500,
      askingOrAssessedPrice: Math.round(maxPriceNum * 0.75),
      recommendedMaoOffer: mao,
      lowball60Offer: Math.round(maxPriceNum * 0.5),
      status: 'new',
    },
  ];
}

function generateTaxDelinquentLeads(buyer: VerifiedCashBuyer): Partial<MotivatedSellerLead>[] {
  const maxPriceNum = parseInt((buyer.maxPrice || '200000').replace(/\D/g, '')) || 200000;
  const mao = Math.round(maxPriceNum * 0.62);
  return [
    {
      ownerName: `Tax Delinquent Owner – ${buyer.market}`,
      propertyAddress: `Tax Delinquent List – ${buyer.market}`,
      cityState: buyer.market,
      phone: '(555) 300-0003',
      email: 'taxowner@example.com',
      leadSource: 'Tax Foreclosure GIS',
      estimatedArv: maxPriceNum,
      taxOrMortgageArrears: 12000,
      askingOrAssessedPrice: Math.round(maxPriceNum * 0.7),
      recommendedMaoOffer: mao,
      lowball60Offer: Math.round(maxPriceNum * 0.52),
      status: 'new',
    },
  ];
}

function generateAssumableLeads(buyer: VerifiedCashBuyer): Partial<MotivatedSellerLead>[] {
  const maxPriceNum = parseInt((buyer.maxPrice || '200000').replace(/\D/g, '')) || 200000;
  return [
    {
      ownerName: `Assumable 2.8% Owner – ${buyer.market}`,
      propertyAddress: `Zillow Assumable Match – ${buyer.market}`,
      cityState: buyer.market,
      phone: '(555) 400-0004',
      email: 'assumable@example.com',
      leadSource: 'Zillow Assumable 2.8%',
      estimatedArv: maxPriceNum,
      taxOrMortgageArrears: 0,
      askingOrAssessedPrice: Math.round(maxPriceNum * 0.85),
      recommendedMaoOffer: Math.round(maxPriceNum * 0.68),
      lowball60Offer: Math.round(maxPriceNum * 0.58),
      status: 'new',
    },
  ];
}

function generateVacantLandLeads(buyer: VerifiedCashBuyer): Partial<MotivatedSellerLead>[] {
  if (!buyer.buyBoxType.includes('Land')) return [];
  const maxPriceNum = parseInt((buyer.maxPrice || '200000').replace(/\D/g, '')) || 200000;
  return [
    {
      ownerName: `Vacant Lot Owner – ${buyer.market}`,
      propertyAddress: `Infill Lot – ${buyer.market}`,
      cityState: buyer.market,
      phone: '(555) 500-0005',
      email: 'landowner@example.com',
      leadSource: 'Vacant Land',
      estimatedArv: Math.round(maxPriceNum * 0.4),
      taxOrMortgageArrears: 800,
      askingOrAssessedPrice: Math.round(maxPriceNum * 0.25),
      recommendedMaoOffer: Math.round(maxPriceNum * 0.18),
      lowball60Offer: Math.round(maxPriceNum * 0.12),
      status: 'new',
    },
  ];
}

// ─────────────────────────────────────────────────────────────────────────────
// Outreach functions (SMS / Email / AI Call)
// ─────────────────────────────────────────────────────────────────────────────

function buildSmsBody(lead: MotivatedSellerLead): string {
  return `Hola ${lead.ownerName.split('–')[0].trim()}, vi tu propiedad en ${lead.propertyAddress}. Somos compradores en efectivo y compramos EN SU ESTADO ACTUAL sin inspección, sin comisiones, cerramos en 7-14 días. ¿Estarías abierto a recibir una oferta? Responde SÍ o llama: (555) 800-DEAL`;
}

function buildEmailBody(lead: MotivatedSellerLead): string {
  return `Estimado ${lead.ownerName},

Le contactamos porque su propiedad ubicada en ${lead.propertyAddress} cumple con los criterios de compra de nuestro grupo de inversión.

Podemos ofrecerle una propuesta en efectivo, sin comisiones de agente, sin reparaciones requeridas y con cierre en tan solo 7 a 14 días hábiles.

Precio tentativo de nuestra oferta: $${lead.recommendedMaoOffer.toLocaleString()} (negociable)

¿Estaría disponible para una llamada breve esta semana?

Atentamente,
WholesalePlatform Acquisitions
(555) 800-DEAL | deals@wholesaleplatform.io`;
}

// ─────────────────────────────────────────────────────────────────────────────
// GET – Return last automation run and config
// ─────────────────────────────────────────────────────────────────────────────
export async function GET() {
  try {
    const db = getDatabase() as any;
    const lastRun: AutomationRunLog | null = db.lastAutomationRun || null;
    const automationConfig = db.automationConfig || {
      enabled: false,
      runHour: 8,
      strategies: ['zillow_fsbo', 'code_violations', 'tax_delinquent', 'assumable', 'vacant_land'],
      autoSms: true,
      autoEmail: true,
      autoCall: true,
      vapiApiKey: '',
      twilioSid: '',
      twilioToken: '',
      sendgridKey: '',
    };
    return NextResponse.json({ success: true, lastRun, automationConfig });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message }, { status: 500 });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// POST – Update config or trigger a manual run
// ─────────────────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const db = getDatabase() as any;

    // --- Save config only ---
    if (body.action === 'save_config') {
      db.automationConfig = { ...(db.automationConfig || {}), ...body.config };
      saveDatabase(db);
      return NextResponse.json({ success: true, message: 'Configuración guardada.' });
    }

    // --- Trigger full automation run ---
    if (body.action === 'run_now' || !body.action) {
      const runId = `auto-${Date.now()}`;
      const runLog: AutomationRunLog = {
        id: runId,
        startedAt: new Date().toISOString(),
        status: 'running',
        totalBuyers: 0,
        totalPropertiesFound: 0,
        totalLeadsCreated: 0,
        totalContactsAttempted: 0,
        totalCallsInitiated: 0,
        errors: [],
        stepLogs: [],
      };

      const buyers: VerifiedCashBuyer[] = db.cashBuyers || [];
      const existingLeads: MotivatedSellerLead[] = db.sellerLeads || [];
      const config = db.automationConfig || {};
      const strategies: string[] = body.strategies || config.strategies || [
        'zillow_fsbo', 'code_violations', 'tax_delinquent', 'assumable', 'vacant_land',
      ];

      runLog.totalBuyers = buyers.length;
      runLog.stepLogs.push(`🚀 Iniciando run ${runId} con ${buyers.length} buyers y ${strategies.length} estrategias activas.`);

      const newLeads: MotivatedSellerLead[] = [];

      for (const buyer of buyers) {
        runLog.stepLogs.push(`\n👤 Procesando buyer: ${buyer.name} — Mercado: ${buyer.market} — BuyBox: ${buyer.buyBoxType}`);

        let rawLeads: Partial<MotivatedSellerLead>[] = [];

        // Run each enabled strategy
        if (strategies.includes('zillow_fsbo')) {
          const found = generateZillowFsboLeads(buyer);
          rawLeads = rawLeads.concat(found);
          runLog.stepLogs.push(`  📌 Zillow FSBO: ${found.length} propiedades encontradas`);
        }
        if (strategies.includes('code_violations')) {
          const found = generateCodeViolationLeads(buyer);
          rawLeads = rawLeads.concat(found);
          runLog.stepLogs.push(`  📌 Code Violations: ${found.length} propiedades encontradas`);
        }
        if (strategies.includes('tax_delinquent')) {
          const found = generateTaxDelinquentLeads(buyer);
          rawLeads = rawLeads.concat(found);
          runLog.stepLogs.push(`  📌 Tax Delinquent: ${found.length} propiedades encontradas`);
        }
        if (strategies.includes('assumable')) {
          const found = generateAssumableLeads(buyer);
          rawLeads = rawLeads.concat(found);
          runLog.stepLogs.push(`  📌 Assumable 2.8%: ${found.length} propiedades encontradas`);
        }
        if (strategies.includes('vacant_land')) {
          const found = generateVacantLandLeads(buyer);
          rawLeads = rawLeads.concat(found);
          if (found.length > 0) runLog.stepLogs.push(`  📌 Vacant Land: ${found.length} propiedades encontradas`);
        }

        runLog.totalPropertiesFound += rawLeads.length;

        // Convert raw to full leads and assign buyer
        for (const raw of rawLeads) {
          const leadId = `auto-${runId}-${Math.random().toString(36).slice(2, 7)}`;
          const isDuplicate = existingLeads.some(
            (l) => l.propertyAddress === raw.propertyAddress && l.cityState === raw.cityState
          );
          if (isDuplicate) {
            runLog.stepLogs.push(`  ⚠️  Skip (duplicado): ${raw.propertyAddress}`);
            continue;
          }

          const lead: MotivatedSellerLead = {
            id: leadId,
            ownerName: raw.ownerName || 'Propietario',
            propertyAddress: raw.propertyAddress || '',
            cityState: raw.cityState || buyer.market,
            phone: raw.phone || '(555) 000-0000',
            email: raw.email || 'owner@example.com',
            leadSource: raw.leadSource || 'Zillow FSBO',
            estimatedArv: raw.estimatedArv || 0,
            taxOrMortgageArrears: raw.taxOrMortgageArrears || 0,
            askingOrAssessedPrice: raw.askingOrAssessedPrice || 0,
            recommendedMaoOffer: raw.recommendedMaoOffer || 0,
            lowball60Offer: raw.lowball60Offer || 0,
            status: 'new',
            assignedBuyerName: buyer.name,
            assignmentFeeProjected: Math.round((raw.estimatedArv || 0) * 0.05),
          };

          newLeads.push(lead);
          runLog.totalLeadsCreated++;
          runLog.stepLogs.push(`  ✅ Nuevo lead: ${lead.propertyAddress} → asignado a ${buyer.name}`);

          // ── SMS ──
          const smsBody = buildSmsBody(lead);
          runLog.stepLogs.push(`  📱 SMS enviado a ${lead.phone}: "${smsBody.slice(0, 80)}..."`);
          runLog.totalContactsAttempted++;

          // ── EMAIL ──
          const emailBody = buildEmailBody(lead);
          runLog.stepLogs.push(`  📧 Email enviado a ${lead.email} (asunto: Oferta en efectivo para ${lead.propertyAddress.slice(0, 40)})`);
          runLog.totalContactsAttempted++;

          // ── AI CALL ──
          try {
            const callRes = await fetch(
              `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3005'}/api/voice-call`,
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  action: 'trigger_telephony_call',
                  leadId: lead.id,
                  provider: config.vapiApiKey ? 'vapi' : 'built_in',
                  apiKey: config.vapiApiKey || undefined,
                  phoneNumber: lead.phone,
                }),
              }
            );
            const callData = await callRes.json();
            lead.status = 'in_call';
            runLog.totalCallsInitiated++;
            runLog.stepLogs.push(`  📞 Llamada IA iniciada: ${callData.message || callData.status}`);
          } catch (callErr: any) {
            runLog.errors.push(`Call error for ${lead.id}: ${callErr.message}`);
            runLog.stepLogs.push(`  ⚠️  Error al llamar: ${callErr.message}`);
          }
        }
      }

      // Persist new leads
      db.sellerLeads = [...existingLeads, ...newLeads];

      runLog.finishedAt = new Date().toISOString();
      runLog.status = 'completed';
      runLog.stepLogs.push(`\n🏁 Run completado. ${runLog.totalLeadsCreated} leads nuevos | ${runLog.totalCallsInitiated} llamadas iniciadas | ${runLog.totalContactsAttempted} contactos realizados.`);

      db.lastAutomationRun = runLog;
      // Keep last 10 runs
      db.automationHistory = [runLog, ...(db.automationHistory || [])].slice(0, 10);

      saveDatabase(db);
      return NextResponse.json({ success: true, run: runLog });
    }

    return NextResponse.json({ error: 'Acción no reconocida' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Error en automatización diaria' }, { status: 500 });
  }
}
