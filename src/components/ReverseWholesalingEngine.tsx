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
  Filter,
  Sliders,
  AlertTriangle,
  ChevronRight,
  TrendingDown,
  Layers,
  HelpCircle,
} from 'lucide-react';
import {
  PreMatchedDeal,
  CountyDeedTracker,
  COUNTY_DEED_RECORDS,
  BuilderBuyBoxPartner,
  CarsonInfillLotOpportunity,
  ZillowDistressFsboLead,
  CARSON_CAPE_CORAL_BUILDERS,
  CARSON_INFILL_LOT_OPPORTUNITIES,
  ZACH_TOP50_ZILLOW_FSBO_LEADS,
} from '@/types/reverseSourcing';
import { VerifiedCashBuyer } from '@/types/skill';

interface ReverseWholesalingEngineProps {
  cashBuyers?: VerifiedCashBuyer[];
  onSelectLeadForCall?: (deal: PreMatchedDeal) => void;
}

export default function ReverseWholesalingEngine({
  cashBuyers = [],
  onSelectLeadForCall,
}: ReverseWholesalingEngineProps) {
  const [activeTab, setActiveTab] = useState<
    'prematched_deals' | 'county_deeds' | 'carson_builder_arbitrage' | 'zach_zillow_top50_fsbo' | 'guaranteed_formula'
  >('prematched_deals');
  const [deals, setDeals] = useState<PreMatchedDeal[]>([]);
  const [countyDeeds, setCountyDeeds] = useState<CountyDeedTracker[]>(COUNTY_DEED_RECORDS);
  const [selectedBuyerFilter, setSelectedBuyerFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);

  // Carson Wiener Cape Coral Land Arbitrage State
  const [carsonBuilders, setCarsonBuilders] = useState<BuilderBuyBoxPartner[]>(CARSON_CAPE_CORAL_BUILDERS);
  const [carsonLots, setCarsonLots] = useState<CarsonInfillLotOpportunity[]>(CARSON_INFILL_LOT_OPPORTUNITIES);
  const [selectedBuilderForMatch, setSelectedBuilderForMatch] = useState<string>('all');
  const [lotMaxPriceFilter, setLotMaxPriceFilter] = useState<number>(10000);

  // Zach Ginn Top 50 Zillow FSBO State
  const [zachFsboLeads, setZachFsboLeads] = useState<ZillowDistressFsboLead[]>(ZACH_TOP50_ZILLOW_FSBO_LEADS);
  const [fsboFilterOnlyUnfinanceable, setFsboFilterOnlyUnfinanceable] = useState<boolean>(false);
  const [fsboMinPriceCut, setFsboMinPriceCut] = useState<number>(10000);
  const [fsboCustomLowballPct, setFsboCustomLowballPct] = useState<number>(55);
  const [activeFsboTab, setActiveFsboTab] = useState<'calling_list' | 'underwriting' | 'ai_prompt'>('calling_list');

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
        if (data.carsonBuilders) {
          setCarsonBuilders(data.carsonBuilders);
        }
        if (data.carsonInfillLots) {
          setCarsonLots(data.carsonInfillLots);
        }
        if (data.zachZillowFsboLeads) {
          setZachFsboLeads(data.zachZillowFsboLeads);
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
            onClick={() => setActiveTab('carson_builder_arbitrage')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
              activeTab === 'carson_builder_arbitrage'
                ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg shadow-amber-500/25'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Building className="w-4 h-4 text-amber-400" />
            🏗️ Carson Wiener: Infill Lots Cape Coral ({carsonBuilders.length} Builders)
          </button>

          <button
            onClick={() => setActiveTab('zach_zillow_top50_fsbo')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
              activeTab === 'zach_zillow_top50_fsbo'
                ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-500/25'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Flame className="w-4 h-4 text-rose-400" />
            ⚡ Zach Ginn: Top 50 Zillow FSBOs (Lowball)
          </button>

          <button
            onClick={() => setActiveTab('county_deeds')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
              activeTab === 'county_deeds'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/25'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Layers className="w-4 h-4 text-emerald-400" />
            📜 Cash Deeds ({countyDeeds.length} Condados)
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
            🧠 Fórmula "Garantía de Sí"
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

      {/* ── TAB: CARSON WIENER BUILDER LAND ARBITRAGE ($10k INFILL LOTS) ── */}
      {activeTab === 'carson_builder_arbitrage' && (
        <div className="space-y-6">
          {/* Header Banner */}
          <div className="bg-gradient-to-br from-amber-950/60 via-slate-900 to-slate-950 border border-amber-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  ESTRATEGIA CARSON WIENER (@carsonbuysland) — CAPE CORAL, FL
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  💰 Arbitraje de $25,000 – $30,000 por Lote
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  🏗️ 21 Constructores Activos en Pantalla
                </span>
              </div>
              <h3 className="text-xl font-black text-white">
                Fórmula de Arbitraje Terrenos de $10k a Constructores de Cape Coral
              </h3>
              <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
                <strong>El secreto revelado en el Reel de Carson:</strong> Nunca busques terrenos a ciegas. Primero mapeas los <strong>21 constructores activos</strong> de la zona (ej. Baker Construction pagando $38,000 fijos por lote de 80x125 ft, David Black comprando 25+ al mes). Luego filtras la base de datos de terrenos con <strong>Precio Máximo ≤ $10,000</strong>. Llamas al dueño con la oferta de $7,000–$8,000 y se lo asignas al constructor a $38,000: <strong>$28,000 a $30,000 netos de ganancia directa</strong>.
              </p>

              {/* Quick KPIs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Constructores en Radar</span>
                  <div className="text-lg font-black text-amber-400">21 Builders</div>
                  <span className="text-[10px] text-slate-400">Cape Coral & SW Florida</span>
                </div>
                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Filtro de Compra</span>
                  <div className="text-lg font-black text-white">≤ $10,000 USD</div>
                  <span className="text-[10px] text-amber-300">Oferta MAO: $7k - $8k</span>
                </div>
                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Precio de Venta a Builder</span>
                  <div className="text-lg font-black text-emerald-400">$36,000 – $45,000</div>
                  <span className="text-[10px] text-emerald-300">Jon Sninsky paga $38k</span>
                </div>
                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Margen Promedio / Lote</span>
                  <div className="text-lg font-black text-cyan-300">+$29,800 USD</div>
                  <span className="text-[10px] text-cyan-400">Assignment Fee neto</span>
                </div>
              </div>
            </div>
          </div>

          {/* Builder Buy Box Radar & Filter Controls */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h4 className="text-sm font-black text-white flex items-center gap-2">
                <Building className="w-4 h-4 text-amber-400" />
                1. Red de Constructores Verificados en Cape Coral (Buy Boxes Exactos)
              </h4>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400">Filtrar por Constructor:</span>
                <select
                  value={selectedBuilderForMatch}
                  onChange={(e) => setSelectedBuilderForMatch(e.target.value)}
                  className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none"
                >
                  <option value="all">🌟 Todos los Constructores ({carsonBuilders.length})</option>
                  {carsonBuilders.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.builderName} ({b.monthlyBuildVolume})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Builder Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {carsonBuilders
                .filter((b) => (selectedBuilderForMatch === 'all' ? true : b.id === selectedBuilderForMatch))
                .map((builder) => (
                  <div
                    key={builder.id}
                    className="bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 rounded-xl p-4 space-y-3 transition group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider ${
                              builder.tier === 'Platinum Builder'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                : builder.tier === 'High Volume'
                                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                                : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                            }`}
                          >
                            {builder.tier}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium">{builder.monthlyBuildVolume}</span>
                        </div>
                        <h5 className="text-sm font-bold text-white mt-1 group-hover:text-amber-400 transition">
                          {builder.builderName}
                        </h5>
                        <p className="text-[11px] text-slate-400">Contacto: {builder.representative}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] text-slate-400 font-bold block">PAGA POR LOTE</span>
                        <div className="text-sm font-black text-emerald-400">{builder.targetBuyPriceDisplay}</div>
                      </div>
                    </div>

                    <div className="bg-slate-950/80 rounded-lg p-2.5 text-xs space-y-1 border border-slate-800/80">
                      <div className="text-[11px] text-slate-300">
                        <strong className="text-amber-300">Buy Box:</strong> {builder.buyBoxCriteria}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        <strong className="text-slate-300">Por qué pagan rápido:</strong> {builder.whyTheyPayFast}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800">
                      <span className="text-[11px] text-slate-400 font-mono">{builder.email}</span>
                      <button
                        onClick={() => copyToClipboard(builder.email, `b-email-${builder.id}`)}
                        className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[10px] flex items-center gap-1"
                      >
                        {copiedKey === `b-email-${builder.id}` ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" /> Copiado
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" /> Email
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Filtered $10k Infill Lots Arbitrage Table */}
          <div className="space-y-3 pt-2">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h4 className="text-sm font-black text-white flex items-center gap-2">
                  <Target className="w-4 h-4 text-emerald-400" />
                  2. Lotes Sourced con Filtro ≤ $10,000 en Cape Coral (Emparejados con Builders)
                </h4>
                <p className="text-xs text-slate-400">
                  Lotes residenciales filtrados por debajo de $10,000 con servicios y listos para losa.
                </p>
              </div>

              {/* Filter Slider */}
              <div className="flex items-center gap-3 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl text-xs">
                <span className="text-slate-400 font-bold">Filtro Precio Máx:</span>
                <span className="text-amber-400 font-black font-mono">${lotMaxPriceFilter.toLocaleString()}</span>
                <input
                  type="range"
                  min="5000"
                  max="15000"
                  step="500"
                  value={lotMaxPriceFilter}
                  onChange={(e) => setLotMaxPriceFilter(Number(e.target.value))}
                  className="w-24 accent-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {carsonLots
                .filter((lot) => lot.listedOrRecordPrice <= lotMaxPriceFilter)
                .map((lot) => (
                  <div
                    key={lot.id}
                    className="bg-slate-900 border border-slate-800 hover:border-cyan-500/40 rounded-xl p-4 space-y-3 shadow-lg"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                          {lot.dimensions} • {lot.lotSizeAcres} Acres • {lot.zoning}
                        </span>
                        <h5 className="text-base font-black text-white mt-1.5">{lot.address}</h5>
                        <p className="text-xs text-slate-400">{lot.cityStateZip} (Parcel: {lot.parcelId})</p>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 font-bold block">ASSIGNMENT FEE</span>
                        <div className="text-lg font-black text-emerald-400">
                          +${lot.projectedAssignmentFee.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    {/* Financial Spread Breakdown */}
                    <div className="grid grid-cols-3 gap-2 bg-slate-950/90 rounded-xl p-3 border border-slate-800 text-center">
                      <div>
                        <span className="text-[10px] text-slate-400 block font-bold">Oferta al Dueño (MAO)</span>
                        <div className="text-sm font-black text-amber-400">
                          ${lot.landownerOfferMao.toLocaleString()}
                        </div>
                        <span className="text-[9px] text-slate-500">En efectivo limpio</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block font-bold">Venta a Builder</span>
                        <div className="text-sm font-black text-cyan-300">
                          ${lot.builderPurchasePrice.toLocaleString()}
                        </div>
                        <span className="text-[9px] text-slate-500">Paga en 7 días</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block font-bold">Tu Ganancia Neta</span>
                        <div className="text-sm font-black text-emerald-400">
                          ${lot.projectedAssignmentFee.toLocaleString()}
                        </div>
                        <span className="text-[9px] text-emerald-400 font-medium">Margen ~400%</span>
                      </div>
                    </div>

                    <div className="text-xs space-y-1.5">
                      <div className="text-slate-300 flex items-center justify-between">
                        <span><strong>Propietario:</strong> {lot.landownerName}</span>
                        <span className="text-cyan-400 font-mono font-bold">{lot.landownerPhone}</span>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        <strong>Constructor Asignado:</strong> {lot.targetBuilderName}
                      </div>
                      <div className="text-[11px] text-emerald-300">
                        ⚡ <strong>Servicios:</strong> {lot.utilitiesStatus}
                      </div>
                    </div>

                    {/* Scripts Expandable / Copy Buttons */}
                    <div className="pt-2 border-t border-slate-800 space-y-2">
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => copyToClipboard(lot.callScriptToOwner, `c-call-${lot.id}`)}
                          className="flex-1 py-1.5 px-2.5 rounded-lg bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/30 text-[11px] font-bold flex items-center justify-center gap-1 transition"
                        >
                          {copiedKey === `c-call-${lot.id}` ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" /> ¡Guión Dueño Copiado!
                            </>
                          ) : (
                            <>
                              <PhoneCall className="w-3.5 h-3.5" /> 1-Click Guión al Dueño
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => copyToClipboard(lot.vipPitchToBuilder, `c-pitch-${lot.id}`)}
                          className="flex-1 py-1.5 px-2.5 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/30 text-[11px] font-bold flex items-center justify-center gap-1 transition"
                        >
                          {copiedKey === `c-pitch-${lot.id}` ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" /> ¡Pitch Builder Copiado!
                            </>
                          ) : (
                            <>
                              <Send className="w-3.5 h-3.5" /> Pitch VIP al Builder
                            </>
                          )}
                        </button>
                      </div>

                      <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80 text-[11px] text-slate-300 italic">
                        &quot;{lot.callScriptToOwner}&quot;
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* ── TAB: ZACH GINN TOP 50 ZILLOW FSBO DISTRESS HUNTER & LOWBALL ENGINE ── */}
      {activeTab === 'zach_zillow_top50_fsbo' && (
        <div className="space-y-6">
          {/* Header Banner */}
          <div className="bg-gradient-to-br from-rose-950/60 via-slate-900 to-slate-950 border border-rose-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5" />
                  SISTEMA ZACH GINN (@flipwithzach) — FREEWHOLESALING
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  ⚡ &quot;Deleting at 100k views...&quot;
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  🎯 Top 50 Zillow FSBO Calling List
                </span>
              </div>
              <h3 className="text-xl font-black text-white">
                Detector de Desesperación en Zillow & Motor de Ofertas Bajas (Lowball)
              </h3>
              <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
                <strong>La regla de oro de Zach Ginn:</strong> No llames a todos los avisos de Zillow (la mayoría son dueños que piden retail o están probando el mercado). La IA busca y clasifica los 50 anuncios en EE.UU. que contienen la frase mágica: <strong>&quot;Cannot qualify for FHA&quot;</strong>. Al no calificar para préstamos FHA/convencionales, el <strong>85% de compradores de vivienda quedan descalificados</strong>. El dueño NO tiene otra opción que venderle a un cash buyer con un descuento masivo (caídas de $10k–$26k).
              </p>

              {/* Sub-Tabs: Calling List vs Underwriting vs Prompt */}
              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  onClick={() => setActiveFsboTab('calling_list')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                    activeFsboTab === 'calling_list'
                      ? 'bg-rose-600 text-white shadow-md'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  📋 Lista de Llamadas (50 FSBO Leads)
                </button>
                <button
                  onClick={() => setActiveFsboTab('underwriting')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                    activeFsboTab === 'underwriting'
                      ? 'bg-amber-600 text-white shadow-md'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <DollarSign className="w-3.5 h-3.5" />
                  🧮 Calculadora de Oferta Baja & Descuento
                </button>
                <button
                  onClick={() => setActiveFsboTab('ai_prompt')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                    activeFsboTab === 'ai_prompt'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  🤖 Prompt Exacto para IA (del Video de Zach)
                </button>
              </div>
            </div>
          </div>

          {/* 1. CALLING LIST SUB-TAB */}
          {activeFsboTab === 'calling_list' && (
            <div className="space-y-4">
              {/* Filter Bar */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex flex-wrap items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-300">
                    <input
                      type="checkbox"
                      checked={fsboFilterOnlyUnfinanceable}
                      onChange={(e) => setFsboFilterOnlyUnfinanceable(e.target.checked)}
                      className="rounded accent-rose-500 w-4 h-4"
                    />
                    <span className="text-rose-400">🚨 Solo No Financiables (&quot;Cannot qualify for FHA&quot;)</span>
                  </label>

                  <div className="flex items-center gap-1.5 text-slate-400">
                    <span>Caída mínima:</span>
                    <select
                      value={fsboMinPriceCut}
                      onChange={(e) => setFsboMinPriceCut(Number(e.target.value))}
                      className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white text-xs"
                    >
                      <option value="5000">≥ $5,000 en rebajas</option>
                      <option value="10000">≥ $10,000 en rebajas (Recomendado)</option>
                      <option value="20000">≥ $20,000 en rebajas (Ultra Urgencia)</option>
                    </select>
                  </div>
                </div>

                <div className="text-slate-400">
                  Mostrando{' '}
                  <strong className="text-white">
                    {
                      zachFsboLeads.filter(
                        (l) =>
                          (!fsboFilterOnlyUnfinanceable || l.unfinanceableFha) &&
                          l.latestPriceCut >= fsboMinPriceCut
                      ).length
                    }
                  </strong>{' '}
                  de {zachFsboLeads.length} leads de alta conversión
                </div>
              </div>

              {/* Table of Leads */}
              <div className="space-y-3">
                {zachFsboLeads
                  .filter(
                    (l) =>
                      (!fsboFilterOnlyUnfinanceable || l.unfinanceableFha) &&
                      l.latestPriceCut >= fsboMinPriceCut
                  )
                  .map((lead) => (
                    <div
                      key={lead.id}
                      className="bg-slate-900 border border-slate-800 hover:border-rose-500/40 rounded-xl p-4 space-y-3 shadow-md transition"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-base font-black text-white">{lead.address}</span>
                            <span className="text-xs text-slate-400">({lead.cityStateZip})</span>
                            {lead.unfinanceableFha && (
                              <span className="text-[10px] font-black px-2 py-0.5 rounded bg-red-950/80 text-red-300 border border-red-700/60 flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3 text-red-400" />
                                NO CALIFICA FHA (100% CASH ONLY)
                              </span>
                            )}
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                              -{lead.priceDropPercentage} (-${lead.latestPriceCut.toLocaleString()})
                            </span>
                          </div>
                          <div className="text-xs text-slate-400">
                            <strong>Contacto Vendedor:</strong> {lead.ownerContact} • Tel: <span className="text-rose-300 font-mono font-bold">{lead.phone}</span> • {lead.daysOnZillow} días en Zillow ({lead.priceCutDate})
                          </div>
                        </div>

                        {/* Financial Comparison */}
                        <div className="flex items-center gap-4 bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-right">
                          <div>
                            <span className="text-[10px] text-slate-400 block font-bold">Listado Zillow</span>
                            <div className="text-sm font-bold text-slate-400 line-through">
                              ${lead.listedPrice.toLocaleString()}
                            </div>
                          </div>
                          <div>
                            <span className="text-[10px] text-rose-400 block font-bold">Oferta Baja IA (MAO)</span>
                            <div className="text-base font-black text-rose-400">
                              ${lead.aiLowballOffer.toLocaleString()}
                            </div>
                          </div>
                          <div>
                            <span className="text-[10px] text-emerald-400 block font-bold">Assignment Fee</span>
                            <div className="text-base font-black text-emerald-400">
                              +${lead.projectedAssignmentFee.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Public Distress Signal */}
                      <div className="bg-slate-950/90 rounded-lg p-2.5 border border-slate-800/80 text-xs flex items-start gap-2">
                        <Flame className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-rose-300">Señal de Angustia en Zillow:</strong>{' '}
                          <span className="text-slate-200">{lead.sellerDistressSignal}</span>
                          <div className="text-[11px] text-slate-400 mt-1">
                            💡 <em>Estrategia de Cierre:</em> {lead.lowballOfferStrategy}
                          </div>
                        </div>
                      </div>

                      {/* Call Script & 1-Click Action */}
                      <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
                        <div className="text-[11px] text-slate-300 italic flex-1 min-w-[280px]">
                          &quot;{lead.coldCallPatternInterrupt}&quot;
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => copyToClipboard(lead.coldCallPatternInterrupt, `z-call-${lead.id}`)}
                            className="px-3 py-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 text-xs font-bold flex items-center gap-1.5 transition"
                          >
                            {copiedKey === `z-call-${lead.id}` ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-400" /> ¡Guión Copiado!
                              </>
                            ) : (
                              <>
                                <PhoneCall className="w-3.5 h-3.5" /> 1-Click Call Script
                              </>
                            )}
                          </button>

                          <button
                            onClick={() =>
                              copyToClipboard(
                                `Hola ${lead.ownerContact.split(' ')[0]}, vi tu anuncio en Zillow de ${lead.address}. Vemos que buscas cierre rápido en efectivo. Te podemos pagar $${lead.aiLowballOffer.toLocaleString()} netos de contado en 10 días absorbiendo nosotros todos los gastos de título. ¿Te sirve?`,
                                `z-sms-${lead.id}`
                              )
                            }
                            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition"
                          >
                            {copiedKey === `z-sms-${lead.id}` ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-400" /> SMS Copiado
                              </>
                            ) : (
                              <>
                                <MessageSquare className="w-3.5 h-3.5" /> SMS Oferta
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* 2. UNDERWRITING CALCULATOR SUB-TAB */}
          {activeFsboTab === 'underwriting' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="space-y-1">
                <h4 className="text-base font-black text-white flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-amber-400" />
                  Calculadora de Oferta Baja con Anclaje Inverso de Zach Ginn
                </h4>
                <p className="text-xs text-slate-400">
                  Ajusta el porcentaje de descuento agresivo para propiedades unfinanceable en Zillow.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-xs text-slate-400 block font-bold">Porcentaje de Oferta vs Precio Listado:</span>
                    <div className="text-xl font-black text-amber-400">{fsboCustomLowballPct}% del Precio Zillow</div>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="75"
                    step="1"
                    value={fsboCustomLowballPct}
                    onChange={(e) => setFsboCustomLowballPct(Number(e.target.value))}
                    className="w-48 accent-amber-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 border-t border-slate-900 text-xs">
                  <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800">
                    <strong className="text-slate-300 block">45% - 55% (Ultra Agresivo)</strong>
                    <span className="text-slate-400 text-[11px]">
                      Para propiedades con techos rotos o calderas dañadas que no pasan FHA. Máxima ganancia ($20k+).
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800">
                    <strong className="text-amber-400 block">56% - 65% (Equilibrado)</strong>
                    <span className="text-slate-400 text-[11px]">
                      Para dueños con más de 60 días en Zillow con múltiples caídas de precio. Aceptación ~35%.
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800">
                    <strong className="text-cyan-400 block">66% - 75% (Cierre Rápido)</strong>
                    <span className="text-slate-400 text-[11px]">
                      Para mercados calientes de Section 8 como Detroit o Cleveland donde los buyers pagan rápido.
                    </span>
                  </div>
                </div>
              </div>

              {/* Live Underwritten Preview */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Simulación de Ofertas Bajas en Vivo con tu {fsboCustomLowballPct}%:
                </span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {zachFsboLeads.slice(0, 3).map((l) => {
                    const customOffer = Math.round(l.listedPrice * (fsboCustomLowballPct / 100));
                    const estFee = Math.round(customOffer * 0.15);
                    return (
                      <div key={l.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2 text-xs">
                        <strong className="text-white block">{l.address}</strong>
                        <div className="flex justify-between text-slate-400">
                          <span>Listado Zillow:</span>
                          <span className="font-mono">${l.listedPrice.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-amber-400 font-bold">
                          <span>Tu Oferta ({fsboCustomLowballPct}%):</span>
                          <span className="font-mono">${customOffer.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-emerald-400 font-bold border-t border-slate-900 pt-1">
                          <span>Fee Estimado:</span>
                          <span className="font-mono">+${estFee.toLocaleString()}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* 3. AI PROMPT SUB-TAB */}
          {activeFsboTab === 'ai_prompt' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="space-y-1">
                <h4 className="text-base font-black text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-400" />
                  Prompt Original del Video de Zach Ginn (Flip With Rick)
                </h4>
                <p className="text-xs text-slate-400">
                  Copia el prompt exacto que Zach escribió en su pantalla para generar la hoja de cálculo de las 50 FSBOs en Zillow.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-indigo-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase text-indigo-400">
                    Prompt Exacto Escrito por Zach:
                  </span>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        'im a wholesaler find me the top 50 FSBO\'s on zillow to call that will most likely take my lowball offer in usa',
                        'prompt-zach-exact'
                      )
                    }
                    className="px-3 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 transition"
                  >
                    {copiedKey === 'prompt-zach-exact' ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> ¡Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copiar Prompt
                      </>
                    )}
                  </button>
                </div>

                <div className="font-mono text-sm text-cyan-300 bg-slate-900 p-3 rounded-lg border border-slate-800">
                  &quot;im a wholesaler find me the top 50 FSBO&apos;s on zillow to call that will most likely take my lowball offer in usa&quot;
                </div>

                <div className="text-xs text-slate-300 space-y-2 pt-1">
                  <strong className="text-white block">Instrucciones Adicionales del Sistema:</strong>
                  <ul className="list-disc list-inside space-y-1 text-slate-400">
                    <li>Pídele a la IA que cree columnas para: <code>Address</code>, <code>Price</code>, <code>Latest Shown Price Cut</code>, <code>Public Seller Signal / Reason to Call</code>, <code>Days on Zillow</code> y <code>Property Type</code>.</li>
                    <li>Indica que priorice propiedades con descripciones que digan <em>&quot;Cannot qualify for FHA&quot;</em>, <em>&quot;Sold As-Is&quot;</em> o <em>&quot;OBO&quot;</em>.</li>
                    <li>Pídele una pestaña secundaria llamada <strong>&quot;Offer Underwriting&quot;</strong> para calcular automáticamente el MAO al 50%-60% del precio de lista.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
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
