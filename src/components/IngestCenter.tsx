'use client';

import React, { useState } from 'react';
import {
  Video,
  FileUp,
  Globe,
  Sparkles,
  Loader2,
  CheckCircle2,
  Eye,
  Search,
  GitMerge,
  Zap,
} from 'lucide-react';
import { SkillDatabase, SkillModule } from '@/types/skill';

interface IngestCenterProps {
  onIngestSuccess: (
    updatedDb: SkillDatabase,
    evolvedSkill: SkillModule
  ) => void;
  apiKey: string;
}

const SAMPLE_REELS = [
  {
    label: 'Reel IG: Truco Code Violations + Absentee Owners en Accela',
    url: 'https://www.instagram.com/reel/wholesale-code-violations-accela/',
    notes:
      'En este Reel muestran en pantalla el portal municipal Accela Citizen Access (aca-prod.accela.com), filtran por "Code Enforcement -> Open Violations" de los últimos 30 días con "Tall Grass / Boarded Window", exportan a CSV y filtran cuando Owner Mailing Address es diferente a Property Address. Luego usan CyberBackgroundChecks.com para llamar al dueño.',
  },
  {
    label: 'TikTok: Encontrar Cash Buyers Gratis en Zillow + Property Appraiser',
    url: 'https://www.tiktok.com/@flipwithrick/video/cash-buyers-zillow-hack',
    notes:
      'El video enseña cómo encontrar Cash Buyers reales sin pagar listas: 1) Entra a Zillow Sold en los últimos 60 días y busca casas remodeladas modernas. 2) Copia la dirección y pégala en el County Property Appraiser. 3) Revisa el historial de ventas (Sales History) para ver qué LLC la compró barata hace 4 meses en efectivo. 4) Busca esa LLC en Sunbiz.org / Secretary of State y llama al Managing Member.',
  },
  {
    label: 'YouTube: Estrategia Pre-Foreclosures (Lis Pendens) + Subject-To',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    notes:
      'Estrategia paso a paso para Pre-Foreclosures: entrar al County Clerk of Court Official Records, buscar Document Type "Lis Pendens" registrados en los últimos 45 días. Si el dueño tiene poco equity pero una tasa de interés hipotecaria baja (3%-4%), ofrecer comprar la propiedad "Subject-To" la hipoteca existente poniendo al día los pagos atrasados (Arrears).',
  },
];

export default function IngestCenter({
  onIngestSuccess,
  apiKey,
}: IngestCenterProps) {
  const [mode, setMode] = useState<'url' | 'pdf'>('url');
  const [url, setUrl] = useState('');
  const [userNotes, setUserNotes] = useState('');
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [statusStep, setStatusStep] = useState('');
  const [error, setError] = useState('');
  const [lastResult, setLastResult] = useState<{
    skillTitle: string;
    oldVersion: string;
    newVersion: string;
    summary: string;
    screenOcrDetected: string[];
    webResearchAdded: string[];
    agyPath?: string;
  } | null>(null);

  const handleProcess = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLastResult(null);
    setLoading(true);

    try {
      setStatusStep(
        mode === 'url'
          ? '1/4 Extrayendo audio, subtítulos y capturas de pantalla (yt-dlp + ffmpeg)...'
          : '1/4 Extrayendo texto, cláusulas y enlaces del documento PDF...'
      );

      const timer1 = setTimeout(() => {
        setStatusStep(
          '2/4 Analizando contenido multimodal (Voz + Visión OCR de links en pantalla)...'
        );
      }, 2500);

      const timer2 = setTimeout(() => {
        setStatusStep(
          '3/4 Investigando en la web (Deep Research) las páginas de gobierno y herramientas...'
        );
      }, 5500);

      const timer3 = setTimeout(() => {
        setStatusStep(
          '4/4 Fusionando pasos en el Árbol de Skills y exportando SKILL.md a Antigravity...'
        );
      }, 8500);

      let res: Response;
      if (mode === 'pdf') {
        if (!pdfFile) {
          throw new Error('Selecciona un archivo PDF primero.');
        }
        const formData = new FormData();
        formData.append('file', pdfFile);
        formData.append('userNotes', userNotes);
        formData.append('apiKey', apiKey);
        res = await fetch('/api/ingest', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Error al procesar el contenido');
        }
        const latestHist = data.db?.ingestionHistory?.[0];
        setLastResult({
          skillTitle: data.evolvedSkill.title,
          oldVersion: latestHist?.oldVersion || '1.0',
          newVersion: data.evolvedSkill.version,
          summary: data.summary,
          screenOcrDetected: data.screenOcrDetected || [],
          webResearchAdded: data.webResearchAdded || [],
          agyPath: data.evolvedSkill.agyExportedPath,
        });
        onIngestSuccess(data.db, data.evolvedSkill);
      } else {
        const multipleUrls = (url.match(/https?:\/\/[^\s,]+/g) || [url.trim()]).filter(Boolean);
        let lastData = null;

        for (let i = 0; i < multipleUrls.length; i++) {
          const singleUrl = multipleUrls[i];
          setStatusStep(
            `Procesando (${i + 1}/${multipleUrls.length}): Descargando audio + frames OCR e investigando ${singleUrl.slice(0, 48)}...`
          );
          res = await fetch('/api/ingest', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: singleUrl, userNotes, apiKey }),
          });
          const data = await res.json();
          if (!res.ok) {
            throw new Error(data.error || `Error al procesar ${singleUrl}`);
          }
          lastData = data;
          onIngestSuccess(data.db, data.evolvedSkill);
        }

        if (lastData) {
          const latestHist = lastData.db?.ingestionHistory?.[0];
          setLastResult({
            skillTitle:
              multipleUrls.length > 1
                ? `${multipleUrls.length} Reels/Links Procesados → Última: ${lastData.evolvedSkill.title}`
                : lastData.evolvedSkill.title,
            oldVersion: latestHist?.oldVersion || '1.0',
            newVersion: lastData.evolvedSkill.version,
            summary: lastData.summary,
            screenOcrDetected: lastData.screenOcrDetected || [],
            webResearchAdded: lastData.webResearchAdded || [],
            agyPath: lastData.evolvedSkill.agyExportedPath,
          });
        }
      }

      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);

      setUrl('');
      setUserNotes('');
      setPdfFile(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error inesperado');
    } finally {
      setLoading(false);
      setStatusStep('');
    }
  };

  const loadSample = (sample: (typeof SAMPLE_REELS)[0]) => {
    setMode('url');
    setUrl(sample.url);
    setUserNotes(sample.notes);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/60 border border-indigo-500/30 rounded-2xl p-6 shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Motor Multimodal: Audio + Visión OCR de Pantalla + Deep Web Research
          </div>
          <h2 className="text-xl font-extrabold text-white">
            Alimentar Nueva Habilidad (Reels IG, TikTok, FB, YouTube, PDFs y Webs)
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">
            Pega el link de tus Reels guardados o sube un PDF. El sistema descarga el video, lee lo que muestran en pantalla, investiga en internet las páginas mencionadas y evoluciona tus Skills paso a paso.
          </p>
        </div>

        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0 self-start">
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              mode === 'url'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Video className="w-4 h-4" />
            Link (Reel / YT / TikTok / Web)
          </button>
          <button
            type="button"
            onClick={() => setMode('pdf')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              mode === 'pdf'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileUp className="w-4 h-4" />
            Subir PDF / Contrato
          </button>
        </div>
      </div>

      {/* Quick Demo Presets */}
      <div className="mb-4">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-2">
          Ejemplos Rápidos de Reels Guardados (Clic para probar cómo evoluciona el Dashboard):
        </span>
        <div className="flex flex-wrap gap-2">
          {SAMPLE_REELS.map((s, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => loadSample(s)}
              className="text-xs px-3 py-1.5 rounded-xl bg-slate-950/90 hover:bg-indigo-950/80 text-indigo-300 border border-indigo-500/30 transition flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleProcess} className="space-y-4">
        {mode === 'url' ? (
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              URL del Reel de Instagram, Facebook, TikTok, Video de YouTube o Página Web
            </label>
            <div className="relative">
              <Globe className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.instagram.com/reel/... o https://www.tiktok.com/... o https://youtube.com/..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        ) : (
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Seleccionar Archivo PDF (Guía, Contrato PSA, Lista o Ebook)
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-300 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500"
            />
          </div>
        )}

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Contexto Opcional / Qué quieres que aprenda o investigue de este Reel (o pega el caption si el Reel es privado)
          </label>
          <textarea
            rows={3}
            value={userNotes}
            onChange={(e) => setUserNotes(e.target.value)}
            placeholder="Ej: En este reel explican cómo sacar la lista de Tax Delinquent en Florida y qué página usan para ver si tiene hipoteca. Investiga más a fondo los links y agrégalo al paso a paso..."
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="text-xs text-slate-400">
            {loading ? (
              <span className="text-indigo-300 font-medium flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
                {statusStep}
              </span>
            ) : (
              <span>
                Auto-sincronización activa con <code className="text-indigo-300">.agents/skills/*.md</code>
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Analizando e Investigando...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Scrapear, Investigar y Evolucionar Skill
              </>
            )}
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-4 p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-xs text-rose-200">
          {error}
        </div>
      )}

      {lastResult && (
        <div className="mt-6 p-5 rounded-2xl bg-slate-950/90 border border-emerald-500/40 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5" />
              ¡Skill Evolucionada y Sincronizada con Antigravity!
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
              {lastResult.skillTitle}: v{lastResult.oldVersion} → v{lastResult.newVersion}
            </span>
          </div>

          <p className="text-xs text-slate-200 leading-relaxed bg-slate-900 p-3.5 rounded-xl border border-slate-800">
            {lastResult.summary}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
              <div className="text-xs font-semibold text-amber-300 flex items-center gap-1.5 mb-2">
                <Eye className="w-4 h-4" />
                Detectado en Video / Pantalla (OCR & Links):
              </div>
              <ul className="space-y-1 text-xs text-slate-300 list-disc list-inside">
                {lastResult.screenOcrDetected.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
              <div className="text-xs font-semibold text-sky-300 flex items-center gap-1.5 mb-2">
                <Search className="w-4 h-4" />
                Ampliado por Deep Web Research:
              </div>
              <ul className="space-y-1 text-xs text-slate-300 list-disc list-inside">
                {lastResult.webResearchAdded.length > 0 ? (
                  lastResult.webResearchAdded.map((item, i) => (
                    <li key={i} className="line-clamp-2">
                      {item}
                    </li>
                  ))
                ) : (
                  <li>Conocimiento integrado directamente en los pasos operativos.</li>
                )}
              </ul>
            </div>
          </div>

          {lastResult.agyPath && (
            <div className="text-[11px] text-indigo-300 flex items-center gap-1.5">
              <GitMerge className="w-3.5 h-3.5" />
              Exportado como Skill real de Antigravity en: <code>{lastResult.agyPath}</code>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
