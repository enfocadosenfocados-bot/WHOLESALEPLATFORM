import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'skills-db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

const NEW_20_CREATOR_AND_NETWORK_BUYERS = [
  {
    id: 'cb-creator-ryan-pineda',
    name: 'Ryan Pineda (@ryanpineda — Homerun Offer / Forever Capital / Wealthy Investor)',
    companyOrGroup: 'Forever Capital & Homerun Offer (Las Vegas & Nationwide)',
    creatorHandle: '@ryanpineda',
    platform: 'reel_buyer',
    market: 'Las Vegas (NV), Phoenix (AZ), California, Texas, Florida, Atlanta (GA) y Midwest',
    buyBoxType: 'Fix & Flip',
    maxPrice: 'Casas $120,000 a $850,000 (Fix & Flip y carteras de alquiler)',
    finderPayoutOffer: '💰 Paga 50/50 JV Split ($10,000 a $35,000+) o Compra Directa con Fondos Propios en Las Vegas',
    dealRequirementMode: 'both_accepted',
    dealRequirementLabel: '🤝 Acepta AMBOS (Solo el Lead Calificado para su Equipo O Contrato PSA Firmado)',
    dealRequirementDetails:
      '1) CON CONTRATO FIRMADO: Envías el PSA firmado con 14–21 días de inspección; su equipo de Homerun Offer / Forever Capital compra directamente en efectivo o lo mueve con sus inversionistas VIP dividiendo 50/50.\n2) SIN CONTRATO FIRMADO: Si tienes un vendedor motivado al teléfono pero necesitas a un cerrador experimentado para estructurar la oferta o una llamada de 3 vías, su equipo de adquisiciones entra contigo para cerrar y dividir.',
    propertySpecsWanted:
      '• Casas Single-Family y Condos construidos después de 1970, 3+ Beds, 2+ Baths, para Fix & Flip o alquiler a largo plazo.\n• Propiedades con potencial de Airbnb / Medium-Term Rental (en mercados que permitan alquiler temporal).\n• Pequeños multifamiliares (Duplex, Triplex, Fourplex).',
    priceAndArvRange:
      '• Fórmula: Precio <= (ARV × 70%) - Costo de Reparaciones.\n• ARV: $150,000 a $900,000.',
    contactInfo: 'Portal: ryanpineda.com | IG: @ryanpineda | Homerun Offer',
    sourceUrl: 'https://ryanpineda.com/',
    directContactChannels: {
      dealPortalUrl: 'https://ryanpineda.com/',
      socialDmUrl: 'https://www.instagram.com/ryanpineda/',
      communityUrl: 'https://www.youtube.com/@RyanPineda',
    },
    readyPitchMessage: `Hey Ryan & Team! I have an off-market deal in [Ciudad, Estado]. Property: [Beds/Baths/SqFt], Target/Contract Price: $[Precio], ARV: $[ARV], Rehab: $[Reparaciones]. Looking to partner up or see if Forever Capital wants to buy it direct!`,
    notes:
      'Ex-jugador profesional de béisbol y uno de los mayores flippers de Las Vegas con más de 500 casas remodeladas. Compra directamente o hace JV nacional.',
    verified: true,
  },
  {
    id: 'cb-creator-max-maxwell',
    name: 'Max Maxwell (@therealmaxwell — Wholesaling Elite & Cash Buyers Club)',
    companyOrGroup: 'Wholesaling Elite Network (North Carolina & Nationwide)',
    creatorHandle: '@therealmaxwell',
    platform: 'reel_buyer',
    market: 'North Carolina (Greensboro, Winston-Salem, Charlotte, Raleigh, High Point) y Florida',
    buyBoxType: 'Fix & Flip',
    maxPrice: '$45,000 a $380,000 (Casas Feas para Remodelación Completa)',
    finderPayoutOffer: '💰 Paga 50/50 JV Split ($10,000 a $25,000 promedio) o Compra Directa en North Carolina',
    dealRequirementMode: 'contract_signed',
    dealRequirementLabel: '📄 Requiere Contrato Ya Firmado (Signed PSA con Cláusula de Asignación)',
    dealRequirementDetails:
      'Pide que ya tengas el contrato firmado directo con el propietario (con 14–30 días de Inspection Period). Cuenta con una de las listas de compradores en efectivo más consolidadas de las Carolinas y el Sureste para colocar contratos en menos de 5 días.',
    propertySpecsWanted:
      '• Casas Single-Family 3+ Beds, 1+ Baths con alta necesidad de reparación cosmética o estructural (techos viejos, baños de época, pintura, cocina).\n• Excelente para herencias (Probate), dueños ausentes y embargos fiscales.',
    priceAndArvRange:
      '• Margen: Compra al 65%–70% del ARV menos reparaciones.\n• ARV: $120,000 a $400,000.',
    contactInfo: 'IG: @therealmaxwell | Web: maxmaxwell.com',
    sourceUrl: 'https://www.instagram.com/therealmaxwell/',
    directContactChannels: {
      socialDmUrl: 'https://www.instagram.com/therealmaxwell/',
      communityUrl: 'https://www.youtube.com/@MaxMaxwell',
    },
    readyPitchMessage: `Hey Max! I locked up an off-market deal in [Ciudad, NC/Estado] at $[Precio] (ARV $[ARV], Rehab ~$[Reparaciones]). Contract is direct to seller with clear title. Ready to JV and dispo with your buyers!`,
    notes:
      'Pionero del wholesaling moderno en YouTube con cientos de transacciones documentadas en Carolina del Norte y Florida.',
    verified: true,
  },
  {
    id: 'cb-creator-alex-martinez',
    name: 'Alex Martinez (@alexmartinez — Real Estate Skills / Pro Wholesaler VIP Dispo)',
    companyOrGroup: 'Real Estate Skills Nationwide Network (50 Estados)',
    creatorHandle: '@alexmartinez',
    platform: 'reel_buyer',
    market: 'Nacional (Todo EE.UU. — Mercados primarios y secundarios)',
    buyBoxType: 'Fix & Flip',
    maxPrice: '$60,000 a $650,000 (Cash Flips, BRRRR y Pequeños Multifamiliares)',
    finderPayoutOffer: '💰 Paga 50/50 JV Split ($12,000 a $30,000 por deal) con Red de Compradores VIP',
    dealRequirementMode: 'both_accepted',
    dealRequirementLabel: '🤝 Acepta AMBOS (Asesoría para Cerrar el Lead O Dispo con Contrato Firmado)',
    dealRequirementDetails:
      '1) CON CONTRATO FIRMADO: Pasan tu contrato a su red de graduados y fondos de inversión locales para asegurar el EMD en 48 horas.\n2) SIN CONTRATO FIRMADO: Su comunidad de "Pro Wholesalers" te ayuda a formular la oferta MAO y el guion para cerrar al vendedor si aún no has firmado.',
    propertySpecsWanted:
      '• Single-Family Flips (3/2, >1,100 SqFt) y propiedades con potencial de renta BRRRR.\n• Duplex y Triplex con unidades vacías listas para aumentar renta.',
    priceAndArvRange:
      '• Precio de compra <= (ARV × 70%) - Reparaciones.\n• ARV: $140,000 a $650,000.',
    contactInfo: 'Web: realestateskills.com | IG: @alexmartinez',
    sourceUrl: 'https://www.realestateskills.com/',
    directContactChannels: {
      dealPortalUrl: 'https://www.realestateskills.com/',
      socialDmUrl: 'https://www.instagram.com/alexmartinez/',
    },
    readyPitchMessage: `Hi Alex! Sourced an off-market property in [Ciudad, Estado] that fits your 70% ARV formula ($[Precio Contrato], ARV $[ARV], Repairs $[Reparaciones]). Would love to partner on dispo with your VIP buyers network!`,
    notes:
      'Fundador de RealEstateSkills.com, autor y operador enfocado en profesionalizar la asignación de contratos y co-wholesaling.',
    verified: true,
  },
  {
    id: 'cb-creator-austin-rutherford',
    name: 'Austin Rutherford (@austinrutherfordofficial — Elevate Capital / Ohio & FL Cash Buyer)',
    companyOrGroup: 'Elevate Real Estate Holdings (Columbus OH & Florida)',
    creatorHandle: '@austinrutherfordofficial',
    platform: 'reel_buyer',
    market: 'Columbus, Cleveland, Cincinnati, Dayton (Ohio) y Florida (Tampa, Orlando, Miami, Jacksonville)',
    buyBoxType: 'Fix & Flip',
    maxPrice: '$50,000 a $550,000 (Compra Directa con Fondos Propios)',
    finderPayoutOffer: '💰 Paga $10,000 Finder’s Fee o 100% de tu Assignment Fee (como comprador final) O 50/50 JV',
    dealRequirementMode: 'both_accepted',
    dealRequirementLabel: '🤝 Acepta AMBOS (Compra Directa en Ohio sin intermediarios O Contrato Asignable)',
    dealRequirementDetails:
      'En Ohio actúa como Comprador Final en Efectivo (End-Buyer), lo que significa que puedes simplemente pasarle la propiedad para que su equipo la compre y tú cobres tu fee completo sin tener que buscar a nadie más. En otros estados hacen JV 50/50.',
    propertySpecsWanted:
      '• Casas Single-Family y Multifamiliares (2–8 unidades) en Columbus OH y Florida para Fix & Flip o alquileres de alta rentabilidad (Airbnb / Short Term Rentals).\n• Propiedades con alto equity libre de hipoteca o herencias.',
    priceAndArvRange:
      '• Ohio: Precios de compra entre $50,000 y $220,000.\n• Florida: Precios entre $120,000 y $450,000.',
    contactInfo: 'IG: @austinrutherfordofficial | Web: austinrutherford.com',
    sourceUrl: 'https://www.instagram.com/austinrutherfordofficial/',
    directContactChannels: {
      dealPortalUrl: 'https://austinrutherford.com/',
      socialDmUrl: 'https://www.instagram.com/austinrutherfordofficial/',
    },
    readyPitchMessage: `Hey Austin! I have an off-market deal in [Columbus OH / Florida] at $[Precio] (ARV $[ARV], Rehab $[Reparaciones], [Beds/Baths]). Sending photos to see if you want to buy it direct!`,
    notes:
      'Inversionista de alto volumen en Ohio que empezó a los 20 años y ha comprado más de 300 propiedades con fondos propios.',
    verified: true,
  },
  {
    id: 'cb-the-deal-club',
    name: 'The Deal Club (@thedealclub.io — Nationwide 50/50 JV Disposition Platform)',
    companyOrGroup: 'The Deal Club JV Network',
    creatorHandle: 'The Deal Club Dispo',
    platform: 'web_directory',
    market: 'Nacional (Todo EE.UU. — Especialmente Texas, Florida, Midwest y Sureste)',
    buyBoxType: 'Fix & Flip',
    maxPrice: 'Cualquier precio de $40,000 a $800,000 con margen comprobable',
    finderPayoutOffer: '💰 50/50 JV Split (Sin costos iniciales — Solo cobran cuando el comprador deposita los fondos al cierre)',
    dealRequirementMode: 'contract_signed',
    dealRequirementLabel: '📄 Requiere Contrato Ya Firmado (No-Exclusivo — Puedes seguir vendiéndolo tú mismo)',
    dealRequirementDetails:
      'Sube tu contrato firmado con el vendedor en su portal; su equipo de Dispo lo envía a miles de compradores en efectivo verificados y coloca el EMD en la compañía de título. El acuerdo no es exclusivo, por lo que si tú encuentras un comprador primero, te quedas con el 100%.',
    propertySpecsWanted:
      '• Casas Single-Family y pequeños multifamiliares bajo contrato con al menos 10 días restantes de Inspection Period.\n• Requieren fotos organizadas (enlace a Google Drive/Dropbox) y números de compra claros.',
    priceAndArvRange:
      '• Precio de contrato con al menos $20,000 de margen bajo el 70% del ARV.',
    contactInfo: 'Portal: thedealclub.io',
    sourceUrl: 'https://thedealclub.io/',
    directContactChannels: {
      dealPortalUrl: 'https://thedealclub.io/',
    },
    readyPitchMessage: `Submitting a verified under-contract property in [Ciudad, Estado] for 50/50 JV dispo. Contract price: $[Precio], ARV: $[ARV], Estimated Rehab: $[Reparaciones], Inspection days left: [Días].`,
    notes:
      'Plataforma especializada en ayudar a wholesalers que tienen el contrato cerrado pero no tienen lista de compradores en esa ciudad.',
    verified: true,
  },
  {
    id: 'cb-dispobridge',
    name: 'DispoBridge (Done-For-You Wholesaling Dispositions & Cash Buyer Matching)',
    companyOrGroup: 'DispoBridge Network',
    creatorHandle: 'DispoBridge',
    platform: 'web_directory',
    market: 'Nacional (Sunbelt: TX, FL, GA, NC, TN, AZ y Midwest: OH, MI, IN, MO)',
    buyBoxType: 'Fix & Flip',
    maxPrice: '$50,000 a $650,000',
    finderPayoutOffer: '💰 50/50 JV Split en el Assignment Fee al cerrar (Cero tarifas por adelantado)',
    dealRequirementMode: 'contract_signed',
    dealRequirementLabel: '📄 Requiere Contrato Ya Firmado con el Dueño',
    dealRequirementDetails:
      'Envías tu contrato firmado con el vendedor. DispoBridge redacta el paquete de marketing, hace el envío masivo por SMS y correo a compradores locales de ese código postal y gestiona el contrato de asignación con el comprador final.',
    propertySpecsWanted:
      '• Propiedades residenciales unifamiliares con título limpio o saneable en compañía de título inversionista.',
    priceAndArvRange:
      '• Margen mínimo de $15,000 de Assignment Fee.',
    contactInfo: 'Web: dispobridge.com',
    sourceUrl: 'https://dispobridge.com/',
    directContactChannels: {
      dealPortalUrl: 'https://dispobridge.com/',
    },
    readyPitchMessage: `Hello DispoBridge team! I have an under-contract wholesale property in [Zip Code / Ciudad] ready for disposition. Asking Assignment: $[Fee], Purchase Price: $[Precio], ARV: $[ARV].`,
    notes:
      'Servicio de Dispo llave en mano para acelerar la venta de contratos antes de que venza el período de inspección.',
    verified: true,
  },
  {
    id: 'cb-aggreigator-dispo',
    name: 'AggREIgator (AI Cash Buyer Matching & 50/50 to 70/30 JV Engine)',
    companyOrGroup: 'AggREIgator Dispo Software',
    creatorHandle: 'AggREIgator',
    platform: 'web_directory',
    market: 'Nacional (50 Estados)',
    buyBoxType: 'Fix & Flip',
    maxPrice: '$40,000 a $900,000',
    finderPayoutOffer: '💰 50/50 a 70/30 JV Split (70% para ti según el volumen de contratos que envíes)',
    dealRequirementMode: 'contract_signed',
    dealRequirementLabel: '📄 Requiere Contrato Ya Firmado',
    dealRequirementDetails:
      'Plataforma que empareja automáticamente las especificaciones de tu contrato (Zip Code, precio, ARV, condición) con los criterios de compra de fondos y compradores institucionales.',
    propertySpecsWanted:
      '• Single-Family Flips, BRRRR rentals y lotes bajo contrato.',
    priceAndArvRange:
      '• Fórmulas de inversión estándar (70% ARV menos reparaciones).',
    contactInfo: 'Portal: aggreigator.com',
    sourceUrl: 'https://aggreigator.com/',
    directContactChannels: {
      dealPortalUrl: 'https://aggreigator.com/',
    },
    readyPitchMessage: `Submitting new wholesale contract to AggREIgator engine in [Ciudad, Estado]. Property: [Beds/Baths], Price: $[Precio], ARV: $[ARV].`,
    notes:
      'Excelente herramienta tecnológica para encontrar compradores institucionales y flippers verificados por código postal.',
    verified: true,
  },
  {
    id: 'cb-creator-ron-dan-apke',
    name: 'Ron Apke & Dan Apke (@landinvestingonline — Land Investing Online / Deal Funding & 100% Capital JV)',
    companyOrGroup: 'Land Investing Online (LIO) Deal Funding Partner',
    creatorHandle: '@landinvestingonline',
    platform: 'builder_database',
    market: 'Texas, Florida, North Carolina, Tennessee, Arkansas, Arizona, Georgia, Ohio y Colorado',
    buyBoxType: 'Land / Home Builder',
    maxPrice: 'Terrenos de $15,000 a $400,000 (Ellos aportan el 100% del dinero de compra)',
    finderPayoutOffer: '💰 30% a 50% de las Ganancias Netas ($8,000 a $40,000+ por lote) — ELLOS PONEN EL 100% DEL EFECTIVO',
    dealRequirementMode: 'both_accepted',
    dealRequirementLabel: '🤝 Acepta AMBOS (Solo Encontrar el Lote a Descuento O Contrato Firmado — Ellos ponen el dinero)',
    dealRequirementDetails:
      '1) SOLO ENCONTRAR EL TERRENO A DESCUENTO: Uno de los mejores programas de financiamiento conjunto (Deal Funding). Si encuentras un terreno baldío de 1 a 40 acres donde el dueño acepta vender al 35%–45% del valor de mercado, tú NO necesitas tener dinero en el banco: los hermanos Apke revisan el lote, ponen el 100% del efectivo para comprarlo en la compañía de título, lo revenden en el mercado y te transfieren el 30% al 50% de la ganancia neta.\n2) CON CONTRATO FIRMADO: Lo fondean de inmediato.',
    propertySpecsWanted:
      '• Terrenos baldíos (Rural, Semi-rural o Subdivisible) de 1 a 50 acres.\n• Requisitos: Acceso legal por servidumbre o calle pública (Legal & Physical Access), terreno mayoritariamente seco (fuera de humedales/floodway), zonificación sin restricciones severas.',
    priceAndArvRange:
      '• Debes asegurar el terreno al 35% al 45% del valor comparativo de reventa en efectivo (ej. si el terreno vale $80,000, acordarlo con el dueño entre $28,000 y $36,000).',
    contactInfo: 'Web: landinvestingonline.com | YouTube: Land Investing Online',
    sourceUrl: 'https://landinvestingonline.com/',
    directContactChannels: {
      dealPortalUrl: 'https://landinvestingonline.com/',
      socialDmUrl: 'https://www.youtube.com/@landinvestingonline',
    },
    readyPitchMessage: `Hey Ron & Dan! I found a high-equity vacant land deal in [Condado, Estado]. [Acres] acres with legal road access and power nearby. Owner agrees to sell at $[Precio] and market resale value is ~$[ARV]. Submitting for Deal Funding / JV!`,
    notes:
      'Líderes reconocidos en Land Flipping con un fondo propio de Deal Funding para cerrar terrenos sin que el buscador use su propio dinero.',
    verified: true,
  },
  {
    id: 'cb-creator-sumner-healey',
    name: 'Sumner Healey (@sumnerhealey — Land Pioneer / The Land Loaner JV Funding)',
    companyOrGroup: 'The Land Pioneer & Land Funding Network',
    creatorHandle: '@sumnerhealey',
    platform: 'builder_database',
    market: 'Suroeste y Sureste (Arizona, Nevada, Nuevo México, Texas, Florida, Georgia, Carolina del Norte)',
    buyBoxType: 'Land / Home Builder',
    maxPrice: 'Terrenos $10,000 a $250,000',
    finderPayoutOffer: '💰 40/60 a 50/50 Split en Ganancias Netas (Aportan el 100% del Capital de Cierre)',
    dealRequirementMode: 'both_accepted',
    dealRequirementLabel: '🤝 Acepta AMBOS (Lead de Terreno Pre-Acordado O Contrato Firmado)',
    dealRequirementDetails:
      'Si negocias un lote o parcela rural a un precio muy por debajo del mercado, Sumner Healey y su red de inversionistas de terrenos financian la compra, cubren los gastos de título y comercializan el terreno para dividir las ganancias.',
    propertySpecsWanted:
      '• Terrenos de 0.5 a 20 acres con demanda para casas manufacturadas, cabañas o recreación.\n• Acceso para vehículos (Dirt Road o Paved Road) y topografía aprovechable.',
    priceAndArvRange:
      '• Compra al 40%–50% del valor de mercado.',
    contactInfo: 'IG: @sumnerhealey | Web: thelandpioneer.com',
    sourceUrl: 'https://www.instagram.com/sumnerhealey/',
    directContactChannels: {
      dealPortalUrl: 'https://thelandpioneer.com/',
      socialDmUrl: 'https://www.instagram.com/sumnerhealey/',
    },
    readyPitchMessage: `Hi Sumner! Sourced a discounted land deal in [Condado, Estado]. [Acres] acres with road access. Purchase price: $[Precio], Comp value: $[Valor]. Looking to partner on JV funding!`,
    notes:
      'Especialista en terrenos rurales y suburbanos; financia adquisiciones completas para deal finders.',
    verified: true,
  },
  {
    id: 'cb-creator-daniel-martinez',
    name: 'Daniel Martinez & Leon Barnes (@hivemindcrm — Hivemind Capital & Land Network)',
    companyOrGroup: 'Hivemind Capital (Texas & Southeast Land / House Buyers)',
    creatorHandle: '@hivemindcrm',
    platform: 'builder_database',
    market: 'Texas (San Antonio, Austin, Houston, DFW, Bexar County) y mercados del sur',
    buyBoxType: 'Land / Home Builder',
    maxPrice: '$15,000 a $300,000 (Lotes y Casas Feas)',
    finderPayoutOffer: '💰 $2,500 a $5,000 Finder’s Fee plano O 50/50 JV Split',
    dealRequirementMode: 'both_accepted',
    dealRequirementLabel: '🤝 Acepta AMBOS (Leads Crudos de Propietarios de Terrenos O Contratos Firmados)',
    dealRequirementDetails:
      'Tienen compradores activos de lotes Infill y casas en San Antonio y Houston. Si tienes un propietario de terreno o casa que quiere vender pero necesitas ayuda para hacer el Skip Tracing o cerrar la oferta, su equipo colabora contigo.',
    propertySpecsWanted:
      '• Lotes residenciales baldíos en San Antonio / Houston y casas pequeñas para remodelar.',
    priceAndArvRange:
      '• Descuentos agresivos al 50%–60% del valor tasado.',
    contactInfo: 'IG: @hivemindcrm | Web: hivemindcrm.io',
    sourceUrl: 'https://www.instagram.com/hivemindcrm/',
    directContactChannels: {
      dealPortalUrl: 'https://hivemindcrm.io/',
      socialDmUrl: 'https://www.instagram.com/hivemindcrm/',
    },
    readyPitchMessage: `Hey Daniel & Leon! I have an off-market lot/house in [San Antonio / Texas] at $[Precio] (ARV $[ARV]). Would love to submit this for a JV or direct purchase!`,
    notes:
      'Comunidad activa de inversionistas en Texas que combinan software, terrenos y wholesaling tradicional.',
    verified: true,
  },
  {
    id: 'cb-creator-king-khanh',
    name: 'Khanh Nguyen (@kingkhanh — Houston & Dallas Direct Cash Buyer & Flipper)',
    companyOrGroup: 'King Khanh Real Estate Investments (Texas)',
    creatorHandle: '@kingkhanh',
    platform: 'reel_buyer',
    market: 'Texas (Houston, Harris County, Fort Bend, DFW, San Antonio)',
    buyBoxType: 'Fix & Flip',
    maxPrice: '$40,000 a $280,000 (Casas Baratas y Propiedades con Daño Severo)',
    finderPayoutOffer: '💰 Compra Directamente con su Efectivo (Cobras el 100% de tu Assignment Fee sin intermediarios)',
    dealRequirementMode: 'contract_signed',
    dealRequirementLabel: '📄 Requiere Contrato Ya Firmado Directo con el Propietario',
    dealRequirementDetails:
      'Inversionista de alto volumen en Houston que compra casas con daños graves por agua, incendios, problemas de cimientos o inundaciones. Como es el comprador final en efectivo, te paga tu Assignment Fee completo al cerrar en la compañía de título.',
    propertySpecsWanted:
      '• Casas Single-Family de 1 y 2 pisos en Houston y alrededores, construidas entre 1960 y 2005.\n• Acepta casas con daño severo por inundación o fundaciones dañadas.',
    priceAndArvRange:
      '• Precios de compra entre $40,000 y $160,000 con ARV de $120,000 a $300,000.',
    contactInfo: 'IG: @kingkhanh',
    sourceUrl: 'https://www.instagram.com/kingkhanh/',
    directContactChannels: {
      socialDmUrl: 'https://www.instagram.com/kingkhanh/',
    },
    readyPitchMessage: `Hey Khanh! I have an ugly off-market house under contract in Houston/Texas ([Dirección/Área]) at $[Precio]. ARV is $[ARV] and needs ~$[Reparaciones] in rehab. Sending photos to see if you want to buy it cash!`,
    notes:
      'Conocido por comprar casas en efectivo en Texas sin contingencias de financiamiento bancario.',
    verified: true,
  },
  {
    id: 'cb-creator-chris-haskins',
    name: 'Chris Haskins (@chris.haskins.real.estate — With The Right Property Group / Virginia)',
    companyOrGroup: 'With The Right Property Group (Virginia & North Carolina)',
    creatorHandle: '@chris.haskins.real.estate',
    platform: 'reel_buyer',
    market: 'Virginia (Richmond, Norfolk, Virginia Beach, Newport News, Chesapeake, Portsmouth) y NC',
    buyBoxType: 'Fix & Flip',
    maxPrice: '$50,000 a $350,000',
    finderPayoutOffer: '💰 Paga $3,000 a $10,000 Finder’s Fee o 50/50 JV en Herencias y Subject-To',
    dealRequirementMode: 'both_accepted',
    dealRequirementLabel: '🤝 Acepta AMBOS (Leads de Herencias/Probate sin Contrato O Contrato PSA)',
    dealRequirementDetails:
      'Aparece en los Reels analizados en tu dashboard: enseña cómo comprar casas heredadas sin testamento (Heirs Property) y cómo hacer Subject-To. Si encuentras una familia que heredó una casa y necesita arreglar el título, él te guía para estructurar el trato y te paga tu comisión.',
    propertySpecsWanted:
      '• Casas heredadas (Probate / Heirs Property) donde el dueño falleció y los herederos necesitan vender rápido en efectivo.\n• Casas con hipotecas existentes para estructurar Subject-To.',
    priceAndArvRange:
      '• Compras al 60%–70% del valor de mercado.',
    contactInfo: 'IG: @chris.haskins.real.estate | YouTube: Chris Haskins',
    sourceUrl: 'https://www.instagram.com/chris.haskins.real.estate/',
    directContactChannels: {
      socialDmUrl: 'https://www.instagram.com/chris.haskins.real.estate/',
      communityUrl: 'https://www.youtube.com/@ChrisHaskins',
    },
    readyPitchMessage: `Hey Chris! Sourced an inherited / probate property in Virginia ([Ciudad]) with clear motivation. Would love to partner with you to structure the title and buy/assign it!`,
    notes:
      'Creador destacado en Virginia con más de 15 años cerrando tratos de Probate, Subject-To y Wholesaling.',
    verified: true,
  },
  {
    id: 'cb-creator-cameron-builds',
    name: 'Cameron Builds (@cameron.builds — Florida Custom Home Builder & Infill Lot Buyer)',
    companyOrGroup: 'Cameron Custom Home Builders (Florida)',
    creatorHandle: '@cameron.builds',
    platform: 'builder_database',
    market: 'Florida (Orlando, Tampa, Lakeland, Brevard County, Volusia County, Polk County)',
    buyBoxType: 'Land / Home Builder',
    maxPrice: '$25,000 a $130,000 por lote residencial',
    finderPayoutOffer: '💰 Paga 100% de tu Assignment Fee ($10,000 a $25,000 por lote) como Comprador Final',
    dealRequirementMode: 'both_accepted',
    dealRequirementLabel: '🤝 Puedes Llamar ANTES de Firmar el Lote para Confirmar su Precio de Compra',
    dealRequirementDetails:
      'Constructor activo de casas nuevas en Florida. Puedes contactarlo antes de firmar con el dueño del lote para preguntarle qué dimensiones y precios busca en ese código postal específico, garantizando tu margen antes de firmar el contrato.',
    propertySpecsWanted:
      '• Lotes residenciales baldíos (0.18 a 0.5 acres) listos para construir casas de 1,600 a 2,400 SqFt.\n• Zonificación R-1, sin humedales, con servicios públicos disponibles (agua y electricidad).',
    priceAndArvRange:
      '• Compra lotes entre $25,000 y $110,000 para construir casas nuevas de $300,000 a $450,000.',
    contactInfo: 'IG: @cameron.builds',
    sourceUrl: 'https://www.instagram.com/cameron.builds/',
    directContactChannels: {
      socialDmUrl: 'https://www.instagram.com/cameron.builds/',
    },
    readyPitchMessage: `Hi Cameron! I'm an infill land locator in Central Florida. I have a buildable residential lot in [Ciudad/Zip Code] ([Dimensiones], power/water, no wetlands) for $[Precio]. Are you looking for more lots in this area this month?`,
    notes:
      'Constructor de casas en Florida que compra lotes directamente a deal finders y wholesalers.',
    verified: true,
  },
  {
    id: 'cb-creator-brandon-mulrenin',
    name: 'Brandon Mulrenin (@brandon.mulrenin — Reverse Wholesaling & Agent Outreach Network)',
    companyOrGroup: 'Reverse Wholesaling Network (Midwest & Nationwide)',
    creatorHandle: '@brandon.mulrenin',
    platform: 'reel_buyer',
    market: 'Michigan (Detroit metro, Grand Rapids), Midwest y red nacional de agentes inversionistas',
    buyBoxType: 'Section 8 Rental',
    maxPrice: '$50,000 a $300,000',
    finderPayoutOffer: '💰 50/50 JV Split ($10,000 a $20,000) trabajando tratos en MLS con Realtors',
    dealRequirementMode: 'both_accepted',
    dealRequirementLabel: '🤝 Acepta Propiedades del MLS con Agentes Inmobiliarios O Contratos Firmados',
    dealRequirementDetails:
      'Especialista en conectar con agentes inmobiliarios que tienen casas vencidas o con muchos días en el MLS para hacer ofertas en efectivo por debajo del precio de lista.',
    propertySpecsWanted:
      '• Casas con 60+ días en el mercado MLS donde el vendedor esté frustrado y acepte una oferta en efectivo sin contingencias.',
    priceAndArvRange:
      '• Ofertas al 65%–72% del precio de lista.',
    contactInfo: 'IG: @brandon.mulrenin | YouTube: Brandon Mulrenin',
    sourceUrl: 'https://www.instagram.com/brandon.mulrenin/',
    directContactChannels: {
      socialDmUrl: 'https://www.instagram.com/brandon.mulrenin/',
      communityUrl: 'https://www.youtube.com/@BrandonMulrenin',
    },
    readyPitchMessage: `Hey Brandon! Found an on-market MLS property with 90+ days on market in [Ciudad] where the agent confirmed the seller is desperate for a cash closing. Numbers work at $[Precio] against $[ARV] ARV. Let's partner up!`,
    notes:
      'Experto en Reverse Wholesaling y llamadas a agentes de bienes raíces para asegurar tratos con cero costo de marketing.',
    verified: true,
  },
  {
    id: 'cb-investorlift-portal',
    name: 'InvestorLift Deal Board (4.8M+ Institutional Buyers & VIP Cash Flippers)',
    companyOrGroup: 'InvestorLift Enterprise Dispo Marketplace',
    creatorHandle: 'InvestorLift Network',
    platform: 'web_directory',
    market: 'Nacional (Todos los 50 estados y más de 3,000 condados de EE.UU.)',
    buyBoxType: 'Fix & Flip',
    maxPrice: 'Cualquier precio ($30,000 a $2,500,000+)',
    finderPayoutOffer: '💰 Tú Cobras el 100% de tu Assignment Fee (Subastas y ofertas directas de compradores con fondos verificados)',
    dealRequirementMode: 'contract_signed',
    dealRequirementLabel: '📄 Requiere Contrato Ya Firmado (Signed PSA con EMD)',
    dealRequirementDetails:
      'El marketplace de Dispo más grande del mundo donde operan los mayores fondos de inversión (Hedge Funds), compradores institucionales y flippers VIP. Publicas tu contrato y los compradores pujan directamente.',
    propertySpecsWanted:
      '• Casas Single-Family, Multifamiliares, Terrenos y Carteras de propiedades en cualquier condición.',
    priceAndArvRange:
      '• Desde propiedades de $30,000 en el Midwest hasta mansiones de lujo para remodelar.',
    contactInfo: 'Portal: investorlift.com',
    sourceUrl: 'https://investorlift.com/',
    directContactChannels: {
      dealPortalUrl: 'https://investorlift.com/',
    },
    readyPitchMessage: `Listing under-contract property on InvestorLift: [Dirección], Asking: $[Precio Asignación], ARV: $[ARV], Rehab: $[Reparaciones]. Proof of Funds required for walkthrough.`,
    notes:
      'La herramienta que usan las empresas de wholesaling más grandes de EE.UU. para vender contratos en 24 a 48 horas.',
    verified: true,
  },
  {
    id: 'cb-connected-investors-pin',
    name: 'Connected Investors PiN Network (Plataforma Directa de Private Lenders & Cash Buyers)',
    companyOrGroup: 'Connected Investors Network',
    creatorHandle: 'Connected Investors',
    platform: 'web_directory',
    market: 'Nacional (EE.UU. — Clasificado por código postal)',
    buyBoxType: 'Fix & Flip',
    maxPrice: '$40,000 a $1,000,000+',
    finderPayoutOffer: '💰 Tú Cobras el 100% de tu Assignment Fee directamente del Comprador Final',
    dealRequirementMode: 'both_accepted',
    dealRequirementLabel: '🤝 Puedes Contactar Compradores ANTES de Buscar para Obtener su Buy Box Exacto',
    dealRequirementDetails:
      'Te permite buscar en su mapa quiénes son los compradores en efectivo y prestamistas privados de tu código postal para llamarlos o enviarles mensaje antes de firmar con el dueño, aplicando "Reverse Wholesaling".',
    propertySpecsWanted:
      '• Flips residenciales, propiedades de alquiler Section 8 y terrenos comerciales/residenciales.',
    priceAndArvRange:
      '• Rango de compra del 65% al 75% del ARV.',
    contactInfo: 'Web: connectedinvestors.com',
    sourceUrl: 'https://connectedinvestors.com/',
    directContactChannels: {
      dealPortalUrl: 'https://connectedinvestors.com/',
    },
    readyPitchMessage: `Hello! I'm a local property locator in [Zip Code]. I have off-market inventory coming up that fits your criteria. What is your current target price point and preferred property type?`,
    notes:
      'Red social de más de 1 millón de inversionistas inmobiliarios para conectar directamente con compradores sin intermediarios.',
    verified: true,
  },
  {
    id: 'cb-biggerpockets-marketplace',
    name: 'BiggerPockets Marketplace & JV Forums (Foro Oficial de Co-Wholesaling & Cash Buyers)',
    companyOrGroup: 'BiggerPockets Investor Community (2M+ Miembros)',
    creatorHandle: 'BiggerPockets Forums',
    platform: 'biggerpockets',
    market: 'Nacional y Foros Estatales por Ciudad (Tampa, Houston, Dallas, Atlanta, Detroit, Charlotte, etc.)',
    buyBoxType: 'Fix & Flip',
    maxPrice: '$30,000 a $1,200,000+',
    finderPayoutOffer: '💰 50/50 JV Split o 100% de tu Assignment Fee con Inversionistas Acreditados',
    dealRequirementMode: 'both_accepted',
    dealRequirementLabel: '🤝 Acepta AMBOS (Foros de Networking para Pedir Buy Box O Publicar Contrato en Marketplace)',
    dealRequirementDetails:
      'La comunidad inmobiliaria más respetada de EE.UU.: puedes publicar en el foro de tu ciudad ("Looking for active cash buyers in [City] — what are you buying?") para crear tu lista antes de buscar deals, o publicar en el Marketplace cuando ya tienes el contrato firmado.',
    propertySpecsWanted:
      '• Flips tradicionales, carteras de alquiler a largo plazo (Buy & Hold) y multifamiliares de 2 a 20 unidades.',
    priceAndArvRange:
      '• Descuentos basados en retorno de inversión (Cash on Cash Return > 10% o márgenes de flip > $30k).',
    contactInfo: 'Portal: biggerpockets.com/forums/93',
    sourceUrl: 'https://www.biggerpockets.com/forums/93',
    directContactChannels: {
      dealPortalUrl: 'https://www.biggerpockets.com/marketplace',
      communityUrl: 'https://www.biggerpockets.com/forums/93',
    },
    readyPitchMessage: `[OFF-MARKET CONTRACT IN CIUDAD, ESTADO] 3/2 single family under contract at $[Precio], ARV $[ARV], rehab ~$[Reparaciones]. Looking for a vetted cash buyer who can close in 14 days. DM me for HUD comps & inspection details!`,
    notes:
      'Excelente para encontrar compradores con capital real que no son revendedores ni intermediarios.',
    verified: true,
  },
  {
    id: 'cb-discord-freewholesaling-subto',
    name: 'Discord & Skool Communities (FreeWholesaling & SubTo Student Deal Pitch Channels)',
    companyOrGroup: 'Comunidades Privadas de Alumnos Avanzados de Wholesaling y Creative Finance',
    creatorHandle: 'Discord & Skool Wholesalers',
    platform: 'web_directory',
    market: 'Nacional (EE.UU. — Canales organizados por estado: #florida-deals, #texas-deals, #midwest)',
    buyBoxType: 'Multifamily / Creative',
    maxPrice: '$20,000 a $800,000 (Cash, Subject-To, Seller Finance y Terrenos)',
    finderPayoutOffer: '💰 50/50 JV Split ($8,000 a $25,000 por trato) o $1,500–$3,000 Finder’s Fee con Closers',
    dealRequirementMode: 'both_accepted',
    dealRequirementLabel: '🤝 Canales "#need-a-closer" (Sin Contrato) y "#deal-pitch" (Con Contrato Firmado)',
    dealRequirementDetails:
      'Dentro de los Discord y Skool de FreeWholesaling, SubTo y AstroFlipping hay canales específicos:\n1) #need-a-closer: Si tienes un vendedor motivado pero no sabes qué decirle o cómo redactar el contrato, un estudiante avanzado entra a la llamada contigo para cerrarlo 50/50.\n2) #deal-pitch: Si ya tienes el contrato firmado, lo publicas y docenas de inversionistas con fondos listos compran la asignación.',
    propertySpecsWanted:
      '• Propiedades creativas (Subject-To con tasas < 4%), contratos en efectivo al 60%–70% y lotes baldíos.',
    priceAndArvRange:
      '• Todo rango de precios.',
    contactInfo: 'Discord & Skool Communities',
    sourceUrl: 'https://www.flipwithrick.com/',
    directContactChannels: {
      communityUrl: 'https://www.facebook.com/groups/wholesalinghousesforreal',
      dealPortalUrl: 'https://www.flipwithrick.com/',
    },
    readyPitchMessage: `Hey everyone! In [Ciudad, Estado] with a [Cash / Subject-To] deal: [Detalles de la propiedad], Contract: $[Precio], ARV: $[ARV]. Looking for a JV partner / end buyer in this market. DM me!`,
    notes:
      'El mejor entorno colaborativo para principiantes: puedes asociarte con personas que ya tienen compradores listos en tu ciudad.',
    verified: true,
  },
];

for (const item of NEW_20_CREATOR_AND_NETWORK_BUYERS) {
  const existingIdx = db.cashBuyers.findIndex((b) => b.id === item.id || b.name === item.name);
  if (existingIdx >= 0) {
    db.cashBuyers[existingIdx] = item;
  } else {
    db.cashBuyers.push(item);
  }
}

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf-8');
console.log(`Successfully updated skills-db.json! Total buyers in Module 3 is now: ${db.cashBuyers.length}`);
