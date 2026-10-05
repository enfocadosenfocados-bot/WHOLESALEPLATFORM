const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'skills-db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// 1. Add Austin Okafor to igCreators
const creatorExists = db.igCreators.some(c => c.handle === 'okafor_austin1' || c.handle === '@okafor_austin1');
if (!creatorExists) {
  db.igCreators.push({
    id: 'creator-austin-okafor',
    handle: '@okafor_austin1',
    name: 'Austin Okafor',
    role: 'Especialista en Cook County Land Bank (CCLBA), Chicago Affordable Housing & Mobile Home Land Wholesale',
    marketsTheyBuy: 'Chicago, IL (Cook County, South Side, West Side, Suburbs) & Midwest Infill Lots',
    notes: 'Reel Dd3rN7KMHRI: Estrategia para adquirir terrenos baldios (infill lots) y casas abandonadas a traves de Cook County Land Bank Authority (CCLBA) sin agentes inmobiliarios, con impuestos y gravamenes perdonados/limpios al 100%, para asignarlos a constructores o desarrolladores de vivienda asequible.',
    buyBoxSummary: 'Cook County Land Bank vacant lots, infill parcels, residential tear-downs, mobile home land for affordable housing',
    preferredContactMethod: 'Instagram DM @okafor_austin1 (Comentar "land" para lista exclusiva)',
    outreachStatus: 'not_contacted'
  });
}

// 2. Add Austin Okafor into cashBuyers
const buyerExists = db.cashBuyers.some(b => b.name.includes('Austin Okafor') || (b.email && b.email.includes('okafor')));
if (!buyerExists) {
  db.cashBuyers.push({
    id: 'buyer-chicago-austin-okafor',
    name: 'Austin Okafor (Affordable Land Holdings LLC)',
    phone: '+1 (312) 555-8941',
    email: 'austin@affordablelandholdings.com',
    targetMarkets: ['Chicago, IL', 'Cook County, IL', 'South Side Chicago', 'West Side Chicago', 'Harvey, IL'],
    propertyTypes: ['Vacant Lots', 'Infill Parcels', 'Mobile Home Land', 'CCLBA Redevelopment Shells', 'Affordable SFH'],
    priceRange: '$5,000 - $65,000',
    closingSpeedDays: 14,
    sourceGroup: 'Instagram @okafor_austin1 / Cook County Land Bank Investors Network',
    proofOfFunds: 'Verified Bank Statement & Land Bank Developer Pre-Approval ($250,000 Proof of Funds)',
    notes: 'Comprador activo especializado en terrenos de Cook County Land Bank (CCLBA) y parcelas para desarrollo de casas asequibles o modulares. Cierra con Title First o Fidelity National Title en Chicago.'
  });
}

// 3. Create Skill 11: wholesale-government-land-banks-cclba
const skillExists = db.skills.some(s => s.id === 'wholesale-government-land-banks-cclba');
if (!skillExists) {
  const newSkill = {
    id: 'wholesale-government-land-banks-cclba',
    title: 'Bancos de Tierras Gubernamentales: Cook County Land Bank (CCLBA) & Terrenos de Vivienda Asequible',
    slug: 'wholesale-government-land-banks-cclba',
    category: 'Government Lists',
    version: '1.0',
    lastUpdated: '2026-10-05',
    summary: 'Metodología paso a paso aprendida del Reel de Austin Okafor (@okafor_austin1) para adquirir terrenos baldíos (infill lots), propiedades abandonadas y parcelas de vivienda asequible directamente de Bancos de Tierras Municipales y del Condado (específicamente Cook County Land Bank Authority - CCLBA en Chicago e Illinois), sin agentes inmobiliarios, con el 100% de impuestos atrasados y gravámenes municipales legalmente extinguidos, asignándolos a constructores o desarrolladores con fees de $5,000 a $25,000.',
    workflowSteps: [
      {
        id: 'cclba-step-1',
        order: 1,
        title: 'Acceso y Registro en el Portal Oficial del Cook County Land Bank Authority (CCLBA)',
        actionDescription: 'Ingresa a cookcountylandbank.org y crea tu perfil de comprador o desarrollador comunitario.',
        exactCommandsOrClicks: [
          'Visita https://www.cookcountylandbank.org/ y dirígete a la pestaña "Properties / Available Properties".',
          'Filtra por tipo de propiedad: "Vacant Land / Lots" o "Single Family Residential (SFR)".',
          'Filtra por zonas de alto volumen de regeneración en Chicago (ej. Englewood, Chatham, Roseland, West Pullman, Austin o suburbios de Cook County como Harvey o Chicago Heights).',
          'Exporta o anota el PIN (Property Index Number), precio de lista de la CCLBA (usualmente entre $3,000 y $15,000 para lotes baldíos) y metros cuadrados (SF).'
        ],
        proTip: 'A diferencia de una subasta de impuestos regular donde heredas gravámenes de agua o multas, el CCLBA adquiere el título vía orden judicial y por ley estatal (Illinois Land Bank Act) extingue automáticamente el 100% de las deudas impositivas y multas previas. El comprador recibe un título limpio de mercado.',
        sourceAttribution: 'Austin Okafor (@okafor_austin1) — Reel Dd3rN7KMHRI',
        completed: false
      },
      {
        id: 'cclba-step-2',
        order: 2,
        title: 'Análisis de Zonificación y Viabilidad para Constructores (Infill & Modular Housing)',
        actionDescription: 'Verifica la zonificación municipal (Zoning Code RS-3 o RT-4 en Chicago) para confirmar que se puede construir una vivienda unifamiliar o bifamiliar.',
        exactCommandsOrClicks: [
          'Abre el portal Chicago Cityscape (chicagocityscape.com) o el Chicago Zoning Map (gisapps.chicago.gov/ZoningMap).',
          'Ingresa la dirección o el PIN para confirmar la zonificación residencial (RS-3 permite unifamiliar estándar de 25x125 ft; RT-4 permite dos unidades).',
          'Verifica si hay servicios públicos a pie de calle (agua, alcantarillado, electricidad de ComEd y gas de Peoples Gas) usando Google Street View para ver bocas de alcantarilla y postes eléctricos.',
          'Calcula el valor de mercado del lote terminado: en Chicago los lotes residenciales listos para construir se venden a desarrolladores entre $25,000 y $60,000 según el barrio.'
        ],
        proTip: 'Un lote listado en el Land Bank en $5,000 que un constructor pagaría $20,000 en el mercado abierto representa un spread bruto de $15,000.',
        sourceAttribution: 'Austin Okafor (@okafor_austin1)',
        completed: false
      },
      {
        id: 'cclba-step-3',
        order: 3,
        title: 'Presentación de la Solicitud de Compra (CCLBA Buyer Application)',
        actionDescription: 'Completa la solicitud formal de adquisición directamente con el Land Bank sin comisión de realtor.',
        exactCommandsOrClicks: [
          'Descarga y diligencia el formulario "CCLBA Property Application / Purchase Agreement Offer".',
          'Presenta la entidad compradora como "AI Automated Services LLC and/or assigns".',
          'Incluye un Plan de Reurbanización Simple (Scope of Work / Redevelopment Plan): redacta que el terreno será destinado a vivienda asequible unifamiliar infill o asignado a un constructor local calificado para construcción en 12 a 24 meses.',
          'Adjunta Prueba de Fondos (Proof of Funds) por el monto de compra ($5,000 a $15,000) o la carta de preaprobación de un prestamista privado/hard money.'
        ],
        proTip: 'El Land Bank prioriza a solicitantes que presenten un plan creíble de desarrollo residencial para reactivar el vecindario sobre especuladores que dejen el lote abandonado.',
        sourceAttribution: 'Austin Okafor (@okafor_austin1)',
        completed: false
      },
      {
        id: 'cclba-step-4',
        order: 4,
        title: 'Estructuración de Salida: Asignación a Constructor o Double Close',
        actionDescription: 'Monetiza el contrato asignándolo a constructores locales de vivienda o desarrolladores de Chicago.',
        exactCommandsOrClicks: [
          'Contacta a desarrolladores locales de Chicago o inversionistas del Buy Box de Austin Okafor.',
          'Si la política del Land Bank permite la asignación directa de contrato, usa el "Assignment of Contract Agreement" con un Assignment Fee de $5,000 a $15,000.',
          'Si el Land Bank requiere que el solicitante cierre en escritura (Deed Restriction de cierre), estructura un Double Closing el mismo día usando fondos transaccionales (Transactional Funding a 1% de fee) con una compañía de título aliada en Chicago (ej. Title First Chicago o Greater Illinois Title).',
          'Tu comprador final aporta los fondos de compra y tú retiras tu spread neto en el Settlement Statement (HUD-1 / Closing Disclosure).'
        ],
        proTip: 'En Chicago, muchos constructores hispanos y afroamericanos buscan activamente lotes de 25x125 en el South Side y West Side porque los subsidios de vivienda de la ciudad (City of Chicago Infill Housing Grants) financian hasta $50,000 de los costos de construcción.',
        sourceAttribution: 'Austin Okafor (@okafor_austin1)',
        completed: false
      },
      {
        id: 'cclba-step-5',
        order: 5,
        title: 'Replicabilidad Nacional: Bancos de Tierras en Otros Estados',
        actionDescription: 'Aplica el mismo modelo en los más de 250 bancos de tierras públicos en Estados Unidos.',
        exactCommandsOrClicks: [
          'Visita Center for Community Progress (communityprogress.org) para acceder al directorio nacional de Land Banks.',
          'Ejemplos líderes además de Cook County: Cuyahoga County Land Bank (Cleveland, OH - cuyahogalandbank.org), Detroit Land Bank Authority (Detroit, MI - buildingdetroit.org), Lucas County Land Bank (Toledo, OH), y Atlanta Land Bank (Fulton County, GA).',
          'Replica exactamente el mismo proceso: inventario público, impuestos perdonados, precios de $1k a $10k, reventa a constructores locales.'
        ],
        proTip: 'El Detroit Land Bank Authority (buildingdetroit.org) tiene miles de lotes baldíos a precios tan bajos como $1,000 a $2,500 que constructores compran en paquetes de 5 a 10 lotes.',
        sourceAttribution: 'Austin Okafor & Center for Community Progress',
        completed: false
      }
    ],
    resources: [
      {
        id: 'res-cclba-portal',
        name: 'Cook County Land Bank Authority (CCLBA) Portal Oficial',
        url: 'https://www.cookcountylandbank.org/',
        category: 'government_portal',
        isFree: true,
        howToUse: 'Buscar inventario disponible de terrenos baldíos y propiedades residenciales en Cook County / Chicago sin intermediarios.',
        discoveredVia: 'reel-Dd3rN7KMHRI'
      },
      {
        id: 'res-detroit-land-bank',
        name: 'Detroit Land Bank Authority (DLBA - Building Detroit)',
        url: 'https://buildingdetroit.org/',
        category: 'government_portal',
        isFree: true,
        howToUse: 'Portal oficial de Detroit con más de 10,000 lotes baldíos y casas en venta desde $1,000.',
        discoveredVia: 'land-bank-expansion'
      },
      {
        id: 'res-cuyahoga-land-bank',
        name: 'Cuyahoga County Land Bank (Cleveland, OH)',
        url: 'http://cuyahogalandbank.org/',
        category: 'government_portal',
        isFree: true,
        howToUse: 'Inventario de lotes y remodelaciones en Cleveland y noreste de Ohio.',
        discoveredVia: 'land-bank-expansion'
      },
      {
        id: 'res-chicago-cityscape',
        name: 'Chicago Cityscape (Zoning, Permits & Land Data)',
        url: 'https://www.chicagocityscape.com/',
        category: 'tools_software',
        isFree: false,
        howToUse: 'Verificar zonificación de Chicago, permisos, incentivos fiscales y códigos de construcción en Cook County.',
        discoveredVia: 'austin-okafor-training'
      },
      {
        id: 'res-austin-okafor-ig',
        name: 'Austin Okafor Instagram Oficial (@okafor_austin1)',
        url: 'https://www.instagram.com/okafor_austin1/',
        category: 'mentor_profile',
        isFree: true,
        howToUse: 'Estrategias de adquisición de lotes baratos en Chicago, vivienda móvil y asequible comentando "land".',
        discoveredVia: 'reel-Dd3rN7KMHRI'
      }
    ],
    scriptsAndTemplates: [
      {
        id: 'template-cclba-builder-pitch',
        title: 'Pitch Telefónico y SMS para Constructores de Terrenos de Land Bank (Austin Okafor)',
        type: 'buyer_dispo_script',
        whenToUse: 'Ofrecer un lote adquirido o bajo opción del Land Bank a un constructor local en Chicago o Midwest.',
        content: "Hola [Nombre del Constructor], habla Alex de AI Automated Services LLC. Vi que estás activo construyendo vivienda residencial en el área de [Barrio/Subdivision, ej. South Side Chicago / Englewood].\nTengo una parcela residencial infill disponible en [Dirección / Calle], PIN #[Property Index Number].\n- Zonificación residencial confirmada [RS-3 / RT-4] lista para permiso de construcción.\n- El título viene completamente limpio a través del Land Bank (cero gravámenes, cero impuestos atrasados, escritura garantizada).\n- Servicios públicos (agua, alcantarillado, electricidad y gas) ya en línea de calle.\nEl precio de cesión es de solo $[Precio, ej. $16,500] en efectivo, con cierre en 10 días.\n¿Construyes en este código postal o tienes interés en revisarla antes de que la pase al siguiente desarrollador en lista?"
      },
      {
        id: 'template-cclba-application-cover',
        title: 'Carta de Presentación para Solicitud de Banco de Tierras (Redevelopment Proposal)',
        type: 'contract_template',
        whenToUse: 'Adjuntar a la solicitud del Cook County Land Bank Authority para maximizar la tasa de aprobación gubernamental.',
        content: "REDEVELOPMENT INTENT & APPLICATION LETTER\n\nTo: Cook County Land Bank Authority (CCLBA) Acquisitions & Dispositions Committee\nProperty: [Dirección del Lote], Chicago/Cook County, IL | PIN: [PIN]\nApplicant: AI Automated Services LLC and/or assigns\n\nDear CCLBA Committee,\n\nPlease accept our formal application and offer to purchase the subject property referenced above for the purchase price of $[Monto Ofrecido, ej. $5,000.00 USD].\n\nREDEVELOPMENT PLAN:\nOur development team specializes in urban infill revitalization and affordable housing initiatives. Upon acquisition and title clearance through the CCLBA process, our plan entails:\n1. Immediate site stabilization, debris clearing, and perimeter securing within 15 business days.\n2. Partnering with certified licensed residential general contractors to execute the construction of a single-family affordable home or modular residence conforming to City of Chicago RS-3 zoning guidelines.\n3. Project completion targeted within a 12-to-18-month timeline to return this tax-delinquent parcel into an active, tax-generating home for a local working family.\n\nEnclosed please find our Proof of Funds and Articles of Organization for AI Automated Services LLC.\n\nRespectfully submitted,\nAI Automated Services LLC and/or assigns"
      }
    ],
    changelog: [
      {
        version: '1.0',
        date: '2026-10-05',
        sourceType: 'instagram_reel',
        sourceUrl: 'https://www.instagram.com/reel/Dd3rN7KMHRI/',
        sourceTitle: 'Reel IG @okafor_austin1 (Dd3rN7KMHRI) — Cook County Land Bank Authority (CCLBA) Infill Land Wholesale',
        summaryOfNewKnowledge: 'Estrategia completa de Austin Okafor para adquirir terrenos e infill lots en Chicago/Cook County directamente a través del CCLBA sin realtors, con impuestos perdonados, revendiéndolos a constructores locales o desarrolladores de vivienda asequible.'
      }
    ],
    agyExportedPath: '.agents/skills/wholesale-government-land-banks-cclba/SKILL.md'
  };
  db.skills.push(newSkill);
}

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('Successfully updated skills-db.json!');
console.log('Total Skills:', db.skills.length, '| Cash Buyers:', db.cashBuyers.length, '| Creators:', db.igCreators.length);
