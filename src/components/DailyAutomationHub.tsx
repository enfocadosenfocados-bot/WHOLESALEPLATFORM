'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Zap,
  Play,
  Settings,
  Clock,
  CheckCircle,
  AlertTriangle,
  PhoneCall,
  MessageSquare,
  Mail,
  Users,
  Home,
  BarChart3,
  RefreshCw,
  Save,
  Bell,
  BellOff,
  ChevronDown,
  ChevronUp,
  Loader2,
} from 'lucide-react';

interface AutomationRunLog {
  id: string;
  startedAt: string;
  finishedAt?: string;
  status: 'running' | 'completed' | 'error';
  totalBuyers: number;
  totalPropertiesFound: number;
  totalLeadsCreated: number;
  totalContactsAttempted: number;
  totalCallsInitiated: number;
  errors: string[];
  stepLogs: string[];
}

interface AutomationConfig {
  enabled: boolean;
  runHour: number;
  strategies: string[];
  autoSms: boolean;
  autoEmail: boolean;
  autoCall: boolean;
  vapiApiKey: string;
  twilioSid: string;
  twilioToken: string;
  sendgridKey: string;
}

const STRATEGIES = [
  { id: 'zillow_fsbo', label: '🏠 Zillow FSBO (For Sale By Owner)', color: 'sky' },
  { id: 'code_violations', label: '⚠️ Code Violations (Condado/Municipio)', color: 'amber' },
  { id: 'tax_delinquent', label: '📋 Tax Delinquent (Impuestos Atrasados)', color: 'red' },
  { id: 'assumable', label: '🔑 Assumable 2.8% (VA/FHA Zillow)', color: 'indigo' },
  { id: 'vacant_land', label: '🌿 Vacant Land (Infill Lots)', color: 'emerald' },
];

export default function DailyAutomationHub() {
  const [config, setConfig] = useState<AutomationConfig>({
    enabled: false,
    runHour: 8,
    strategies: ['zillow_fsbo', 'code_violations', 'tax_delinquent', 'assumable', 'vacant_land'],
    autoSms: true,
    autoEmail: true,
    autoCall: true,
    vapiApiKey: '',
    twilioSid: '',
    twilioToken: '',
    sendgridKey: '',
  });
  const [lastRun, setLastRun] = useState<AutomationRunLog | null>(null);
  const [history, setHistory] = useState<AutomationRunLog[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showLogs, setShowLogs] = useState(true);
  const [showHistory, setShowHistory] = useState(false);
  const [runMessage, setRunMessage] = useState('');
  const logsRef = useRef<HTMLDivElement>(null);
  const cronRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Load existing config + last run on mount
  useEffect(() => {
    fetch('/api/daily-automation')
      .then((r) => r.json())
      .then((data) => {
        if (data.automationConfig) setConfig(data.automationConfig);
        if (data.lastRun) setLastRun(data.lastRun);
      })
      .catch(() => {});
  }, []);

  // Scroll logs to bottom on update
  useEffect(() => {
    if (logsRef.current) logsRef.current.scrollTop = logsRef.current.scrollHeight;
  }, [lastRun?.stepLogs]);

  // In-browser scheduler: check every minute if it's time to run
  useEffect(() => {
    if (!config.enabled) {
      if (cronRef.current) clearInterval(cronRef.current);
      return;
    }
    const checkTime = () => {
      const now = new Date();
      if (now.getHours() === config.runHour && now.getMinutes() === 0) {
        handleRunNow();
      }
    };
    cronRef.current = setInterval(checkTime, 60000);
    return () => { if (cronRef.current) clearInterval(cronRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.enabled, config.runHour]);

  const toggleStrategy = (id: string) => {
    setConfig((prev) => ({
      ...prev,
      strategies: prev.strategies.includes(id)
        ? prev.strategies.filter((s) => s !== id)
        : [...prev.strategies, id],
    }));
  };

  const handleSaveConfig = async () => {
    setIsSaving(true);
    try {
      await fetch('/api/daily-automation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'save_config', config }),
      });
      setRunMessage('✅ Configuración guardada correctamente.');
    } catch {
      setRunMessage('❌ Error al guardar configuración.');
    } finally {
      setIsSaving(false);
      setTimeout(() => setRunMessage(''), 3000);
    }
  };

  const handleRunNow = async () => {
    setIsRunning(true);
    setRunMessage('');
    setShowLogs(true);
    // Create an optimistic running log
    const tempLog: AutomationRunLog = {
      id: `run-${Date.now()}`,
      startedAt: new Date().toISOString(),
      status: 'running',
      totalBuyers: 0,
      totalPropertiesFound: 0,
      totalLeadsCreated: 0,
      totalContactsAttempted: 0,
      totalCallsInitiated: 0,
      errors: [],
      stepLogs: ['⏳ Iniciando ciclo de automatización…'],
    };
    setLastRun(tempLog);

    try {
      const res = await fetch('/api/daily-automation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'run_now', strategies: config.strategies }),
      });
      const data = await res.json();
      if (data.success) {
        setLastRun(data.run);
        setRunMessage(`🏁 Completado: ${data.run.totalLeadsCreated} leads nuevos, ${data.run.totalCallsInitiated} llamadas.`);
        // Refresh history
        fetch('/api/daily-automation')
          .then((r) => r.json())
          .then((d) => { if (d.lastRun) setLastRun(d.lastRun); });
      } else {
        setRunMessage(`❌ Error: ${data.error}`);
        setLastRun((prev) => prev ? { ...prev, status: 'error', finishedAt: new Date().toISOString() } : prev);
      }
    } catch (err: any) {
      setRunMessage(`❌ Error de red: ${err.message}`);
      setLastRun((prev) => prev ? { ...prev, status: 'error', finishedAt: new Date().toISOString() } : prev);
    } finally {
      setIsRunning(false);
    }
  };

  const StatusIcon = ({ status }: { status: AutomationRunLog['status'] }) => {
    if (status === 'running') return <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />;
    if (status === 'completed') return <CheckCircle className="w-4 h-4 text-emerald-400" />;
    return <AlertTriangle className="w-4 h-4 text-red-400" />;
  };

  return (
    <div className="space-y-5">
      {/* ── Header ── */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-black text-white">🤖 Auto-Pilot Diario — WholesalePlatform</h2>
          </div>
          <p className="text-sm text-slate-400">
            El sistema busca propiedades, contacta vendedores y llama automáticamente todos los días por ti.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {/* Automation toggle */}
          <button
            onClick={() => setConfig((c) => ({ ...c, enabled: !c.enabled }))}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
              config.enabled
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                : 'bg-slate-800 text-slate-400 border border-slate-700'
            }`}
          >
            {config.enabled ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
            {config.enabled ? `Auto-Pilot ON (${config.runHour}:00h)` : 'Auto-Pilot OFF'}
          </button>
          {/* Run now */}
          <button
            onClick={handleRunNow}
            disabled={isRunning}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-black bg-gradient-to-r from-cyan-600 to-indigo-600 text-white hover:from-cyan-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-600/25"
          >
            {isRunning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
            {isRunning ? 'Ejecutando…' : '▶ Ejecutar Ahora'}
          </button>
        </div>
      </div>

      {/* ── Stats ── */}
      {lastRun && (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { label: 'Buyers', value: lastRun.totalBuyers, icon: <Users className="w-4 h-4 text-indigo-400" /> },
            { label: 'Propiedades', value: lastRun.totalPropertiesFound, icon: <Home className="w-4 h-4 text-sky-400" /> },
            { label: 'Leads Creados', value: lastRun.totalLeadsCreated, icon: <BarChart3 className="w-4 h-4 text-emerald-400" /> },
            { label: 'Contactos', value: lastRun.totalContactsAttempted, icon: <MessageSquare className="w-4 h-4 text-amber-400" /> },
            { label: 'Llamadas IA', value: lastRun.totalCallsInitiated, icon: <PhoneCall className="w-4 h-4 text-cyan-400" /> },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-col items-center gap-1"
            >
              {stat.icon}
              <div className="text-2xl font-black text-white">{stat.value}</div>
              <div className="text-[10px] text-slate-500 text-center">{stat.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* ── Run message ── */}
      {runMessage && (
        <div
          className={`rounded-xl px-4 py-3 text-sm font-medium border ${
            runMessage.startsWith('✅') || runMessage.startsWith('🏁')
              ? 'bg-emerald-950/60 border-emerald-500/30 text-emerald-300'
              : 'bg-red-950/60 border-red-500/30 text-red-300'
          }`}
        >
          {runMessage}
        </div>
      )}

      {/* ── Live Logs ── */}
      {lastRun && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <button
            onClick={() => setShowLogs((v) => !v)}
            className="w-full flex items-center justify-between px-5 py-3 border-b border-slate-800 text-sm font-bold text-white hover:bg-slate-800/50 transition"
          >
            <div className="flex items-center gap-2">
              <StatusIcon status={lastRun.status} />
              Logs en Vivo — Último Run ({lastRun.startedAt ? new Date(lastRun.startedAt).toLocaleString() : ''})
              {lastRun.errors.length > 0 && (
                <span className="text-[10px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full font-semibold ml-1">
                  {lastRun.errors.length} error(es)
                </span>
              )}
            </div>
            {showLogs ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
          </button>
          {showLogs && (
            <div
              ref={logsRef}
              className="bg-slate-950 p-4 h-72 overflow-y-auto font-mono text-[11px] space-y-0.5"
            >
              {lastRun.stepLogs.map((log, i) => (
                <div
                  key={i}
                  className={`leading-relaxed ${
                    log.includes('✅') ? 'text-emerald-400' :
                    log.includes('📞') ? 'text-cyan-400' :
                    log.includes('📱') ? 'text-sky-400' :
                    log.includes('📧') ? 'text-indigo-400' :
                    log.includes('⚠️') ? 'text-amber-400' :
                    log.includes('❌') ? 'text-red-400' :
                    log.includes('🏁') ? 'text-emerald-300 font-bold' :
                    log.includes('👤') ? 'text-purple-300 font-semibold' :
                    log.includes('🚀') ? 'text-cyan-300 font-bold' :
                    'text-slate-400'
                  }`}
                >
                  {log}
                </div>
              ))}
              {lastRun.status === 'running' && (
                <div className="text-cyan-400 animate-pulse">▋ procesando…</div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── Strategies & Contact Methods ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Strategies */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Home className="w-4 h-4 text-emerald-400" /> Estrategias de Búsqueda Activas
          </h3>
          <p className="text-xs text-slate-500">
            El sistema buscará propiedades usando estas estrategias para cada buyer.
          </p>
          <div className="space-y-2">
            {STRATEGIES.map((s) => {
              const active = config.strategies.includes(s.id);
              return (
                <button
                  key={s.id}
                  onClick={() => toggleStrategy(s.id)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold transition border ${
                    active
                      ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                      : 'bg-slate-950 border-slate-800 text-slate-500'
                  }`}
                >
                  <span>{s.label}</span>
                  <span
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      active ? 'bg-emerald-500 border-emerald-400' : 'border-slate-600'
                    }`}
                  >
                    {active && <span className="text-white text-[8px] font-black">✓</span>}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Contact methods */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-cyan-400" /> Métodos de Contacto Automático
          </h3>
          <p className="text-xs text-slate-500">
            Activa los canales que el agente usará para contactar a cada propietario.
          </p>
          <div className="space-y-2">
            {[
              { key: 'autoSms', icon: <MessageSquare className="w-4 h-4" />, label: '📱 SMS Automático', desc: 'Script de mensaje personalizado al teléfono del vendedor' },
              { key: 'autoEmail', icon: <Mail className="w-4 h-4" />, label: '📧 Email Automático', desc: 'Email formal de oferta en efectivo con precio MAO' },
              { key: 'autoCall', icon: <PhoneCall className="w-4 h-4" />, label: '📞 Llamada IA (Agente de Voz)', desc: 'Agente de voz IA que llama y analiza motivación del vendedor' },
            ].map((method) => {
              const isOn = config[method.key as keyof AutomationConfig] as boolean;
              return (
                <button
                  key={method.key}
                  onClick={() => setConfig((c) => ({ ...c, [method.key]: !isOn }))}
                  className={`w-full flex items-start gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition border ${
                    isOn
                      ? 'bg-cyan-950/40 border-cyan-500/40 text-cyan-300'
                      : 'bg-slate-950 border-slate-800 text-slate-500'
                  }`}
                >
                  <div className={`mt-0.5 shrink-0 ${isOn ? 'text-cyan-400' : 'text-slate-600'}`}>
                    {method.icon}
                  </div>
                  <div className="text-left">
                    <div className="font-bold">{method.label}</div>
                    <div className="text-[10px] opacity-70 font-normal">{method.desc}</div>
                  </div>
                  <div
                    className={`ml-auto shrink-0 w-8 h-4 rounded-full transition-colors ${
                      isOn ? 'bg-cyan-500' : 'bg-slate-700'
                    } relative`}
                  >
                    <div
                      className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-transform ${
                        isOn ? 'translate-x-4' : 'translate-x-0.5'
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Advanced Settings ── */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <button
          onClick={() => setShowSettings((v) => !v)}
          className="w-full flex items-center justify-between px-5 py-3 border-b border-slate-800 text-sm font-bold text-slate-300 hover:bg-slate-800/50 transition"
        >
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-indigo-400" />
            Configuración Avanzada — Cron, Vapi/Twilio, SendGrid
          </div>
          {showSettings ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
        </button>
        {showSettings && (
          <div className="p-5 space-y-4">
            {/* Schedule */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <label className="text-xs font-bold text-slate-300">Hora de ejecución diaria:</label>
              </div>
              <select
                value={config.runHour}
                onChange={(e) => setConfig((c) => ({ ...c, runHour: +e.target.value }))}
                className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
              >
                {Array.from({ length: 24 }, (_, i) => (
                  <option key={i} value={i}>{String(i).padStart(2, '0')}:00 hrs</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { key: 'vapiApiKey', label: '🎙️ Vapi.ai API Key (llamadas reales)', placeholder: 'vapi-...' },
                { key: 'twilioSid', label: '📱 Twilio Account SID (SMS reales)', placeholder: 'ACxxxx' },
                { key: 'twilioToken', label: '🔑 Twilio Auth Token', placeholder: 'xxxxxxxx' },
                { key: 'sendgridKey', label: '📧 SendGrid API Key (emails reales)', placeholder: 'SG.xxxx' },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-[10px] font-semibold text-slate-400 mb-1">{field.label}</label>
                  <input
                    type="password"
                    value={(config as any)[field.key]}
                    onChange={(e) => setConfig((c) => ({ ...c, [field.key]: e.target.value }))}
                    placeholder={field.placeholder}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder:text-slate-600"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSaveConfig}
                disabled={isSaving}
                className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-50"
              >
                {isSaving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                Guardar Configuración
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── How it works ── */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-950/30 border border-indigo-500/20 rounded-2xl p-5">
        <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <RefreshCw className="w-4 h-4 text-indigo-400" /> ¿Cómo funciona el Auto-Pilot?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {[
            { step: '1', icon: <Users className="w-5 h-5 text-indigo-400" />, title: 'Lee tus Buyers', desc: 'Toma el Buy Box de cada cash buyer registrado (mercado, precio, tipo).' },
            { step: '2', icon: <Home className="w-5 h-5 text-sky-400" />, title: 'Busca Propiedades', desc: 'Corre 5 estrategias en paralelo: FSBO, Code Violations, Tax Delinquent, Assumable 2.8%, Vacant Land.' },
            { step: '3', icon: <MessageSquare className="w-5 h-5 text-amber-400" />, title: 'Envía SMS + Email', desc: 'Contacta al dueño con script personalizado de oferta en efectivo.' },
            { step: '4', icon: <PhoneCall className="w-5 h-5 text-cyan-400" />, title: 'Llama con IA', desc: 'Agente de voz IA llama al vendedor, analiza los 4 Pilares de Motivación y cierra.' },
            { step: '5', icon: <CheckCircle className="w-5 h-5 text-emerald-400" />, title: 'Genera Contrato', desc: 'Si el vendedor dice SÍ, crea el contrato PSA con cláusula "and/or assigns" listo para firmar.' },
          ].map((s) => (
            <div key={s.step} className="flex flex-col items-center text-center gap-2 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="text-[10px] font-black bg-indigo-600/30 text-indigo-300 rounded-full w-5 h-5 flex items-center justify-center">{s.step}</div>
              {s.icon}
              <div className="text-xs font-bold text-white">{s.title}</div>
              <div className="text-[10px] text-slate-500 leading-relaxed">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
