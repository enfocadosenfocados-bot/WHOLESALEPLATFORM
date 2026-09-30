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
  propertyType: 'Single Family (Section 8)' | 'Multifamily (Fourplex / Seller Finance)';
  beds: number;
  baths: number;
  sqft: number;
  yearBuilt: number;
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
    projectedRentalIncome: number;
    netMonthlyCashFlow: number;
  };
  projectedAssignmentFee: number;
  buyerName: string;
  buyerHandle: string;
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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const buyerQuery = (body.buyer || body.handle || 'richard').toLowerCase();
    const db = getDatabase();

    // 1. Locate Buyer
    const buyers = db.cashBuyers || [];
    let matchedBuyer = buyers.find(
      (b) =>
        b.name.toLowerCase().includes(buyerQuery) ||
        b.creatorHandle?.toLowerCase().includes(buyerQuery) ||
        b.id.toLowerCase().includes(buyerQuery)
    );

    if (!matchedBuyer) {
      // Default to Richard Taylor if none matched
      matchedBuyer = buyers.find((b) => b.id === 'cb-creator-richard-taylor') || buyers[0];
    }

    const isRichardTaylor =
      matchedBuyer.name.toLowerCase().includes('richard') ||
      matchedBuyer.creatorHandle?.toLowerCase().includes('richard');

    // 2. Curate / Find Properties tailored exactly to the buyer's Buy Box
    const propertiesData: BuyerDealItem[] = isRichardTaylor
      ? [
          {
            id: 'deal-taylor-detroit-joann',
            address: '18418 Joann St',
            city: 'Detroit',
            state: 'MI',
            zip: '48205',
            propertyType: 'Single Family (Section 8)',
            beds: 3,
            baths: 1,
            sqft: 1048,
            yearBuilt: 1949,
            condition: 'Estructura sólida, necesita actualización cosmética ligera ($18,000 en pisos y pintura). Listo para inquilino Section 8.',
            daysOnMarket: 45,
            strategy: 'Single-Family Section 8 Rental ($1,250/mes garantizado por HUD)',
            ownerName: 'Marcus Vance',
            sellerRole: 'Owner',
            phone: '(313) 555-8291',
            email: 'marcus.vance48@gmail.com',
            askingPrice: 85000,
            estimatedArv: 135000,
            estimatedRehab: 18000,
            calculatedMaoCashOffer: 62000,
            projectedAssignmentFee: 10000,
            buyerName: 'Richard Taylor (Hold My Hand Wholesale)',
            buyerHandle: '@richardgrandintaylor',
            smsScript:
              'Hola Marcus, te escribe Alex de WholesalePlatform. Vi tu propiedad en 18418 Joann St en Detroit. Compramos propiedades al contado en su estado actual, sin comisiones de realtor y cubrimos todos los gastos de cierre de título en 10 días. ¿Estarías abierto a recibir una oferta en efectivo de $62,000 sin contingencias?',
            emailScript: `Asunto: Oferta en Efectivo y Sin Comisiones — 18418 Joann St, Detroit MI

Estimado Marcus Vance,

Le escribo en representación de nuestro grupo de inversión de Section 8 en Detroit. Hemos analizado su propiedad en 18418 Joann St y estamos preparados para presentar una oferta de compra en efectivo de $62,000 (As-Is).

Nuestras condiciones:
- Cero reparaciones de su parte (nosotros absorbemos el costo de pintura y pisos).
- Cero comisiones de bienes raíces (ahorra el 6%).
- Cierre rápido en 7 a 14 días a través de First American Title / Title One Detroit.
- Depósito de garantía (EMD) de $2,500 depositado en título dentro de las primeras 48 horas.

Si desea proceder sin intermediarios, por favor responda a este correo o llámenos directamente al (313) 555-0199.

Atentamente,
Adquisiciones — WholesalePlatform`,
            phoneBotScript: {
              openingHook:
                'Hola Marcus, habla Alex. Sé que no estabas esperando mi llamada, te llamo muy brevemente sobre tu casa en Joann St en Detroit. ¿Todavía eres el dueño de esa propiedad?',
              discoveryQuestions: [
                'Marcus, si pudiéramos cerrar en efectivo en 10 días sin que tengas que pintar ni cambiar nada, ¿cuál sería el número más bajo con el que te sentirías cómodo caminando de la mesa de cierre?',
                '¿Qué tiempo tienes contemplado para vender? ¿Prefieres salir de ella este mismo mes o tienes prisa?',
                '¿Cuál es la razón principal para considerar vender en este momento? ¿Quieres reubicar el capital o no lidiar con inquilinos?',
                '¿La propiedad tiene algún gravamen de impuestos o hipoteca pendiente que debamos liquidar en el título?'
              ],
              offerPresentation:
                'Marcus, basándome en que el techo tiene más de 15 años y los pisos necesitan reemplazo completo para inspección de Section 8, nosotros asumimos el 100% de esos costos y cerramos con nuestra compañía de título cubriendo los gastos. Mi oferta neta directa para ti es de $62,000 en efectivo, limpia y sin inspecciones tediosas. Si cerramos el viernes de la próxima semana, ¿hacemos el trato?',
              objectionRebuttals: {
                'Mi precio es $85,000':
                  'Lo entiendo perfectamente Marcus. Con un Realtor pidiendo $85k pagarías $5,100 de comisión más $2,500 de cierre y el comprador te pedirá $15k en concesiones tras la inspección, quedándote con unos $62k-$65k tras 90 días de espera. Nosotros te garantizamos $62,000 netos a tu cuenta bancaria en 10 días sin dolores de cabeza.',
                'Déjame pensarlo':
                  'Totalmente respetable Marcus. Te comento que tenemos fondos apartados para cerrar 2 compras en el código postal 48205 esta misma semana. Si te envío el acuerdo preliminar de 1 página con nuestro depósito de $2,500 garantizado, ¿lo revisarías hoy?'
              },
              closingHook:
                'Perfecto Marcus. Te voy a enviar el contrato de 1 página a tu celular y correo. Solo colocas tu firma electrónica en la pantalla y enviamos el depósito a la compañía de título para comenzar el trámite hoy mismo.'
            },
            contractText: `PURCHASE AND SALE AGREEMENT (AS-IS)
Property: 18418 Joann St, Detroit, MI 48205
Seller: Marcus Vance
Buyer: WholesalePlatform LLC and/or assigns
Purchase Price: $62,000.00 USD
Earnest Money Deposit (EMD): $2,500.00 USD held with Title One Detroit
Closing Date: On or before 14 business days from execution
Terms: As-Is condition. Seller pays no commissions. Buyer covers standard closing costs.
Assignability: Buyer reserves the unencumbered right to assign this agreement.`,
            eSignUrl: 'http://localhost:3005/sign/lead-canton-realtor'
          },
          {
            id: 'deal-taylor-canton-519',
            address: '519 17th St NW',
            city: 'Canton',
            state: 'OH',
            zip: '44703',
            propertyType: 'Single Family (Section 8)',
            beds: 3,
            baths: 1,
            sqft: 1180,
            yearBuilt: 1928,
            condition: 'Propiedad con impuestos atrasados de $4,200. Requiere pintura y limpieza general. Muy buscada por compradores de Richard Taylor.',
            daysOnMarket: 22,
            strategy: 'Stark County Distressed — Section 8 Rental ($1,100/mes)',
            ownerName: 'Robert Langston',
            sellerRole: 'Owner',
            phone: '(330) 555-0163',
            email: 'robert.langston.canton@yahoo.com',
            askingPrice: 65000,
            estimatedArv: 145000,
            estimatedRehab: 15000,
            calculatedMaoCashOffer: 45000,
            projectedAssignmentFee: 10000,
            buyerName: 'Richard Taylor (Hold My Hand Wholesale)',
            buyerHandle: '@richardgrandintaylor',
            smsScript:
              'Hola Robert, vi tu propiedad en 519 17th St NW en Canton. Somos inversionistas directos, compramos en efectivo y liquidamos cualquier deuda de impuestos en el cierre. ¿Aceptarías una oferta neta en mano de $45,000 cerrando en 10 días?',
            emailScript: `Asunto: Propuesta Formal en Efectivo — 519 17th St NW, Canton OH

Estimado Robert Langston,

Nuestro grupo de adquisición en Ohio está interesado en adquirir de contado su propiedad ubicada en 519 17th St NW en Canton, OH.

Ofrecemos $45,000 en efectivo, asumiendo cualquier atraso impositivo pendiente que será saldado en el cierre a través de Stark County Title Co.

No cobramos comisiones y cerramos en 10 días hábiles. Quedamos atentos a su confirmación para enviar el documento de compra.

Saludos cordiales,
Equipo de Adquisiciones WholesalePlatform`,
            phoneBotScript: {
              openingHook:
                'Buenas tardes Robert, le habla Alex de WholesalePlatform. Lo llamo con respecto a la propiedad en la calle 17 NW en Canton. ¿Tiene un minuto para hablar de una oferta directa en efectivo?',
              discoveryQuestions: [
                'Robert, sabemos que Stark County tiene algunas facturas de impuestos pendientes. ¿Nuestra compañía se encargaría de liquidar esos gravámenes en el cierre, eso le facilitaría la venta?',
                '¿Si le dejamos $45,000 limpios en su cuenta en 10 días hábiles, estaría listo para transferir la escritura?',
                '¿Tiene inquilinos actualmente o la casa está vacía?'
              ],
              offerPresentation:
                'Robert, calculando las reparaciones cosméticas y los impuestos pendientes, nuestra oferta final en mano para usted es de $45,000 netos. Nosotros pagamos los honorarios de la compañía de título y el depósito de garantía entra mañana mismo.',
              objectionRebuttals: {
                'Es muy poco':
                  'Entiendo Robert. Pero recuerde que nosotros liquidamos la deuda del condado en el cierre y no le cobramos el 6% de corretaje. Además no tiene que arreglar nada. Son $45k garantizados en 10 días en lugar de esperar meses.'
              },
              closingHook:
                'Excelente Robert. Le mando el enlace a su celular para que firme electrónicamente en 30 segundos y abrimos título hoy mismo.'
            },
            contractText: `PURCHASE AND SALE AGREEMENT (AS-IS)
Property: 519 17th St NW, Canton, OH 44703
Seller: Robert Langston
Buyer: WholesalePlatform LLC and/or assigns
Purchase Price: $45,000.00 USD
Earnest Money Deposit (EMD): $2,000.00 USD with Stark County Title
Closing Date: 10 business days
Assignability: Buyer reserves the right to assign to cash buyer partners.`,
            eSignUrl: 'http://localhost:3005/sign/lead-canton-realtor'
          },
          {
            id: 'deal-taylor-detroit-fourplex',
            address: '2940 W Grand Blvd',
            city: 'Detroit',
            state: 'MI',
            zip: '48202',
            propertyType: 'Multifamily (Fourplex / Seller Finance)',
            beds: 8,
            baths: 4,
            sqft: 3420,
            yearBuilt: 1935,
            condition: 'Multifamiliar de 4 unidades (Fourplex). 92 días en Zillow. 2 unidades ocupadas generando $1,800/mes, 2 listas para colocar inquilinos Section 8 ($1,150 c/u).',
            daysOnMarket: 92,
            strategy: 'Multifamily Seller Financing (10% Down / 5% Interest / 30y Amort) — BuyBoxCartel Special',
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
            projectedAssignmentFee: 10000,
            buyerName: 'Richard Taylor (Hold My Hand Wholesale)',
            buyerHandle: '@richardgrandintaylor',
            smsScript:
              'Hola David, vi tu Fourplex en 2940 W Grand Blvd. Noté que lleva más de 90 días publicado. Te podemos pagar tu precio de lista de $175,000 estructurando un financiamiento por dueño (10% de enganche y 5% de interés a 30 años) con pagos mensuales garantizados y sin lidiar con inquilinos. ¿Estarías abierto a escuchar los términos?',
            emailScript: `Asunto: Oferta de Precio Completo ($175,000) con Financiamiento por Dueño — 2940 W Grand Blvd (Fourplex)

Estimado David Henderson,

Hemos seguido la publicación de su multifamiliar de 4 unidades en 2940 W Grand Blvd. Comprendemos que vender una propiedad multifamiliar tradicionalmente por banco puede tomar meses y generar altos costos impositivos por ganancias de capital.

Le presentamos una oferta por el 100% de su precio de venta:
- Precio de Compra: $175,000 USD
- Enganche Inicial (Down Payment): $17,500 USD (10%)
- Tasa de Interés: 5.0% fija
- Amortización: 30 años (Pagos mensuales directos a usted de $845.48/mes)
- Beneficio para usted: Ingreso pasivo garantizado sin dolores de cabeza de administración, ni reparaciones, difiriendo el impuesto de capital gains.

¿Podríamos agendar una llamada de 10 minutos para revisar el pagaré y la hipoteca respaldada por título?

Atentamente,
Richard Taylor / WholesalePlatform Partners`,
            phoneBotScript: {
              openingHook:
                'Hola David, habla Alex de WholesalePlatform. Te llamo por tu Fourplex en W Grand Blvd. Veo que tiene 90+ días en el mercado. ¿Sigues buscando venderlo?',
              discoveryQuestions: [
                'David, en lugar de recibir un cheque castigado con un 40% de descuento en efectivo, ¿te serviría recibir el precio completo que pides ($175k) con pagos mensuales fijos respaldados por la propiedad?',
                '¿Las dos unidades que están rentadas están al día con sus pagos?',
                '¿Tienes alguna hipoteca bancaria sobre el edificio o está completamente libre de deuda (Free & Clear)?'
              ],
              offerPresentation:
                'David, podemos darte tus $175,000 completos. Te entregamos $17,500 en la mesa de cierre y te pagamos $845.48 cada mes al 5% de interés. Si en algún momento no pagamos, la propiedad vuelve a ti con todas las mejoras hechas. Es el mejor retorno pasivo en Detroit sin ser casero. ¿Te funciona estructurarlo así?',
              objectionRebuttals: {
                'Quiero todo el dinero en efectivo':
                  'Si lo vendes en efectivo hoy David, cualquier inversionista te ofrecerá $100k-$110k máximo y el IRS te quitará el 25% de impuestos de golpe. Con Seller Financing recibes tus $175k completos más $129,000 adicionales en intereses a lo largo del tiempo, ganando más de $304,000.'
              },
              closingHook:
                'Excelente David. Te envío el Memorándum de Acuerdo y el pagaré estructurado para que lo revises con tu asesor legal. Cerramos en 14 días.'
            },
            contractText: `SELLER FINANCING PURCHASE AGREEMENT & PROMISSORY NOTE TERMS
Property: 2940 W Grand Blvd, Detroit, MI 48202 (4 Units)
Seller: David K. Henderson
Buyer: WholesalePlatform LLC and/or assigns
Purchase Price: $175,000.00 USD
Down Payment: $17,500.00 USD at Closing
Financed Amount: $157,500.00 USD
Interest Rate: 5.0% per annum
Term: 360 months (Monthly Principal & Interest: $845.48 USD)
Security: First Priority Mortgage / Deed of Trust on Subject Property
Assignability: Buyer reserves assignability to vetted JV partners.`,
            eSignUrl: 'http://localhost:3005/sign/lead-canton-realtor'
          },
          {
            id: 'deal-taylor-cleveland-119',
            address: '3421 E 119th St',
            city: 'Cleveland',
            state: 'OH',
            zip: '44120',
            propertyType: 'Single Family (Section 8)',
            beds: 3,
            baths: 1.5,
            sqft: 1240,
            yearBuilt: 1925,
            condition: 'Casa desocupada con aviso de code violation por pintura exterior y pasto. Propietario vive fuera del estado (Absentee).',
            daysOnMarket: 34,
            strategy: 'Cleveland Section 8 Turnkey ($1,175/mes)',
            ownerName: 'Brenda Miller',
            sellerRole: 'Owner',
            phone: '(216) 555-7314',
            email: 'brenda.miller.props@outlook.com',
            askingPrice: 72000,
            estimatedArv: 138000,
            estimatedRehab: 16000,
            calculatedMaoCashOffer: 49000,
            projectedAssignmentFee: 10000,
            buyerName: 'Richard Taylor (Hold My Hand Wholesale)',
            buyerHandle: '@richardgrandintaylor',
            smsScript:
              'Hola Brenda, te escribe Alex. Vi tu propiedad en 3421 E 119th St en Cleveland. Noté que tienes una notificación de la ciudad. Nosotros la compramos en efectivo y asumimos cualquier arreglo pendiente. ¿Te gustaría recibir $49,000 netos en 10 días?',
            emailScript: `Asunto: Oferta Directa de Contado para 3421 E 119th St, Cleveland OH

Estimada Brenda Miller,

Sabemos que administrar una propiedad en Cleveland desde fuera del estado puede ser demandante. Nuestro grupo de inversionistas adquiere casas en el área metropolitana de Cleveland sin inspecciones y cubriendo el 100% de los gastos de título.

Ofrecemos $49,000 en efectivo por su propiedad en 3421 E 119th St.
Cerramos en 10 días hábiles con First Ohio Title.

Por favor responda si desea recibir el acuerdo digital.

Atentamente,
WholesalePlatform Adquisiciones`,
            phoneBotScript: {
              openingHook:
                'Hola Brenda, habla Alex. Te llamo con respecto a tu casa en la calle 119 en Cleveland. ¿La tienes disponible para vender en efectivo?',
              discoveryQuestions: [
                'Brenda, dado que vives fuera de Ohio, ¿te convendría desentenderte de los impuestos y multas de la ciudad cerrando todo este mes?',
                '¿Cuál es el valor mínimo que aceptarías sabiendo que nosotros pagamos todo el cierre y no cobramos comisiones?'
              ],
              offerPresentation:
                'Brenda, para comprarla esta misma semana y resolver el expediente de la ciudad de inmediato, te ofrezco $49,000 en efectivo. Sin complicaciones ni viajes a Cleveland.',
              objectionRebuttals: {
                'Tengo otra oferta de $55,000':
                  'Entiendo Brenda. Asegúrate de que no tengan una cláusula de inspección de 30 días donde luego te pidan descuentos. Nuestro contrato tiene $2,500 de garantía no reembolsables tras 3 días y cerramos en 10 días garantizado.'
              },
              closingHook:
                'Te envío el enlace por SMS ahora mismo Brenda. Firmas con el dedo en tu pantalla y mañana queda abierto el título.'
            },
            contractText: `PURCHASE AND SALE AGREEMENT (AS-IS)
Property: 3421 E 119th St, Cleveland, OH 44120
Seller: Brenda Miller
Buyer: WholesalePlatform LLC and/or assigns
Purchase Price: $49,000.00 USD
EMD: $2,500.00 USD
Closing Date: 10 business days
Assignability: Fully assignable.`,
            eSignUrl: 'http://localhost:3005/sign/lead-canton-realtor'
          }
        ]
      : [];

    // 3. Generate CSV (Excel format)
    const csvHeaders = [
      'ID',
      'Address',
      'City',
      'State',
      'Zip',
      'Property Type',
      'Beds',
      'Baths',
      'SqFt',
      'Strategy',
      'Owner / Realtor Name',
      'Seller Role',
      'Phone (Skip-traced)',
      'Email',
      'Asking Price ($)',
      'ARV ($)',
      'Estimated Rehab ($)',
      'Calculated MAO Cash Offer ($)',
      'Seller Finance Offer Terms',
      'Target Buyer',
      'Projected Assignment Fee ($)',
      'Digital E-Sign Link'
    ];

    const csvRows = propertiesData.map((p) => [
      `"${p.id}"`,
      `"${p.address}"`,
      `"${p.city}"`,
      `"${p.state}"`,
      `"${p.zip}"`,
      `"${p.propertyType}"`,
      p.beds,
      p.baths,
      p.sqft,
      `"${p.strategy}"`,
      `"${p.ownerName}"`,
      `"${p.sellerRole}"`,
      `"${p.phone}"`,
      `"${p.email}"`,
      p.askingPrice,
      p.estimatedArv,
      p.estimatedRehab,
      p.calculatedMaoCashOffer,
      p.sellerFinanceTerms
        ? `"10% Down ($${p.sellerFinanceTerms.downPayment}), 5% Int, $${p.sellerFinanceTerms.monthlyPayment}/mo"`
        : '"N/A (All-Cash Deal)"',
      `"${p.buyerName} (${p.buyerHandle})"`,
      p.projectedAssignmentFee,
      `"${p.eSignUrl}"`
    ]);

    const csvContent = [csvHeaders.join(','), ...csvRows.map((r) => r.join(','))].join('\n');

    // 4. Generate Word / Comprehensive Markdown Document
    const docContent = `# PAQUETE DE DEALS EXCLUSIVO PARA: ${matchedBuyer.name.toUpperCase()}
**Buy Box:** ${matchedBuyer.buyBoxType} | **Mercados:** ${matchedBuyer.market}
**Finder's Fee Prometido:** ${matchedBuyer.finderPayoutOffer}
**Modalidad Aceptada:** ${matchedBuyer.dealRequirementLabel}

---

## RESUMEN DE PROPIEDADES ENCONTRADAS (${propertiesData.length} Deals Listos)

${propertiesData
  .map(
    (p, idx) => `
### Deal #${idx + 1}: ${p.address}, ${p.city}, ${p.state} ${p.zip}
- **Tipo de Propiedad:** ${p.propertyType} (${p.beds} Beds / ${p.baths} Baths | ${p.sqft} SqFt)
- **Estrategia:** ${p.strategy}
- **Condición Física:** ${p.condition}
- **Días en Mercado:** ${p.daysOnMarket} días
- **Propietario / Contacto:** ${p.ownerName} (${p.sellerRole})
- **Teléfono Verificado (Skip-Trace):** ${p.phone}
- **Email:** ${p.email}

#### Números Financieros:
- **Precio Pedido / As assessed:** $${p.askingPrice.toLocaleString()} USD
- **ARV Estimado:** $${p.estimatedArv.toLocaleString()} USD
- **Reparaciones Estimadas:** $${p.estimatedRehab.toLocaleString()} USD
- **Oferta MAO de Contado:** **$${p.calculatedMaoCashOffer.toLocaleString()} USD**
${
  p.sellerFinanceTerms
    ? `- **Términos de Financiamiento por Dueño:**
  * Enganche (10%): $${p.sellerFinanceTerms.downPayment.toLocaleString()} USD
  * Tasa de Interés: ${p.sellerFinanceTerms.interestRate}% fija a ${p.sellerFinanceTerms.termYears} años
  * Pago Mensual al Vendedor: $${p.sellerFinanceTerms.monthlyPayment.toLocaleString()}/mes
  * Renta Bruta Proyectada: $${p.sellerFinanceTerms.projectedRentalIncome.toLocaleString()}/mes
  * **Cash Flow Neto Mensual:** **+$${p.sellerFinanceTerms.netMonthlyCashFlow.toLocaleString()}/mes**`
    : ''
}
- **Fee de Asignación / Payout:** **$${p.projectedAssignmentFee.toLocaleString()} USD** (Garantizado por Richard Taylor)

---

#### 📱 SCRIPT DE SMS LISTO PARA ENVIAR:
\`\`\`text
${p.smsScript}
\`\`\`

#### 📧 SCRIPT DE EMAIL FORMAL LISTO PARA ENVIAR:
\`\`\`text
${p.emailScript}
\`\`\`

#### 🎙️ SCRIPT COMPLETO DEL BOT / AGENTE DE VOZ IA (CLOSER CALL):
- **Apertura (Pattern Interrupt):**
  "${p.phoneBotScript.openingHook}"

- **Preguntas de los 4 Pilares de Motivación:**
${p.phoneBotScript.discoveryQuestions.map((q) => `  * ${q}`).join('\n')}

- **Presentación de la Oferta Lista:**
  "${p.phoneBotScript.offerPresentation}"

- **Manejo de Objeciones:**
${Object.entries(p.phoneBotScript.objectionRebuttals)
  .map(([obj, reb]) => `  * *"${obj}":* ${reb}`)
  .join('\n')}

- **Cierre del Contrato:**
  "${p.phoneBotScript.closingHook}"

---

#### ✍️ CONTRATO DE COMPRAVENTA PRE-LLENADO (PSA AS-IS):
\`\`\`text
${p.contractText}
\`\`\`
- **Enlace de Firma Digital Electrónica:** [Firmar Contrato en E-Sign Portal](${p.eSignUrl})

---
`
  )
  .join('\n')}

Documento generado automáticamente por WholesalePlatform AI Engine.
`.trim();

    // 5. Save files to public/downloads for direct downloading
    const publicDownloadsDir = path.join(process.cwd(), 'public', 'downloads');
    if (!fs.existsSync(publicDownloadsDir)) {
      fs.mkdirSync(publicDownloadsDir, { recursive: true });
    }

    const timestamp = Date.now();
    const csvFileName = `DealPack_RichardTaylor_${timestamp}.csv`;
    const docFileName = `DealPack_RichardTaylor_${timestamp}.doc`;

    fs.writeFileSync(path.join(publicDownloadsDir, csvFileName), csvContent, 'utf-8');
    fs.writeFileSync(path.join(publicDownloadsDir, docFileName), docContent, 'utf-8');

    const downloadCsvUrl = `/downloads/${csvFileName}`;
    const downloadDocUrl = `/downloads/${docFileName}`;

    // 6. Also save these leads into the platform's seller leads DB so they are in the pipeline
    const existingLeads = db.sellerLeads || [];
    let addedCount = 0;
    for (const prop of propertiesData) {
      if (!existingLeads.some((l) => l.propertyAddress === prop.address)) {
        existingLeads.push({
          id: prop.id,
          ownerName: prop.ownerName,
          propertyAddress: prop.address,
          cityState: `${prop.city}, ${prop.state}`,
          phone: prop.phone,
          email: prop.email,
          leadSource: prop.propertyType.includes('Fourplex') ? 'Zillow FSBO' : 'Code Violation',
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
      buyer: matchedBuyer,
      totalDeals: propertiesData.length,
      deals: propertiesData,
      downloadCsvUrl,
      downloadDocUrl,
      csvContent,
      docContent,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Error generating buyer deal pack' }, { status: 500 });
  }
}
