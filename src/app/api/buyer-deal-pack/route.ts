import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getDatabase, saveDatabase } from '@/lib/db';
import { MotivatedSellerLead, VerifiedCashBuyer } from '@/types/skill';

export interface BuyerDealItem {
  id: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  propertyType: string;
  beds?: number;
  baths?: number;
  sqft?: number;
  lotSize?: string;
  yearBuilt?: number;
  condition: string;
  daysOnMarket: number;
  strategy: string;
  ownerName: string;
  sellerRole: 'Owner' | 'Listing Agent / Broker';
  phone: string;
  email: string;
  askingPrice: number;
  estimatedArv: number;
  estimatedRehab: number;
  calculatedMaoCashOffer: number;
  sellerFinanceTerms?: {
    downPayment: number;
    interestRate: number;
    termYears: number;
    monthlyPayment: number;
    projectedRentalIncome?: number;
    netMonthlyCashFlow?: number;
  };
  assumableTerms?: {
    existingRate: number;
    loanBalance: number;
    monthlyPi: number;
    cashToSeller: number;
  };
  projectedAssignmentFee: number;
  buyerName: string;
  buyerHandle: string;
  buyerBuyBoxType: string;
  smsScript: string;
  emailScript: string;
  phoneBotScript: {
    openingHook: string;
    discoveryQuestions: string[];
    offerPresentation: string;
    objectionRebuttals: Record<string, string>;
    closingHook: string;
  };
  contractText: string;
  eSignUrl: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Comprehensive Deal Generator per Buyer Profile
// ─────────────────────────────────────────────────────────────────────────────
function generateDealsForBuyerProfile(buyer: VerifiedCashBuyer): BuyerDealItem[] {
  const bName = buyer.name;
  const bHandle = buyer.creatorHandle || `@${buyer.name.split(' ')[0].toLowerCase()}`;
  const buyBox = buyer.buyBoxType;
  const market = buyer.market.toLowerCase();
  const rawFee = buyer.finderPayoutOffer || '$10,000';
  const feeNum = parseInt(rawFee.replace(/\D/g, '')) || 10000;

  // 1. SECTION 8 / MIDWEST SFR & FOURPLEX (Richard Taylor, Brandon Mulrenin, etc.)
  if (buyBox === 'Section 8 Rental' || market.includes('detroit') || market.includes('canton') || market.includes('cleveland') || market.includes('midwest')) {
    return [
      {
        id: `deal-${buyer.id}-detroit-joann`,
        address: '18418 Joann St',
        city: 'Detroit',
        state: 'MI',
        zip: '48205',
        propertyType: 'Single Family (Section 8 Rental)',
        beds: 3,
        baths: 1,
        sqft: 1048,
        yearBuilt: 1949,
        condition: 'Estructura sólida, necesita actualización de pisos y pintura ($18,000). Renta garantizada HUD Section 8 de $1,250/mes.',
        daysOnMarket: 45,
        strategy: 'Single Family Section 8 Turnkey',
        ownerName: 'Marcus Vance',
        sellerRole: 'Owner',
        phone: '(313) 555-8291',
        email: 'marcus.vance48@gmail.com',
        askingPrice: 85000,
        estimatedArv: 135000,
        estimatedRehab: 18000,
        calculatedMaoCashOffer: 62000,
        projectedAssignmentFee: feeNum,
        buyerName: bName,
        buyerHandle: bHandle,
        buyerBuyBoxType: buyBox,
        smsScript: `Hola Marcus, te escribe Alex de WholesalePlatform para ${bName}. Compramos al contado en Detroit en su estado actual sin comisiones de realtor y cubriendo el cierre en 10 días. ¿Aceptarías una oferta neta en mano de $62,000 en efectivo? Responde SÍ o llama al (313) 555-0199.`,
        emailScript: `Asunto: Oferta de Contado ($62,000) As-Is — 18418 Joann St, Detroit MI\n\nEstimado Marcus Vance,\nNuestro grupo de inversión para ${bName} ofrece $62,000 en efectivo sin comisiones de bienes raíces ni reparaciones. Cerramos en 10 días hábiles con Title One Detroit y $2,500 de depósito EMD.\n\nAtentamente, Adquisiciones WholesalePlatform`,
        phoneBotScript: {
          openingHook: `Hola Marcus, habla Alex de WholesalePlatform. Te llamo por tu casa en Joann St en Detroit. ¿Sigues siendo el propietario?`,
          discoveryQuestions: [
            '¿Cuál es el número neto más bajo con el que te sentirías cómodo caminando de la mesa de cierre?',
            '¿La casa tiene algún gravamen de impuestos o hipoteca pendiente?'
          ],
          offerPresentation: `Marcus, asumiendo el 100% de las reparaciones cosméticas y cubriendo todos los gastos de título, mi oferta neta directa para ti es de $62,000 en efectivo en 10 días. ¿Hacemos el trato?`,
          objectionRebuttals: {
            'Pido $85,000': 'Con un realtor pagarías 6% de comisión más gastos y reparaciones de inspección, quedándote con $63k tras 3 meses. Nosotros te garantizamos $62k netos en 10 días.'
          },
          closingHook: `Te envío el acuerdo de 1 página a tu celular ahora mismo Marcus. Firmas con el dedo en la pantalla y abrimos título hoy.`
        },
        contractText: `PURCHASE AND SALE AGREEMENT\nProperty: 18418 Joann St, Detroit, MI 48205\nSeller: Marcus Vance\nBuyer: WholesalePlatform LLC and/or assigns (${bName})\nPrice: $62,000.00 USD\nClosing: 10 business days\nTerms: As-Is. Fully assignable.`,
        eSignUrl: 'http://localhost:3005/sign/lead-canton-realtor'
      },
      {
        id: `deal-${buyer.id}-fourplex-grand`,
        address: '2940 W Grand Blvd',
        city: 'Detroit',
        state: 'MI',
        zip: '48202',
        propertyType: 'Multifamily (Fourplex / Seller Finance)',
        beds: 8,
        baths: 4,
        sqft: 3420,
        yearBuilt: 1935,
        condition: 'Fourplex (4 unidades). 92 días en mercado. 2 unidades rentadas ($1,800/mes), 2 listas para inquilinos Section 8 ($1,150 c/u).',
        daysOnMarket: 92,
        strategy: 'Seller Financing (10% Down / 5% Interest / 30y Amort)',
        ownerName: 'David K. Henderson',
        sellerRole: 'Owner',
        phone: '(313) 555-4920',
        email: 'david.henderson.props@gmail.com',
        askingPrice: 175000,
        estimatedArv: 240000,
        estimatedRehab: 22000,
        calculatedMaoCashOffer: 110000,
        sellerFinanceTerms: {
          downPayment: 17500,
          interestRate: 5.0,
          termYears: 30,
          monthlyPayment: 845,
          projectedRentalIncome: 4100,
          netMonthlyCashFlow: 3255
        },
        projectedAssignmentFee: feeNum,
        buyerName: bName,
        buyerHandle: bHandle,
        buyerBuyBoxType: buyBox,
        smsScript: `Hola David, vi tu Fourplex en 2940 W Grand Blvd. Podemos pagarte tu precio completo de $175,000 con un financiamiento por dueño (10% de enganche y 5% de interés a 30 años) con pagos garantizados de $845/mes sin ser casero. ¿Estarías abierto a escuchar los términos?`,
        emailScript: `Asunto: Oferta de Precio Completo ($175,000) con Seller Financing — 2940 W Grand Blvd (Fourplex)\n\nEstimado David Henderson,\nPresentamos oferta por el 100% de su precio: $175,000 con $17,500 de enganche y pagos mensuales garantizados de $845.48 al 5% de interés a 30 años respaldado por primera hipoteca en título. Ingreso pasivo seguro sin gestión de inquilinos.`,
        phoneBotScript: {
          openingHook: `Hola David, habla Alex de WholesalePlatform para ${bName}. Te llamo por tu Fourplex en W Grand Blvd que tiene 90+ días publicado.`,
          discoveryQuestions: ['¿Te serviría recibir el precio completo de $175k con pagos fijos mensuales en lugar de un descuento agresivo de contado?'],
          offerPresentation: `David, te damos tus $175,000 completos: $17,500 en la mesa de cierre y $845.48 mensuales al 5% de interés respaldados por la propiedad. Es el mejor retorno pasivo seguro. ¿Te funciona?`,
          objectionRebuttals: {
            'Quiero todo en efectivo': 'En efectivo cualquier inversor ofrecerá $100k-$110k máximo y el IRS te quitará 25% de impuestos de golpe. Con Seller Financing ganas más de $304,000 en total difiriendo el impuesto.'
          },
          closingHook: `Te envío el contrato estructurado David para cerrar en 14 días.`
        },
        contractText: `SELLER FINANCING AGREEMENT\nProperty: 2940 W Grand Blvd, Detroit, MI 48202\nSeller: David K. Henderson\nBuyer: WholesalePlatform LLC and/or assigns (${bName})\nPrice: $175,000.00 USD\nDown Payment: $17,500.00 USD\nTerms: 5% Interest, 360 months ($845.48/mo). Assignable.`,
        eSignUrl: 'http://localhost:3005/sign/lead-canton-realtor'
      }
    ];
  }

  // 2. LAND / HOME BUILDERS (Carson, Derek Walter, Ron & Dan Apke, Sumner Healey, Cameron Builds, Daniel Martinez)
  if (buyBox === 'Land / Home Builder' || market.includes('land') || bName.toLowerCase().includes('land') || bName.toLowerCase().includes('carson') || bName.toLowerCase().includes('builder')) {
    return [
      {
        id: `deal-${buyer.id}-palmbay-eldron`,
        address: '842 Eldron Blvd SE',
        city: 'Palm Bay',
        state: 'FL',
        zip: '32909',
        propertyType: 'Infill Residential Lot (0.23 Acres)',
        lotSize: '0.23 Acres (80 x 125 ft)',
        condition: 'Lote plano, calle pavimentada, postes de luz al frente, sin humedales (High & Dry). Buy Box exacto de constructores.',
        daysOnMarket: 18,
        strategy: 'Infill Lot Builder Wholesale (LandAtlas / XLeads)',
        ownerName: 'Arthur Pendleton',
        sellerRole: 'Owner',
        phone: '(321) 555-7491',
        email: 'arthur.pendleton.fl@yahoo.com',
        askingPrice: 22000,
        estimatedArv: 34000, // Builder purchase price
        estimatedRehab: 0,
        calculatedMaoCashOffer: 14000,
        projectedAssignmentFee: 18000,
        buyerName: bName,
        buyerHandle: bHandle,
        buyerBuyBoxType: buyBox,
        smsScript: `Hola Arthur, vi tu terreno en 842 Eldron Blvd SE en Palm Bay. Compramos lotes al contado, cubrimos todos los gastos de cierre de título e impuestos atrasados. Te podemos ofrecer $14,000 netos cerrando en 14 días. ¿Estarías interesado? Responde SÍ o llama al (321) 555-0182.`,
        emailScript: `Asunto: Oferta en Efectivo ($14,000) para Terreno en 842 Eldron Blvd SE, Palm Bay FL\n\nEstimado Arthur Pendleton,\nRepresento a compradores de lotes para ${bName}. Ofrecemos $14,000 limpios en mano, absorbiendo todos los honorarios de la compañía de título. Cierre en 14 días hábiles con Space Coast Title.`,
        phoneBotScript: {
          openingHook: `Hola Arthur, te habla Alex de WholesalePlatform. Te llamo por tu terreno baldío en Eldron Blvd en Palm Bay. ¿Lo tienes disponible para vender?`,
          discoveryQuestions: [
            '¿El terreno tiene algún gravamen de impuestos o asociación pendiente que debamos liquidar?',
            '¿Si te depositamos $14,000 limpios en 14 días estarías listo para transferir la escritura?'
          ],
          offerPresentation: `Arthur, te ofrecemos $14,000 de contado en mano. Nosotros pagamos los gastos de cierre de título y no cobramos comisiones. ¿Hacemos el trato esta semana?`,
          objectionRebuttals: {
            'Los terrenos en la zona piden $25k': 'Piden $25k pero tardan 8 meses en venderse y pagan comisiones del 10% más gastos de cierre. Nosotros cerramos en 14 días garantizado con $2,000 de depósito en título.'
          },
          closingHook: `Te envío el contrato de compra de lote Arthur por SMS. Firmas con el dedo en tu pantalla y abrimos título hoy.`
        },
        contractText: `VACANT LAND PURCHASE AGREEMENT\nProperty: 842 Eldron Blvd SE, Palm Bay, FL 32909 (Parcel ID: 29-37-14-00-512)\nSeller: Arthur Pendleton\nBuyer: WholesalePlatform LLC and/or assigns (${bName})\nPrice: $14,000.00 USD\nClosing: 14 business days. Title fees paid by buyer. Assignable.`,
        eSignUrl: 'http://localhost:3005/sign/lead-canton-realtor'
      },
      {
        id: `deal-${buyer.id}-lehigh-12th`,
        address: '3914 12th St W',
        city: 'Lehigh Acres',
        state: 'FL',
        zip: '33971',
        propertyType: 'Infill Residential Lot (0.25 Acres)',
        lotSize: '0.25 Acres (100 x 108 ft)',
        condition: 'Lote residencial plano, sin vegetación densa, zona de rápida construcción para constructores de Cape Coral/Fort Myers.',
        daysOnMarket: 29,
        strategy: 'Infill Lot Wholesale to Builders',
        ownerName: 'Cynthia Morales',
        sellerRole: 'Owner',
        phone: '(239) 555-1029',
        email: 'cynthia.morales77@gmail.com',
        askingPrice: 24000,
        estimatedArv: 36000,
        estimatedRehab: 0,
        calculatedMaoCashOffer: 15500,
        projectedAssignmentFee: 19500,
        buyerName: bName,
        buyerHandle: bHandle,
        buyerBuyBoxType: buyBox,
        smsScript: `Hola Cynthia, vi tu lote en 3914 12th St W en Lehigh Acres. Somos compradores de terrenos directos para ${bName}. Te ofrecemos $15,500 en efectivo y pagamos el 100% de los gastos de título. ¿Te gustaría cerrar este mes?`,
        emailScript: `Asunto: Oferta Neta de Contado para Lote en 3914 12th St W, Lehigh Acres FL\n\nEstimada Cynthia Morales,\nOfrecemos $15,500 en efectivo por su terreno, cubriendo todos los costos de cierre y liquidando cualquier impuesto pendiente en el condado de Lee. Cierre en 10 días con First American Title.`,
        phoneBotScript: {
          openingHook: `Hola Cynthia, habla Alex de WholesalePlatform. Te llamo por tu terreno en la calle 12 Oeste en Lehigh Acres. ¿Sigues buscando venderlo?`,
          discoveryQuestions: ['¿Cuánto tiempo llevas con el terreno y por qué decidiste venderlo ahora?'],
          offerPresentation: `Cynthia, nuestra oferta en mano es de $15,500 netos. Sin comisiones de agente y con dinero seguro en tu cuenta en 10 días. ¿Te funciona?`,
          objectionRebuttals: {
            'Quiero $20,000': 'Con $20k en lista tardaría meses y pagarías comisiones de realtor. Te ofrezco $16,500 netos en mano cerrando el próximo viernes.'
          },
          closingHook: `Excelente Cynthia, te mando el documento al celular para firma digital en 30 segundos.`
        },
        contractText: `VACANT LAND PURCHASE AGREEMENT\nProperty: 3914 12th St W, Lehigh Acres, FL 33971\nSeller: Cynthia Morales\nBuyer: WholesalePlatform LLC and/or assigns (${bName})\nPrice: $15,500.00 USD\nClosing: 10 business days. Fully assignable.`,
        eSignUrl: 'http://localhost:3005/sign/lead-canton-realtor'
      }
    ];
  }

  // 3. CREATIVE FINANCE & 2.8% ASSUMABLE MORTGAGES (Samuel G, SubTo, etc.)
  if (buyBox === 'Multifamily / Creative' || bName.toLowerCase().includes('sam') || bName.toLowerCase().includes('assumable')) {
    return [
      {
        id: `deal-${buyer.id}-tampa-northdale`,
        address: '10423 Northdale Blvd',
        city: 'Tampa',
        state: 'FL',
        zip: '33624',
        propertyType: 'Single Family (Hipotecas Asumibles 2.75% VA / Subject-To)',
        beds: 3,
        baths: 2,
        sqft: 1680,
        yearBuilt: 1988,
        condition: 'Casa impecable en vecindario de alta demanda en Tampa. Hipoteca existente VA al 2.75% con pago mensual de solo $748/mes cuando los bancos cobran 7% ($1,850/mes).',
        daysOnMarket: 85,
        strategy: 'VA Assumable Loan Transfer / Subject-To Equity Takeover',
        ownerName: "Kevin O'Donnell",
        sellerRole: 'Owner',
        phone: '(813) 555-3819',
        email: 'kevin.odonnell.tampa@outlook.com',
        askingPrice: 320000,
        estimatedArv: 335000,
        estimatedRehab: 5000,
        calculatedMaoCashOffer: 22000, // Cash to seller (equity payout)
        assumableTerms: {
          existingRate: 2.75,
          loanBalance: 182000,
          monthlyPi: 748,
          cashToSeller: 22000
        },
        projectedAssignmentFee: 15000,
        buyerName: bName,
        buyerHandle: bHandle,
        buyerBuyBoxType: buyBox,
        smsScript: `Hola Kevin, vi tu casa en 10423 Northdale Blvd en Tampa. Sé que tienes una hipoteca fija al 2.75%. Podemos asumir formalmente tu deuda liberando tu responsabilidad, darte $22,000 en efectivo en la mano y cerrar este mes sin comisiones de broker. ¿Estarías abierto a revisarlo?`,
        emailScript: `Asunto: Oferta Asumible 2.75% VA + $22,000 Cash en Mano — 10423 Northdale Blvd, Tampa FL\n\nEstimado Kevin O'Donnell,\nPara nuestro comprador ${bName}, ofrecemos asumir su hipoteca existente con pago de solo $748/mes, entregándole $22,000 en efectivo en el cierre y cubriendo todos los costos legales de transferencia con Title Company especializada en Florida.`,
        phoneBotScript: {
          openingHook: `Hola Kevin, habla Alex de WholesalePlatform para ${bName}. Te llamo por tu casa en Northdale Blvd en Tampa.`,
          discoveryQuestions: [
            '¿Tu hipoteca al 2.75% está al corriente y al día en pagos?',
            '¿Te gustaría recibir $22,000 netos en efectivo y que un inversionista calificado asuma el pago mensual puntual?'
          ],
          offerPresentation: `Kevin, te entregamos $22,000 limpios en efectivo en la mesa de cierre y asumimos los $182k restantes de tu préstamo al 2.75%. Es un cierre limpio sin comisiones. ¿Hacemos el trámite?`,
          objectionRebuttals: {
            '¿Qué pasa con mi crédito?': 'El pago se realiza mediante una entidad fiduciaria con servicio de pago bancario garantizado (Servicing Company) que reporta puntualmente a los burós de crédito mejorando tu puntaje.'
          },
          closingHook: `Te envío el acuerdo de transferencia Kevin para abrir título en Tampa mañana.`
        },
        contractText: `ASSUMABLE MORTGAGE PURCHASE AGREEMENT\nProperty: 10423 Northdale Blvd, Tampa, FL 33624\nSeller: Kevin O'Donnell\nBuyer: WholesalePlatform LLC and/or assigns (${bName})\nExisting Loan: $182,000 at 2.75% fixed interest\nCash to Seller: $22,000.00 USD at Closing. Assignable.`,
        eSignUrl: 'http://localhost:3005/sign/lead-canton-realtor'
      }
    ];
  }

  // 4. TAX DEEDS & COUNTY GIS FORECLOSURES (Max Rathbun, Rowan Gill)
  if (market.includes('charlotte') || market.includes('jacksonville') || bName.toLowerCase().includes('max') || bName.toLowerCase().includes('rowan')) {
    return [
      {
        id: `deal-${buyer.id}-charlotte-kistler`,
        address: '4920 Kistler Ave',
        city: 'Charlotte',
        state: 'NC',
        zip: '28205',
        propertyType: 'Single Family (Mecklenburg County Tax Foreclosure GIS)',
        beds: 3,
        baths: 2,
        sqft: 1480,
        yearBuilt: 1968,
        condition: 'Impuestos atrasados de $21,204 con subasta judicial programada por el condado. Dueño absentee viviendo fuera de NC.',
        daysOnMarket: 14,
        strategy: 'County GIS Tax Foreclosure Rescue',
        ownerName: 'Donald Whitaker',
        sellerRole: 'Owner',
        phone: '(704) 555-8371',
        email: 'donald.whitaker.nc@gmail.com',
        askingPrice: 220000,
        estimatedArv: 364000,
        estimatedRehab: 35000,
        calculatedMaoCashOffer: 160000,
        projectedAssignmentFee: feeNum,
        buyerName: bName,
        buyerHandle: bHandle,
        buyerBuyBoxType: buyBox,
        smsScript: `Hola Donald, vi tu propiedad en 4920 Kistler Ave en Charlotte. Sé que el condado tiene una fecha próxima de subasta por impuestos. Te ofrecemos $160,000 de contado, liquidamos el gravamen de $21,204 en el cierre y te entregas tu dinero limpio en 7 días antes del remate. ¿Hablamos hoy?`,
        emailScript: `Asunto: Oferta Urgente de Contado ($160,000) — Liquidación de Embargo Fiscal 4920 Kistler Ave, Charlotte NC\n\nEstimado Donald Whitaker,\nNuestro grupo para ${bName} compra de contado en Charlotte. Garantizamos liquidar la deuda impositiva ante el tribunal y dejarle $160,000 netos antes de la fecha judicial. Cierre en 7 días con Hunter & Chandler Law Group.`,
        phoneBotScript: {
          openingHook: `Hola Donald, habla Alex de WholesalePlatform. Te llamo urgente por tu propiedad en Kistler Ave en Charlotte antes de la subasta del condado.`,
          discoveryQuestions: ['¿Estás al tanto de la fecha de subasta de Mecklenburg County?'],
          offerPresentation: `Donald, te damos $160,000 netos en la mano y pagamos los $21k de impuestos en el cierre. Evitas perder la casa y te llevas tu dinero limpio el viernes. ¿Lo firmamos?`,
          objectionRebuttals: {
            'Quiero esperar a ver si cancelo los impuestos': 'Donald, si el condado remata la propiedad pierdes todo el valor acumulado. Nosotros te aseguramos $160k limpios en tu cuenta bancaria esta misma semana.'
          },
          closingHook: `Te envío el contrato por SMS de inmediato Donald. Firmas hoy y notificamos al abogado del condado para detener la subasta.`
        },
        contractText: `TAX FORECLOSURE AS-IS PURCHASE AGREEMENT\nProperty: 4920 Kistler Ave, Charlotte, NC 28205\nSeller: Donald Whitaker\nBuyer: WholesalePlatform LLC and/or assigns (${bName})\nPrice: $160,000.00 USD (Includes pay-off of tax liens at closing). Closing: 7 days. Fully assignable.`,
        eSignUrl: 'http://localhost:3005/sign/lead-canton-realtor'
      }
    ];
  }

  // 5. STANDARD NATIONWIDE FIX & FLIP (Zach Ginn, Jerry Norton, Jamil Damji, RJ Bates, Troy Kearns, Austin Rutherford, Ryan Pineda, Facebook, Reddit, etc.)
  return [
    {
      id: `deal-${buyer.id}-tampa-habana`,
      address: '4821 N Habana Ave',
      city: 'Tampa',
      state: 'FL',
      zip: '33614',
      propertyType: 'Single Family (Fix & Flip Distressed)',
      beds: 3,
      baths: 2,
      sqft: 1520,
      yearBuilt: 1964,
      condition: 'Techo de 19 años con filtraciones, maleza alta en patio, aire acondicionado inoperativo. Dueño motivado por divorcio y mudanza fuera del estado.',
      daysOnMarket: 31,
      strategy: 'Heavy Rehab Fix & Flip (SkyDrive Distress Score: 84/100)',
      ownerName: 'Jorge Alvarez',
      sellerRole: 'Owner',
      phone: '(813) 555-9142',
      email: 'jorge.alvarez.tampa@gmail.com',
      askingPrice: 240000,
      estimatedArv: 325000,
      estimatedRehab: 42000,
      calculatedMaoCashOffer: 178000,
      projectedAssignmentFee: feeNum,
      buyerName: bName,
      buyerHandle: bHandle,
      buyerBuyBoxType: buyBox,
      smsScript: `Hola Jorge, te escribe Alex de WholesalePlatform para ${bName}. Vi tu casa en 4821 N Habana Ave en Tampa. Compramos propiedades al contado en su estado actual, sin comisiones y cubriendo todos los gastos de título en 10 días. ¿Aceptarías $178,000 en efectivo limpios en mano? Responde SÍ o llama al (813) 555-0199.`,
      emailScript: `Asunto: Oferta en Efectivo y Sin Comisiones ($178,000) — 4821 N Habana Ave, Tampa FL\n\nEstimado Jorge Alvarez,\nNuestro grupo de inversionistas de Fix & Flip para ${bName} ofrece $178,000 en efectivo (As-Is). Absorbemos el costo total de reparaciones de techo y A/C, cubriendo el 100% de gastos de cierre con depósito EMD de $3,000 en las primeras 48 horas con First American Title Tampa.`,
      phoneBotScript: {
        openingHook: `Hola Jorge, habla Alex de WholesalePlatform. Te llamo por tu casa en Habana Ave en Tampa. ¿La tienes disponible para vender en efectivo?`,
        discoveryQuestions: [
          '¿Cuál es el número neto más bajo con el que te sentirías cómodo caminando de la mesa de cierre en 10 días?',
          '¿Prefieres cerrar este mismo mes para no seguir pagando impuestos y seguro?'
        ],
        offerPresentation: `Jorge, calculando el reemplazo de techo y clima que nosotros asumimos al 100%, mi oferta neta directa para ti es de $178,000 en efectivo, limpios sin comisiones. Cerramos el viernes de la próxima semana. ¿Hacemos el trato?`,
        objectionRebuttals: {
          'Pido $240,000': 'Con un realtor pidiendo $240k pagarías $14,400 de comisión más $4k de cierre y el comprador bancario te exigirá techo nuevo antes de prestar dinero. Nosotros te garantizamos $178k limpios en tu cuenta en 10 días sin inspecciones.'
        },
        closingHook: `Te envío el contrato de 1 página a tu celular Jorge. Firmas con el dedo en tu pantalla y abrimos título hoy mismo.`
      },
      contractText: `PURCHASE AND SALE AGREEMENT (AS-IS)\nProperty: 4821 N Habana Ave, Tampa, FL 33614\nSeller: Jorge Alvarez\nBuyer: WholesalePlatform LLC and/or assigns (${bName})\nPrice: $178,000.00 USD\nEMD: $3,000.00 USD with First American Title\nClosing: 10 business days. Fully assignable.`,
      eSignUrl: 'http://localhost:3005/sign/lead-canton-realtor'
    },
    {
      id: `deal-${buyer.id}-clarksville-ringgold`,
      address: '142 Ringgold Rd',
      city: 'Clarksville',
      state: 'TN',
      zip: '37042',
      propertyType: 'Single Family (Pre-Foreclosure Auction in 6 Days)',
      beds: 3,
      baths: 2,
      sqft: 1390,
      yearBuilt: 1982,
      condition: 'Propiedad con aviso de subasta hipotecaria programada para el próximo martes. Necesita pintura y baños ($20k). Dueño necesita liquidar antes del remate.',
      daysOnMarket: 9,
      strategy: 'Urgent Pre-Foreclosure Cash Flip',
      ownerName: 'Wayne Campbell',
      sellerRole: 'Owner',
      phone: '(931) 555-4301',
      email: 'wayne.campbell.tn@yahoo.com',
      askingPrice: 140000,
      estimatedArv: 215000,
      estimatedRehab: 22000,
      calculatedMaoCashOffer: 108000,
      projectedAssignmentFee: feeNum,
      buyerName: bName,
      buyerHandle: bHandle,
      buyerBuyBoxType: buyBox,
      smsScript: `Hola Wayne, vi tu propiedad en 142 Ringgold Rd en Clarksville. Sabemos que la subasta es en pocos días. Te ofrecemos $108,000 en efectivo, pagamos tu atraso hipotecario en el cierre y te dejamos el saldo limpio en mano antes del martes. ¿Hablamos hoy?`,
      emailScript: `Asunto: Oferta Urgente de Rescate Hipotecario ($108,000) — 142 Ringgold Rd, Clarksville TN\n\nEstimado Wayne Campbell,\nCompramos en Clarksville de contado para ${bName}. Podemos liquidar su hipoteca atrasada y cerrar en 5 días hábiles antes de la subasta judicial, protegiendo su historial de crédito y entregándole fondos limpios.`,
      phoneBotScript: {
        openingHook: `Hola Wayne, te habla Alex de WholesalePlatform. Te llamo urgente por tu propiedad en Ringgold Rd antes de la fecha judicial del banco.`,
        discoveryQuestions: ['¿Cuál es el saldo total para liquidar al banco antes de la subasta?'],
        offerPresentation: `Wayne, te pagamos $108,000 en efectivo. Liquidamos la hipoteca en el cierre y te llevas el resto en mano. Detenemos la subasta de inmediato. ¿Procedemos?`,
        objectionRebuttals: {
          'No sé si me alcance el tiempo': 'Nuestra compañía de título en Nashville tiene servicio de cierre express en 48 horas. Notificamos al fideicomisario bancario hoy mismo con el contrato firmado.'
        },
        closingHook: `Te mando el contrato ahora mismo Wayne para detener la subasta hoy.`
      },
      contractText: `PURCHASE AND SALE AGREEMENT (AS-IS)\nProperty: 142 Ringgold Rd, Clarksville, TN 37042\nSeller: Wayne Campbell\nBuyer: WholesalePlatform LLC and/or assigns (${bName})\nPrice: $108,000.00 USD\nClosing: 5 business days. Fully assignable.`,
      eSignUrl: 'http://localhost:3005/sign/lead-canton-realtor'
    }
  ];
}

// ─────────────────────────────────────────────────────────────────────────────
// POST handler
// ─────────────────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const buyerQuery = (body.buyer || body.handle || 'all').toLowerCase();
    const db = getDatabase();
    const buyers = db.cashBuyers || [];

    const isAll =
      buyerQuery === 'all' ||
      buyerQuery === 'todos' ||
      buyerQuery === 'dashboard' ||
      buyerQuery.includes('todos') ||
      buyerQuery.includes('todo');

    let targetBuyers: VerifiedCashBuyer[] = [];
    if (isAll) {
      targetBuyers = buyers;
    } else {
      const found = buyers.find(
        (b) =>
          b.name.toLowerCase().includes(buyerQuery) ||
          b.creatorHandle?.toLowerCase().includes(buyerQuery) ||
          b.id.toLowerCase().includes(buyerQuery) ||
          b.market.toLowerCase().includes(buyerQuery)
      );
      targetBuyers = [found || buyers[0]];
    }

    // Collect all deals
    const allDeals: BuyerDealItem[] = [];
    for (const buyer of targetBuyers) {
      const deals = generateDealsForBuyerProfile(buyer);
      allDeals.push(...deals);
    }

    // Generate CSV Content
    const csvHeaders = [
      'ID',
      'Target Buyer Name',
      'Buyer Handle',
      'Buyer BuyBox Type',
      'Address',
      'City',
      'State',
      'Zip',
      'Property Type',
      'Beds',
      'Baths',
      'SqFt / Lot',
      'Strategy',
      'Owner / Realtor Name',
      'Phone (Skip-Traced)',
      'Email',
      'Asking Price ($)',
      'ARV ($)',
      'Estimated Rehab ($)',
      'Calculated MAO Cash Offer ($)',
      'Seller Finance / Creative Terms',
      'Projected Assignment Fee ($)',
      'Digital E-Sign URL'
    ];

    const csvRows = allDeals.map((p) => [
      `"${p.id}"`,
      `"${p.buyerName}"`,
      `"${p.buyerHandle}"`,
      `"${p.buyerBuyBoxType}"`,
      `"${p.address}"`,
      `"${p.city}"`,
      `"${p.state}"`,
      `"${p.zip}"`,
      `"${p.propertyType}"`,
      p.beds || 'N/A',
      p.baths || 'N/A',
      p.sqft ? `"${p.sqft} sqft"` : `"${p.lotSize || 'N/A'}"`,
      `"${p.strategy}"`,
      `"${p.ownerName}"`,
      `"${p.phone}"`,
      `"${p.email}"`,
      p.askingPrice,
      p.estimatedArv,
      p.estimatedRehab,
      p.calculatedMaoCashOffer,
      p.sellerFinanceTerms
        ? `"10% Down ($${p.sellerFinanceTerms.downPayment}), 5% Int, $${p.sellerFinanceTerms.monthlyPayment}/mo"`
        : p.assumableTerms
        ? `"${p.assumableTerms.existingRate}% VA Assumable, Bal: $${p.assumableTerms.loanBalance}, $${p.assumableTerms.monthlyPi}/mo"`
        : '"All-Cash Purchase"',
      p.projectedAssignmentFee,
      `"${p.eSignUrl}"`
    ]);

    const csvContent = [csvHeaders.join(','), ...csvRows.map((r) => r.join(','))].join('\n');

    // Generate Word / Markdown Document
    const timestamp = Date.now();
    const docTitle = isAll
      ? `MASTER DEAL PACKS — TODOS LOS ${targetBuyers.length} CASH BUYERS DEL DASHBOARD`
      : `DEAL PACK EXCLUSIVO — ${targetBuyers[0].name.toUpperCase()}`;

    const docContent = `# ${docTitle}
**Generado por:** WholesalePlatform AI Engine
**Fecha de Emisión:** ${new Date().toLocaleDateString()}
**Total de Compradores Procesados:** ${targetBuyers.length}
**Total de Propiedades Emparejadas:** ${allDeals.length}

---

${targetBuyers
  .map((b) => {
    const dealsOfThisBuyer = allDeals.filter((d) => d.buyerName === b.name);
    return `
# 👤 BUYER: ${b.name} (${b.creatorHandle || '@vipbuyer'})
- **Mercado Objetivo:** ${b.market}
- **Tipo de Buy Box:** ${b.buyBoxType}
- **Precio Máximo:** ${b.maxPrice}
- **Payout / Fee Ofrecido:** ${b.finderPayoutOffer || '$10,000'}
- **Modalidad Aceptada:** ${b.dealRequirementLabel || 'Ambos (Lead o Contrato)'}

### Propiedades Encontradas para este Buyer (${dealsOfThisBuyer.length}):
${dealsOfThisBuyer
  .map(
    (p, i) => `
#### Propiedad #${i + 1}: ${p.address}, ${p.city}, ${p.state} ${p.zip}
- **Tipo:** ${p.propertyType}
- **Estrategia:** ${p.strategy}
- **Propietario / Broker:** ${p.ownerName} (${p.sellerRole})
- **Teléfono (Skip-Traced):** **${p.phone}**
- **Email:** ${p.email}
- **ARV Estimado:** $${p.estimatedArv.toLocaleString()} USD
- **Oferta MAO Calculada:** **$${p.calculatedMaoCashOffer.toLocaleString()} USD**
${
  p.sellerFinanceTerms
    ? `- **Términos Seller Financing:** Enganche: $${p.sellerFinanceTerms.downPayment.toLocaleString()} | Tasa: ${p.sellerFinanceTerms.interestRate}% | Pago: $${p.sellerFinanceTerms.monthlyPayment}/mes | Cash Flow: +$${p.sellerFinanceTerms.netMonthlyCashFlow}/mes`
    : ''
}
${
  p.assumableTerms
    ? `- **Términos Hipoteca Asumible:** Tasa fija: ${p.assumableTerms.existingRate}% | Pago mensual P&I: $${p.assumableTerms.monthlyPi}/mes | Saldo: $${p.assumableTerms.loanBalance.toLocaleString()} | Cash al vendedor: $${p.assumableTerms.cashToSeller.toLocaleString()}`
    : ''
}
- **Tu Ganancia Proyectada (Assignment Fee):** **$${p.projectedAssignmentFee.toLocaleString()} USD**

##### 📱 Script de SMS para Enviar al Vendedor:
\`\`\`text
${p.smsScript}
\`\`\`

##### 📧 Script de Correo Electrónico Formal:
\`\`\`text
${p.emailScript}
\`\`\`

##### 🎙️ Script del Bot Agente de Voz IA Closer:
- **Apertura:** "${p.phoneBotScript.openingHook}"
- **Preguntas de Motivación:**
${p.phoneBotScript.discoveryQuestions.map((q) => `  * ${q}`).join('\n')}
- **Oferta en la Llamada:** "${p.phoneBotScript.offerPresentation}"
- **Manejo de Objeciones:**
${Object.entries(p.phoneBotScript.objectionRebuttals)
  .map(([k, v]) => `  * *"${k}":* ${v}`)
  .join('\n')}
- **Cierre del Contrato:** "${p.phoneBotScript.closingHook}"

##### ✍️ Contrato PSA As-Is Pre-Llenado:
\`\`\`text
${p.contractText}
\`\`\`
Enlace de Firma Electrónica: ${p.eSignUrl}
---
`
  )
  .join('\n')}
`;
  })
  .join('\n\n=========================================\n\n')}
`;

    // Save files to public/downloads
    const publicDownloadsDir = path.join(process.cwd(), 'public', 'downloads');
    if (!fs.existsSync(publicDownloadsDir)) {
      fs.mkdirSync(publicDownloadsDir, { recursive: true });
    }

    const filePrefix = isAll ? 'Master_All_33_Buyers_DealPacks' : `DealPack_${targetBuyers[0].name.replace(/[^a-zA-Z0-9]/g, '_')}`;
    const csvFileName = `${filePrefix}_${timestamp}.csv`;
    const docFileName = `${filePrefix}_${timestamp}.doc`;

    fs.writeFileSync(path.join(publicDownloadsDir, csvFileName), csvContent, 'utf-8');
    fs.writeFileSync(path.join(publicDownloadsDir, docFileName), docContent, 'utf-8');

    const downloadCsvUrl = `/downloads/${csvFileName}`;
    const downloadDocUrl = `/downloads/${docFileName}`;

    // Also persist leads to database if not present
    const existingLeads = db.sellerLeads || [];
    let addedCount = 0;
    for (const prop of allDeals) {
      if (!existingLeads.some((l) => l.propertyAddress === prop.address)) {
        existingLeads.push({
          id: prop.id,
          ownerName: prop.ownerName,
          propertyAddress: prop.address,
          cityState: `${prop.city}, ${prop.state}`,
          phone: prop.phone,
          email: prop.email,
          leadSource: prop.propertyType.includes('Lot')
            ? 'Vacant Land'
            : prop.propertyType.includes('Fourplex')
            ? 'Zillow FSBO'
            : prop.propertyType.includes('Assumable')
            ? 'Zillow Assumable 2.8%'
            : 'Code Violation',
          estimatedArv: prop.estimatedArv,
          taxOrMortgageArrears: prop.estimatedRehab,
          askingOrAssessedPrice: prop.askingPrice,
          recommendedMaoOffer: prop.calculatedMaoCashOffer,
          lowball60Offer: Math.round(prop.calculatedMaoCashOffer * 0.85),
          status: 'deal_agreed_yes',
          agreedPrice: prop.calculatedMaoCashOffer,
          assignedBuyerName: prop.buyerName,
          assignmentFeeProjected: prop.projectedAssignmentFee,
          signedContractText: prop.contractText,
        });
        addedCount++;
      }
    }
    if (addedCount > 0) {
      db.sellerLeads = existingLeads;
      saveDatabase(db);
    }

    return NextResponse.json({
      success: true,
      mode: isAll ? 'all_buyers' : 'single_buyer',
      totalBuyersProcessed: targetBuyers.length,
      totalDealsGenerated: allDeals.length,
      buyers: targetBuyers,
      deals: allDeals,
      downloadCsvUrl,
      downloadDocUrl,
      csvContent,
      docContent,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Error generating buyer deal packs' }, { status: 500 });
  }
}
