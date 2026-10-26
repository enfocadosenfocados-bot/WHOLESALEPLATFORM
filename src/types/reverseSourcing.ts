export interface PreMatchedDeal {
  id: string;
  leadId?: string;
  propertyAddress: string;
  cityState: string;
  ownerName: string;
  phone: string;
  email?: string;
  propertyType: 'Infill Lot (0.23 Acres)' | 'Single Family Home (Section 8)' | 'SFH Fix & Flip' | 'Assumable 2.8% / SubTo' | 'Probate SFH';
  leadSource: string;
  distressReason: string;
  estimatedArv: number;
  rehabEstimate: number;
  sellerTargetOfferMao: number; // What user offers to seller
  buyerPurchasePrice: number;   // What buyer pays
  projectedAssignmentFee: number; // User's profit check
  matchedBuyerId: string;
  matchedBuyerName: string;
  matchedBuyerHandle?: string;
  matchedBuyerPhone: string;
  matchedBuyerBuyBox: string;
  matchScore: number; // e.g. 98%
  whyBuyerWillSayYes: string;
  sellerScript: {
    voiceBotOpening: string;
    diagnosticQuestion: string;
    targetOfferPresentation: string;
    smsText: string;
  };
  buyerVipPitch: string;
  status: 'ready_to_call' | 'in_negotiation' | 'contract_locked' | 'assigned_to_buyer';
  createdAt: string;
}

export interface CountyDeedTracker {
  countyName: string;
  state: string;
  activeCashBuyersFound: number;
  activeBuildersFound: number;
  lastScrapedDate: string;
  recentCashFilings: {
    buyerEntity: string;
    propertiesBought90Days: number;
    preferredCorridors: string;
    avgPurchasePrice: string;
    targetBuyBox: string;
  }[];
  officialClerkUrl: string;
  buildingPermitsUrl: string;
}

export const COUNTY_DEED_RECORDS: CountyDeedTracker[] = [
  {
    countyName: 'Brevard County (Palm Bay / Melbourne)',
    state: 'FL',
    activeCashBuyersFound: 18,
    activeBuildersFound: 12,
    lastScrapedDate: 'Hoy (En Vivo)',
    recentCashFilings: [
      {
        buyerEntity: 'Carson Land Acquisitions LLC (@carsonbuysland)',
        propertiesBought90Days: 9,
        preferredCorridors: 'Palm Bay SE (32909), Bayside Lakes, Malabar',
        avgPurchasePrice: '$18,000 – $34,000',
        targetBuyBox: 'Lotes residenciales baldíos (Infill Lots 0.23 a 0.5 acres) listos para construir',
      },
      {
        buyerEntity: 'Coastal Infill Builders LLC',
        propertiesBought90Days: 7,
        preferredCorridors: 'Palm Bay West, Port Malabar Units 14-48',
        avgPurchasePrice: '$22,000 – $35,000',
        targetBuyBox: 'Lotes R-1 secos (No wetlands) con calle pavimentada y electricidad al poste',
      },
      {
        buyerEntity: 'Space Coast Custom Homes Corp',
        propertiesBought90Days: 5,
        preferredCorridors: 'Palm Bay South / Babcock St Corridor',
        avgPurchasePrice: '$25,000 – $40,000',
        targetBuyBox: 'Lotes de esquina o dobles para construcción especulativa inmediata',
      },
    ],
    officialClerkUrl: 'https://vweb2.brevardclerk.us/wb_or1/or_sch_1.asp',
    buildingPermitsUrl: 'https://www.palmbayflorida.org/departments/growth-services/building',
  },
  {
    countyName: 'Wayne County (Detroit Metro)',
    state: 'MI',
    activeCashBuyersFound: 32,
    activeBuildersFound: 6,
    lastScrapedDate: 'Hoy (En Vivo)',
    recentCashFilings: [
      {
        buyerEntity: 'BuyBoxCartel Holdings LLC (Richard Taylor / @richardgrandintaylor)',
        propertiesBought90Days: 14,
        preferredCorridors: 'Zip 48205 (Regent Park), 48224 (East English Village), 48227',
        avgPurchasePrice: '$45,000 – $75,000',
        targetBuyBox: 'Casas SFH 3 Bed 1+ Bath para alquiler garantizado Section 8 ($1,250/mes FMR)',
      },
      {
        buyerEntity: 'Motor City Turnkey Rentals LLC',
        propertiesBought90Days: 11,
        preferredCorridors: 'Zip 48219 (Rosedale Park), 48221, 48228',
        avgPurchasePrice: '$50,000 – $80,000',
        targetBuyBox: 'Casas con necesidad de rehabilitación cosmética ligera ($10k-$15k)',
      },
      {
        buyerEntity: 'Great Lakes Equity Partners LLC',
        propertiesBought90Days: 8,
        preferredCorridors: 'Detroit West & Highland Park',
        avgPurchasePrice: '$40,000 – $65,000',
        targetBuyBox: 'Propiedades con violaciones de código municipales o Tired Landlords',
      },
    ],
    officialClerkUrl: 'https://www.waynecounty.com/elected/clerk/home.aspx',
    buildingPermitsUrl: 'https://detroitmi.gov/departments/buildings-safety-engineering-and-environmental-department',
  },
  {
    countyName: 'Cuyahoga County (Cleveland Metro)',
    state: 'OH',
    activeCashBuyersFound: 26,
    activeBuildersFound: 4,
    lastScrapedDate: 'Hoy (En Vivo)',
    recentCashFilings: [
      {
        buyerEntity: 'Buckeye State Wealth Builders LLC (Jerry Norton Network)',
        propertiesBought90Days: 12,
        preferredCorridors: 'Zip 44105 (Slavic Village), 44109, 44111 (Kamm’s Corners)',
        avgPurchasePrice: '$35,000 – $60,000',
        targetBuyBox: 'Fix & Flip con ARV $130k-$180k y mínimo $35k de margen neto',
      },
      {
        buyerEntity: 'Cleveland Cash Holdings LLC',
        propertiesBought90Days: 9,
        preferredCorridors: 'Canton OH / Akron / Cleveland East',
        avgPurchasePrice: '$42,000 – $58,000',
        targetBuyBox: 'Casas unifamiliares con sótano seco y garaje independiente',
      },
    ],
    officialClerkUrl: 'https://cuyahogacounty.gov/fiscal-officer/recorded-documents',
    buildingPermitsUrl: 'https://www.clevelandohio.gov/city-hall/departments/building-and-housing',
  },
  {
    countyName: 'Hillsborough County (Tampa Metro)',
    state: 'FL',
    activeCashBuyersFound: 29,
    activeBuildersFound: 15,
    lastScrapedDate: 'Hoy (En Vivo)',
    recentCashFilings: [
      {
        buyerEntity: 'Creative Equity Solutions LLC (Samuel G / @ownwithsam)',
        propertiesBought90Days: 8,
        preferredCorridors: 'Tampa North, Brandon, Riverview, Temple Terrace',
        avgPurchasePrice: '$180,000 – $320,000 (SubTo)',
        targetBuyBox: 'Hipotecas fijas existentes FHA/VA < 3.5% o Subject-To con bajo cash to seller',
      },
      {
        buyerEntity: 'Suncoast Fix & Flip Fund LLC',
        propertiesBought90Days: 14,
        preferredCorridors: 'Ybor City, Tampa Heights, Seminole Heights',
        avgPurchasePrice: '$160,000 – $280,000',
        targetBuyBox: 'Casas antiguas para remodelación total con ARV superior a $380,000',
      },
    ],
    officialClerkUrl: 'https://www.hillsclerk.com/court-records/official-records',
    buildingPermitsUrl: 'https://www.tampa.gov/construction-services',
  },
];

// =============================================================================
// CARSON WIENER (@carsonbuysland) - BUILDER BUY BOX & $10k INFILL LOT ARBITRAGE
// =============================================================================
export interface BuilderBuyBoxPartner {
  id: string;
  builderName: string;
  representative: string;
  email: string;
  phone: string;
  tier: 'Platinum Builder' | 'High Volume' | 'Custom Infill' | 'Spec Builder';
  market: string;
  targetAcreage: string;
  targetBuyPrice: number;
  targetBuyPriceDisplay: string;
  monthlyBuildVolume: string;
  buyBoxCriteria: string;
  whyTheyPayFast: string;
}

export interface CarsonInfillLotOpportunity {
  id: string;
  address: string;
  cityStateZip: string;
  county: string;
  parcelId: string;
  lotSizeAcres: number;
  dimensions: string;
  zoning: string;
  landownerName: string;
  landownerPhone: string;
  landownerEmail?: string;
  listedOrRecordPrice: number; // Max Price Filter <= $10,000
  landownerOfferMao: number;   // What we offer owner ($7,000 - $10,000)
  targetBuilderBuyerId: string;
  targetBuilderName: string;
  builderPurchasePrice: number;// What builder pays ($35,000 - $38,000)
  projectedAssignmentFee: number; // $25,000 - $28,000 profit spread
  utilitiesStatus: 'Electric at pole, Paved road, High & Dry' | 'City Water/Sewer Available' | 'Well & Septic Ready';
  callScriptToOwner: string;
  vipPitchToBuilder: string;
}

export const CARSON_CAPE_CORAL_BUILDERS: BuilderBuyBoxPartner[] = [
  {
    id: 'builder-david-black',
    builderName: 'David Black (Black Construction LLC)',
    representative: 'David Black',
    email: 'dblack@blackconstructionfl.com',
    phone: '(239) 555-8319',
    tier: 'Platinum Builder',
    market: 'Cape Coral, FL (Lee County)',
    targetAcreage: '0.20 to 2.0 Acres',
    targetBuyPrice: 38000,
    targetBuyPriceDisplay: '$15,000 – $70,000',
    monthlyBuildVolume: '25+ casas por mes',
    buyBoxCriteria: 'Lotes residenciales secos (R-1) en Cape Coral North & SW. Prefiere calles pavimentadas con postes eléctricos listos.',
    whyTheyPayFast: 'Tienen cuadrillas fijas y contratos de financiamiento con bancos comerciales. Cada día sin lotes pierden dinero en maquinaria.',
  },
  {
    id: 'builder-baker-construction',
    builderName: 'Baker Construction Corp',
    representative: 'Jon Sninsky',
    email: 'jsninsky@bakerconstructionfl.com',
    phone: '(239) 555-4420',
    tier: 'Spec Builder',
    market: 'Cape Coral, FL (Lee County)',
    targetAcreage: '0.23 Acres (80x125 ft)',
    targetBuyPrice: 38000,
    targetBuyPriceDisplay: '$35,000 – $38,000 fijo',
    monthlyBuildVolume: '1–2 lotes por mes',
    buyBoxCriteria: 'Lotes residenciales estándar de 80x125 ft en Cape Coral NW. Listos para verter losa en 30 días.',
    whyTheyPayFast: 'Jon Sninsky compra al contado en 7 días sin periodo largo de inspección si el estudio de humedales sale limpio.',
  },
  {
    id: 'builder-sunlife-holdings',
    builderName: 'Sunlife Land Holdings LLC',
    representative: 'Kelly Sexton & Rosario Terracciano',
    email: 'ksexton@mysunlifehome.com',
    phone: '(239) 555-6184',
    tier: 'High Volume',
    market: 'Cape Coral & Lehigh Acres, FL',
    targetAcreage: '0.23 a 0.50 Acres',
    targetBuyPrice: 42000,
    targetBuyPriceDisplay: '$32,000 – $48,000',
    monthlyBuildVolume: '10–15 lotes por mes',
    buyBoxCriteria: 'Lotes en zonas en expansión con acceso a agua y luz. Se quedan con inventario para desarrollo propio.',
    whyTheyPayFast: 'Kelly Sexton revisa coordenadas GIS en 2 horas y firma Assignment Agreement en DocuSign el mismo día.',
  },
  {
    id: 'builder-dr-horton',
    builderName: 'D.R. Horton Inc (Southwest FL Division)',
    representative: 'Robbie McDermott & Zach Hillthiry',
    email: 'rmcdermott@drhorton.com',
    phone: '(239) 555-9012',
    tier: 'Platinum Builder',
    market: 'Lee, Charlotte & Brevard Counties, FL',
    targetAcreage: '0.20 a 1.0 Acres (Singles & Clusters)',
    targetBuyPrice: 45000,
    targetBuyPriceDisplay: '$35,000 – $55,000',
    monthlyBuildVolume: '40+ lotes por mes',
    buyBoxCriteria: 'El mayor constructor de EE.UU. Compran paquetes individuales o de múltiples lotes en Cape Coral y Palm Bay.',
    whyTheyPayFast: 'Pagan con fondos institucionales en escrow sin contingencias si la escritura es General Warranty Deed.',
  },
  {
    id: 'builder-jw-lighthomes',
    builderName: 'JW Lighthomes LLC / Carson Wiener',
    representative: 'Carson Wiener (@carsonbuysland)',
    email: 'carsonwiener03@gmail.com',
    phone: '(321) 555-7491',
    tier: 'Custom Infill',
    market: 'Cape Coral, FL & Palm Bay, FL',
    targetAcreage: '0.20 a 0.50 Acres',
    targetBuyPrice: 36000,
    targetBuyPriceDisplay: '$25,000 – $38,000',
    monthlyBuildVolume: '8–12 lotes por mes',
    buyBoxCriteria: 'Infill lots adquiridos por debajo de $15,000 para reventa instantánea a constructores a $35k+ o desarrollo directo.',
    whyTheyPayFast: 'Modelo demostrado en Instagram: cierra en 10 días y paga $2,500 de depósito no reembolsable.',
  },
];

export const CARSON_INFILL_LOT_OPPORTUNITIES: CarsonInfillLotOpportunity[] = [
  {
    id: 'carson-lot-1',
    address: '1428 Tropicana Pkwy W',
    cityStateZip: 'Cape Coral, FL 33993',
    county: 'Lee County',
    parcelId: '22-43-23-C2-03102.0450',
    lotSizeAcres: 0.23,
    dimensions: '80 x 125 ft',
    zoning: 'R-1 (Single Family Residential)',
    landownerName: 'Robert Vance McCallister',
    landownerPhone: '(239) 555-9201',
    landownerEmail: 'rmccallister74@gmail.com',
    listedOrRecordPrice: 9500, // Under $10,000 filter
    landownerOfferMao: 7500,
    targetBuilderBuyerId: 'builder-baker-construction',
    targetBuilderName: 'Baker Construction (Jon Sninsky)',
    builderPurchasePrice: 38000,
    projectedAssignmentFee: 30500,
    utilitiesStatus: 'Electric at pole, Paved road, High & Dry',
    callScriptToOwner: 'Hola Robert, habla Alex de AI Automated Services LLC. Veo que tienes el terreno en 1428 Tropicana Pkwy W en Cape Coral. Varios vecinos nos comentaron que tal vez estarías dispuesto a venderlo si recibes una oferta al contado sin comisiones de agente. ¿Si te ponemos $7,500 en efectivo en tu banco en 10 días absorbiendo todos los costos de cierre, considerarías venderlo esta semana?',
    vipPitchToBuilder: 'Hola Jon (Baker Construction)! Tengo exactamente el lote de 80x125 ft en 1428 Tropicana Pkwy W en Cape Coral NW. Seco, calle asfaltada, poste de luz al frente. Bajo contrato listo para losa. Te lo asigno por $38,000 netos con título limpio. ¿Te paso el contrato hoy?',
  },
  {
    id: 'carson-lot-2',
    address: '3812 SW 17th Place',
    cityStateZip: 'Cape Coral, FL 33914',
    county: 'Lee County',
    parcelId: '14-44-23-C3-02401.0180',
    lotSizeAcres: 0.24,
    dimensions: '85 x 125 ft',
    zoning: 'R-1 Single Family',
    landownerName: 'Eleanor Jean Dupont',
    landownerPhone: '(239) 555-3184',
    listedOrRecordPrice: 10000,
    landownerOfferMao: 8000,
    targetBuilderBuyerId: 'builder-david-black',
    targetBuilderName: 'David Black (Black Construction LLC)',
    builderPurchasePrice: 38000,
    projectedAssignmentFee: 30000,
    utilitiesStatus: 'City Water/Sewer Available',
    callScriptToOwner: 'Hola Eleanor, te contacto por el terreno en SW 17th Place en Cape Coral. Sé que llevas años pagando impuestos sin usarlo. Compramos al contado directo: $8,000 limpios para ti, cerramos en Title Escrow y nosotros pagamos los costos de traspaso. ¿Hacemos el trato?',
    vipPitchToBuilder: 'David Black: Lote con agua y alcantarillado de la ciudad listo en SW 17th Place Cape Coral. 0.24 acres. Precio para ti $38,000. Tu margen de construcción supera los $85,000. Te paso el Assignment ahora.',
  },
  {
    id: 'carson-lot-3',
    address: '2209 Kismet Pkwy E',
    cityStateZip: 'Cape Coral, FL 33909',
    county: 'Lee County',
    parcelId: '05-43-24-C4-04901.0330',
    lotSizeAcres: 0.23,
    dimensions: '80 x 125 ft',
    zoning: 'R-1 Single Family',
    landownerName: 'Gerald Wayne Morrison',
    landownerPhone: '(239) 555-6712',
    listedOrRecordPrice: 8900,
    landownerOfferMao: 7000,
    targetBuilderBuyerId: 'builder-sunlife-holdings',
    targetBuilderName: 'Sunlife Land Holdings (Kelly Sexton)',
    builderPurchasePrice: 36000,
    projectedAssignmentFee: 29000,
    utilitiesStatus: 'Electric at pole, Paved road, High & Dry',
    callScriptToOwner: 'Gerald, tengo los fondos aprobados para cerrar tu lote de Kismet Pkwy E en $7,000 CASH en 7 días sin inspecciones complicadas ni comisiones de realtor. ¿Te envío el acuerdo de 1 página?',
    vipPitchToBuilder: 'Kelly Sexton (Sunlife): Lote R-1 en Kismet Pkwy E listo para desarrollo. Verificado en GIS de Lee County sin humedales. $36,000 al contado. ¿Lo bloqueamos para ti hoy?',
  },
  {
    id: 'carson-lot-4',
    address: '915 NE 24th Ave',
    cityStateZip: 'Cape Coral, FL 33909',
    county: 'Lee County',
    parcelId: '18-43-24-C1-01103.0290',
    lotSizeAcres: 0.25,
    dimensions: '85 x 130 ft',
    zoning: 'R-1 Single Family',
    landownerName: 'Patricia & Thomas Higgins',
    landownerPhone: '(239) 555-1498',
    listedOrRecordPrice: 9800,
    landownerOfferMao: 7800,
    targetBuilderBuyerId: 'builder-dr-horton',
    targetBuilderName: 'D.R. Horton (Robbie McDermott)',
    builderPurchasePrice: 37500,
    projectedAssignmentFee: 29700,
    utilitiesStatus: 'Well & Septic Ready',
    callScriptToOwner: 'Hola Patricia, tenemos una asignación directa para comprar su lote en NE 24th Ave en efectivo. Les depositamos $7,800 netos y cerramos con la compañía de título local antes del fin de mes. ¿Aceptan la oferta?',
    vipPitchToBuilder: 'Robbie McDermott (DR Horton): Lote estándar en NE 24th Ave Cape Coral. 0.25 acres con servidumbre limpia. $37,500 en escrow. Listo para traspaso.',
  },
];

// =============================================================================
// ZACH GINN (@flipwithzach) - TOP 50 ZILLOW FSBO DISTRESS HUNTER & LOWBALL ENGINE
// =============================================================================
export interface ZillowDistressFsboLead {
  id: string;
  address: string;
  cityStateZip: string;
  listedPrice: number;
  latestPriceCut: number;
  priceCutDate: string;
  priceDropPercentage: string;
  daysOnZillow: number;
  sellerDistressSignal: string;
  unfinanceableFha: boolean;
  propertyType: 'Single Family' | 'Duplex' | 'Handyman Special' | 'Vacant SFH';
  ownerContact: string;
  phone: string;
  aiLowballOffer: number;       // e.g. 50%-60% of listed price
  retailArv: number;
  investorEquitySpread: number;
  projectedAssignmentFee: number;
  coldCallPatternInterrupt: string;
  lowballOfferStrategy: string;
}

export const ZACH_TOP50_ZILLOW_FSBO_LEADS: ZillowDistressFsboLead[] = [
  {
    id: 'zillow-fsbo-clarksville-190',
    address: '190 Mitchell St',
    cityStateZip: 'Clarksville, TN 37042',
    listedPrice: 185000,
    latestPriceCut: 10000,
    priceCutDate: 'Octubre (Reciente)',
    priceDropPercentage: '5.4%',
    daysOnZillow: 74,
    sellerDistressSignal: '$10,000 Price cut and OBO text; seeks fast transaction; reports deck & plumbing work needed',
    unfinanceableFha: true,
    propertyType: 'Handyman Special',
    ownerContact: 'Brandon Myers (Owner FSBO)',
    phone: '(931) 555-4192',
    aiLowballOffer: 115000,
    retailArv: 215000,
    investorEquitySpread: 68000,
    projectedAssignmentFee: 15000,
    coldCallPatternInterrupt: 'Hola Brandon, vi tu anuncio en Zillow de 190 Mitchell St. Noté que pusiste OBO y mencionas que necesita trabajo de plomería y terraza. Sé que los compradores con bancos FHA te están haciendo perder el tiempo porque no califican el préstamo. Nosotros compramos 100% en efectivo, tal como está. Si cerramos en 10 días y pagamos nosotros todos los gastos de título, ¿cuál es el mínimo absoluto en mano que tomarías hoy?',
    lowballOfferStrategy: 'Vendedor exhausto con 74 días en el mercado. El rechazo de FHA elimina al 85% de compradores de Clarksville. Oferta ancla $110k para cerrar en $115k-$120k y asignar a $135k.',
  },
  {
    id: 'zillow-fsbo-clarksville-1315',
    address: '1315 Wennona Dr',
    cityStateZip: 'Clarksville, TN 37042',
    listedPrice: 179000,
    latestPriceCut: 14000,
    priceCutDate: 'Hace 5 días',
    priceDropPercentage: '7.8%',
    daysOnZillow: 92,
    sellerDistressSignal: 'Major $14k reduction; seller emphasizes quick closing; cannot qualify for FHA',
    unfinanceableFha: true,
    propertyType: 'Single Family',
    ownerContact: 'Curtis Vance (Owner FSBO)',
    phone: '(931) 555-8831',
    aiLowballOffer: 108000,
    retailArv: 198000,
    investorEquitySpread: 58000,
    projectedAssignmentFee: 14000,
    coldCallPatternInterrupt: 'Curtis, vi tu reducción de $14k en Wennona Dr. Tu anuncio dice explícitamente que buscas cierre rápido y que la propiedad no pasa tasación FHA. Tengo los fondos institucionales listos para enviar el EMD a la compañía de título mañana. Si te pago $108,000 netos de contado sin pedirte un solo arreglo, ¿firmamos el contrato hoy?',
    lowballOfferStrategy: 'El vendedor redujo $14,000 en una semana por pánico a los pagos mensuales. Su hipoteca o necesidad de mudanza lo obliga a vender de inmediato.',
  },
  {
    id: 'zillow-fsbo-cleveland-4122',
    address: '4122 E 131st St',
    cityStateZip: 'Cleveland, OH 44105',
    listedPrice: 74000,
    latestPriceCut: 15000,
    priceCutDate: 'Esta semana',
    priceDropPercentage: '20.2%',
    daysOnZillow: 81,
    sellerDistressSignal: 'Cannot qualify for FHA; sold as-is; owner notes direct offers may compete; roof aged',
    unfinanceableFha: true,
    propertyType: 'Handyman Special',
    ownerContact: 'Tanya Jenkins (Owner FSBO)',
    phone: '(216) 555-7341',
    aiLowballOffer: 38000,
    retailArv: 110000,
    investorEquitySpread: 42000,
    projectedAssignmentFee: 12000,
    coldCallPatternInterrupt: 'Hola Tanya, habla Alex de AI Automated Services. Vi tu casa en 131st St en Zillow. Pusiste que se vende As-Is y no pasa FHA. La verdad es que un banco regular nunca va a prestar dinero para esa casa con el techo actual. Nosotros pagamos en efectivo sin inspecciones bancarias. Te ofrezco $38,000 de contado y cerramos con Buckeye Title en 10 días. ¿Te sirve liberarte de la propiedad esta semana?',
    lowballOfferStrategy: 'Zona de Slavic Village en Cleveland. Compradores de Section 8 pagan $50k-$55k al instante. La dueña bajó $15k y está dispuesta a tomar cualquier cheque de contado.',
  },
  {
    id: 'zillow-fsbo-indy-3144',
    address: '3144 N Meridian St',
    cityStateZip: 'Indianapolis, IN 46208',
    listedPrice: 115000,
    latestPriceCut: 26000,
    priceCutDate: 'Octubre',
    priceDropPercentage: '22.6%',
    daysOnZillow: 105,
    sellerDistressSignal: 'Severe $26,000 price drop! Handyman special; sought October close; motivated seller seeks cash offer',
    unfinanceableFha: true,
    propertyType: 'Single Family',
    ownerContact: 'Samuel H. Thorne',
    phone: '(317) 555-9014',
    aiLowballOffer: 62000,
    retailArv: 155000,
    investorEquitySpread: 55000,
    projectedAssignmentFee: 16000,
    coldCallPatternInterrupt: 'Samuel, acabo de ver la caída de $26,000 que le hiciste a tu propiedad en Meridian St. Se nota que querías haber cerrado en octubre y estás frustrado con compradores que te hacen ofertas y luego se caen. Si te pongo $62,000 en efectivo garantizado con depósito hoy en la compañía de título, ¿cerramos el trato?',
    lowballOfferStrategy: 'Caída masiva de $26k (la mayor de la zona). El dueño se quedó atrapado sin cerrar en octubre. Aceptará una oferta baja de contado antes de seguir pagando impuestos y seguro de casa vacía.',
  },
  {
    id: 'zillow-fsbo-detroit-duplex',
    address: '9420 Bramell St (Duplex)',
    cityStateZip: 'Detroit, MI 48239',
    listedPrice: 89000,
    latestPriceCut: 10000,
    priceCutDate: 'Oct 8 cut',
    priceDropPercentage: '11.2%',
    daysOnZillow: 68,
    sellerDistressSignal: 'Duplex FSBO, $10k Oct 8 cut; owner notes direct offers may compete; furnace needs replacement',
    unfinanceableFha: true,
    propertyType: 'Duplex',
    ownerContact: 'Darius Cole (Owner FSBO)',
    phone: '(313) 555-3298',
    aiLowballOffer: 46000,
    retailArv: 130000,
    investorEquitySpread: 48000,
    projectedAssignmentFee: 14000,
    coldCallPatternInterrupt: 'Darius, vi tu dúplex en Bramell St en Zillow. Sé que la caldera no pasa inspección de ciudad ni préstamo bancario. Tengo inversionistas de Section 8 que compran dúplex en Detroit con nosotros todo el tiempo. Te ofrezco $46,000 limpios en efectivo y nosotros nos encargamos de la calefacción. ¿Hablamos 2 minutos?',
    lowballOfferStrategy: 'Dúplex con calefacción dañada. Imposible calificar préstamo hipotecario. Se asigna fácilmente a Richard Taylor o inversores Section 8 por $60,000 ($14k fee).',
  },
  {
    id: 'zillow-fsbo-tampa-2908',
    address: '2908 E 18th Ave',
    cityStateZip: 'Tampa, FL 33605',
    listedPrice: 195000,
    latestPriceCut: 25000,
    priceCutDate: 'Hace 3 días',
    priceDropPercentage: '12.8%',
    daysOnZillow: 112,
    sellerDistressSignal: 'Huge $25k price cut! As-is condition, probate inherited, seller lives in Georgia, cannot qualify for FHA',
    unfinanceableFha: true,
    propertyType: 'Single Family',
    ownerContact: 'Loretta Bishop (Heir FSBO)',
    phone: '(813) 555-6671',
    aiLowballOffer: 122000,
    retailArv: 245000,
    investorEquitySpread: 75000,
    projectedAssignmentFee: 20000,
    coldCallPatternInterrupt: 'Loretta, vi tu aviso en Zillow de 18th Ave en Tampa. Sé que heredaste la propiedad y estás manejando todo desde Georgia con una casa que no califica para crédito FHA. Nosotros te pagamos $122,000 en efectivo neto, la notaría móvil va a tu casa en Georgia para firmar y la compañía de título te transfiere los fondos sin que tengas que viajar a Tampa. ¿Te solucionaría la vida?',
    lowballOfferStrategy: 'Heredera fuera del estado (Out-of-state heir) en Georgia cansada de pagar impuestos y lidiar con compradores informales. Asignable a compradores de Ybor City / Tampa Heights por $142,000.',
  },
];
