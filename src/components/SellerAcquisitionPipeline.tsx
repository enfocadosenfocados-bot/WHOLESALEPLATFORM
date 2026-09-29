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
- Existing Tax / Mortgage Arrears ($${selectedLead.taxOrMortgageArrears.toLocaleString()}): Paid off directly at closing through our Title Company (GoldKeyTC.com) so your credit is protected and you walk away with cash in hand.
- Condition: 100% AS-IS (no repairs, no cleaning, and $0 realtor commissions).

Reply to this email or call/text me directly if you'd like me to send over our simple 1-page Purchase & Sale Agreement today.

Best regards,
Acquisitions Team`;

  const winningCallScript = `1. APERTURA DE EMPATÍA Y AUTORIDAD (Inglés / Español):
"Hi ${selectedLead.ownerName}, this is [Your Name]. I know I'm calling out of the blue, but I was looking at ${selectedLead.propertyAddress} in ${selectedLead.cityState} and saw the upcoming status. I wanted to reach out personally because my partners and I can give you a fast cash offer, pay off the $${selectedLead.taxOrMortgageArrears.toLocaleString()} balance at closing, and help you transition to your next spot without losing your equity or hurting your credit."

2. LOS 4 PILARES + ANCLAJE INVERSO DE PRECIO (REVERSE PRICE ANCHOR):
"Because we buy 100% AS-IS—meaning you don't touch the roof, you don't paint, and you can even leave behind any unwanted items—and we pay all title & closing fees through Gold Key Title... my financial partner originally had our cash offer at $${selectedLead.lowball60Offer.toLocaleString()}."

3. EL CIERRE GANADOR (SUBIDA AL MAO PARA QUE DIGA "SÍ" EN LA LLAMADA):
"Look, I know $${selectedLead.lowball60Offer.toLocaleString()} is conservative, and I really want to make this work for you today. If I go to bat for you right now and get my partner to approve $${selectedLead.recommendedMaoOffer.toLocaleString()} net to you (plus paying all closing costs), would you be ready to sign our simple 1-page Purchase Agreement on your email right now while we're on the phone?"`;

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
          {/* Card 1: SMS & Email Direct Outreach */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-bold text-sky-400">
                  PASO 1: CONTACTO AUTOMÁTICO POR SMS Y CORREO
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
                    emailSubject
                  )}&body=${encodeURIComponent(emailBody)}`}
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
                    Mensaje de Texto (SMS Anti-Spam + Oferta)
                  </span>
                  <button
                    onClick={() => copyToClipboard('sms', smsTemplate)}
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
                  {smsTemplate}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-sky-400">
                    Correo Electrónico de Oferta en Efectivo
                  </span>
                  <button
                    onClick={() => copyToClipboard('email', emailBody)}
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
                  {emailBody}
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: AI Voice Call Closer & Script Ganador */}
          <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-amber-400">
                    PASO 2: AGENTE DE LLAMADAS & SCRIPT CERRADOR (4 PILARES + REVERSE ANCHOR)
                  </span>
                  <h3 className="text-base font-bold text-white">
                    Cabina de Llamada Ganadora al {selectedLead.phone}
                  </h3>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => speakPitch(winningCallScript)}
                  className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex items-center gap-1.5 transition"
                >
                  <Volume2 className="w-4 h-4" />
                  Escuchar Voz del Agente IA
                </button>
                <button
                  type="button"
                  onClick={() => copyToClipboard('script', winningCallScript)}
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

            <pre className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-slate-200 font-mono whitespace-pre-wrap leading-relaxed">
              {winningCallScript}
            </pre>

            {/* Interactive Objection Handler */}
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
          </div>

          {/* Card 3: Seller Said YES -> Auto-Generate Contract with Third-Party Assignment Clause */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/50 border border-emerald-500/40 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  PASO 3: EL VENDEDOR DIJO &ldquo;SÍ&rdquo; → AUTO-ELABORACIÓN DEL CONTRATO CON CLÁUSULA DE TERCER COMPRADOR
                </span>
                <h3 className="text-lg font-extrabold text-white mt-0.5">
                  Generar Purchase & Sale Agreement + Cláusula de Asignación a Terceros
                </h3>
                <p className="text-xs text-slate-400">
                  Incluye la cláusula exacta de los Reels (<i>&ldquo;and/or assigns — assign to a third party for a net gain&rdquo;</i>), 14 días de período de inspección y el contrato de cesión para tu Cash Buyer.
                </p>
              </div>
            </div>

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

            {selectedLead.signedContractText && (
              <div className="space-y-3 pt-3 border-t border-slate-800">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Contrato Elaborado y Listo para Firma ({selectedLead.propertyAddress})
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
