'use client';

import React, { useState } from 'react';
import {
  Skull,
  Layers,
  Radar,
  Users,
  Search,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  FileSpreadsheet,
  ShieldAlert,
  TrendingUp,
  MapPin,
  Send,
} from 'lucide-react';

interface XLeadsPumpStackerHubProps {
  apiKey?: string;
}

export default function XLeadsPumpStackerHub({ apiKey }: XLeadsPumpStackerHubProps) {
  const [subTab, setSubTab] = useState<
    'death_obituary' | 'pump_stacker' | 'skydrive_zips' | 'buyermatch_dispo'
  >('death_obituary');
  const [copiedId, setCopiedId] = useState('');

  // --- 1. Death Scrubbing & Obituary Scraper State ---
  const [ownerName, setOwnerName] = useState('Robert H. Miller');
  const [propertyAddress, setPropertyAddress] = useState('4821 N Habana Ave, Tampa, FL 33614');
  const [cityState, setCityState] = useState('Tampa, FL');
  const [obituaryPaste, setObituaryPaste] = useState('');
  const [loadingObituary, setLoadingObituary] = useState(false);
  const [obituaryResult, setObituaryResult] = useState<any>(null);

  // Batch CSV Death Scrub & Free Skip-Trace State (60,000/mo free alternative)
  const [batchInput, setBatchInput] = useState(
    `Robert H. Miller | 4821 N Habana Ave | Tampa, FL\nClarence Washington | 2119 E Columbus Dr | Tampa, FL\nDorothy Mae Jenkins | 3410 N 15th St | Tampa, FL\nWalter E. Henderson | 814 W Sligh Ave | Tampa, FL`
  );

  // --- 2. PumpStacker (Curative Title + Deep List Stacking) State ---
  const [stackAddress, setStackAddress] = useState('2119 E Columbus Dr, Tampa, FL 33605');
  const [stackOwner, setStackOwner] = useState('Estate of Clarence Washington');
  const [selectedLists, setSelectedLists] = useState<string[]>([
    'Dead Owner (Pre-Probate)',
    'Tax Delinquent (2+ Years)',
    'Code Violation / Overgrown Lot',
    'Vacant / Water Shut-Off',
  ]);
  const [arv, setArv] = useState(295000);
  const [repairs, setRepairs] = useState(52000);
  const [rawLiens, setRawLiens] = useState(18500);
  const [wholesaleFee, setWholesaleFee] = useState(20000);
  const [loadingStack, setLoadingStack] = useState(false);
  const [stackResult, setStackResult] = useState<any>(null);

  // --- 3. SkyDrive AI + 5 AI Zip Codes State ---
  const [skyMarket, setSkyMarket] = useState('Tampa, FL');
  const [skyAddress, setSkyAddress] = useState('4821 N Habana Ave, Tampa, FL 33614');
  const [roofAge, setRoofAge] = useState(21);
  const [lotCondition, setLotCondition] = useState('Overgrown Grass + Blue Tarp / Peeling Paint');
  const [yearsOwned, setYearsOwned] = useState(24);
  const [loadingSky, setLoadingSky] = useState(false);
  const [skyResult, setSkyResult] = useState<any>(null);

  // --- 4. BuyerMatch AI Dispo State ---
  const [dispoAddress, setDispoAddress] = useState('4821 N Habana Ave, Tampa, FL 33614');
  const [dispoZip, setDispoZip] = useState('33614');
  const [contractPrice, setContractPrice] = useState(168000);
  const [dispoFee, setDispoFee] = useState(20000);
  const [dispoArv, setDispoArv] = useState(315000);
  const [dispoRepairs, setDispoRepairs] = useState(45000);
  const [dispoSpecs, setDispoSpecs] = useState('3 Beds / 2 Baths / 1,480 SqFt (CBS Block)');
  const [loadingDispo, setLoadingDispo] = useState(false);
  const [dispoResult, setDispoResult] = useState<any>(null);

  const copyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(''), 2000);
  };

  const runObituaryScraper = async () => {
    setLoadingObituary(true);
    try {
      const res = await fetch('/api/pumpstacker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'death_and_obituary_scraper',
          ownerName,
          propertyAddress,
          cityState,
          obituaryTextPaste: obituaryPaste,
          apiKey,
        }),
      });
      const data = await res.json();
      setObituaryResult(data);
    } finally {
      setLoadingObituary(false);
    }
  };

  const runPumpStacker = async () => {
    setLoadingStack(true);
    try {
      const res = await fetch('/api/pumpstacker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'pump_stacker_curative',
          propertyAddress: stackAddress,
          ownerName: stackOwner,
          selectedLists,
          arv,
          repairs,
          rawLiens,
          wholesaleFee,
          apiKey,
        }),
      });
      const data = await res.json();
      setStackResult(data.stackAnalysis);
    } finally {
      setLoadingStack(false);
    }
  };

  const runSkyDriveAnalyzer = async () => {
    setLoadingSky(true);
    try {
      const res = await fetch('/api/pumpstacker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'skydrive_zip_analyzer',
          cityState: skyMarket,
          sampleAddress: skyAddress,
          roofAgeYears: roofAge,
          lotCondition,
          yearsOwned,
          isAbsentee: true,
          apiKey,
        }),
      });
      const data = await res.json();
      setSkyResult(data);
    } finally {
      setLoadingSky(false);
    }
  };

  const runBuyerMatchDispo = async () => {
    setLoadingDispo(true);
    try {
      const res = await fetch('/api/pumpstacker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'buyermatch_dispo',
          propertyAddress: dispoAddress,
          zipCode: dispoZip,
          contractPrice,
          assignmentFee: dispoFee,
          arv: dispoArv,
          repairs: dispoRepairs,
          bedsBathsSqft: dispoSpecs,
          apiKey,
        }),
      });
      const data = await res.json();
      setDispoResult(data);
    } finally {
      setLoadingDispo(false);
    }
  };

  const allDistressLists = [
    'Dead Owner (Pre-Probate)',
    'Tax Delinquent (2+ Years)',
    'Code Violation / Overgrown Lot',
    'Vacant / Water Shut-Off',
    'Zombie Foreclosure',
    'Bored Investor (15+ Yrs Owned)',
    'Unreleased Old Mortgage / Cloudy Title',
    'IRS / Municipal Lien',
  ];

  const toggleDistressList = (item: string) => {
    setSelectedLists((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]
    );
  };

  const parsedBatchRows = batchInput
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      const parts = line.split('|').map((p) => p.trim());
      const name = parts[0] || 'Unknown Owner';
      const addr = parts[1] || '';
      const loc = parts[2] || cityState;
      const cleanName = name.replace(/[^a-zA-Z\s]/g, '').trim();
      const slugName = cleanName.toLowerCase().replace(/\s+/g, '-');
      const slugLoc = loc.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      const first = cleanName.split(' ')[0] || '';
      const last = cleanName.split(' ').slice(-1)[0] || '';
      return {
        name,
        addr,
        loc,
        legacyUrl: `https://www.legacy.com/obituaries/search?firstName=${encodeURIComponent(first)}&lastName=${encodeURIComponent(last)}`,
        findAGraveUrl: `https://www.findagrave.com/memorial/search?firstname=${encodeURIComponent(first)}&lastname=${encodeURIComponent(last)}&location=${encodeURIComponent(loc)}`,
        tpsUrl: `https://www.truepeoplesearch.com/results?name=${encodeURIComponent(cleanName)}&citystatezip=${encodeURIComponent(loc)}`,
        cbcUrl: `https://www.cyberbackgroundchecks.com/people/${slugName}/${slugLoc}`,
      };
    });

  return (
    <div className="space-y-6">
      {/* Banner Header */}
      <div className="rounded-2xl bg-gradient-to-r from-red-950/60 via-slate-900 to-amber-950/50 border border-red-500/30 p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-500/20 text-red-300 border border-red-500/40">
                XLEADS X-PLAN ($249/mes) → CLONADO GRATIS EN SKILLFORGE
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                PUMPSTACKER ENGINE ACTIVO
              </span>
            </div>
            <h2 className="text-xl font-black text-white mt-1.5">
              ⚡ PumpStacker & XLeads AI Suite (In-House Zero-Cost Engine)
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-4xl">
              Replicamos internamente las 8 herramientas exclusivas del plan más alto de{' '}
              <strong>XLeads.com (X Plan + PumpStacker)</strong>: AI Death Scrubbing, AI Obituary
              Scraper (extrae herederos vivos antes de Probate), Curative Title + Deep List Stacking,
              5 AI Zip Codes (SkyDrive AI + Sellability Scores) y BuyerMatch AI Dispo.
            </p>
          </div>
        </div>

        {/* Sub-navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 mt-4">
          <button
            onClick={() => setSubTab('death_obituary')}
            className={`p-3 rounded-xl border text-left transition flex items-start gap-2.5 ${
              subTab === 'death_obituary'
                ? 'bg-red-600/25 border-red-500 text-white shadow-lg shadow-red-600/15'
                : 'bg-slate-900/90 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <Skull className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold">1. AI Death Scrub & Obituary Scraper</div>
              <div className="text-[11px] text-slate-400">
                Detecta dueños fallecidos + extrae herederos (&quot;Survived by&quot;)
              </div>
            </div>
          </button>

          <button
            onClick={() => setSubTab('pump_stacker')}
            className={`p-3 rounded-xl border text-left transition flex items-start gap-2.5 ${
              subTab === 'pump_stacker'
                ? 'bg-amber-600/25 border-amber-500 text-white shadow-lg shadow-amber-600/15'
                : 'bg-slate-900/90 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <Layers className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold">2. PumpStacker + Curative Title</div>
              <div className="text-[11px] text-slate-400">
                Deep List Stacking + Solución de Títulos Sucios y Multas
              </div>
            </div>
          </button>

          <button
            onClick={() => setSubTab('skydrive_zips')}
            className={`p-3 rounded-xl border text-left transition flex items-start gap-2.5 ${
              subTab === 'skydrive_zips'
                ? 'bg-emerald-600/25 border-emerald-500 text-white shadow-lg shadow-emerald-600/15'
                : 'bg-slate-900/90 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <Radar className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold">3. 5 AI Zip Codes & SkyDrive AI</div>
              <div className="text-[11px] text-slate-400">
                Sellability Score (0-100) + Deterioro Satelital y StreetView
              </div>
            </div>
          </button>

          <button
            onClick={() => setSubTab('buyermatch_dispo')}
            className={`p-3 rounded-xl border text-left transition flex items-start gap-2.5 ${
              subTab === 'buyermatch_dispo'
                ? 'bg-sky-600/25 border-sky-500 text-white shadow-lg shadow-sky-600/15'
                : 'bg-slate-900/90 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <Users className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold">4. BuyerMatch AI & Dispo Tab</div>
              <div className="text-[11px] text-slate-400">
                AI Ranked Cash Buyers + Dispo Blast Packet en 1 clic
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* SUBTAB 1: AI DEATH SCRUBBING & AI OBITUARY SCRAPER                    */}
      {/* ===================================================================== */}
      {subTab === 'death_obituary' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Skull className="w-4 h-4 text-red-400" />
                  AI Death Scrubbing + AI Obituary Scraper
                </h3>
                <span className="text-[11px] px-2 py-0.5 rounded bg-red-500/15 text-red-300 border border-red-500/30">
                  Pre-Probate Goldmine
                </span>
              </div>

              <p className="text-xs text-slate-400">
                ¿Cómo lo hace PumpStacker? Cruza el nombre del propietario en listas de Tax
                Delinquent / Vacant contra bases de obituarios (<code>Legacy.com</code>,{' '}
                <code>FindAGrave</code>, <code>Tributes</code>) y usa IA para leer la sección{' '}
                <strong>&quot;Survived by...&quot; (Sobrevivido por...)</strong>, extrayendo los
                nombres de los hijos/esposa y buscándolos gratis en TruePeopleSearch.
              </p>

              <div className="space-y-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">
                    Nombre del Propietario en el Condado (Tax Roll)
                  </label>
                  <input
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                    placeholder="Ej. Robert H. Miller"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Dirección Propiedad</label>
                    <input
                      value={propertyAddress}
                      onChange={(e) => setPropertyAddress(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Ciudad, Estado</label>
                    <input
                      value={cityState}
                      onChange={(e) => setCityState(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1">
                    Pegar Texto de Obituario (Opcional — si lo copiaste de Legacy/Funeral Home, la
                    IA extraerá cada heredero exacto)
                  </label>
                  <textarea
                    rows={3}
                    value={obituaryPaste}
                    onChange={(e) => setObituaryPaste(e.target.value)}
                    placeholder="Opcional: Pega aquí el texto del obituario ('Robert H. Miller, 82, passed away... survived by his son David Miller of Tampa and daughter Sarah Jenkins of Charlotte...')"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <button
                  onClick={runObituaryScraper}
                  disabled={loadingObituary}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-red-600/20 transition"
                >
                  <Search className="w-4 h-4" />
                  {loadingObituary
                    ? 'Escaneando Obituarios + Extrayendo Herederos con IA...'
                    : 'Ejecutar AI Death Scrubbing & Extraer Herederos Vivos'}
                </button>
              </div>
            </div>

            {/* Batch 60,000/mo Free Skip-Trace & Death Scrub Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <FileSpreadsheet className="w-4 h-4" />
                  Batch Death Scrub & Free Skip-Trace (Alternativa $0 a los 60k/mes)
                </h4>
              </div>
              <p className="text-[11px] text-slate-400">
                Pega tu lista de propietarios (<code>Nombre | Dirección | Ciudad, Estado</code>) y
                genera al instante la matriz de verificación de Fallecimiento (Legacy / FindAGrave)
                + Teléfonos Gratis (TruePeopleSearch / CyberBackgroundChecks):
              </p>
              <textarea
                rows={4}
                value={batchInput}
                onChange={(e) => setBatchInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-[11px] font-mono text-slate-200"
              />
              <div className="max-h-56 overflow-y-auto space-y-2 pr-1">
                {parsedBatchRows.map((row, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/90 flex flex-wrap items-center justify-between gap-2 text-xs"
                  >
                    <div>
                      <div className="font-bold text-white">{row.name}</div>
                      <div className="text-[11px] text-slate-400">
                        {row.addr} • {row.loc}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <a
                        href={row.legacyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2 py-1 rounded bg-red-500/15 text-red-300 border border-red-500/30 text-[10px] font-semibold hover:bg-red-500/25 flex items-center gap-1"
                      >
                        Obituario <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                      <a
                        href={row.findAGraveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2 py-1 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30 text-[10px] font-semibold hover:bg-amber-500/25 flex items-center gap-1"
                      >
                        FindAGrave <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                      <a
                        href={row.tpsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2 py-1 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[10px] font-semibold hover:bg-emerald-500/25 flex items-center gap-1"
                      >
                        SkipTrace #1 <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                      <a
                        href={row.cbcUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2 py-1 rounded bg-sky-500/15 text-sky-300 border border-sky-500/30 text-[10px] font-semibold hover:bg-sky-500/25 flex items-center gap-1"
                      >
                        Parientes/Heirs <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Output Panel */}
          <div className="lg:col-span-7 space-y-4">
            {!obituaryResult ? (
              <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-8 text-center space-y-3">
                <Skull className="w-10 h-10 text-red-400 mx-auto opacity-80" />
                <h4 className="text-sm font-bold text-white">
                  Haz clic en &quot;Ejecutar AI Death Scrubbing & Extraer Herederos Vivos&quot;
                </h4>
                <p className="text-xs text-slate-400 max-w-lg mx-auto">
                  El sistema verificará si el propietario falleció, extraerá los nombres de los
                  familiares sobrevivientes (&quot;Survived by...&quot;), generará los links de
                  Skip-Tracing gratis para cada heredero y redactará el plan de Curative Title
                  (Affidavit of Heirship).
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Status Banner */}
                <div className="bg-slate-900 border border-red-500/40 rounded-2xl p-5 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/40 text-xs font-extrabold">
                      💀 {obituaryResult.result?.deathScrubStatus}
                    </span>
                    <span className="text-xs font-bold text-emerald-400">
                      Confianza IA: {obituaryResult.result?.confidenceScore}% • Pre-Probate Lead
                    </span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {obituaryResult.result?.obituarySummary}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <a
                      href={obituaryResult.ownerVerificationLinks?.legacyObituaries}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-amber-300 border border-slate-700 text-xs flex items-center gap-1.5"
                    >
                      Verificar en Legacy.com <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={obituaryResult.ownerVerificationLinks?.findAGrave}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-red-300 border border-slate-700 text-xs flex items-center gap-1.5"
                    >
                      Verificar en FindAGrave <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={obituaryResult.ownerVerificationLinks?.cyberBackgroundChecks}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-sky-300 border border-slate-700 text-xs flex items-center gap-1.5"
                    >
                      Árbol Familiar en CyberBackgroundChecks <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Surviving Heirs ("Survived By...") */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Users className="w-4 h-4 text-emerald-400" />
                    Herederos Sobrevivientes Extraídos (&quot;Survived By...&quot;) — Llama en este
                    Orden
                  </h4>
                  <div className="space-y-2.5">
                    {(obituaryResult.result?.survivingHeirs || []).map((heir: any, i: number) => (
                      <div
                        key={i}
                        className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-3"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                              Prioridad #{heir.priorityRank || i + 1}
                            </span>
                            <span className="text-sm font-bold text-white">{heir.name}</span>
                            <span className="text-xs text-amber-300">({heir.relationship})</span>
                          </div>
                          <div className="text-xs text-slate-400">
                            📍 Ubicación detectada: <strong>{heir.estimatedLocation}</strong> —{' '}
                            {heir.whyCallFirst}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          <a
                            href={heir.skipTraceLinks?.truePeopleSearch}
                            target="_blank"
                            rel="noreferrer"
                            className="px-2.5 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1"
                          >
                            TruePeopleSearch <ExternalLink className="w-3 h-3" />
                          </a>
                          <a
                            href={heir.skipTraceLinks?.fastPeopleSearch}
                            target="_blank"
                            rel="noreferrer"
                            className="px-2.5 py-1.5 rounded-lg bg-sky-600/20 hover:bg-sky-600/30 text-sky-300 border border-sky-500/30 text-xs font-semibold flex items-center gap-1"
                          >
                            FastPeopleSearch <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Curative Title Solution & Empathy Scripts */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                  <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4" />
                    Solución Curative Title + Guion Empático para Herederos
                  </h4>
                  <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs space-y-1">
                    <div>
                      <strong className="text-amber-300">Diagnóstico de Título:</strong>{' '}
                      {obituaryResult.result?.curativeTitleDiagnosis?.titleIssue}
                    </div>
                    <div>
                      <strong className="text-emerald-300">Cura Legal Exacta:</strong>{' '}
                      {obituaryResult.result?.curativeTitleDiagnosis?.legalCureMethod} (Tiempo:{' '}
                      {obituaryResult.result?.curativeTitleDiagnosis?.estimatedCureTimeDays})
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-sky-300">
                          📱 SMS Empático al Heredero #1
                        </span>
                        <button
                          onClick={() =>
                            copyText(
                              'heir-sms',
                              obituaryResult.result?.empathyHeirScript?.smsScript || ''
                            )
                          }
                          className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1"
                        >
                          {copiedId === 'heir-sms' ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                          Copiar
                        </button>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {obituaryResult.result?.empathyHeirScript?.smsScript}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-300">
                          📞 Guion de Llamada Pre-Probate
                        </span>
                        <button
                          onClick={() =>
                            copyText(
                              'heir-call',
                              obituaryResult.result?.empathyHeirScript?.coldCallOpener || ''
                            )
                          }
                          className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1"
                        >
                          {copiedId === 'heir-call' ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                          Copiar
                        </button>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {obituaryResult.result?.empathyHeirScript?.coldCallOpener}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* SUBTAB 2: PUMPSTACKER (CURATIVE TITLE + DEEP LIST STACKING)           */}
      {/* ===================================================================== */}
      {subTab === 'pump_stacker' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" />
              PumpStacker: Deep List Stacking + Curative Title
            </h3>
            <p className="text-xs text-slate-400">
              Selecciona en cuántas listas de motivación aparece la propiedad y calcula cómo curar
              gravámenes municipales (reducción del 85%–90% en Code Liens) y problemas de herederos.
            </p>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">
                Listas Apiladas (Deep List Stack — Selecciona todas las que apliquen):
              </label>
              <div className="grid grid-cols-1 gap-1.5">
                {allDistressLists.map((item) => {
                  const active = selectedLists.includes(item);
                  return (
                    <button
                      key={item}
                      onClick={() => toggleDistressList(item)}
                      className={`px-3 py-2 rounded-xl border text-xs text-left flex items-center justify-between transition ${
                        active
                          ? 'bg-amber-500/20 border-amber-500/50 text-amber-200 font-bold'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      <span>{item}</span>
                      <span>{active ? '✓ Apilada' : '+'}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="text-xs text-slate-400 block mb-1">ARV Estimado ($)</label>
                <input
                  type="number"
                  value={arv}
                  onChange={(e) => setArv(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Reparaciones ($)</label>
                <input
                  type="number"
                  value={repairs}
                  onChange={(e) => setRepairs(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">
                  Multas / Code Liens Brutos ($)
                </label>
                <input
                  type="number"
                  value={rawLiens}
                  onChange={(e) => setRawLiens(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Tu Assignment Fee ($)</label>
                <input
                  type="number"
                  value={wholesaleFee}
                  onChange={(e) => setWholesaleFee(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
            </div>

            <button
              onClick={runPumpStacker}
              disabled={loadingStack}
              className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition"
            >
              <Sparkles className="w-4 h-4" />
              {loadingStack
                ? 'Calculando Stack Score & Curative MAO...'
                : 'Ejecutar PumpStacker + Diagnóstico Curative Title'}
            </button>
          </div>

          <div className="lg:col-span-7 space-y-4">
            {!stackResult ? (
              <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-8 text-center space-y-2">
                <Layers className="w-10 h-10 text-amber-400 mx-auto opacity-80" />
                <div className="text-sm font-bold text-white">
                  Ejecuta el motor PumpStacker para calcular el AI Sellability Score y la Oferta Neta
                  Curativa
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-slate-900 border border-amber-500/40 rounded-2xl p-5 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-extrabold">
                      {stackResult.motivationTier} ({stackResult.stackCount}x Listas Apiladas)
                    </span>
                    <span className="text-sm font-black text-emerald-400">
                      AI Sellability Score: {stackResult.aiSellabilityScore}/100
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {stackResult.financials?.whyCompetitorsWalkedAway}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="text-[10px] text-slate-400">Multa Municipal Bruta</div>
                      <div className="text-sm font-bold text-red-400 line-through">
                        ${stackResult.financials?.rawLiensReported?.toLocaleString()}
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="text-[10px] text-slate-400">Multa Mitigada (~85% Off)</div>
                      <div className="text-sm font-bold text-emerald-400">
                        ${stackResult.financials?.mitigatedLienAfterReduction?.toLocaleString()}
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="text-[10px] text-slate-400">Tu Assignment Fee</div>
                      <div className="text-sm font-bold text-sky-400">
                        ${stackResult.financials?.targetAssignmentFee?.toLocaleString()}
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40">
                      <div className="text-[10px] text-emerald-300">Oferta Neta Curativa MAO</div>
                      <div className="text-base font-black text-white">
                        ${stackResult.financials?.curativeNetOfferToSeller?.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Hoja de Ruta Legal para Limpiar el Título (Curative Action Plan)
                  </h4>
                  <div className="space-y-2">
                    {(stackResult.curativeActionPlan || []).map((step: any, i: number) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <strong className="text-amber-300">{step.defect}</strong>
                          <span className="text-emerald-400 font-semibold">{step.costEstimate}</span>
                        </div>
                        <p className="text-slate-300">{step.solution}</p>
                      </div>
                    ))}
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950 border border-indigo-500/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-indigo-300">
                        📄 Cláusula Curative Title para anexar a tu Contrato PSA
                      </span>
                      <button
                        onClick={() =>
                          copyText('curative-clause', stackResult.curativeContractClause || '')
                        }
                        className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                      >
                        {copiedId === 'curative-clause' ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        Copiar Cláusula
                      </button>
                    </div>
                    <p className="text-xs font-mono text-slate-300">
                      {stackResult.curativeContractClause}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* SUBTAB 3: 5 AI ZIP CODES (SKYDRIVE AI + AI SELLABILITY SCORES)        */}
      {/* ===================================================================== */}
      {subTab === 'skydrive_zips' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Radar className="w-4 h-4 text-emerald-400" />
              5 AI Zip Codes + SkyDrive AI Inspector
            </h3>
            <p className="text-xs text-slate-400">
              Encuentra los 5 Códigos Postales con mayor velocidad de compras en efectivo (AI
              Sellability Score) e inspecciona el deterioro físico satelital/StreetView.
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">
                  Ciudad / Condado Objetivo
                </label>
                <input
                  value={skyMarket}
                  onChange={(e) => setSkyMarket(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  placeholder="Ej. Tampa, FL o Houston, TX"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">
                  Dirección para Inspección Satelital SkyDrive AI
                </label>
                <input
                  value={skyAddress}
                  onChange={(e) => setSkyAddress(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Edad del Techo (Años)</label>
                  <input
                    type="number"
                    value={roofAge}
                    onChange={(e) => setRoofAge(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Años de Tenencia</label>
                  <input
                    type="number"
                    value={yearsOwned}
                    onChange={(e) => setYearsOwned(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">
                  Señales Visuales SkyDrive (Satélite / StreetView)
                </label>
                <input
                  value={lotCondition}
                  onChange={(e) => setLotCondition(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <button
                onClick={runSkyDriveAnalyzer}
                disabled={loadingSky}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition"
              >
                <MapPin className="w-4 h-4" />
                {loadingSky
                  ? 'Analizando Top 5 AI Zip Codes & SkyDrive...'
                  : 'Generar Top 5 AI Zip Codes + SkyDrive Score'}
              </button>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-4">
            {!skyResult ? (
              <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-8 text-center space-y-2">
                <Radar className="w-10 h-10 text-emerald-400 mx-auto opacity-80" />
                <div className="text-sm font-bold text-white">
                  Descubre los 5 AI Zip Codes más líquidos de tu mercado y su Sellability Score
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* SkyDrive Property Score Card */}
                <div className="bg-slate-900 border border-emerald-500/40 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="text-xs text-emerald-300 font-bold">
                      🛰️ SkyDrive AI Property Visual Distress Score:{' '}
                      {skyResult.skydrivePropertyInspection?.visualDistressScore}/100
                    </div>
                    <div className="text-sm font-bold text-white mt-0.5">
                      {skyResult.skydrivePropertyInspection?.aiSellabilityVerdict}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={
                        skyResult.skydrivePropertyInspection?.satelliteAndStreetViewLinks
                          ?.googleMapsSatellite
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1"
                    >
                      Google Satellite / StreetView <ExternalLink className="w-3 h-3" />
                    </a>
                    <a
                      href={
                        skyResult.skydrivePropertyInspection?.satelliteAndStreetViewLinks
                          ?.googleEarthWeb
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-sky-600/20 text-sky-300 border border-sky-500/30 text-xs font-semibold flex items-center gap-1"
                    >
                      Google Earth 3D Roof Check <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Top 5 AI Zip Codes Table */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    Top 5 AI Zip Codes en {skyResult.marketName} (Ordenados por AI Sellability Score)
                  </h4>
                  <div className="space-y-2.5">
                    {(skyResult.top5AiZipCodes || []).map((z: any, idx: number) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-3"
                      >
                        <div className="space-y-1 max-w-xl">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-xs font-black">
                              #{z.rank} • ZIP {z.zipCode}
                            </span>
                            <span className="text-sm font-bold text-white">
                              {z.neighborhoodName}
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-bold">
                              Sellability: {z.aiSellabilityScore}/100
                            </span>
                          </div>
                          <p className="text-xs text-slate-400">{z.skydriveDistressDensity}</p>
                          <div className="flex flex-wrap gap-4 text-[11px] text-slate-300 pt-0.5">
                            <span>
                              💵 <strong>Cash Ratio:</strong> {z.cashBuyerRatio}
                            </span>
                            <span>
                              📈 <strong>ARV Medio:</strong> {z.medianArv}
                            </span>
                            <span>
                              🎯 <strong>Target MAO:</strong> {z.targetEntryMao}
                            </span>
                            <span>
                              ⚡ <strong>Dispo:</strong> {z.avgDaysToDispo}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <a
                            href={z.zillowCashSalesUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-1.5 rounded-lg bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold flex items-center gap-1"
                          >
                            Zillow ZIP {z.zipCode} <ExternalLink className="w-3 h-3" />
                          </a>
                          <a
                            href={z.redfinSoldCompsUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1"
                          >
                            Redfin Sold Comps <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* SUBTAB 4: BUYERMATCH AI DISPO + XLEADS DISPO TAB                      */}
      {/* ===================================================================== */}
      {subTab === 'buyermatch_dispo' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3.5">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-sky-400" />
              BuyerMatch AI Dispo + AI Ranked Cash Buyers
            </h3>
            <p className="text-xs text-slate-400">
              Empareja tu contrato con los Cash Buyers más activos del Zip Code y genera el paquete
              de Dispo (SMS + Email Blast) listo para cobrar tu Assignment Fee.
            </p>

            <div>
              <label className="text-xs text-slate-400 block mb-1">Dirección bajo Contrato</label>
              <input
                value={dispoAddress}
                onChange={(e) => setDispoAddress(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Zip Code</label>
                <input
                  value={dispoZip}
                  onChange={(e) => setDispoZip(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Precio Contrato ($)</label>
                <input
                  type="number"
                  value={contractPrice}
                  onChange={(e) => setContractPrice(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Assignment Fee ($)</label>
                <input
                  type="number"
                  value={dispoFee}
                  onChange={(e) => setDispoFee(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">ARV Comps ($)</label>
                <input
                  type="number"
                  value={dispoArv}
                  onChange={(e) => setDispoArv(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">
                Especificaciones (Beds / Baths / SqFt)
              </label>
              <input
                value={dispoSpecs}
                onChange={(e) => setDispoSpecs(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <button
              onClick={runBuyerMatchDispo}
              disabled={loadingDispo}
              className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition"
            >
              <Send className="w-4 h-4" />
              {loadingDispo
                ? 'Emparejando AI Ranked Cash Buyers...'
                : 'Ejecutar BuyerMatch AI Dispo'}
            </button>
          </div>

          <div className="lg:col-span-8 space-y-4">
            {!dispoResult ? (
              <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-8 text-center space-y-2">
                <Users className="w-10 h-10 text-sky-400 mx-auto opacity-80" />
                <div className="text-sm font-bold text-white">
                  Ejecuta BuyerMatch AI para clasificar los Cash Buyers de tu Zip Code y generar tu
                  Dispo Blast
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-slate-900 border border-sky-500/40 rounded-2xl p-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <div className="text-[10px] text-slate-400">Precio Cash Buyer</div>
                    <div className="text-base font-black text-white">
                      ${dispoResult.dealMetrics?.buyerAskingPrice?.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400">Tu Assignment Fee</div>
                    <div className="text-base font-black text-emerald-400">
                      +${dispoResult.dealMetrics?.assignmentFee?.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400">ARV Verificado</div>
                    <div className="text-base font-bold text-sky-400">
                      ${dispoResult.dealMetrics?.arv?.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400">Ganancia Neta para el Flipper</div>
                    <div className="text-base font-black text-amber-300">
                      ${dispoResult.dealMetrics?.projectedBuyerProfit?.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Ranked Buyers */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                  <h4 className="text-sm font-bold text-white">
                    🏆 AI Ranked Cash Buyers para ZIP {dispoResult.dealMetrics?.zipCode}
                  </h4>
                  <div className="space-y-2.5">
                    {(dispoResult.rankedBuyers || []).map((b: any, idx: number) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-3"
                      >
                        <div className="space-y-1 max-w-xl">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 text-xs font-black">
                              Rank #{b.rank} • {b.aiMatchScore}% AI Match
                            </span>
                            <span className="text-sm font-bold text-white">{b.buyerName}</span>
                            <span className="text-xs text-emerald-400 font-semibold">
                              ({b.cashPurchasesLast12Mo} compras cash / 12m)
                            </span>
                          </div>
                          <p className="text-xs text-slate-400">{b.buyBoxMatchReason}</p>
                        </div>
                        <a
                          href={b.skipTraceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1"
                        >
                          Contactar / SkipTrace <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SMS & Email Dispo Blast */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-300">
                        📱 SMS Dispo Blast (Enviar a tus Cash Buyers)
                      </span>
                      <button
                        onClick={() => copyText('dispo-sms', dispoResult.smsDispoBlast || '')}
                        className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                      >
                        {copiedId === 'dispo-sms' ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        Copiar SMS
                      </button>
                    </div>
                    <pre className="text-xs text-slate-300 whitespace-pre-wrap font-sans bg-slate-950 p-3 rounded-xl border border-slate-800">
                      {dispoResult.smsDispoBlast}
                    </pre>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-sky-300">
                        📧 Email Dispo Packet Completo
                      </span>
                      <button
                        onClick={() => copyText('dispo-email', dispoResult.emailDispoPacket || '')}
                        className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                      >
                        {copiedId === 'dispo-email' ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        Copiar Email
                      </button>
                    </div>
                    <pre className="text-xs text-slate-300 whitespace-pre-wrap font-sans bg-slate-950 p-3 rounded-xl border border-slate-800 max-h-48 overflow-y-auto">
                      {dispoResult.emailDispoPacket}
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
