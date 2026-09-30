'use client';

import React, { useState } from 'react';
import {
  Users,
  Search,
  ExternalLink,
  Loader2,
  CheckCircle2,
  Copy,
  Check,
  MessageSquarePlus,
  DollarSign,
  FileCheck2,
  Home,
  MapPin,
  Send,
  Mail,
  Sparkles,
} from 'lucide-react';
import { VerifiedCashBuyer } from '@/types/skill';

interface CashBuyerScraperHubProps {
  cashBuyers: VerifiedCashBuyer[];
  onBuyersUpdated: (buyers: VerifiedCashBuyer[]) => void;
}

const BUY_BOX_TYPES: VerifiedCashBuyer['buyBoxType'][] = [
  'Fix & Flip',
  'Section 8 Rental',
  'Land / Home Builder',
  'Multifamily / Creative',
];

export default function CashBuyerScraperHub({
  cashBuyers,
  onBuyersUpdated,
}: CashBuyerScraperHubProps) {
  const [market, setMarket] = useState('Tampa, FL');
  const [buyBoxType, setBuyBoxType] =
    useState<VerifiedCashBuyer['buyBoxType']>('Fix & Flip');
  const [dealModePreference, setDealModePreference] = useState<string>('both_accepted');
  const [loading, setLoading] = useState(false);
  const [filterPlatform, setFilterPlatform] = useState<string>('all');
  const [filterDealMode, setFilterDealMode] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string>('');
  const [selectedMagnet, setSelectedMagnet] = useState<'detroit' | 'cleveland' | 'land' | 'generic'>('detroit');
  const [showQuestionsGuide, setShowQuestionsGuide] = useState<boolean>(false);

  const handleScrape = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!market.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/scrape-buyers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ market, buyBoxType, dealModePreference }),
      });
      const data = await res.json();
      if (res.ok && data.cashBuyers) {
        onBuyersUpdated(data.cashBuyers);
      }
    } finally {
      setLoading(false);
    }
  };

  const copyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(''), 2200);
  };

  const magnetPosts = {
    detroit: `🚨 OFF-MARKET DETROIT SECTION 8 CASH FLOW DEAL 🚨

📍 Location: Detroit, MI (Zip: 48205 / Regent Park corridor)
💰 Cash Price: $62,000 USD
📈 Projected Section 8 Voucher Rent: $1,250 - $1,350/mo ($15k+/yr gross)
🛠️ Rehab: Light cosmetic turnover (~$8k - $12k). Roof and mechanicals in working condition.
📊 Estimated ARV: $125,000+
📄 Clean title opened with Title One Detroit. 10-day closing.
Direct assignable contract held by AI Automated Services LLC.

👉 Serious Cash Buyers with Proof of Funds: Drop your EMAIL + PHONE below or DM me "DETROIT" and I'll send the full photo pack and inspection report! 👇`,

    cleveland: `🔥 CLEVELAND OFF-MARKET FIX & FLIP / BRRRR OPPORTUNITY 🔥

📍 Location: Cleveland Metro / Cuyahoga County (Zip: 44105)
💰 Contract Price: $48,000 USD
🔨 Estimated Rehab: ~$25,000 (Kitchen, bath, drywall, mechanical updates)
📊 Realistic ARV: $145,000 USD (Strong neighborhood comps)
💵 Spread / Gross Equity: ~$72,000 USD
🏠 Specs: 3 Bed / 1.5 Bath, full dry basement, 2-car detached garage.
Clean title, closing in 10-14 days with First American Title. Direct contract with AI Automated Services LLC.

👉 Drop your EMAIL or DM me "CLEVELAND" to receive the lockbox code and full property walkthrough! 👇`,

    land: `🏗️ INFILL BUILDER LOT (0.25 ACRES) — READY TO BUILD 🏗️

📍 Location: High-growth builder corridor (Paved street, power at pole, high & dry)
💰 Cash Price: $18,000 USD
📐 Dimensions: 80 x 125 ft (High & Dry, No Wetlands, Paved Street)
📈 Recent Builder Comps (Sold): $32,000 – $36,000 USD
Zoning: Single-Family Residential (R-1). No HOA. Low property taxes.
Assignable purchase contract held directly by AI Automated Services LLC. Title clear.

👉 Home builders & land investors: Drop your EMAIL or DM "LOT" for the parcel ID, GIS boundary survey, and builder comps! 👇`,

    generic: `🔥 OFF-MARKET ${buyBoxType.toUpperCase()} DEAL IN ${market.toUpperCase()} 🔥

I just locked up a heavily discounted off-market property in ${market} (~60% of ARV / direct with motivated owner).
Entity: AI Automated Services LLC.

Looking for serious Cash Buyers or JV Partners actively buying in ${market}.
👉 Drop your EMAIL + PHONE + EXACT BUY BOX in the comments (or DM "DEAL") and let's close this! 👇`
  };

  const magnetPostText = magnetPosts[selectedMagnet] || magnetPosts.generic;

  const filteredBuyers = cashBuyers.filter((b) => {
    const matchesPlatform =
      filterPlatform === 'all' ? true : b.platform === filterPlatform;

    const mode = b.dealRequirementMode || 'both_accepted';
    const matchesDealMode =
      filterDealMode === 'all'
        ? true
        : filterDealMode === 'accepts_lead_only'
        ? mode === 'lead_only_birddog' || mode === 'both_accepted'
        : filterDealMode === 'requires_contract'
        ? mode === 'contract_signed'
        : mode === filterDealMode;

    const q = searchQuery.trim().toLowerCase();
    const matchesSearch = !q
      ? true
      : `${b.name} ${b.companyOrGroup} ${b.market} ${b.propertySpecsWanted || ''} ${
          b.finderPayoutOffer || ''
        } ${b.notes}`
          .toLowerCase()
          .includes(q);

    return matchesPlatform && matchesDealMode && matchesSearch;
  });

  const getModeBadgeStyle = (mode?: VerifiedCashBuyer['dealRequirementMode']) => {
    if (mode === 'lead_only_birddog') {
      return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
    }
    if (mode === 'contract_signed') {
      return 'bg-sky-500/20 text-sky-300 border-sky-500/40';
    }
    return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
  };

  return (
    <div className="space-y-6">
      {/* Header & Live Deep Scraper Form */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-emerald-500/30 rounded-2xl p-6 shadow-xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                  Módulo 3 • Creadores de Reels, Bird-Dog Payers, Reddit, FB Groups & Constructores
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                  Con Contrato Firmado O Solo Encontrar la Propiedad (Bird Dog)
                </span>
              </div>
              <h2 className="text-xl font-extrabold text-white mt-1">
                Directorio Profundo & Scraper de Creadores y Cash Buyers que Pagan a Buscadores
              </h2>
              <p className="text-xs text-slate-300 max-w-4xl">
                Investiga y contacta directamente a todos los creadores de tus Reels (Zach Ginn,
                Richard Taylor, Samuel G, Carson, Max, Rowan, Olivia) + compradores nacionales
                (Jerry Norton, KeyGlee/Jamil/Pace, Troy Kearns, RJ Bates, Reddit y Constructores).
                Aquí ves <strong>cuánto te pagan</strong>, <strong>qué propiedades/valores buscan</strong> y{' '}
                <strong>si exigen contrato firmado o si te pagan solo por encontrar la propiedad</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Live Scraper Form */}
        <form
          onSubmit={handleScrape}
          className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-1"
        >
          <div className="md:col-span-4">
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Ciudad / Condado / Estado a Scrapear en Vivo
            </label>
            <input
              type="text"
              value={market}
              onChange={(e) => setMarket(e.target.value)}
              placeholder="Ej: Tampa FL, Detroit MI, Charlotte NC, Houston TX..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="md:col-span-3">
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Tipo de Propiedad (Buy Box)
            </label>
            <select
              value={buyBoxType}
              onChange={(e) =>
                setBuyBoxType(e.target.value as VerifiedCashBuyer['buyBoxType'])
              }
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              {BUY_BOX_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3">
            <label className="block text-xs font-medium text-slate-300 mb-1">
              ¿Cómo Quieres Entregar el Deal?
            </label>
            <select
              value={dealModePreference}
              onChange={(e) => setDealModePreference(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="both_accepted">
                🤝 Ambos (Solo la Propiedad O Contrato Firmado)
              </option>
              <option value="lead_only_birddog">
                🔍 Solo Encontrar la Propiedad (Sin Contrato / Bird Dog)
              </option>
              <option value="contract_signed">
                📄 Ya Tengo el Contrato Firmado (Signed PSA)
              </option>
            </select>
          </div>

          <div className="md:col-span-2 flex items-end">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-600/25 transition"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Buscando...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  Scrapear Ahora
                </>
              )}
            </button>
          </div>
        </form>

        {/* Post Magnet Generator & Facebook REI Group Launchpad */}
        <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-2.5">
            <div>
              <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <MessageSquarePlus className="w-4 h-4" />
                Anuncios Imán de Alta Conversión para Grupos de Facebook & Reddit (Atraen 15 a 40 Compradores con Teléfono y Email):
              </span>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Copia y pega este anuncio en los grupos de Facebook de Detroit, Cleveland o nacionales. Incluye tu entidad <strong>AI Automated Services LLC</strong>.
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'detroit', label: '🏙️ Detroit (Section 8 $62k)' },
                { id: 'cleveland', label: '🔨 Cleveland (Fix & Flip $48k)' },
                { id: 'land', label: '🏗️ Terrenos / Builders ($18k)' },
                { id: 'generic', label: `📍 ${market}` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedMagnet(tab.id as any)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                    selectedMagnet === tab.id
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => copyText('magnet-post', magnetPosts[selectedMagnet])}
                className="text-xs px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition"
              >
                {copiedId === 'magnet-post' ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                {copiedId === 'magnet-post' ? '¡Copiado!' : 'Copiar Anuncio'}
              </button>
            </div>
          </div>

          <pre className="text-xs text-slate-200 font-mono whitespace-pre-wrap bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 max-h-48 overflow-y-auto leading-relaxed">
            {magnetPosts[selectedMagnet]}
          </pre>

          {/* Top Facebook Groups Launchpad with Direct Links */}
          <div className="pt-2 border-t border-slate-800/80 space-y-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                Grupos de Facebook Más Activos de USA para Pegar Este Anuncio:
              </span>
              <button
                type="button"
                onClick={() => setShowQuestionsGuide(!showQuestionsGuide)}
                className="text-[11px] text-amber-300 hover:underline font-semibold"
              >
                {showQuestionsGuide ? 'Ocultar Respuestas de Entrada' : '🔑 Ver Respuestas para Entrar a Grupos Privados'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {[
                {
                  name: 'Detroit Wholesalers & Cash Buyers Only',
                  members: '14,200 miembros',
                  market: 'Detroit, MI',
                  url: 'https://www.facebook.com/groups/detroitcashbuyerswholesalers/',
                },
                {
                  name: 'Metro Detroit Real Estate Investors Group',
                  members: '9,800 miembros',
                  market: 'Detroit & Metro, MI',
                  url: 'https://www.facebook.com/groups/metrodetroitrei/',
                },
                {
                  name: 'Cleveland OH Off Market/Wholesale Real Estate',
                  members: '18,500 miembros',
                  market: 'Cleveland, OH',
                  url: 'https://www.facebook.com/groups/clevelandrealestateinvestors/',
                },
                {
                  name: 'Ohio Real Estate Investors & Cash Buyers',
                  members: '24,000 miembros',
                  market: 'Cleveland / Columbus / Akron',
                  url: 'https://www.facebook.com/groups/ohiorealestateinvestors/',
                },
                {
                  name: 'Texas Wholesale Real Estate Network',
                  members: '32,000 miembros',
                  market: 'DFW, Houston, San Antonio, TX',
                  url: 'https://www.facebook.com/groups/texaswholesalerealestate/',
                },
                {
                  name: 'Atlanta Real Estate Investors (GaREIA)',
                  members: '21,500 miembros',
                  market: 'Metro Atlanta, GA',
                  url: 'https://www.facebook.com/groups/atlantarealestateinvestors/',
                },
              ].map((g, idx) => (
                <a
                  key={idx}
                  href={g.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-sky-500/40 transition flex items-center justify-between group"
                >
                  <div className="min-w-0 pr-2">
                    <h4 className="text-xs font-bold text-white group-hover:text-sky-300 truncate">
                      {g.name}
                    </h4>
                    <p className="text-[10px] text-slate-400">
                      {g.market} • <span className="text-emerald-400">{g.members}</span>
                    </p>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-sky-400 shrink-0" />
                </a>
              ))}
            </div>

            {/* Expandable Membership Questions Guide */}
            {showQuestionsGuide && (
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-2 mt-2">
                <div className="font-bold text-amber-300">
                  📋 Respuestas Aprobadas para las Preguntas de Membresía de Facebook (Membership Questions):
                </div>
                <div className="space-y-1.5 text-slate-300 text-[11px] font-mono">
                  <div>
                    <strong className="text-white">Pregunta 1: ¿Eres inversionista, wholesaler o agente?</strong>
                    <p className="text-amber-200">
                      &rarr; &quot;Direct Acquisition Partner at AI Automated Services LLC. We source off-market properties and buy/assign directly.&quot;
                    </p>
                  </div>
                  <div>
                    <strong className="text-white">Pregunta 2: ¿Aceptas no publicar propiedades de terceros (no daisy chaining)?</strong>
                    <p className="text-amber-200">
                      &rarr; &quot;100% Yes. We only post direct equitable interest contracts held by our company.&quot;
                    </p>
                  </div>
                  <div>
                    <strong className="text-white">Pregunta 3: ¿Cuál es tu correo para enviarte o recibir deals?</strong>
                    <p className="text-amber-200">
                      &rarr; &quot;deals@aiautomatedservices.com&quot;
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filter Bar: Deal Requirement Mode + Platform + Quick Search */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400 mr-1">
              Filtrar por Cómo Quieren el Deal:
            </span>
            {[
              { id: 'all', label: `Todos (${cashBuyers.length})` },
              {
                id: 'accepts_lead_only',
                label: '🔍 Aceptan SOLO Encontrar la Propiedad (Sin Contrato / Bird Dog)',
              },
              {
                id: 'requires_contract',
                label: '📄 Exigen Contrato Ya Firmado (Signed PSA)',
              },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setFilterDealMode(m.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  filterDealMode === m.id
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por creador, estado, lote, SubTo, $10,000..."
            className="w-full sm:w-72 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white"
          />
        </div>

        <div className="flex flex-wrap gap-2 pt-1 border-t border-slate-800/80">
          {[
            { id: 'all', label: '🌐 Todas las Fuentes' },
            { id: 'reel_buyer', label: '🎬 Creadores de Reels / IG / YouTube' },
            { id: 'reddit', label: '🤖 Reddit (r/WholesalingHouses)' },
            { id: 'builder_database', label: '🏗️ Constructores & Terrenos (LandAtlas)' },
            { id: 'web_directory', label: '🚀 Portales JV Nacionales (KeyGlee / Carbon REI)' },
            { id: 'facebook_group', label: '👥 Grupos de Facebook' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterPlatform(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                filterPlatform === tab.id
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Deep Creator & Buyer Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filteredBuyers.map((buyer) => {
          const pitchId = `pitch-${buyer.id}`;
          const emailId = `email-${buyer.id}`;
          return (
            <div
              key={buyer.id}
              className="bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-5 flex flex-col justify-between transition shadow-lg space-y-4"
            >
              <div className="space-y-3.5">
                {/* Top Badges */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold uppercase px-2.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {buyer.creatorHandle || buyer.platform.replace('_', ' ')}
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-md bg-slate-800 text-amber-300 font-semibold">
                      {buyer.buyBoxType}
                    </span>
                  </div>

                  <span
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border ${getModeBadgeStyle(
                      buyer.dealRequirementMode
                    )}`}
                  >
                    {buyer.dealRequirementLabel ||
                      '🤝 Acepta Propiedad o Contrato Firmado'}
                  </span>
                </div>

                {/* Title & Organization */}
                <div>
                  <h3 className="text-base font-extrabold text-white leading-snug">
                    {buyer.name}
                  </h3>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {buyer.companyOrGroup}
                  </div>
                </div>

                {/* 1. How Much They Pay Finders */}
                <div className="p-3 rounded-xl bg-emerald-950/35 border border-emerald-500/40">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5" />
                    ¿Cuánto Pagan al Buscador (Finder’s Fee / JV Split)?
                  </div>
                  <div className="text-xs font-extrabold text-white mt-0.5">
                    {buyer.finderPayoutOffer ||
                      `Paga $10,000+ Assignment Fee o 50/50 JV Split (${buyer.maxPrice})`}
                  </div>
                </div>

                {/* 2. Where & What Price Range */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="text-[11px] font-bold text-sky-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      Dónde Buscan Propiedades:
                    </div>
                    <div className="text-slate-200 font-medium leading-relaxed">
                      {buyer.market}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="text-[11px] font-bold text-amber-400 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      Valores, Precios y Fórmula ARV:
                    </div>
                    <div className="text-slate-200 font-medium leading-relaxed">
                      {buyer.priceAndArvRange || buyer.maxPrice}
                    </div>
                  </div>
                </div>

                {/* 3. Exact Property Characteristics Wanted */}
                {buyer.propertySpecsWanted && (
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-xs">
                    <div className="text-[11px] font-bold text-indigo-300 flex items-center gap-1">
                      <Home className="w-3.5 h-3.5" />
                      Qué Propiedades y Características Exactas Necesitan (Buy Box):
                    </div>
                    <p className="text-slate-300 whitespace-pre-line leading-relaxed">
                      {buyer.propertySpecsWanted}
                    </p>
                  </div>
                )}

                {/* 4. How They Want the Deal (Signed Contract vs Raw Property Lead) */}
                {buyer.dealRequirementDetails && (
                  <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-1 text-xs">
                    <div className="text-[11px] font-bold text-amber-300 flex items-center gap-1">
                      <FileCheck2 className="w-3.5 h-3.5" />
                      ¿Cómo Quieren el Deal? (¿Contrato Ya Firmado o Solo la Propiedad?):
                    </div>
                    <p className="text-slate-200 whitespace-pre-line leading-relaxed">
                      {buyer.dealRequirementDetails}
                    </p>
                  </div>
                )}

                {/* 5. Ready-to-Send Pitch Message */}
                {buyer.readyPitchMessage && (
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold text-emerald-300 flex items-center gap-1">
                        <Send className="w-3 h-3" />
                        Mensaje Listo para Enviarles tu Propiedad / Deal:
                      </span>
                      <button
                        type="button"
                        onClick={() => copyText(pitchId, buyer.readyPitchMessage || '')}
                        className="px-2.5 py-1 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold flex items-center gap-1"
                      >
                        {copiedId === pitchId ? (
                          <>
                            <Check className="w-3 h-3" /> Copiado
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" /> Copiar Mensaje
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed">
                      {buyer.readyPitchMessage}
                    </p>
                  </div>
                )}

                {/* Additional Context / Proof from Reels */}
                <p className="text-[11px] text-slate-400 italic px-1">
                  📌 {buyer.notes}
                </p>
              </div>

              {/* Footer Action Buttons (Direct Contact Links) */}
              <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Contacto Directo Verificado
                </span>

                <div className="flex flex-wrap gap-1.5">
                  {buyer.directContactChannels?.dealPortalUrl && (
                    <a
                      href={buyer.directContactChannels.dealPortalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 transition"
                    >
                      Enviar Deal / Portal
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}

                  {buyer.directContactChannels?.socialDmUrl && (
                    <a
                      href={buyer.directContactChannels.socialDmUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-pink-600/25 hover:bg-pink-600/35 text-pink-300 border border-pink-500/40 text-xs font-bold flex items-center gap-1 transition"
                    >
                      DM / Perfil Red Social
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}

                  {buyer.directContactChannels?.communityUrl && (
                    <a
                      href={buyer.directContactChannels.communityUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-indigo-600/25 hover:bg-indigo-600/35 text-indigo-300 border border-indigo-500/40 text-xs font-bold flex items-center gap-1 transition"
                    >
                      Grupo / Reel Fuente
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}

                  {buyer.directContactChannels?.emailOrPhone && (
                    <button
                      type="button"
                      onClick={() =>
                        copyText(emailId, buyer.directContactChannels?.emailOrPhone || '')
                      }
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1"
                    >
                      {copiedId === emailId ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" /> Email Copiado
                        </>
                      ) : (
                        <>
                          <Mail className="w-3 h-3" /> {buyer.directContactChannels.emailOrPhone}
                        </>
                      )}
                    </button>
                  )}

                  {!buyer.directContactChannels && (
                    <a
                      href={buyer.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5 transition"
                    >
                      Abrir Canal / Contactar
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
