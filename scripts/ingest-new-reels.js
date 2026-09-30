const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(process.cwd(), 'data', 'skills-db.json');
const raw = fs.readFileSync(DB_PATH, 'utf-8');
const db = JSON.parse(raw);

// ─────────────────────────────────────────────────────────────────────────────
// 1. UPDATE SKILL: wholesale-free-skip-tracing-cold-calling (Richard Taylor DdpMUHvyuZZ)
// ─────────────────────────────────────────────────────────────────────────────
const coldCallingSkill = db.skills.find(s => s.slug === 'wholesale-free-skip-tracing-cold-calling');
if (coldCallingSkill) {
  coldCallingSkill.version = '1.4';
  coldCallingSkill.lastUpdated = '2026-09-30';
  coldCallingSkill.masteryScore = 98;

  // Add new step
  const existingStep = coldCallingSkill.steps.find(st => st.id === 'step-richard-taylor-live-call');
  if (!existingStep) {
    coldCallingSkill.steps.push({
      id: 'step-richard-taylor-live-call',
      order: coldCallingSkill.steps.length + 1,
      title: 'Metodología de Llamada en Vivo Start-to-Finish de Richard Taylor (@richardgrandintaylor — Hold My Hand Wholesale)',
      actionDescription: 'Protocolo telefónico exacto que utiliza Richard Taylor en llamadas en vivo de inicio a fin: cómo conectar con el vendedor sin sonar a vendedor agresivo, diagnosticar los 4 pilares en orden, calcular la oferta en tiempo real absorbiendo todos los costos de cierre y enviar el contrato de 1 página por SMS antes de colgar.',
      exactCommandsOrClicks: [
        'Apertura con Pattern Interrupt suave: "Hola [Nombre], habla Alex. Sé que no estabas esperando mi llamada, te llamo muy brevemente sobre tu casa en [Calle]. ¿Todavía eres el dueño de esa propiedad?".',
        'Pregunta de anclaje de precio inicial: "¿Si pudiéramos cerrar en efectivo en 10 días sin que tengas que reparar ni pintar nada, cuál sería el número más bajo con el que te sentirías cómodo caminando de la mesa de cierre?".',
        'Diagnóstico de condición física: indaga por los 4 sistemas mayores: techo (edad), plomería (fugas), electricidad y clima (HVAC).',
        'Presentación de la oferta calculada: "Basándome en que el techo y los pisos necesitan arreglo, nosotros asumimos el 100% de esos costos y pagamos todos los gastos de la compañía de título. Mi oferta neta directa para ti es de $[MAO] en efectivo. Si cerramos el viernes de la próxima semana, ¿hacemos el trato?".',
        'Manejo de objeción de Realtor / Zillow: "Con un realtor pidiendo el precio completo pagarías 6% de comisión más gastos y el comprador bancario te exigirá reparaciones de inspección. Nosotros te garantizamos $[MAO] netos en 10 días."',
        'Cierre instantáneo: "Te acabo de enviar el contrato de 1 página a tu celular. Solo abres el enlace con el dedo en tu pantalla y abrimos título hoy mismo."'
      ],
      proTip: 'En Hold My Hand Wholesale, Richard nunca discute el precio con el dueño. Plantea la oferta como un hecho matemático de costos de título y reparaciones absorbidas: "El número que nos permite pagar tus gastos y cerrar en 10 días es este".',
      sourceAttribution: 'Reel IG @richardgrandintaylor (DdpMUHvyuZZ)',
      completed: true
    });
  }

  // Add new template
  coldCallingSkill.scriptsAndTemplates.push({
    id: 'script-richard-taylor-full-call',
    title: 'Guión Maestro de Llamada en Vivo de Richard Taylor (Hold My Hand Wholesale)',
    type: 'phone_closer_script',
    whenToUse: 'Utilizar en cualquier llamada de captación de vendedores motivados para presentar la oferta MAO y cerrar el contrato telefónico en 8-12 minutos.',
    content: `[APERTURA - PATTERN INTERRUPT]
"Hola [Nombre del Dueño], habla Alex de WholesalePlatform. Sé que no estabas esperando mi llamada, te llamo muy brevemente sobre tu casa en la calle [Nombre de la Calle]. ¿Sigues siendo el propietario?"

[SI DICE SÍ]
"Excelente [Nombre]. Nosotros somos compradores directos de bienes raíces y estamos adquiriendo un par de propiedades en el área este mismo mes. Quería preguntarte: si recibieras una oferta de contado, sin tener que hacerle ningún arreglo a la casa y sin pagar comisiones de agente, ¿estarías abierto a considerar una oferta en efectivo?"

[DIAGNÓSTICO DE LOS 4 PILARES]
1. CONDICIÓN: "Para tener una idea clara antes de darte un número injusto, ¿qué arreglos mayores o mantenimiento pendiente tiene la casa? ¿Cómo está el techo, el aire acondicionado y las tuberías?"
2. MOTIVACIÓN: "¿Cuál es la razón principal por la que considerarías vender en este momento? ¿Quieres salir de la gestión de inquilinos, impuestos o reubicar el dinero?"
3. TIEMPO: "¿Qué tan rápido te gustaría tener el dinero en tu cuenta bancaria? ¿Te funcionaría un cierre en 10 a 14 días o necesitas tiempo para mudarte?"
4. PRECIO ANCLADO: "Si nosotros pagamos el 100% de los gastos de la compañía de título y tú no pagas ni un dólar de comisión, ¿cuál es el número neto más bajo con el que te sentirías cómodo saliendo de la mesa de cierre?"

[PRESENTACIÓN DE LA OFERTA CALCULADA]
"Entiendo perfectamente [Nombre]. Mira, haciendo los números con mi equipo: calculando que el techo y los pisos necesitan aproximadamente $[Estimado Reparaciones] que nosotros asumimos al 100%, y que nosotros pagamos todos los honorarios legales de cierre de título, mi oferta neta limpia en mano para ti es de $[Oferta MAO] en efectivo. Si cerramos el próximo viernes, ¿hacemos el trato?"

[MANEJO DE OBJECIÓN - "ES MUY POCO / PIDO MÁS"]
"Te comprendo [Nombre]. Si listas con un Realtor a tu precio ideal, vas a pagar el 6% de comisiones, más el 2-3% de gastos de cierre, y el banco del comprador te va a exigir miles de dólares en reparaciones tras la inspección, tardando de 60 a 90 días en pagar. Nosotros te garantizamos $[Oferta MAO] limpios y seguros en tu banco en 10 días hábiles. ¿Te ayudaría tener esa tranquilidad este mismo mes?"

[CIERRE Y ENVÍO DEL CONTRATO]
"Perfecto [Nombre]. Para formalizarlo y reservar los fondos con la compañía de título, te acabo de mandar el acuerdo de 1 página a tu celular por mensaje de texto. Solo ábrelo en tu pantalla, colocas tu firma con el dedo y comenzamos el trámite hoy mismo."`
  });

  // Add changelog
  coldCallingSkill.changelog.push({
    version: '1.4',
    date: '2026-09-30',
    sourceType: 'instagram_reel',
    sourceUrl: 'https://www.instagram.com/reel/DdpMUHvyuZZ/',
    sourceTitle: 'Reel IG @richardgrandintaylor (DdpMUHvyuZZ) — Start to Finish Live Call Closing',
    summaryOfNewKnowledge: 'Protocolo de llamada en vivo paso a paso de Richard Taylor en Hold My Hand Wholesale: apertura pattern interrupt, 4 preguntas de diagnóstico, oferta calculada absorbiendo costos de título y cierre con contrato por SMS.'
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. ADD NEW SKILL 10: wholesale-surplus-funds-overages-recovery (Eric Richardson DdsTk0nuRRe)
// ─────────────────────────────────────────────────────────────────────────────
const surplusSkillSlug = 'wholesale-surplus-funds-overages-recovery';
let surplusSkill = db.skills.find(s => s.slug === surplusSkillSlug);

if (!surplusSkill) {
  surplusSkill = {
    id: 'skill-surplus-funds-overages',
    slug: surplusSkillSlug,
    title: 'Recuperación de Fondos Excedentes (Surplus Funds / Tax Deed Overages) con Eric Richardson',
    category: 'Asset Recovery & Government Overages',
    version: '1.0',
    lastUpdated: '2026-09-30',
    masteryScore: 95,
    summary: 'Metodología exacta de Eric Richardson (@ericrichardsonofficial / MoneyMaking Juggernaut) para rastrear y reclamar fondos excedentes de subastas judiciales y remates de impuestos que el condado retiene en custodia legal, cobrando un 30% a 40% de contingencia sin costo inicial para el dueño anterior.',
    whyItWorks: 'Cuando una casa se subasta por más de la deuda de impuestos o hipoteca (ej. debía $20k pero se vendió en $100k en el remate judicial), los $80k sobrantes por ley pertenecen al dueño ejecutado. El condado los retiene en un fondo fiduciario y nunca los busca. El dueño no sabe que tiene ese dinero. Tú firmas un acuerdo de contingencia del 35%, tu abogado radicar la petición ante el juez y te llevas un cheque de $28,000 sin comprar la propiedad ni necesitar compradores en efectivo.',
    executorType: 'surplus_funds_recovery',
    steps: [
      {
        id: 'surplus-step-1',
        order: 1,
        title: 'Descargar las Listas de Excedentes de Subastas (Foreclosure Surplus / Excess Proceeds List)',
        actionDescription: 'Accede a los portales oficiales del Clerk of the Circuit Court / County Comptroller de los condados objetivo y descarga la lista pública de "Foreclosure Surplus Funds" o "Tax Deed Overages".',
        exactCommandsOrClicks: [
          'Busca en Google: "[Nombre del Condado] Clerk of Court Foreclosure Surplus List" o "Tax Deed Excess Proceeds".',
          'Descarga el reporte en PDF o Excel emitido tras las subastas del mes anterior.',
          'Filtra casos donde el monto de excedente (Surplus Balance) sea superior a $15,000 (ideal entre $25,000 y $120,000).'
        ],
        proTip: 'En estados como Florida, Georgia, Texas y Ohio, los secretarios de los tribunales publican listas mensuales de sumas retenidas que superan millones de dólares en cuentas de fideicomiso.',
        sourceAttribution: 'Eric Richardson (@ericrichardsonofficial — MoneyMaking Juggernaut)',
        completed: false
      },
      {
        id: 'surplus-step-2',
        order: 2,
        title: 'Auditoría Forense del Expediente Judicial (Docket Title Search)',
        actionDescription: 'Revisa el expediente judicial del caso para verificar que segundas hipotecas (Junior Liens) o gravámenes del IRS no hayan consumido todo el sobrante.',
        exactCommandsOrClicks: [
          'Abre el buscador de casos del tribunal (County Civil Court Records Search) e ingresa el número de caso (Case Number).',
          'Revisa el "Certificate of Disbursements" o "Notice of Deposit of Surplus".',
          'Confirma si otros acreedores radicaron reclamaciones dentro del periodo legal (60-120 días).'
        ],
        proTip: 'Si no hay reclamos de segundos acreedores, el 100% de los fondos excedentes pertenecen al propietario registrado anterior.',
        sourceAttribution: 'Eric Richardson — Metodología Excess Elite CRM',
        completed: false
      },
      {
        id: 'surplus-step-3',
        order: 3,
        title: 'Skip-Tracing del Dueño Ejecutado (Previous Homeowner Search)',
        actionDescription: 'Localiza el número de teléfono celular actual y nueva dirección de residencia del dueño que perdió la propiedad.',
        exactCommandsOrClicks: [
          'Ingresa el nombre completo del demandado en FastPeopleSearch.com o CyberBackgroundChecks.com.',
          'Busca parientes cercanos si el dueño es de edad avanzada o no responde el teléfono principal.',
          'Valida si el propietario original falleció para contactar a los herederos legales (Affidavit of Heirship).'
        ],
        proTip: 'Dado que perdieron su casa recientemente en subasta, casi siempre se mudaron a una vivienda en renta o con familiares en los últimos 6 meses. La nueva dirección postal es clave.',
        sourceAttribution: 'Eric Richardson (@ericrichardsonofficial)',
        completed: false
      },
      {
        id: 'surplus-step-4',
        order: 4,
        title: 'Llamada Telefónica con el Guión de Eric Richardson (Sin sonar a estafa)',
        actionDescription: 'Comunícate con el dueño con empatía, informándole sobre los fondos que el condado tiene retenidos a su favor y ofreciendo gestionar el reclamo sin ningún costo por adelantado.',
        exactCommandsOrClicks: [
          'Apertura empática: "Hola [Nombre], te llamo con respecto a la propiedad que tenías en [Dirección]. Mi empresa se especializa en auditoría de registros del condado. Notamos que tras la subasta judicial, el tribunal tiene fondos excedentes retenidos que por ley te pertenecen."',
          'Manejo de sospecha: "Nosotros cubrimos todos los honorarios legales y de abogados. Tú no pagas ni un solo dólar de tu bolsillo; cobramos un porcentaje de honorarios de contingencia únicamente cuando el cheque sea emitido por el juez a tu favor."',
          'Envío del Acuerdo de Contingencia (Contingency Fee Agreement 30%-40%) y Limited Power of Attorney para firma digital inmediata.'
        ],
        proTip: 'Nunca pidas números de cuenta ni dinero por adelantado; eso genera confianza absoluta porque el cheque sale a nombre del cliente o de la cuenta fiduciaria del abogado.',
        sourceAttribution: 'Reel IG @ericrichardsonofficial (DdsTk0nuRRe)',
        completed: false
      },
      {
        id: 'surplus-step-5',
        order: 5,
        title: 'Radicación de la Moción de Desembolso ante el Juez (Motion to Disburse Funds)',
        actionDescription: 'El abogado del equipo radica la petición formal ante el juez del condado para ordenar la entrega de los fondos retenidos.',
        exactCommandsOrClicks: [
          'El abogado envía la "Motion for Disbursement of Surplus Proceeds" adjuntando el acuerdo de representación y la prueba de identidad.',
          'El juez firma la "Order Directing Clerk to Disburse Surplus Funds".',
          'El Clerk emite el cheque o transferencia bancaria en 14 a 30 días.',
          'Se distribuyen los fondos: el 60%-70% va directo al cliente y el 30%-40% ingresa a tu cuenta bancaria como ganancia neta.'
        ],
        proTip: 'Un solo deal de excedente promedio de $45,000 te deja entre $13,500 y $18,000 netos de ganancia sin haber arriesgado un dólar de capital.',
        sourceAttribution: 'Eric Richardson — MoneyMaking Juggernaut',
        completed: false
      }
    ],
    resources: [
      {
        id: 'res-eric-richardson-ig',
        name: 'Eric Richardson Instagram Oficial (@ericrichardsonofficial)',
        url: 'https://www.instagram.com/ericrichardsonofficial/',
        category: 'mentor_profile',
        isFree: true,
        howToUse: 'Casos de estudio reales de cobros de cheques de $20k a $100k de excedentes judiciales.',
        discoveredVia: 'reel-DdsTk0nuRRe'
      },
      {
        id: 'res-fl-clerk-surplus',
        name: 'Florida Clerks of Court Directory (Surplus Lists)',
        url: 'https://www.flclerks.com/',
        category: 'government_portal',
        isFree: true,
        howToUse: 'Directorio oficial para descargar reportes de excedentes de subastas en los 67 condados de Florida.',
        discoveredVia: 'eric-richardson-training'
      }
    ],
    scriptsAndTemplates: [
      {
        id: 'template-surplus-call-script',
        title: 'Guión Telefónico de Recuperación de Fondos Excedentes (Eric Richardson)',
        type: 'phone_closer_script',
        whenToUse: 'Llamar al dueño que perdió su casa en subasta judicial de impuestos o hipoteca.',
        content: `"Hola [Nombre del Propietario], le habla Alex de WholesalePlatform Asset Recovery. Sé que esta llamada puede sorprenderlo, pero le llamo con respecto a la propiedad que usted tenía anteriormente en [Dirección].

¿Tiene un minuto para una excelente noticia financiera?

Mire [Nombre], la mayoría de las personas no lo saben, pero cuando su propiedad fue vendida en la subasta del condado el mes pasado, se vendió por una cantidad mayor a la deuda que existía. Por ley estatal, ese dinero sobrante —conocido como fondos excedentes o 'surplus funds'— le pertenece al 100% a usted, no al banco ni al condado.

El tribunal del condado actualmente tiene retenida una suma aproximada de $[Monto Excedente, ej. $45,000] en su cuenta de custodia. Sin embargo, si usted no radica la petición legal correspondiente dentro del plazo legal, ese dinero puede perderse ante el estado.

Nuestra firma trabaja con abogados locales especializados. Nosotros nos encargamos de preparar todos los documentos, radicarlos ante el juez y solicitar la emisión de su cheque.

Lo más importante: nosotros cubrimos el 100% de los costos legales. Usted NO paga ni un solo centavo de su bolsillo. Trabajamos bajo honorarios de contingencia del 35%, lo que significa que solo cobramos una vez que el tribunal apruebe y entregue su dinero. Si no le entregamos dinero, a usted no le cuesta nada.

¿Le gustaría que le enviemos hoy el acuerdo de 1 página por correo electrónico o a su teléfono para comenzar el reclamo de sus fondos de inmediato?"`
      },
      {
        id: 'template-surplus-contingency-agreement',
        title: 'Acuerdo de Honorarios de Contingencia para Fondos Excedentes (Contingency Agreement)',
        type: 'contract_template',
        whenToUse: 'Hacer que el dueño anterior firme antes de radicar la moción ante el tribunal.',
        content: `SURPLUS FUNDS RECOVERY & CONTINGENCY FEE AGREEMENT
Claimant (Former Property Owner): [Nombre del Dueño]
Property Subject of Foreclosure: [Dirección de la Propiedad]
Court Case Number: [Número de Caso del Tribunal]
County / State: [Condado, Estado]

1. AUTHORIZATION: Claimant hereby authorizes WholesalePlatform Asset Recovery LLC and its affiliated legal counsel to locate, audit, process, and file all necessary petitions and motions before the Court to recover and release all unclaimed excess auction proceeds (Surplus Funds) resulting from the foreclosure or tax sale of the Subject Property.

2. CONTINGENCY FEE STRUCTURE: In consideration of the services rendered, Claimant agrees that WholesalePlatform LLC shall receive a contingency recovery fee equal to thirty-five percent (35%) of the total gross surplus funds actually disbursed by the Clerk of Court. 

3. ZERO OUT-OF-POCKET EXPENSE: WholesalePlatform LLC shall bear all upfront administrative and legal costs. If no funds are disbursed by the Court, Claimant owes ZERO DOLLARS ($0.00).

4. DISBURSEMENT: The Clerk of the Court is hereby requested to disburse the approved funds to the designated Escrow Account for proper distribution per this agreement.`
      }
    ],
    changelog: [
      {
        version: '1.0',
        date: '2026-09-30',
        sourceType: 'instagram_reel',
        sourceUrl: 'https://www.instagram.com/reel/DdsTk0nuRRe/',
        sourceTitle: 'Reel IG @ericrichardsonofficial (DdsTk0nuRRe) — Surplus Funds & Overages Recovery System',
        summaryOfNewKnowledge: 'Estrategia completa de Eric Richardson (MoneyMaking Juggernaut) para rastrear y cobrar excedentes de subastas judiciales retenidos por los tribunales con 35% de comisión sin comprar casas.'
      }
    ],
    agyExportedPath: '.agents/skills/wholesale-surplus-funds-overages-recovery/SKILL.md'
  };

  db.skills.push(surplusSkill);
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. ADD ERIC RICHARDSON TO IG CREATORS
// ─────────────────────────────────────────────────────────────────────────────
if (!db.igCreators) db.igCreators = [];
const existingCreator = db.igCreators.find(c => c.handle?.toLowerCase().includes('ericrichardson'));
if (!existingCreator) {
  db.igCreators.push({
    id: 'creator-eric-richardson',
    handle: 'ericrichardsonofficial',
    name: 'Eric Richardson (MoneyMaking Juggernaut)',
    role: 'Especialista Líder en Surplus Funds, Tax Deed Overages & Asset Recovery',
    marketsTheyBuy: 'Nacional (Florida, Texas, Georgia, Carolina del Norte, Ohio, California)',
    notes: 'Reel DdsTk0nuRRe: Sistema para cobrar cheques de $15k a $80k en fondos excedentes de subastas retenidos en los tribunales del condado con 35% de contingencia.',
    buyBoxSummary: 'Foreclosure Surplus Lists, Tax Deed Excess Proceeds >$15,000 retenidos por County Clerks',
    preferredContactMethod: 'Instagram DM @ericrichardsonofficial / YouTube MoneyMaking Juggernaut',
    outreachStatus: 'not_contacted'
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. ADD ERIC RICHARDSON TO CASH BUYERS / JV PARTNERS
// ─────────────────────────────────────────────────────────────────────────────
if (!db.cashBuyers) db.cashBuyers = [];
const existingBuyer = db.cashBuyers.find(b => b.id === 'cb-creator-eric-richardson');
if (!existingBuyer) {
  db.cashBuyers.push({
    id: 'cb-creator-eric-richardson',
    name: 'Eric Richardson (@ericrichardsonofficial — MoneyMaking Juggernaut / Surplus Funds)',
    companyOrGroup: 'Prestige Family Assets & MoneyMaking Juggernaut (Reel DdsTk0nuRRe)',
    creatorHandle: '@ericrichardsonofficial',
    platform: 'reel_buyer',
    market: 'Florida (Tampa, Orlando, Jacksonville, Miami), Texas (DFW, Houston), Georgia (Atlanta), NC y Nacional',
    buyBoxType: 'Multifamily / Creative', // Asset recovery
    maxPrice: 'Excedentes de $15,000 a $150,000+ retenidos por el Condado',
    finderPayoutOffer: '💰 Paga 50/50 JV sobre la comisión de contingencia ($7,500 a $30,000+ por cheque de excedente cobrado)',
    dealRequirementMode: 'both_accepted',
    dealRequirementLabel: '🤝 Acepta AMBOS (Solo Encontrar la Lista de Excedente O Contacto con el Dueño Anterior)',
    dealRequirementDetails: 'Si encuentras un caso en los registros del condado con más de $20,000 en surplus retenido o ya tienes el contacto del dueño anterior, Eric Richardson y su equipo radican la moción legal con su abogado y dividen 50/50 la comisión cobrada.',
    propertySpecsWanted: '• Subastas de impuestos (Tax Deeds) y ejecuciones hipotecarias terminadas en los últimos 60-180 días con excedente no reclamado >$15,000.',
    priceAndArvRange: '• Fondos en custodia del Clerk of Court entre $15,000 y $250,000.',
    contactInfo: 'IG DM: @ericrichardsonofficial | YouTube: MoneyMaking Juggernaut',
    sourceUrl: 'https://www.instagram.com/reel/DdsTk0nuRRe/',
    verified: true
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. SAVE DB & EXPORT ANTIGRAVITY SKILLS
// ─────────────────────────────────────────────────────────────────────────────
fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
console.log('✅ Database updated successfully with Reel 1 (Richard Taylor DdpMUHvyuZZ) and Reel 2 (Eric Richardson DdsTk0nuRRe)');
console.log('Total skills now:', db.skills.length);
console.log('Total IG creators now:', db.igCreators.length);
console.log('Total Cash buyers now:', db.cashBuyers.length);
