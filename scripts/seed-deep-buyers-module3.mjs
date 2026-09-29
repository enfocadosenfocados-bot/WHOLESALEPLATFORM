import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'skills-db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

const DEEP_CREATOR_AND_NETWORK_BUYERS = [
  {
    id: 'cb-creator-richard-taylor',
    name: 'Richard Taylor (@richardgrandintaylor — Hold My Hand Wholesale / BuyBoxCartel)',
    companyOrGroup: 'BuyBoxCartel & Hold My Hand Wholesale (Reels 1, 2 y 3)',
    creatorHandle: '@richardgrandintaylor',
    platform: 'reel_buyer',
    market: 'Detroit (MI), Canton / Cleveland / Akron (OH), Omaha (NE) y Midwest < $200k',
    buyBoxType: 'Section 8 Rental',
    maxPrice: 'Casas $45,000 – $150,000 | Multifamily hasta $350,000',
    finderPayoutOffer: '💰 Paga $10,000 Finder’s Fee / Assignment Fee plano O 50/50 JV + Equity Mensual en Multifamiliares',
    dealRequirementMode: 'both_accepted',
    dealRequirementLabel: '🤝 Acepta AMBOS (Solo Encontrar la Propiedad O Contrato Ya Firmado)',
    dealRequirementDetails:
      '1) SIN CONTRATO FIRMADO (Solo encontraste la propiedad): Si encontraste una casa o Fourplex en Zillow/MLS donde los números dan o el Realtor dijo que el dueño escucha ofertas de Seller Finance, Richard entra contigo en vivo ("Hold My Hand Wholesale") para llamar al agente, negociar y firmar el contrato juntos.\n2) CON CONTRATO YA FIRMADO: Si ya firmaste el PSA con cláusula de asignación, lo sube a su lista privada de 10 compradores de Detroit/Ohio para que cobres $10,000+.',
    propertySpecsWanted:
      '• Single-Family: 3+ habitaciones, 1+ baños, >1,000 SqFt, estructura sólida para alquiler Section 8 o Fix & Flip ligero (ej. 18418 Joann St Detroit y 519 17th St Canton OH).\n• Multifamiliar (2 a 4 unidades / Fourplex): Propiedades con 90+ días en Zillow donde el dueño acepte Seller Financing (10% Down Payment, 5% interés, amortización a 30 años).',
    priceAndArvRange:
      '• Precio de compra objetivo: $40,000 a $135,000 (con ARV de $100,000 a $200,000).\n• Descuento requerido: Mínimo $15,000–$25,000 por debajo de lo que pagan sus compradores de Section 8.',
    contactInfo: 'IG DM: @richardgrandintaylor | Web: buyboxcartel.com',
    sourceUrl: 'https://www.instagram.com/richardgrandintaylor/',
    directContactChannels: {
      dealPortalUrl: 'https://www.buyboxcartel.com/',
      socialDmUrl: 'https://www.instagram.com/richardgrandintaylor/',
      communityUrl: 'https://www.instagram.com/reel/DbJkwwPSuEN/',
    },
    readyPitchMessage: `Hey Richard! I’ve been following your Reels on Detroit, Canton OH, and Seller Finance Fourplexes. I found a property that fits your Buy Box in [Ciudad/Dirección] at [Precio] (ARV ~[ARV]). Let me know if you want me to lock up the PSA first or if we can jump on a quick call with the seller/agent to lock it up together!`,
    notes:
      'Demostró en vivo en tus Reels cómo pagó $10,000 a buscadores en 519 17th St NW Canton OH (comprada en $45k, vendida a su comprador en $55k) y 18418 Joann St Detroit MI (comprada en $115k, vendida en $125k).',
    verified: true,
  },
  {
    id: 'cb-creator-flipwithzach',
    name: 'Zach Ginn & Rick Ginn (@flipwithzach — FlipWithRick.com / FreeWholesaling)',
    companyOrGroup: 'Flip With Rick & SellMyPaper JV Network (Reels 6, 7 y 10)',
    creatorHandle: '@flipwithzach',
    platform: 'reel_buyer',
    market: 'Compra Propia: Florida (Port St. Lucie, Stuart, Lee County, Tampa, Orlando) y Tennessee (Clarksville) | JV Dispo: Todo EE.UU.',
    buyBoxType: 'Fix & Flip',
    maxPrice: 'Casas $60,000 – $450,000 | Lotes Baldíos $10,000 – $120,000',
    finderPayoutOffer: '💰 Paga 50/50 JV Split del Assignment Fee ($10,000 a $35,000+ por trato) o Compra Directa en Efectivo en FL',
    dealRequirementMode: 'contract_signed',
    dealRequirementLabel: '📄 Requiere Contrato Ya Firmado (Signed PSA Directo con el Dueño)',
    dealRequirementDetails:
      'Requiere que YA tengas el contrato Purchase & Sale Agreement (PSA) firmado directamente con el propietario (con 14–30 días de Inspection Period y cláusula de asignación). Prohibido el daisy-chaining (re-wholesaling de otros wholesalers). Si es en Treasure Coast / South FL ellos mismos lo compran en efectivo; en el resto del país su equipo de Dispo pone el comprador en efectivo y dividen 50/50 en la compañía de título.',
    propertySpecsWanted:
      '• Casas Feas (Ugly Houses): 3+ Beds, 2+ Baths, >1,100 SqFt en Pre-Foreclosure (a días de subasta como su deal de Clarksville TN), Tax Delinquent, Code Violations o Zillow FSBO al 60%.\n• Lotes Baldíos (Infill Land): Lotes residenciales de 0.1 a 1 acre en barrios donde constructores estén levantando casas nuevas (como Lee County FL o Houston TX).\n• Creative Finance / Notas: A través de SellMyPaper.com.',
    priceAndArvRange:
      '• Casas: Precio de contrato <= (ARV × 70%) - Reparaciones - $20,000 (ARV entre $160,000 y $550,000).\n• Lotes de Terreno: Contratados al 40%–55% del valor de lotes comparables vendidos a constructores.',
    contactInfo: 'Web: flipwithrick.com | Email: support@flipwithrick.com | IG: @flipwithzach',
    sourceUrl: 'https://www.flipwithrick.com/',
    directContactChannels: {
      dealPortalUrl: 'https://www.flipwithrick.com/',
      socialDmUrl: 'https://www.instagram.com/flipwithzach/',
      emailOrPhone: 'support@flipwithrick.com',
      communityUrl: 'https://www.facebook.com/groups/wholesalinghousesforreal',
    },
    readyPitchMessage: `Hey Zach! I have a property locked up under a direct-to-seller signed PSA in [Ciudad, Estado] at $[Precio Contrato] with a [14/30]-day inspection period. Conservative ARV is $[ARV] and estimated repairs are $[Reparaciones]. Sending over the contract, address, and photos so we can JV 50/50!`,
    notes:
      'En el Reel 7 Zach dice explícitamente: "Follow me and send me your real estate deals". Compran con su propio efectivo en Florida y hacen JV 50/50 en todo EE.UU.',
    verified: true,
  },
  {
    id: 'cb-creator-jerry-norton',
    name: 'Jerry Norton (@flippingmastery — Programa $10,000 Finder’s Fee / My10kCheck)',
    companyOrGroup: 'Flipping Mastery / My10kCheck.com Deal Finder Network',
    creatorHandle: '@flippingmastery',
    platform: 'reel_buyer',
    market: 'Nacional (Todo EE.UU. — Ciudades con >100,000 hab., especialmente AZ, MI, FL, TX, NC, GA, OH, TN)',
    buyBoxType: 'Fix & Flip',
    maxPrice: 'Casas $80,000 – $650,000 | Lotes de Lujo hasta $500,000',
    finderPayoutOffer: '💰 Paga $10,000 Finder’s Fee Garantizado (Solo por encontrar la propiedad sin firmarla) O 50/50 JV con Contrato',
    dealRequirementMode: 'both_accepted',
    dealRequirementLabel: '🔍 Acepta SOLO Encontrar la Propiedad (Sin Contrato) O Trato con Contrato Firmado',
    dealRequirementDetails:
      '1) SOLO ENCONTRAR LA PROPIEDAD (Bird Dog / Finder’s Fee de $10,000): Uno de los pocos compradores nacionales que te permite simplemente encontrar una propiedad subvalorada (On-Market MLS o Off-Market), verificar que cumple su fórmula y enviársela SIN que tú tengas que firmar el contrato ni poner Earnest Money Deposit (EMD). Su equipo llama, negocia, firma el contrato, pone los fondos y te paga $10,000 cuando cierra.\n2) CON CONTRATO YA FIRMADO: También hace JV 50/50 o fondea el 100% del Double Closing.',
    propertySpecsWanted:
      '• Casas Single-Family para Fix & Flip (3+ Beds, 2+ Baths, >1,200 SqFt, sin ubicarse en avenidas comerciales de doble línea amarilla).\n• Propiedades con potencial de "Double Dip" (comprar, limpiar sin remodelar y revender en el MLS con financiamiento bancario).\n• Lotes residenciales en zonas de alto valor o frente al agua.',
    priceAndArvRange:
      '• Fórmula estricta de compra: Precio <= (ARV × 65% a 70%) - Costo de Reparaciones.\n• ARV mínimo: $150,000 hasta $850,000.',
    contactInfo: 'Portal: my10kcheck.com / flippingmastery.com | IG: @flippingmastery',
    sourceUrl: 'https://flippingmastery.com/',
    directContactChannels: {
      dealPortalUrl: 'https://www.my10kcheck.com/',
      socialDmUrl: 'https://www.instagram.com/flippingmastery/',
      communityUrl: 'https://flippingmastery.com/',
    },
    readyPitchMessage: `Hi Jerry & Team! I found a distressed property in [Ciudad, Estado] that meets your 65% ARV minus repairs Buy Box. Asking/Target Price: $[Precio], Verified Sold Comps ARV: $[ARV], Estimated Rehab: $[Reparaciones]. Ready to submit the property details for your acquisitions team!`,
    notes:
      'Ideal cuando encuentras un gran trato con un Realtor o dueño pero no quieres encargarte del contrato ni del depósito EMD: ellos hacen el cierre y pagan $10,000 de Finder’s Fee.',
    verified: true,
  },
  {
    id: 'cb-creator-ownwithsam',
    name: 'Samuel G (@ownwithsam — Comprador de Hipotecas Asumibles 2.8% & Subject-To)',
    companyOrGroup: 'OwnWithSam Creative Finance Acquisitions (Reel 5)',
    creatorHandle: '@ownwithsam',
    platform: 'reel_buyer',
    market: 'Tampa, Orlando, Jacksonville y Sur de Florida (FL), Texas (Dallas/Houston), Arizona (Phoenix), Georgia y NC',
    buyBoxType: 'Multifamily / Creative',
    maxPrice: 'Casas de $220,000 a $550,000 con hipoteca existente al 2.25% – 4.0%',
    finderPayoutOffer: '💰 Paga $5,000 a $15,000 de Finder’s / Assignment Fee por trato Subject-To o Assumable cerrado',
    dealRequirementMode: 'both_accepted',
    dealRequirementLabel: '🤝 Acepta AMBOS (Solo el Lead Calificado SIN Contrato O Contrato Subject-To Firmado)',
    dealRequirementDetails:
      '1) SOLO ENCONTRAR LA PROPIEDAD Y CONFIRMAR INTERÉS (Sin Contrato): Como el papeleo de Subject-To (tomar los pagos de la hipoteca existente) requiere adendas legales específicas, puedes usar sus 5 filtros en Zillow ("Assumable" / casas compradas en 2020–2022), confirmar que el dueño acepta que le tomen su hipoteca al 2.8% y meter a Sam a la llamada para que él firme el contrato y te pague tu comisión.\n2) CON CONTRATO FIRMADO: Si ya firmaste el Addendum Subject-To, te lo compra o asigna.',
    propertySpecsWanted:
      '• Casas Single-Family construidas del año 2000 en adelante, 3+ Beds, 2+ Baths, listas para habitar o con reparaciones cosméticas mínimas.\n• Deben tener una hipoteca FHA, VA o Convencional originada entre 2019 y 2022 con tasa de interés fija entre 2.25% y 4.0%.\n• Excelente para vendedores con poco equity o atrasados 2–5 meses en pagos (Arrears) donde un wholesaler tradicional en efectivo al 70% sería rechazado.',
    priceAndArvRange:
      '• Valor de la propiedad: $220,000 a $550,000.\n• Entry Fee total (Atrasos del banco + efectivo al vendedor + costos de cierre) debe ser menor al 10%–12% del valor de la casa (ej. entrar con $18k–$30k en una casa de $340k).',
    contactInfo: 'IG DM: @ownwithsam',
    sourceUrl: 'https://www.instagram.com/ownwithsam/',
    directContactChannels: {
      socialDmUrl: 'https://www.instagram.com/ownwithsam/',
      communityUrl: 'https://www.instagram.com/reel/DdHzKgsJEyZ/',
    },
    readyPitchMessage: `Hey Sam! Using your 5 Zillow filters, I found a property in [Ciudad, Estado] with an existing [2.875%] mortgage (balance ~$[ Balance ], PITI $[Pago Mensual]/mo) and the seller is open to letting us take over payments (arrears ~$[Atrasos]). Want to jump on a call to lock up the Subject-To contract together?`,
    notes:
      'Extraído del Reel 5: muestra cómo encontrar en menos de 60 segundos en Zillow casas en Tampa con hipotecas al 2.875% cuando el banco cobra 7%.',
    verified: true,
  },
  {
    id: 'cb-creator-carsonbuysland',
    name: 'Carson & Wiener Bros (@carsonbuysland — Infill Land Flipping & Builders Dispo)',
    companyOrGroup: 'CarsonBuysLand & LandAtlas 8,855+ Builders Network (Reel 8)',
    creatorHandle: '@carsonbuysland',
    platform: 'builder_database',
    market: 'Florida (Palm Bay, Lehigh Acres, Cape Coral, Ocala, North Port, Port Charlotte), NC, GA, TX y AR',
    buyBoxType: 'Land / Home Builder',
    maxPrice: '$10,000 a $110,000 por lote baldío (Infill Lots)',
    finderPayoutOffer: '💰 Paga 50/50 JV Split ($7,500 a $25,000+ por lote) o $1,500–$3,000 Bird Dog Fee por lead de terreno',
    dealRequirementMode: 'both_accepted',
    dealRequirementLabel: '🤝 Acepta AMBOS (Contrato de Terreno Firmado O Lead Calificado de Dueño de Lote)',
    dealRequirementDetails:
      '1) CON CONTRATO FIRMADO: Pones el lote bajo un "Vacant Land Purchase Agreement" de 1 página con 30 días de Feasibility Study Period y ellos lo venden en días a los constructores verificados de esa calle (como Waltco Construction) dividiendo 50/50.\n2) SIN CONTRATO FIRMADO: Si tienes un dueño de lote motivado al teléfono pero quieres confirmar cuánto paga exactamente el constructor local antes de firmar, su equipo valida el lote y lo cierra contigo.',
    propertySpecsWanted:
      '• Lotes residenciales baldíos (Infill Lots de 0.15 a 2.0 acres) dentro de subdivisiones ya establecidas.\n• Requisitos obligatorios: Acceso por calle pavimentada, electricidad frente al lote, SIN humedales (No Wetlands en National Wetlands Inventory) y fuera de Flood Zone de alto riesgo.\n• Debe haber al menos 3 casas nuevas construidas en los últimos 12 meses en un radio de 0.5 millas.',
    priceAndArvRange:
      '• Precio de contrato: 40% al 55% de lo que los constructores pagaron por lotes similares en los últimos 6 meses (ej. si los constructores compran lotes en $45,000 en Palm Bay FL, contratarlo entre $18,000 y $25,000).',
    contactInfo: 'IG DM: @carsonbuysland | Base de Constructores: landatlas.com',
    sourceUrl: 'https://www.instagram.com/carsonbuysland/',
    directContactChannels: {
      dealPortalUrl: 'https://www.landatlas.com/',
      socialDmUrl: 'https://www.instagram.com/carsonbuysland/',
      communityUrl: 'https://www.instagram.com/reel/DcgiMy3OQov/',
    },
    readyPitchMessage: `Hey Carson! I found an infill vacant lot in [Ciudad, Condado, Estado] ([Tamaño Acres] acres, dry/no wetlands, paved road, power at street, new builds on the same block). Owner is willing to sell at $[Precio] and builders are buying lots nearby at $[Valor Comps]. Let's JV on this!`,
    notes:
      'En el Reel 8 muestra en pantalla un lote en Palm Bay, FL y cómo extraer constructores como Derek Walter (Waltco Construction LLC) desde LandAtlas.com.',
    verified: true,
  },
  {
    id: 'cb-keyglee-jamil-pace-brent',
    name: 'Jamil Damji, Pace Morby & Brent Daniels (KeyGlee Dispo + Wholesale Hotline Live)',
    companyOrGroup: 'KeyGlee Nationwide Dispo & SubTo / AstroFlipping Squads',
    creatorHandle: '@jamildamji / @pacemorby / @realbrentdaniels',
    platform: 'web_directory',
    market: 'Nacional (45+ Mercados: Phoenix AZ, Dallas/Houston/Austin TX, Tampa/Orlando/Miami FL, Atlanta GA, Charlotte NC, Las Vegas NV, OH, TN)',
    buyBoxType: 'Fix & Flip',
    maxPrice: 'Desde $75,000 hasta $1,500,000+ (Cash, SubTo y Multifamily)',
    finderPayoutOffer: '💰 Paga 50/50 JV Split ($10,000 a $40,000+ por deal) o Bird Dog Fee ($1,500–$5,000) con Squad Closers',
    dealRequirementMode: 'both_accepted',
    dealRequirementLabel: '🤝 Portal KeyGlee: Contrato Firmado | Grupo Wholesale Hotline: Acepta Lead Crudo SIN Contrato',
    dealRequirementDetails:
      'Tienes dos vías directas:\n1) SI YA TIENES EL CONTRATO FIRMADO: Subes la propiedad directamente en https://keyglee.com/submit-a-wholesale-property/ y su red nacional de franquicias de Dispo asigna el trato a sus compradores institucionales y flippers 50/50.\n2) SI SOLO ENCONTRASTE LA PROPIEDAD / LEAD CRUDO (Sin Contrato): Publicas en el grupo oficial "Wholesale Hotline Live" diciendo: "Tengo un vendedor motivado en [Ciudad] que quiere vender [Cash / SubTo], necesito un Closer para cerrarlo 50/50" y un cerrador verificado llama al dueño y firma el contrato contigo.',
    propertySpecsWanted:
      '• KeyGlee (Cash): Casas Single-Family, Townhomes y Multifamily con descuento para remodelar o alquilar.\n• Pace Morby (SubTo): Casas bonitas o recién remodeladas que no venden en Zillow o dueños con poco equity que acepten dejar su hipoteca existente (Subject-To) o financiar como banco (Seller Finance).',
    priceAndArvRange:
      '• Cash Deals: Precio <= 72% del ARV menos reparaciones (ARV $150,000 a $900,000).\n• SubTo Deals: Cualquier precio siempre que el pago mensual PITI permita flujo de caja positivo como renta tradicional, PadSplit (renta por habitación) o Airbnb.',
    contactInfo: 'Portal Deals: keyglee.com/submit-a-wholesale-property/ | FB Group: Wholesale Hotline Live',
    sourceUrl: 'https://keyglee.com/submit-a-wholesale-property/',
    directContactChannels: {
      dealPortalUrl: 'https://keyglee.com/submit-a-wholesale-property/',
      socialDmUrl: 'https://www.instagram.com/jamildamji/',
      communityUrl: 'https://www.facebook.com/groups/wholesalehotlinelive',
    },
    readyPitchMessage: `Hey Team! Submitting an off-market deal in [Ciudad, Estado]. Property: [Beds/Baths/SqFt], Contract/Target Price: $[Precio], Conservative ARV: $[ARV], Repairs: $[Reparaciones]. Clear title & direct to seller. Looking to partner 50/50 on dispo!`,
    notes:
      'KeyGlee es la empresa de Dispo más grande de EE.UU. y el grupo Wholesale Hotline Live (Pace Morby + Jamil Damji + Brent Daniels) permite emparejarte con cerradores si aún no has firmado el contrato.',
    verified: true,
  },
  {
    id: 'cb-creator-maxclosesdeals',
    name: 'Max Rathbun (@maxclosesdeals — Tranchi AI / Tax Deed & Deep Equity Buyer)',
    companyOrGroup: 'Tranchi AI & High-Equity Tax Deed Acquisitions (Reel 4)',
    creatorHandle: '@maxclosesdeals',
    platform: 'reel_buyer',
    market: 'Jacksonville, Atlantic Beach, Duval County y toda Florida, además de TX, GA y SC',
    buyBoxType: 'Fix & Flip',
    maxPrice: '$60,000 a $400,000 (Propiedades con 40%–60% de descuento sobre valor de mercado)',
    finderPayoutOffer: '💰 Paga 50/50 JV Split ($12,500 a $45,000+ por trato de alto margen)',
    dealRequirementMode: 'both_accepted',
    dealRequirementLabel: '🤝 Acepta AMBOS (Contrato Firmado O Lead Crudo de Tax Deed con Subasta Próxima)',
    dealRequirementDetails:
      'Si ya tienes el contrato firmado muy por debajo del valor de mercado (como el ejemplo del Reel 4 en Atlantic Beach FL contratada en $150k valiendo $360k), te lo mueve de inmediato con sus Cash Buyers. Si encontraste un dueño ausente (Out-of-State) cuya propiedad va a subasta de Tax Deed pronto y necesitas ayuda para cerrarlo y pagar los impuestos en la compañía de título, entran contigo 50/50.',
    propertySpecsWanted:
      '• Propiedades 100% libres de hipoteca (Free & Clear / 100% Equity) pertenecientes a dueños ausentes (Absentee Owners que viven en otro estado) o herederos.\n• Propiedades en la lista de Tax Deed Sale del condado donde el dueño está a punto de perder el 100% de su propiedad por no pagar $5,000–$20,000 de impuestos.',
    priceAndArvRange:
      '• Valor de mercado (ARV): $200,000 a $650,000.\n• Precio de adquisición objetivo: 40% al 60% del valor actual.',
    contactInfo: 'IG DM: @maxclosesdeals | Web: tranchi.com',
    sourceUrl: 'https://www.instagram.com/maxclosesdeals/',
    directContactChannels: {
      dealPortalUrl: 'https://www.tranchi.com/',
      socialDmUrl: 'https://www.instagram.com/maxclosesdeals/',
      communityUrl: 'https://www.instagram.com/reel/DdYC81bsB7_/',
    },
    readyPitchMessage: `Hey Max! I found a Free & Clear absentee-owner / tax-delinquent property in [Ciudad, FL] worth ~$[ARV] where the owner is open to selling around $[Precio]. Let me know if we can lock this up and JV 50/50!`,
    notes:
      'En el Reel 4 analiza 392 Ahern St, Atlantic Beach, FL (dueño ausente con 100% equity, valorada en $360,300 y contratada en $150,000).',
    verified: true,
  },
  {
    id: 'cb-creator-rowangill',
    name: 'Rowan Gill (@rowangill74 — County GIS Tax Foreclosure Buyer & Dispo)',
    companyOrGroup: 'Rowan Gill Tax Foreclosure Network (Reel 9)',
    creatorHandle: '@rowangill74',
    platform: 'reel_buyer',
    market: 'Charlotte / Mecklenburg County (NC), Raleigh (NC), South Carolina, Georgia y Virginia',
    buyBoxType: 'Fix & Flip',
    maxPrice: '$50,000 a $320,000 (Casas y Terrenos en Mapas GIS de Tax Foreclosure)',
    finderPayoutOffer: '💰 Paga 50/50 JV Split ($10,000 a $30,000 por asignación)',
    dealRequirementMode: 'contract_signed',
    dealRequirementLabel: '📄 Requiere Contrato Ya Firmado al ~60% con Cláusula de Asignación a Terceros',
    dealRequirementDetails:
      'Su método (explicado paso a paso en el Reel 9) consiste en extraer propiedades del mapa GIS de "Property Tax Foreclosures" del condado, llamar al dueño, ofrecer el ~60% del valor Zillow y firmar un Purchase Agreement simple que incluya la cláusula para asignarlo a un tercero ("assign it to a third party for a net gain"). Una vez firmado, él aporta el comprador en efectivo en NC/SC/GA.',
    propertySpecsWanted:
      '• Propiedades residenciales que aparezcan activas en el portal de Kania Law Firm / County Tax Foreclosures con $5,000 a $30,000+ en impuestos atrasados.\n• Casas Single-Family 3+ Beds o terrenos urbanos en zonas de alta demanda como Charlotte NC.',
    priceAndArvRange:
      '• Oferta objetivo al vendedor: ~60% del valor estimado en Zillow / Comps (suficiente para liquidar los impuestos atrasados en el cierre y dejarle efectivo libre al dueño).',
    contactInfo: 'IG DM: @rowangill74',
    sourceUrl: 'https://www.instagram.com/rowangill74/',
    directContactChannels: {
      socialDmUrl: 'https://www.instagram.com/rowangill74/',
      communityUrl: 'https://www.instagram.com/reel/DdRU-cxRRxC/',
    },
    readyPitchMessage: `Hey Rowan! Following your County Tax Foreclosure GIS strategy, I locked up a tax-delinquent property in [Condado/Ciudad] at ~60% of value ($[Precio Contrato] vs $[ARV] value) with the third-party assignment clause. Ready to dispo this with your buyers!`,
    notes:
      'Extraído del Reel 9: muestra el mapa GIS de Mecklenburg County NC (2127407 / Kania Law Firm) y cómo revender el contrato en grupos de Facebook e inversionistas locales.',
    verified: true,
  },
  {
    id: 'cb-creator-olivia-schremmer',
    name: 'Olivia Schremmer (@olivia_schremmer — Virtual Pre-Foreclosure Buyer & JV)',
    companyOrGroup: 'Olivia Schremmer Virtual Wholesale Dispo (Reel 11)',
    creatorHandle: '@olivia_schremmer',
    platform: 'reel_buyer',
    market: 'Texas (DFW, Houston, San Antonio) y Connecticut (West Haven, New Haven, Hartford, Bridgeport)',
    buyBoxType: 'Fix & Flip',
    maxPrice: '$85,000 a $350,000',
    finderPayoutOffer: '💰 Paga 50/50 JV Split (Asignaciones promedio de $15,000 a $21,000)',
    dealRequirementMode: 'both_accepted',
    dealRequirementLabel: '🤝 Acepta AMBOS (Contrato Firmado O Lead Calificado en Pre-Foreclosure)',
    dealRequirementDetails:
      'Si tienes el contrato firmado con el dueño en Pre-Foreclosure, ella conecta el trato con sus compradores verificados (que depositan $6,000 de Earnest Money Deposit no reembolsable y cubren los $500 de Transaction Coordinator). Si tienes al dueño motivado antes de la subasta pero necesitas ayuda para coordinar el Payoff y el contrato, hacen JV 50/50.',
    propertySpecsWanted:
      '• Casas Single-Family en Pre-Foreclosure (con fecha de subasta activa en los próximos 15 a 60 días).\n• El dueño debe tener suficiente equity (la deuda total atrasada con el banco debe ser menor al 60% del ARV) y querer vender rápido para evitar que el Foreclosure destruya su reporte de crédito por 7 años.',
    priceAndArvRange:
      '• ARV entre $180,000 y $420,000.\n• Margen de asignación objetivo: $15,000 a $25,000.',
    contactInfo: 'IG DM: @olivia_schremmer',
    sourceUrl: 'https://www.instagram.com/olivia_schremmer/',
    directContactChannels: {
      socialDmUrl: 'https://www.instagram.com/olivia_schremmer/',
      communityUrl: 'https://www.instagram.com/reel/DdQIG2fCu-y/',
    },
    readyPitchMessage: `Hey Olivia! I have a motivated Pre-Foreclosure seller in [Ciudad, Estado] with an upcoming auction date. Payoff is ~$[Deuda] and ARV is $[ARV]. Would love to partner with you to lock this up / dispo to your cash buyers!`,
    notes:
      'En el Reel 11 muestra su cheque de $21,000 cerrando de forma 100% virtual una casa en West Haven, CT desde su casa en Texas con $6,000 de EMD del comprador.',
    verified: true,
  },
  {
    id: 'cb-creator-troy-kearns',
    name: 'Troy Kearns (@troykearns — Bird Dog Finder Program & Driving for Dollars Buyer)',
    companyOrGroup: 'Troy Kearns / DealMachine Bird Dog & JV Network',
    creatorHandle: '@troykearns',
    platform: 'reel_buyer',
    market: 'Colorado, Missouri, Kansas, Ohio, Indiana, Florida, Georgia y Tennessee',
    buyBoxType: 'Fix & Flip',
    maxPrice: 'Casas $50,000 a $300,000',
    finderPayoutOffer: '💰 Paga $2,000 a $5,000 Bird Dog Fee (SOLO por encontrar la casa sin contrato) O 50/50 JV con Contrato',
    dealRequirementMode: 'lead_only_birddog',
    dealRequirementLabel: '🔍 Acepta SOLO Encontrar la Propiedad / Bird Dog (Sin Contrato) O 50/50 con Contrato',
    dealRequirementDetails:
      'Especialista en trabajar con "Bird Dogs" (buscadores de propiedades): si encuentras una propiedad abandonada o deteriorada (usando Google Street View, Driving for Dollars o listas del gobierno), sacas el teléfono del dueño y confirmas que quiere vender, puedes pasarle el lead SIN firmar contrato por un Finder’s Fee de $2,000–$5,000 al cerrar, o firmar tú el contrato e ir 50/50.',
    propertySpecsWanted:
      '• Casas Single-Family y pequeños multifamiliares con señales físicas de abandono: lonas azules en el techo, pasto alto, ventanas tapiadas, correo acumulado, violaciones de código o dueños fallecidos (Pre-Probate).',
    priceAndArvRange:
      '• Mercados de flujo de caja y flips de clase trabajadora: Compras entre $50,000 y $220,000 con ARV de $120,000 a $380,000.',
    contactInfo: 'Web: troykearns.com | IG DM: @troykearns',
    sourceUrl: 'https://troykearns.com/',
    directContactChannels: {
      dealPortalUrl: 'https://troykearns.com/',
      socialDmUrl: 'https://www.instagram.com/troykearns/',
    },
    readyPitchMessage: `Hey Troy! I found a vacant/distressed off-market property in [Ciudad, Estado] with high equity and confirmed the owner wants a cash offer. How can I submit this lead to your team as a Bird Dog / JV partner?`,
    notes:
      'Uno de los creadores más activos enseñando y pagando a Bird Dogs que solo encuentran la propiedad deteriorada sin necesidad de tener capital ni experiencia cerrando contratos.',
    verified: true,
  },
  {
    id: 'cb-creator-rjbates',
    name: 'RJ Bates III (@rjbatesiii — Titanium Investments Direct Cash Buyer & JV)',
    companyOrGroup: 'Titanium Investments LLC (50 Estados / Comprador Directo y Dispo)',
    creatorHandle: '@rjbatesiii',
    platform: 'reel_buyer',
    market: 'Texas (DFW, Houston, San Antonio), Oklahoma (OKC, Tulsa), FL, GA, NC, TN, AZ y NV',
    buyBoxType: 'Fix & Flip',
    maxPrice: '$60,000 a $450,000 (Cierra en 7 días con efectivo propio)',
    finderPayoutOffer: '💰 Compra tu Contrato Directamente (Tú cobras el 100% de tu Assignment Fee) o 50/50 JV en mercados externos',
    dealRequirementMode: 'contract_signed',
    dealRequirementLabel: '📄 Requiere Contrato Ya Firmado (Signed PSA Directo con el Vendedor)',
    dealRequirementDetails:
      'Exige que tengas el contrato Purchase & Sale Agreement firmado directamente con el propietario. En sus mercados principales (TX, OK, FL, AZ) Titanium Investments actúa como el Comprador Final en Efectivo (por lo que cobras tu Assignment Fee completo sin dividirlo). En otros mercados hacen JV 50/50.',
    propertySpecsWanted:
      '• Casas Single-Family 3+ Beds, 1.5+ Baths, >1,000 SqFt construidas después de 1950.\n• Requieren fotos interiores/exteriores y acceso mediante Lockbox o cita.',
    priceAndArvRange:
      '• Precio <= (ARV × 70%) - Reparaciones.\n• ARV entre $140,000 y $550,000.',
    contactInfo: 'Web: titaniumu.com | IG DM: @rjbatesiii',
    sourceUrl: 'https://www.titaniumu.com/',
    directContactChannels: {
      dealPortalUrl: 'https://www.titaniumu.com/',
      socialDmUrl: 'https://www.instagram.com/rjbatesiii/',
    },
    readyPitchMessage: `Hey RJ! I have a direct-to-seller contract signed in [Ciudad, Estado] at $[Precio] (ARV $[ARV], Repairs ~$[Reparaciones], [Beds/Baths/SqFt]). Sending you the address and photos to see if Titanium wants to buy it direct or JV!`,
    notes:
      'Comprador real de alto volumen (famoso por retos de 50 deals en 50 estados) que compra directamente en efectivo o hace JV 50/50.',
    verified: true,
  },
  {
    id: 'cb-reddit-wholesalinghouses-hub',
    name: 'Reddit r/WholesalingHouses & r/WholesaleRealestate — Compradores Directos & Closers',
    companyOrGroup: 'Comunidades Oficiales de Reddit (Hilos "[BUYING]" y "Bird Dog / JV")',
    creatorHandle: 'r/WholesalingHouses & r/WholesaleRealestate',
    platform: 'reddit',
    market: 'Nacional (Mayor actividad en FL, TX, OH, MI, NC, GA, PA, IN, TN, AZ, MO)',
    buyBoxType: 'Fix & Flip',
    maxPrice: '$35,000 a $500,000',
    finderPayoutOffer: '💰 $1,500–$3,500 Bird Dog Fee (sin contrato) O 50/50 JV Split / 100% Assignment Fee (con contrato)',
    dealRequirementMode: 'both_accepted',
    dealRequirementLabel: '🤝 Acepta AMBOS (Hilos para Leads sin Contrato + Hilos de End-Buyers con Contrato)',
    dealRequirementDetails:
      'En Reddit tienes dos modalidades activas todos los días:\n1) SI NO TIENES CONTRATO FIRMADO (Solo el Lead): Publica "[JV / Need Closer] Have a warm motivated seller in [City, State] asking $[X] on a $[ARV] house, need an experienced closer to lock up 50/50" (nunca pongas la dirección exacta en público; pide que firmen JV Agreement por DM antes de dar el teléfono del dueño).\n2) SI YA TIENES CONTRATO FIRMADO: Publica "[DEAL UNDER CONTRACT - City, State] 3/2 1,400 sqft, Asking $[X], ARV $[Y], EMD $5k at Title. DM Proof of Funds & Buy Box".',
    propertySpecsWanted:
      '• Single-Family Fix & Flip (3/2, >1,100 SqFt).\n• Propiedades de flujo de caja en el Midwest (Detroit, Cleveland, Indianapolis, Memphis, St. Louis) entre $40k y $110k para inversionistas fuera del estado.\n• Contratos Subject-To y lotes baldíos en FL/TX/NC.',
    priceAndArvRange:
      '• Flips: 65%–70% del ARV menos reparaciones.\n• Rentals (Midwest): Regla del 1.2% al 1.5% (ej. casa de $75,000 que se alquila en $1,100/mes en Section 8).',
    contactInfo: 'Reddit: r/WholesalingHouses y r/WholesaleRealestate',
    sourceUrl: 'https://www.reddit.com/r/WholesalingHouses/',
    directContactChannels: {
      dealPortalUrl: 'https://www.reddit.com/r/WholesalingHouses/',
      socialDmUrl: 'https://www.reddit.com/r/WholesaleRealestate/search/?q=%22buy+box%22+OR+%22cash+buyer%22&restrict_sr=1',
      communityUrl: 'https://www.reddit.com/r/realestateinvesting/',
    },
    readyPitchMessage: `[DIRECT TO SELLER - CIUDAD, ESTADO] Locked up a 3/2 ([SqFt] sqft) off-market property at $[Precio] (ARV $[ARV], Rehab ~$[Reparaciones]). Clean title open at [Title Company]. Looking for an end-buyer with Proof of Funds who can close in 14 days. DM me your email and Buy Box!`,
    notes:
      'Regla de oro de Reddit: Nunca entregues la dirección exacta ni el teléfono del vendedor sin antes verificar Proof of Funds (si es Cash Buyer) o firmar un Joint Venture Agreement de 1 página (si es un socio que va a llamar al dueño).',
    verified: true,
  },
  {
    id: 'cb-waltco-builders',
    name: 'Derek Walter — Waltco Construction LLC & 8,855+ Constructores (LandAtlas)',
    companyOrGroup: 'LandAtlas Verified Platinum Home Builders (Reels 6, 8 y 10)',
    creatorHandle: 'LandAtlas Builders Network',
    platform: 'builder_database',
    market: 'Florida, Texas, Carolina del Norte, Georgia, Tennessee y Arkansas',
    buyBoxType: 'Land / Home Builder',
    maxPrice: '$20,000 a $150,000 por lote (Compran de 1 a 10 lotes por mes)',
    finderPayoutOffer: '💰 Pagan 100% de tu Assignment Fee ($10,000 a $30,000 por lote) como Compradores Finales',
    dealRequirementMode: 'both_accepted',
    dealRequirementLabel: '🤝 Puedes Llamar al Constructor ANTES de Firmar Contrato para Confirmar su Precio Exacto',
    dealRequirementDetails:
      'A diferencia de las casas tradicionales, con los constructores de terrenos (Home Builders) puedes aplicar la estrategia de "Reverse Land Wholesaling" de los Reels 6 y 8: llamas primero al constructor que ya está construyendo en ese código postal, le preguntas: "¿Cuánto me pagas hoy en efectivo si te traigo un lote de 0.23 acres en esta misma cuadra?", y una vez que el constructor te da su precio de compra garantizado (ej. $45,000), llamas al dueño del lote y le firmas el contrato en $25,000 para ganarte $20,000 seguros.',
    propertySpecsWanted:
      '• Lotes residenciales secos (High & Dry / No Wetlands), limpios o con árboles ligeros, zonificación residencial unifamiliar, mínimo 50 pies de frente (Frontage) × 100 pies de fondo.',
    priceAndArvRange:
      '• Los constructores pagan entre el 12% y el 18% del valor final de la casa nueva que van a construir (ej. si construyen casas nuevas de $320,000, pagan hasta $45,000–$55,000 por el lote).',
    contactInfo: 'Directorio: landatlas.com | Búsqueda de Permisos del Condado',
    sourceUrl: 'https://www.landatlas.com/',
    directContactChannels: {
      dealPortalUrl: 'https://www.landatlas.com/',
      socialDmUrl: 'https://www.instagram.com/carsonbuysland/',
    },
    readyPitchMessage: `Hi [Nombre del Constructor], I saw your new construction project in [Zip Code / Calle]. I’m a local land locator and have an off-market [Tamaño] acre buildable lot nearby (no wetlands, power at street) for $[Precio]. Are you actively buying more infill lots in [Zip Code] this month?`,
    notes:
      'Extraído por OCR del Reel 8 (@carsonbuysland): Derek Walter (Waltco Construction LLC) aparece como constructor Platinum comprando lotes activamente.',
    verified: true,
  },
  {
    id: 'cb-carbon-rei-network',
    name: 'Red Carbon REI (@im_just_gabe46 — 3,000+ Cash Buyers Verificados)',
    companyOrGroup: 'Carbon REI Dispo Portal (Detectado en Comentarios de tus Reels)',
    creatorHandle: '@im_just_gabe46',
    platform: 'web_directory',
    market: 'Nacional (EE.UU. — 50 Estados)',
    buyBoxType: 'Fix & Flip',
    maxPrice: '$50,000 a $600,000',
    finderPayoutOffer: '💰 50/50 JV Split ($10,000 a $25,000 promedio por trato vendido a sus 3,000+ compradores)',
    dealRequirementMode: 'contract_signed',
    dealRequirementLabel: '📄 Requiere Contrato Ya Firmado (Signed PSA)',
    dealRequirementDetails:
      'Envías el contrato firmado y fotos de la propiedad; su plataforma empareja el trato con su base de más de 3,000 compradores en efectivo y fondos de inversión.',
    propertySpecsWanted:
      '• Casas Single-Family para Fix & Flip y carteras de alquiler (BRRRR).\n• Lotes residenciales bajo contrato con margen demostrado.',
    priceAndArvRange:
      '• Precio de contrato <= 70% del ARV menos reparaciones.',
    contactInfo: 'IG DM: @im_just_gabe46 | Web: carbonrei.com',
    sourceUrl: 'https://www.instagram.com/im_just_gabe46/',
    directContactChannels: {
      dealPortalUrl: 'https://www.instagram.com/im_just_gabe46/',
      socialDmUrl: 'https://www.instagram.com/im_just_gabe46/',
    },
    readyPitchMessage: `Hey Gabe! Saw your comment about Carbon REI's 3,000+ cash buyers network. I have an off-market property under contract in [Ciudad, Estado] at $[Precio] (ARV $[ARV]). How can I submit it to your dispo team for a 50/50 JV?`,
    notes:
      'Extraído de los comentarios del Reel 10 donde @im_just_gabe46 ofrece su red de 3,000+ compradores verificados para cerrar contratos en JV.',
    verified: true,
  },
  {
    id: 'cb-fb-real-estate-wholesalers-club',
    name: 'Grupos de Facebook de Cash Buyers & JV ("Real Estate Wholesalers Club" / "Wholesaling Houses Full Time")',
    companyOrGroup: 'Comunidades de Facebook con 100,000+ Inversionistas y Cash Buyers Activos',
    creatorHandle: 'Facebook Cash Buyers Groups',
    platform: 'facebook_group',
    market: 'Nacional y Grupos Locales por Ciudad (Tampa, Houston, Atlanta, Detroit, Charlotte, Cleveland, Phoenix)',
    buyBoxType: 'Fix & Flip',
    maxPrice: '$30,000 a $750,000',
    finderPayoutOffer: '💰 Cobras el 100% de tu Assignment Fee ($10,000–$30,000) si encuentras al comprador directo, o 50/50 JV',
    dealRequirementMode: 'both_accepted',
    dealRequirementLabel: '🤝 Acepta AMBOS (Buscar Socio Closer para un Lead O Publicar Contrato Ya Firmado)',
    dealRequirementDetails:
      'Estrategia de los Reels 1 y 9:\n1) Entras al grupo de Facebook de tu ciudad (ej. "Tampa Real Estate Investors & Cash Buyers").\n2) Usas la lupa del grupo y buscas "Cash Buyer", "Send me deals" o "Just closed" para ver quiénes son los compradores reales que están publicando sus cierres.\n3) Les escribes por Messenger preguntando su Buy Box ANTES de buscar la propiedad, o publicas tu Post Imán cuando ya tienes el contrato.',
    propertySpecsWanted:
      '• Todo tipo de propiedades: Single-Family Flips, Section 8 Rentals, Multifamily 2–4 unidades, Terrenos y Contratos Subject-To.',
    priceAndArvRange:
      '• Rango completo desde casas de $35,000 en Detroit/Ohio hasta flips de $500,000+ en Florida/Texas/California.',
    contactInfo: 'Facebook Groups Search Directo',
    sourceUrl: 'https://www.facebook.com/search/groups/?q=real%20estate%20investors%20cash%20buyers%20wholesale',
    directContactChannels: {
      dealPortalUrl: 'https://www.facebook.com/groups/wholesalinghousesforreal',
      socialDmUrl: 'https://www.facebook.com/groups/wholesalehotlinelive',
      communityUrl: 'https://www.facebook.com/search/groups/?q=real%20estate%20investors%20cash%20buyers%20wholesale',
    },
    readyPitchMessage: `🔥 OFF-MARKET DEAL AVAILABLE IN [CIUDAD, ESTADO] 🔥\n3 Beds / 2 Baths | Asking $[Precio] | ARV $[ARV] | Rehab ~$[Reparaciones]\nDirect to seller, clear title open. Serious Cash Buyers only — drop your EMAIL + BUY BOX in the comments or DM me "DEAL" for the address & photos!`,
    notes:
      'El canal #1 gratuito recomendado por FreeWholesaling.com, Richard Taylor y Rowan Gill para encontrar compradores en efectivo en menos de 24 horas.',
    verified: true,
  },
];

db.cashBuyers = DEEP_CREATOR_AND_NETWORK_BUYERS;
fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf-8');
console.log(`Successfully seeded ${DEEP_CREATOR_AND_NETWORK_BUYERS.length} deep Creator, Bird-Dog & Cash Buyer profiles into skills-db.json!`);
