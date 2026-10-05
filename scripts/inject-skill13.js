const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'skills-db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// 1. Add Mads (@makingmoneywithmads) to igCreators
const creatorExists = db.igCreators.some(c => c.handle && c.handle.includes('makingmoneywithmads'));
if (!creatorExists) {
  db.igCreators.push({
    id: 'creator-mads-contract-flipping',
    handle: '@makingmoneywithmads',
    name: 'Mads (Making Money With Mads)',
    role: 'Especialista en AI Contract Flipping & Subastas de Propiedades Confiscadas por el Gobierno (Government Seized Properties)',
    marketsTheyBuy: 'Nacional (EE.UU.) con enfoque en propiedades confiscadas por impuestos/gobierno y compradores de alto flujo de efectivo',
    notes: 'Reel Ddq8BHmRP4g: Estrategia de \"AI Contract Flipping\" con propiedades embargadas y confiscadas por el gobierno. Uso de agentes de IA para rastrear subastas judiciales/fiscales, asegurar la opción del contrato bajo la cláusula de asignabilidad y transferirlo inmediatamente a compradores de efectivo.',
    buyBoxSummary: 'Propiedades confiscadas por el gobierno (Tax Deed / Forfeiture), inmuebles subastados con descuento >50% del valor de mercado para asignación inmediata',
    preferredContactMethod: 'Instagram DM @makingmoneywithmads',
    outreachStatus: 'not_contacted'
  });
}

// 2. Add Skill 13: AI Contract Flipping & Government Seized Properties (Mads Strategy)
const skillExists = db.skills.some(s => s.id === 'skill-13-ai-contract-flipping-government-seized');
if (!skillExists) {
  const newSkill = {
    id: 'skill-13-ai-contract-flipping-government-seized',
    title: 'AI Contract Flipping & Propiedades Confiscadas por el Gobierno (Tax Deed / Seized Assets)',
    slug: 'wholesale-ai-contract-flipping-government-seized',
    category: 'Government Lists',
    version: '1.0',
    lastUpdated: '2026-10-05',
    summary: 'Estrategia de alta velocidad aprendida de Mads (@makingmoneywithmads - Reel Ddq8BHmRP4g) para voltear contratos (Contract Flipping) mediante agentes de inteligencia artificial especializados en identificar propiedades confiscadas o embargadas por entidades gubernamentales (U.S. Marshals, IRS, subastas de Tax Deed y decomisos municipales), asegurándolas bajo contrato sin desembolso de compra para asignarlas a inversores con spreads de $10,000 a $30,000.',
    workflowSteps: [
      {
        id: 'seized-step-1',
        order: 1,
        title: 'Localización Automatizada de Activos Confiscados por el Gobierno (Seized & Forfeiture Portals)',
        actionDescription: 'Monitorea los repositorios oficiales donde el gobierno federal, estatal y del condado publica inmuebles confiscados y subastas públicas.',
        exactCommandsOrClicks: [
          'Visita los portales oficiales de decomiso federal: U.S. Marshals Service Real Property Auctions (usmarshals.gov/assets/sales.htm) y U.S. Treasury Seized Real Property (treasury.gov/auctions/treasury/rp).',
          'Monitorea portales de subastas judiciales y de impuestos del condado como Bid4Assets.com y RealAuction.com.',
          'Filtra propiedades listadas con precio de reserva inferior al 50% del valor tasado o propiedades "Post-Auction OTC" (Over-The-Counter) que no se vendieron en la subasta y el gobierno liquida directamente.'
        ],
        proTip: 'Las propiedades \"Over-The-Counter\" (OTC) en los condados son minas de oro porque el gobierno solo busca recuperar los impuestos atrasados (a menudo $2,000 a $8,000 en casas que valen $70,000).',
        sourceAttribution: 'Mads (@makingmoneywithmads) — Reel Ddq8BHmRP4g',
        completed: false
      },
      {
        id: 'seized-step-2',
        order: 2,
        title: 'Evaluación de Título y Deudas Ocultas (Lien Scrubbing & Title Check)',
        actionDescription: 'Verifica que la confiscación o subasta haya extinguido gravámenes hipotecarios anteriores o si existen deudas que deban negociarse.',
        exactCommandsOrClicks: [
          'Revisa el reporte de título preliminar o el registro del County Recorder.',
          'Verifica si el estado opera bajo \"Tax Deed\" (el título de la subasta extingue gravámenes anteriores) o \"Tax Lien\" (solo compras el certificado de deuda).',
          'Confirma con la compañía de título aliada (ej. Title One o Fidelity) si la propiedad requiere una demanda de aclaración de título (\"Quiet Title Action\") o si se puede asegurar con una póliza de título de inmediato.'
        ],
        proTip: 'Si requiere Quiet Title, muchas compañías de título amigas de inversionistas ofrecen seguros de título especiales vía Tax Title Services (taxtitleservices.com) en menos de 15 días sin ir a juicio prolongado.',
        sourceAttribution: 'Mads & AI Contract Flipping Protocol',
        completed: false
      },
      {
        id: 'seized-step-3',
        order: 3,
        title: 'Aseguramiento del Contrato de Compraventa con Cláusula de Asignación',
        actionDescription: 'Emite la oferta vinculante respaldada por AI Automated Services LLC and/or assigns.',
        exactCommandsOrClicks: [
          'Prepara el Purchase and Sale Agreement (PSA) As-Is.',
          'Incluye la cláusula de asignabilidad irrestricta: \"Buyer reserves the unencumbered right to assign this agreement to any third party or entity without requiring seller consent.\"',
          'Fija un plazo de cierre de 14 a 21 días con un Earnest Money Deposit (EMD) protegido por contingencia de inspección satisfactoria.'
        ],
        proTip: 'Tener la cláusula de asignabilidad clara desde el primer momento evita cualquier objeción legal en la compañía de título al momento de liquidar tu fee.',
        sourceAttribution: 'Mads (@makingmoneywithmads)',
        completed: false
      },
      {
        id: 'seized-step-4',
        order: 4,
        title: 'Volteo del Contrato (Contract Flip) con Inversionistas Cash Registrados',
        actionDescription: 'Transfiere el contrato a un comprador final de tu base de datos cobrando tu comisión de asignación.',
        exactCommandsOrClicks: [
          'Empareja la propiedad confiscada con los 43 compradores activos en la plataforma según su Buy Box geográfico y de precio.',
          'Envía el Deal Pack completo: fotos satelitales, registro del condado, precio de contrato y precio de cesión (Assignment Price).',
          'Firma el Assignment of Contract estipulando que el comprador final paga un fee neto (ej. $10,000 USD) y deposita un EMD no reembolsable en la compañía de título.',
          'La compañía de título cierra la transacción y deposita tu comisión directamente en tu cuenta de banco.'
        ],
        proTip: 'Dado que las propiedades confiscadas por el gobierno tienen un descuento tan masivo (50%-70% bajo mercado), los inversionistas experimentados pagan fees de hasta $20,000 en menos de 24 horas.',
        sourceAttribution: 'Mads (@makingmoneywithmads)',
        completed: false
      }
    ],
    resources: [
      {
        id: 'res-mads-ig',
        name: 'Mads Instagram Oficial (@makingmoneywithmads)',
        url: 'https://www.instagram.com/makingmoneywithmads/',
        category: 'mentor_profile',
        isFree: true,
        howToUse: 'Estrategias de Contract Flipping asistido por IA y monetización de propiedades confiscadas.',
        discoveredVia: 'reel-Ddq8BHmRP4g'
      },
      {
        id: 'res-us-marshals-auctions',
        name: 'U.S. Marshals Service Real Property Auctions',
        url: 'https://www.usmarshals.gov/what-we-do/asset-forfeiture/auctions',
        category: 'government_portal',
        isFree: true,
        howToUse: 'Búsqueda de propiedades residenciales confiscadas a nivel federal por agencias de ley en EE.UU.',
        discoveredVia: 'mads-government-seized-system'
      },
      {
        id: 'res-treasury-auctions',
        name: 'U.S. Treasury Seized Real Property Auctions',
        url: 'https://www.treasury.gov/auctions/treasury/rp/',
        category: 'government_portal',
        isFree: true,
        howToUse: 'Subastas públicas oficiales del Departamento del Tesoro de EE.UU. de inmuebles embargados.',
        discoveredVia: 'mads-government-seized-system'
      },
      {
        id: 'res-bid4assets',
        name: 'Bid4Assets Government Tax Deed Auctions',
        url: 'https://www.bid4assets.com/',
        category: 'lead_database',
        isFree: true,
        howToUse: 'Portal principal de subastas fiscales y embargos judiciales de condados en todo Estados Unidos.',
        discoveredVia: 'mads-government-seized-system'
      }
    ],
    scriptsAndTemplates: [
      {
        id: 'template-seized-property-pitch',
        title: 'Pitch Telefónico / Email para Inversionistas de Propiedades Confiscadas (Mads Contract Flip)',
        type: 'buyer_dispo_script',
        whenToUse: 'Presentar una propiedad adjudicada/confiscada por el gobierno a un Cash Buyer activo.',
        content: "\"Hola [Nombre del Inversionista], te habla Alex de AI Automated Services LLC.\nTengo bajo contrato exclusivo una propiedad residencial embargada por el gobierno/condado en [Dirección / Ciudad].\n- Adquirida directamente a través del proceso judicial fiscal con un descuento del [X%, ej. 58%] por debajo de los comps del vecindario.\n- ARV estimado: $[Valor Terminado, ej. $140,000]\n- Precio de Asignación Total: $[Precio Asignado, ej. $52,000]\n- Reparaciones estimadas: $[Monto Reparaciones, ej. $25,000]\n- Margen de ganancia neto proyectado: $[Ganancia Buyer, ej. $45,000+]\nCierre garantizado con compañía de título en 10 días.\n¿Quieres que te envíe el informe preliminar de título y el paquete de fotos ahora mismo antes de lanzarlo a la lista general?\""
      }
    ],
    changelog: [
      {
        version: '1.0',
        date: '2026-10-05',
        sourceType: 'instagram_reel',
        sourceUrl: 'https://www.instagram.com/reel/Ddq8BHmRP4g/',
        sourceTitle: 'Reel IG @makingmoneywithmads (Ddq8BHmRP4g) — AI Contract Flipping & Government Seized Properties',
        summaryOfNewKnowledge: 'Metodología de Mads para voltear contratos (Contract Flipping) mediante IA en propiedades confiscadas y embargadas por el gobierno (U.S. Marshals, Treasury, Tax Deeds y condados) asegurando el contrato y revendiéndolo a inversores con alta rentabilidad.'
      }
    ],
    agyExportedPath: '.agents/skills/wholesale-ai-contract-flipping-government-seized/SKILL.md'
  };
  db.skills.push(newSkill);
}

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('Successfully updated database with Skill 13 & Mads Creator!');
console.log('Total Skills:', db.skills.length, '| Cash Buyers:', db.cashBuyers.length, '| Creators:', db.igCreators.length);
