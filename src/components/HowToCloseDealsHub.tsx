'use client';

import React, { useState } from 'react';
import {
  FileText,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Building,
  DollarSign,
  Download,
  Copy,
  ExternalLink,
  ChevronRight,
  AlertTriangle,
  Send,
  Eye,
  FileCheck,
  FolderLock,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Users
} from 'lucide-react';

interface ClosingStep {
  id: number;
  title: string;
  subtitle: string;
  timeline: string;
  responsible: string;
  description: string;
  requiredDocs: string[];
  exactActions: string[];
  warningNote: string;
  proTip: string;
}

export default function HowToCloseDealsHub() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [selectedDocId, setSelectedDocId] = useState<string>('psa');
  const [copiedDoc, setCopiedDoc] = useState<boolean>(false);
  const [buyerFee, setBuyerFee] = useState<number>(15000);
  const [contractPrice, setContractPrice] = useState<number>(120000);
  const [sellerName, setSellerName] = useState<string>('John Doe');
  const [propertyAddr, setPropertyAddr] = useState<string>('742 Evergreen Terrace, Orlando, FL 32801');
  const [endBuyer, setEndBuyer] = useState<string>('Premier Sunshine Flippers LLC');

  const todayStr = new Date().toISOString().split('T')[0];

  const closingSteps: ClosingStep[] = [
    {
      id: 1,
      title: 'Paso 1: Poner la Propiedad Bajo Contrato (El "A-to-B")',
      subtitle: 'Firma del Purchase & Sale Agreement (PSA) con el Propietario',
      timeline: 'Día 1 (Durante la llamada)',
      responsible: 'Wholesaler (Tú) + Vendedor Motivado',
      description:
        'Apenas acuerdas el precio neto en la llamada telefónica, debes enviar inmediatamente el Purchase & Sale Agreement (PSA) simple de 1-2 páginas. La regla de oro de Zach Ginn es: "Nunca cuelgues el teléfono diciendo te lo mando mañana". El vendedor debe abrirlo en su celular y firmarlo mientras sigues en línea respondiendo sus dudas.',
      requiredDocs: [
        'Purchase & Sale Agreement (PSA de 1 a 2 páginas)',
        'Lead Sheet con los 4 Pilares calificados',
        'Addendum de Acceso para Inspección'
      ],
      exactActions: [
        'Verificar que en la casilla "Buyer" diga: AI Automated Services LLC and/or assigns.',
        'Fijar un Inspection Period de 10 a 14 días hábiles (tu cláusula de escape segura al 100%).',
        'Estipular un Earnest Money Deposit (EMD) bajo ($10 a $100 USD) pagadero a la compañía de título tras el período de inspección.',
        'Incluir la cláusula de "AS-IS" para que el vendedor entienda que no reparará nada ni pagará comisiones de Realtor.'
      ],
      warningNote:
        'CUIDADO: Nunca uses contratos extensos de 15 páginas de agentes de bienes raíces (MLS/FAR-BAR). Asustan a vendedores no sofisticados. Usa el PSA simple de FreeWholesaling.',
      proTip:
        'Pro-Tip de Zach Ginn: "Dile al vendedor: Te estoy mandando un acuerdo simple de 2 páginas al correo. Ábrelo en tu teléfono ahora mismo, lo revisamos juntos en 90 segundos y dejamos esto sellado para quitarte el estrés de la casa hoy mismo".'
    },
    {
      id: 2,
      title: 'Paso 2: Abrir Escrow con Investor-Friendly Title Company',
      subtitle: 'Envío del PSA a la Compañía de Título o Abogado de Cierre',
      timeline: 'Día 1 - Día 2 (Primeras 24 horas)',
      responsible: 'Wholesaler (Tú) -> Title Company / Closing Attorney',
      description:
        'Apenas ambas partes firman el PSA, envías el PDF firmado por correo a tu compañía de título o Closing Attorney amigable con inversionistas. Ellos abren la cuenta de custodia (Escrow), inician la búsqueda de título (Title Search) y verifican que la propiedad no tenga gravámenes o juicios ocultos.',
      requiredDocs: [
        'PSA firmado por ambas partes (PDF)',
        'Information Sheet de la propiedad y datos de contacto de las partes',
        'Copia del cheque o recibo del EMD ($100)'
      ],
      exactActions: [
        'Enviar correo al oficial de depósito: "Attached is an executed Purchase Agreement for [Address]. Please open escrow, initiate title search and municipal lien search."',
        'Solicitar a la compañía de título el "Preliminary Title Commitment" (estudio preliminar de gravámenes).',
        'Avisar al vendedor que la compañía de título se comunicará en breve para verificar cómo desea recibir sus fondos (cheque de gerencia o transferencia Wire).'
      ],
      warningNote:
        'CUIDADO: Nunca uses una compañía de título tradicional de retail que no trabaje con inversionistas. Si preguntas "¿Hacen Assignment of Contract?" y dudan o dicen que no, busca de inmediato una compañía recomendada en foros locales o grupos de Facebook de Real Estate.',
      proTip:
        'Las compañías como Gold Key Title, First American o Chicago Title (en sus ramas comerciales/inversionistas) entienden que tú cobrarás un Assignment Fee y no te pedirán fondos propios para comprar.'
    },
    {
      id: 3,
      title: 'Paso 3: Inspección, Marketing y Selección del Cash Buyer',
      subtitle: 'Fotos de la propiedad y comercialización a tu lista de Compradores',
      timeline: 'Días 3 al 7 (Dentro del Inspection Period)',
      responsible: 'Wholesaler (Tú) -> Inversionistas / Flippers / Builders',
      description:
        'Durante los 10-14 días de inspección, coordinas la toma de 25-35 fotos del inmueble (o mandas un fotógrafo local / TaskRabbit / familiar por $50 si es virtual). Empaquetas el "Deal Pack" con precio de contrato, ARV y reparaciones estimadas, y lo mandas a tus compradores en efectivo.',
      requiredDocs: [
        'Deal One-Pager (Resumen de la Oportunidad)',
        'Carpeta de Google Drive / Dropbox con 30+ fotos claras',
        'Cálculo de Comps vendidas y estimado de remodelación'
      ],
      exactActions: [
        'Filtrar en tu plataforma a los Cash Buyers del código postal que busquen ese tipo de activo.',
        'Enviar SMS/Email: "Off-market deal in [Zip Code]. [Beds/Baths]. Contract price: $135k cash. ARV: $210k. Title opened. First to deposit $3k-$5k EMD gets the contract."',
        'Organizar una ventana única de visita de 1 hora ("Open House de Inversionistas") para que todos los compradores vayan a la vez y sientan urgencia competitiva.'
      ],
      warningNote:
        'NUNCA lleves compradores diciendo que eres el broker o dueño de la propiedad. Presenta a tus compradores como tus socios de inspección o contratistas autorizados bajo la cláusula 6 de acceso del PSA.',
      proTip:
        'Pro-Tip: La urgencia de ver a otros 3 inversionistas caminando la propiedad al mismo tiempo hace que el comprador firme el contrato de cesión ese mismo día.'
    },
    {
      id: 4,
      title: 'Paso 4: Firmar el Assignment of Contract y Cobrar el EMD Grande',
      subtitle: 'El contrato "B-to-C" que te garantiza tu Assignment Fee de $10,000+',
      timeline: 'Días 7 al 10',
      responsible: 'Wholesaler (Tú) + Cash Buyer Final',
      description:
        'Cuando el inversionista final acepta comprar la casa, le haces firmar el "Assignment of Real Estate Purchase and Sale Agreement". Mediante este contrato, le cedes tus derechos de compra a cambio de tu comisión (Assignment Fee). Para que el trato sea 100% legal y blindado, el comprador DEBE depositar un Earnest Money NO reembolsable de $2,500 a $5,000 en la compañía de título.',
      requiredDocs: [
        'Assignment of Contract (Contrato de Cesión de 1 página)',
        'Copia del PSA original (anexado como Exhibit A)',
        'Recibo de transferencia del EMD ($3,000+) en Escrow'
      ],
      exactActions: [
        'Llenar el Assignment Agreement estipulando claramente el monto de tu Assignment Fee (ej. $15,000).',
        'Estipular que el comprador debe depositar su EMD no reembolsable en menos de 24 horas hábiles.',
        'Enviar el Assignment Agreement firmado por ambas partes inmediatamente a la compañía de título.'
      ],
      warningNote:
        'REGLA DE HIERRO: Un comprador NO es tu comprador real hasta que su EMD de $2,500 o más esté físicamente depositado en la cuenta de la compañía de título. Si no deposita en 24 horas, cancelas y pasas al siguiente comprador.',
      proTip:
        'Si tu Assignment Fee es muy grande (ej. $30,000 o más) y crees que el comprador final intentará renegociar al ver cuánto ganas, puedes hacer un "Double Closing" (cierre doble el mismo día).'
    },
    {
      id: 5,
      title: 'Paso 5: Mesa de Cierre, Firma del HUD-1 / ALTA y Cobro del Cheque (Wire)',
      subtitle: 'La Compañía de Título Liquida los Fondos y te Transfiere tu Ganancia',
      timeline: 'Día 14 al Día 21 (Closing Date)',
      responsible: 'Title Company -> Mobile Notary / RON -> Wholesaler ($ Wire)',
      description:
        'Llegó el día del cierre. El vendedor NO tiene que viajar ni ir a una oficina física: la compañía de título contrata un Mobile Notary (Notario Móvil que va hasta la casa o trabajo del vendedor con los papeles impresos) o realizan un Remote Online Notary (RON / Notaría por Video llamada). El vendedor firma la escritura (Deed) ante el notario. El comprador transfiere los fondos de compra a Escrow y la compañía de título emite el documento oficial ALTA / HUD-1 donde liquida y envía tu Assignment Fee directo a la cuenta bancaria de tu LLC.',
      requiredDocs: [
        'ALTA Settlement Statement / HUD-1 Closing Statement',
        'Special Warranty Deed o Quitclaim Deed (firmada ante Notario Móvil / RON)',
        'Instrucciones de Transferencia Bancaria (Wire Instructions de AI Automated Services LLC)',
        'Formulario W-9 de tu LLC para impuestos federales de EE.UU.'
      ],
      exactActions: [
        'Pedir a la compañía de título: "Please dispatch a Mobile Notary to the seller\'s address or set up Remote Online Notarization (RON)."',
        'Revisar el borrador del Settlement Statement 24 horas antes del cierre para verificar que tu Assignment Fee esté exacto en la línea correspondiente.',
        'El Notario Móvil recolecta la firma del vendedor y devuelve el paquete firmado a la Title Company con envío nocturno (FedEx/UPS Overnight).',
        'La Title Company confirma la recepción, dispersa el dinero al vendedor y emite la transferencia bancaria (Wire) de tu ganancia neta a AI Automated Services LLC.'
      ],
      warningNote:
        'CUIDADO CON EL FRAUDE BANCARIO: Nunca envíes instrucciones bancarias por texto informal. Confirma siempre por teléfono con el oficial de cierre las instrucciones antes de autorizar transferencias.',
      proTip:
        'El costo del Mobile Notary (usualmente $125 - $200 USD) se cobra como gasto de cierre al comprador final en el HUD-1, por lo que a ti te cuesta $0.'
    }
  ];

  const documentsVault: Record<
    string,
    { title: string; category: string; description: string; template: string }
  > = {
    psa: {
      title: '1. Purchase & Sale Agreement (PSA) Simple de 1-2 Páginas',
      category: 'Contrato Vendedor (A-to-B)',
      description:
        'El contrato estándar de FreeWholesaling.com y Zach Ginn. Redactado en lenguaje claro, protege 100% al wholesaler mediante el período de inspección y la cláusula "and/or assigns".',
      template: `REAL ESTATE PURCHASE AND SALE AGREEMENT (WHOLESALE AS-IS)
Date: ${todayStr}

1. PARTIES:
Seller(s): ${sellerName} ("Seller")
Mailing Address: __________________________________________________
Phone: _______________________ Email: ____________________________

Buyer: AI Automated Services LLC and/or assigns ("Buyer")
Address: _________________________________________________________

2. PROPERTY:
Seller hereby agrees to sell and Buyer agrees to purchase the real property commonly known as:
Address: ${propertyAddr}
Legal Description: As recorded in County Public Records.
Together with all fixtures, built-in appliances, and appurtenances attached thereto in strictly "AS-IS, WHERE-IS" condition.

3. PURCHASE PRICE & FINANCING:
Total Purchase Price: $${contractPrice.toLocaleString()} USD (Payable in 100% CASH or immediately available funds at closing).
Earnest Money Deposit (EMD): $100.00 USD to be held in escrow with the closing agent within 3 business days following the expiration of the Inspection Period.

4. CLOSING DATE & TITLE COMPANY:
Closing shall take place on or before: 30 days from effective date, or earlier if mutually agreed.
Closing shall be conducted by an investor-friendly Title Company / Closing Attorney chosen by Buyer.
Seller agrees to convey good, marketable title by Warranty Deed, free and clear of all liens, mortgages, back taxes, and encumbrances (to be paid off by Seller from sale proceeds at closing).

5. INSPECTION & DUE DILIGENCE PERIOD (BUYER CONTINGENCY):
Buyer shall have fourteen (14) business days from the Effective Date ("Inspection Period") to inspect the Property, review title, and verify condition. If Buyer, in Buyer's sole and absolute discretion, determines the Property is not suitable for Buyer's intended use, Buyer may cancel this Agreement by written notice to Seller prior to the expiration of the Inspection Period, whereupon all obligations shall terminate and any EMD shall be immediately refunded to Buyer.

6. ACCESS FOR INSPECTIONS:
Seller agrees to provide Buyer, Buyer's partners, contractors, inspectors, and designated assignees reasonable access to the property during normal business hours during the Inspection Period.

7. ASSIGNMENT:
Buyer reserves the unrestricted right to assign this Agreement, in whole or in part, to any third-party buyer, partner, or entity without prior consent of Seller. Upon assignment, the original Buyer shall be released from further liability.

8. SPECIAL PROVISIONS / CLOSING COSTS:
Buyer agrees to pay all standard closing costs (recording fees, escrow fees, and settlement fees). Seller is responsible solely for satisfaction of existing mortgages, liens, and prorated property taxes up to the date of closing.

SELLER(S):
Signature: _________________________________  Date: __________________
Printed Name: ${sellerName}

BUYER:
Signature: _________________________________  Date: __________________
Printed Name: AI Automated Services LLC and/or assigns`
    },
    assignment: {
      title: '2. Assignment of Real Estate Purchase Agreement',
      category: 'Contrato Comprador Final (B-to-C)',
      description:
        'El documento legal mediante el cual transfieres tus derechos del contrato al inversionista final a cambio de tu Assignment Fee (Ganancia neta). Exige un EMD no reembolsable de $2,500 - $5,000.',
      template: `ASSIGNMENT OF REAL ESTATE PURCHASE AND SALE AGREEMENT

This Assignment of Real Estate Purchase Agreement ("Assignment") is entered into on ${todayStr}, by and between:
Assignor: AI Automated Services LLC and/or assigns ("Assignor")
Assignee: ${endBuyer} ("Assignee")

RECITALS:
A. Assignor entered into a certain Purchase and Sale Agreement dated ${todayStr} ("Original Agreement") as Buyer with ${sellerName} ("Original Seller") for the purchase of the real property located at:
${propertyAddr} ("Property") at the original contract purchase price of $${contractPrice.toLocaleString()} USD.

B. Assignor desires to assign all of its right, title, and interest in the Original Agreement to Assignee, and Assignee desires to assume all rights and obligations of Buyer thereunder.

TERMS & CONDITIONS:
1. ASSIGNMENT FEE:
In consideration of this Assignment, Assignee agrees to pay Assignor an Assignment Fee in the total amount of:
$${buyerFee.toLocaleString()} USD (United States Dollars).
The Assignment Fee shall be paid directly to Assignor at closing through the Title Company Escrow as shown on the Final Settlement Statement (HUD-1 / ALTA).

2. TOTAL PURCHASE CONSIDERATION:
- Original Purchase Price to Seller: $${contractPrice.toLocaleString()} USD
- Assignment Fee to Assignor: $${buyerFee.toLocaleString()} USD
- Total Purchase Price to Assignee: $${(contractPrice + buyerFee).toLocaleString()} USD (plus standard buyer closing costs).

3. NON-REFUNDABLE EARNEST MONEY DEPOSIT (EMD):
Assignee shall deposit a NON-REFUNDABLE Earnest Money Deposit of $3,000.00 USD with the closing Title Company within twenty-four (24) hours of executing this Assignment. Failure to wire said deposit within 24 hours shall render this Assignment null and void at Assignor's sole discretion.

4. "AS-IS" PURCHASE & INSPECTION WAIVER:
Assignee acknowledges they have conducted all physical inspections, due diligence, and financial analysis. Assignee agrees to accept the Property in strictly "AS-IS, WHERE-IS" condition with zero contingencies for inspection, appraisal, or financing.

5. CLOSING DATE & OBLIGATION:
Assignee agrees to close on or before the closing date stipulated in the Original Agreement. Time is of the essence.

ASSIGNOR:
AI Automated Services LLC and/or assigns
Signature: __________________________________ Date: _________________

ASSIGNEE:
${endBuyer}
Signature: __________________________________ Date: _________________`
    },
    alta: {
      title: '3. ALTA Settlement Statement / HUD-1 (Línea de Desembolso)',
      category: 'Documento Oficial de Liquidación en Título',
      description:
        'El resumen financiero preparado por la compañía de título el día del cierre. Aquí se muestra exactamente a dónde va cada dólar y se garantiza el pago de tu Assignment Fee.',
      template: `ALTA SETTLEMENT STATEMENT (COMBINED - BUYER & SELLER)
Title Company: Escrow & Title Partners of Florida / Closing Office
Escrow File No: FL-2026-09841
Property Address: ${propertyAddr}
Closing Date: ${todayStr}

================================================================================
FINANCIAL SUMMARY (SETTLEMENT BREAKDOWN):
================================================================================

A. SELLER TRANSACTION DETAILS:
  Contract Sales Price: ........................... $${contractPrice.toLocaleString()}.00
  Less Payoff of First Mortgage (Chase Bank): .... ($0.00) (Free & Clear)
  Less County Property Tax Prorations (YTD): ...... ($420.50)
  Less City Code Enforcement Lien Resolution: ..... ($0.00)
  ------------------------------------------------------------------------------
  NET PROCEEDS DUE TO SELLER: ..................... $${(contractPrice - 420.5).toLocaleString()}.00

B. ASSIGNOR (WHOLESALER) DISBURSEMENT LINE:
  LINE 508 / 1305: "Assignment Fee paid to
  AI Automated Services LLC": ..................... $${buyerFee.toLocaleString()}.00 (NET WIRE)

C. ASSIGNEE (CASH BUYER) CHARGES:
  Purchase Price to Seller: ....................... $${contractPrice.toLocaleString()}.00
  Assignment Fee to Assignor: ..................... $${buyerFee.toLocaleString()}.00
  Title Insurance & Closing Fees: ................. $1,450.00
  Recording Fees (County Clerk): .................. $185.00
  ------------------------------------------------------------------------------
  TOTAL CASH TO CLOSE REQUIRED FROM BUYER: ........ $${(contractPrice + buyerFee + 1635).toLocaleString()}.00
  Less Earnest Money Deposit on Deposit: ......... ($3,000.00)
  ------------------------------------------------------------------------------
  FINAL WIRE REQUIRED FROM CASH BUYER: ............ $${(contractPrice + buyerFee + 1635 - 3000).toLocaleString()}.00

APPROVED AND ACCEPTED:
Title Officer: _______________________ Date: ${todayStr}
Seller: _____________________________ Date: ${todayStr}
Buyer: ______________________________ Date: ${todayStr}
Assignor (AI Automated Services LLC): Date: ${todayStr}`
    },
    email_title: {
      title: '4. Plantilla de Correo para Abrir Escrow con la Compañía de Título',
      category: 'Comunicación Operativa',
      description:
        'Copia y pega este correo para enviar el contrato recién firmado a tu compañía de título de inmediato.',
      template: `Subject: New Escrow Opening - Purchase Agreement: ${propertyAddr}

Hello Title Team,

Please find attached the fully executed Purchase and Sale Agreement for the subject property:

- Property Address: ${propertyAddr}
- Seller Name: ${sellerName}
- Buyer: AI Automated Services LLC and/or assigns
- Contract Purchase Price: $${contractPrice.toLocaleString()} USD
- Target Closing Date: On or before 30 days from today

Please open escrow, order the title commitment (title search), municipal lien search, and tax certificate. 
We will be assigning this contract to an end cash buyer within our 14-day inspection window and will furnish the executed Assignment Agreement and Buyer EMD receipt shortly.

Please reply with the escrow file number and your wire instructions for our records.

Best regards,

Acquisitions & Closing Dept.
AI Automated Services LLC and/or assigns
Email: acquisitions@aiautomatedservices.com
Direct: (555) 019-2834`
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedDoc(true);
    setTimeout(() => setCopiedDoc(false), 2000);
  };

  const downloadTextFile = (title: string, text: string) => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.replace(/[^a-zA-Z0-9]/g, '_')}_${todayStr}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Guía Maestra de Cierres (FreeWholesaling + Zach Ginn)
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-mono">
                Documentos 100% Blindados
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Cómo se Cierran Deals de Principio a Fin
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              El proceso cronológico exacto desde la llamada donde el vendedor dice &quot;sí&quot; hasta que la
              compañía de título envía tu transferencia bancaria (Wire) de $10,000+ a tu LLC.
              Incluye todos los documentos, contratos y correos listos para copiar y firmar.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 sm:p-5 text-right shrink-0 w-full lg:w-auto shadow-inner">
            <div className="text-xs text-slate-400 font-medium">Entidad Legal de Contratos</div>
            <div className="text-sm font-extrabold text-emerald-400 font-mono">
              AI Automated Services LLC
            </div>
            <div className="text-xs text-slate-400 font-mono">and/or assigns</div>
            <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-end gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              100% Asignable & Sin Riesgo Financiero
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Simulator Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Configurador Rápido de Contrato para los Documentos
            </h2>
          </div>
          <span className="text-xs text-slate-400">
            Cambia estos valores y se actualizarán automáticamente en todos los contratos abajo
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="block text-slate-400 font-medium mb-1">Nombre del Vendedor:</label>
            <input
              type="text"
              value={sellerName}
              onChange={(e) => setSellerName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-medium focus:border-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-400 font-medium mb-1">Dirección de la Propiedad:</label>
            <input
              type="text"
              value={propertyAddr}
              onChange={(e) => setPropertyAddr(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-medium focus:border-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-400 font-medium mb-1">Precio Contratado con Vendedor ($):</label>
            <input
              type="number"
              value={contractPrice}
              onChange={(e) => setContractPrice(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-emerald-400 font-bold focus:border-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-400 font-medium mb-1">Tu Assignment Fee Deseado ($):</label>
            <input
              type="number"
              value={buyerFee}
              onChange={(e) => setBuyerFee(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-emerald-400 font-bold focus:border-indigo-500 outline-none"
            />
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Precio Total para el Cash Buyer:</span>
            <span className="text-sm font-extrabold text-white bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
              ${(contractPrice + buyerFee).toLocaleString()} USD
            </span>
          </div>
          <div className="text-emerald-400 font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            Tu Ganancia Neta Asegurada en Cierre: ${buyerFee.toLocaleString()} USD
          </div>
        </div>
      </div>

      {/* SECTION 1: 5-STEP TIMELINE */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-400" />
              Cronograma Operativo: Los 5 Pasos para Cerrar el Deal
            </h2>
            <p className="text-xs text-slate-400">
              Haz clic en cada paso para ver las acciones exactas, documentos necesarios y advertencias clave.
            </p>
          </div>
        </div>

        {/* Step Navigation Pill Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {closingSteps.map((step) => {
            const isCurrent = activeStep === step.id;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`text-left p-3.5 rounded-2xl border transition relative overflow-hidden flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-slate-900 border-indigo-500 ring-2 ring-indigo-500/30 shadow-lg shadow-indigo-500/10'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-md ${
                        isCurrent ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      PASO {step.id}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{step.timeline}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white line-clamp-2 leading-snug">
                    {step.title.split(':')[1] || step.title}
                  </h4>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center text-[10px] text-slate-400">
                  <span className="truncate">{step.responsible.split('->')[0]}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Step Detail Box */}
        {(() => {
          const step = closingSteps.find((s) => s.id === activeStep) || closingSteps[0];
          return (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold">
                      Fase {step.id} de 5
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
                      ⏱ {step.timeline}
                    </span>
                    <span className="text-xs text-slate-400">
                      Responsables: <strong className="text-white">{step.responsible}</strong>
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-white">{step.title}</h3>
                  <p className="text-xs text-indigo-300 font-medium">{step.subtitle}</p>
                </div>
              </div>

              <div className="text-sm text-slate-300 leading-relaxed bg-slate-950/70 rounded-2xl p-4 border border-slate-800/80">
                {step.description}
              </div>

              {/* Grid 2 Cols: Docs & Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3 bg-slate-950/50 rounded-2xl p-5 border border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                    <FileCheck className="w-4 h-4" />
                    Documentos Requeridos en este Paso
                  </h4>
                  <ul className="space-y-2">
                    {step.requiredDocs.map((doc, idx) => (
                      <li key={idx} className="text-xs text-slate-200 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3 bg-slate-950/50 rounded-2xl p-5 border border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-2">
                    <ArrowRight className="w-4 h-4" />
                    Acciones Exactas que Debes Tomar
                  </h4>
                  <ul className="space-y-2">
                    {step.exactActions.map((act, idx) => (
                      <li key={idx} className="text-xs text-slate-200 flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Warning & ProTip */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <p>{step.warningNote}</p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-200 flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <p>{step.proTip}</p>
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* SECTION 2: THE VAULT OF ALL CLOSING DOCUMENTS */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
              <FolderLock className="w-5 h-5 text-emerald-400" />
              Bóveda de Documentos & Plantillas de Cierre
            </h2>
            <p className="text-xs text-slate-400">
              Genera, copia y descarga cada documento listo para firmar o enviar por correo a la compañía de título.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {Object.keys(documentsVault).map((key) => {
              const doc = documentsVault[key];
              const isSelected = selectedDocId === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedDocId(key)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  {doc.title.split('.')[1]?.trim().split('(')[0]?.trim() || doc.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Document Workspace */}
        {(() => {
          const doc = documentsVault[selectedDocId] || documentsVault.psa;
          return (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300">
                      {doc.category}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Formato Estándar de FreeWholesaling.com
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-white">{doc.title}</h3>
                  <p className="text-xs text-slate-300">{doc.description}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => copyToClipboard(doc.template)}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition"
                  >
                    {copiedDoc ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        Copiado
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-slate-400" />
                        Copiar Texto
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => downloadTextFile(doc.title, doc.template)}
                    className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-lg shadow-emerald-600/20"
                  >
                    <Download className="w-4 h-4" />
                    Descargar .txt
                  </button>
                </div>
              </div>

              {/* Document Preview Box */}
              <div className="relative">
                <pre className="w-full bg-slate-950 text-slate-200 font-mono text-[11px] sm:text-xs p-5 rounded-2xl border border-slate-800/80 overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-[450px]">
                  {doc.template}
                </pre>
              </div>
            </div>
          );
        })()}
      </div>

      {/* SECTION 3: FREQUENT CLOSING QUESTIONS & CRITICAL SAFEGUARDS */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-indigo-400" />
          Preguntas Críticas y Blindaje Legal en el Cierre
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
            <h4 className="font-extrabold text-white flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              ¿Qué pasa si no encuentro un Cash Buyer en los 14 días?
            </h4>
            <p className="text-slate-300 leading-relaxed">
              Gracias a la cláusula de <strong>Inspection Period (Contingencia de Inspección)</strong>, puedes
              enviar una notificación escrita por correo al vendedor antes de que venzan los 14 días diciendo:
              <em> &quot;Lamentablemente tras nuestra inspección técnica los costos de reparación exceden nuestro
              presupuesto; por ende cancelamos el contrato y se libera el depósito.&quot;</em> No pierdes dinero, no
              te pueden demandar y tu riesgo financiero es $0.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
            <h4 className="font-extrabold text-white flex items-center gap-1.5">
              <Users className="w-4 h-4 text-emerald-400" />
              ¿Cómo cobra la LLC el Assignment Fee legalmente?
            </h4>
            <p className="text-slate-300 leading-relaxed">
              No recibes un maletín de efectivo ni pagos directos del comprador por Zelle. <strong>El 100% de los
              fondos pasan por la cuenta Escrow de la Title Company.</strong> La compañía de título deduce el dinero
              del comprador final y emite una transferencia oficial bancaria (Wire) directamente a la cuenta de
              tu empresa (<code>AI Automated Services LLC</code>) respaldada por el documento HUD-1 / ALTA.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
            <h4 className="font-extrabold text-white flex items-center gap-1.5">
              <Building className="w-4 h-4 text-sky-400" />
              ¿Cómo encontrar una Investor-Friendly Title Company en cualquier condado?
            </h4>
            <p className="text-slate-300 leading-relaxed">
              Entra a los grupos de Facebook de Real Estate del condado objetivo (ej. <em>&quot;Orlando Real Estate
              Investors&quot;</em>) y busca en la barra: <em>&quot;Title company wholesaler assignment&quot;</em>.
              Llama a las 3 más recomendadas y hazles una sola pregunta:
              <em> &quot;Hi, do you work with real estate investors and handle assignment contracts?&quot;</em> Si
              responden con entusiasmo y conocen el proceso, esa es tu compañía de título.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
            <h4 className="font-extrabold text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              ¿Por qué es vital el depósito EMD no reembolsable del comprador?
            </h4>
            <p className="text-slate-300 leading-relaxed">
              Muchos supuestos inversionistas firman acuerdos y luego desaparecen. Exigir <strong>$3,000 o $5,000
              de EMD no reembolsable depositados en menos de 24 horas</strong> en la compañía de título separa de
              inmediato a los aficionados de los verdaderos compradores que tienen el dinero listo para cerrar.
            </p>
          </div>
        </div>
      </div>
      {/* SECTION 4: DIRECTORIO DE COMPAÑÍAS DE TÍTULO & NOTARÍAS MÓVILES / ONLINE (RON) */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                Directorio Oficial Verificado
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Mencionado por Zach Ginn & FreeWholesaling
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white mt-1">
              Empresas de Notaría Móvil, Notaría Online (RON) y Title Companies para Cerrar
            </h3>
            <p className="text-xs text-slate-300">
              Estas son las empresas exactas que procesan las firmas a domicilio del vendedor y cierran contratos de Wholesale de forma 100% remota.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Snapdocs */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md">
                  Notaría Móvil Líder en USA
                </span>
                <span className="text-[11px] text-slate-400">100k+ Notarios</span>
              </div>
              <h4 className="text-sm font-bold text-white">Snapdocs (Snapdocs.com)</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                La plataforma #1 utilizada por compañías de título para despachar <strong>Notarios Móviles (Mobile Notaries)</strong>. Envían a un notario certificado con los documentos impresos directamente a la sala de la casa del vendedor en cualquier código postal de EE.UU.
              </p>
            </div>
            <a
              href="https://www.snapdocs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 pt-2 border-t border-slate-800/80"
            >
              Visitar Snapdocs.com <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Proof / Notarize */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-md">
                  Notaría Online por Video (RON)
                </span>
                <span className="text-[11px] text-slate-400">100% Digital</span>
              </div>
              <h4 className="text-sm font-bold text-white">Proof (Antes Notarize.com)</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                La plataforma líder de <strong>Remote Online Notarization (RON)</strong> en EE.UU. El vendedor se conecta por videollamada desde su celular o computadora, muestra su ID, y el notario sella la escritura (Deed) digitalmente en 10 minutos. Legal en casi todos los 50 estados.
              </p>
            </div>
            <a
              href="https://www.proof.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 pt-2 border-t border-slate-800/80"
            >
              Visitar Proof.com <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* SigningAgent.com */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded-md">
                  Directorio Nacional NNA
                </span>
                <span className="text-[11px] text-slate-400">Oficial</span>
              </div>
              <h4 className="text-sm font-bold text-white">SigningAgent.com (NNA)</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                El directorio oficial de la <strong>National Notary Association</strong>. Si tu vendedor vive en un área rural o lejana, puedes buscar por código postal y contratar directamente a un Notario Móvil certificado para que vaya a su puerta por $100-$150.
              </p>
            </div>
            <a
              href="https://www.signingagent.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 pt-2 border-t border-slate-800/80"
            >
              Visitar SigningAgent.com <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Gold Key Title */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-md">
                  Investor-Friendly Title Co
                </span>
                <span className="text-[11px] text-slate-400">Nacional</span>
              </div>
              <h4 className="text-sm font-bold text-white">Gold Key Title & Escrow</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Compañía de título especializada en <strong>Wholesaling, Assignment of Contract y Double Closings</strong>. Coordinan el Notario Móvil automáticamente y depositan tu Assignment Fee vía Wire directo a AI Automated Services LLC.
              </p>
            </div>
            <a
              href="https://www.goldkeytc.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 pt-2 border-t border-slate-800/80"
            >
              Visitar GoldKeyTC.com <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Blueprint Title */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-sky-400 bg-sky-500/10 px-2.5 py-0.5 rounded-md">
                  Cierres Digitales Tech
                </span>
                <span className="text-[11px] text-slate-400">Multi-Estado</span>
              </div>
              <h4 className="text-sm font-bold text-white">Blueprint Title (Cierres 100% Online)</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Agencia de título moderna construida específicamente para inversionistas y compradores institucionales. Permite seguimiento del depósito de Escrow en tiempo real y gestiona cierres con contratos de cesión sin trabas burocráticas.
              </p>
            </div>
            <a
              href="https://www.blueprinttitle.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 pt-2 border-t border-slate-800/80"
            >
              Visitar BlueprintTitle.com <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* SignNow / DocuSign */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-pink-400 bg-pink-500/10 px-2.5 py-0.5 rounded-md">
                  Firma Electrónica Inmediata
                </span>
                <span className="text-[11px] text-slate-400">Teléfono / SMS</span>
              </div>
              <h4 className="text-sm font-bold text-white">SignNow / DocuSign / PandaDoc</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Para el <strong>Paso 1 (PSA)</strong> y <strong>Paso 4 (Assignment)</strong> no se necesita notario; se requiere firma electrónica inmediata. Subes el texto generado en esta bóveda y el vendedor o comprador lo firma con el dedo desde su celular en segundos.
              </p>
            </div>
            <a
              href="https://www.signnow.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 pt-2 border-t border-slate-800/80"
            >
              Visitar SignNow.com <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
