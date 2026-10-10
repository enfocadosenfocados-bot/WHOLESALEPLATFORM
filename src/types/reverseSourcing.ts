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
