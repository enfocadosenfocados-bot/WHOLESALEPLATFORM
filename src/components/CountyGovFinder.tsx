'use client';

import React, { useState } from 'react';
import {
  Building2,
  Search,
  ExternalLink,
  Copy,
  Check,
  FileText,
  Sparkles,
  Loader2,
} from 'lucide-react';

interface PortalResult {
  state: string;
  county: string;
  listType: string;
  foiaStatute: string;
  discoveredPortals: { title: string; url: string; snippet: string }[];
  stepByStepPlaybook: string[];
  readyToSendFoiaEmail: string;
}

const US_STATES = [
  'Florida',
  'Texas',
  'Georgia',
  'Ohio',
  'North Carolina',
  'Arizona',
  'Indiana',
  'Tennessee',
  'Pennsylvania',
  'Michigan',
  'California',
  'Illinois',
];

const GOV_LIST_TYPES = [
  'Code Violations (Pasto alto, estructuras dañadas, vacantes)',
  'Tax Delinquent (Impuestos atrasados 2+ años)',
  'Probate / Letters of Administration (Sucesiones y Herencias)',
  'Pre-Foreclosures / Lis Pendens (Demandas hipotecarias)',
  'Water Shut-Off / Utility Disconnections (Cortes de agua)',
  'Fire Damaged Residential Properties (Casas dañadas por incendio)',
  'Evictions / Unlawful Detainer (Desalojos de inquilinos)',
];

export default function CountyGovFinder() {
  const [state, setState] = useState('Florida');
  const [county, setCounty] = useState('Hillsborough');
  const [listType, setListType] = useState(GOV_LIST_TYPES[0]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PortalResult | null>(null);
  const [copiedFoia, setCopiedFoia] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!county.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/county-finder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ state, county, listType }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult(data);
      }
    } finally {
      setLoading(false);
    }
  };

  const copyFoia = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.readyToSendFoiaEmail);
    setCopiedFoia(true);
    setTimeout(() => setCopiedFoia(false), 2500);
  };

  return (
    <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              Ejecutor: Buscador de Portales de Gobierno & Generador FOIA
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                FreeWholesaling.com Engine
              </span>
            </h3>
            <p className="text-sm text-slate-400">
              Encuentra los registros públicos oficiales por condado y genera la solicitud legal FOIA citando la ley estatal exacta.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">
            Estado (EE.UU.)
          </label>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
          >
            {US_STATES.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">
            Condado (County)
          </label>
          <input
            type="text"
            value={county}
            onChange={(e) => setCounty(e.target.value)}
            placeholder="Ej: Miami-Dade, Harris, Dallas..."
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-slate-400 mb-1.5">
            Lista de Gobierno a Extraer
          </label>
          <div className="flex gap-2">
            <select
              value={listType}
              onChange={(e) => setListType(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
            >
              {GOV_LIST_TYPES.map((lt) => (
                <option key={lt} value={lt}>
                  {lt}
                </option>
              ))}
            </select>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold text-sm flex items-center gap-2 transition whitespace-nowrap"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Buscando...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  Extraer Portales
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {result && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-emerald-400 flex items-center gap-2 mb-2.5">
                <Sparkles className="w-4 h-4" />
                Portales Oficiales Descubiertos ({result.county} County, {result.state})
              </h4>
              <div className="space-y-2.5">
                {result.discoveredPortals.map((portal, i) => (
                  <a
                    key={i}
                    href={portal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 hover:border-emerald-500/50 transition group"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium text-white group-hover:text-emerald-300 transition">
                        {portal.title}
                      </span>
                      <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 shrink-0" />
                    </div>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {portal.snippet}
                    </p>
                    <span className="text-[11px] text-emerald-500/80 mt-1 block truncate">
                      {portal.url}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2.5">
                Pasos Exactos de Extracción para {result.county} County
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {result.stepByStepPlaybook.map((st, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {st}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
                <FileText className="w-4 h-4" />
                Solicitud FOIA Lista ({result.foiaStatute})
              </span>
              <button
                onClick={copyFoia}
                className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5 transition"
              >
                {copiedFoia ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    Copiado
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copiar Carta FOIA
                  </>
                )}
              </button>
            </div>
            <pre className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-slate-300 font-mono whitespace-pre-wrap overflow-y-auto max-h-80">
              {result.readyToSendFoiaEmail}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
