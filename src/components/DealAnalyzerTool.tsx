'use client';

import React, { useState } from 'react';
import { Calculator, DollarSign, PhoneCall, Copy, Check, Hammer } from 'lucide-react';

export default function DealAnalyzerTool() {
  const [address, setAddress] = useState('1420 Oak Ave, Tampa, FL');
  const [sqft, setSqft] = useState(1450);
  const [arv, setArv] = useState(285000);
  const [rehabLevel, setRehabLevel] = useState<'light' | 'medium' | 'heavy'>('medium');
  const [needsRoof, setNeedsRoof] = useState(true);
  const [needsHvac, setNeedsHvac] = useState(false);
  const [assignmentFee, setAssignmentFee] = useState(15000);
  const [copiedScript, setCopiedScript] = useState(false);

  const baseRatePerSqft =
    rehabLevel === 'light' ? 20 : rehabLevel === 'medium' ? 35 : 60;
  const extraBigItems = (needsRoof ? 12000 : 0) + (needsHvac ? 7500 : 0);
  const estimatedRepairs = Math.round(sqft * baseRatePerSqft + extraBigItems);

  // Flip With Rick dynamic multiplier based on ARV bracket
  const buyerPercentage = arv < 150000 ? 0.65 : arv <= 350000 ? 0.73 : 0.77;
  const maxBuyerPrice = Math.round(arv * buyerPercentage - estimatedRepairs);
  const mao = Math.max(0, maxBuyerPrice - assignmentFee);
  const lowAnchorOffer = Math.max(0, Math.round(mao * 0.87));

  const negotiationScript = `"Hola [Nombre del Vendedor], estuve revisando a fondo la propiedad en ${address} (${sqft} SqFt) con mi socio financiero.

Tomando en cuenta las remodelaciones necesarias${needsRoof ? ', el reemplazo del techo' : ''}${needsHvac ? ', el sistema de aire acondicionado' : ''} (que estimamos en unos $${estimatedRepairs.toLocaleString()}) y que nosotros cubrimos el 100% de los gastos de cierre sin comisiones... mi socio me dijo que necesitábamos estar cerca de los $${lowAnchorOffer.toLocaleString()}.

Te soy sincero, sé que $${lowAnchorOffer.toLocaleString()} es bajo, pero quiero ayudarte a resolver esto rápido. Si yo hablo con mi socio para estirar el presupuesto, ¿cuál es el monto más cercano a ese número con el que podríamos firmar el acuerdo hoy mismo?"`;

  const handleCopy = () => {
    navigator.clipboard.writeText(negotiationScript);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  return (
    <div className="bg-slate-900/90 border border-sky-500/30 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2.5 rounded-xl bg-sky-500/20 text-sky-400">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            Ejecutor: Calculadora ARV, Reparaciones & Oferta MAO (Reverse Price Anchor)
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
              Fórmula Flip With Rick
            </span>
          </h3>
          <p className="text-sm text-slate-400">
            Calcula tu oferta máxima, estima remodelaciones por pie cuadrado y genera el guion psicológico de oferta baja.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Dirección de la Propiedad
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Pies Cuadrados (SqFt)
              </label>
              <input
                type="number"
                value={sqft}
                onChange={(e) => setSqft(Number(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                ARV (Valor Remodelada según Comps Vendidas)
              </label>
              <div className="relative">
                <DollarSign className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="number"
                  value={arv}
                  onChange={(e) => setArv(Number(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3.5 py-2 text-sm text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Tu Assignment Fee Objetivo ($)
              </label>
              <div className="relative">
                <DollarSign className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="number"
                  value={assignmentFee}
                  onChange={(e) => setAssignmentFee(Number(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3.5 py-2 text-sm text-white"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5 flex items-center gap-1.5">
              <Hammer className="w-3.5 h-3.5 text-sky-400" />
              Nivel de Reparación Interior + Rubros Grandes ("Big 5")
            </label>
            <div className="grid grid-cols-3 gap-2.5 mb-3">
              {(
                [
                  { id: 'light', label: 'Ligero ($20/sqft)', desc: 'Pintura y pisos' },
                  { id: 'medium', label: 'Medio ($35/sqft)', desc: 'Cocina y baños' },
                  { id: 'heavy', label: 'Gut Rehab ($60/sqft)', desc: 'Remodelación total' },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setRehabLevel(opt.id)}
                  className={`p-2.5 rounded-xl border text-left transition ${
                    rehabLevel === opt.id
                      ? 'bg-sky-500/20 border-sky-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold">{opt.label}</div>
                  <div className="text-[11px] opacity-80">{opt.desc}</div>
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <label className="flex items-center gap-2 text-xs text-slate-300 bg-slate-950 px-3 py-2 rounded-lg border border-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={needsRoof}
                  onChange={(e) => setNeedsRoof(e.target.checked)}
                  className="accent-sky-500"
                />
                Reemplazo de Techo (+$12,000)
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-300 bg-slate-950 px-3 py-2 rounded-lg border border-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={needsHvac}
                  onChange={(e) => setNeedsHvac(e.target.checked)}
                  className="accent-sky-500"
                />
                Aire Acondicionado HVAC Nuevo (+$7,500)
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[11px] text-slate-400 block">Reparaciones Est.</span>
              <span className="text-base font-bold text-rose-400">
                ${estimatedRepairs.toLocaleString()}
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[11px] text-slate-400 block">Precio Cash Buyer</span>
              <span className="text-base font-bold text-slate-200">
                ${maxBuyerPrice.toLocaleString()}
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-500/40">
              <span className="text-[11px] text-emerald-300 block">Tu MAO (Oferta Máx)</span>
              <span className="text-lg font-extrabold text-emerald-400">
                ${mao.toLocaleString()}
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/40">
              <span className="text-[11px] text-amber-300 block">Oferta Ancla Inicial</span>
              <span className="text-lg font-extrabold text-amber-400">
                ${lowAnchorOffer.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col bg-slate-950 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-bold text-sky-400 flex items-center gap-1.5">
              <PhoneCall className="w-4 h-4" />
              Guion en Vivo: Reverse Price Anchor
            </span>
            <button
              onClick={handleCopy}
              className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1 transition"
            >
              {copiedScript ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  Copiado
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copiar Guion
                </>
              )}
            </button>
          </div>
          <p className="text-xs text-slate-300 whitespace-pre-wrap leading-relaxed flex-1 font-mono bg-slate-900/70 p-3.5 rounded-lg border border-slate-800/80">
            {negotiationScript}
          </p>
        </div>
      </div>
    </div>
  );
}
