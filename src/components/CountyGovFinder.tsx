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
  Database,
  Download,
  AlertTriangle,
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

interface OpenViolationRecord {
  id: string;
  address: string;
  violationDate: string;
  violationStatus: string;
  description: string;
  inspectorComments: string;
  ordinance: string;
  city: string;
  state: string;
  source: string;
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

  // Live Open Data extraction state
  const [extractingOpenData, setExtractingOpenData] = useState(false);
  const [openDataRecords, setOpenDataRecords] = useState<OpenViolationRecord[]>([]);
  const [openDataError, setOpenDataError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!county.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/county-finder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ state, county, listType }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error en la búsqueda');
      setResult(data);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const handleFetchOpenData = async (targetCity: string) => {
    setExtractingOpenData(true);
    setOpenDataError(null);
    try {
      const res = await fetch(`/api/open-data-violations?city=${encodeURIComponent(targetCity)}&limit=25`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Fallo al extraer Open Data');
      setOpenDataRecords(data.records || []);
    } catch (err: unknown) {
      setOpenDataError(err instanceof Error ? err.message : 'Error al conectar con la API de datos abiertos');
    } finally {
      setExtractingOpenData(false);
    }
  };

  const copyFoia = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.readyToSendFoiaEmail);
    setCopiedFoia(true);
    setTimeout(() => setCopiedFoia(false), 2000);
  };

  const exportOpenDataCSV = () => {
    if (openDataRecords.length === 0) return;
    const headers = ['ID', 'Direccion', 'Fecha', 'Estado', 'Descripcion', 'Comentarios Inspector', 'Ciudad', 'Estado_US', 'Fuente'];
    const rows = openDataRecords.map(r => [
      `"${r.id}"`,
      `"${r.address.replace(/"/g, '""')}"`,
      `"${r.violationDate}"`,
      `"${r.violationStatus}"`,
      `"${r.description.replace(/"/g, '""')}"`,
      `"${r.inspectorComments.replace(/"/g, '""')}"`,
      `"${r.city}"`,
      `"${r.state}"`,
      `"${r.source}"`
    ]);
    const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Code_Violations_OpenData_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="w-6 h-6 text-emerald-400" />
            <h3 className="text-lg font-bold text-white">
              Buscador de Portales Oficiales del Condado & Extractor Open Data SODA
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Localiza registros públicos, solicita archivos vía leyes FOIA o extrae directamente datasets de violaciones de código mediante APIs abiertas de ciudades y condados.
          </p>
        </div>

        <button
          onClick={() => handleFetchOpenData('chicago')}
          disabled={extractingOpenData}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-emerald-500/10 transition disabled:opacity-50"
        >
          {extractingOpenData ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Extrayendo de API Abierta...
            </>
          ) : (
            <>
              <Database className="w-4 h-4" />
              Extraer Violaciones en Vivo (SODA API)
            </>
          )}
        </button>
      </div>

      {/* LIVE OPEN DATA RESULTS PREVIEW */}
      {openDataRecords.length > 0 && (
        <div className="p-4 rounded-xl bg-slate-950/90 border border-emerald-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                Extracción en Vivo SODA API ({openDataRecords.length} Casos Reales Obtenidos)
              </h4>
            </div>
            <button
              onClick={exportOpenDataCSV}
              className="text-xs px-3 py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-200 border border-emerald-500/30 flex items-center gap-1.5 transition"
            >
              <Download className="w-3.5 h-3.5" />
              Exportar CSV ({openDataRecords.length})
            </button>
          </div>

          <div className="overflow-x-auto max-h-56 overflow-y-auto">
            <table className="w-full text-left text-[11px] text-slate-300">
              <thead className="bg-slate-900/80 text-slate-400 uppercase font-semibold sticky top-0">
                <tr>
                  <th className="p-2">Dirección</th>
                  <th className="p-2">Fecha</th>
                  <th className="p-2">Descripción de la Infracción</th>
                  <th className="p-2">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {openDataRecords.map((rec) => (
                  <tr key={rec.id} className="hover:bg-slate-900/40">
                    <td className="p-2 font-medium text-white">{rec.address}</td>
                    <td className="p-2 text-slate-400">{rec.violationDate}</td>
                    <td className="p-2 text-amber-200 truncate max-w-xs">{rec.description}</td>
                    <td className="p-2">
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-red-950/80 text-red-300 border border-red-800/40">
                        {rec.violationStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {openDataError && (
        <div className="p-3 rounded-xl bg-red-950/40 border border-red-800/50 text-red-300 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{openDataError}</span>
        </div>
      )}

      {/* FORM DE BÚSQUEDA FOIA & CONDADO */}
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Estado (US State)
            </label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500 transition"
            >
              {US_STATES.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Condado (County Name)
            </label>
            <input
              type="text"
              value={county}
              onChange={(e) => setCounty(e.target.value)}
              placeholder="Ej: Wayne, Cuyahoga, Hillsborough..."
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Tipo de Lista Gubernamental
            </label>
            <select
              value={listType}
              onChange={(e) => setListType(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-emerald-500 transition"
            >
              {GOV_LIST_TYPES.map((lt) => (
                <option key={lt} value={lt}>
                  {lt}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold flex items-center gap-2 transition disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Explorando Registros...
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                Localizar Portales y Redactar FOIA
              </>
            )}
          </button>
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
