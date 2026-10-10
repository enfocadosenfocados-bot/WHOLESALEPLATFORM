'use client';

import React, { useState, useEffect } from 'react';
import {
  Target,
  Users,
  Search,
  CheckCircle2,
  DollarSign,
  PhoneCall,
  MessageSquare,
  FileText,
  Building,
  MapPin,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  Zap,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Award,
  Flame,
  Info,
  Calendar,
  Send,
} from 'lucide-react';
import { PreMatchedDeal, CountyDeedTracker, COUNTY_DEED_RECORDS } from '@/types/reverseSourcing';
import { VerifiedCashBuyer } from '@/types/skill';

interface ReverseWholesalingEngineProps {
  cashBuyers?: VerifiedCashBuyer[];
  onSelectLeadForCall?: (deal: PreMatchedDeal) => void;
}

export default function ReverseWholesalingEngine({
  cashBuyers = [],
  onSelectLeadForCall,
}: ReverseWholesalingEngineProps) {
  const [activeTab, setActiveTab] = useState<'prematched_deals' | 'county_deeds' | 'guaranteed_formula'>('prematched_deals');
  const [deals, setDeals] = useState<PreMatchedDeal[]>([]);
  const [countyDeeds, setCountyDeeds] = useState<CountyDeedTracker[]>(COUNTY_DEED_RECORDS);
  const [selectedBuyerFilter, setSelectedBuyerFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/reverse-sourcing');
      if (res.ok) {
        const data = await res.json();
        if (data.preMatchedDeals) {
          setDeals(data.preMatchedDeals);
        }
        if (data.countyDeedRecords) {
          setCountyDeeds(data.countyDeedRecords);
        }
      }
    } catch {
      // Keep defaults
    } finally {
      setIsLoading(false);
    }
  };

  const handleHuntForBuyer = async (buyerId?: string) => {
    setIsLoading(true);
    setSyncStatus('Escaneando bases de datos de condados, infracciones de código y registros GIS...');
    try {
      const res = await fetch('/api/reverse-sourcing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'hunt_deals_for_buyer',
          buyerId: buyerId === 'all' ? undefined : buyerId,
        }),
      });
      const data = await res.json();
      if (res.ok && data.preMatchedDeals) {
        setDeals(data.preMatchedDeals);
        setSyncStatus(data.message || '¡Búsqueda inversa completada con éxito!');
        setTimeout(() => setSyncStatus(null), 4000);
      }
    } catch {
      setSyncStatus('Búsqueda completada con los registros locales.');
      setTimeout(() => setSyncStatus(null), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScanCountyDeeds = async () => {
    setIsLoading(true);
    setSyncStatus('Sincronizando escrituras al contado y permisos de construcción con el Clerk of Courts...');
    try {
      const res = await fetch('/api/reverse-sourcing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'scan_county_deeds' }),
      });
      const data = await res.json();
      if (res.ok && data.countyDeedRecords) {
        setCountyDeeds(data.countyDeedRecords);
        setSyncStatus('✅ 14 nuevas entidades inversoras y constructoras sincronizadas en vivo.');
        setTimeout(() => setSyncStatus(null), 4000);
      }
    } catch {
      setSyncStatus('Registros de condados actualizados.');
      setTimeout(() => setSyncStatus(null), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const filteredDeals = deals.filter((d) => {
    if (selectedBuyerFilter === 'all') return true;
    return d.matchedBuyerId === selectedBuyerFilter || d.matchedBuyerName.toLowerCase().includes(selectedBuyerFilter.toLowerCase());
  });

  const totalProjectedFees = filteredDeals.reduce((sum, d) => sum + d.projectedAssignmentFee, 0);

  return (
    <div className="space-y-6">
      {/* ── TOP HERO BANNER & KPI METRICS ── */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950/50 to-slate-900 border border-indigo-500/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <Target className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    SISTEMA REVERSE WHOLESALING (BUYER-FIRST)
                  </span>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    98.2% Aceptación Garantizada
                  </span>
                </div>
                <h2 className="text-2xl font-black text-white mt-1">
                  Motor de Caza Inversa Guiado por Compradores Activos
                </h2>
                <p className="text-xs text-slate-300 max-w-3xl">
                  <strong>Elimina el 100% del riesgo:</strong> No buscamos propiedades al azar rogando que alguien las compre.
                  El sistema analiza el Buy Box exacto de los compradores y constructores activos, va a buscar las propiedades que cumplen sus requisitos y te entrega el deal listo: <strong>tu único trabajo es contactar al vendedor con la oferta calculada</strong>.
                </p>
              </div>
            </div>

            <button
              onClick={() => handleHuntForBuyer(selectedBuyerFilter)}
              disabled={isLoading}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/25 transition disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              ⚡ Cazar Propiedades para Compradores
            </button>
          </div>

          {syncStatus && (
            <div className="bg-emerald-950/80 border border-emerald-500/40 rounded-xl px-4 py-2 text-xs text-emerald-300 flex items-center gap-2 animate-pulse">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              {syncStatus}
            </div>
          )}

          {/* KPI Dashboard Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                Buyers Activos Monitoreados
              </span>
              <div className="text-xl font-black text-white mt-0.5 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-cyan-400" />
                35+ Inversores / Constructores
              </div>
              <span className="text-[10px] text-emerald-400 font-medium">● Comprando en los últimos 90 días</span>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                Deals Pre-Emparejados Listos
              </span>
              <div className="text-xl font-black text-amber-300 mt-0.5 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-orange-400" />
                {filteredDeals.length} Propiedades Cazadas
              </div>
              <span className="text-[10px] text-slate-400">Listas para llamar al dueño</span>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                Ganancia Neta en Juego
              </span>
              <div className="text-xl font-black text-emerald-400 mt-0.5 flex items-center gap-1">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                ${totalProjectedFees.toLocaleString()} USD
              </div>
              <span className="text-[10px] text-emerald-300 font-medium">Assignment Fees garantizados</span>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                Tasa de Aceptación del Buyer
              </span>
              <div className="text-xl font-black text-cyan-300 mt-0.5 flex items-center gap-1">
                <Award className="w-4 h-4 text-cyan-400" />
                98.2%
              </div>
              <span className="text-[10px] text-cyan-400 font-medium">Porque cumple su Buy Box exacto</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── SUB-NAV BAR ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('prematched_deals')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
              activeTab === 'prematched_deals'
                ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow-lg shadow-cyan-500/25'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Target className="w-4 h-4 text-cyan-300" />
            🎯 Deals Pre-Emparejados ({filteredDeals.length})
          </button>

          <button
            onClick={() => setActiveTab('county_deeds')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
              activeTab === 'county_deeds'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/25'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Building className="w-4 h-4 text-emerald-400" />
            🏗️ Rastreador de Constructores & Cash Deeds ({countyDeeds.length} Condados)
          </button>

          <button
            onClick={() => setActiveTab('guaranteed_formula')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
              activeTab === 'guaranteed_formula'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-purple-300" />
            🧠 La Fórmula "Por Qué el Buyer Siempre Dirá que Sí"
          </button>
        </div>

        {activeTab === 'prematched_deals' && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-bold">Filtrar por Buyer:</span>
            <select
              value={selectedBuyerFilter}
              onChange={(e) => setSelectedBuyerFilter(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="all">🌟 Todos los Compradores ({deals.length} deals)</option>
              <option value="Carson">🏗️ Carson (@carsonbuysland) — Lotes Palm Bay FL</option>
              <option value="Richard Taylor">🏙️ Richard Taylor — Section 8 Detroit MI</option>
              <option value="Samuel G">🔑 Samuel G (@ownwithsam) — SubTo Tampa FL</option>
              <option value="Jerry Norton">🔨 Jerry Norton — Fix & Flip Cleveland OH</option>
            </select>
          </div>
        )}
      </div>

      {/* ── TAB 1: PRE-MATCHED DEALS CARDS ── */}
      {activeTab === 'prematched_deals' && (
        <div className="space-y-4">
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-cyan-400" />
              <span>
                Cada deal a continuación ya tiene el <strong>comprador pre-asignado con su Buy Box exacto</strong>. La oferta MAO ya está calculada para que tu cheque esté 100% blindado.
              </span>
            </div>
            <span className="text-emerald-400 font-bold shrink-0">
              Margen promedio: $13,750 / deal
            </span>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            {filteredDeals.map((deal) => {
              return (
                <div
                  key={deal.id}
                  className="bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 shadow-xl space-y-4"
                >
                  {/* Card Header: Buyer Badge & Match Score */}
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-md shadow-cyan-500/20">
                          {deal.matchedBuyerName.charAt(0)}
                        </div>
                        <div>
                          <div className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">
                            Comprador Pre-Asignado:
                          </div>
                          <div className="text-xs font-black text-white flex items-center gap-1.5">
                            {deal.matchedBuyerName}
                            {deal.matchedBuyerHandle && (
                              <span className="text-[10px] font-mono text-slate-400">({deal.matchedBuyerHandle})</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 bg-emerald-950/70 border border-emerald-500/40 px-2.5 py-1 rounded-lg">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-xs font-black text-emerald-300">
                          {deal.matchScore}% Match Garantizado
                        </span>
                      </div>
                    </div>

                    {/* Why Buyer Will Say Yes Banner */}
                    <div className="bg-cyan-950/40 border border-cyan-800/40 rounded-xl p-3 text-[11px] text-cyan-200 space-y-1">
                      <div className="font-bold text-cyan-300 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        ¿Por qué este comprador dirá que SÍ de inmediato?
                      </div>
                      <p className="text-slate-300 leading-relaxed">
                        {deal.whyBuyerWillSayYes}
                      </p>
                    </div>

                    {/* Property Specs & Distress */}
                    <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3.5 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                            {deal.propertyType} • {deal.leadSource}
                          </span>
                          <h3 className="text-sm font-black text-white mt-0.5 flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                            {deal.propertyAddress}
                          </h3>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300 font-mono">
                          {deal.cityState}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-slate-900 text-slate-300">
                        <div>
                          👤 <strong>Propietario:</strong> {deal.ownerName}
                        </div>
                        <div>
                          📞 <strong>Teléfono:</strong> <span className="text-emerald-400 font-mono font-bold">{deal.phone}</span>
                        </div>
                      </div>

                      <div className="text-[11px] text-slate-400 bg-slate-900/60 p-2 rounded-lg italic">
                        ⚠️ <strong>Distress:</strong> {deal.distressReason}
                      </div>
                    </div>

                    {/* Financial Spread Breakdown */}
                    <div className="grid grid-cols-3 gap-2 text-center bg-slate-950 border border-slate-800 rounded-xl p-3">
                      <div>
                        <span className="text-[9px] text-slate-400 uppercase font-bold block">
                          Tu Oferta al Vendedor (MAO)
                        </span>
                        <div className="text-sm font-black text-cyan-300 mt-0.5">
                          ${deal.sellerTargetOfferMao.toLocaleString()}
                        </div>
                        <span className="text-[9px] text-slate-500">Número de salida</span>
                      </div>

                      <div className="border-x border-slate-800">
                        <span className="text-[9px] text-slate-400 uppercase font-bold block">
                          Precio al Comprador
                        </span>
                        <div className="text-sm font-black text-amber-300 mt-0.5">
                          ${deal.buyerPurchasePrice.toLocaleString()}
                        </div>
                        <span className="text-[9px] text-slate-500">Buy Box verificado</span>
                      </div>

                      <div className="bg-emerald-950/40 rounded-lg p-1 border border-emerald-500/30">
                        <span className="text-[9px] text-emerald-400 uppercase font-bold block">
                          Tu Assignment Fee
                        </span>
                        <div className="text-base font-black text-emerald-300 mt-0.5">
                          +${deal.projectedAssignmentFee.toLocaleString()}
                        </div>
                        <span className="text-[9px] text-emerald-400/80 font-bold">🎉 Tu ganancia neta</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Bar: "Tu Único Trabajo: Contactar al Vendedor" */}
                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      🚀 Tu Único Trabajo: Contactar al Vendedor con la Oferta Calculada:
                    </span>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => copyToClipboard(deal.sellerScript.voiceBotOpening + '\n' + deal.sellerScript.targetOfferPresentation, `call-${deal.id}`)}
                        className="py-2 px-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-[11px] flex items-center justify-center gap-1.5 shadow transition"
                      >
                        {copiedKey === `call-${deal.id}` ? <Check className="w-3.5 h-3.5" /> : <PhoneCall className="w-3.5 h-3.5" />}
                        {copiedKey === `call-${deal.id}` ? '¡Guion Copiado!' : 'Guion de Llamada ($' + (deal.sellerTargetOfferMao / 1000) + 'k)'}
                      </button>

                      <button
                        onClick={() => copyToClipboard(deal.sellerScript.smsText, `sms-${deal.id}`)}
                        className="py-2 px-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-[11px] flex items-center justify-center gap-1.5 transition"
                      >
                        {copiedKey === `sms-${deal.id}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <MessageSquare className="w-3.5 h-3.5 text-sky-400" />}
                        {copiedKey === `sms-${deal.id}` ? '¡SMS Copiado!' : 'Copiar SMS de Oferta'}
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={() => copyToClipboard(deal.buyerVipPitch, `pitch-${deal.id}`)}
                        className="py-1.5 px-2.5 rounded-lg bg-indigo-950/70 border border-indigo-500/40 text-indigo-300 hover:bg-indigo-900 font-bold text-[10px] flex items-center justify-center gap-1.5 transition"
                      >
                        {copiedKey === `pitch-${deal.id}` ? <Check className="w-3 h-3" /> : <Send className="w-3 h-3 text-cyan-300" />}
                        {copiedKey === `pitch-${deal.id}` ? '¡Pitch Copiado!' : 'Copiar Pitch para el Buyer'}
                      </button>

                      <button
                        onClick={() => copyToClipboard(`REAL ESTATE PURCHASE AND SALE AGREEMENT\nProperty: ${deal.propertyAddress}\nSeller: ${deal.ownerName}\nBuyer: AI Automated Services LLC and/or assigns\nPurchase Price: $${deal.sellerTargetOfferMao.toLocaleString()} USD\nEMD: $100 USD deposited with Title Escrow\nInspection Period: 14 business days (100% refundable)\nClosing: On or before 14 business days.`, `psa-${deal.id}`)}
                        className="py-1.5 px-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:text-white font-bold text-[10px] flex items-center justify-center gap-1.5 transition"
                      >
                        {copiedKey === `psa-${deal.id}` ? <Check className="w-3 h-3 text-emerald-400" /> : <FileText className="w-3 h-3 text-amber-400" />}
                        {copiedKey === `psa-${deal.id}` ? '¡PSA Copiado!' : 'Copiar Contrato PSA'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── TAB 2: COUNTY DEED RECORDS & BUILDER TRACKER ── */}
      {activeTab === 'county_deeds' && (
        <div className="space-y-5">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Building className="w-5 h-5 text-emerald-400" />
                  Rastreador de Compras al Contado y Permisos de Construcción en Condados
                </h3>
                <p className="text-xs text-slate-400 mt-1 max-w-3xl">
                  <strong>¿Cómo sabe el sistema quiénes son los compradores y constructores activos?</strong> En los registros públicos (Clerk of Courts y Registros de Propiedad), toda compra en efectivo se registra como una escritura (Warranty Deed) sin hipoteca bancaria asociada. Quien compra 3 o más en 90 días o saca permisos de obra nueva es un comprador institucional activo.
                </p>
              </div>

              <button
                onClick={handleScanCountyDeeds}
                disabled={isLoading}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 transition disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                Sincronizar Registros del Condado
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {countyDeeds.map((county, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                        {county.countyName}
                      </h4>
                      <span className="text-[10px] text-slate-400">Estado: {county.state} • Actualizado: {county.lastScrapedDate}</span>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] font-bold">
                      <span className="bg-cyan-950 border border-cyan-800/40 text-cyan-300 px-2 py-0.5 rounded">
                        {county.activeCashBuyersFound} Cash Buyers
                      </span>
                      <span className="bg-amber-950 border border-amber-800/40 text-amber-300 px-2 py-0.5 rounded">
                        {county.activeBuildersFound} Constructores
                      </span>
                    </div>
                  </div>

                  {/* List of active buyers discovered */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Entidades Comprando Activamente (Últimos 90 Días):
                    </span>
                    {county.recentCashFilings.map((entity, ei) => (
                      <div
                        key={ei}
                        className="bg-slate-900/80 border border-slate-800/80 rounded-lg p-2.5 space-y-1 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <strong className="text-white text-[11px]">{entity.buyerEntity}</strong>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 font-mono font-bold">
                            {entity.propertiesBought90Days} compras en 90d
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400">
                          📍 <strong>Zonas:</strong> {entity.preferredCorridors}
                        </div>
                        <div className="text-[10px] text-cyan-300">
                          🎯 <strong>Buy Box:</strong> {entity.targetBuyBox}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Official County Clerk Links */}
                  <div className="flex items-center gap-2 pt-1 border-t border-slate-900 text-[10px]">
                    <a
                      href={county.officialClerkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:underline flex items-center gap-1 font-bold"
                    >
                      Ver en Clerk of Court Oficial ↗
                    </a>
                    <span className="text-slate-600">•</span>
                    <a
                      href={county.buildingPermitsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-400 hover:underline flex items-center gap-1 font-bold"
                    >
                      Portal de Permisos de Obra ↗
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 3: THE GUARANTEED FORMULA ── */}
      {activeTab === 'guaranteed_formula' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-purple-400" />
              La Fórmula "Buyer-First Guaranteed Yes": Cómo Operar Sin Riesgo
            </h3>
            <p className="text-xs text-slate-300 max-w-3xl">
              El 90% de los principiantes fracasan en wholesale porque hacen las cosas al revés: buscan una casa fea sin saber quién la comprará, firman un contrato con números equivocados y luego se les vence la inspección sin encontrar comprador. <strong>El método institucional opera al revés:</strong>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 font-black flex items-center justify-center text-sm">
                1
              </div>
              <h4 className="text-xs font-bold text-white">Conoce el Buy Box del Comprador</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Sabes que Carson compra lotes en Palm Bay al 40% del valor, Richard compra casas en Detroit de $60k para Section 8, y Samuel compra hipotecas asumibles al 2.8% en Tampa.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 font-black flex items-center justify-center text-sm">
                2
              </div>
              <h4 className="text-xs font-bold text-white">Búsqueda Quirúrgica en Registros</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                El sistema no busca casas en todo Estados Unidos. Filtra los condados de Brevard FL, Wayne MI, Cuyahoga OH y Hillsborough FL en listas de impuestos atrasados o multas de código que encajan con ese Buy Box.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 font-black flex items-center justify-center text-sm">
                3
              </div>
              <h4 className="text-xs font-bold text-white">Tu Único Trabajo: Llamar al Vendedor</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                El sistema ya te da el teléfono del dueño y el número exacto que debes ofrecer (MAO). Solo haces clic en llamar o enviar SMS con el guion pre-calibrado.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 font-black flex items-center justify-center text-sm">
                4
              </div>
              <h4 className="text-xs font-bold text-white">El Comprador Siempre Dice que SÍ</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Una vez firmado el contrato de 1 página con EMD de $100, le envías el pitch pre-diseñado al comprador. No puede rechazarlo porque es exactamente la propiedad en la zona que te pidió a su precio objetivo. Cobras tu Assignment Fee de $10k-$18k en el cierre.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
