'use client';

import React, { useState } from 'react';
import { Play, X, Loader2, Sparkles, ExternalLink, Copy, Check } from 'lucide-react';
import { SkillModule } from '@/types/skill';

interface SkillRunnerModalProps {
  skill: SkillModule | null;
  onClose: () => void;
  apiKey: string;
}

export default function SkillRunnerModal({
  skill,
  onClose,
  apiKey,
}: SkillRunnerModalProps) {
  const [targetMarketOrCase, setTargetMarketOrCase] = useState('Orlando, Orange County, Florida');
  const [userGoal, setUserGoal] = useState('');
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');
  const [webFindings, setWebFindings] = useState<
    { title: string; url: string; snippet: string }[]
  >([]);
  const [copied, setCopied] = useState(false);

  if (!skill) return null;

  const handleRun = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setOutput('');
    try {
      const res = await fetch('/api/execute-skill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          skillSlug: skill.slug,
          targetMarketOrCase,
          userGoal:
            userGoal ||
            `Ejecuta todos los pasos de "${skill.title}" para este mercado, dame los links de gobierno o portales exactos y los guiones listos para usar hoy.`,
          apiKey,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setOutput(data.executionOutput || '');
        setWebFindings(data.webFindings || []);
      } else {
        setOutput(`Error: ${data.error || 'No se pudo ejecutar'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-indigo-500/40 rounded-2xl max-w-4xl w-full p-6 shadow-2xl space-y-5 max-h-[90vh] flex flex-col">
        <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono">
              Agente Ejecutor en Vivo • v{skill.version}
            </span>
            <h3 className="text-lg font-bold text-white mt-1.5">{skill.title}</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              El agente buscará en la web en tiempo real y aplicará los {skill.steps.length} pasos aprendidos de esta Skill sobre tu mercado o propiedad.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleRun} className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-5">
            <label className="block text-xs text-slate-400 mb-1">
              Condado / Ciudad / Propiedad Objetivo
            </label>
            <input
              type="text"
              value={targetMarketOrCase}
              onChange={(e) => setTargetMarketOrCase(e.target.value)}
              placeholder="Ej: Miami-Dade FL, Dallas TX, 123 Main St..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white"
            />
          </div>
          <div className="md:col-span-5">
            <label className="block text-xs text-slate-400 mb-1">
              Objetivo Específico a Realizar
            </label>
            <input
              type="text"
              value={userGoal}
              onChange={(e) => setUserGoal(e.target.value)}
              placeholder="Ej: Saca los links de impuestos atrasados y arma mi plan de hoy..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white"
            />
          </div>
          <div className="md:col-span-2 flex items-end">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition h-[34px]"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  Ejecutar
                </>
              )}
            </button>
          </div>
        </form>

        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {loading && (
            <div className="p-8 text-center space-y-3 bg-slate-950/60 rounded-xl border border-slate-800">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-400 mx-auto" />
              <p className="text-sm text-indigo-300 font-medium">
                Ejecutando Skill v{skill.version}: Buscando portales en vivo para &ldquo;{targetMarketOrCase}&rdquo; y generando plan operativo...
              </p>
            </div>
          )}

          {webFindings.length > 0 && (
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-xs font-semibold text-emerald-400 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Enlaces Oficiales Encontrados en Vivo para {targetMarketOrCase}:
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {webFindings.map((wf, i) => (
                  <a
                    key={i}
                    href={wf.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center justify-between gap-2 text-xs text-slate-200"
                  >
                    <span className="truncate">{wf.title}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {output && (
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-300">
                  Resultado de Ejecución Paso a Paso
                </span>
                <button
                  onClick={handleCopy}
                  className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  {copied ? 'Copiado' : 'Copiar Plan'}
                </button>
              </div>
              <div className="text-xs text-slate-200 whitespace-pre-wrap leading-relaxed font-sans">
                {output}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
