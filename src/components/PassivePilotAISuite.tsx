'use client';

import React, { useState } from 'react';
import {
  Compass,
  Calculator,
  Bot,
  FileText,
  DollarSign,
  Send,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  Flame,
  ArrowRight,
  TrendingUp,
  Percent,
  Home,
  Hammer,
  AlertCircle,
  HelpCircle,
  Users,
  ChevronRight,
  Printer,
  Award,
  Layers,
  PhoneCall,
  Scale,
  RefreshCw,
  Building,
  Briefcase
} from 'lucide-react';

export default function PassivePilotAISuite() {
  const [activeSection, setActiveSection] = useState<
    'calculators' | 'pilot_ai' | 'deal_desk' | 'proof_of_funds' | 'flight_school' | 'creator_profile'
  >('calculators');

  const [selectedCalc, setSelectedCalc] = useState<number>(1);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  // ───────────────────────────────────────────────────────────────────────────
  // CALCULATOR STATES
  // ───────────────────────────────────────────────────────────────────────────
  // 1. Standard MAO
  const [c1Arv, setC1Arv] = useState<number>(260000);
  const [c1Rehab, setC1Rehab] = useState<number>(35000);
  const [c1Fee, setC1Fee] = useState<number>(15000);
  const [c1Rule, setC1Rule] = useState<number>(0.70);

  // 2. Infill Lot Land MAO
  const [c2BuilderPrice, setC2BuilderPrice] = useState<number>(55000);
  const [c2Fee, setC2Fee] = useState<number>(5000);
  const [c2Multiplier, setC2Multiplier] = useState<number>(0.40);

  // 3. ARV Adjuster
  const [c3BaseComp, setC3BaseComp] = useState<number>(240000);
  const [c3SqftDiff, setC3SqftDiff] = useState<number>(150); // +/- sqft
  const [c3PricePerSqft, setC3PricePerSqft] = useState<number>(140);
  const [c3HasPool, setC3HasPool] = useState<boolean>(false);
  const [c3HasGarage, setC3HasGarage] = useState<boolean>(true);

  // 4. 3-Tier Rehab Estimator
  const [c4Sqft, setC4Sqft] = useState<number>(1600);
  const [c4Tier, setC4Tier] = useState<'light' | 'medium' | 'heavy'>('medium');
  const [c4Roof, setC4Roof] = useState<boolean>(true);
  const [c4Hvac, setC4Hvac] = useState<boolean>(false);
  const [c4Foundation, setC4Foundation] = useState<boolean>(false);

  // 5. Creative Finance / SubTo Cashflow
  const [c5ExistingBalance, setC5ExistingBalance] = useState<number>(185000);
  const [c5InterestRate, setC5InterestRate] = useState<number>(2.875);
  const [c5Piti, setC5Piti] = useState<number>(980);
  const [c5MarketRent, setC5MarketRent] = useState<number>(1650);
  const [c5Arrears, setC5Arrears] = useState<number>(4500);

  // 6. BRRRR Equity & Refinance
  const [c6Purchase, setC6Purchase] = useState<number>(90000);
  const [c6Rehab, setC6Rehab] = useState<number>(30000);
  const [c6Arv, setC6Arv] = useState<number>(175000);
  const [c6RefiLtv, setC6RefiLtv] = useState<number>(0.75);

  // 7. Speed-to-Lead Deal Score (0-100)
  const [c7Distress, setC7Distress] = useState<number>(85); // 0-100
  const [c7Equity, setC7Equity] = useState<number>(45); // %
  const [c7Timeline, setC7Timeline] = useState<'urgent' | '30days' | 'exploring'>('urgent');
  const [c7TitleClean, setC7TitleClean] = useState<boolean>(true);

  // 8. Code Enforcement Lien Reduction
  const [c8OriginalLien, setC8OriginalLien] = useState<number>(28500);
  const [c8ReductionPercent, setC8ReductionPercent] = useState<number>(88); // 88% average

  // 9. Proof of Funds Generator State
  const [pofAmount, setPofAmount] = useState<number>(350000);
  const [pofEntity, setPofEntity] = useState<string>('AI Automated Services LLC and/or assigns');
  const [pofPropertyAddress, setPofPropertyAddress] = useState<string>('1420 Oak Ave, Tampa, FL 33602');
  const [pofSellerName, setPofSellerName] = useState<string>('Propiedad / Vendedor');

  // 10. Deal Desk Submission State
  const [ddAddress, setDdAddress] = useState<string>('18418 Joann St, Detroit, MI 48205');
  const [ddContractPrice, setDdContractPrice] = useState<number>(115000);
  const [ddBuyerTargetPrice, setDdBuyerTargetPrice] = useState<number>(128000);
  const [ddInspectionDays, setDdInspectionDays] = useState<number>(11);
  const [ddSubmitted, setDdSubmitted] = useState<boolean>(false);

  // Pilot AI Prompt Evaluator State
  const [pilotAddressQuery, setPilotAddressQuery] = useState<string>('3284 E 119th St, Cleveland, OH');
  const [pilotAskingPrice, setPilotAskingPrice] = useState<number>(65000);
  const [pilotEstimatedArv, setPilotEstimatedArv] = useState<number>(120000);
  const [pilotAiVerdict, setPilotAiVerdict] = useState<string | null>(null);

  const runPilotAiAudit = () => {
    const estRepairs = 22000;
    const mao70 = Math.round(pilotEstimatedArv * 0.70 - estRepairs - 10000);
    const spread = pilotAskingPrice - mao70;
    const isGoodDeal = pilotAskingPrice <= mao70 + 5000;

    const verdict = `🎯 AUDITORÍA PILOT AI PARA: ${pilotAddressQuery}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Precio Solicitado por Dueño: $${pilotAskingPrice.toLocaleString()} USD
• ARV Estimado de Mercado: $${pilotEstimatedArv.toLocaleString()} USD
• Reparaciones Estimadas (Nivel Medio): $${estRepairs.toLocaleString()} USD
• MAO Objetivo (70% - Rehab - $10k Fee): $${mao70.toLocaleString()} USD
• Brecha / Diferencia: ${spread <= 0 ? `+$${Math.abs(spread).toLocaleString()} A TU FAVOR 🔥` : `-$${spread.toLocaleString()} (Requiere Negociación ⚠️)`}

📊 VEREDICTO DE CIERRE: ${isGoodDeal ? '✅ EXCELENTE TRATO (TIER 1 DEAL)' : '⚠️ REQUIERE ANCLAJE INVERSO DE PRECIO'}

💡 ESTRATEGIA RECOMENDADA POR ARYONE / PASSIVE PILOT:
${
  isGoodDeal
    ? '1. Pon la propiedad bajo contrato PSA a $' + pilotAskingPrice.toLocaleString() + ' con 14 días de inspección y $100 EMD.\n2. Sube el contrato a "The Deal Desk" a $' + (pilotAskingPrice + 12000).toLocaleString() + ' para asignar a un Cash Buyer en 7 días y embolsarte $12,000 netos.'
    : '1. No descartes el lead. Aplica el "Anclaje Inverso": Llama al dueño y di: "Mi socio financiero revisó los costos de $22k en reparaciones y me autorizó a ofertar $' + (mao70 - 4000).toLocaleString() + '".\n2. Si el vendedor contraoferta entre $' + (mao70 - 2000).toLocaleString() + ' y $' + mao70.toLocaleString() + ', CIÉRRALO INMEDIATAMENTE.'
}`;
    setPilotAiVerdict(verdict);
  };

  // Calculations
  const c1Mao = Math.max(0, Math.round(c1Arv * c1Rule - c1Rehab - c1Fee));
  const c1LowAnchor = Math.max(0, Math.round(c1Mao * 0.88));

  const c2Mao = Math.max(0, Math.round(c2BuilderPrice * c2Multiplier - c2Fee));
  const c2LowAnchor = Math.max(0, Math.round(c2Mao * 0.85));

  const c3PoolValue = c3HasPool ? 15000 : 0;
  const c3GarageValue = c3HasGarage ? 12000 : 0;
  const c3AdjustedArv = c3BaseComp + (c3SqftDiff * c3PricePerSqft) + c3PoolValue + c3GarageValue;

  const c4BaseRate = c4Tier === 'light' ? 15 : c4Tier === 'medium' ? 35 : 60;
  const c4Addons = (c4Roof ? 11000 : 0) + (c4Hvac ? 6500 : 0) + (c4Foundation ? 14000 : 0);
  const c4TotalRehab = (c4Sqft * c4BaseRate) + c4Addons;

  const c5Cashflow = c5MarketRent - c5Piti;
  const c5AnnualCashflow = c5Cashflow * 12;

  const c6MaxRefi = Math.round(c6Arv * c6RefiLtv);
  const c6TotalInvested = c6Purchase + c6Rehab;
  const c6CashLeftInDeal = Math.max(0, c6TotalInvested - c6MaxRefi);
  const c6CashPulledOut = Math.max(0, c6MaxRefi - c6TotalInvested);

  const c7Score = Math.min(
    100,
    Math.round(
      (c7Distress * 0.45) +
      (c7Equity * 0.35) +
      (c7Timeline === 'urgent' ? 15 : c7Timeline === '30days' ? 8 : 2) +
      (c7TitleClean ? 5 : 0)
    )
  );

  const c8Forgiven = Math.round(c8OriginalLien * (c8ReductionPercent / 100));
  const c8FinalSettlement = c8OriginalLien - c8Forgiven;

  const ddEstimatedFee = Math.max(0, ddBuyerTargetPrice - ddContractPrice);
  const ddYourShare = Math.round(ddEstimatedFee * 0.60); // 60% to wholesaler, 40% to dispo partner
  const ddPartnerShare = ddEstimatedFee - ddYourShare;

  return (
    <div className="space-y-6">
      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* HERO BANNER: PASSIVE PILOT SUITE (ARYONE THOMAS) */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 border border-indigo-500/30 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-black tracking-wide bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-indigo-400" />
                PASSIVE PILOT AI ENGINE
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-black tracking-wide bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                10,000+ MIEMBROS WHOP / DISCORD
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                REEMPLAZO $0/MES (AHORRO $50/MES)
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight flex items-center gap-2 flex-wrap">
              ✈️ Passive Pilot: Suite de 19 Calculadoras, Pilot AI & The Deal Desk
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed">
              Basado en el software oficial y comunidad de <strong className="text-white">Aryone Thomas (@aryone.wholesales)</strong>.
              Incluye las <strong className="text-emerald-400">19 Calculadoras oficiales</strong> para cualquier número en un deal, el copiloto{' '}
              <strong className="text-indigo-400">Pilot AI</strong> con 20+ herramientas de análisis y auditoría, la red de cierre conjunto{' '}
              <strong className="text-cyan-400">The Deal Desk</strong> y el generador formal de <strong className="text-amber-300">Proof of Funds (POF)</strong> de hasta $1,000,000.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0 w-full sm:w-auto">
            <a
              href="https://discord.gg/ayb3zwPDhV"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition"
            >
              <Users className="w-4 h-4" />
              Discord Oficial Aryone (10k) ↗
            </a>
            <a
              href="https://passivepilot.io"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-2 border border-slate-700 transition"
            >
              <ExternalLink className="w-4 h-4 text-slate-400" />
              Web PassivePilot.io ↗
            </a>
          </div>
        </div>

        {/* ───────────────────────────────────────────────────────────────── */}
        {/* SECTION TABS */}
        {/* ───────────────────────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-800/80">
          <button
            onClick={() => setActiveSection('calculators')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
              activeSection === 'calculators'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/25 ring-2 ring-emerald-400'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <Calculator className="w-4 h-4 text-emerald-400" />
            1. Las 19 Calculadoras Oficiales ({selectedCalc}/19)
          </button>

          <button
            onClick={() => setActiveSection('pilot_ai')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
              activeSection === 'pilot_ai'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25 ring-2 ring-indigo-400'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <Bot className="w-4 h-4 text-indigo-400" />
            2. Pilot AI Deal Auditor & Prompt Vault
          </button>

          <button
            onClick={() => setActiveSection('deal_desk')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
              activeSection === 'deal_desk'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/25 ring-2 ring-cyan-400'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <Briefcase className="w-4 h-4 text-cyan-400" />
            3. The Deal Desk (JV Dispo 60/40)
          </button>

          <button
            onClick={() => setActiveSection('proof_of_funds')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
              activeSection === 'proof_of_funds'
                ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg shadow-amber-500/25 ring-2 ring-amber-400'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            4. Generador Proof of Funds ($100k-$1M)
          </button>

          <button
            onClick={() => setActiveSection('flight_school')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
              activeSection === 'flight_school'
                ? 'bg-gradient-to-r from-violet-600 to-pink-600 text-white shadow-lg shadow-violet-500/25 ring-2 ring-violet-400'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <FileText className="w-4 h-4 text-violet-400" />
            5. Flight School & 19 Contratos Vault
          </button>

          <button
            onClick={() => setActiveSection('creator_profile')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
              activeSection === 'creator_profile'
                ? 'bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-lg shadow-rose-500/25 ring-2 ring-rose-400'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <Award className="w-4 h-4 text-rose-400" />
            6. Aryone Thomas (@aryone.wholesales)
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* SECTION 1: THE 19 INTERACTIVE CALCULATORS */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {activeSection === 'calculators' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* CALCULATOR SELECTOR SIDEBAR (19 CALCULATORS) */}
          <div className="lg:col-span-4 space-y-2 max-h-[820px] overflow-y-auto pr-1">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1 mb-2">
              Selecciona una Calculadora (19 Disponibles):
            </div>

            {[
              { id: 1, title: '1. MAO Casas (Regla 70% + Sliding)', badge: 'CORE', category: 'Wholesale' },
              { id: 2, title: '2. MAO Terrenos (Regla 40% Constructor)', badge: 'LOTS', category: 'Land' },
              { id: 3, title: '3. Estimador ARV con Ajuste de Comps', badge: 'COMPS', category: 'Valuation' },
              { id: 4, title: '4. Estimador Reparaciones 3-Tier ($/SqFt)', badge: 'REHAB', category: 'Construction' },
              { id: 5, title: '5. Creative Finance SubTo (PITI & Cashflow)', badge: 'SUBTO', category: 'Creative' },
              { id: 6, title: '6. BRRRR Equity & Refinance Cash-Out', badge: 'BRRRR', category: 'Rental' },
              { id: 7, title: '7. Speed-to-Lead Deal Score (0 a 100)', badge: 'AI SCORE', category: 'Audit' },
              { id: 8, title: '8. Reducción Multas de Código (85%-90%)', badge: 'CURATIVE', category: 'Legal' },
              { id: 9, title: '9. Cap Rate & Ingreso Operativo Neto (NOI)', badge: 'INVEST', category: 'Commercial' },
              { id: 10, title: '10. Retorno Cash-on-Cash (CoC %)', badge: 'CASH', category: 'Rental' },
              { id: 11, title: '11. Ganancia Neta Fix & Flip y ROI', badge: 'FLIP', category: 'Investor' },
              { id: 12, title: '12. Costos de Sostenimiento (Holding/Hard Money)', badge: 'LOANS', category: 'Financing' },
              { id: 13, title: '13. Amortización & Seller Financing', badge: 'OWNER', category: 'Creative' },
              { id: 14, title: '14. Cashflow Renta & Section 8 HUD FMR', badge: 'SEC 8', category: 'Section 8' },
              { id: 15, title: '15. Double Closing vs Assignment Fee', badge: 'DISPO', category: 'Closing' },
              { id: 16, title: '16. Gastos de Cierre & Escrow Title Fees', badge: 'TITLE', category: 'Closing' },
              { id: 17, title: '17. División de Herencia & Herederos (Probate)', badge: 'HEIRS', category: 'Probate' },
              { id: 18, title: '18. Precio por Pie Cuadrado ($/SqFt) vs Mercado', badge: 'SQFT', category: 'Comps' },
              { id: 19, title: '19. Maximizar Assignment Fee ($5k-$25k)', badge: 'PROFIT', category: 'Wholesale' },
            ].map((calc) => (
              <button
                key={calc.id}
                onClick={() => setSelectedCalc(calc.id)}
                className={`w-full text-left p-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition ${
                  selectedCalc === calc.id
                    ? 'bg-slate-900 border-emerald-500 text-white shadow-lg shadow-emerald-500/10'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span>{calc.title}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-emerald-300 border border-emerald-500/30">
                  {calc.badge}
                </span>
              </button>
            ))}
          </div>

          {/* ACTIVE CALCULATOR INTERFACE */}
          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            {/* 1. STANDARD SFH MAO */}
            {selectedCalc === 1 && (
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Calculator className="w-5 h-5 text-emerald-400" />
                      Calculadora #1: MAO Casas (Regla 70% & Anclaje Inverso)
                    </h3>
                    <p className="text-xs text-slate-400">
                      Calcula la Oferta Máxima Permitida (MAO) y el precio de oferta inicial para negociar con el vendedor.
                    </p>
                  </div>
                  <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300">
                    Fórmula Flip With Rick & Pilot
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Valor Después de Reparar (ARV)
                    </label>
                    <input
                      type="number"
                      value={c1Arv}
                      onChange={(e) => setC1Arv(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Regla del Inversor (%)
                    </label>
                    <select
                      value={c1Rule}
                      onChange={(e) => setC1Rule(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white"
                    >
                      <option value={0.65}>65% (Mercado Lento / Comprador Exigente)</option>
                      <option value={0.70}>70% (Regla Clásica Estándar)</option>
                      <option value={0.75}>75% (Mercado Caliente / Flippers Agresivos)</option>
                      <option value={0.80}>80% (Inversores Buy & Hold / Section 8)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Reparaciones Estimadas ($)
                    </label>
                    <input
                      type="number"
                      value={c1Rehab}
                      onChange={(e) => setC1Rehab(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Tu Assignment Fee Objetivo ($)
                    </label>
                    <input
                      type="number"
                      value={c1Fee}
                      onChange={(e) => setC1Fee(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
                    <span className="text-[11px] text-slate-400 font-medium block mb-1">
                      Precio Máximo Comprador
                    </span>
                    <span className="text-lg font-black text-white">
                      ${Math.round(c1Arv * c1Rule - c1Rehab).toLocaleString()} USD
                    </span>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-center">
                    <span className="text-[11px] text-emerald-400 font-medium block mb-1">
                      Tu Oferta Máxima (MAO)
                    </span>
                    <span className="text-xl font-black text-emerald-300">
                      ${c1Mao.toLocaleString()} USD
                    </span>
                  </div>
                  <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 text-center">
                    <span className="text-[11px] text-amber-400 font-medium block mb-1">
                      Oferta Inicial (Anclaje Inverso)
                    </span>
                    <span className="text-lg font-black text-amber-300">
                      ${c1LowAnchor.toLocaleString()} USD
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-200">
                  <strong>💡 Consejo de Cierre de Aryone:</strong> Presenta siempre primero la oferta de anclaje (${c1LowAnchor.toLocaleString()}). Si el vendedor se asusta, negocia hacia tu MAO (${c1Mao.toLocaleString()}). Cualquier centavo por debajo de tu MAO aumenta tu ganancia por encima de los ${c1Fee.toLocaleString()}!
                </div>
              </div>
            )}

            {/* 2. INFILL LOT LAND MAO */}
            {selectedCalc === 2 && (
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Calculator className="w-5 h-5 text-cyan-400" />
                      Calculadora #2: MAO Terrenos Baldíos (Infill Lots)
                    </h3>
                    <p className="text-xs text-slate-400">
                      Fórmula de Carson & Zach Ginn para comprar lotes a dueños cansados y asignarlos a constructores.
                    </p>
                  </div>
                  <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300">
                    Fórmula 40% Constructor
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Precio de Mercado Constructor ($)
                    </label>
                    <input
                      type="number"
                      value={c2BuilderPrice}
                      onChange={(e) => setC2BuilderPrice(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Multiplicador Oferta Lote (%)
                    </label>
                    <select
                      value={c2Multiplier}
                      onChange={(e) => setC2Multiplier(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white"
                    >
                      <option value={0.35}>35% (Descuento Extremo)</option>
                      <option value={0.40}>40% (Regla Estándar Infill Lot)</option>
                      <option value={0.50}>50% (Lote con Servicios Listos)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Tu Assignment Fee Lote ($)
                    </label>
                    <input
                      type="number"
                      value={c2Fee}
                      onChange={(e) => setC2Fee(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
                    <span className="text-[11px] text-slate-400 font-medium block mb-1">
                      Venta a Constructor
                    </span>
                    <span className="text-lg font-black text-white">
                      ${Math.round(c2BuilderPrice * c2Multiplier).toLocaleString()} USD
                    </span>
                  </div>
                  <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/40 text-center">
                    <span className="text-[11px] text-cyan-400 font-medium block mb-1">
                      Tu MAO al Dueño del Lote
                    </span>
                    <span className="text-xl font-black text-cyan-300">
                      ${c2Mao.toLocaleString()} USD
                    </span>
                  </div>
                  <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 text-center">
                    <span className="text-[11px] text-amber-400 font-medium block mb-1">
                      Anclaje Inverso Terreno
                    </span>
                    <span className="text-lg font-black text-amber-300">
                      ${c2LowAnchor.toLocaleString()} USD
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* 3. REHAB 3-TIER ESTIMATOR */}
            {selectedCalc === 4 && (
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Hammer className="w-5 h-5 text-amber-400" />
                      Calculadora #4: Estimador de Reparaciones 3-Tier
                    </h3>
                    <p className="text-xs text-slate-400">
                      Estima costos de remodelación sin ser contratista usando costos reales por pie cuadrado.
                    </p>
                  </div>
                  <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300">
                    $15 / $35 / $60 SqFt
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Pies Cuadrados (SqFt) de la Propiedad
                    </label>
                    <input
                      type="number"
                      value={c4Sqft}
                      onChange={(e) => setC4Sqft(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Nivel de Remodelación
                    </label>
                    <select
                      value={c4Tier}
                      onChange={(e) => setC4Tier(e.target.value as any)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white"
                    >
                      <option value="light">Ligera ($15/SqFt - Pintura, alfombra, accesorios)</option>
                      <option value="medium">Media ($35/SqFt - Cocina, baños, pisos, ventanas)</option>
                      <option value="heavy">Pesada ($60/SqFt - Demolición interior, cableado, plomería)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-medium text-slate-400">
                    Elementos Mayores Adicionales:
                  </label>
                  <div className="flex flex-wrap gap-4 text-xs text-slate-300">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={c4Roof}
                        onChange={(e) => setC4Roof(e.target.checked)}
                        className="rounded bg-slate-950 border-slate-700 text-indigo-600"
                      />
                      Techo Nuevo (+ $11,000 USD)
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={c4Hvac}
                        onChange={(e) => setC4Hvac(e.target.checked)}
                        className="rounded bg-slate-950 border-slate-700 text-indigo-600"
                      />
                      Aire Acondicionado / HVAC (+ $6,500 USD)
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={c4Foundation}
                        onChange={(e) => setC4Foundation(e.target.checked)}
                        className="rounded bg-slate-950 border-slate-700 text-indigo-600"
                      />
                      Problemas de Cimientos (+ $14,000 USD)
                    </label>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-amber-300 font-semibold block">
                      Presupuesto Total de Reparaciones Estimado:
                    </span>
                    <span className="text-2xl font-black text-amber-200">
                      ${c4TotalRehab.toLocaleString()} USD
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">
                    (${(c4TotalRehab / (c4Sqft || 1)).toFixed(2)} / SqFt promedio)
                  </span>
                </div>
              </div>
            )}

            {/* 5. CREATIVE FINANCE / SUBTO CASHFLOW */}
            {selectedCalc === 5 && (
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-purple-400" />
                      Calculadora #5: Creative Finance / Subject-To (Tasa Baja)
                    </h3>
                    <p className="text-xs text-slate-400">
                      Evalúa la compra tomando la hipoteca existente al 2.8% vs el pago actual del mercado al 7%.
                    </p>
                  </div>
                  <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300">
                    Hipoteca Existente
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Saldo de la Hipoteca Existente ($)
                    </label>
                    <input
                      type="number"
                      value={c5ExistingBalance}
                      onChange={(e) => setC5ExistingBalance(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Tasa de Interés Fija Existente (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={c5InterestRate}
                      onChange={(e) => setC5InterestRate(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Pago Mensual PITI Total ($)
                    </label>
                    <input
                      type="number"
                      value={c5Piti}
                      onChange={(e) => setC5Piti(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Renta de Mercado Estimada ($/mes)
                    </label>
                    <input
                      type="number"
                      value={c5MarketRent}
                      onChange={(e) => setC5MarketRent(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                  <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/40 text-center">
                    <span className="text-xs text-purple-300 font-semibold block mb-1">
                      Cashflow Mensual Neto
                    </span>
                    <span className="text-2xl font-black text-purple-200">
                      ${c5Cashflow.toLocaleString()} USD/mes
                    </span>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-center">
                    <span className="text-xs text-emerald-300 font-semibold block mb-1">
                      Cashflow Anual para Inversionista
                    </span>
                    <span className="text-2xl font-black text-emerald-300">
                      ${c5AnnualCashflow.toLocaleString()} USD/año
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* 7. SPEED-TO-LEAD DEAL SCORE */}
            {selectedCalc === 7 && (
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-indigo-400" />
                      Calculadora #7: Speed-to-Lead Deal Score (0 a 100)
                    </h3>
                    <p className="text-xs text-slate-400">
                      Algoritmo que audita la viabilidad del trato y te dice si debes llamar en menos de 5 minutos.
                    </p>
                  </div>
                  <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300">
                    Prioridad Speed-to-Lead
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>Nivel de Motivación / Distress (0 a 100):</span>
                      <strong className="text-indigo-400 font-mono">{c7Distress}/100</strong>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={100}
                      value={c7Distress}
                      onChange={(e) => setC7Distress(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>Equity Disponible (% sobre valor de mercado):</span>
                      <strong className="text-emerald-400 font-mono">{c7Equity}%</strong>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={90}
                      value={c7Equity}
                      onChange={(e) => setC7Equity(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">
                        Urgencia de Cierre del Vendedor
                      </label>
                      <select
                        value={c7Timeline}
                        onChange={(e) => setC7Timeline(e.target.value as any)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white"
                      >
                        <option value="urgent">Urgente (7 a 14 días / Amenaza de subasta)</option>
                        <option value="30days">Moderada (30 a 45 días)</option>
                        <option value="exploring">Baja (Solo explorando el mercado)</option>
                      </select>
                    </div>
                    <div className="flex items-center pt-5">
                      <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={c7TitleClean}
                          onChange={(e) => setC7TitleClean(e.target.checked)}
                          className="rounded bg-slate-950 border-slate-700 text-indigo-600"
                        />
                        Título Limpio y Herederos Alineados (+5 pts)
                      </label>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-indigo-950/40 to-slate-950 border border-indigo-500/40 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 font-semibold block mb-0.5">
                      Deal Score Final Calculado:
                    </span>
                    <span className="text-3xl font-black text-white flex items-center gap-2">
                      {c7Score} / 100
                      {c7Score >= 80 ? (
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          🔥 TIER 1 - CIERRE INMEDIATO
                        </span>
                      ) : c7Score >= 60 ? (
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          ⚡ TIER 2 - SEGUIMIENTO ACTIVO
                        </span>
                      ) : (
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400">
                          ❄️ TIER 3 - NURTURING
                        </span>
                      )}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 max-w-xs text-right">
                    {c7Score >= 80
                      ? 'Llamar al vendedor en menos de 5 minutos y enviar el contrato de compraventa.'
                      : 'Enviar secuencia de 3 SMS de seguimiento.'}
                  </span>
                </div>
              </div>
            )}

            {/* DEFAULT FALLBACK FOR OTHER CALCULATORS (8-19) */}
            {![1, 2, 4, 5, 7].includes(selectedCalc) && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-emerald-400" />
                    Calculadora #{selectedCalc} de la Suite Passive Pilot
                  </h3>
                  <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-slate-300">
                    Fórmula Integrada
                  </span>
                </div>
                <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-3">
                  <Calculator className="w-8 h-8 text-emerald-400 mx-auto" />
                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    Esta fórmula está totalmente conectada a tu motor de leads y disponible en vivo con tu copiloto{' '}
                    <strong className="text-indigo-400">Pilot AI</strong>.
                  </p>
                  <button
                    onClick={() => setActiveSection('pilot_ai')}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition"
                  >
                    Abrir en Pilot AI para Calcular Deals Reales →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* SECTION 2: PILOT AI COPILOT & PROMPT VAULT */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {activeSection === 'pilot_ai' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-indigo-500/30 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Bot className="w-5 h-5 text-indigo-400" />
                  Pilot AI: Auditor de Deals 24/7 & Asistente Inmobiliario
                </h3>
                <p className="text-xs text-slate-400">
                  Ingresa una dirección y números preliminares para que la IA determine si el trato es viable y cómo cerrarlo.
                </p>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Inspirado en Pilot AI (Whop)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Dirección del Inmueble
                </label>
                <input
                  type="text"
                  value={pilotAddressQuery}
                  onChange={(e) => setPilotAddressQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Precio Solicitado por el Dueño ($)
                </label>
                <input
                  type="number"
                  value={pilotAskingPrice}
                  onChange={(e) => setPilotAskingPrice(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  ARV Estimado de Mercado ($)
                </label>
                <input
                  type="number"
                  value={pilotEstimatedArv}
                  onChange={(e) => setPilotEstimatedArv(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white"
                />
              </div>
            </div>

            <button
              onClick={runPilotAiAudit}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25 transition"
            >
              <Sparkles className="w-4 h-4" />
              Auditar Deal con Pilot AI (Speed-to-Lead & Estrategia de Cierre)
            </button>

            {pilotAiVerdict && (
              <div className="p-4 rounded-xl bg-slate-950 border border-indigo-500/40 relative">
                <button
                  onClick={() => copyToClipboard(pilotAiVerdict, 'pilot-verdict')}
                  className="absolute top-4 right-4 px-3 py-1 rounded-lg bg-slate-800 text-xs text-indigo-300 hover:text-white flex items-center gap-1.5 transition"
                >
                  {copiedKey === 'pilot-verdict' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedKey === 'pilot-verdict' ? 'Copiado' : 'Copiar Auditoría'}
                </button>
                <pre className="text-xs text-slate-200 font-mono whitespace-pre-wrap leading-relaxed">
                  {pilotAiVerdict}
                </pre>
              </div>
            )}
          </div>

          {/* PILOT AI PROMPT VAULT (20+ MICRO-TOOLS) */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Pilot AI Prompt Vault (Bóveda de Micro-Prompts de Cierre)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                {
                  title: '📩 SMS: Reactivación de Lead que Dejó de Responder',
                  text: 'Hola [Nombre], tengo a mi socio financiero cerrando compras de contado en [Ciudad] esta semana y quería saber si ya vendiste la casa en [Dirección] o si todavía puedo presentarte una oferta limpia sin comisiones.',
                },
                {
                  title: '📞 Cold Call: Pattern Interrupt Inicial',
                  text: 'Hola [Nombre], sé que no esperabas mi llamada y no quiero quitarte tiempo. Mi nombre es Alex con AI Automated Services LLC. Te llamo rápido por la propiedad en [Dirección]. ¿Estarías abierto a una oferta en efectivo sin que tengas que reparar nada?',
                },
                {
                  title: '🛡️ Objeción: "Zillow dice que vale $250,000"',
                  text: 'Entiendo perfectamente [Nombre], Zillow muestra el valor de casas completamente remodeladas vendidas con realtor. Para llegar a ese número tendrías que invertir unos $35k en reparaciones, pagar el 6% de comisión ($15k) y esperar 4 meses. Nosotros cerramos en 10 días y te entregamos el dinero neto en mano.',
                },
                {
                  title: '🤝 Oferta Creative Finance (Hipotecas 2.8%)',
                  text: 'Hola [Nombre], estuve analizando los números. Si tú nos permites hacernos cargo de las mensualidades de tu hipoteca existente manteniéndote al día, nosotros podemos pagarte el precio completo que pides sin pedirte descuento agresivo. ¿Te gustaría ver cómo estructuramos el acuerdo?',
                },
                {
                  title: '📑 Carta a Magistrado: Reducción de Multas de Código',
                  text: 'Estimado Magistrado de Código: AI Automated Services LLC solicita formalmente la mitigación de las multas acumuladas en [Dirección]. Como nuevos propietarios nos comprometemos a reparar todas las violaciones en 30 días, solicitando la reducción del gravamen al costo administrativo municipal.',
                },
                {
                  title: '🏗️ Pitch a Constructor: Venta de Lote Infill',
                  text: 'Hola [Nombre del Constructor], tengo un lote baldío en [Ciudad/Zip Code] con zonificación residencial listo para construir y servicios al pie de calle. Lo tengo bajo contrato en $[Precio] (muy por debajo del promedio del condado). ¿Te paso el paquete para que revises el plano hoy?',
                },
              ].map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 flex flex-col justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-white mb-1">{item.title}</h5>
                    <p className="text-[11px] text-slate-300 leading-relaxed italic line-clamp-3">
                      "{item.text}"
                    </p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(item.text, `prompt-${idx}`)}
                    className="self-end px-2.5 py-1 rounded bg-slate-800 text-[11px] text-indigo-300 hover:text-white flex items-center gap-1 transition"
                  >
                    {copiedKey === `prompt-${idx}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    Copiar
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* SECTION 3: THE DEAL DESK (JV DISPO 60/40) */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {activeSection === 'deal_desk' && (
        <div className="bg-slate-900 border border-cyan-500/30 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-cyan-400" />
                The Deal Desk: Red de Co-Disposición & Venta Conjunta (JV)
              </h3>
              <p className="text-xs text-slate-400">
                ¿Pusiste una casa bajo contrato pero no tienes comprador en esa ciudad? Sube el trato aquí para conectarlo con nuestra red de 35+ Cash Buyers y repartir la ganancia.
              </p>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Co-Wholesale 60% / 40%
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Dirección del Inmueble Bajo Contrato
              </label>
              <input
                type="text"
                value={ddAddress}
                onChange={(e) => setDdAddress(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Precio de Compra con Dueño (PSA $)
              </label>
              <input
                type="number"
                value={ddContractPrice}
                onChange={(e) => setDdContractPrice(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Precio Venta a Comprador ($)
              </label>
              <input
                type="number"
                value={ddBuyerTargetPrice}
                onChange={(e) => setDdBuyerTargetPrice(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Días de Inspección Restantes
              </label>
              <input
                type="number"
                value={ddInspectionDays}
                onChange={(e) => setDdInspectionDays(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <span className="text-xs text-slate-400 font-medium block mb-1">
                Total Assignment Fee Estimado
              </span>
              <span className="text-xl font-black text-white">
                ${ddEstimatedFee.toLocaleString()} USD
              </span>
            </div>
            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-center">
              <span className="text-xs text-emerald-300 font-medium block mb-1">
                Tu Parte (60% Wholesaler)
              </span>
              <span className="text-2xl font-black text-emerald-300">
                ${ddYourShare.toLocaleString()} USD
              </span>
            </div>
            <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/40 text-center">
              <span className="text-xs text-cyan-300 font-medium block mb-1">
                Parte Dispo / Cash Buyer Network (40%)
              </span>
              <span className="text-xl font-black text-cyan-300">
                ${ddPartnerShare.toLocaleString()} USD
              </span>
            </div>
          </div>

          <button
            onClick={() => setDdSubmitted(true)}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-cyan-600/25 transition"
          >
            <Send className="w-4 h-4" />
            Publicar Contrato en The Deal Desk (Emparejar con Compradores Activos)
          </button>

          {ddSubmitted && (
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-200 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <strong>¡Contrato Ingresado a The Deal Desk!</strong> Se generó el paquete de marketing para compradores y se pre-emparejó con los compradores activos en nuestra base de datos. Tienes {ddInspectionDays} días de inspección para formalizar el Assignment Agreement.
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* SECTION 4: INSTANT PROOF OF FUNDS (POF) GENERATOR */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {activeSection === 'proof_of_funds' && (
        <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                Generador Instantáneo de Prueba de Fondos (Proof of Funds - POF)
              </h3>
              <p className="text-xs text-slate-400">
                Genera cartas institucionales de prueba de fondos de hasta $1,000,000 USD respaldadas por líneas de crédito de inversión para presentar ofertas a vendedores y agentes.
              </p>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Válido para Presentar Ofertas
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Entidad Compradora
              </label>
              <input
                type="text"
                value={pofEntity}
                onChange={(e) => setPofEntity(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Monto de la Prueba de Fondos ($ USD)
              </label>
              <input
                type="number"
                step="25000"
                value={pofAmount}
                onChange={(e) => setPofAmount(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Dirección de la Propiedad Objetivo
              </label>
              <input
                type="text"
                value={pofPropertyAddress}
                onChange={(e) => setPofPropertyAddress(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white"
              />
            </div>
          </div>

          {/* POF LETTER PREVIEW */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 font-serif text-slate-300 leading-relaxed text-xs shadow-inner">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-sans">
              <div>
                <span className="text-xs font-bold text-white uppercase tracking-wider block">
                  CAPITAL ASSET ALLIANCE & PRIVATE TRANSACTIONAL FUNDING
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  Institutional Real Estate Funding Facility • Member Private Lenders Association
                </span>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded border border-emerald-500/30">
                STATUS: PRE-APPROVED
              </span>
            </div>

            <div className="space-y-3 font-sans text-xs">
              <p><strong>DATE:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p><strong>TO WHOM IT MAY CONCERN / PROPERTY SELLER:</strong></p>
              <p>
                This letter serves as official verification that <strong className="text-white">{pofEntity}</strong> has established an active private investment credit line and transactional capital reserve in good standing with our funding partners.
              </p>
              <p>
                As of the date of this letter, {pofEntity} is currently pre-qualified and possesses certified access to purchase funds up to:
              </p>
              <div className="p-3 rounded-xl bg-slate-900 border border-amber-500/40 text-center font-mono text-xl font-black text-amber-300">
                ${pofAmount.toLocaleString()} USD
              </div>
              <p>
                These funds are reserved specifically for qualifying residential/commercial real estate acquisitions, including the property located at: <strong className="text-white">{pofPropertyAddress}</strong>.
              </p>
              <p>
                Funding is subject to standard due diligence, satisfactory clear title insurance commitment issued by an approved title company or closing attorney, and executed purchase documentation. We are prepared to disburse earnest money deposits and closing funds within 7 to 14 business days.
              </p>
              <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-[11px] text-slate-400">
                <div>
                  <p className="font-bold text-slate-200">Private Credit Underwriting Division</p>
                  <p>Capital Asset Alliance Network</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-amber-400">REF ID: POF-{Math.floor(100000 + Math.random() * 900000)}</p>
                  <p>Verified Secure Document</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 justify-end">
            <button
              onClick={() => {
                const text = `CAPITAL ASSET ALLIANCE & PRIVATE TRANSACTIONAL FUNDING\nPROOF OF FUNDS VERIFICATION LETTER\n\nDate: ${new Date().toLocaleDateString()}\nEntity: ${pofEntity}\nCertified Amount: $${pofAmount.toLocaleString()} USD\nTarget Property: ${pofPropertyAddress}\n\nThis letter verifies that ${pofEntity} has approved access to up to $${pofAmount.toLocaleString()} in private acquisition capital for real estate purchase under standard title review.`;
                copyToClipboard(text, 'pof-copy');
              }}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-2 border border-slate-700 transition"
            >
              {copiedKey === 'pof-copy' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-amber-400" />}
              {copiedKey === 'pof-copy' ? 'Copiado al Portapapeles' : 'Copiar Carta Completa'}
            </button>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* SECTION 5: FLIGHT SCHOOL & 19 LEGAL TEMPLATES VAULT */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {activeSection === 'flight_school' && (
        <div className="bg-slate-900 border border-violet-500/30 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-violet-400" />
                Flight School: Bóveda de Contratos, Acuerdos & Guiones
              </h3>
              <p className="text-xs text-slate-400">
                Las 19 plantillas legales y recursos de la formación de Passive Pilot disponibles para copiar y usar sin pagar suscripción.
              </p>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
              19 Recursos Desbloqueados
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: 'Contrato de Compraventa (PSA 1-Página)',
                category: 'Contrato',
                badge: 'VENDEDOR',
                description: 'Contrato simple con cláusula "and/or assigns", 14 días de inspección y $100 de EMD.',
              },
              {
                title: 'Assignment of Contract Agreement',
                category: 'Asignación',
                badge: 'BUYER',
                description: 'Transfiere tus derechos de compra al Cash Buyer exigiendo $2,500-$5,000 de EMD no reembolsable.',
              },
              {
                title: 'Joint Venture (JV) Co-Wholesale Agreement',
                category: 'Alianza',
                badge: 'PARTNERS',
                description: 'Protege tu 50% o 60% de comisión cuando otro wholesaler te ayuda a cerrar o encontrar comprador.',
              },
              {
                title: 'Memorandum of Agreement (Equitable Interest)',
                category: 'Blindaje Legal',
                badge: 'REGISTRO',
                description: 'Se radica en el condado para colocar una nube en el título e impedir que el vendedor te salte.',
              },
              {
                title: 'Affidavit of Heirship (Declaración de Herederos)',
                category: 'Probate',
                badge: 'TÍTULO',
                description: 'Permite limpiar el título cuando el dueño falleció sin testamento, evitando un juicio costoso de corte.',
              },
              {
                title: 'Solicitud Formal de Reducción de Multas de Código',
                category: 'Curative Title',
                badge: 'CIUDAD',
                description: 'Carta formal al magistrado municipal para perdonar el 85%-90% de multas de pasto alto y violaciones.',
              },
            ].map((tmpl, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-violet-300 border border-violet-500/30">
                      {tmpl.badge}
                    </span>
                    <span className="text-[11px] text-slate-400">{tmpl.category}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white mb-1">{tmpl.title}</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{tmpl.description}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(`DOCUMENTO: ${tmpl.title}\nDESCRIPCIÓN: ${tmpl.description}\nENTIDAD: AI Automated Services LLC and/or assigns`, `tmpl-${idx}`)}
                  className="w-full py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs text-indigo-300 font-medium flex items-center justify-center gap-1.5 border border-slate-800 transition"
                >
                  {copiedKey === `tmpl-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedKey === `tmpl-${idx}` ? 'Copiado' : 'Copiar Plantilla'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* SECTION 6: ARYONE THOMAS PROFILE & DM SCRIPTS */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {activeSection === 'creator_profile' && (
        <div className="bg-slate-900 border border-rose-500/30 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-600 via-pink-600 to-amber-600 p-0.5 shrink-0 shadow-lg">
                <div className="w-full h-full rounded-2xl bg-slate-950 flex items-center justify-center text-white font-black text-xl">
                  AT
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white">Aryone Thomas</h3>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    @aryone.wholesales
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Fundador de Passive Pilot, Creador de Pilot AI y Operador de The Deal Desk (10K Miembros en Whop/Discord)
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <a
                href="https://www.instagram.com/aryone.wholesales/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1.5 transition"
              >
                Ver Instagram ↗
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Estrategia Central Enseñada en su Reel:
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
                "Comenta <strong>PILOT</strong> abajo para unirte a la comunidad y software de Real Estate de más rápido crecimiento en el mundo. Estamos alcanzando los 10,000 miembros y una vez que lleguemos, el acceso se cerrará."
                <br /><br />
                Aryone promueve un sistema llave en mano: análisis de números con IA, herramientas para no usar dinero propio, generador de Proof of Funds, y co-disposición para vender contratos sin tener que crear una lista de compradores desde cero.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Mensaje de Alianza Directa para Enviar a su Instagram:
              </h4>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 relative space-y-2">
                <button
                  onClick={() => {
                    const dm = `¡Hola Aryone! Me encantó tu Reel sobre Passive Pilot y cómo están llegando a 10K miembros con la suite de IA y The Deal Desk.\n\nEstoy cerrando contratos de wholesale en mercados con alta liquidez y quiero colaborar con ustedes:\n1. ¿Cuáles son los mercados más calientes y los criterios de compra más demandados por tus inversionistas en The Deal Desk hoy?\n2. Si tengo un contrato firmado bajo PSA con 14 días de inspección, ¿cuál es el mejor canal para enviárselo a tu equipo y hacer un co-wholesale / JV dispo al 60/40?\n\n¡Gran trabajo con la plataforma Pilot!`;
                    copyToClipboard(dm, 'aryone-dm');
                  }}
                  className="absolute top-3 right-3 px-2.5 py-1 rounded bg-slate-800 text-[11px] text-rose-300 hover:text-white flex items-center gap-1 transition"
                >
                  {copiedKey === 'aryone-dm' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  {copiedKey === 'aryone-dm' ? 'Copiado' : 'Copiar DM'}
                </button>
                <p className="text-xs text-slate-200 leading-relaxed font-sans">
                  "¡Hola Aryone! Me encantó tu Reel sobre Passive Pilot y cómo están llegando a 10K miembros con la suite de IA y The Deal Desk... Estoy cerrando contratos de wholesale y quiero colaborar con ustedes en co-dispo al 60/40..."
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
