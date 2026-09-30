'use client';

import React, { useState } from 'react';
import {
  PhoneCall,
  MessageSquare,
  Mail,
  FileCheck2,
  Plus,
  Volume2,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  Download,
  ExternalLink,
  Loader2,
  ShieldCheck,
  RefreshCw,
  AlertTriangle,
  FileText,
  SlidersHorizontal,
} from 'lucide-react';
import {
  MotivatedSellerLead,
  SkillDatabase,
  VerifiedCashBuyer,
} from '@/types/skill';

interface SellerAcquisitionPipelineProps {
  leads: MotivatedSellerLead[];
  cashBuyers: VerifiedCashBuyer[];
  onDatabaseUpdated: (db: SkillDatabase) => void;
}

export default function SellerAcquisitionPipeline({
  leads,
  cashBuyers,
  onDatabaseUpdated,
}: SellerAcquisitionPipelineProps) {
  const [selectedLeadId, setSelectedLeadId] = useState<string>(
    leads[0]?.id || ''
  );
  const [showAddForm, setShowAddForm] = useState(false);
  const [newOwner, setNewOwner] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newSource, setNewSource] =
    useState<MotivatedSellerLead['leadSource']>('Tax Foreclosure GIS');
  const [newArv, setNewArv] = useState('300000');
  const [newArrears, setNewArrears] = useState('15000');

  const [sellerObjection, setSellerObjection] = useState('');
  const [aiRebuttal, setAiRebuttal] = useState('');
  const [loadingRebuttal, setLoadingRebuttal] = useState(false);
  const [generatingContract, setGeneratingContract] = useState(false);
  const [customAgreedPrice, setCustomAgreedPrice] = useState<string>('');
  const [selectedBuyerForDeal, setSelectedBuyerForDeal] = useState<string>(
    cashBuyers[0]?.name || ''
  );
  const [copiedKey, setCopiedKey] = useState('');

  // Multi-Bot Contingency States (Plan B & Plan C)
  const [activeBotTab, setActiveBotTab] = useState<'initial' | 'plan_b' | 'plan_c'>('initial');
  const [priceReduction, setPriceReduction] = useState<string>('12000');
  const [executingPlanB, setExecutingPlanB] = useState<boolean>(false);
  const [executingPlanC, setExecutingPlanC] = useState<boolean>(false);
  const [generatedAddendum, setGeneratedAddendum] = useState<string>('');
  const [generatedRelease, setGeneratedRelease] = useState<string>('');

  const selectedLead =
    leads.find((l) => l.id === selectedLeadId) || leads[0] || null;

  const copyToClipboard = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(''), 2200);
  };

  const speakPitch = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleAddLead = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/seller-outreach', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'add_lead',
        ownerName: newOwner,
        propertyAddress: newAddress,
        cityState: newCity,
        phone: newPhone,
        email: newEmail,
        leadSource: newSource,
        estimatedArv: Number(newArv),
        askingOrAssessedPrice: Number(newArv),
        taxOrMortgageArrears: Number(newArrears),
      }),
    });
    const data = await res.json();
    if (res.ok && data.db) {
      onDatabaseUpdated(data.db);
      setSelectedLeadId(data.lead.id);
      setShowAddForm(false);
      setNewOwner('');
      setNewAddress('');
    }
  };

  const handleMarkContacted = async (leadId: string) => {
    const res = await fetch('/api/seller-outreach', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'mark_contacted', leadId }),
    });
    const data = await res.json();
    if (res.ok && data.db) {
      onDatabaseUpdated(data.db);
    }
  };

  const handleAskObjectionRebuttal = async (presetObjection?: string) => {
    if (!selectedLead) return;
    const objText = presetObjection || sellerObjection;
    setLoadingRebuttal(true);
    try {
      const res = await fetch('/api/seller-outreach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'handle_seller_objection',
          leadId: selectedLead.id,
          sellerObjection: objText,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setAiRebuttal(data.aiRebuttal || '');
        if (data.db) onDatabaseUpdated(data.db);
      }
    } finally {
      setLoadingRebuttal(false);
    }
  };

  const handleSellerSaidYes = async () => {
    if (!selectedLead) return;
    setGeneratingContract(true);
    try {
      const finalPrice =
        Number(customAgreedPrice) || selectedLead.recommendedMaoOffer;
      const res = await fetch('/api/seller-outreach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'deal_agreed_generate_contract',
          leadId: selectedLead.id,
          agreedPrice: finalPrice,
          assignedBuyerName:
            selectedBuyerForDeal || selectedLead.assignedBuyerName,
          assignmentFee: selectedLead.assignmentFeeProjected || 15000,
        }),
      });
      const data = await res.json();
      if (res.ok && data.db) {
        onDatabaseUpdated(data.db);
      }
    } finally {
      setGeneratingContract(false);
    }
  };

  if (!selectedLead) return null;

  const smsTemplate = `Hi ${selectedLead.ownerName.split(' ')[0]}, quick question — have you considered parting with your property at ${selectedLead.propertyAddress} (${selectedLead.cityState})? My partner and I can pay off any existing taxes/liens, cover 100% of closing costs, and offer $${selectedLead.lowball60Offer.toLocaleString()} - $${selectedLead.recommendedMaoOffer.toLocaleString()} CASH As-Is so you don't have to repair or clean anything. Let me know if you're open to a quick 2-minute chat!`;

  const emailSubject = `Cash Offer for ${selectedLead.propertyAddress}, ${selectedLead.cityState} (No Commissions / As-Is)`;
  const emailBody = `Hi ${selectedLead.ownerName},

I was reviewing properties in ${selectedLead.cityState} and wanted to reach out directly regarding ${selectedLead.propertyAddress}.

We buy properties directly in cash and can offer you a fast, guaranteed closing:
- Preliminary Cash Offer Range: $${selectedLead.lowball60Offer.toLocaleString()} to $${selectedLead.recommendedMaoOffer.toLocaleString()} USD
- Existing Tax / Mortgage Arrears ($${selectedLead.taxOrMortgageArrears.toLocaleString()}): Paid off directly at closing through our Title Company so your credit is protected and you walk away with cash in hand.
- Condition: 100% AS-IS (no repairs, no cleaning, and $0 realtor commissions).

Reply to this email or call/text me directly if you'd like me to send over our simple 1-page Purchase & Sale Agreement today.

Best regards,
AI Automated Services LLC Acquisitions Team`;

  const winningCallScript = `1. APERTURA DE EMPATÍA Y AUTORIDAD (Inglés / Español):
"Hi ${selectedLead.ownerName}, this is Alex with AI Automated Services LLC. I know I'm calling out of the blue, but I was looking at ${selectedLead.propertyAddress} in ${selectedLead.cityState} and saw the upcoming status. I wanted to reach out personally because my partners and I can give you a fast cash offer, pay off the $${selectedLead.taxOrMortgageArrears.toLocaleString()} balance at closing, and help you transition to your next spot without losing your equity or hurting your credit."

2. LOS 4 PILARES + ANCLAJE INVERSO DE PRECIO (REVERSE PRICE ANCHOR):
"Because we buy 100% AS-IS—meaning you don't touch the roof, you don't paint, and you can even leave behind any unwanted items—and we pay all title & closing fees through our Title Company... my financial partner originally had our cash offer at $${selectedLead.lowball60Offer.toLocaleString()}."

3. EL CIERRE GANADOR (SUBIDA AL MAO PARA QUE DIGA "SÍ" EN LA LLAMADA):
"Look, I know $${selectedLead.lowball60Offer.toLocaleString()} is conservative, and I really want to make this work for you today. If I go to bat for you right now and get my partner to approve $${selectedLead.recommendedMaoOffer.toLocaleString()} net to you (plus paying all closing costs), would you be ready to sign our simple 1-page Purchase Agreement on your email right now while we're on the phone?"`;

  const redNum = Number(priceReduction) || 12000;
  const currentAgreedBase = Number(selectedLead.agreedPrice || selectedLead.recommendedMaoOffer || 62000);
  const planBDropPrice = Math.max(10000, currentAgreedBase - redNum);

  const planBCallScript = `1. REPORTE TÉCNICO DE INSPECCIÓN Y ENLACE DE CONFIANZA:
"Hola ${selectedLead.ownerName}, te habla Alex de AI Automated Services LLC sobre ${selectedLead.propertyAddress}. Te llamo con una actualización directa: nuestro equipo de contratistas e inspectores acaba de completar la inspección física en el sitio."

2. EL DESCUBRIMIENTO TÉCNICO Y EL VETO DE LOS SOCIOS ($${redNum.toLocaleString()} EXTRA):
"La estructura general está sólida, pero al revisar la calefacción y el ático, los contratistas encontraron daños imprevistos graves: la caldera tiene fisura y el techo trasero tiene vigas podridas que demandan $${redNum.toLocaleString()} de reparación imprevista. Por esa razón, mis socios y el comité de adquisiciones se negaron a autorizar el cierre al precio pactado y me ordenaron cancelar bajo la cláusula de inspección."

3. LA OFERTA DE COMPROMISO GANADORA (HAIRCUT QUE PROTEGE TUS $10,000):
"Sin embargo, ${selectedLead.ownerName}, sé que quieres cerrar rápido y sin comisiones de realtor. Luché con mis socios y logré que acepten esto: Si ajustamos el precio a $${planBDropPrice.toLocaleString()} netos en tu mano con un Addendum simple de 1 página, tengo la autorización para renunciar a cualquier otra contingencia y cerrar la próxima semana en efectivo con la compañía de título. ¿Aceptas el ajuste para asegurar el cierre?"

4. DERRIBO DE OBJECIÓN:
"Si cancelamos y buscas otro comprador tradicional, el inspector del banco encontrará exactamente este problema en la caldera y techo, y el banco no le prestará dinero a menos que tú pagues $15,000 de tu bolsillo. Con nosotros tienes $${planBDropPrice.toLocaleString()} garantizados la próxima semana."

5. TIE-DOWN DIGITAL:
"¿Te mando el Price Amendment Addendum a tu teléfono ahora mismo para que lo firmes con el dedo en la pantalla y mantengamos la fecha de cierre?"`;

  const planBSmsTemplate = `Hola ${selectedLead.ownerName.split(' ')[0]}, soy Alex de AI Automated Services LLC. Nuestro equipo técnico finalizó la inspección en ${selectedLead.propertyAddress}. Se encontraron reparaciones imprevistas en techo y caldera por $${redNum.toLocaleString()}. Mis socios aprueban cerrar en 7 días al contado si ajustamos a $${planBDropPrice.toLocaleString()} netos en mano. Te envié el Addendum por correo. ¿Hablamos 2 minutos?`;

  const planCCallScript = `1. NOTIFICACIÓN RESPETUOSA DE INSPECCIÓN:
"Hola ${selectedLead.ownerName}, te habla Alex de AI Automated Services LLC respecto a ${selectedLead.propertyAddress}. Espero que te encuentres muy bien hoy."

2. CONCLUSIÓN DEL PERIODO DE DUE DILIGENCE (SECCIÓN 4):
"Te llamo para darte una actualización formal sobre nuestro periodo de inspección bajo la Sección 4 de nuestro contrato. Como sabes, nuestro plazo de 14 días vence esta semana. Nuestro comité de inversión y peritos evaluaron las cotizaciones de remodelación y lamentablemente determinaron que los costos superan nuestros parámetros de suscripción, por lo que han decidido no proceder con la compra."

3. LIBERACIÓN INMEDIATA DEL TÍTULO Y REEMBOLSO DEL EMD (RIESGO $0):
"Bajo la Sección 4, te estamos enviando formalmente la Cancelación y Liberación Mutua (Mutual Release) hoy mismo. Esto libera de inmediato cualquier derecho sobre la propiedad para que puedas venderla a quien gustes, e instruye a la compañía de título a reembolsar nuestro depósito de garantía sin penalidad. Te agradecemos sinceramente tu tiempo y amabilidad."

4. PUERTA ABIERTA:
"Si en el futuro cambian tus circunstancias o necesitas una oferta en efectivo, por favor guarda mi número directo. ¡Muchos éxitos con la propiedad!"`;

  const planCSmsTemplate = `Hola ${selectedLead.ownerName.split(' ')[0]}, soy Alex de AI Automated Services LLC. Siguiendo el periodo de inspección en ${selectedLead.propertyAddress}, nuestros socios no pudieron validar los costos técnicos de remodelación. Hemos firmado y enviado la Cancelación y Liberación Mutua a la compañía de título para liberar tu propiedad de inmediato. Muchas gracias por tu amabilidad.`;

  const handleRunPlanB = async () => {
    if (!selectedLead) return;
    setExecutingPlanB(true);
    try {
      const res = await fetch('/api/seller-outreach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'renegotiate_price_drop',
          leadId: selectedLead.id,
          reductionAmount: redNum,
          newPrice: planBDropPrice,
        }),
      });
      const data = await res.json();
      if (res.ok && data.addendumText) {
        setGeneratedAddendum(data.addendumText);
        if (data.db) onDatabaseUpdated(data.db);
      }
    } finally {
      setExecutingPlanB(false);
    }
  };

  const handleRunPlanC = async () => {
    if (!selectedLead) return;
    setExecutingPlanC(true);
    try {
      const res = await fetch('/api/seller-outreach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'cancel_and_release',
          leadId: selectedLead.id,
          reason: 'Costos de remodelación exceden parámetros de suscripción técnica según Sección 4',
        }),
      });
      const data = await res.json();
      if (res.ok && data.mutualReleaseText) {
        setGeneratedRelease(data.mutualReleaseText);
        if (data.db) onDatabaseUpdated(data.db);
      }
    } finally {
      setExecutingPlanC(false);
    }
  };

  const downloadContract = () => {
    if (!selectedLead.signedContractText) return;
    const blob = new Blob([selectedLead.signedContractText], {
      type: 'text/plain;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PSA_and_Assignment_${selectedLead.propertyAddress.replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadAddendum = () => {
    const textToDownload = generatedAddendum || (selectedLead as any).priceAddendumText;
    if (!textToDownload) return;
    const blob = new Blob([textToDownload], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Price_Amendment_Addendum_${selectedLead.propertyAddress.replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadRelease = () => {
    const textToDownload = generatedRelease || (selectedLead as any).mutualReleaseText;
    if (!textToDownload) return;
    const blob = new Blob([textToDownload], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Cancellation_Mutual_Release_${selectedLead.propertyAddress.replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950/50 border border-sky-500/30 rounded-2xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 font-semibold">
            Sistema Automatizado: Lead → SMS & Email → Agente de Llamadas Cerrador → Contrato con Cláusula de Tercero
          </span>
          <h2 className="text-xl font-extrabold text-white mt-1">
            Centro de Cierre de Vendedores Motivados (Outreach + Voz IA + Auto-Contrato)
          </h2>
          <p className="text-xs text-slate-400">
            Envía SMS/Email a los dueños detectados, ejecuta la llamada con el Script Cerrador y, en cuanto diga &ldquo;SÍ&rdquo;, elabora el contrato con la cláusula de asignación a un tercer comprador.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-sky-600/25 transition"
        >
          <Plus className="w-4 h-4" />
          Agregar Nuevo Vendedor Motivado
        </button>
      </div>

      {/* Add New Seller Lead Modal/Form */}
      {showAddForm && (
        <form
          onSubmit={handleAddLead}
          className="bg-slate-900 border border-sky-500/40 rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3"
        >
          <input
            type="text"
            required
            placeholder="Nombre del Propietario"
            value={newOwner}
            onChange={(e) => setNewOwner(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
          />
          <input
            type="text"
            required
            placeholder="Dirección Propiedad (Ej: 4920 Kistler Ave)"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
          />
          <input
            type="text"
            required
            placeholder="Ciudad, Estado (Ej: Charlotte, NC)"
            value={newCity}
            onChange={(e) => setNewCity(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
          />
          <input
            type="text"
            placeholder="Teléfono (Skip Traced)"
            value={newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
          />
          <input
            type="email"
            placeholder="Email del Propietario"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
          />
          <select
            value={newSource}
            onChange={(e) =>
              setNewSource(
                e.target.value as MotivatedSellerLead['leadSource']
              )
            }
            className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
          >
            <option value="Tax Foreclosure GIS">Tax Foreclosure GIS</option>
            <option value="Pre-Foreclosure Auction">Pre-Foreclosure Auction</option>
            <option value="Zillow FSBO">Zillow FSBO</option>
            <option value="Code Violation">Code Violation</option>
            <option value="Vacant Land">Vacant Land</option>
            <option value="Zillow Assumable 2.8%">Zillow Assumable 2.8%</option>
          </select>
          <input
            type="number"
            placeholder="Valor ARV ($)"
            value={newArv}
            onChange={(e) => setNewArv(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
          />
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Deuda / Impuestos ($)"
              value={newArrears}
              onChange={(e) => setNewArrears(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold"
            >
              Guardar
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Seller Leads List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            Leads de Vendedores Motivados ({leads.length})
          </div>
          {leads.map((lead) => {
            const isSelected = lead.id === selectedLead.id;
            return (
              <button
                key={lead.id}
                onClick={() => {
                  setSelectedLeadId(lead.id);
                  setCustomAgreedPrice(String(lead.recommendedMaoOffer));
                  setAiRebuttal('');
                }}
                className={`w-full text-left p-4 rounded-2xl border transition ${
                  isSelected
                    ? 'bg-slate-900 border-sky-500 shadow-lg shadow-sky-500/10'
                    : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-sky-500/15 text-sky-300 border border-sky-500/30">
                    {lead.leadSource}
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      lead.status === 'deal_agreed_yes'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : lead.status === 'in_call'
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {lead.status === 'deal_agreed_yes'
                      ? '¡DIJO SÍ! CONTRATO LISTO'
                      : lead.status === 'in_call'
                      ? 'EN LLAMADA'
                      : lead.status === 'contacted_sms_email'
                      ? 'SMS/EMAIL ENVIADO'
                      : 'NUEVO LEAD'}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white">
                  {lead.propertyAddress}
                </h3>
                <p className="text-xs text-slate-400 mb-2">
                  {lead.cityState} • {lead.ownerName}
                </p>

                <div className="grid grid-cols-3 gap-1.5 text-[11px] bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <div>
                    <span className="text-slate-500 block">Valor/ARV</span>
                    <strong className="text-white">
                      ${lead.estimatedArv.toLocaleString()}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Oferta 60%</span>
                    <strong className="text-amber-400">
                      ${lead.lowball60Offer.toLocaleString()}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Tu MAO</span>
                    <strong className="text-emerald-400">
                      ${lead.recommendedMaoOffer.toLocaleString()}
                    </strong>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Active Outreach (SMS + Email) + AI Voice Call Closer + 1-Click Contract */}
        <div className="lg:col-span-8 space-y-6">
          {/* Multi-Bot Strategy & Contingency Switcher */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Control de Bots Telefónicos & Salidas de Contingencia
                </span>
                <h3 className="text-sm font-bold text-white">
                  Selecciona el Bot Activo para {selectedLead.ownerName}:
                </h3>
              </div>
              <div className="text-xs text-slate-300 font-mono bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                Entidad: <strong className="text-emerald-400">AI Automated Services LLC</strong>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setActiveBotTab('initial')}
                className={`p-3 rounded-xl border text-left transition ${
                  activeBotTab === 'initial'
                    ? 'bg-amber-500/15 border-amber-500 text-white shadow-lg shadow-amber-500/10'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <PhoneCall className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold text-amber-400">BOT 1: ADQUISICIÓN</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-snug">
                  Llamada Richard Taylor: 4 Pilares + Reverse Anchor para cerrar en vivo.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setActiveBotTab('plan_b')}
                className={`p-3 rounded-xl border text-left transition ${
                  activeBotTab === 'plan_b'
                    ? 'bg-sky-500/15 border-sky-500 text-white shadow-lg shadow-sky-500/10'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <RefreshCw className="w-4 h-4 text-sky-400" />
                  <span className="text-xs font-bold text-sky-400">BOT 2: PLAN B (RENEGOCIAR)</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-snug">
                  Inspection Price Drop: Veto de socios por reparaciones y Addendum de Enmienda.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setActiveBotTab('plan_c')}
                className={`p-3 rounded-xl border text-left transition ${
                  activeBotTab === 'plan_c'
                    ? 'bg-rose-500/15 border-rose-500 text-white shadow-lg shadow-rose-500/10'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span className="text-xs font-bold text-rose-400">BOT 3: PLAN C (CANCELAR)</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-snug">
                  Walk Away formal bajo la cláusula de inspección con 100% de reembolso de EMD.
                </p>
              </button>
            </div>
          </div>

          {/* Card 1: SMS & Email Direct Outreach */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-bold text-sky-400">
                  {activeBotTab === 'initial'
                    ? 'PASO 1: CONTACTO AUTOMÁTICO POR SMS Y CORREO (OFERTA DIRECTA)'
                    : activeBotTab === 'plan_b'
                    ? 'PLAN B: SMS Y CORREO DE RENEGOCIACIÓN POR REPARACIONES TÉCNICAS'
                    : 'PLAN C: SMS Y CORREO DE CANCELACIÓN FORMAL Y LIBERACIÓN MUTUA'}
                </span>
                <h3 className="text-base font-bold text-white">
                  {selectedLead.ownerName} — {selectedLead.propertyAddress} ({selectedLead.phone})
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <a
                  href="https://voice.google.com/u/0/messages"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleMarkContacted(selectedLead.id)}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Abrir Google Voice SMS
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href={`mailto:${selectedLead.email}?subject=${encodeURIComponent(
                    activeBotTab === 'plan_b'
                      ? `Addendum de Inspección — Ajuste de Precio a $${planBDropPrice.toLocaleString()} — ${selectedLead.propertyAddress}`
                      : activeBotTab === 'plan_c'
                      ? `Notificación de Cancelación de Inspección — ${selectedLead.propertyAddress}`
                      : emailSubject
                  )}&body=${encodeURIComponent(
                    activeBotTab === 'plan_b'
                      ? `Hola ${selectedLead.ownerName},\n\nAdjuntamos el Addendum de Ajuste de Precio tras el reporte técnico de inspección. Reduciendo a $${planBDropPrice.toLocaleString()} netos en efectivo, liberamos todas las contingencias y cerramos la próxima semana.\n\nAI Automated Services LLC`
                      : activeBotTab === 'plan_c'
                      ? `Estimado ${selectedLead.ownerName},\n\nLe notificamos formalmente que bajo la Sección 4 del contrato de compraventa, el informe de inspección y cotizaciones de remodelación no fueron aprobados por nuestro comité de adquisiciones. Adjuntamos la Cancelación y Liberación Mutua para devolver el depósito en título.\n\nAI Automated Services LLC`
                      : emailBody
                  )}`}
                  onClick={() => handleMarkContacted(selectedLead.id)}
                  className="px-3 py-1.5 rounded-xl bg-sky-600/20 hover:bg-sky-600/30 text-sky-300 border border-sky-500/30 text-xs font-bold flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Enviar Email Directo
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400">
                    {activeBotTab === 'plan_b' ? 'SMS Plan B (Ajuste de Precio)' : activeBotTab === 'plan_c' ? 'SMS Plan C (Liberación)' : 'Mensaje de Texto (SMS Anti-Spam)'}
                  </span>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        'sms',
                        activeBotTab === 'plan_b'
                          ? planBSmsTemplate
                          : activeBotTab === 'plan_c'
                          ? planCSmsTemplate
                          : smsTemplate
                      )
                    }
                    className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-200 flex items-center gap-1"
                  >
                    {copiedKey === 'sms' ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                    {copiedKey === 'sms' ? 'Copiado' : 'Copiar SMS'}
                  </button>
                </div>
                <p className="text-xs text-slate-300 font-mono leading-relaxed">
                  {activeBotTab === 'plan_b'
                    ? planBSmsTemplate
                    : activeBotTab === 'plan_c'
                    ? planCSmsTemplate
                    : smsTemplate}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-sky-400">
                    {activeBotTab === 'plan_b' ? 'Email Plan B (Addendum)' : activeBotTab === 'plan_c' ? 'Email Plan C (Notificación)' : 'Correo Electrónico de Oferta'}
                  </span>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        'email',
                        activeBotTab === 'plan_b'
                          ? `Hola ${selectedLead.ownerName},\n\nAdjuntamos el Addendum de Enmienda de Precio tras el reporte técnico de contratistas en ${selectedLead.propertyAddress}. Reduciendo a $${planBDropPrice.toLocaleString()} netos, liberamos todas las contingencias y cerramos la próxima semana sin comisiones.\n\nAI Automated Services LLC`
                          : activeBotTab === 'plan_c'
                          ? `Estimado ${selectedLead.ownerName},\n\nLe notificamos formalmente que bajo la Sección 4 del contrato de compraventa, el informe de inspección y remodelación no fue aprobado por nuestro comité. Adjuntamos la Liberación Mutua formal.\n\nAI Automated Services LLC`
                          : emailBody
                      )
                    }
                    className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-200 flex items-center gap-1"
                  >
                    {copiedKey === 'email' ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                    {copiedKey === 'email' ? 'Copiado' : 'Copiar Email'}
                  </button>
                </div>
                <p className="text-xs text-slate-300 font-mono leading-relaxed line-clamp-5">
                  {activeBotTab === 'plan_b'
                    ? `Estimado ${selectedLead.ownerName}: Tras el reporte técnico de inspección, adjuntamos Addendum para cerrar en $${planBDropPrice.toLocaleString()} netos en 7 días.`
                    : activeBotTab === 'plan_c'
                    ? `Estimado ${selectedLead.ownerName}: Notificación formal de cancelación bajo Sección 4 de inspección y Liberación Mutua para la compañía de título.`
                    : emailBody}
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: AI Voice Call Closer & Script Ganador */}
          <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className={`p-2 rounded-xl ${
                  activeBotTab === 'plan_b'
                    ? 'bg-sky-500/20 text-sky-400'
                    : activeBotTab === 'plan_c'
                    ? 'bg-rose-500/20 text-rose-400'
                    : 'bg-amber-500/20 text-amber-400'
                }`}>
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <span className={`text-xs font-bold ${
                    activeBotTab === 'plan_b'
                      ? 'text-sky-400'
                      : activeBotTab === 'plan_c'
                      ? 'text-rose-400'
                      : 'text-amber-400'
                  }`}>
                    {activeBotTab === 'plan_b'
                      ? 'BOT PLAN B: RENEGOCIACIÓN DE PRECIO ("THE INSPECTION DROP")'
                      : activeBotTab === 'plan_c'
                      ? 'BOT PLAN C: CANCELACIÓN LIMPIA ("WALK AWAY / 100% EMD")'
                      : 'BOT 1: AGENTE DE ADQUISICIONES & SCRIPT CERRADOR (4 PILARES)'}
                  </span>
                  <h3 className="text-base font-bold text-white">
                    Llamada Activa con {selectedLead.ownerName} ({selectedLead.phone})
                  </h3>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() =>
                    speakPitch(
                      activeBotTab === 'plan_b'
                        ? planBCallScript
                        : activeBotTab === 'plan_c'
                        ? planCCallScript
                        : winningCallScript
                    )
                  }
                  className={`px-3.5 py-2 rounded-xl text-white text-xs font-bold flex items-center gap-1.5 transition ${
                    activeBotTab === 'plan_b'
                      ? 'bg-sky-600 hover:bg-sky-500 shadow-md shadow-sky-600/20'
                      : activeBotTab === 'plan_c'
                      ? 'bg-rose-600 hover:bg-rose-500 shadow-md shadow-rose-600/20'
                      : 'bg-amber-600 hover:bg-amber-500 shadow-md shadow-amber-600/20'
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                  Escuchar Voz del Bot Seleccionado
                </button>
                <button
                  type="button"
                  onClick={() =>
                    copyToClipboard(
                      'script',
                      activeBotTab === 'plan_b'
                        ? planBCallScript
                        : activeBotTab === 'plan_c'
                        ? planCCallScript
                        : winningCallScript
                    )
                  }
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5"
                >
                  {copiedKey === 'script' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  Copiar Script
                </button>
              </div>
            </div>

            {/* Plan B Extra Control: Price Drop Customizer */}
            {activeBotTab === 'plan_b' && (
              <div className="p-3 bg-slate-950 rounded-xl border border-sky-500/30 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-slate-300">
                  Monto de Rebaja por Inspección:
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-rose-400 font-bold">-$</span>
                  <input
                    type="number"
                    value={priceReduction}
                    onChange={(e) => setPriceReduction(e.target.value)}
                    className="w-24 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white font-bold"
                  />
                  <span className="text-xs text-slate-400">→ Nuevo Precio Objetivo:</span>
                  <strong className="text-emerald-400 text-sm">${planBDropPrice.toLocaleString()} USD</strong>
                </div>
              </div>
            )}

            <pre className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-slate-200 font-mono whitespace-pre-wrap leading-relaxed">
              {activeBotTab === 'plan_b'
                ? planBCallScript
                : activeBotTab === 'plan_c'
                ? planCCallScript
                : winningCallScript}
            </pre>

            {/* Interactive Objection Handler */}
            {activeBotTab === 'initial' && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  Asistente de Objeciones en Vivo (Haz clic en lo que te diga el vendedor para obtener la respuesta cerradora):
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    `Tu oferta de $${selectedLead.lowball60Offer.toLocaleString()} es muy baja, quiero más dinero`,
                    'Prefiero listarla con un Realtor tradicional',
                    '¿Cómo sé que ustedes son reales y van a pagar mis impuestos atrasados?',
                    'Déjame pensarlo y hablarlo con mi familia la próxima semana',
                  ].map((obj, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setSellerObjection(obj);
                        handleAskObjectionRebuttal(obj);
                      }}
                      className="text-xs px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-indigo-950 text-indigo-300 border border-indigo-500/30 transition"
                    >
                      &ldquo;{obj}&rdquo;
                    </button>
                  ))}
                </div>

                {loadingRebuttal && (
                  <div className="text-xs text-indigo-300 flex items-center gap-2 py-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generando respuesta ganadora para cerrar al vendedor...
                  </div>
                )}

                {aiRebuttal && (
                  <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/40 text-xs text-slate-200 whitespace-pre-wrap font-mono leading-relaxed">
                    {aiRebuttal}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Card 3: Contingency Legal Document Generator */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/50 border border-emerald-500/40 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  {activeBotTab === 'plan_b'
                    ? 'DOCUMENTO PLAN B: PRICE AMENDMENT ADDENDUM (REDUCCIÓN DE PRECIO)'
                    : activeBotTab === 'plan_c'
                    ? 'DOCUMENTO PLAN C: CANCELLATION AND MUTUAL RELEASE (LIBERACIÓN 100% EMD)'
                    : 'PASO 3: EL VENDEDOR DIJO "SÍ" → AUTO-ELABORACIÓN DEL CONTRATO PSA AS-IS'}
                </span>
                <h3 className="text-lg font-extrabold text-white mt-0.5">
                  {activeBotTab === 'plan_b'
                    ? `Elaborar Addendum de Inspección (Nuevo Precio: $${planBDropPrice.toLocaleString()})`
                    : activeBotTab === 'plan_c'
                    ? `Liberar Contrato y Devolver Depósito de Garantía (Riesgo $0)`
                    : 'Generar Purchase & Sale Agreement + Cláusula de Asignación a Terceros'}
                </h3>
                <p className="text-xs text-slate-400">
                  {activeBotTab === 'plan_b'
                    ? 'Enmienda de 1 página que reduce el precio de compra tras la inspección técnica manteniendo protegidos tus $10,000 de ganancia.'
                    : activeBotTab === 'plan_c'
                    ? 'Notificación legal bajo la Sección 4 que extingue el contrato y ordena a la Title Company reembolsar el 100% de tu depósito.'
                    : 'Incluye la cláusula de asignación ("AI Automated Services LLC and/or assigns"), 14 días de inspección y contrato de cesión.'}
                </p>
              </div>
            </div>

            {/* BOT 1 Controls (Initial Agreement) */}
            {activeBotTab === 'initial' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Precio Final Acordado con Vendedor ($)
                  </label>
                  <input
                    type="number"
                    value={customAgreedPrice || selectedLead.recommendedMaoOffer}
                    onChange={(e) => setCustomAgreedPrice(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm font-bold text-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Tercer Comprador (Cash Buyer Asignado)
                  </label>
                  <select
                    value={selectedBuyerForDeal}
                    onChange={(e) => setSelectedBuyerForDeal(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    {cashBuyers.map((cb) => (
                      <option key={cb.id} value={cb.name}>
                        {cb.name} ({cb.buyBoxType})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={handleSellerSaidYes}
                    disabled={generatingContract}
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition"
                  >
                    {generatingContract ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <FileCheck2 className="w-4 h-4" />
                        ¡Dijo SÍ! Elaborar Contrato Final
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* BOT 2 Controls (Plan B Price Amendment Addendum) */}
            {activeBotTab === 'plan_b' && (
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleRunPlanB}
                  disabled={executingPlanB}
                  className="py-2.5 px-5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-sky-600/30 transition"
                >
                  {executingPlanB ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4" />
                      Generar Price Amendment Addendum a ${planBDropPrice.toLocaleString()}
                    </>
                  )}
                </button>
              </div>
            )}

            {/* BOT 3 Controls (Plan C Clean Cancellation & Release) */}
            {activeBotTab === 'plan_c' && (
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleRunPlanC}
                  disabled={executingPlanC}
                  className="py-2.5 px-5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-rose-600/30 transition"
                >
                  {executingPlanC ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <AlertTriangle className="w-4 h-4" />
                      Emitir Cancelación Limpia & Liberar Depósito EMD al 100%
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Document display for Plan B */}
            {activeBotTab === 'plan_b' && (generatedAddendum || (selectedLead as any).priceAddendumText) && (
              <div className="space-y-3 pt-3 border-t border-slate-800">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-xs font-bold text-sky-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Price Amendment Addendum Elaborado (${planBDropPrice.toLocaleString()})
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        copyToClipboard('addendum', generatedAddendum || (selectedLead as any).priceAddendumText)
                      }
                      className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5"
                    >
                      {copiedKey === 'addendum' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      {copiedKey === 'addendum' ? 'Copiado' : 'Copiar Addendum'}
                    </button>
                    <button
                      onClick={downloadAddendum}
                      className="text-xs px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Descargar Addendum (.txt)
                    </button>
                  </div>
                </div>
                <pre className="bg-slate-950 border border-sky-500/40 rounded-xl p-4 text-xs text-slate-200 font-mono whitespace-pre-wrap max-h-96 overflow-y-auto">
                  {generatedAddendum || (selectedLead as any).priceAddendumText}
                </pre>
              </div>
            )}

            {/* Document display for Plan C */}
            {activeBotTab === 'plan_c' && (generatedRelease || (selectedLead as any).mutualReleaseText) && (
              <div className="space-y-3 pt-3 border-t border-slate-800">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Cancellation and Mutual Release Document Listo para Escrow
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        copyToClipboard('release', generatedRelease || (selectedLead as any).mutualReleaseText)
                      }
                      className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5"
                    >
                      {copiedKey === 'release' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      {copiedKey === 'release' ? 'Copiado' : 'Copiar Liberación'}
                    </button>
                    <button
                      onClick={downloadRelease}
                      className="text-xs px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Descargar Mutual Release (.txt)
                    </button>
                  </div>
                </div>
                <pre className="bg-slate-950 border border-rose-500/40 rounded-xl p-4 text-xs text-slate-200 font-mono whitespace-pre-wrap max-h-96 overflow-y-auto">
                  {generatedRelease || (selectedLead as any).mutualReleaseText}
                </pre>
              </div>
            )}

            {/* Document display for Initial PSA */}
            {activeBotTab === 'initial' && selectedLead.signedContractText && (
              <div className="space-y-3 pt-3 border-t border-slate-800">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Contrato PSA AS-IS Elaborado ({selectedLead.propertyAddress})
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        copyToClipboard(
                          'contract',
                          selectedLead.signedContractText || ''
                        )
                      }
                      className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5"
                    >
                      {copiedKey === 'contract' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      {copiedKey === 'contract' ? 'Copiado' : 'Copiar Contrato'}
                    </button>
                    <button
                      onClick={downloadContract}
                      className="text-xs px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Descargar PSA + Assignment (.txt)
                    </button>
                  </div>
                </div>
                <pre className="bg-slate-950 border border-emerald-500/40 rounded-xl p-4 text-xs text-slate-200 font-mono whitespace-pre-wrap max-h-96 overflow-y-auto">
                  {selectedLead.signedContractText}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
