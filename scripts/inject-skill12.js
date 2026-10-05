const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'skills-db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// 1. UPDATE RICHARD TAYLOR CREATOR DETAILS
const richard = db.igCreators.find(c => c.handle && c.handle.includes('richardgrandintaylor'));
if (richard) {
  const newReels = [
    'https://www.instagram.com/reel/Ddmekg-JyxX/',
    'https://www.instagram.com/reel/Dd6tPg6imii/'
  ];
  newReels.forEach(r => {
    if (!richard.reelUrls.includes(r)) {
      richard.reelUrls.push(r);
    }
  });
  richard.reelsCount = richard.reelUrls.length;
  richard.notes = (richard.notes || '') + ' | Reels Ddmekg-JyxX & Dd6tPg6imii: Sistema rápido de $5,000 profit de principio a fin (Find distressed seller, lock at discount, 14-day close, $5k assignment).';
}

// 2. UPDATE OLIVIA SCHREMMER CREATOR DETAILS
const olivia = db.igCreators.find(c => c.handle && c.handle.includes('olivia_schremmer'));
if (olivia) {
  const newReels = [
    'https://www.instagram.com/reel/DW-cpNYAimV/',
    'https://www.instagram.com/p/DeGJC56FtMz/'
  ];
  newReels.forEach(r => {
    if (!olivia.reelUrls.includes(r)) {
      olivia.reelUrls.push(r);
    }
  });
  olivia.reelsCount = olivia.reelUrls.length;
  olivia.notes = (olivia.notes || '') + ' | Post DW-cpNYAimV & DeGJC56FtMz: Adquisición de casas gratis (Free Houses) mediante Subject-To / Liens impagos y uso del agente de automatización de ofertas "Muse AI" (83 ofertas enviadas en 7 horas en piloto automático).';
}

// 3. CREATE SKILL 12: Autonomous Offer Agent & Zero-Cash Acquisitions (Muse AI + Free Houses)
const skillExists = db.skills.some(s => s.id === 'skill-12-muse-ai-offer-automation');
if (!skillExists) {
  const newSkill = {
    id: 'skill-12-muse-ai-offer-automation',
    title: 'Automatización de Ofertas Masivas con IA (Muse / AI Agent) & Adquisición a Costo Cero (Free Houses)',
    slug: 'wholesale-muse-ai-offer-automation-free-houses',
    category: 'Lead Gen & D4D',
    version: '1.0',
    lastUpdated: '2026-10-05',
    summary: 'Metodología integral extraída de Olivia Schremmer (@olivia_schremmer) y Richard Taylor (@richardgrandintaylor) para ejecutar un pipeline automatizado de 80+ ofertas diarias sin intervención humana utilizando agentes IA (Muse / Meta AI) sobre Zillow y listas de gobierno, combinado con la adquisición de propiedades a costo cero ($0 out of pocket) asumiendo gravámenes o Subject-To y cerrando transacciones rápidas de $5,000 profit en 14 días.',
    workflowSteps: [
      {
        id: 'muse-step-1',
        order: 1,
        title: 'Calibración de la Regla de Oferta Rápida (The 80% Rule & Formula de Richard Taylor $5k Profit)',
        actionDescription: 'Define los parámetros matemáticos automáticos para que el agente IA calcule ofertas instantáneas sin análisis manual lento.',
        exactCommandsOrClicks: [
          'Calcula el Max Offer rápido: (Zestimate o Comps recientes de casas vendidas * 0.70) - Reparaciones estimadas ($15,000 cosmético / $30,000 medio) - Fee mínimo ($5,000 USD).',
          'Para casas listadas en Zillow con más de 45 días en el mercado (Stale Listings) o FSBO, fija la oferta de entrada al 65%-75% del precio de lista.',
          'Configura la entidad legal compradora como: "AI Automated Services LLC and/or assigns".'
        ],
        proTip: 'Richard Taylor demuestra que buscando spreads de $5,000 a $7,000 la fricción con los vendedores disminuye un 80% y los compradores inversionistas compran el contrato en menos de 48 horas sin regatear.',
        sourceAttribution: 'Richard Taylor (@richardgrandintaylor) — Reel Dd6tPg6imii',
        completed: false
      },
      {
        id: 'muse-step-2',
        order: 2,
        title: 'Configuración del Bot de Ofertas Autónomo (Muse AI / Agente Zillow Pipeline)',
        actionDescription: 'Activa el flujo de trabajo de Olivia Schremmer para lanzar 80+ ofertas escritas en 7 horas mientras estás fuera de la oficina.',
        exactCommandsOrClicks: [
          'El bot escanea propiedades filtradas en Zillow (Keywords: "Fixer upper", "Handyman special", "TLC", "Motivated", "Cash only", "As-is").',
          'Extrae el número de teléfono o correo del agente o del propietario FSBO.',
          'Genera un Letter of Intent (LOI) o Purchase Agreement simplificado de 1 página con inspección de 14 días y depósito EMD de $100.',
          'Envía automáticamente el LOI pre-firmado por correo electrónico y notifica al vendedor por SMS: "Hola [Nombre], acabamos de enviar una oferta formal en efectivo sin contingencias bancarias a su correo para [Dirección]. AI Automated Services LLC puede cerrar en 14 días."'
        ],
        proTip: 'Enviar 80 ofertas genera un ratio de respuesta del 6% al 10% (5 a 8 negociaciones activas), asegurando de 1 a 2 contratos firmados cada semana en piloto automático.',
        sourceAttribution: 'Olivia Schremmer (@olivia_schremmer) — Post DeGJC56FtMz (83 offers while driving)',
        completed: false
      },
      {
        id: 'muse-step-3',
        order: 3,
        title: 'Estrategia "Casas Gratis" ($0 Cash Out of Pocket / Subject-To & Lien Assumption)',
        actionDescription: 'Estructuración para adquirir el control de propiedades sin pagar dinero en efectivo al vendedor.',
        exactCommandsOrClicks: [
          'Filtra dueños con propiedades abandonadas, heredadas o con deudas de impuestos atrasados (Back Taxes) que superan su interés en conservar la casa.',
          'Estructura la oferta de alivio: "No te pago efectivo, pero AI Automated Services LLC se hace cargo de la deuda de impuestos atrasados ($4,000) y de las multas de la ciudad, liberándote de toda responsabilidad legal y daño a tu crédito."',
          'Si la casa tiene hipoteca existente activa, asume las mensualidades bajo Subject-To ($0 down al vendedor, solo cubriendo atrasos ante el banco).'
        ],
        proTip: 'Al vendedor en esta situación no le importa el dinero en efectivo; su máxima prioridad es que la ciudad deje de enviarle multas o amenazas de cárcel por violaciones de código.',
        sourceAttribution: 'Olivia Schremmer (@olivia_schremmer) — Post DW-cpNYAimV (How to get houses for FREE)',
        completed: false
      },
      {
        id: 'muse-step-4',
        order: 4,
        title: 'Cierre Exprés de $5,000 en 14 Días (The Richard Taylor Start-to-Finish Play)',
        actionDescription: 'Cierra el ciclo completo de la transacción y cobra el cheque de $5,000 en la compañía de título.',
        exactCommandsOrClicks: [
          'Una vez firmado el contrato por el vendedor, envía inmediatamente el PSA a la compañía de título aliada (ej. Title One Detroit o Fidelity).',
          'Dispara la alerta de deal a tu base de 43 compradores verificados en la plataforma con el Buy Box correspondiente.',
          'Firma el Assignment of Contract a $5,000 por encima del precio acordado con el vendedor.',
          'El comprador deposita $2,500 de EMD no reembolsable en la compañía de título dentro de las 48 horas.',
          'Día 14: La compañía de título transfiere el dinero al vendedor y te emite tu cheque o transferencia de $5,000 USD de ganancia neta.'
        ],
        proTip: 'Mantener un objetivo constante de $5,000 de fee por deal te permite hacer volumen (4 a 6 tratos al mes = $20,000 a $30,000/mes) con mínima resistencia del mercado.',
        sourceAttribution: 'Richard Taylor (@richardgrandintaylor) — Reel Dd6tPg6imii',
        completed: false
      }
    ],
    resources: [
      {
        id: 'res-richard-taylor-ig-new',
        name: 'Richard Taylor Instagram (@richardgrandintaylor)',
        url: 'https://www.instagram.com/richardgrandintaylor/',
        category: 'mentor_profile',
        isFree: true,
        howToUse: 'Casos de estudio de deals de $5k a $10k cerrados de principio a fin.',
        discoveredVia: 'reels-Ddmekg-Dd6t'
      },
      {
        id: 'res-olivia-schremmer-ig-new',
        name: 'Olivia Schremmer Instagram (@olivia_schremmer)',
        url: 'https://www.instagram.com/olivia_schremmer/',
        category: 'mentor_profile',
        isFree: true,
        howToUse: 'Flujos de automatización de ofertas con IA y técnicas de Free Houses / Subject-To.',
        discoveredVia: 'reels-DW-cp-DeGJC'
      },
      {
        id: 'res-zillow-scraper-tool',
        name: 'Zillow Distressed Stale Listings Scraper',
        url: 'https://www.zillow.com',
        category: 'lead_database',
        isFree: true,
        howToUse: 'Filtro de propiedades >45 días con palabras clave de urgencia para bots de ofertas.',
        discoveredVia: 'olivia-schremmer-muse-system'
      }
    ],
    scriptsAndTemplates: [
      {
        id: 'template-muse-ai-instant-loi',
        title: 'Carta de Intención Instantánea de Oferta Automatizada (Muse AI 1-Page LOI)',
        type: 'contract_template',
        whenToUse: 'Enviar automáticamente a 80+ propiedades al día en Zillow o listas fiscales.',
        content: "NON-BINDING CASH OFFER & LETTER OF INTENT (LOI)\n\nDate: [Fecha Actual]\nTo: Property Owner / Listing Agent of: [Dirección de la Propiedad]\nFrom: AI Automated Services LLC and/or assigns\n\nDear Owner,\n\nOur investment company, AI Automated Services LLC, hereby submits this formal cash offer to purchase the subject property referenced above under the following streamlined terms:\n\n1. PURCHASE PRICE: $[Monto Calculado por IA, ej. $58,000.00 USD] All-Cash.\n2. AS-IS CONDITION: Zero repairs required from Seller. We acquire the property strictly As-Is.\n3. ZERO COMMISSIONS: Seller pays no broker or agent commissions.\n4. EARNEST MONEY DEPOSIT: $500.00 USD held with a licensed regional Title & Escrow Company.\n5. CLOSING TIMELINE: On or before 14 business days from contract execution.\n6. DUE DILIGENCE: 10-business-day standard inspection and property verification period.\n\nPlease reply to this email or call us at (800) 555-0199 to accept this offer and receive the formal 2-page Purchase and Sale Agreement.\n\nRespectfully,\nAI Automated Services LLC and/or assigns"
      },
      {
        id: 'template-free-house-pitch',
        title: 'Guión Telefónico / SMS para Casas con Deuda Impositiva o Multas ($0 Cash / Free House Pitch)',
        type: 'phone_closer_script',
        whenToUse: 'Vendedores abrumados por multas de código o impuestos acumulados que quieren deshacerse de la casa.',
        content: "\"Hola [Nombre del Dueño], te habla Alex de AI Automated Services LLC. Te contacto con respecto a la casa en [Dirección].\n\nVimos que la propiedad tiene una deuda acumulada con el condado por concepto de [impuestos atrasados / multas de código de la ciudad por $[Monto, ej. $6,500]].\n\nSé que esta situación es un dolor de cabeza constante y que la ciudad puede iniciar procesos legales. Nosotros tenemos una solución directa:\n\nNosotros nos hacemos cargo de liquidar el 100% de la deuda con el municipio y la compañía de título se encarga de transferir la propiedad legalmente. Tú no tienes que desembolsar ni un solo centavo de tu bolsillo y te liberas inmediatamente de las responsabilidades, demandas y multas de la propiedad.\n\n¿Estarías abierto a que nos encarguemos de resolver esta deuda por ti a cambio de la transferencia del título esta misma semana?\""
      }
    ],
    changelog: [
      {
        version: '1.0',
        date: '2026-10-05',
        sourceType: 'instagram_reel',
        sourceUrl: 'https://www.instagram.com/p/DeGJC56FtMz/',
        sourceTitle: 'Reels Richard Taylor (@richardgrandintaylor) & Olivia Schremmer (@olivia_schremmer)',
        summaryOfNewKnowledge: 'Estrategia de 83 ofertas automáticas con IA (Muse AI) mientras viajas, monetización rápida de $5k de principio a fin de Richard Taylor, y técnicas de adquisición a $0 (Free Houses) asumiendo gravámenes y back taxes.'
      }
    ],
    agyExportedPath: '.agents/skills/wholesale-muse-ai-offer-automation-free-houses/SKILL.md'
  };
  db.skills.push(newSkill);
}

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('Successfully updated database!');
console.log('Total Skills:', db.skills.length, '| Cash Buyers:', db.cashBuyers.length, '| Creators:', db.igCreators.length);
