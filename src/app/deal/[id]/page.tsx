'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
  Building2,
  TrendingUp,
  DollarSign,
  Clock,
  ShieldCheck,
  Send,
  MapPin,
  Flame,
  CheckCircle2,
  ExternalLink,
  Lock,
} from 'lucide-react';

export default function PublicDealLandingPage() {
  const params = useParams();
  const dealId = params?.id as string;

  const [deal, setDeal] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  // Offer Form State
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [offerPrice, setOfferPrice] = useState<number>(0);
  const [closingDays, setClosingDays] = useState('10 - 14 Días (Efectivo / Hard Money)');
  const [proofOfFundsUrl, setProofOfFundsUrl] = useState('');
  const [submittingOffer, setSubmittingOffer] = useState(false);
  const [offerSubmitted, setOfferSubmitted] = useState(false);

  // 72-Hour Urgency Countdown Timer
  const [timeLeft, setTimeLeft] = useState({ hours: 47, minutes: 35, seconds: 12 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!dealId) return;
    fetch(`/api/deals/${dealId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.deal) {
          setDeal(data.deal);
          setOfferPrice(data.deal.financials?.buyerAskingPrice || 0);
        } else {
          setErrorMsg(data.error || 'Trato no encontrado');
        }
      })
      .catch((err) => setErrorMsg(err.message))
      .finally(() => setLoading(false));
  }, [dealId]);

  const handleSubmitOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName || !buyerEmail || !offerPrice) {
      alert('Por favor completa tu nombre, correo y monto de oferta.');
      return;
    }

    setSubmittingOffer(true);
    try {
      const res = await fetch(`/api/deals/${dealId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          buyerName,
          buyerEmail,
          buyerPhone,
          offerPrice,
          closingDays,
          proofOfFundsUrl,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setOfferSubmitted(true);
      } else {
        alert(data.error || 'Error al enviar la oferta');
      }
    } finally {
      setSubmittingOffer(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-200">
        <div className="flex items-center gap-3 text-sm font-semibold">
          <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          Cargando Deal Packet Off-Market para Compradores en Efectivo...
        </div>
      </div>
    );
  }

  if (errorMsg || !deal) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-white">Trato No Disponible</h2>
          <p className="text-xs text-slate-400">{errorMsg || 'Este contrato ya ha sido asignado o retirado.'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Urgency Countdown Top Bar */}
        <div className="bg-gradient-to-r from-red-950/80 via-amber-950/70 to-slate-900 border border-red-500/40 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-red-500/20 text-red-400 animate-pulse">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-black text-red-300 uppercase tracking-wider">
                Oportunidad Exclusiva Off-Market (Tiempo Limitado)
              </span>
              <div className="text-xs text-slate-300">
                El contrato se asignará al primer comprador con EMD de $5,000 en la compañía de título.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" /> Cierre de Ofertas en:
            </span>
            <div className="flex items-center gap-1 text-sm font-mono font-black text-amber-300 bg-slate-950 px-3 py-1.5 rounded-xl border border-amber-500/30">
              <span>{String(timeLeft.hours).padStart(2, '0')}h</span> :
              <span>{String(timeLeft.minutes).padStart(2, '0')}m</span> :
              <span>{String(timeLeft.seconds).padStart(2, '0')}s</span>
            </div>
          </div>
        </div>

        {/* Hero Property Overview */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5 shadow-2xl">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-1.5">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-bold uppercase">
                {deal.leadSource || 'Off-Market Direct to Seller'}
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-white">{deal.propertyAddress}</h1>
              <div className="text-sm text-slate-300 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                {deal.cityState} • {deal.specs}
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs text-slate-400 uppercase font-semibold">Precio de Cesión (Asking Price)</div>
              <div className="text-3xl sm:text-4xl font-black text-emerald-400">
                ${deal.financials?.buyerAskingPrice?.toLocaleString()} USD
              </div>
              <div className="text-xs text-slate-400 mt-0.5">Efectivo / Hard Money • Título Limpio</div>
            </div>
          </div>

          {/* 4 Financial Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5">
              <div className="text-[11px] font-semibold text-slate-400 uppercase">ARV Comps Vendidos</div>
              <div className="text-lg font-black text-sky-400 mt-1">
                ${deal.financials?.arv?.toLocaleString()}
              </div>
              <div className="text-[10px] text-slate-500">Basado en Zillow / MLS</div>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5">
              <div className="text-[11px] font-semibold text-slate-400 uppercase">Rehab Estimado</div>
              <div className="text-lg font-bold text-amber-300 mt-1">
                ~${deal.financials?.estimatedRehab?.toLocaleString()}
              </div>
              <div className="text-[10px] text-slate-500">Cosmético / Actualización</div>
            </div>

            <div className="bg-slate-950 border border-emerald-500/30 rounded-xl p-3.5 bg-emerald-950/20">
              <div className="text-[11px] font-bold text-emerald-300 uppercase">Ganancia Neta Flipper</div>
              <div className="text-lg font-black text-emerald-400 mt-1">
                +${deal.financials?.projectedBuyerProfit?.toLocaleString()}
              </div>
              <div className="text-[10px] text-emerald-200">Margen neto proyectado</div>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5">
              <div className="text-[11px] font-semibold text-slate-400 uppercase">ROI Proyectado</div>
              <div className="text-lg font-black text-white mt-1">
                {deal.financials?.roiPercentage}%
              </div>
              <div className="text-[10px] text-slate-500">Retorno sobre capital</div>
            </div>
          </div>
        </div>

        {/* Two Columns: Comps & Walkthrough on Left, Offer Submission on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Comps & Title Verification */}
          <div className="lg:col-span-7 space-y-5">
            {/* Title & Escrow Guarantee */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Garantía de Cierre y Compañía de Título
              </h3>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2 text-slate-300">
                <div>
                  <strong className="text-white">Compañía de Título:</strong> {deal.financials?.titleCompany}
                </div>
                <div>
                  <strong className="text-white">Depósito de Garantía (EMD):</strong> ${deal.financials?.requiredEmd?.toLocaleString()} USD depositado en custodia (Escrow) al aceptar tu oferta.
                </div>
                <div className="text-slate-400">
                  La propiedad se entrega libre de deudas, gravámenes e inquilinos (Free, Clear & Marketable Title).
                </div>
              </div>
            </div>

            {/* Sold Comps Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-sky-400" />
                  Ventas Comparables Recientes (Comps Vendidos)
                </h3>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(deal.propertyAddress)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-indigo-400 hover:underline flex items-center gap-1"
                >
                  Ver en Google Maps <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="space-y-2">
                {deal.comps?.map((comp: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-semibold text-white">{comp.address}</div>
                      <div className="text-[11px] text-slate-400">Distancia: {comp.dist} • {comp.beds}</div>
                    </div>
                    <div className="text-sm font-bold text-sky-400">
                      ${comp.price?.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Submit Offer Form */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-emerald-400" />
                  Hacer Oferta en Efectivo / Agendar Visita
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Envía tu oferta formal. Revisamos las ofertas por orden de llegada con fondos verificados.
                </p>
              </div>

              {offerSubmitted ? (
                <div className="p-5 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="text-sm font-bold text-white">¡Oferta Recibida con Éxito!</h4>
                  <p className="text-xs text-emerald-200">
                    Tu oferta de <strong>${offerPrice.toLocaleString()} USD</strong> ha sido registrada. Nuestro Transaction Coordinator se comunicará a tu correo ({buyerEmail}) en menos de 1 hora con el código del Lockbox y las instrucciones para el EMD.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitOffer} className="space-y-3.5">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Nombre Completo / Entidad Compradora (LLC)
                    </label>
                    <input
                      type="text"
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      placeholder="Ej: Apex Homes LLC / John Miller"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Correo Electrónico</label>
                      <input
                        type="email"
                        value={buyerEmail}
                        onChange={(e) => setBuyerEmail(e.target.value)}
                        placeholder="inversor@ejemplo.com"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Teléfono / WhatsApp</label>
                      <input
                        type="text"
                        value={buyerPhone}
                        onChange={(e) => setBuyerPhone(e.target.value)}
                        placeholder="(555) 000-0000"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Monto de tu Oferta ($ USD)</label>
                    <input
                      type="number"
                      value={offerPrice}
                      onChange={(e) => setOfferPrice(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm font-bold text-emerald-400 focus:outline-none focus:border-emerald-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Tiempo de Cierre Estimado</label>
                    <select
                      value={closingDays}
                      onChange={(e) => setClosingDays(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="7 Días (Cierre Rápido Cash)">7 Días (Cierre Ultra-Rápido Cash)</option>
                      <option value="10 - 14 Días (Efectivo / Hard Money)">10 - 14 Días (Estándar Cash/Hard Money)</option>
                      <option value="21 Días">21 Días</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Link a Proof of Funds / Carta de Fondos (Opcional)
                    </label>
                    <input
                      type="url"
                      value={proofOfFundsUrl}
                      onChange={(e) => setProofOfFundsUrl(e.target.value)}
                      placeholder="https://drive.google.com/... o enlace bancario"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submittingOffer}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    {submittingOffer ? 'Enviando Oferta Formal...' : 'Enviar Oferta en Efectivo y Solicitar Acceso'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
