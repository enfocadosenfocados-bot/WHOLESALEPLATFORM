import {
  InstagramCreatorPartner,
  MotivatedSellerLead,
  VerifiedCashBuyer,
} from '@/types/skill';

export const INITIAL_IG_CREATORS: InstagramCreatorPartner[] = [
  {
    id: 'ig-richard-taylor',
    handle: '@richardgrandintaylor',
    fullName: 'Richard Taylor (Hold My Hand Wholesale / BuyBoxCartel)',
    profileUrl: 'https://www.instagram.com/richardgrandintaylor/',
    reelsCount: 3,
    reelUrls: [
      'https://www.instagram.com/reel/DbJkwwPSuEN/',
      'https://www.instagram.com/reel/DdUtM6KyxOl/',
      'https://www.instagram.com/reel/Dc_oxkICaO4/',
    ],
    role: 'Comprador Activo & Mentor (Paga $10,000 Finder’s Fee o Equity)',
    marketsTheyBuy: 'Detroit (MI), Canton/Cleveland (OH), Omaha (NE) y mercados < $200,000',
    whatTheyLookFor:
      'Casas Single-Family < $200k con $15k-$25k de descuento (para Fix & Flip o Section 8) y Multifamiliares (Duplex/Fourplex) con Seller Financing.',
    dealStructurePreference:
      'Acepta tanto tratos ya cerrados bajo contrato (PSA firmado para asignarle la posición por $10,000 en efectivo o Equity mensual) como llamadas conjuntas en vivo con Realtors.',
    customDmEnglish: `Hey Richard! I’ve been following your content for a while now (loved your breakdowns on the Canton OH deal, the Detroit Joann St deal, and the Omaha Fourplex Seller Finance play) and I’m actively putting your strategies into action.

I’d love to work with you and bring you deals as a Deal Finder. Quick question so I can target the exact properties you want:
1. What are your top markets and exact Buy Box right now (price point, Fix & Flip vs Section 8 or Seller Finance multifamily)?
2. When I find a property that fits your numbers, do you prefer that I already have the Purchase & Sale Agreement locked up and signed with the seller/realtor ready to assign to you, or do you prefer to review the numbers before we lock it up?

Ready to hustle and send you solid deals. Let me know how I can best help you!`,
    customDmSpanish: `¡Hola Richard! Te vengo siguiendo desde hace tiempo (analicé a fondo tus Reels del trato en Canton OH, Joann St en Detroit y el Fourplex con Seller Financing) y estoy aplicando tu sistema activamente.

Quiero trabajar contigo llevándote tratos como Deal Finder. Para buscar exactamente lo que necesitas ahora mismo:
1. ¿Qué mercados y qué Buy Box exacto estás comprando hoy (rango de precio, casas para Fix & Flip / Section 8 o multifamiliares con financiamiento del dueño)?
2. ¿Cómo prefieres trabajar los deals: necesitas que ya tenga el contrato (Purchase & Sale Agreement) firmado y cerrado con el vendedor listo para asignártelo, o prefieres que te pase la propiedad calificada antes de firmar?`,
    outreachStatus: 'pending',
  },
  {
    id: 'ig-flipwithzach',
    handle: '@flipwithzach',
    fullName: 'Zach Ginn (Flip With Rick / FreeWholesaling.com)',
    profileUrl: 'https://www.instagram.com/flipwithzach/',
    reelsCount: 3,
    reelUrls: [
      'https://www.instagram.com/reel/DdZpo2Zumix/',
      'https://www.instagram.com/reel/DdfIcYeh9TO/',
      'https://www.instagram.com/reel/Ddcr0LHp2Nv/',
    ],
    role: 'Comprador Directo & JV Partner (Casas Feas + Terrenos/Land)',
    marketsTheyBuy:
      'Florida (Treasure Coast, Lee County, South/Central FL), Tennessee (Clarksville), Texas (Houston/Dallas) y JV Nacional',
    whatTheyLookFor:
      'Propiedades con alta motivación (Pre-Foreclosures a días de subasta, Tax Delinquent, Code Violations, Zillow FSBO al 60%) y lotes de terreno baldíos de 0.1 a 1 acre.',
    dealStructurePreference:
      'En sus Reels pide que tengas la propiedad YA bajo contrato (Locked up under Purchase & Sale Agreement con Inspection Period) para hacer Joint Venture (JV 50/50) o comprártela directamente en efectivo.',
    customDmEnglish: `Hey Zach! I’ve been studying FreeWholesaling.com and following your Reels closely (especially your Clarksville pre-foreclosure deal, the Zillow FSBO 60% workflow, and the 45-day Land Wholesaling blueprint).

You mentioned in your video that you want people to send you real estate deals. I want to work with you and bring you deals regularly:
1. What specific properties or land lots are you and Rick looking to buy most right now (specific counties, price ranges, ugly houses vs infill land lots)?
2. To submit a deal to you, do you require that I already have the seller signed on a Purchase & Sale Agreement (under contract with inspection period), and what details do you need me to send over?

Looking forward to sending you profitable deals!`,
    customDmSpanish: `¡Hola Zach! He venido estudiando FreeWholesaling.com y siguiendo tus Reels (el trato de Pre-Foreclosure en Clarksville, la automatización en Zillow FSBO al 60% y el sistema de terrenos en Lee County/Texas).

Mencionaste en tu video que buscas que te enviemos tratos. Quiero saber cómo trabajar contigo y ayudarte a encontrar propiedades:
1. ¿Qué tipo de propiedades o terrenos están buscando comprar con mayor prioridad ahora mismo (condados específicos, casas feas o lotes de 0.1-1 acre)?
2. ¿Necesitas que ya tenga el trato 100% cerrado bajo contrato con el vendedor antes de enviártelo, o cómo hacen el proceso de JV/compra?`,
    outreachStatus: 'pending',
  },
  {
    id: 'ig-ownwithsam',
    handle: '@ownwithsam',
    fullName: 'Samuel G (Creative Finance & Assumable Mortgages)',
    profileUrl: 'https://www.instagram.com/ownwithsam/',
    reelsCount: 1,
    reelUrls: ['https://www.instagram.com/reel/DdHzKgsJEyZ/'],
    role: 'Especialista y Comprador en Hipotecas Asumibles (2.8% VA/FHA) & Subject-To',
    marketsTheyBuy: 'Tampa / South & Central Florida y mercados principales de EE.UU.',
    whatTheyLookFor:
      'Casas Single-Family donde el dueño está atrasado en pagos o motivado y tiene una hipoteca existente de bajo interés (2.5% - 4.0% VA/FHA Assumable o Subject-To).',
    dealStructurePreference:
      'Busca leads donde el vendedor esté abierto a que le tomen los pagos de su hipoteca existente (Subject-To / Take Over Payments) poniéndose al día con los atrasos (Arrears).',
    customDmEnglish: `Hey Sam! I’ve been following your content and loved your Reel on using the 5 Zillow filters + the "Assumable" keyword in Tampa to find 2.875% mortgages.

I’m actively filtering and calling motivated sellers with low-rate mortgages and behind on payments, and I’d love to work with you:
1. What specific cities/states and property criteria are you looking for right now on Subject-To and Assumable deals (max arrears/entry fee, bed/bath, price range)?
2. When I find a seller who is ready to let us take over their mortgage, do you want me to lock up the contract first, or bring you in to structure the Subject-To paperwork together?`,
    customDmSpanish: `¡Hola Sam! Te vengo siguiendo desde hace tiempo y me encantó tu Reel de los 5 filtros en Zillow con la palabra clave "Assumable" en Tampa para encontrar hipotecas al 2.875%.

Estoy buscando y llamando a vendedores atrasados en pagos con tasas bajas y quiero saber cómo podríamos trabajar juntos:
1. ¿En qué ciudades y qué criterios exactos buscas hoy para tratos Subject-To o Asumibles (monto máximo de atrasos/entrada y rango de precio)?
2. Cuando tenga un vendedor listo para ceder su hipoteca, ¿necesitas que ya lo tenga firmado bajo contrato o prefieres entrar en la llamada para estructurar el Subject-To juntos?`,
    outreachStatus: 'pending',
  },
  {
    id: 'ig-maxclosesdeals',
    handle: '@maxclosesdeals',
    fullName: 'Max Rathbun (Tranchi AI / Tax Deed & High-Equity Deals)',
    profileUrl: 'https://www.instagram.com/maxclosesdeals/',
    reelsCount: 1,
    reelUrls: ['https://www.instagram.com/reel/DdYC81bsB7_/'],
    role: 'Creador de Tranchi AI & Inversionista en Tax Deeds / High Equity',
    marketsTheyBuy: 'Jacksonville / Atlantic Beach (FL) y mercados con subastas de Tax Deed',
    whatTheyLookFor:
      'Propiedades de dueños ausentes (Absentee Owners / Out-of-State) libres de hipoteca (Free & Clear) con embargos fiscales o subastas del Sheriff con amplio margen bajo el valor de mercado.',
    dealStructurePreference:
      'Contrato firmado muy por debajo del valor tasado (ej. contrato en $150k en propiedad de $360k) para asignarlo a Cash Buyers.',
    customDmEnglish: `Hey Max! Been following your content and saw your breakdown on finding high-equity Tax Deed & Absentee Owner deals (like the Atlantic Beach FL property on Tranchi).

I’d love to connect and see how we can work together on deals:
1. What specific markets and Buy Box criteria are you or your buyers looking for right now?
2. Do you prefer that I already have the seller locked up under a signed Purchase & Sale Agreement before sending you the deal, or how do you typically structure JVs with deal finders?`,
    customDmSpanish: `¡Hola Max! Te vengo siguiendo y vi tu video sobre cómo detectar propiedades con alto equity y Tax Deeds (como la propiedad de Atlantic Beach, FL en Tranchi).

Me gustaría saber cómo podría trabajar contigo y ayudarte con tratos:
1. ¿Qué mercados y qué tipo de propiedades están buscando tú o tus compradores ahora mismo?
2. ¿Prefieres que ya tenga el contrato firmado con el vendedor antes de enviártelo, o cómo sueles trabajar los deals en conjunto?`,
    outreachStatus: 'pending',
  },
  {
    id: 'ig-carsonbuysland',
    handle: '@carsonbuysland',
    fullName: 'Carson | Land Flipping (@carsonbuysland)',
    profileUrl: 'https://www.instagram.com/carsonbuysland/',
    reelsCount: 1,
    reelUrls: ['https://www.instagram.com/reel/DcgiMy3OQov/'],
    role: 'Inversionista de Terrenos (Land Flipping & Home Builders Network)',
    marketsTheyBuy: 'Palm Bay / Florida y mercados de lotes residenciales (Infill Lots)',
    whatTheyLookFor:
      'Lotes residenciales baldíos (Infill Lots) en zonas de crecimiento donde constructores locales (Home Builders) están levantando casas nuevas.',
    dealStructurePreference:
      'Poner el lote bajo contrato con un Land Sale Agreement (con período de estudio de viabilidad/inspección) a descuento para asignarlo a constructores.',
    customDmEnglish: `Hey Carson! I’ve been following your land flipping content (loved the Palm Bay FL lot breakdown and how you match lots with home builders on LandAtlas).

I’m actively sourcing discounted infill lots and would love to work with you:
1. What specific cities/counties and lot criteria are you buying or partnering on right now (lot size, utilities, price point)?
2. Do you prefer that I already have the Land Sale Agreement signed with the seller before sending it to you, or can I bring you qualified land leads to dispo to builders together?`,
    customDmSpanish: `¡Hola Carson! Vengo siguiendo tu contenido de Land Flipping desde hace tiempo (excelente el ejemplo del lote en Palm Bay, FL y la base de 8,855 constructores en LandAtlas).

Quiero saber cómo podría trabajar contigo consiguiendo lotes:
1. ¿Qué condados/ciudades y qué características de terrenos estás buscando ahora mismo?
2. ¿Necesitas que ya tenga el Land Sale Agreement firmado con el dueño del lote antes de pasártelo, o cómo trabajas los deals con socios?`,
    outreachStatus: 'pending',
  },
  {
    id: 'ig-rowangill74',
    handle: '@rowangill74',
    fullName: 'Rowan Gill (County Tax Foreclosure Specialist)',
    profileUrl: 'https://www.instagram.com/rowangill74/',
    reelsCount: 1,
    reelUrls: ['https://www.instagram.com/reel/DdRU-cxRRxC/'],
    role: 'Wholesaler de Mapas GIS de Tax Foreclosures',
    marketsTheyBuy: 'Charlotte / Mecklenburg County (NC) y mercados del Sureste de EE.UU.',
    whatTheyLookFor:
      'Propiedades en mapas GIS del condado con $10,000+ en impuestos atrasados (Property Tax Foreclosures) contratadas al ~60% de su valor Zillow/tasado.',
    dealStructurePreference:
      'Purchase & Sale Agreement firmado al ~60% del valor con cláusula de asignación a terceros ("assign it to a third party for a net gain").',
    customDmEnglish: `Hey Rowan! Been following your series (loved Part 3 on pulling County Property Tax Foreclosure GIS maps like Mecklenburg County NC and locking them up at 60%).

I’m pulling county tax foreclosure maps and calling owners right now, and I’d love to work with you:
1. Which counties/states and what types of properties are you looking for most right now?
2. When I get a tax-delinquent seller ready at ~60% of value, do you want me to already have the PSA signed with the assignment clause ready to JV/dispo with you?`,
    customDmSpanish: `¡Hola Rowan! Vengo siguiendo tu serie (especialmente el método del mapa GIS de Property Tax Foreclosures en Mecklenburg County, NC ofreciendo el 60%).

Estoy extrayendo mapas de embargos fiscales y llamando a propietarios, y quiero saber cómo trabajar contigo:
1. ¿En qué condados o estados estás buscando más propiedades ahora mismo?
2. ¿Necesitas que ya tenga el contrato firmado al ~60% con la cláusula de asignación para que lo vendamos juntos a tus compradores?`,
    outreachStatus: 'pending',
  },
  {
    id: 'ig-olivia-schremmer',
    handle: '@olivia_schremmer',
    fullName: 'Olivia Schremmer (Virtual Wholesaling Pre-Foreclosures)',
    profileUrl: 'https://www.instagram.com/olivia_schremmer/',
    reelsCount: 1,
    reelUrls: ['https://www.instagram.com/reel/DdQIG2fCu-y/'],
    role: 'Inversionista de Virtual Wholesaling (Texas & Connecticut)',
    marketsTheyBuy: 'Texas, Connecticut (ej. West Haven CT) y mercados virtuales de Pre-Foreclosure',
    whatTheyLookFor:
      'Propiedades en Pre-Foreclosure con fecha de subasta próxima donde el vendedor necesita una salida rápida en efectivo para no arruinar su crédito.',
    dealStructurePreference:
      'Contrato firmado con el vendedor y comprador final con $6,000 de Earnest Money Deposit (EMD) y $500 de Transaction Coordinator fee.',
    customDmEnglish: `Hey Olivia! I’ve been following your journey and loved your breakdown of the $21k virtual wholesale pre-foreclosure deal you closed in West Haven, CT from your house in Texas!

I’m working pre-foreclosure lists virtually and would love to collaborate with you:
1. What markets and property criteria are you and your cash buyers actively looking for right now?
2. How do you like to work with partners — do you prefer that I already have the seller locked up under contract before sending it over so we can dispo it together?`,
    customDmSpanish: `¡Hola Olivia! Te vengo siguiendo desde hace tiempo y me encantó tu Reel del trato virtual de $21,000 en West Haven, Connecticut que cerraste desde Texas.

Estoy trabajando listas de Pre-Foreclosure de forma virtual y me encantaría saber cómo trabajar contigo:
1. ¿Qué mercados y qué tipo de propiedades están buscando tú y tus compradores ahora mismo?
2. ¿Prefieres que ya tenga el contrato cerrado con el vendedor antes de enviártelo para moverlo con tus compradores?`,
    outreachStatus: 'pending',
  },
  {
    id: 'ig-commenter-flicknaut',
    handle: '@flicknaut',
    fullName: 'Flicknaut (Wholesaler Activo con Deals en Detroit, MI)',
    profileUrl: 'https://www.instagram.com/flicknaut/',
    reelsCount: 1,
    reelUrls: ['https://www.instagram.com/reel/DdfIcYeh9TO/'],
    role: 'Wholesaler Virtual Buscando Cash Buyers / JV (Detectado en Comentarios)',
    marketsTheyBuy: 'Detroit, Michigan (Casas de $45k-$55k en efectivo)',
    whatTheyLookFor:
      'Tiene un trato bajo contrato en Detroit a $47,500 y busca socio de Dispo / Cash Buyer por un Assignment Fee plano de $5,000.',
    dealStructurePreference: 'Ya tiene contrato cerrado y busca Cash Buyer inmediato en Detroit.',
    customDmEnglish: `Hey! I saw your comment on Zach Ginn's Reel about your Detroit cash deal locked up at $47,500 where you're looking for a buyer at a $5k assignment fee.

I have a network of Detroit Fix & Flip and Section 8 buyers (including Richard Taylor's Detroit buyer box). Send me the address, bed/bath, sqft, and photos of your Detroit deal and let's get it sold together! Also let me know what other deals you're locking up.`,
    customDmSpanish: `¡Hola! Vi tu comentario en el Reel de Zach Ginn sobre tu propiedad en Detroit bajo contrato en $47,500 buscando comprador con $5,000 de fee.

Tengo compradores activos de Fix & Flip y Section 8 en Detroit. Envíame los detalles y fotos de la propiedad para moverla con mis compradores y hagamos JV.`,
    outreachStatus: 'pending',
  },
];

export const INITIAL_CASH_BUYERS: VerifiedCashBuyer[] = [
  {
    "id": "cb-creator-richard-taylor",
    "name": "Richard Taylor (@richardgrandintaylor — Hold My Hand Wholesale / BuyBoxCartel)",
    "companyOrGroup": "BuyBoxCartel & Hold My Hand Wholesale (Reels 1, 2 y 3)",
    "creatorHandle": "@richardgrandintaylor",
    "platform": "reel_buyer",
    "market": "Detroit (MI), Canton / Cleveland / Akron (OH), Omaha (NE) y Midwest < $200k",
    "buyBoxType": "Section 8 Rental",
    "maxPrice": "Casas $45,000 – $150,000 | Multifamily hasta $350,000",
    "finderPayoutOffer": "💰 Paga $10,000 Finder’s Fee / Assignment Fee plano O 50/50 JV + Equity Mensual en Multifamiliares",
    "dealRequirementMode": "both_accepted",
    "dealRequirementLabel": "🤝 Acepta AMBOS (Solo Encontrar la Propiedad O Contrato Ya Firmado)",
    "dealRequirementDetails": "1) SIN CONTRATO FIRMADO (Solo encontraste la propiedad): Si encontraste una casa o Fourplex en Zillow/MLS donde los números dan o el Realtor dijo que el dueño escucha ofertas de Seller Finance, Richard entra contigo en vivo (\"Hold My Hand Wholesale\") para llamar al agente, negociar y firmar el contrato juntos.\n2) CON CONTRATO YA FIRMADO: Si ya firmaste el PSA con cláusula de asignación, lo sube a su lista privada de 10 compradores de Detroit/Ohio para que cobres $10,000+.",
    "propertySpecsWanted": "• Single-Family: 3+ habitaciones, 1+ baños, >1,000 SqFt, estructura sólida para alquiler Section 8 o Fix & Flip ligero (ej. 18418 Joann St Detroit y 519 17th St Canton OH).\n• Multifamiliar (2 a 4 unidades / Fourplex): Propiedades con 90+ días en Zillow donde el dueño acepte Seller Financing (10% Down Payment, 5% interés, amortización a 30 años).",
    "priceAndArvRange": "• Precio de compra objetivo: $40,000 a $135,000 (con ARV de $100,000 a $200,000).\n• Descuento requerido: Mínimo $15,000–$25,000 por debajo de lo que pagan sus compradores de Section 8.",
    "contactInfo": "IG DM: @richardgrandintaylor | Web: buyboxcartel.com",
    "sourceUrl": "https://www.instagram.com/richardgrandintaylor/",
    "directContactChannels": {
      "dealPortalUrl": "https://www.buyboxcartel.com/",
      "socialDmUrl": "https://www.instagram.com/richardgrandintaylor/",
      "communityUrl": "https://www.instagram.com/reel/DbJkwwPSuEN/"
    },
    "readyPitchMessage": "Hey Richard! I’ve been following your Reels on Detroit, Canton OH, and Seller Finance Fourplexes. I found a property that fits your Buy Box in [Ciudad/Dirección] at [Precio] (ARV ~[ARV]). Let me know if you want me to lock up the PSA first or if we can jump on a quick call with the seller/agent to lock it up together!",
    "notes": "Demostró en vivo en tus Reels cómo pagó $10,000 a buscadores en 519 17th St NW Canton OH (comprada en $45k, vendida a su comprador en $55k) y 18418 Joann St Detroit MI (comprada en $115k, vendida en $125k).",
    "verified": true
  },
  {
    "id": "cb-creator-flipwithzach",
    "name": "Zach Ginn & Rick Ginn (@flipwithzach — FlipWithRick.com / FreeWholesaling)",
    "companyOrGroup": "Flip With Rick & SellMyPaper JV Network (Reels 6, 7 y 10)",
    "creatorHandle": "@flipwithzach",
    "platform": "reel_buyer",
    "market": "Compra Propia: Florida (Port St. Lucie, Stuart, Lee County, Tampa, Orlando) y Tennessee (Clarksville) | JV Dispo: Todo EE.UU.",
    "buyBoxType": "Fix & Flip",
    "maxPrice": "Casas $60,000 – $450,000 | Lotes Baldíos $10,000 – $120,000",
    "finderPayoutOffer": "💰 Paga 50/50 JV Split del Assignment Fee ($10,000 a $35,000+ por trato) o Compra Directa en Efectivo en FL",
    "dealRequirementMode": "contract_signed",
    "dealRequirementLabel": "📄 Requiere Contrato Ya Firmado (Signed PSA Directo con el Dueño)",
    "dealRequirementDetails": "Requiere que YA tengas el contrato Purchase & Sale Agreement (PSA) firmado directamente con el propietario (con 14–30 días de Inspection Period y cláusula de asignación). Prohibido el daisy-chaining (re-wholesaling de otros wholesalers). Si es en Treasure Coast / South FL ellos mismos lo compran en efectivo; en el resto del país su equipo de Dispo pone el comprador en efectivo y dividen 50/50 en la compañía de título.",
    "propertySpecsWanted": "• Casas Feas (Ugly Houses): 3+ Beds, 2+ Baths, >1,100 SqFt en Pre-Foreclosure (a días de subasta como su deal de Clarksville TN), Tax Delinquent, Code Violations o Zillow FSBO al 60%.\n• Lotes Baldíos (Infill Land): Lotes residenciales de 0.1 a 1 acre en barrios donde constructores estén levantando casas nuevas (como Lee County FL o Houston TX).\n• Creative Finance / Notas: A través de SellMyPaper.com.",
    "priceAndArvRange": "• Casas: Precio de contrato <= (ARV × 70%) - Reparaciones - $20,000 (ARV entre $160,000 y $550,000).\n• Lotes de Terreno: Contratados al 40%–55% del valor de lotes comparables vendidos a constructores.",
    "contactInfo": "Web: flipwithrick.com | Email: support@flipwithrick.com | IG: @flipwithzach",
    "sourceUrl": "https://www.flipwithrick.com/",
    "directContactChannels": {
      "dealPortalUrl": "https://www.flipwithrick.com/",
      "socialDmUrl": "https://www.instagram.com/flipwithzach/",
      "emailOrPhone": "support@flipwithrick.com",
      "communityUrl": "https://www.facebook.com/groups/wholesalinghousesforreal"
    },
    "readyPitchMessage": "Hey Zach! I have a property locked up under a direct-to-seller signed PSA in [Ciudad, Estado] at $[Precio Contrato] with a [14/30]-day inspection period. Conservative ARV is $[ARV] and estimated repairs are $[Reparaciones]. Sending over the contract, address, and photos so we can JV 50/50!",
    "notes": "En el Reel 7 Zach dice explícitamente: \"Follow me and send me your real estate deals\". Compran con su propio efectivo en Florida y hacen JV 50/50 en todo EE.UU.",
    "verified": true
  },
  {
    "id": "cb-creator-jerry-norton",
    "name": "Jerry Norton (@flippingmastery — Programa $10,000 Finder’s Fee / My10kCheck)",
    "companyOrGroup": "Flipping Mastery / My10kCheck.com Deal Finder Network",
    "creatorHandle": "@flippingmastery",
    "platform": "reel_buyer",
    "market": "Nacional (Todo EE.UU. — Ciudades con >100,000 hab., especialmente AZ, MI, FL, TX, NC, GA, OH, TN)",
    "buyBoxType": "Fix & Flip",
    "maxPrice": "Casas $80,000 – $650,000 | Lotes de Lujo hasta $500,000",
    "finderPayoutOffer": "💰 Paga $10,000 Finder’s Fee Garantizado (Solo por encontrar la propiedad sin firmarla) O 50/50 JV con Contrato",
    "dealRequirementMode": "both_accepted",
    "dealRequirementLabel": "🔍 Acepta SOLO Encontrar la Propiedad (Sin Contrato) O Trato con Contrato Firmado",
    "dealRequirementDetails": "1) SOLO ENCONTRAR LA PROPIEDAD (Bird Dog / Finder’s Fee de $10,000): Uno de los pocos compradores nacionales que te permite simplemente encontrar una propiedad subvalorada (On-Market MLS o Off-Market), verificar que cumple su fórmula y enviársela SIN que tú tengas que firmar el contrato ni poner Earnest Money Deposit (EMD). Su equipo llama, negocia, firma el contrato, pone los fondos y te paga $10,000 cuando cierra.\n2) CON CONTRATO YA FIRMADO: También hace JV 50/50 o fondea el 100% del Double Closing.",
    "propertySpecsWanted": "• Casas Single-Family para Fix & Flip (3+ Beds, 2+ Baths, >1,200 SqFt, sin ubicarse en avenidas comerciales de doble línea amarilla).\n• Propiedades con potencial de \"Double Dip\" (comprar, limpiar sin remodelar y revender en el MLS con financiamiento bancario).\n• Lotes residenciales en zonas de alto valor o frente al agua.",
    "priceAndArvRange": "• Fórmula estricta de compra: Precio <= (ARV × 65% a 70%) - Costo de Reparaciones.\n• ARV mínimo: $150,000 hasta $850,000.",
    "contactInfo": "Portal: my10kcheck.com / flippingmastery.com | IG: @flippingmastery",
    "sourceUrl": "https://flippingmastery.com/",
    "directContactChannels": {
      "dealPortalUrl": "https://www.my10kcheck.com/",
      "socialDmUrl": "https://www.instagram.com/flippingmastery/",
      "communityUrl": "https://flippingmastery.com/"
    },
    "readyPitchMessage": "Hi Jerry & Team! I found a distressed property in [Ciudad, Estado] that meets your 65% ARV minus repairs Buy Box. Asking/Target Price: $[Precio], Verified Sold Comps ARV: $[ARV], Estimated Rehab: $[Reparaciones]. Ready to submit the property details for your acquisitions team!",
    "notes": "Ideal cuando encuentras un gran trato con un Realtor o dueño pero no quieres encargarte del contrato ni del depósito EMD: ellos hacen el cierre y pagan $10,000 de Finder’s Fee.",
    "verified": true
  },
  {
    "id": "cb-creator-ownwithsam",
    "name": "Samuel G (@ownwithsam — Comprador de Hipotecas Asumibles 2.8% & Subject-To)",
    "companyOrGroup": "OwnWithSam Creative Finance Acquisitions (Reel 5)",
    "creatorHandle": "@ownwithsam",
    "platform": "reel_buyer",
    "market": "Tampa, Orlando, Jacksonville y Sur de Florida (FL), Texas (Dallas/Houston), Arizona (Phoenix), Georgia y NC",
    "buyBoxType": "Multifamily / Creative",
    "maxPrice": "Casas de $220,000 a $550,000 con hipoteca existente al 2.25% – 4.0%",
    "finderPayoutOffer": "💰 Paga $5,000 a $15,000 de Finder’s / Assignment Fee por trato Subject-To o Assumable cerrado",
    "dealRequirementMode": "both_accepted",
    "dealRequirementLabel": "🤝 Acepta AMBOS (Solo el Lead Calificado SIN Contrato O Contrato Subject-To Firmado)",
    "dealRequirementDetails": "1) SOLO ENCONTRAR LA PROPIEDAD Y CONFIRMAR INTERÉS (Sin Contrato): Como el papeleo de Subject-To (tomar los pagos de la hipoteca existente) requiere adendas legales específicas, puedes usar sus 5 filtros en Zillow (\"Assumable\" / casas compradas en 2020–2022), confirmar que el dueño acepta que le tomen su hipoteca al 2.8% y meter a Sam a la llamada para que él firme el contrato y te pague tu comisión.\n2) CON CONTRATO FIRMADO: Si ya firmaste el Addendum Subject-To, te lo compra o asigna.",
    "propertySpecsWanted": "• Casas Single-Family construidas del año 2000 en adelante, 3+ Beds, 2+ Baths, listas para habitar o con reparaciones cosméticas mínimas.\n• Deben tener una hipoteca FHA, VA o Convencional originada entre 2019 y 2022 con tasa de interés fija entre 2.25% y 4.0%.\n• Excelente para vendedores con poco equity o atrasados 2–5 meses en pagos (Arrears) donde un wholesaler tradicional en efectivo al 70% sería rechazado.",
    "priceAndArvRange": "• Valor de la propiedad: $220,000 a $550,000.\n• Entry Fee total (Atrasos del banco + efectivo al vendedor + costos de cierre) debe ser menor al 10%–12% del valor de la casa (ej. entrar con $18k–$30k en una casa de $340k).",
    "contactInfo": "IG DM: @ownwithsam",
    "sourceUrl": "https://www.instagram.com/ownwithsam/",
    "directContactChannels": {
      "socialDmUrl": "https://www.instagram.com/ownwithsam/",
      "communityUrl": "https://www.instagram.com/reel/DdHzKgsJEyZ/"
    },
    "readyPitchMessage": "Hey Sam! Using your 5 Zillow filters, I found a property in [Ciudad, Estado] with an existing [2.875%] mortgage (balance ~$[ Balance ], PITI $[Pago Mensual]/mo) and the seller is open to letting us take over payments (arrears ~$[Atrasos]). Want to jump on a call to lock up the Subject-To contract together?",
    "notes": "Extraído del Reel 5: muestra cómo encontrar en menos de 60 segundos en Zillow casas en Tampa con hipotecas al 2.875% cuando el banco cobra 7%.",
    "verified": true
  },
  {
    "id": "cb-creator-carsonbuysland",
    "name": "Carson & Wiener Bros (@carsonbuysland — Infill Land Flipping & Builders Dispo)",
    "companyOrGroup": "CarsonBuysLand & LandAtlas 8,855+ Builders Network (Reel 8)",
    "creatorHandle": "@carsonbuysland",
    "platform": "builder_database",
    "market": "Florida (Palm Bay, Lehigh Acres, Cape Coral, Ocala, North Port, Port Charlotte), NC, GA, TX y AR",
    "buyBoxType": "Land / Home Builder",
    "maxPrice": "$10,000 a $110,000 por lote baldío (Infill Lots)",
    "finderPayoutOffer": "💰 Paga 50/50 JV Split ($7,500 a $25,000+ por lote) o $1,500–$3,000 Bird Dog Fee por lead de terreno",
    "dealRequirementMode": "both_accepted",
    "dealRequirementLabel": "🤝 Acepta AMBOS (Contrato de Terreno Firmado O Lead Calificado de Dueño de Lote)",
    "dealRequirementDetails": "1) CON CONTRATO FIRMADO: Pones el lote bajo un \"Vacant Land Purchase Agreement\" de 1 página con 30 días de Feasibility Study Period y ellos lo venden en días a los constructores verificados de esa calle (como Waltco Construction) dividiendo 50/50.\n2) SIN CONTRATO FIRMADO: Si tienes un dueño de lote motivado al teléfono pero quieres confirmar cuánto paga exactamente el constructor local antes de firmar, su equipo valida el lote y lo cierra contigo.",
    "propertySpecsWanted": "• Lotes residenciales baldíos (Infill Lots de 0.15 a 2.0 acres) dentro de subdivisiones ya establecidas.\n• Requisitos obligatorios: Acceso por calle pavimentada, electricidad frente al lote, SIN humedales (No Wetlands en National Wetlands Inventory) y fuera de Flood Zone de alto riesgo.\n• Debe haber al menos 3 casas nuevas construidas en los últimos 12 meses en un radio de 0.5 millas.",
    "priceAndArvRange": "• Precio de contrato: 40% al 55% de lo que los constructores pagaron por lotes similares en los últimos 6 meses (ej. si los constructores compran lotes en $45,000 en Palm Bay FL, contratarlo entre $18,000 y $25,000).",
    "contactInfo": "IG DM: @carsonbuysland | Base de Constructores: landatlas.com",
    "sourceUrl": "https://www.instagram.com/carsonbuysland/",
    "directContactChannels": {
      "dealPortalUrl": "https://www.landatlas.com/",
      "socialDmUrl": "https://www.instagram.com/carsonbuysland/",
      "communityUrl": "https://www.instagram.com/reel/DcgiMy3OQov/"
    },
    "readyPitchMessage": "Hey Carson! I found an infill vacant lot in [Ciudad, Condado, Estado] ([Tamaño Acres] acres, dry/no wetlands, paved road, power at street, new builds on the same block). Owner is willing to sell at $[Precio] and builders are buying lots nearby at $[Valor Comps]. Let's JV on this!",
    "notes": "En el Reel 8 muestra en pantalla un lote en Palm Bay, FL y cómo extraer constructores como Derek Walter (Waltco Construction LLC) desde LandAtlas.com.",
    "verified": true
  },
  {
    "id": "cb-keyglee-jamil-pace-brent",
    "name": "Jamil Damji, Pace Morby & Brent Daniels (KeyGlee Dispo + Wholesale Hotline Live)",
    "companyOrGroup": "KeyGlee Nationwide Dispo & SubTo / AstroFlipping Squads",
    "creatorHandle": "@jamildamji / @pacemorby / @realbrentdaniels",
    "platform": "web_directory",
    "market": "Nacional (45+ Mercados: Phoenix AZ, Dallas/Houston/Austin TX, Tampa/Orlando/Miami FL, Atlanta GA, Charlotte NC, Las Vegas NV, OH, TN)",
    "buyBoxType": "Fix & Flip",
    "maxPrice": "Desde $75,000 hasta $1,500,000+ (Cash, SubTo y Multifamily)",
    "finderPayoutOffer": "💰 Paga 50/50 JV Split ($10,000 a $40,000+ por deal) o Bird Dog Fee ($1,500–$5,000) con Squad Closers",
    "dealRequirementMode": "both_accepted",
    "dealRequirementLabel": "🤝 Portal KeyGlee: Contrato Firmado | Grupo Wholesale Hotline: Acepta Lead Crudo SIN Contrato",
    "dealRequirementDetails": "Tienes dos vías directas:\n1) SI YA TIENES EL CONTRATO FIRMADO: Subes la propiedad directamente en https://keyglee.com/submit-a-wholesale-property/ y su red nacional de franquicias de Dispo asigna el trato a sus compradores institucionales y flippers 50/50.\n2) SI SOLO ENCONTRASTE LA PROPIEDAD / LEAD CRUDO (Sin Contrato): Publicas en el grupo oficial \"Wholesale Hotline Live\" diciendo: \"Tengo un vendedor motivado en [Ciudad] que quiere vender [Cash / SubTo], necesito un Closer para cerrarlo 50/50\" y un cerrador verificado llama al dueño y firma el contrato contigo.",
    "propertySpecsWanted": "• KeyGlee (Cash): Casas Single-Family, Townhomes y Multifamily con descuento para remodelar o alquilar.\n• Pace Morby (SubTo): Casas bonitas o recién remodeladas que no venden en Zillow o dueños con poco equity que acepten dejar su hipoteca existente (Subject-To) o financiar como banco (Seller Finance).",
    "priceAndArvRange": "• Cash Deals: Precio <= 72% del ARV menos reparaciones (ARV $150,000 a $900,000).\n• SubTo Deals: Cualquier precio siempre que el pago mensual PITI permita flujo de caja positivo como renta tradicional, PadSplit (renta por habitación) o Airbnb.",
    "contactInfo": "Portal Deals: keyglee.com/submit-a-wholesale-property/ | FB Group: Wholesale Hotline Live",
    "sourceUrl": "https://keyglee.com/submit-a-wholesale-property/",
    "directContactChannels": {
      "dealPortalUrl": "https://keyglee.com/submit-a-wholesale-property/",
      "socialDmUrl": "https://www.instagram.com/jamildamji/",
      "communityUrl": "https://www.facebook.com/groups/wholesalehotlinelive"
    },
    "readyPitchMessage": "Hey Team! Submitting an off-market deal in [Ciudad, Estado]. Property: [Beds/Baths/SqFt], Contract/Target Price: $[Precio], Conservative ARV: $[ARV], Repairs: $[Reparaciones]. Clear title & direct to seller. Looking to partner 50/50 on dispo!",
    "notes": "KeyGlee es la empresa de Dispo más grande de EE.UU. y el grupo Wholesale Hotline Live (Pace Morby + Jamil Damji + Brent Daniels) permite emparejarte con cerradores si aún no has firmado el contrato.",
    "verified": true
  },
  {
    "id": "cb-creator-maxclosesdeals",
    "name": "Max Rathbun (@maxclosesdeals — Tranchi AI / Tax Deed & Deep Equity Buyer)",
    "companyOrGroup": "Tranchi AI & High-Equity Tax Deed Acquisitions (Reel 4)",
    "creatorHandle": "@maxclosesdeals",
    "platform": "reel_buyer",
    "market": "Jacksonville, Atlantic Beach, Duval County y toda Florida, además de TX, GA y SC",
    "buyBoxType": "Fix & Flip",
    "maxPrice": "$60,000 a $400,000 (Propiedades con 40%–60% de descuento sobre valor de mercado)",
    "finderPayoutOffer": "💰 Paga 50/50 JV Split ($12,500 a $45,000+ por trato de alto margen)",
    "dealRequirementMode": "both_accepted",
    "dealRequirementLabel": "🤝 Acepta AMBOS (Contrato Firmado O Lead Crudo de Tax Deed con Subasta Próxima)",
    "dealRequirementDetails": "Si ya tienes el contrato firmado muy por debajo del valor de mercado (como el ejemplo del Reel 4 en Atlantic Beach FL contratada en $150k valiendo $360k), te lo mueve de inmediato con sus Cash Buyers. Si encontraste un dueño ausente (Out-of-State) cuya propiedad va a subasta de Tax Deed pronto y necesitas ayuda para cerrarlo y pagar los impuestos en la compañía de título, entran contigo 50/50.",
    "propertySpecsWanted": "• Propiedades 100% libres de hipoteca (Free & Clear / 100% Equity) pertenecientes a dueños ausentes (Absentee Owners que viven en otro estado) o herederos.\n• Propiedades en la lista de Tax Deed Sale del condado donde el dueño está a punto de perder el 100% de su propiedad por no pagar $5,000–$20,000 de impuestos.",
    "priceAndArvRange": "• Valor de mercado (ARV): $200,000 a $650,000.\n• Precio de adquisición objetivo: 40% al 60% del valor actual.",
    "contactInfo": "IG DM: @maxclosesdeals | Web: tranchi.com",
    "sourceUrl": "https://www.instagram.com/maxclosesdeals/",
    "directContactChannels": {
      "dealPortalUrl": "https://www.tranchi.com/",
      "socialDmUrl": "https://www.instagram.com/maxclosesdeals/",
      "communityUrl": "https://www.instagram.com/reel/DdYC81bsB7_/"
    },
    "readyPitchMessage": "Hey Max! I found a Free & Clear absentee-owner / tax-delinquent property in [Ciudad, FL] worth ~$[ARV] where the owner is open to selling around $[Precio]. Let me know if we can lock this up and JV 50/50!",
    "notes": "En el Reel 4 analiza 392 Ahern St, Atlantic Beach, FL (dueño ausente con 100% equity, valorada en $360,300 y contratada en $150,000).",
    "verified": true
  },
  {
    "id": "cb-creator-rowangill",
    "name": "Rowan Gill (@rowangill74 — County GIS Tax Foreclosure Buyer & Dispo)",
    "companyOrGroup": "Rowan Gill Tax Foreclosure Network (Reel 9)",
    "creatorHandle": "@rowangill74",
    "platform": "reel_buyer",
    "market": "Charlotte / Mecklenburg County (NC), Raleigh (NC), South Carolina, Georgia y Virginia",
    "buyBoxType": "Fix & Flip",
    "maxPrice": "$50,000 a $320,000 (Casas y Terrenos en Mapas GIS de Tax Foreclosure)",
    "finderPayoutOffer": "💰 Paga 50/50 JV Split ($10,000 a $30,000 por asignación)",
    "dealRequirementMode": "contract_signed",
    "dealRequirementLabel": "📄 Requiere Contrato Ya Firmado al ~60% con Cláusula de Asignación a Terceros",
    "dealRequirementDetails": "Su método (explicado paso a paso en el Reel 9) consiste en extraer propiedades del mapa GIS de \"Property Tax Foreclosures\" del condado, llamar al dueño, ofrecer el ~60% del valor Zillow y firmar un Purchase Agreement simple que incluya la cláusula para asignarlo a un tercero (\"assign it to a third party for a net gain\"). Una vez firmado, él aporta el comprador en efectivo en NC/SC/GA.",
    "propertySpecsWanted": "• Propiedades residenciales que aparezcan activas en el portal de Kania Law Firm / County Tax Foreclosures con $5,000 a $30,000+ en impuestos atrasados.\n• Casas Single-Family 3+ Beds o terrenos urbanos en zonas de alta demanda como Charlotte NC.",
    "priceAndArvRange": "• Oferta objetivo al vendedor: ~60% del valor estimado en Zillow / Comps (suficiente para liquidar los impuestos atrasados en el cierre y dejarle efectivo libre al dueño).",
    "contactInfo": "IG DM: @rowangill74",
    "sourceUrl": "https://www.instagram.com/rowangill74/",
    "directContactChannels": {
      "socialDmUrl": "https://www.instagram.com/rowangill74/",
      "communityUrl": "https://www.instagram.com/reel/DdRU-cxRRxC/"
    },
    "readyPitchMessage": "Hey Rowan! Following your County Tax Foreclosure GIS strategy, I locked up a tax-delinquent property in [Condado/Ciudad] at ~60% of value ($[Precio Contrato] vs $[ARV] value) with the third-party assignment clause. Ready to dispo this with your buyers!",
    "notes": "Extraído del Reel 9: muestra el mapa GIS de Mecklenburg County NC (2127407 / Kania Law Firm) y cómo revender el contrato en grupos de Facebook e inversionistas locales.",
    "verified": true
  },
  {
    "id": "cb-creator-olivia-schremmer",
    "name": "Olivia Schremmer (@olivia_schremmer — Virtual Pre-Foreclosure Buyer & JV)",
    "companyOrGroup": "Olivia Schremmer Virtual Wholesale Dispo (Reel 11)",
    "creatorHandle": "@olivia_schremmer",
    "platform": "reel_buyer",
    "market": "Texas (DFW, Houston, San Antonio) y Connecticut (West Haven, New Haven, Hartford, Bridgeport)",
    "buyBoxType": "Fix & Flip",
    "maxPrice": "$85,000 a $350,000",
    "finderPayoutOffer": "💰 Paga 50/50 JV Split (Asignaciones promedio de $15,000 a $21,000)",
    "dealRequirementMode": "both_accepted",
    "dealRequirementLabel": "🤝 Acepta AMBOS (Contrato Firmado O Lead Calificado en Pre-Foreclosure)",
    "dealRequirementDetails": "Si tienes el contrato firmado con el dueño en Pre-Foreclosure, ella conecta el trato con sus compradores verificados (que depositan $6,000 de Earnest Money Deposit no reembolsable y cubren los $500 de Transaction Coordinator). Si tienes al dueño motivado antes de la subasta pero necesitas ayuda para coordinar el Payoff y el contrato, hacen JV 50/50.",
    "propertySpecsWanted": "• Casas Single-Family en Pre-Foreclosure (con fecha de subasta activa en los próximos 15 a 60 días).\n• El dueño debe tener suficiente equity (la deuda total atrasada con el banco debe ser menor al 60% del ARV) y querer vender rápido para evitar que el Foreclosure destruya su reporte de crédito por 7 años.",
    "priceAndArvRange": "• ARV entre $180,000 y $420,000.\n• Margen de asignación objetivo: $15,000 a $25,000.",
    "contactInfo": "IG DM: @olivia_schremmer",
    "sourceUrl": "https://www.instagram.com/olivia_schremmer/",
    "directContactChannels": {
      "socialDmUrl": "https://www.instagram.com/olivia_schremmer/",
      "communityUrl": "https://www.instagram.com/reel/DdQIG2fCu-y/"
    },
    "readyPitchMessage": "Hey Olivia! I have a motivated Pre-Foreclosure seller in [Ciudad, Estado] with an upcoming auction date. Payoff is ~$[Deuda] and ARV is $[ARV]. Would love to partner with you to lock this up / dispo to your cash buyers!",
    "notes": "En el Reel 11 muestra su cheque de $21,000 cerrando de forma 100% virtual una casa en West Haven, CT desde su casa en Texas con $6,000 de EMD del comprador.",
    "verified": true
  },
  {
    "id": "cb-creator-troy-kearns",
    "name": "Troy Kearns (@troykearns — Bird Dog Finder Program & Driving for Dollars Buyer)",
    "companyOrGroup": "Troy Kearns / DealMachine Bird Dog & JV Network",
    "creatorHandle": "@troykearns",
    "platform": "reel_buyer",
    "market": "Colorado, Missouri, Kansas, Ohio, Indiana, Florida, Georgia y Tennessee",
    "buyBoxType": "Fix & Flip",
    "maxPrice": "Casas $50,000 a $300,000",
    "finderPayoutOffer": "💰 Paga $2,000 a $5,000 Bird Dog Fee (SOLO por encontrar la casa sin contrato) O 50/50 JV con Contrato",
    "dealRequirementMode": "lead_only_birddog",
    "dealRequirementLabel": "🔍 Acepta SOLO Encontrar la Propiedad / Bird Dog (Sin Contrato) O 50/50 con Contrato",
    "dealRequirementDetails": "Especialista en trabajar con \"Bird Dogs\" (buscadores de propiedades): si encuentras una propiedad abandonada o deteriorada (usando Google Street View, Driving for Dollars o listas del gobierno), sacas el teléfono del dueño y confirmas que quiere vender, puedes pasarle el lead SIN firmar contrato por un Finder’s Fee de $2,000–$5,000 al cerrar, o firmar tú el contrato e ir 50/50.",
    "propertySpecsWanted": "• Casas Single-Family y pequeños multifamiliares con señales físicas de abandono: lonas azules en el techo, pasto alto, ventanas tapiadas, correo acumulado, violaciones de código o dueños fallecidos (Pre-Probate).",
    "priceAndArvRange": "• Mercados de flujo de caja y flips de clase trabajadora: Compras entre $50,000 y $220,000 con ARV de $120,000 a $380,000.",
    "contactInfo": "Web: troykearns.com | IG DM: @troykearns",
    "sourceUrl": "https://troykearns.com/",
    "directContactChannels": {
      "dealPortalUrl": "https://troykearns.com/",
      "socialDmUrl": "https://www.instagram.com/troykearns/"
    },
    "readyPitchMessage": "Hey Troy! I found a vacant/distressed off-market property in [Ciudad, Estado] with high equity and confirmed the owner wants a cash offer. How can I submit this lead to your team as a Bird Dog / JV partner?",
    "notes": "Uno de los creadores más activos enseñando y pagando a Bird Dogs que solo encuentran la propiedad deteriorada sin necesidad de tener capital ni experiencia cerrando contratos.",
    "verified": true
  },
  {
    "id": "cb-creator-rjbates",
    "name": "RJ Bates III (@rjbatesiii — Titanium Investments Direct Cash Buyer & JV)",
    "companyOrGroup": "Titanium Investments LLC (50 Estados / Comprador Directo y Dispo)",
    "creatorHandle": "@rjbatesiii",
    "platform": "reel_buyer",
    "market": "Texas (DFW, Houston, San Antonio), Oklahoma (OKC, Tulsa), FL, GA, NC, TN, AZ y NV",
    "buyBoxType": "Fix & Flip",
    "maxPrice": "$60,000 a $450,000 (Cierra en 7 días con efectivo propio)",
    "finderPayoutOffer": "💰 Compra tu Contrato Directamente (Tú cobras el 100% de tu Assignment Fee) o 50/50 JV en mercados externos",
    "dealRequirementMode": "contract_signed",
    "dealRequirementLabel": "📄 Requiere Contrato Ya Firmado (Signed PSA Directo con el Vendedor)",
    "dealRequirementDetails": "Exige que tengas el contrato Purchase & Sale Agreement firmado directamente con el propietario. En sus mercados principales (TX, OK, FL, AZ) Titanium Investments actúa como el Comprador Final en Efectivo (por lo que cobras tu Assignment Fee completo sin dividirlo). En otros mercados hacen JV 50/50.",
    "propertySpecsWanted": "• Casas Single-Family 3+ Beds, 1.5+ Baths, >1,000 SqFt construidas después de 1950.\n• Requieren fotos interiores/exteriores y acceso mediante Lockbox o cita.",
    "priceAndArvRange": "• Precio <= (ARV × 70%) - Reparaciones.\n• ARV entre $140,000 y $550,000.",
    "contactInfo": "Web: titaniumu.com | IG DM: @rjbatesiii",
    "sourceUrl": "https://www.titaniumu.com/",
    "directContactChannels": {
      "dealPortalUrl": "https://www.titaniumu.com/",
      "socialDmUrl": "https://www.instagram.com/rjbatesiii/"
    },
    "readyPitchMessage": "Hey RJ! I have a direct-to-seller contract signed in [Ciudad, Estado] at $[Precio] (ARV $[ARV], Repairs ~$[Reparaciones], [Beds/Baths/SqFt]). Sending you the address and photos to see if Titanium wants to buy it direct or JV!",
    "notes": "Comprador real de alto volumen (famoso por retos de 50 deals en 50 estados) que compra directamente en efectivo o hace JV 50/50.",
    "verified": true
  },
  {
    "id": "cb-reddit-wholesalinghouses-hub",
    "name": "Reddit r/WholesalingHouses & r/WholesaleRealestate — Compradores Directos & Closers",
    "companyOrGroup": "Comunidades Oficiales de Reddit (Hilos \"[BUYING]\" y \"Bird Dog / JV\")",
    "creatorHandle": "r/WholesalingHouses & r/WholesaleRealestate",
    "platform": "reddit",
    "market": "Nacional (Mayor actividad en FL, TX, OH, MI, NC, GA, PA, IN, TN, AZ, MO)",
    "buyBoxType": "Fix & Flip",
    "maxPrice": "$35,000 a $500,000",
    "finderPayoutOffer": "💰 $1,500–$3,500 Bird Dog Fee (sin contrato) O 50/50 JV Split / 100% Assignment Fee (con contrato)",
    "dealRequirementMode": "both_accepted",
    "dealRequirementLabel": "🤝 Acepta AMBOS (Hilos para Leads sin Contrato + Hilos de End-Buyers con Contrato)",
    "dealRequirementDetails": "En Reddit tienes dos modalidades activas todos los días:\n1) SI NO TIENES CONTRATO FIRMADO (Solo el Lead): Publica \"[JV / Need Closer] Have a warm motivated seller in [City, State] asking $[X] on a $[ARV] house, need an experienced closer to lock up 50/50\" (nunca pongas la dirección exacta en público; pide que firmen JV Agreement por DM antes de dar el teléfono del dueño).\n2) SI YA TIENES CONTRATO FIRMADO: Publica \"[DEAL UNDER CONTRACT - City, State] 3/2 1,400 sqft, Asking $[X], ARV $[Y], EMD $5k at Title. DM Proof of Funds & Buy Box\".",
    "propertySpecsWanted": "• Single-Family Fix & Flip (3/2, >1,100 SqFt).\n• Propiedades de flujo de caja en el Midwest (Detroit, Cleveland, Indianapolis, Memphis, St. Louis) entre $40k y $110k para inversionistas fuera del estado.\n• Contratos Subject-To y lotes baldíos en FL/TX/NC.",
    "priceAndArvRange": "• Flips: 65%–70% del ARV menos reparaciones.\n• Rentals (Midwest): Regla del 1.2% al 1.5% (ej. casa de $75,000 que se alquila en $1,100/mes en Section 8).",
    "contactInfo": "Reddit: r/WholesalingHouses y r/WholesaleRealestate",
    "sourceUrl": "https://www.reddit.com/r/WholesalingHouses/",
    "directContactChannels": {
      "dealPortalUrl": "https://www.reddit.com/r/WholesalingHouses/",
      "socialDmUrl": "https://www.reddit.com/r/WholesaleRealestate/search/?q=%22buy+box%22+OR+%22cash+buyer%22&restrict_sr=1",
      "communityUrl": "https://www.reddit.com/r/realestateinvesting/"
    },
    "readyPitchMessage": "[DIRECT TO SELLER - CIUDAD, ESTADO] Locked up a 3/2 ([SqFt] sqft) off-market property at $[Precio] (ARV $[ARV], Rehab ~$[Reparaciones]). Clean title open at [Title Company]. Looking for an end-buyer with Proof of Funds who can close in 14 days. DM me your email and Buy Box!",
    "notes": "Regla de oro de Reddit: Nunca entregues la dirección exacta ni el teléfono del vendedor sin antes verificar Proof of Funds (si es Cash Buyer) o firmar un Joint Venture Agreement de 1 página (si es un socio que va a llamar al dueño).",
    "verified": true
  },
  {
    "id": "cb-waltco-builders",
    "name": "Derek Walter — Waltco Construction LLC & 8,855+ Constructores (LandAtlas)",
    "companyOrGroup": "LandAtlas Verified Platinum Home Builders (Reels 6, 8 y 10)",
    "creatorHandle": "LandAtlas Builders Network",
    "platform": "builder_database",
    "market": "Florida, Texas, Carolina del Norte, Georgia, Tennessee y Arkansas",
    "buyBoxType": "Land / Home Builder",
    "maxPrice": "$20,000 a $150,000 por lote (Compran de 1 a 10 lotes por mes)",
    "finderPayoutOffer": "💰 Pagan 100% de tu Assignment Fee ($10,000 a $30,000 por lote) como Compradores Finales",
    "dealRequirementMode": "both_accepted",
    "dealRequirementLabel": "🤝 Puedes Llamar al Constructor ANTES de Firmar Contrato para Confirmar su Precio Exacto",
    "dealRequirementDetails": "A diferencia de las casas tradicionales, con los constructores de terrenos (Home Builders) puedes aplicar la estrategia de \"Reverse Land Wholesaling\" de los Reels 6 y 8: llamas primero al constructor que ya está construyendo en ese código postal, le preguntas: \"¿Cuánto me pagas hoy en efectivo si te traigo un lote de 0.23 acres en esta misma cuadra?\", y una vez que el constructor te da su precio de compra garantizado (ej. $45,000), llamas al dueño del lote y le firmas el contrato en $25,000 para ganarte $20,000 seguros.",
    "propertySpecsWanted": "• Lotes residenciales secos (High & Dry / No Wetlands), limpios o con árboles ligeros, zonificación residencial unifamiliar, mínimo 50 pies de frente (Frontage) × 100 pies de fondo.",
    "priceAndArvRange": "• Los constructores pagan entre el 12% y el 18% del valor final de la casa nueva que van a construir (ej. si construyen casas nuevas de $320,000, pagan hasta $45,000–$55,000 por el lote).",
    "contactInfo": "Directorio: landatlas.com | Búsqueda de Permisos del Condado",
    "sourceUrl": "https://www.landatlas.com/",
    "directContactChannels": {
      "dealPortalUrl": "https://www.landatlas.com/",
      "socialDmUrl": "https://www.instagram.com/carsonbuysland/"
    },
    "readyPitchMessage": "Hi [Nombre del Constructor], I saw your new construction project in [Zip Code / Calle]. I’m a local land locator and have an off-market [Tamaño] acre buildable lot nearby (no wetlands, power at street) for $[Precio]. Are you actively buying more infill lots in [Zip Code] this month?",
    "notes": "Extraído por OCR del Reel 8 (@carsonbuysland): Derek Walter (Waltco Construction LLC) aparece como constructor Platinum comprando lotes activamente.",
    "verified": true
  },
  {
    "id": "cb-carbon-rei-network",
    "name": "Red Carbon REI (@im_just_gabe46 — 3,000+ Cash Buyers Verificados)",
    "companyOrGroup": "Carbon REI Dispo Portal (Detectado en Comentarios de tus Reels)",
    "creatorHandle": "@im_just_gabe46",
    "platform": "web_directory",
    "market": "Nacional (EE.UU. — 50 Estados)",
    "buyBoxType": "Fix & Flip",
    "maxPrice": "$50,000 a $600,000",
    "finderPayoutOffer": "💰 50/50 JV Split ($10,000 a $25,000 promedio por trato vendido a sus 3,000+ compradores)",
    "dealRequirementMode": "contract_signed",
    "dealRequirementLabel": "📄 Requiere Contrato Ya Firmado (Signed PSA)",
    "dealRequirementDetails": "Envías el contrato firmado y fotos de la propiedad; su plataforma empareja el trato con su base de más de 3,000 compradores en efectivo y fondos de inversión.",
    "propertySpecsWanted": "• Casas Single-Family para Fix & Flip y carteras de alquiler (BRRRR).\n• Lotes residenciales bajo contrato con margen demostrado.",
    "priceAndArvRange": "• Precio de contrato <= 70% del ARV menos reparaciones.",
    "contactInfo": "IG DM: @im_just_gabe46 | Web: carbonrei.com",
    "sourceUrl": "https://www.instagram.com/im_just_gabe46/",
    "directContactChannels": {
      "dealPortalUrl": "https://www.instagram.com/im_just_gabe46/",
      "socialDmUrl": "https://www.instagram.com/im_just_gabe46/"
    },
    "readyPitchMessage": "Hey Gabe! Saw your comment about Carbon REI's 3,000+ cash buyers network. I have an off-market property under contract in [Ciudad, Estado] at $[Precio] (ARV $[ARV]). How can I submit it to your dispo team for a 50/50 JV?",
    "notes": "Extraído de los comentarios del Reel 10 donde @im_just_gabe46 ofrece su red de 3,000+ compradores verificados para cerrar contratos en JV.",
    "verified": true
  },
  {
    "id": "cb-fb-real-estate-wholesalers-club",
    "name": "Grupos de Facebook de Cash Buyers & JV (\"Real Estate Wholesalers Club\" / \"Wholesaling Houses Full Time\")",
    "companyOrGroup": "Comunidades de Facebook con 100,000+ Inversionistas y Cash Buyers Activos",
    "creatorHandle": "Facebook Cash Buyers Groups",
    "platform": "facebook_group",
    "market": "Nacional y Grupos Locales por Ciudad (Tampa, Houston, Atlanta, Detroit, Charlotte, Cleveland, Phoenix)",
    "buyBoxType": "Fix & Flip",
    "maxPrice": "$30,000 a $750,000",
    "finderPayoutOffer": "💰 Cobras el 100% de tu Assignment Fee ($10,000–$30,000) si encuentras al comprador directo, o 50/50 JV",
    "dealRequirementMode": "both_accepted",
    "dealRequirementLabel": "🤝 Acepta AMBOS (Buscar Socio Closer para un Lead O Publicar Contrato Ya Firmado)",
    "dealRequirementDetails": "Estrategia de los Reels 1 y 9:\n1) Entras al grupo de Facebook de tu ciudad (ej. \"Tampa Real Estate Investors & Cash Buyers\").\n2) Usas la lupa del grupo y buscas \"Cash Buyer\", \"Send me deals\" o \"Just closed\" para ver quiénes son los compradores reales que están publicando sus cierres.\n3) Les escribes por Messenger preguntando su Buy Box ANTES de buscar la propiedad, o publicas tu Post Imán cuando ya tienes el contrato.",
    "propertySpecsWanted": "• Todo tipo de propiedades: Single-Family Flips, Section 8 Rentals, Multifamily 2–4 unidades, Terrenos y Contratos Subject-To.",
    "priceAndArvRange": "• Rango completo desde casas de $35,000 en Detroit/Ohio hasta flips de $500,000+ en Florida/Texas/California.",
    "contactInfo": "Facebook Groups Search Directo",
    "sourceUrl": "https://www.facebook.com/search/groups/?q=real%20estate%20investors%20cash%20buyers%20wholesale",
    "directContactChannels": {
      "dealPortalUrl": "https://www.facebook.com/groups/wholesalinghousesforreal",
      "socialDmUrl": "https://www.facebook.com/groups/wholesalehotlinelive",
      "communityUrl": "https://www.facebook.com/search/groups/?q=real%20estate%20investors%20cash%20buyers%20wholesale"
    },
    "readyPitchMessage": "🔥 OFF-MARKET DEAL AVAILABLE IN [CIUDAD, ESTADO] 🔥\n3 Beds / 2 Baths | Asking $[Precio] | ARV $[ARV] | Rehab ~$[Reparaciones]\nDirect to seller, clear title open. Serious Cash Buyers only — drop your EMAIL + BUY BOX in the comments or DM me \"DEAL\" for the address & photos!",
    "notes": "El canal #1 gratuito recomendado por FreeWholesaling.com, Richard Taylor y Rowan Gill para encontrar compradores en efectivo en menos de 24 horas.",
    "verified": true
  },
  {
    "id": "cb-creator-ryan-pineda",
    "name": "Ryan Pineda (@ryanpineda — Homerun Offer / Forever Capital / Wealthy Investor)",
    "companyOrGroup": "Forever Capital & Homerun Offer (Las Vegas & Nationwide)",
    "creatorHandle": "@ryanpineda",
    "platform": "reel_buyer",
    "market": "Las Vegas (NV), Phoenix (AZ), California, Texas, Florida, Atlanta (GA) y Midwest",
    "buyBoxType": "Fix & Flip",
    "maxPrice": "Casas $120,000 a $850,000 (Fix & Flip y carteras de alquiler)",
    "finderPayoutOffer": "💰 Paga 50/50 JV Split ($10,000 a $35,000+) o Compra Directa con Fondos Propios en Las Vegas",
    "dealRequirementMode": "both_accepted",
    "dealRequirementLabel": "🤝 Acepta AMBOS (Solo el Lead Calificado para su Equipo O Contrato PSA Firmado)",
    "dealRequirementDetails": "1) CON CONTRATO FIRMADO: Envías el PSA firmado con 14–21 días de inspección; su equipo de Homerun Offer / Forever Capital compra directamente en efectivo o lo mueve con sus inversionistas VIP dividiendo 50/50.\n2) SIN CONTRATO FIRMADO: Si tienes un vendedor motivado al teléfono pero necesitas a un cerrador experimentado para estructurar la oferta o una llamada de 3 vías, su equipo de adquisiciones entra contigo para cerrar y dividir.",
    "propertySpecsWanted": "• Casas Single-Family y Condos construidos después de 1970, 3+ Beds, 2+ Baths, para Fix & Flip o alquiler a largo plazo.\n• Propiedades con potencial de Airbnb / Medium-Term Rental (en mercados que permitan alquiler temporal).\n• Pequeños multifamiliares (Duplex, Triplex, Fourplex).",
    "priceAndArvRange": "• Fórmula: Precio <= (ARV × 70%) - Costo de Reparaciones.\n• ARV: $150,000 a $900,000.",
    "contactInfo": "Portal: ryanpineda.com | IG: @ryanpineda | Homerun Offer",
    "sourceUrl": "https://ryanpineda.com/",
    "directContactChannels": {
      "dealPortalUrl": "https://ryanpineda.com/",
      "socialDmUrl": "https://www.instagram.com/ryanpineda/",
      "communityUrl": "https://www.youtube.com/@RyanPineda"
    },
    "readyPitchMessage": "Hey Ryan & Team! I have an off-market deal in [Ciudad, Estado]. Property: [Beds/Baths/SqFt], Target/Contract Price: $[Precio], ARV: $[ARV], Rehab: $[Reparaciones]. Looking to partner up or see if Forever Capital wants to buy it direct!",
    "notes": "Ex-jugador profesional de béisbol y uno de los mayores flippers de Las Vegas con más de 500 casas remodeladas. Compra directamente o hace JV nacional.",
    "verified": true
  },
  {
    "id": "cb-creator-max-maxwell",
    "name": "Max Maxwell (@therealmaxwell — Wholesaling Elite & Cash Buyers Club)",
    "companyOrGroup": "Wholesaling Elite Network (North Carolina & Nationwide)",
    "creatorHandle": "@therealmaxwell",
    "platform": "reel_buyer",
    "market": "North Carolina (Greensboro, Winston-Salem, Charlotte, Raleigh, High Point) y Florida",
    "buyBoxType": "Fix & Flip",
    "maxPrice": "$45,000 a $380,000 (Casas Feas para Remodelación Completa)",
    "finderPayoutOffer": "💰 Paga 50/50 JV Split ($10,000 a $25,000 promedio) o Compra Directa en North Carolina",
    "dealRequirementMode": "contract_signed",
    "dealRequirementLabel": "📄 Requiere Contrato Ya Firmado (Signed PSA con Cláusula de Asignación)",
    "dealRequirementDetails": "Pide que ya tengas el contrato firmado directo con el propietario (con 14–30 días de Inspection Period). Cuenta con una de las listas de compradores en efectivo más consolidadas de las Carolinas y el Sureste para colocar contratos en menos de 5 días.",
    "propertySpecsWanted": "• Casas Single-Family 3+ Beds, 1+ Baths con alta necesidad de reparación cosmética o estructural (techos viejos, baños de época, pintura, cocina).\n• Excelente para herencias (Probate), dueños ausentes y embargos fiscales.",
    "priceAndArvRange": "• Margen: Compra al 65%–70% del ARV menos reparaciones.\n• ARV: $120,000 a $400,000.",
    "contactInfo": "IG: @therealmaxwell | Web: maxmaxwell.com",
    "sourceUrl": "https://www.instagram.com/therealmaxwell/",
    "directContactChannels": {
      "socialDmUrl": "https://www.instagram.com/therealmaxwell/",
      "communityUrl": "https://www.youtube.com/@MaxMaxwell"
    },
    "readyPitchMessage": "Hey Max! I locked up an off-market deal in [Ciudad, NC/Estado] at $[Precio] (ARV $[ARV], Rehab ~$[Reparaciones]). Contract is direct to seller with clear title. Ready to JV and dispo with your buyers!",
    "notes": "Pionero del wholesaling moderno en YouTube con cientos de transacciones documentadas en Carolina del Norte y Florida.",
    "verified": true
  },
  {
    "id": "cb-creator-alex-martinez",
    "name": "Alex Martinez (@alexmartinez — Real Estate Skills / Pro Wholesaler VIP Dispo)",
    "companyOrGroup": "Real Estate Skills Nationwide Network (50 Estados)",
    "creatorHandle": "@alexmartinez",
    "platform": "reel_buyer",
    "market": "Nacional (Todo EE.UU. — Mercados primarios y secundarios)",
    "buyBoxType": "Fix & Flip",
    "maxPrice": "$60,000 a $650,000 (Cash Flips, BRRRR y Pequeños Multifamiliares)",
    "finderPayoutOffer": "💰 Paga 50/50 JV Split ($12,000 a $30,000 por deal) con Red de Compradores VIP",
    "dealRequirementMode": "both_accepted",
    "dealRequirementLabel": "🤝 Acepta AMBOS (Asesoría para Cerrar el Lead O Dispo con Contrato Firmado)",
    "dealRequirementDetails": "1) CON CONTRATO FIRMADO: Pasan tu contrato a su red de graduados y fondos de inversión locales para asegurar el EMD en 48 horas.\n2) SIN CONTRATO FIRMADO: Su comunidad de \"Pro Wholesalers\" te ayuda a formular la oferta MAO y el guion para cerrar al vendedor si aún no has firmado.",
    "propertySpecsWanted": "• Single-Family Flips (3/2, >1,100 SqFt) y propiedades con potencial de renta BRRRR.\n• Duplex y Triplex con unidades vacías listas para aumentar renta.",
    "priceAndArvRange": "• Precio de compra <= (ARV × 70%) - Reparaciones.\n• ARV: $140,000 a $650,000.",
    "contactInfo": "Web: realestateskills.com | IG: @alexmartinez",
    "sourceUrl": "https://www.realestateskills.com/",
    "directContactChannels": {
      "dealPortalUrl": "https://www.realestateskills.com/",
      "socialDmUrl": "https://www.instagram.com/alexmartinez/"
    },
    "readyPitchMessage": "Hi Alex! Sourced an off-market property in [Ciudad, Estado] that fits your 70% ARV formula ($[Precio Contrato], ARV $[ARV], Repairs $[Reparaciones]). Would love to partner on dispo with your VIP buyers network!",
    "notes": "Fundador de RealEstateSkills.com, autor y operador enfocado en profesionalizar la asignación de contratos y co-wholesaling.",
    "verified": true
  },
  {
    "id": "cb-creator-austin-rutherford",
    "name": "Austin Rutherford (@austinrutherfordofficial — Elevate Capital / Ohio & FL Cash Buyer)",
    "companyOrGroup": "Elevate Real Estate Holdings (Columbus OH & Florida)",
    "creatorHandle": "@austinrutherfordofficial",
    "platform": "reel_buyer",
    "market": "Columbus, Cleveland, Cincinnati, Dayton (Ohio) y Florida (Tampa, Orlando, Miami, Jacksonville)",
    "buyBoxType": "Fix & Flip",
    "maxPrice": "$50,000 a $550,000 (Compra Directa con Fondos Propios)",
    "finderPayoutOffer": "💰 Paga $10,000 Finder’s Fee o 100% de tu Assignment Fee (como comprador final) O 50/50 JV",
    "dealRequirementMode": "both_accepted",
    "dealRequirementLabel": "🤝 Acepta AMBOS (Compra Directa en Ohio sin intermediarios O Contrato Asignable)",
    "dealRequirementDetails": "En Ohio actúa como Comprador Final en Efectivo (End-Buyer), lo que significa que puedes simplemente pasarle la propiedad para que su equipo la compre y tú cobres tu fee completo sin tener que buscar a nadie más. En otros estados hacen JV 50/50.",
    "propertySpecsWanted": "• Casas Single-Family y Multifamiliares (2–8 unidades) en Columbus OH y Florida para Fix & Flip o alquileres de alta rentabilidad (Airbnb / Short Term Rentals).\n• Propiedades con alto equity libre de hipoteca o herencias.",
    "priceAndArvRange": "• Ohio: Precios de compra entre $50,000 y $220,000.\n• Florida: Precios entre $120,000 y $450,000.",
    "contactInfo": "IG: @austinrutherfordofficial | Web: austinrutherford.com",
    "sourceUrl": "https://www.instagram.com/austinrutherfordofficial/",
    "directContactChannels": {
      "dealPortalUrl": "https://austinrutherford.com/",
      "socialDmUrl": "https://www.instagram.com/austinrutherfordofficial/"
    },
    "readyPitchMessage": "Hey Austin! I have an off-market deal in [Columbus OH / Florida] at $[Precio] (ARV $[ARV], Rehab $[Reparaciones], [Beds/Baths]). Sending photos to see if you want to buy it direct!",
    "notes": "Inversionista de alto volumen en Ohio que empezó a los 20 años y ha comprado más de 300 propiedades con fondos propios.",
    "verified": true
  },
  {
    "id": "cb-the-deal-club",
    "name": "The Deal Club (@thedealclub.io — Nationwide 50/50 JV Disposition Platform)",
    "companyOrGroup": "The Deal Club JV Network",
    "creatorHandle": "The Deal Club Dispo",
    "platform": "web_directory",
    "market": "Nacional (Todo EE.UU. — Especialmente Texas, Florida, Midwest y Sureste)",
    "buyBoxType": "Fix & Flip",
    "maxPrice": "Cualquier precio de $40,000 a $800,000 con margen comprobable",
    "finderPayoutOffer": "💰 50/50 JV Split (Sin costos iniciales — Solo cobran cuando el comprador deposita los fondos al cierre)",
    "dealRequirementMode": "contract_signed",
    "dealRequirementLabel": "📄 Requiere Contrato Ya Firmado (No-Exclusivo — Puedes seguir vendiéndolo tú mismo)",
    "dealRequirementDetails": "Sube tu contrato firmado con el vendedor en su portal; su equipo de Dispo lo envía a miles de compradores en efectivo verificados y coloca el EMD en la compañía de título. El acuerdo no es exclusivo, por lo que si tú encuentras un comprador primero, te quedas con el 100%.",
    "propertySpecsWanted": "• Casas Single-Family y pequeños multifamiliares bajo contrato con al menos 10 días restantes de Inspection Period.\n• Requieren fotos organizadas (enlace a Google Drive/Dropbox) y números de compra claros.",
    "priceAndArvRange": "• Precio de contrato con al menos $20,000 de margen bajo el 70% del ARV.",
    "contactInfo": "Portal: thedealclub.io",
    "sourceUrl": "https://thedealclub.io/",
    "directContactChannels": {
      "dealPortalUrl": "https://thedealclub.io/"
    },
    "readyPitchMessage": "Submitting a verified under-contract property in [Ciudad, Estado] for 50/50 JV dispo. Contract price: $[Precio], ARV: $[ARV], Estimated Rehab: $[Reparaciones], Inspection days left: [Días].",
    "notes": "Plataforma especializada en ayudar a wholesalers que tienen el contrato cerrado pero no tienen lista de compradores en esa ciudad.",
    "verified": true
  },
  {
    "id": "cb-dispobridge",
    "name": "DispoBridge (Done-For-You Wholesaling Dispositions & Cash Buyer Matching)",
    "companyOrGroup": "DispoBridge Network",
    "creatorHandle": "DispoBridge",
    "platform": "web_directory",
    "market": "Nacional (Sunbelt: TX, FL, GA, NC, TN, AZ y Midwest: OH, MI, IN, MO)",
    "buyBoxType": "Fix & Flip",
    "maxPrice": "$50,000 a $650,000",
    "finderPayoutOffer": "💰 50/50 JV Split en el Assignment Fee al cerrar (Cero tarifas por adelantado)",
    "dealRequirementMode": "contract_signed",
    "dealRequirementLabel": "📄 Requiere Contrato Ya Firmado con el Dueño",
    "dealRequirementDetails": "Envías tu contrato firmado con el vendedor. DispoBridge redacta el paquete de marketing, hace el envío masivo por SMS y correo a compradores locales de ese código postal y gestiona el contrato de asignación con el comprador final.",
    "propertySpecsWanted": "• Propiedades residenciales unifamiliares con título limpio o saneable en compañía de título inversionista.",
    "priceAndArvRange": "• Margen mínimo de $15,000 de Assignment Fee.",
    "contactInfo": "Web: dispobridge.com",
    "sourceUrl": "https://dispobridge.com/",
    "directContactChannels": {
      "dealPortalUrl": "https://dispobridge.com/"
    },
    "readyPitchMessage": "Hello DispoBridge team! I have an under-contract wholesale property in [Zip Code / Ciudad] ready for disposition. Asking Assignment: $[Fee], Purchase Price: $[Precio], ARV: $[ARV].",
    "notes": "Servicio de Dispo llave en mano para acelerar la venta de contratos antes de que venza el período de inspección.",
    "verified": true
  },
  {
    "id": "cb-aggreigator-dispo",
    "name": "AggREIgator (AI Cash Buyer Matching & 50/50 to 70/30 JV Engine)",
    "companyOrGroup": "AggREIgator Dispo Software",
    "creatorHandle": "AggREIgator",
    "platform": "web_directory",
    "market": "Nacional (50 Estados)",
    "buyBoxType": "Fix & Flip",
    "maxPrice": "$40,000 a $900,000",
    "finderPayoutOffer": "💰 50/50 a 70/30 JV Split (70% para ti según el volumen de contratos que envíes)",
    "dealRequirementMode": "contract_signed",
    "dealRequirementLabel": "📄 Requiere Contrato Ya Firmado",
    "dealRequirementDetails": "Plataforma que empareja automáticamente las especificaciones de tu contrato (Zip Code, precio, ARV, condición) con los criterios de compra de fondos y compradores institucionales.",
    "propertySpecsWanted": "• Single-Family Flips, BRRRR rentals y lotes bajo contrato.",
    "priceAndArvRange": "• Fórmulas de inversión estándar (70% ARV menos reparaciones).",
    "contactInfo": "Portal: aggreigator.com",
    "sourceUrl": "https://aggreigator.com/",
    "directContactChannels": {
      "dealPortalUrl": "https://aggreigator.com/"
    },
    "readyPitchMessage": "Submitting new wholesale contract to AggREIgator engine in [Ciudad, Estado]. Property: [Beds/Baths], Price: $[Precio], ARV: $[ARV].",
    "notes": "Excelente herramienta tecnológica para encontrar compradores institucionales y flippers verificados por código postal.",
    "verified": true
  },
  {
    "id": "cb-creator-ron-dan-apke",
    "name": "Ron Apke & Dan Apke (@landinvestingonline — Land Investing Online / Deal Funding & 100% Capital JV)",
    "companyOrGroup": "Land Investing Online (LIO) Deal Funding Partner",
    "creatorHandle": "@landinvestingonline",
    "platform": "builder_database",
    "market": "Texas, Florida, North Carolina, Tennessee, Arkansas, Arizona, Georgia, Ohio y Colorado",
    "buyBoxType": "Land / Home Builder",
    "maxPrice": "Terrenos de $15,000 a $400,000 (Ellos aportan el 100% del dinero de compra)",
    "finderPayoutOffer": "💰 30% a 50% de las Ganancias Netas ($8,000 a $40,000+ por lote) — ELLOS PONEN EL 100% DEL EFECTIVO",
    "dealRequirementMode": "both_accepted",
    "dealRequirementLabel": "🤝 Acepta AMBOS (Solo Encontrar el Lote a Descuento O Contrato Firmado — Ellos ponen el dinero)",
    "dealRequirementDetails": "1) SOLO ENCONTRAR EL TERRENO A DESCUENTO: Uno de los mejores programas de financiamiento conjunto (Deal Funding). Si encuentras un terreno baldío de 1 a 40 acres donde el dueño acepta vender al 35%–45% del valor de mercado, tú NO necesitas tener dinero en el banco: los hermanos Apke revisan el lote, ponen el 100% del efectivo para comprarlo en la compañía de título, lo revenden en el mercado y te transfieren el 30% al 50% de la ganancia neta.\n2) CON CONTRATO FIRMADO: Lo fondean de inmediato.",
    "propertySpecsWanted": "• Terrenos baldíos (Rural, Semi-rural o Subdivisible) de 1 a 50 acres.\n• Requisitos: Acceso legal por servidumbre o calle pública (Legal & Physical Access), terreno mayoritariamente seco (fuera de humedales/floodway), zonificación sin restricciones severas.",
    "priceAndArvRange": "• Debes asegurar el terreno al 35% al 45% del valor comparativo de reventa en efectivo (ej. si el terreno vale $80,000, acordarlo con el dueño entre $28,000 y $36,000).",
    "contactInfo": "Web: landinvestingonline.com | YouTube: Land Investing Online",
    "sourceUrl": "https://landinvestingonline.com/",
    "directContactChannels": {
      "dealPortalUrl": "https://landinvestingonline.com/",
      "socialDmUrl": "https://www.youtube.com/@landinvestingonline"
    },
    "readyPitchMessage": "Hey Ron & Dan! I found a high-equity vacant land deal in [Condado, Estado]. [Acres] acres with legal road access and power nearby. Owner agrees to sell at $[Precio] and market resale value is ~$[ARV]. Submitting for Deal Funding / JV!",
    "notes": "Líderes reconocidos en Land Flipping con un fondo propio de Deal Funding para cerrar terrenos sin que el buscador use su propio dinero.",
    "verified": true
  },
  {
    "id": "cb-creator-sumner-healey",
    "name": "Sumner Healey (@sumnerhealey — Land Pioneer / The Land Loaner JV Funding)",
    "companyOrGroup": "The Land Pioneer & Land Funding Network",
    "creatorHandle": "@sumnerhealey",
    "platform": "builder_database",
    "market": "Suroeste y Sureste (Arizona, Nevada, Nuevo México, Texas, Florida, Georgia, Carolina del Norte)",
    "buyBoxType": "Land / Home Builder",
    "maxPrice": "Terrenos $10,000 a $250,000",
    "finderPayoutOffer": "💰 40/60 a 50/50 Split en Ganancias Netas (Aportan el 100% del Capital de Cierre)",
    "dealRequirementMode": "both_accepted",
    "dealRequirementLabel": "🤝 Acepta AMBOS (Lead de Terreno Pre-Acordado O Contrato Firmado)",
    "dealRequirementDetails": "Si negocias un lote o parcela rural a un precio muy por debajo del mercado, Sumner Healey y su red de inversionistas de terrenos financian la compra, cubren los gastos de título y comercializan el terreno para dividir las ganancias.",
    "propertySpecsWanted": "• Terrenos de 0.5 a 20 acres con demanda para casas manufacturadas, cabañas o recreación.\n• Acceso para vehículos (Dirt Road o Paved Road) y topografía aprovechable.",
    "priceAndArvRange": "• Compra al 40%–50% del valor de mercado.",
    "contactInfo": "IG: @sumnerhealey | Web: thelandpioneer.com",
    "sourceUrl": "https://www.instagram.com/sumnerhealey/",
    "directContactChannels": {
      "dealPortalUrl": "https://thelandpioneer.com/",
      "socialDmUrl": "https://www.instagram.com/sumnerhealey/"
    },
    "readyPitchMessage": "Hi Sumner! Sourced a discounted land deal in [Condado, Estado]. [Acres] acres with road access. Purchase price: $[Precio], Comp value: $[Valor]. Looking to partner on JV funding!",
    "notes": "Especialista en terrenos rurales y suburbanos; financia adquisiciones completas para deal finders.",
    "verified": true
  },
  {
    "id": "cb-creator-daniel-martinez",
    "name": "Daniel Martinez & Leon Barnes (@hivemindcrm — Hivemind Capital & Land Network)",
    "companyOrGroup": "Hivemind Capital (Texas & Southeast Land / House Buyers)",
    "creatorHandle": "@hivemindcrm",
    "platform": "builder_database",
    "market": "Texas (San Antonio, Austin, Houston, DFW, Bexar County) y mercados del sur",
    "buyBoxType": "Land / Home Builder",
    "maxPrice": "$15,000 a $300,000 (Lotes y Casas Feas)",
    "finderPayoutOffer": "💰 $2,500 a $5,000 Finder’s Fee plano O 50/50 JV Split",
    "dealRequirementMode": "both_accepted",
    "dealRequirementLabel": "🤝 Acepta AMBOS (Leads Crudos de Propietarios de Terrenos O Contratos Firmados)",
    "dealRequirementDetails": "Tienen compradores activos de lotes Infill y casas en San Antonio y Houston. Si tienes un propietario de terreno o casa que quiere vender pero necesitas ayuda para hacer el Skip Tracing o cerrar la oferta, su equipo colabora contigo.",
    "propertySpecsWanted": "• Lotes residenciales baldíos en San Antonio / Houston y casas pequeñas para remodelar.",
    "priceAndArvRange": "• Descuentos agresivos al 50%–60% del valor tasado.",
    "contactInfo": "IG: @hivemindcrm | Web: hivemindcrm.io",
    "sourceUrl": "https://www.instagram.com/hivemindcrm/",
    "directContactChannels": {
      "dealPortalUrl": "https://hivemindcrm.io/",
      "socialDmUrl": "https://www.instagram.com/hivemindcrm/"
    },
    "readyPitchMessage": "Hey Daniel & Leon! I have an off-market lot/house in [San Antonio / Texas] at $[Precio] (ARV $[ARV]). Would love to submit this for a JV or direct purchase!",
    "notes": "Comunidad activa de inversionistas en Texas que combinan software, terrenos y wholesaling tradicional.",
    "verified": true
  },
  {
    "id": "cb-creator-king-khanh",
    "name": "Khanh Nguyen (@kingkhanh — Houston & Dallas Direct Cash Buyer & Flipper)",
    "companyOrGroup": "King Khanh Real Estate Investments (Texas)",
    "creatorHandle": "@kingkhanh",
    "platform": "reel_buyer",
    "market": "Texas (Houston, Harris County, Fort Bend, DFW, San Antonio)",
    "buyBoxType": "Fix & Flip",
    "maxPrice": "$40,000 a $280,000 (Casas Baratas y Propiedades con Daño Severo)",
    "finderPayoutOffer": "💰 Compra Directamente con su Efectivo (Cobras el 100% de tu Assignment Fee sin intermediarios)",
    "dealRequirementMode": "contract_signed",
    "dealRequirementLabel": "📄 Requiere Contrato Ya Firmado Directo con el Propietario",
    "dealRequirementDetails": "Inversionista de alto volumen en Houston que compra casas con daños graves por agua, incendios, problemas de cimientos o inundaciones. Como es el comprador final en efectivo, te paga tu Assignment Fee completo al cerrar en la compañía de título.",
    "propertySpecsWanted": "• Casas Single-Family de 1 y 2 pisos en Houston y alrededores, construidas entre 1960 y 2005.\n• Acepta casas con daño severo por inundación o fundaciones dañadas.",
    "priceAndArvRange": "• Precios de compra entre $40,000 y $160,000 con ARV de $120,000 a $300,000.",
    "contactInfo": "IG: @kingkhanh",
    "sourceUrl": "https://www.instagram.com/kingkhanh/",
    "directContactChannels": {
      "socialDmUrl": "https://www.instagram.com/kingkhanh/"
    },
    "readyPitchMessage": "Hey Khanh! I have an ugly off-market house under contract in Houston/Texas ([Dirección/Área]) at $[Precio]. ARV is $[ARV] and needs ~$[Reparaciones] in rehab. Sending photos to see if you want to buy it cash!",
    "notes": "Conocido por comprar casas en efectivo en Texas sin contingencias de financiamiento bancario.",
    "verified": true
  },
  {
    "id": "cb-creator-chris-haskins",
    "name": "Chris Haskins (@chris.haskins.real.estate — With The Right Property Group / Virginia)",
    "companyOrGroup": "With The Right Property Group (Virginia & North Carolina)",
    "creatorHandle": "@chris.haskins.real.estate",
    "platform": "reel_buyer",
    "market": "Virginia (Richmond, Norfolk, Virginia Beach, Newport News, Chesapeake, Portsmouth) y NC",
    "buyBoxType": "Fix & Flip",
    "maxPrice": "$50,000 a $350,000",
    "finderPayoutOffer": "💰 Paga $3,000 a $10,000 Finder’s Fee o 50/50 JV en Herencias y Subject-To",
    "dealRequirementMode": "both_accepted",
    "dealRequirementLabel": "🤝 Acepta AMBOS (Leads de Herencias/Probate sin Contrato O Contrato PSA)",
    "dealRequirementDetails": "Aparece en los Reels analizados en tu dashboard: enseña cómo comprar casas heredadas sin testamento (Heirs Property) y cómo hacer Subject-To. Si encuentras una familia que heredó una casa y necesita arreglar el título, él te guía para estructurar el trato y te paga tu comisión.",
    "propertySpecsWanted": "• Casas heredadas (Probate / Heirs Property) donde el dueño falleció y los herederos necesitan vender rápido en efectivo.\n• Casas con hipotecas existentes para estructurar Subject-To.",
    "priceAndArvRange": "• Compras al 60%–70% del valor de mercado.",
    "contactInfo": "IG: @chris.haskins.real.estate | YouTube: Chris Haskins",
    "sourceUrl": "https://www.instagram.com/chris.haskins.real.estate/",
    "directContactChannels": {
      "socialDmUrl": "https://www.instagram.com/chris.haskins.real.estate/",
      "communityUrl": "https://www.youtube.com/@ChrisHaskins"
    },
    "readyPitchMessage": "Hey Chris! Sourced an inherited / probate property in Virginia ([Ciudad]) with clear motivation. Would love to partner with you to structure the title and buy/assign it!",
    "notes": "Creador destacado en Virginia con más de 15 años cerrando tratos de Probate, Subject-To y Wholesaling.",
    "verified": true
  },
  {
    "id": "cb-creator-cameron-builds",
    "name": "Cameron Builds (@cameron.builds — Florida Custom Home Builder & Infill Lot Buyer)",
    "companyOrGroup": "Cameron Custom Home Builders (Florida)",
    "creatorHandle": "@cameron.builds",
    "platform": "builder_database",
    "market": "Florida (Orlando, Tampa, Lakeland, Brevard County, Volusia County, Polk County)",
    "buyBoxType": "Land / Home Builder",
    "maxPrice": "$25,000 a $130,000 por lote residencial",
    "finderPayoutOffer": "💰 Paga 100% de tu Assignment Fee ($10,000 a $25,000 por lote) como Comprador Final",
    "dealRequirementMode": "both_accepted",
    "dealRequirementLabel": "🤝 Puedes Llamar ANTES de Firmar el Lote para Confirmar su Precio de Compra",
    "dealRequirementDetails": "Constructor activo de casas nuevas en Florida. Puedes contactarlo antes de firmar con el dueño del lote para preguntarle qué dimensiones y precios busca en ese código postal específico, garantizando tu margen antes de firmar el contrato.",
    "propertySpecsWanted": "• Lotes residenciales baldíos (0.18 a 0.5 acres) listos para construir casas de 1,600 a 2,400 SqFt.\n• Zonificación R-1, sin humedales, con servicios públicos disponibles (agua y electricidad).",
    "priceAndArvRange": "• Compra lotes entre $25,000 y $110,000 para construir casas nuevas de $300,000 a $450,000.",
    "contactInfo": "IG: @cameron.builds",
    "sourceUrl": "https://www.instagram.com/cameron.builds/",
    "directContactChannels": {
      "socialDmUrl": "https://www.instagram.com/cameron.builds/"
    },
    "readyPitchMessage": "Hi Cameron! I'm an infill land locator in Central Florida. I have a buildable residential lot in [Ciudad/Zip Code] ([Dimensiones], power/water, no wetlands) for $[Precio]. Are you looking for more lots in this area this month?",
    "notes": "Constructor de casas en Florida que compra lotes directamente a deal finders y wholesalers.",
    "verified": true
  },
  {
    "id": "cb-creator-brandon-mulrenin",
    "name": "Brandon Mulrenin (@brandon.mulrenin — Reverse Wholesaling & Agent Outreach Network)",
    "companyOrGroup": "Reverse Wholesaling Network (Midwest & Nationwide)",
    "creatorHandle": "@brandon.mulrenin",
    "platform": "reel_buyer",
    "market": "Michigan (Detroit metro, Grand Rapids), Midwest y red nacional de agentes inversionistas",
    "buyBoxType": "Section 8 Rental",
    "maxPrice": "$50,000 a $300,000",
    "finderPayoutOffer": "💰 50/50 JV Split ($10,000 a $20,000) trabajando tratos en MLS con Realtors",
    "dealRequirementMode": "both_accepted",
    "dealRequirementLabel": "🤝 Acepta Propiedades del MLS con Agentes Inmobiliarios O Contratos Firmados",
    "dealRequirementDetails": "Especialista en conectar con agentes inmobiliarios que tienen casas vencidas o con muchos días en el MLS para hacer ofertas en efectivo por debajo del precio de lista.",
    "propertySpecsWanted": "• Casas con 60+ días en el mercado MLS donde el vendedor esté frustrado y acepte una oferta en efectivo sin contingencias.",
    "priceAndArvRange": "• Ofertas al 65%–72% del precio de lista.",
    "contactInfo": "IG: @brandon.mulrenin | YouTube: Brandon Mulrenin",
    "sourceUrl": "https://www.instagram.com/brandon.mulrenin/",
    "directContactChannels": {
      "socialDmUrl": "https://www.instagram.com/brandon.mulrenin/",
      "communityUrl": "https://www.youtube.com/@BrandonMulrenin"
    },
    "readyPitchMessage": "Hey Brandon! Found an on-market MLS property with 90+ days on market in [Ciudad] where the agent confirmed the seller is desperate for a cash closing. Numbers work at $[Precio] against $[ARV] ARV. Let's partner up!",
    "notes": "Experto en Reverse Wholesaling y llamadas a agentes de bienes raíces para asegurar tratos con cero costo de marketing.",
    "verified": true
  },
  {
    "id": "cb-investorlift-portal",
    "name": "InvestorLift Deal Board (4.8M+ Institutional Buyers & VIP Cash Flippers)",
    "companyOrGroup": "InvestorLift Enterprise Dispo Marketplace",
    "creatorHandle": "InvestorLift Network",
    "platform": "web_directory",
    "market": "Nacional (Todos los 50 estados y más de 3,000 condados de EE.UU.)",
    "buyBoxType": "Fix & Flip",
    "maxPrice": "Cualquier precio ($30,000 a $2,500,000+)",
    "finderPayoutOffer": "💰 Tú Cobras el 100% de tu Assignment Fee (Subastas y ofertas directas de compradores con fondos verificados)",
    "dealRequirementMode": "contract_signed",
    "dealRequirementLabel": "📄 Requiere Contrato Ya Firmado (Signed PSA con EMD)",
    "dealRequirementDetails": "El marketplace de Dispo más grande del mundo donde operan los mayores fondos de inversión (Hedge Funds), compradores institucionales y flippers VIP. Publicas tu contrato y los compradores pujan directamente.",
    "propertySpecsWanted": "• Casas Single-Family, Multifamiliares, Terrenos y Carteras de propiedades en cualquier condición.",
    "priceAndArvRange": "• Desde propiedades de $30,000 en el Midwest hasta mansiones de lujo para remodelar.",
    "contactInfo": "Portal: investorlift.com",
    "sourceUrl": "https://investorlift.com/",
    "directContactChannels": {
      "dealPortalUrl": "https://investorlift.com/"
    },
    "readyPitchMessage": "Listing under-contract property on InvestorLift: [Dirección], Asking: $[Precio Asignación], ARV: $[ARV], Rehab: $[Reparaciones]. Proof of Funds required for walkthrough.",
    "notes": "La herramienta que usan las empresas de wholesaling más grandes de EE.UU. para vender contratos en 24 a 48 horas.",
    "verified": true
  },
  {
    "id": "cb-connected-investors-pin",
    "name": "Connected Investors PiN Network (Plataforma Directa de Private Lenders & Cash Buyers)",
    "companyOrGroup": "Connected Investors Network",
    "creatorHandle": "Connected Investors",
    "platform": "web_directory",
    "market": "Nacional (EE.UU. — Clasificado por código postal)",
    "buyBoxType": "Fix & Flip",
    "maxPrice": "$40,000 a $1,000,000+",
    "finderPayoutOffer": "💰 Tú Cobras el 100% de tu Assignment Fee directamente del Comprador Final",
    "dealRequirementMode": "both_accepted",
    "dealRequirementLabel": "🤝 Puedes Contactar Compradores ANTES de Buscar para Obtener su Buy Box Exacto",
    "dealRequirementDetails": "Te permite buscar en su mapa quiénes son los compradores en efectivo y prestamistas privados de tu código postal para llamarlos o enviarles mensaje antes de firmar con el dueño, aplicando \"Reverse Wholesaling\".",
    "propertySpecsWanted": "• Flips residenciales, propiedades de alquiler Section 8 y terrenos comerciales/residenciales.",
    "priceAndArvRange": "• Rango de compra del 65% al 75% del ARV.",
    "contactInfo": "Web: connectedinvestors.com",
    "sourceUrl": "https://connectedinvestors.com/",
    "directContactChannels": {
      "dealPortalUrl": "https://connectedinvestors.com/"
    },
    "readyPitchMessage": "Hello! I'm a local property locator in [Zip Code]. I have off-market inventory coming up that fits your criteria. What is your current target price point and preferred property type?",
    "notes": "Red social de más de 1 millón de inversionistas inmobiliarios para conectar directamente con compradores sin intermediarios.",
    "verified": true
  },
  {
    "id": "cb-biggerpockets-marketplace",
    "name": "BiggerPockets Marketplace & JV Forums (Foro Oficial de Co-Wholesaling & Cash Buyers)",
    "companyOrGroup": "BiggerPockets Investor Community (2M+ Miembros)",
    "creatorHandle": "BiggerPockets Forums",
    "platform": "biggerpockets",
    "market": "Nacional y Foros Estatales por Ciudad (Tampa, Houston, Dallas, Atlanta, Detroit, Charlotte, etc.)",
    "buyBoxType": "Fix & Flip",
    "maxPrice": "$30,000 a $1,200,000+",
    "finderPayoutOffer": "💰 50/50 JV Split o 100% de tu Assignment Fee con Inversionistas Acreditados",
    "dealRequirementMode": "both_accepted",
    "dealRequirementLabel": "🤝 Acepta AMBOS (Foros de Networking para Pedir Buy Box O Publicar Contrato en Marketplace)",
    "dealRequirementDetails": "La comunidad inmobiliaria más respetada de EE.UU.: puedes publicar en el foro de tu ciudad (\"Looking for active cash buyers in [City] — what are you buying?\") para crear tu lista antes de buscar deals, o publicar en el Marketplace cuando ya tienes el contrato firmado.",
    "propertySpecsWanted": "• Flips tradicionales, carteras de alquiler a largo plazo (Buy & Hold) y multifamiliares de 2 a 20 unidades.",
    "priceAndArvRange": "• Descuentos basados en retorno de inversión (Cash on Cash Return > 10% o márgenes de flip > $30k).",
    "contactInfo": "Portal: biggerpockets.com/forums/93",
    "sourceUrl": "https://www.biggerpockets.com/forums/93",
    "directContactChannels": {
      "dealPortalUrl": "https://www.biggerpockets.com/marketplace",
      "communityUrl": "https://www.biggerpockets.com/forums/93"
    },
    "readyPitchMessage": "[OFF-MARKET CONTRACT IN CIUDAD, ESTADO] 3/2 single family under contract at $[Precio], ARV $[ARV], rehab ~$[Reparaciones]. Looking for a vetted cash buyer who can close in 14 days. DM me for HUD comps & inspection details!",
    "notes": "Excelente para encontrar compradores con capital real que no son revendedores ni intermediarios.",
    "verified": true
  },
  {
    "id": "cb-discord-freewholesaling-subto",
    "name": "Discord & Skool Communities (FreeWholesaling & SubTo Student Deal Pitch Channels)",
    "companyOrGroup": "Comunidades Privadas de Alumnos Avanzados de Wholesaling y Creative Finance",
    "creatorHandle": "Discord & Skool Wholesalers",
    "platform": "web_directory",
    "market": "Nacional (EE.UU. — Canales organizados por estado: #florida-deals, #texas-deals, #midwest)",
    "buyBoxType": "Multifamily / Creative",
    "maxPrice": "$20,000 a $800,000 (Cash, Subject-To, Seller Finance y Terrenos)",
    "finderPayoutOffer": "💰 50/50 JV Split ($8,000 a $25,000 por trato) o $1,500–$3,000 Finder’s Fee con Closers",
    "dealRequirementMode": "both_accepted",
    "dealRequirementLabel": "🤝 Canales \"#need-a-closer\" (Sin Contrato) y \"#deal-pitch\" (Con Contrato Firmado)",
    "dealRequirementDetails": "Dentro de los Discord y Skool de FreeWholesaling, SubTo y AstroFlipping hay canales específicos:\n1) #need-a-closer: Si tienes un vendedor motivado pero no sabes qué decirle o cómo redactar el contrato, un estudiante avanzado entra a la llamada contigo para cerrarlo 50/50.\n2) #deal-pitch: Si ya tienes el contrato firmado, lo publicas y docenas de inversionistas con fondos listos compran la asignación.",
    "propertySpecsWanted": "• Propiedades creativas (Subject-To con tasas < 4%), contratos en efectivo al 60%–70% y lotes baldíos.",
    "priceAndArvRange": "• Todo rango de precios.",
    "contactInfo": "Discord & Skool Communities",
    "sourceUrl": "https://www.flipwithrick.com/",
    "directContactChannels": {
      "communityUrl": "https://www.facebook.com/groups/wholesalinghousesforreal",
      "dealPortalUrl": "https://www.flipwithrick.com/"
    },
    "readyPitchMessage": "Hey everyone! In [Ciudad, Estado] with a [Cash / Subject-To] deal: [Detalles de la propiedad], Contract: $[Precio], ARV: $[ARV]. Looking for a JV partner / end buyer in this market. DM me!",
    "notes": "El mejor entorno colaborativo para principiantes: puedes asociarte con personas que ya tienen compradores listos en tu ciudad.",
    "verified": true
  }
];

export const INITIAL_SELLER_LEADS: MotivatedSellerLead[] = [
  {
    id: 'lead-charlotte-tax',
    ownerName: 'Propietario de 4920 Kistler Ave (Parcel 16102628)',
    propertyAddress: '4920 Kistler Ave',
    cityState: 'Charlotte, NC 28205 (Mecklenburg County)',
    phone: '(704) 555-0192',
    email: 'owner.kistler4920@example.com',
    leadSource: 'Tax Foreclosure GIS',
    estimatedArv: 362500,
    taxOrMortgageArrears: 21204,
    askingOrAssessedPrice: 364400,
    recommendedMaoOffer: 225000,
    lowball60Offer: 217500,
    status: 'new',
    assignedBuyerName: 'Charlotte Fix & Flip Cash Buyer Group',
    assignmentFeeProjected: 20000,
  },
  {
    id: 'lead-atlantic-beach-taxdeed',
    ownerName: 'Propietario Ausente de 1157 Panuco Ave N (Case 16-2023-CA)',
    propertyAddress: '1157 Panuco Ave N',
    cityState: 'Atlantic Beach, FL 32233 (Duval County)',
    phone: '(904) 555-0148',
    email: 'owner.panuco1157@example.com',
    leadSource: 'Pre-Foreclosure Auction',
    estimatedArv: 360727,
    taxOrMortgageArrears: 20309,
    askingOrAssessedPrice: 360727,
    recommendedMaoOffer: 150000,
    lowball60Offer: 135000,
    status: 'new',
    assignedBuyerName: 'Florida Tax Deed & Fix-Flip Buyers (@maxclosesdeals)',
    assignmentFeeProjected: 50000,
  },
  {
    id: 'lead-palm-bay-land',
    ownerName: 'Dueño de Lote Baldío (10,018 SqFt Infill Lot)',
    propertyAddress: '2551 Eldron Blvd SE',
    cityState: 'Palm Bay, FL 32909 (Brevard County)',
    phone: '(321) 555-0184',
    email: 'lotowner.palmbay@example.com',
    leadSource: 'Vacant Land',
    estimatedArv: 53000,
    taxOrMortgageArrears: 0,
    askingOrAssessedPrice: 53000,
    recommendedMaoOffer: 26500,
    lowball60Offer: 21200,
    status: 'new',
    assignedBuyerName: 'Derek Walter — Waltco Construction LLC (LandAtlas)',
    assignmentFeeProjected: 10000,
  },
  {
    id: 'lead-canton-realtor',
    ownerName: 'Listing Agent / Dueño de 519 17th St',
    propertyAddress: '519 17th St NW',
    cityState: 'Canton, OH 44703',
    phone: '(330) 555-0163',
    email: 'realtor.canton519@example.com',
    leadSource: 'Zillow FSBO',
    estimatedArv: 95000,
    taxOrMortgageArrears: 0,
    askingOrAssessedPrice: 65000,
    recommendedMaoOffer: 45000,
    lowball60Offer: 39000,
    status: 'new',
    assignedBuyerName: 'Red de 10 Compradores Fix & Flip / Section 8 (@richardgrandintaylor)',
    assignmentFeeProjected: 10000,
  },
  {
    id: 'lead-tampa-assumable',
    ownerName: 'Veterano Dueño con Hipoteca VA 2.875% Asumible',
    propertyAddress: '4730 15th Ave N',
    cityState: 'Tampa / St. Petersburg, FL',
    phone: '(813) 555-0177',
    email: 'seller.va2875@example.com',
    leadSource: 'Zillow Assumable 2.8%',
    estimatedArv: 365000,
    taxOrMortgageArrears: 8500,
    askingOrAssessedPrice: 365000,
    recommendedMaoOffer: 340000,
    lowball60Offer: 325000,
    status: 'new',
    assignedBuyerName: 'Samuel G (@ownwithsam - Subject-To / Assumable Buyer)',
    assignmentFeeProjected: 12000,
  },
];
