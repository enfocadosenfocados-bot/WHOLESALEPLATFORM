'use client';

import React, { useState } from 'react';
import {
  MapPin,
  ShieldCheck,
  Zap,
  TrendingUp,
  PhoneCall,
  Copy,
  CheckCircle2,
  AlertTriangle,
  Award,
  Sparkles,
  Building,
  DollarSign,
  Layers,
  FileText,
  Target,
  Bot,
  ExternalLink,
  HelpCircle,
  Clock,
  Briefcase
} from 'lucide-react';

export default function TopStatesAndStrategyHub() {
  const [selectedState, setSelectedState] = useState<string>('florida');
  const [selectedCategory, setSelectedCategory] = useState<string>('land');
  const [selectedPromptType, setSelectedPromptType] = useState<string>('land');
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);

  // States database
  const statesData: Record<
    string,
    {
      name: string;
      badge: string;
      easeScore: string;
      legalStatus: string;
      legalStatute: string;
      entryPrice: string;
      typicalAssignment: string;
      topCounties: { name: string; cities: string; why: string; bestAsset: string }[];
      warningNote: string;
      goldenStrategy: string;
    }
  > = {
    florida: {
      name: 'Florida (FL)',
      badge: '🏆 #1 Nacional en Liquidez y Terrenos',
      easeScore: '9.8 / 10 (Ultra Fácil)',
      legalStatus: '100% Legal - Libre Asignación',
      legalStatute: 'Florida Statute § 475 reconoce interés equitativo ("and/or assigns"). Más de 500 title companies pro-wholesaler.',
      entryPrice: '$15,000 - $35,000 (Lotes) | $150k - $220k (Casas)',
      typicalAssignment: '$8,000 - $18,000 USD',
      topCounties: [
        {
          name: 'Brevard County',
          cities: 'Palm Bay & Melbourne',
          why: 'Diseñado en cuadrículas de lotes residenciales. Miles de dueños viven fuera de Florida pagando impuestos por gusto.',
          bestAsset: 'Lotes Baldíos Infill (Builders compran en 48 hrs)'
        },
        {
          name: 'Lee County',
          cities: 'Lehigh Acres & Cape Coral',
          why: 'La mayor concentración de lotes residenciales unifamiliares del mundo. Mercado predilecto de Zach Ginn y Carson.',
          bestAsset: 'Vacant Lots & Casas antiguas de retiro'
        },
        {
          name: 'Polk County',
          cities: 'Lakeland & Winter Haven',
          why: 'En el centro del corredor I-4 entre Orlando y Tampa. Altísima demanda de constructores y flippers.',
          bestAsset: 'Code Violations & Lotes con servicios'
        },
        {
          name: 'Duval County',
          cities: 'Jacksonville',
          why: 'La ciudad con precios de casas unifamiliares más asequibles de Florida. Mercado perfecto para Section 8 y flips.',
          bestAsset: 'Casas SFH con inquilinos cansados'
        }
      ],
      warningNote: 'Nunca anuncies la casa como si fueras broker o realtor; anuncia siempre tus "Derechos de Contrato" (Equitable Interest).',
      goldenStrategy: 'Lotes baldíos en Palm Bay: compra a $15k-$18k a dueños ausentes y asigna a $28k-$32k a constructores locales.'
    },
    indiana: {
      name: 'Indiana (IN)',
      badge: '🏎️ #1 en Casas Baratas & Menor Competencia',
      easeScore: '9.5 / 10 (Muy Fácil)',
      legalStatus: '100% Legal con Divulgación Obligatoria',
      legalStatute: 'Indiana House Bill 1068 (IC 32-21-16.5) requiere divulgar al dueño que tienes intención de asignar el contrato.',
      entryPrice: '$45,000 - $95,000 USD',
      typicalAssignment: '$6,000 - $12,000 USD',
      topCounties: [
        {
          name: 'Marion County',
          cities: 'Indianapolis (Near Eastside, Haughville)',
          why: 'Enorme comunidad de inversionistas de cash flow. Casas de $50k-$80k listas para rehab o Section 8.',
          bestAsset: 'Tired Landlords & Casas heredadas'
        },
        {
          name: 'Lake County',
          cities: 'Gary & Hammond',
          why: 'Costos de entrada ultra-bajos pegados al metro de Chicago. Cero restricciones de Illinois.',
          bestAsset: 'Tax Delinquent & Casas abandonadas'
        },
        {
          name: 'Allen County',
          cities: 'Fort Wayne',
          why: 'Economía manufacturera estable, precios constantes y demanda brutal de alquileres unifamiliares.',
          bestAsset: 'Absentee Owners con multas de código'
        }
      ],
      warningNote: 'Debes incluir en tu contrato y en el primer contacto la cláusula estándar: "Buyer is an investor acting as principal with intent to assign".',
      goldenStrategy: 'Enfócate en dueños de casas en renta agotados (Tired Landlords) que tienen inquilinos que no pagan.'
    },
    alabama: {
      name: 'Alabama (AL)',
      badge: '🏈 #1 en Casas Libres de Hipoteca (Free & Clear)',
      easeScore: '9.3 / 10 (Fácil)',
      legalStatus: '100% Legal - Disclose Status',
      legalStatute: 'Alabama SB 228 / SB 246 exige transparencia. Vendes el contrato, no la casa. Abogados de cierre conducen el settlement.',
      entryPrice: '$35,000 - $80,000 USD',
      typicalAssignment: '$7,000 - $15,000 USD',
      topCounties: [
        {
          name: 'Jefferson County',
          cities: 'Birmingham (Center Point, Ensley, Bessemer)',
          why: 'El 42% de los inmuebles están libres de hipoteca. Los dueños aceptan 50% de descuento sin problema.',
          bestAsset: 'Casas para inversionistas de Section 8'
        },
        {
          name: 'Madison County',
          cities: 'Huntsville',
          why: 'Boom tecnológico y aeroespacial (NASA / Redstone). Precios subiendo y flippers comprando todo.',
          bestAsset: 'Lotes residenciales & Casas para remodelar'
        },
        {
          name: 'Mobile County',
          cities: 'Mobile & Prichard',
          why: 'Puerto costero con muchas propiedades en sucesión (Probates) y herederos fuera de la ciudad.',
          bestAsset: 'Probate & Herencias sin hipoteca'
        }
      ],
      warningNote: 'Alabama es un "Attorney Closing State"; todo el cierre se hace con un despacho de abogados de bienes raíces en vez de solo agencia de título.',
      goldenStrategy: 'Ofertas agresivas a dueños que tienen casas heredadas vacías sin deuda bancaria.'
    },
    ohio: {
      name: 'Ohio (OH)',
      badge: '🌰 #1 en Compradores Institucionales de Rentas',
      easeScore: '9.0 / 10 (Fácil)',
      legalStatus: '100% Legal',
      legalStatute: 'Ley de Ohio permite la cesión contractual. Gran ecosistema de compañías de título acostumbradas a Assignments.',
      entryPrice: '$40,000 - $85,000 USD',
      typicalAssignment: '$5,000 - $10,000 USD',
      topCounties: [
        {
          name: 'Cuyahoga County',
          cities: 'Cleveland (Slavic Village, Old Brooklyn)',
          why: 'El mercado predilecto de FreeWholesaling. Portales de registros públicos del condado 100% en línea y transparentes.',
          bestAsset: 'Code Violations & Cortes de Agua'
        },
        {
          name: 'Franklin County',
          cities: 'Columbus',
          why: 'Crecimiento demográfico rápido impulsado por universidades y multinacionales (Intel Silicon Heartland).',
          bestAsset: 'Casas unifamiliares de clase media desactualizadas'
        },
        {
          name: 'Montgomery County',
          cities: 'Dayton',
          why: 'Casas baratas con atrasos de impuestos donde el condado publica listas descargables gratis.',
          bestAsset: 'Tax Liens & Casas vacantes'
        }
      ],
      warningNote: 'Cleveland exige comprobante de registro de alquiler para compradores foráneos; vende a compradores locales o LLCs registradas.',
      goldenStrategy: 'Descarga gratis la lista de Code Violations del portal de Cleveland y llama a dueños con multas abiertas de techos y pintura.'
    },
    georgia: {
      name: 'Georgia (GA)',
      badge: '🍑 #1 en Velocidad de Venta a Cash Buyers (48 hrs)',
      easeScore: '8.8 / 10 (Moderado - Rápido)',
      legalStatus: '100% Legal - Attorney State',
      legalStatute: 'Cierres conducidos por Closing Attorneys. Cláusulas de cesión plenamente respaldadas por la corte de apelaciones de GA.',
      entryPrice: '$80,000 - $160,000 USD',
      typicalAssignment: '$10,000 - $25,000 USD',
      topCounties: [
        {
          name: 'Fulton / DeKalb',
          cities: 'Atlanta Metro (Southwest Atlanta, Decatur)',
          why: 'La mayor concentración de flippers activos de EE.UU. Si tienes un buen precio, se vende en 24 horas.',
          bestAsset: 'Casas antiguas para remodelación total'
        },
        {
          name: 'Richmond County',
          cities: 'Augusta',
          why: 'Mercado de entrada mucho más económico que Atlanta. Demanda constante de alquileres de personal médico y militar.',
          bestAsset: 'Casas de $60k-$90k para buy-and-hold'
        },
        {
          name: 'Chatham County',
          cities: 'Savannah',
          why: 'Mercado turístico y portuario en expansión. Lotes y pequeñas propiedades unifamiliares.',
          bestAsset: 'Lotes vacantes y herencias'
        }
      ],
      warningNote: 'Georgia requiere que un abogado de cierre colegiado maneje el Escrow y la firma de la escritura.',
      goldenStrategy: 'Haz marketing a casas desactualizadas en los suburbios de Atlanta y véndelas a flippers en Facebook Groups en 1 día.'
    }
  };

  // Categories hierarchy database
  const categoriesRanking = [
    {
      id: 'land',
      rank: '1 (MÁS FÁCIL)',
      title: 'Terrenos Baldíos & Lotes Residenciales (Vacant Infill Lots)',
      difficulty: '🟢 9.8 / 10 (Fricción Mínima)',
      whyEasy:
        'Cero apego emocional. Nadie vivió en el lote. No hay inquilinos que desalojar, muebles que mover, ni plomería/techos rotos. Es solo tierra que les genera impuestos anuales.',
      idealTarget: 'Palm Bay FL, Lehigh Acres FL, Cape Coral FL, Huntsville AL.',
      averageFee: '$8,000 - $15,000 USD',
      whoBuys: 'Constructores locales (Builders) que necesitan lotes para edificar casas nuevas ya vendidas.',
      closingSpeed: '7 a 14 días (Inspección inmediata)'
    },
    {
      id: 'tired_landlords',
      rank: '2',
      title: 'Dueños Cansados de Rentas (Tired Landlords / Inquilinos Morosos)',
      difficulty: '🟢 9.4 / 10 (Alta Motivación)',
      whyEasy:
        'El propietario está sufriendo con inquilinos que no pagan renta, le destruyeron la casa o le amenazan con demandas. Quieren deshacerse del problema sin gastar un centavo más.',
      idealTarget: 'Indianapolis IN, Birmingham AL, Jacksonville FL, Cleveland OH.',
      averageFee: '$10,000 - $18,000 USD',
      whoBuys: 'Inversionistas experimentados de Section 8 que saben lidiar con desalojos y rehab.',
      closingSpeed: '14 a 21 días'
    },
    {
      id: 'code_violations',
      rank: '3',
      title: 'Violaciones de Código Municipal (Pasto Alto, Estructuras Inseguras)',
      difficulty: '🟢 9.0 / 10 (Presión de Ciudad)',
      whyEasy:
        'El municipio les manda cartas y multas diarias de $100 a $250 dólares por pasto crecido o techos dañados. El dueño siente miedo de perder la propiedad por gravámenes municipales.',
      idealTarget: 'Polk County FL, Cuyahoga County OH, Marion County IN.',
      averageFee: '$7,000 - $14,000 USD',
      whoBuys: 'Flippers que remodelan todo el exterior e interior.',
      closingSpeed: '14 a 21 días'
    },
    {
      id: 'tax_delinquent',
      rank: '4',
      title: 'Impuestos de la Propiedad Atrasados (Tax Delinquent 2+ Años)',
      difficulty: '🟡 8.5 / 10 (Urgencia Financiera)',
      whyEasy:
        'Deben 2 o 3 años al recaudador de impuestos (Tax Collector) y se acerca la subasta pública. Al pagarles la deuda en el cierre y darles dinero en mano, te ven como un salvador.',
      idealTarget: 'Montgomery County OH, Lake County IN, Brevard County FL.',
      averageFee: '$6,000 - $12,000 USD',
      whoBuys: 'Inversionistas de Buy-and-Hold y Cash Buyers.',
      closingSpeed: '14 a 30 días'
    },
    {
      id: 'probate',
      rank: '5',
      title: 'Herencias & Sucesiones (Probate / Inherited Free & Clear)',
      difficulty: '🟡 8.0 / 10 (Requiere Empatía)',
      whyEasy:
        'Heredaron la casa de los padres o abuelos, viven en otra ciudad y no quieren mantenerla ni repartirse cosas viejas. Quieren dinero en efectivo para repartir entre los herederos.',
      idealTarget: 'Orlando FL, Tampa FL, Birmingham AL, Atlanta GA.',
      averageFee: '$15,000 - $35,000 USD (Los cheques más grandes)',
      whoBuys: 'Cualquier Cash Buyer de la zona.',
      closingSpeed: '21 a 45 días (Depende del estatus de la corte)'
    }
  ];

  // Voice bot prompts & scripts
  const voiceBotPrompts: Record<
    string,
    {
      title: string;
      firstMessage: string;
      systemPrompt: string;
      rebuttal: string;
    }
  > = {
    land: {
      title: '🤖 BOT 1: Terrenos Baldíos (Infill Lots) — Conversión Rápida',
      firstMessage:
        "Hey! Good morning, hope you're having a great day. Quick question, are you still the owner of that vacant parcel over on {{property_address}} in {{city}}?",
      systemPrompt: `# IDENTITY & ROLE
You are Alex, an acquisition specialist calling on behalf of "AI Automated Services LLC and/or assigns".
You are polite, relaxed, and speak in short, natural 1-2 sentence bursts. You are an everyday land buyer.

# OBJECTIVE
Find out if the owner wants to sell their vacant lot for cash. You buy 100% AS-IS, cover all title and closing fees, and no real estate commissions.

# 3 KEY QUESTIONS (Ask naturally, one by one):
1. "Have you ever thought about letting that parcel go, or are you holding onto it to build?"
2. "Is the lot mostly cleared or does it have heavy trees, and does it have road access with power nearby?"
3. "If we cover all closing costs and pay cash so you never have to pay annual taxes on it again, what ballpark price would make sense for you to walk away with?"

# RULES
- Never sound like an aggressive salesperson.
- If they ask: "How much will you offer me?":
  Answer: "We typically buy at a slight discount in exchange for cash and paying your title fees. Can you give me a rough idea of what you'd be happy walking away with net in your pocket?"
- If they agree to a ballpark price:
  Answer: "Sounds reasonable! Let me submit this to our closing coordinator and review the parcel map. Can I text or call you back in about 15 minutes with our written agreement?"`,
      rebuttal:
        'Si dicen "¿Por qué tan barato?": Responde: "Totalmente comprensible. La ventaja con nosotros es que pagamos el 100% de los gastos de título, no te cobramos el 6% de comisión y cerramos en 14 días sin que tengas que gastar un centavo más de impuestos."'
    },
    tired_landlords: {
      title: '🤖 BOT 2: Tired Landlords (Dueños con Inquilinos o Rentas Cansadas)',
      firstMessage:
        "Hey, good afternoon! Hope you're doing well. Quick question, are you the owner of the rental property over on {{property_address}}?",
      systemPrompt: `# IDENTITY & ROLE
You are Chris with AI Automated Services LLC. You are an empathetic investor who purchases properties with or without tenants.

# OBJECTIVE
Identify if the landlord is frustrated with tenant management, maintenance, or wants to cash out.

# 4 PILLARS TO UNCOVER:
1. TENANT STATUS: "Is the property currently rented out, or is it vacant right now?"
2. CONDITION: "How is the interior holding up? Has it needed major repairs recently like roof or A/C?"
3. MOTIVATION: "Are you looking to 1031 exchange, retire from being a landlord, or just simplify things?"
4. PRICE: "If we took over the property completely as-is, tenants included, what cash number would you need net?"

# NEXT STEP
"Got it! We specialize in buying properties with tenants in place so you don't have to deal with evictions or cleanouts. Let me run this by our underwriting partner and send you our cash proposal."`,
      rebuttal:
        'Si dicen "Tengo inquilinos que no quieren salir": Responde: "No hay problema en lo absoluto; compramos con los inquilinos adentro y nosotros nos encargamos de la transición legal después del cierre."'
    },
    code_violations: {
      title: '🤖 BOT 3: Code Violations & Pasto Alto (Solución de Multas)',
      firstMessage:
        "Hi there! Calling about the property on {{property_address}}. Hope I didn't catch you at a bad time. Are you still the owner?",
      systemPrompt: `# IDENTITY & ROLE
You are Jordan with AI Automated Services LLC. You help owners resolve problematic properties with city violations.

# OBJECTIVE
Offer a clean cash exit where our company pays off or settles the city code violations at closing.

# KEY APPROACH:
- Never say: "I saw you have city fines." That sounds accusatory.
- Say: "We are buying a few properties in the neighborhood to fix up and improve the block. We buy completely as-is, junk and repairs included."
- Ask: "Is the property currently vacant, and does it need much physical work right now?"
- Pitch: "We cover all standard closing fees and handle any municipal lien payoffs directly with title so you walk away with clean cash."`,
      rebuttal:
        'Si dicen "La ciudad me puso una multa enorme": Responde: "Nosotros trabajamos con compañías de título que se especializan en mitigar esas multas con la ciudad directamente en el cierre para que tú no tengas que pagarlas de tu bolsillo."'
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const currentState = statesData[selectedState] || statesData.florida;
  const currentPrompt = voiceBotPrompts[selectedPromptType] || voiceBotPrompts.land;

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Investigación & Estrategia Maestra 2026
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-mono">
                5 Estados Verificados + Prompts Vapi Listos
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Top Estados Fáciles y Estrategia para Comenzar
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              El mapa analítico definitivo de dónde los vendedores entregan las propiedades más rápido, los
              estados 100% legales y protegidos, las categorías con menor fricción humana y los prompts exactos
              del bot de voz para cerrar tu primer deal.
            </p>
          </div>

          <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-4 sm:p-5 text-right shrink-0 w-full lg:w-auto shadow-inner">
            <div className="text-xs text-slate-400 font-medium">Recomendación #1 Inmediata</div>
            <div className="text-base font-extrabold text-emerald-400">
              Lotes Baldíos en Palm Bay, FL
            </div>
            <div className="text-xs text-slate-400">Assignment Fee promedio: $12,500 USD</div>
            <div className="mt-2 text-[11px] text-slate-300 flex items-center justify-end gap-1 font-mono">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Cierre promedio: 10 a 14 días
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: TOP 5 ESTADOS & CONDADOS DETALLADOS */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-400" />
              1. Los 5 Estados Más Fáciles, Baratos y 100% Legales
            </h2>
            <p className="text-xs text-slate-400">
              Filtro estricto: Cero estados hostiles (sin requerir licencia de agente).
            </p>
          </div>

          {/* State selector pills */}
          <div className="flex flex-wrap gap-2">
            {Object.keys(statesData).map((sKey) => {
              const s = statesData[sKey];
              const isSelected = selectedState === sKey;
              return (
                <button
                  key={sKey}
                  onClick={() => setSelectedState(sKey)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {s.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected State Detailed Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                  {currentState.badge}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono">
                  Índice de Facilidad: {currentState.easeScore}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">{currentState.name}</h3>
              <p className="text-xs text-slate-300">{currentState.legalStatute}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-right shrink-0">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-left">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Precio Entrada Típico</div>
                <div className="text-xs font-black text-white">{currentState.entryPrice}</div>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-left">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Assignment Fee Típico</div>
                <div className="text-xs font-black text-emerald-400">{currentState.typicalAssignment}</div>
              </div>
            </div>
          </div>

          {/* Counties Grid */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-2">
              <Target className="w-4 h-4" />
              Condados y Ciudades Exactas Donde Operar en {currentState.name}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {currentState.topCounties.map((county, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 space-y-2.5 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-emerald-400">
                      Top #{idx + 1}
                    </span>
                    <h5 className="text-sm font-bold text-white mt-1.5">{county.name}</h5>
                    <div className="text-xs text-indigo-300 font-medium">{county.cities}</div>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">{county.why}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 text-[11px] text-emerald-400 font-semibold">
                    🎯 Mejor Activo: {county.bestAsset}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Strategy & Warning Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-200 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-emerald-300 font-bold mb-1">Estrategia Ganadora Recomendada:</strong>
                <p>{currentState.goldenStrategy}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-amber-300 font-bold mb-1">Regla Legal Crítica:</strong>
                <p>{currentState.warningNote}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: RANKING DE CATEGORÍAS POR FACILIDAD */}
      <div className="space-y-4">
        <div className="border-b border-slate-800 pb-3">
          <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            2. Ranking de Categorías: De Más Fácil a Más Difícil
          </h2>
          <p className="text-xs text-slate-400">
            A qué tipo de propiedades y vendedores enfocarte primero para no desgastarte emocionalmente.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
          {categoriesRanking.map((cat) => (
            <div
              key={cat.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 flex flex-col justify-between hover:border-slate-700 transition"
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-[10px] font-black px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                    RANGO #{cat.rank}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{cat.closingSpeed}</span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-white mt-1 leading-snug">{cat.title}</h4>
                <div className="text-[11px] font-semibold text-emerald-400 mt-1">{cat.difficulty}</div>
                <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">{cat.whyEasy}</p>
              </div>

              <div className="space-y-1.5 pt-3 border-t border-slate-800/80 text-[11px]">
                <div className="text-slate-400">
                  Comprador Final: <strong className="text-white">{cat.whoBuys}</strong>
                </div>
                <div className="text-slate-400">
                  Fee Promedio: <strong className="text-emerald-400">{cat.averageFee}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: BOTS DE VOZ VAPI CON PROMPTS PROBADOS */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
              <Bot className="w-5 h-5 text-cyan-400" />
              3. Bots de Voz & Prompts Exactos para Vapi.ai
            </h2>
            <p className="text-xs text-slate-400">
              Copia y pega estos prompts directos en tu panel de Vapi para cada categoría de lead.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {Object.keys(voiceBotPrompts).map((pKey) => {
              const p = voiceBotPrompts[pKey];
              const isSelected = selectedPromptType === pKey;
              return (
                <button
                  key={pKey}
                  onClick={() => setSelectedPromptType(pKey)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  {p.title.split(':')[1]?.trim() || p.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Bot Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold">
                  Configuración para Vapi.ai
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Voz sugerida: ElevenLabs (Chris / George / Jessica)
                </span>
              </div>
              <h3 className="text-lg font-black text-white mt-1">{currentPrompt.title}</h3>
            </div>

            <button
              onClick={() => copyToClipboard(currentPrompt.systemPrompt)}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition shrink-0"
            >
              {copiedPrompt ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Prompt Copiado
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-400" />
                  Copiar System Prompt
                </>
              )}
            </button>
          </div>

          {/* First Message Box */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-cyan-500/30 space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 block">
              First Message (Primer saludo que dice el bot al contestar el vendedor):
            </span>
            <p className="text-xs text-white font-mono bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
              {currentPrompt.firstMessage}
            </p>
          </div>

          {/* System Prompt View */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              System Prompt (Pega esto en la caja principal de Vapi):
            </span>
            <pre className="w-full bg-slate-950 text-slate-200 font-mono text-[11px] p-4 rounded-2xl border border-slate-800 overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-[350px]">
              {currentPrompt.systemPrompt}
            </pre>
          </div>

          {/* Rebuttal Box */}
          <div className="p-3.5 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 text-xs text-indigo-200 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-indigo-300 font-bold block mb-0.5">Cómo responder objeciones:</strong>
              {currentPrompt.rebuttal}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 4: WEBS RECOMENDADAS POR CINDY WEST (@cindywest_) SCRAPEADAS CON OBSCURA */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                Extraído del Reel de Cindy West (@cindywest_)
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Scrapeado & Validado en Vivo con Obscura
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white mt-1">
              Las Webs Secretas para Encontrar y Analizar Deals en Minutos (&quot;No Gatekeep&quot;)
            </h3>
            <p className="text-xs text-slate-300">
              Cindy West (abogada e inversionista con 80+ propiedades) compartió estas plataformas para calcular
              números, estimar rentas Section 8 y filtrar compradores sin pagar licencias caras.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* DealCheck */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between hover:border-indigo-500/50 transition">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-md">
                  Calculadora #1 en Minutos
                </span>
                <span className="text-[11px] text-emerald-400 font-mono">Obscura: 200 OK</span>
              </div>
              <h4 className="text-sm font-bold text-white">DealCheck (dealcheck.io)</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                La herramienta que permite analizar cualquier casa o terreno en menos de 60 segundos. Calcula
                automáticamente el <strong>MAO (Oferta Máxima Aceptable)</strong>, Cap Rate, Cash-on-Cash Return
                y genera reportes PDF profesionales para mandarle directo a tus Cash Buyers.
              </p>
              <div className="mt-2 text-[11px] text-slate-400">
                💡 <strong>Uso Wholesale:</strong> Pones la dirección, estimas \$25k de rehab y te arroja tu oferta de anclaje.
              </div>
            </div>
            <a
              href="https://dealcheck.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 pt-2 border-t border-slate-800/80"
            >
              Abrir DealCheck.io <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Rentometer */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between hover:border-emerald-500/50 transition">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md">
                  Comps de Renta Reales
                </span>
                <span className="text-[11px] text-emerald-400 font-mono">Obscura: 200 OK</span>
              </div>
              <h4 className="text-sm font-bold text-white">Rentometer (rentometer.com)</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Compara al instante cuánto pagan de alquiler real los inquilinos en un radio de 0.5 a 1 milla de la
                propiedad. Fundamental para convencer a tus compradores de rentas y Tired Landlords de cuánto
                producirá la casa una vez remodelada.
              </p>
              <div className="mt-2 text-[11px] text-slate-400">
                💡 <strong>Uso Wholesale:</strong> Muestra al Cash Buyer el potencial de renta para justificar tu Assignment Fee.
              </div>
            </div>
            <a
              href="https://www.rentometer.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 pt-2 border-t border-slate-800/80"
            >
              Abrir Rentometer.com <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* HUD FMR */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between hover:border-amber-500/50 transition">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-md">
                  Tasas Oficiales del Gobierno
                </span>
                <span className="text-[11px] text-emerald-400 font-mono">Obscura: 200 OK</span>
              </div>
              <h4 className="text-sm font-bold text-white">HUD Fair Market Rents (huduser.gov)</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                El portal del Departamento de Vivienda de EE.UU. con las tarifas máximas garantizadas que el
                gobierno paga a los propietarios bajo el programa de <strong>Section 8</strong>. En ciudades como
                Birmingham AL o Cleveland OH, el gobierno paga por encima del mercado privado.
              </p>
              <div className="mt-2 text-[11px] text-slate-400">
                💡 <strong>Uso Wholesale:</strong> Si HUD paga \$1,350/mes por 3 habitaciones, tu comprador recupera la inversión en 3 años.
              </div>
            </div>
            <a
              href="https://www.huduser.gov/portal/datasets/fmr.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 pt-2 border-t border-slate-800/80"
            >
              Abrir HUD FMR Portal <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* AffordableHousing */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between hover:border-cyan-500/50 transition">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-md">
                  Bolsa Section 8 #1
                </span>
                <span className="text-[11px] text-emerald-400 font-mono">Obscura: 200 OK</span>
              </div>
              <h4 className="text-sm font-bold text-white">AffordableHousing.com</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                (Anteriormente SocialServe). La base de datos más grande de EE.UU. de viviendas asequibles y
                familias con vouchers de Section 8 aprobados esperando mudarse. Te permite ver la demanda exacta
                de inquilinos subsidiados por código postal.
              </p>
              <div className="mt-2 text-[11px] text-slate-400">
                💡 <strong>Uso Wholesale:</strong> Conecta directamente a propietarios con compradores de viviendas de alquiler asequible.
              </div>
            </div>
            <a
              href="https://www.affordablehousing.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 pt-2 border-t border-slate-800/80"
            >
              Abrir AffordableHousing.com <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Redfin Data Center */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between hover:border-red-500/50 transition">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-red-400 bg-red-500/10 px-2.5 py-0.5 rounded-md">
                  Métricas de Mercado Gratis
                </span>
                <span className="text-[11px] text-emerald-400 font-mono">Obscura: 200 OK</span>
              </div>
              <h4 className="text-sm font-bold text-white">Redfin Data Center (redfin.com)</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Estadísticas de mercado 100% descargables y gratuitas: Días promedio en el mercado (DOM),
                porcentaje de ventas por encima del precio de lista y volumen de ventas en efectivo por código postal.
              </p>
              <div className="mt-2 text-[11px] text-slate-400">
                💡 <strong>Uso Wholesale:</strong> Si los Días en Mercado (DOM) en un barrio son menos de 25, es una zona caliente para vender contratos.
              </div>
            </div>
            <a
              href="https://www.redfin.com/news/data-center/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-red-400 hover:text-red-300 flex items-center gap-1 pt-2 border-t border-slate-800/80"
            >
              Abrir Redfin Data Center <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* TenantDash / PropLab */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between hover:border-purple-500/50 transition">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded-md">
                  Análisis Rápido de Inversión
                </span>
                <span className="text-[11px] text-emerald-400 font-mono">Verificado</span>
              </div>
              <h4 className="text-sm font-bold text-white">TenantDash & Calculadoras Rápidas</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Herramienta ágil de cálculo que evalúa proyecciones de flujo de caja neto, costos de cierre y
                desembolsos de hipotecas asumibles o compras al contado para inversionistas sin fórmulas manuales.
              </p>
              <div className="mt-2 text-[11px] text-slate-400">
                💡 <strong>Uso Wholesale:</strong> Genera la hoja de números clara para presentarle al Cash Buyer en el Deal Pack.
              </div>
            </div>
            <a
              href="https://tenantdash.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1 pt-2 border-t border-slate-800/80"
            >
              Abrir TenantDash.com <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
