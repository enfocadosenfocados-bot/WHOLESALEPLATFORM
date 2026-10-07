'use client';

import React, { useEffect, useState } from 'react';
import {
  Sparkles,
  Layers,
  CheckSquare,
  Square,
  ExternalLink,
  Play,
  GitBranch,
  BookOpen,
  Wrench,
  History,
  Copy,
  Check,
  KeyRound,
  Terminal,
  Award,
  Eye,
  Globe,
  PhoneCall,
  Users,
  Instagram,
  Zap,
  Bot,
} from 'lucide-react';
import { SkillDatabase, SkillModule } from '@/types/skill';
import IngestCenter from '@/components/IngestCenter';
import CountyGovFinder from '@/components/CountyGovFinder';
import DealAnalyzerTool from '@/components/DealAnalyzerTool';
import ContractAndScriptGenerator from '@/components/ContractAndScriptGenerator';
import SkillRunnerModal from '@/components/SkillRunnerModal';
import CashBuyerScraperHub from '@/components/CashBuyerScraperHub';
import SellerAcquisitionPipeline from '@/components/SellerAcquisitionPipeline';
import InstagramCreatorsOutreach from '@/components/InstagramCreatorsOutreach';
import XLeadsPumpStackerHub from '@/components/XLeadsPumpStackerHub';
import AdvancedWholesaleSuite from '@/components/AdvancedWholesaleSuite';
import DailyAutomationHub from '@/components/DailyAutomationHub';
import SaaSReplacementHub from '@/components/SaaSReplacementHub';
import HowToCloseDealsHub from '@/components/HowToCloseDealsHub';
import PlatformChat from '@/components/PlatformChat';

export default function SkillForgeDashboard() {
  const [db, setDb] = useState<SkillDatabase | null>(null);
  const [selectedSkillSlug, setSelectedSkillSlug] = useState<string>('');
  const [activeTab, setActiveTab] = useState<
    | 'skills'
    | 'saas_replacement'
    | 'how_to_close_deals'
    | 'daily_automation'
    | 'institutional_suite'
    | 'xleads_pumpstacker'
    | 'seller_pipeline'
    | 'cash_buyers'
    | 'ig_creators'
    | 'executors'
    | 'history'
  >('how_to_close_deals');
  const [runnerSkill, setRunnerSkill] = useState<SkillModule | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [syncMessage, setSyncMessage] = useState('');
  const [copiedId, setCopiedId] = useState('');
  const [markdownPreviewModal, setMarkdownPreviewModal] = useState<{
    title: string;
    markdown: string;
  } | null>(null);

  useEffect(() => {
    fetch('/api/skills')
      .then((r) => r.json())
      .then((data: SkillDatabase) => {
        setDb(data);
        if (data.skills.length > 0) {
          setSelectedSkillSlug(data.skills[0].slug);
        }
      });
  }, []);

  const selectedSkill =
    db?.skills.find((s) => s.slug === selectedSkillSlug) ||
    db?.skills[0] ||
    null;

  const handleToggleStep = async (skillId: string, stepId: string) => {
    const res = await fetch('/api/skills', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'toggle_step', skillId, stepId }),
    });
    if (res.ok) {
      const updated = await res.json();
      setDb(updated);
    }
  };

  const handleExportToAntigravity = async (skillSlug?: string) => {
    setSyncMessage('Sincronizando SKILL.md...');
    const res = await fetch('/api/export-agy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ skillSlug }),
    });
    const data = await res.json();
    if (res.ok) {
      setSyncMessage(
        '¡Sincronizado con .agents/skills/ y ~/.gemini/config/skills/!'
      );
      if (data.markdownPreview && selectedSkill) {
        setMarkdownPreviewModal({
          title: `.agents/skills/${selectedSkill.slug}/SKILL.md`,
          markdown: data.markdownPreview,
        });
      }
      setTimeout(() => setSyncMessage(''), 4000);
    }
  };

  const copyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(''), 2000);
  };

  if (!db) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-300">
        <div className="flex items-center gap-3 text-sm font-medium">
          <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          Cargando Árbol Maestro de Skills, Cash Buyers, Leads y Perfiles de IG...
        </div>
      </div>
    );
  }

  const totalSteps = db.skills.reduce((acc, s) => acc + (s.steps?.length || (s as any).workflowSteps?.length || 0), 0);
  const totalBuyers = db.cashBuyers?.length || 0;
  const totalCreators = db.igCreators?.length || 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-16">
      {/* Top Header */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-slate-950/85 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-extrabold tracking-tight text-white">
                  SkillForge AI
                </h1>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-semibold">
                  FreeWholesaling.com + 11 Reels Command Center
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Skills Evolutivas • Scraper de Cash Buyers • Agente de Llamadas & Auto-Contrato • Outreach a Creadores IG
              </p>
            </div>
          </div>

          {/* Metrics & Actions */}
          <div className="flex items-center flex-wrap gap-2.5">
            <div className="hidden xl:flex items-center gap-4 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              <div>
                <span className="text-slate-400">Skills:</span>{' '}
                <strong className="text-white">{db.skills.length}</strong>
              </div>
              <div className="h-3 w-px bg-slate-800" />
              <div>
                <span className="text-slate-400">Pasos:</span>{' '}
                <strong className="text-emerald-400">{totalSteps}</strong>
              </div>
              <div className="h-3 w-px bg-slate-800" />
              <div>
                <span className="text-slate-400">Cash Buyers:</span>{' '}
                <strong className="text-sky-400">{totalBuyers}</strong>
              </div>
              <div className="h-3 w-px bg-slate-800" />
              <div>
                <span className="text-slate-400">Perfiles IG:</span>{' '}
                <strong className="text-pink-400">{totalCreators}</strong>
              </div>
            </div>

            <button
              onClick={() => handleExportToAntigravity()}
              className="px-3.5 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <Terminal className="w-3.5 h-3.5" />
              Sincronizar Skills con Antigravity
            </button>

            <button
              onClick={() => setShowKeyInput(!showKeyInput)}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs flex items-center gap-1.5"
              title="Configurar API Key opcional"
            >
              <KeyRound className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </div>

        {syncMessage && (
          <div className="bg-emerald-950/90 border-b border-emerald-500/30 text-center py-1.5 text-xs text-emerald-300 font-medium">
            {syncMessage}
          </div>
        )}

        {showKeyInput && (
          <div className="max-w-7xl mx-auto px-6 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-4">
            <span className="text-xs text-slate-300">
              Clave OpenRouter / Gemini (Opcional — usa automáticamente{' '}
              <code>OPENROUTER_API_KEY</code> de tu sistema):
            </span>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-or-v1-..."
              className="w-80 bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
            />
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        {/* 1. Multimodal Ingestion Center */}
        <IngestCenter
          apiKey={apiKey}
          onIngestSuccess={(updatedDb, evolvedSkill) => {
            setDb(updatedDb);
            setSelectedSkillSlug(evolvedSkill.slug);
            setActiveTab('skills');
          }}
        />

        {/* 2. Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('how_to_close_deals')}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                activeTab === 'how_to_close_deals'
                  ? 'bg-gradient-to-r from-emerald-600 via-indigo-600 to-purple-600 text-white shadow-lg shadow-emerald-500/30 ring-2 ring-emerald-400'
                  : 'bg-slate-900 text-emerald-300 hover:text-white border border-emerald-500/40'
              }`}
            >
              <Award className="w-4 h-4 text-emerald-400" />
              📜 Cómo se Cierran Deals & Documentos
            </button>

            <button
              onClick={() => setActiveTab('saas_replacement')}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                activeTab === 'saas_replacement'
                  ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white shadow-lg shadow-emerald-500/30 ring-1 ring-emerald-400'
                  : 'bg-slate-900 text-emerald-300 hover:text-white border border-emerald-500/40'
              }`}
            >
              <Layers className="w-4 h-4 text-emerald-400" />
              🔥 Motor Central Leads (Reemplazo SaaS $0)
            </button>

            <button
              onClick={() => setActiveTab('daily_automation')}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                activeTab === 'daily_automation'
                  ? 'bg-gradient-to-r from-emerald-600 to-cyan-600 text-white shadow-lg shadow-emerald-500/30 ring-1 ring-emerald-400 animate-pulse-slow'
                  : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              <Bot className="w-4 h-4" />
              🤖 Auto-Pilot Diario (Buscar + Llamar + Mensajear)
            </button>

            <button
              onClick={() => setActiveTab('skills')}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                activeTab === 'skills'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Layers className="w-4 h-4" />
              1. Árbol de Skills ({db.skills.length})
            </button>

            <button
              onClick={() => setActiveTab('institutional_suite')}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                activeTab === 'institutional_suite'
                  ? 'bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 text-white shadow-lg shadow-cyan-500/25 ring-1 ring-cyan-400'
                  : 'bg-slate-900 text-cyan-300 hover:text-white border border-cyan-500/40'
              }`}
            >
              <Sparkles className="w-4 h-4 text-cyan-300" />
              ⚡ Suite Institucional (E-Sign / Deal Portals / Telefonía / Extensión / Webhooks)
            </button>

            <button
              onClick={() => setActiveTab('xleads_pumpstacker')}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                activeTab === 'xleads_pumpstacker'
                  ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-lg shadow-red-600/25'
                  : 'bg-slate-900 text-amber-300 hover:text-white border border-amber-500/40'
              }`}
            >
              <Zap className="w-4 h-4" />
              ⚡ PumpStacker & XLeads Suite (Death Scrub / Obituarios / Curative / SkyDrive)
            </button>

            <button
              onClick={() => setActiveTab('seller_pipeline')}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                activeTab === 'seller_pipeline'
                  ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/25'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <PhoneCall className="w-4 h-4" />
              2. Vendedores: SMS, Email, Llamada IA & Auto-Contrato ({db.sellerLeads?.length || 0})
            </button>

            <button
              onClick={() => setActiveTab('cash_buyers')}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                activeTab === 'cash_buyers'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Users className="w-4 h-4" />
              3. Creadores, Bird-Dog Payers & Cash Buyers (Con o Sin Contrato) ({db.cashBuyers?.length || 0})
            </button>

            <button
              onClick={() => setActiveTab('ig_creators')}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                activeTab === 'ig_creators'
                  ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/25'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Instagram className="w-4 h-4" />
              4. Perfiles IG de los Reels (Enviar DM / Trabajar con Ellos) ({db.igCreators?.length || 0})
            </button>

            <button
              onClick={() => setActiveTab('executors')}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                activeTab === 'executors'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/25'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Wrench className="w-4 h-4" />
              5. Calculadoras & Portales Gov FOIA
            </button>

            <button
              onClick={() => setActiveTab('history')}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                activeTab === 'history'
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/25'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <History className="w-4 h-4" />
              6. Historial Reels & OCR ({db.ingestionHistory.length})
            </button>
          </div>
        </div>

        {/* TAB: CÓMO SE CIERRAN DEALS & DOCUMENTOS */}
        {activeTab === 'how_to_close_deals' && <HowToCloseDealsHub />}

        {/* TAB 1: SKILL TREE EXPLORER */}
        {activeTab === 'skills' && selectedSkill && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
                Módulos Maestros (Enriquecidos con tus 11 Reels)
              </div>
              {db.skills.map((skill) => {
                const isSelected = skill.slug === selectedSkill.slug;
                const stepsList = skill.steps || (skill as any).workflowSteps || [];
                const completedCount = stepsList.filter((s: any) => s.completed).length;
                return (
                  <button
                    key={skill.id}
                    onClick={() => setSelectedSkillSlug(skill.slug)}
                    className={`w-full text-left p-4 rounded-2xl border transition relative overflow-hidden ${
                      isSelected
                        ? 'bg-slate-900 border-indigo-500 shadow-lg shadow-indigo-500/10'
                        : 'bg-slate-900/50 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-800 text-indigo-300">
                        {skill.category}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                          v{skill.version}
                        </span>
                        <span className="text-[11px] text-amber-400 font-bold flex items-center gap-0.5">
                          <Award className="w-3 h-3" />
                          {skill.masteryScore}%
                        </span>
                      </div>
                    </div>

                    <h3 className="text-sm font-bold text-white leading-snug mb-2">
                      {skill.title}
                    </h3>

                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>
                        {stepsList.length} pasos ({completedCount} completados)
                      </span>
                      <span>{skill.resources?.length || 0} links/portales</span>
                    </div>

                    <div className="w-full h-1.5 bg-slate-800 rounded-full mt-2.5 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full transition-all"
                        style={{ width: `${skill.masteryScore}%` }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-8 space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800 pb-5">
                  <div className="space-y-1.5 max-w-2xl">
                    <div className="flex items-center flex-wrap gap-2">
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold">
                        {selectedSkill.category}
                      </span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
                        Versión Evolutiva v{selectedSkill.version}
                      </span>
                      <span className="text-xs text-slate-400">
                        Actualizado: {selectedSkill.lastUpdated}
                      </span>
                    </div>
                    <h2 className="text-xl font-extrabold text-white">
                      {selectedSkill.title}
                    </h2>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {selectedSkill.summary}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                    <button
                      onClick={() => setRunnerSkill(selectedSkill)}
                      className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/25 transition"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      Ejecutar Skill con Agente IA
                    </button>
                    <button
                      onClick={() => handleExportToAntigravity(selectedSkill.slug)}
                      className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition"
                    >
                      <Terminal className="w-4 h-4 text-indigo-400" />
                      Ver SKILL.md
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/30 text-xs text-indigo-200 leading-relaxed">
                  <strong className="text-indigo-300 block mb-0.5">
                    ¿Por qué funciona esta estrategia?
                  </strong>
                  {selectedSkill.whyItWorks}
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-emerald-400" />
                    Procedimiento Paso a Paso Acumulado ({(selectedSkill.steps || (selectedSkill as any).workflowSteps || []).length} Pasos)
                  </h3>

                  <div className="space-y-3">
                    {(selectedSkill.steps || (selectedSkill as any).workflowSteps || []).map((step: any) => (
                      <div
                        key={step.id}
                        className={`p-4 rounded-xl border transition ${
                          step.completed
                            ? 'bg-emerald-950/20 border-emerald-500/40'
                            : 'bg-slate-950/80 border-slate-800'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() =>
                              handleToggleStep(selectedSkill.id, step.id)
                            }
                            className="mt-0.5 text-emerald-400 hover:scale-110 transition shrink-0"
                          >
                            {step.completed ? (
                              <CheckSquare className="w-5 h-5" />
                            ) : (
                              <Square className="w-5 h-5 text-slate-500" />
                            )}
                          </button>

                          <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between flex-wrap gap-2">
                              <h4
                                className={`text-sm font-bold ${
                                  step.completed
                                    ? 'line-through text-slate-400'
                                    : 'text-white'
                                }`}
                              >
                                Paso {step.order}: {step.title}
                              </h4>
                              <span className="text-[11px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                                Fuente: {step.sourceAttribution}
                              </span>
                            </div>

                            <p className="text-xs text-slate-300 leading-relaxed">
                              {step.actionDescription}
                            </p>

                            {step.exactCommandsOrClicks.length > 0 && (
                              <div className="bg-slate-900/90 rounded-lg p-3 border border-slate-800/80 space-y-1.5">
                                <span className="text-[11px] font-semibold text-indigo-300 block">
                                  Acciones exactas / Filtros / Clics:
                                </span>
                                <ul className="space-y-1 text-xs text-slate-300 list-disc list-inside">
                                  {step.exactCommandsOrClicks?.map((cmd: string, idx: number) => (
                                    <li key={idx}>{cmd}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {step.proTip && (
                              <div className="text-xs text-amber-300/90 bg-amber-950/30 border border-amber-500/20 rounded-lg px-3 py-2">
                                <strong>Pro-Tip:</strong> {step.proTip}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Globe className="w-4 h-4 text-sky-400" />
                    Páginas de Gobierno, Portales y Herramientas Extraídas ({selectedSkill.resources.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedSkill.resources.map((res) => (
                      <a
                        key={res.id}
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-sky-500/50 transition group flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="text-xs font-bold text-white group-hover:text-sky-300 transition">
                              {res.name}
                            </span>
                            <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-sky-400 shrink-0" />
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            {res.howToUse}
                          </p>
                        </div>
                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-900 text-[10px]">
                          <span
                            className={`px-2 py-0.5 rounded font-semibold ${
                              res.isFree
                                ? 'bg-emerald-500/15 text-emerald-300'
                                : 'bg-amber-500/15 text-amber-300'
                            }`}
                          >
                            {res.isFree ? '100% GRATIS' : 'HERRAMIENTA PAGA'}
                          </span>
                          <span className="text-slate-500">
                            Vía: {res.discoveredVia.toUpperCase()}
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {selectedSkill.scriptsAndTemplates.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <h3 className="text-sm font-bold text-white">
                      Guiones, Solicitudes FOIA, Prompts IA y Cláusulas de esta Skill
                    </h3>
                    {selectedSkill.scriptsAndTemplates.map((tpl) => (
                      <div
                        key={tpl.id}
                        className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div>
                            <h4 className="text-xs font-bold text-amber-300">
                              {tpl.title}
                            </h4>
                            <p className="text-[11px] text-slate-400">
                              Cuándo usarlo: {tpl.whenToUse}
                            </p>
                          </div>
                          <button
                            onClick={() => copyText(tpl.id, tpl.content)}
                            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 flex items-center gap-1"
                          >
                            {copiedId === tpl.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                            {copiedId === tpl.id ? 'Copiado' : 'Copiar'}
                          </button>
                        </div>
                        <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap bg-slate-900/90 p-3 rounded-lg border border-slate-800 max-h-60 overflow-y-auto">
                          {tpl.content}
                        </pre>
                      </div>
                    ))}
                  </div>
                )}

                <div className="space-y-2.5 pt-2 border-t border-slate-800">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <GitBranch className="w-4 h-4 text-indigo-400" />
                    Historial de Evolución de esta Skill
                  </h3>
                  <div className="space-y-2">
                    {selectedSkill.changelog.map((log, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                      >
                        <div>
                          <span className="font-mono font-bold text-emerald-400 mr-2">
                            v{log.version}
                          </span>
                          <span className="text-slate-200">
                            {log.summaryOfNewKnowledge}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-500 shrink-0">
                          {log.sourceTitle.slice(0, 40)} ({log.date})
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {selectedSkill.executorType === 'county_gov_finder' && (
                <CountyGovFinder />
              )}
              {selectedSkill.executorType === 'deal_calculator' && (
                <DealAnalyzerTool />
              )}
              {selectedSkill.executorType === 'contract_generator' && (
                <ContractAndScriptGenerator />
              )}
            </div>
          </div>
        )}

        {/* TAB: 🔥 SAAS REPLACEMENT HUB (PROPSTREAM / BATCHLEADS / TRANCHI REPLACEMENT) */}
        {activeTab === 'saas_replacement' && (
          <SaaSReplacementHub />
        )}

        {/* TAB: 🤖 DAILY AUTO-PILOT — PROPERTY SEARCH + OUTREACH + AI CALLS */}
        {activeTab === 'daily_automation' && (
          <DailyAutomationHub />
        )}

        {/* TAB: ADVANCED INSTITUTIONAL WHOLESALE SUITE */}
        {activeTab === 'institutional_suite' && (
          <AdvancedWholesaleSuite sellerLeads={db.sellerLeads || []} />
        )}


        {/* TAB: XLEADS & PUMPSTACKER SUITE */}
        {activeTab === 'xleads_pumpstacker' && (
          <XLeadsPumpStackerHub apiKey={apiKey} />
        )}

        {/* TAB 2: SELLER ACQUISITION PIPELINE (SMS + EMAIL + AI CALL CLOSER + AUTO CONTRACT) */}
        {activeTab === 'seller_pipeline' && (
          <SellerAcquisitionPipeline
            leads={db.sellerLeads || []}
            cashBuyers={db.cashBuyers || []}
            onDatabaseUpdated={(updatedDb) => setDb(updatedDb)}
          />
        )}

        {/* TAB 3: CASH BUYER SCRAPER HUB (FACEBOOK GROUPS + REDDIT + BIGGERPOCKETS + BUILDERS) */}
        {activeTab === 'cash_buyers' && (
          <CashBuyerScraperHub
            cashBuyers={db.cashBuyers || []}
            onBuyersUpdated={(buyers) => setDb({ ...db, cashBuyers: buyers })}
          />
        )}

        {/* TAB 4: INSTAGRAM CREATORS & MENTORS DM OUTREACH */}
        {activeTab === 'ig_creators' && (
          <InstagramCreatorsOutreach
            creators={db.igCreators || []}
            onDatabaseUpdated={(updatedDb) => setDb(updatedDb)}
          />
        )}

        {/* TAB 5: ALL INTERACTIVE EXECUTORS */}
        {activeTab === 'executors' && (
          <div className="space-y-6">
            <CountyGovFinder />
            <DealAnalyzerTool />
            <ContractAndScriptGenerator />
          </div>
        )}

        {/* TAB 6: INGESTION & OCR HISTORY */}
        {activeTab === 'history' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <History className="w-5 h-5 text-amber-400" />
              Registro Detallado de los 11 Reels de Instagram (Audio + OCR de Pantalla + Deep Research)
            </h3>
            <div className="space-y-4">
              {db.ingestionHistory.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5"
                >
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold uppercase">
                        {item.sourceType}
                      </span>
                      <span className="text-sm font-bold text-white">
                        {item.targetSkillTitle}
                      </span>
                      <span className="text-xs font-mono text-emerald-400">
                        v{item.oldVersion} → v{item.newVersion}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500">
                      {new Date(item.timestamp).toLocaleString()}
                    </span>
                  </div>

                  <div className="text-xs text-slate-400 truncate">
                    Fuente:{' '}
                    <a
                      href={item.inputUrlOrFile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:underline"
                    >
                      {item.inputUrlOrFile}
                    </a>
                  </div>

                  <p className="text-xs text-slate-200 bg-slate-900 p-3 rounded-lg border border-slate-800 leading-relaxed">
                    {item.summary}
                  </p>

                  {item.screenOcrDetected.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 items-center pt-1">
                      <span className="text-[11px] text-amber-300 flex items-center gap-1 mr-1">
                        <Eye className="w-3.5 h-3.5" />
                        OCR Pantalla / Links:
                      </span>
                      {item.screenOcrDetected.map((ocr, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300"
                        >
                          {ocr}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <SkillRunnerModal
        skill={runnerSkill}
        onClose={() => setRunnerSkill(null)}
        apiKey={apiKey}
      />

      {markdownPreviewModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-indigo-500/40 rounded-2xl max-w-3xl w-full p-6 space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs text-emerald-400 font-mono">
                  Skill Real de Antigravity Generada
                </span>
                <h4 className="text-sm font-bold text-white">
                  {markdownPreviewModal.title}
                </h4>
              </div>
              <button
                onClick={() => setMarkdownPreviewModal(null)}
                className="px-3 py-1 rounded-lg bg-slate-800 text-xs text-slate-300"
              >
                Cerrar
              </button>
            </div>
            <pre className="flex-1 overflow-y-auto bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 font-mono whitespace-pre-wrap">
              {markdownPreviewModal.markdown}
            </pre>
          </div>
        </div>
      )}

      {/* 🤖 FLOATING AI CHAT — always visible on every tab with live tab switcher */}
      <PlatformChat
        apiKey={apiKey}
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
      />
    </div>
  );
}
