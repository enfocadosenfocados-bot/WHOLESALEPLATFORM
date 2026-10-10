'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Loader2,
  Sparkles,
  Play,
  BarChart3,
  Home,
  Users,
  Zap,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Minimize2,
  Maximize2,
  ArrowLeftRight,
  Layers,
  PhoneCall,
  Instagram,
  Wrench,
  History,
  FileCheck2,
  Grid,
  Copy,
  Check,
  Calculator,
  FileText,
  Search,
  ExternalLink,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  ShieldAlert,
  Target,
  Wand2,
  Building2,
  CheckCircle2,
  Share2,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  actionExecuted?: boolean;
  actionTaken?: string;
  actionData?: any;
}

export type DashboardTabKey =
  | 'top_states_strategy'
  | 'how_to_close_deals'
  | 'saas_replacement'
  | 'daily_automation'
  | 'institutional_suite'
  | 'xleads_pumpstacker'
  | 'seller_pipeline'
  | 'cash_buyers'
  | 'ig_creators'
  | 'skills'
  | 'executors'
  | 'history';

interface DashboardTabInfo {
  key: DashboardTabKey;
  label: string;
  shortLabel: string;
  icon: string;
  color: string;
}

const DASHBOARD_TABS: DashboardTabInfo[] = [
  { key: 'top_states_strategy', label: '🌟 Top Estados & Estrategia', shortLabel: 'Top Estados', icon: '🌟', color: 'from-emerald-600 via-teal-600 to-indigo-600' },
  { key: 'how_to_close_deals', label: '📜 Cómo se Cierran Deals & Docs', shortLabel: 'Cerrar Deals', icon: '📜', color: 'from-emerald-600 via-indigo-600 to-purple-600' },
  { key: 'saas_replacement', label: '🔥 Motor Leads (Reemplazo SaaS $0)', shortLabel: 'Motor Leads', icon: '🔥', color: 'from-emerald-600 to-cyan-600' },
  { key: 'daily_automation', label: '🤖 Auto-Pilot Diario', shortLabel: 'Auto-Pilot', icon: '🤖', color: 'from-emerald-600 to-cyan-600' },
  { key: 'institutional_suite', label: '⚡ Suite Institucional (E-Sign/Deals)', shortLabel: 'Suite Pro', icon: '⚡', color: 'from-cyan-600 to-indigo-600' },
  { key: 'xleads_pumpstacker', label: '⚡ PumpStacker & XLeads', shortLabel: 'PumpStacker', icon: '🔥', color: 'from-red-600 to-amber-600' },
  { key: 'seller_pipeline', label: '📞 2. Vendedores (SMS/Llamada IA)', shortLabel: 'Vendedores', icon: '📞', color: 'from-sky-600 to-blue-600' },
  { key: 'cash_buyers', label: '👥 3. Cash Buyers (35)', shortLabel: 'Cash Buyers', icon: '👥', color: 'from-emerald-600 to-teal-600' },
  { key: 'ig_creators', label: '📸 4. Creadores IG (8)', shortLabel: 'Creadores IG', icon: '📸', color: 'from-pink-600 to-rose-600' },
  { key: 'skills', label: '📚 1. Árbol de Skills', shortLabel: 'Skills', icon: '📚', color: 'from-indigo-600 to-purple-600' },
  { key: 'executors', label: '🛠️ 5. Calculadoras & FOIA', shortLabel: 'Calculadoras', icon: '🛠️', color: 'from-purple-600 to-pink-600' },
  { key: 'history', label: '📜 6. Historial Reels & OCR', shortLabel: 'Historial', icon: '📜', color: 'from-amber-600 to-orange-600' },
];

const DEAL_PACK_ACTIONS = [
  { label: '⚡ Master Deal Pack (TODOS los 35 Buyers en Excel+Word)', prompt: 'Genera el Master Deal Pack para TODOS los cash buyers que tengo en el dashboard en Excel y Word con números de vendedores, scripts de SMS/Email, scripts del bot closer con ofertas calculadas y contratos listos', badge: 'MASTER' },
  { label: '🎯 Emparejar Comprador Ideal (Match Buyer Palm Bay)', prompt: '¿A quién le vendo un lote baldío en Palm Bay FL listo para construir?', badge: 'Match Buyer' },
  { label: '🛡️ Superar Objeción: "Zillow dice que vale $200k"', prompt: 'El vendedor me dice que en Zillow su casa vale $200,000 y que mi oferta de $62,000 es muy baja. ¿Cómo le respondo?', badge: 'Objeción' },
  { label: '🧙‍♂️ Deal Wizard (Flujo Turnkey de 6 Fases)', prompt: 'Ejecuta el Deal Wizard completo de 6 fases para cerrar un deal llave en mano', badge: 'Wizard' },
  { label: '🔍 Skip-Trace Instantáneo (Arthur Pendleton)', prompt: 'Haz skip trace a Arthur Pendleton en Palm Bay FL para sacar sus números de celular reales', badge: 'Skip-Trace' },
  { label: '🏛️ Reducción de Multas Municipales (85%-90%)', prompt: 'Genera una carta formal para el magistrado de código pidiendo reducir multas de $18,450 a $850 en 18418 Joann St', badge: 'Curative' },
  { label: '📞 Preparar Llamada Vapi (Marcus Vance / Detroit)', prompt: 'Prepara la llamada telefónica con Vapi para Marcus Vance en 18418 Joann St Detroit con el guion de los 4 pilares y la oferta calculada', badge: 'Vapi Call' },
  { label: '🧮 Calcular Oferta MAO (ARV $160k, Rehab $25k)', prompt: 'Calcula la oferta MAO y el anclaje inverso para una casa con ARV $160,000 y reparaciones estimadas de $25,000', badge: 'MAO Calc' },
  { label: '📜 Generar Contrato PSA Asignable (AI Automated Services)', prompt: 'Genera el contrato PSA de compra para 18418 Joann St Detroit con la entidad AI Automated Services LLC and/or assigns e inspección de 14 días', badge: 'Contrato' },
  { label: '🌟 Ver Top 5 Estados Fáciles y Terrenos', prompt: 'Llévame a ver los Top 5 Estados Fáciles para comenzar y explícame por qué el wholesaling de terrenos es el #1', badge: 'Estrategia' },
  { label: '📜 Ver Guía de Cierre & Notarías Móviles', prompt: 'Abre la guía de cómo se cierran los deals y qué notarías móviles online recomiendan para no viajar', badge: 'Cierres' },
  { label: '🔍 Buscar Violaciones de Código (SODA API)', prompt: 'Busca violaciones de código en vivo con el SODA API para sacar propiedades motivadas', badge: 'Open Data' },
  { label: '🤖 Ejecutar Auto-Pilot Diario Ahora', prompt: 'Ejecuta el auto-pilot ahora y busca propiedades para mis buyers', badge: 'Auto' },
];

function renderContent(text: string) {
  const lines = text.split('\n');
  return lines.map((line, i) => {
    let processed = line.replace(
      /\[(.*?)\]\((.*?)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-cyan-400 font-bold underline hover:text-cyan-300 inline-flex items-center gap-0.5">$1 ↗</a>'
    );
    processed = processed.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    processed = processed.replace(/`([^`]+)`/g, '<code class="bg-slate-900 px-1 py-0.5 rounded text-amber-300 font-mono text-[11px]">$1</code>');

    if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
      return (
        <div key={i} className="flex gap-1.5 items-start">
          <span className="text-cyan-400 shrink-0 mt-0.5">▸</span>
          <span dangerouslySetInnerHTML={{ __html: processed.replace(/^[•\-]\s*/, '') }} />
        </div>
      );
    }
    if (line.trim().startsWith('>')) {
      return (
        <div key={i} className="border-l-2 border-cyan-500/50 pl-2.5 py-1 my-1 bg-slate-900/60 rounded-r text-slate-300 italic" dangerouslySetInnerHTML={{ __html: processed.replace(/^>\s*/, '') }} />
      );
    }
    if (line.startsWith('###')) {
      return (
        <div key={i} className="font-bold text-cyan-300 text-[12px] mt-2 mb-1" dangerouslySetInnerHTML={{ __html: processed.replace(/^###\s*/, '') }} />
      );
    }
    if (line.startsWith('##')) {
      return (
        <div key={i} className="font-black text-white text-[13px] mt-2.5 mb-1" dangerouslySetInnerHTML={{ __html: processed.replace(/^##\s*/, '') }} />
      );
    }
    if (line.trim() === '') return <div key={i} className="h-1" />;
    return <div key={i} dangerouslySetInnerHTML={{ __html: processed }} />;
  });
}

interface PlatformChatProps {
  apiKey?: string;
  activeTab?: string;
  onSelectTab?: (tab: DashboardTabKey) => void;
}

export default function PlatformChat({ apiKey = '', activeTab, onSelectTab }: PlatformChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDockedLeft, setIsDockedLeft] = useState(false);
  const [showAllPills, setShowAllPills] = useState(false);
  const [activePillSection, setActivePillSection] = useState<'tabs' | 'deals'>('deals');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `¡Hola! Soy tu Copiloto IA de **WholesalePlatform** 🤖🎙️

Tengo control operativo de élite sobre la plataforma:
- 🎯 **Match Buyer**: Emparejo propiedades al instante con tus 35+ Cash Buyers.
- 🛡️ **Objection Buster**: Guiones psicológicos para demoler objeciones de vendedores.
- 📞 **Vapi & Twilio**: Preparo llamadas con análisis de 4 pilares de motivación.
- 🧮 **MAO & Anclaje**: Corro la fórmula del 70% y anclaje inverso para ganar $10k-$18k.
- 🔍 **Skip-Trace & Curative**: Enlaces directos a números gratis y reducción de multas.
- 🎙️ **Voz Activa**: Puedes hablarme por micrófono o pedirme que lea las respuestas en voz alta.

¿Qué quieres ejecutar ahora?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const pillsScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setHasNewMessage(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRec) {
      alert('Reconocimiento de voz soportado en Google Chrome o Microsoft Edge.');
      return;
    }
    try {
      const recognition = new SpeechRec();
      recognition.lang = 'es-US';
      recognition.continuous = false;
      recognition.interimResults = false;
      setIsListening(true);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const speakText = (text: string, id: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (speakingMessageId === id) {
      window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
      return;
    }
    window.speechSynthesis.cancel();
    const clean = text
      .replace(/\[(.*?)\]\(.*?\)/g, '$1')
      .replace(/[*#`_>|]/g, '')
      .replace(/{.*?}/g, '')
      .slice(0, 400);

    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.lang = 'es-US';
    utterance.rate = 1.05;
    utterance.onend = () => setSpeakingMessageId(null);
    utterance.onerror = () => setSpeakingMessageId(null);
    setSpeakingMessageId(id);
    window.speechSynthesis.speak(utterance);
  };

  const scrollPills = (direction: 'left' | 'right') => {
    if (pillsScrollRef.current) {
      const scrollAmount = direction === 'left' ? -220 : 220;
      pillsScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const sendMessage = async (text?: string) => {
    const content = (text || input).trim();
    if (!content || isLoading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const historyForApi = [...messages, userMsg].map((m) => ({
      role: m.role,
      content: m.content,
    }));

    try {
      const res = await fetch('/api/platform-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: historyForApi,
          apiKey,
        }),
      });

      const data = await res.json();

      if (data.navigateToTab && onSelectTab) {
        onSelectTab(data.navigateToTab as DashboardTabKey);
      }

      const assistantMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        role: 'assistant',
        content: data.reply || '❌ Error al procesar la respuesta.',
        timestamp: new Date(),
        actionExecuted: data.actionExecuted,
        actionTaken: data.actionTaken,
        actionData: data.actionData,
      };

      setMessages((prev) => [...prev, assistantMsg]);

      if (!isOpen) setHasNewMessage(true);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'assistant',
          content: `❌ Error de conexión: ${err.message}`,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const chatWidth = isExpanded ? 'w-[820px]' : 'w-[460px]';
  const chatHeight = isExpanded ? 'h-[88vh]' : 'h-[660px]';
  const dockPosition = isDockedLeft ? 'left-6' : 'right-6';

  return (
    <>
      {/* ── Floating Toggle Button ── */}
      <button
        onClick={() => { setIsOpen((v) => !v); setHasNewMessage(false); }}
        className={`fixed bottom-6 ${dockPosition} z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${
          isOpen
            ? 'bg-slate-800 border border-slate-700 rotate-180'
            : 'bg-gradient-to-br from-cyan-600 to-indigo-600 hover:scale-110 shadow-cyan-500/40'
        }`}
        title="Copiloto IA WholesalePlatform"
      >
        {isOpen ? (
          <ChevronDown className="w-6 h-6 text-slate-300" />
        ) : (
          <>
            <Bot className="w-7 h-7 text-white" />
            {hasNewMessage && (
              <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-slate-950 animate-bounce" />
            )}
          </>
        )}
      </button>

      {/* ── Chat Panel ── */}
      {isOpen && (
        <div
          className={`fixed bottom-24 ${dockPosition} z-50 ${chatWidth} ${chatHeight} bg-slate-950 border border-slate-700/80 rounded-2xl shadow-2xl shadow-black/80 flex flex-col overflow-hidden transition-all duration-200`}
          style={{ backdropFilter: 'blur(20px)' }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                  <Bot className="w-4.5 h-4.5 text-white" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-950 animate-pulse" />
              </div>
              <div>
                <div className="text-xs font-black text-white flex items-center gap-1.5">
                  WholesalePlatform AI Ultra-Copilot
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                </div>
                <div className="text-[10px] text-emerald-400 font-medium">● En línea — Matcher, Vapi, Objeciones & Cierres</div>
              </div>
            </div>

            {/* Window Controls */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsDockedLeft((v) => !v)}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-cyan-300 transition"
                title={isDockedLeft ? 'Mover a la derecha' : 'Mover a la izquierda'}
              >
                <ArrowLeftRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsExpanded((v) => !v)}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition"
                title={isExpanded ? 'Reducir' : 'Expandir'}
              >
                {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition"
                title="Cerrar chat"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Sub-Header: Mode Selector Tabs */}
          <div className="bg-slate-900/90 border-b border-slate-800/80 px-3 py-1.5 flex items-center justify-between gap-2 shrink-0 text-[11px]">
            <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded-lg border border-slate-800">
              <button
                onClick={() => setActivePillSection('deals')}
                className={`px-2.5 py-1 rounded-md font-bold transition flex items-center gap-1.5 ${
                  activePillSection === 'deals'
                    ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Zap className="w-3 h-3 text-cyan-300" />
                Acciones Élite ({DEAL_PACK_ACTIONS.length})
              </button>
              <button
                onClick={() => setActivePillSection('tabs')}
                className={`px-2.5 py-1 rounded-md font-bold transition flex items-center gap-1.5 ${
                  activePillSection === 'tabs'
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Layers className="w-3 h-3" />
                Pestañas ({DASHBOARD_TABS.length})
              </button>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowAllPills((v) => !v)}
                className={`p-1 rounded-md transition text-slate-400 hover:text-white flex items-center gap-1 text-[10px] font-semibold border ${
                  showAllPills ? 'bg-cyan-950/60 border-cyan-500/40 text-cyan-300' : 'bg-slate-950 border-slate-800'
                }`}
                title={showAllPills ? 'Ver en fila deslizable' : 'Expandir y ver todas'}
              >
                <Grid className="w-3 h-3" />
                {showAllPills ? 'Deslizar' : 'Ver todas'}
              </button>
              {!showAllPills && (
                <>
                  <button
                    onClick={() => scrollPills('left')}
                    className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => scrollPills('right')}
                    className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* SECTION 1: DASHBOARD TABS */}
          {activePillSection === 'tabs' && (
            <div className="bg-slate-950/95 border-b border-slate-800/80 px-3 py-2 shrink-0">
              <div
                ref={pillsScrollRef}
                className={`${
                  showAllPills
                    ? 'grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-36 overflow-y-auto'
                    : 'flex gap-1.5 overflow-x-auto no-scrollbar scroll-smooth'
                }`}
              >
                {DASHBOARD_TABS.map((tab) => {
                  const isActive = activeTab === tab.key;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => {
                        if (onSelectTab) onSelectTab(tab.key);
                      }}
                      className={`shrink-0 text-[11px] font-bold px-2.5 py-1.5 rounded-lg border transition flex items-center gap-1.5 whitespace-nowrap ${
                        isActive
                          ? `bg-gradient-to-r ${tab.color} text-white shadow-md ring-1 ring-white/30`
                          : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300 hover:text-white'
                      }`}
                      title={`Ir a ${tab.label}`}
                    >
                      <span>{tab.icon}</span>
                      <span>{tab.shortLabel}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white ml-0.5 animate-pulse" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* SECTION 2: QUICK ACTIONS & DEAL PACKS */}
          {activePillSection === 'deals' && (
            <div className="bg-slate-950/95 border-b border-slate-800/80 px-3 py-2 shrink-0">
              <div
                ref={pillsScrollRef}
                className={`${
                  showAllPills
                    ? 'grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-40 overflow-y-auto'
                    : 'flex gap-1.5 overflow-x-auto no-scrollbar scroll-smooth'
                }`}
              >
                {DEAL_PACK_ACTIONS.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => sendMessage(action.prompt)}
                    disabled={isLoading}
                    className={`shrink-0 text-[10px] font-bold px-2.5 py-1.5 rounded-lg border transition flex items-center justify-between gap-1.5 whitespace-nowrap disabled:opacity-50 ${
                      action.badge === 'MASTER'
                        ? 'bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white border-amber-400/40 shadow-sm'
                        : action.badge === 'Match Buyer'
                        ? 'bg-teal-950/80 hover:bg-teal-900 border-teal-500/40 text-teal-200'
                        : action.badge === 'Objeción'
                        ? 'bg-rose-950/80 hover:bg-rose-900 border-rose-500/40 text-rose-200'
                        : action.badge === 'Wizard'
                        ? 'bg-amber-950/80 hover:bg-amber-900 border-amber-500/40 text-amber-200'
                        : action.badge === 'Vapi Call'
                        ? 'bg-emerald-950/80 hover:bg-emerald-900 border-emerald-500/40 text-emerald-200'
                        : action.badge === 'MAO Calc'
                        ? 'bg-purple-950/80 hover:bg-purple-900 border-purple-500/40 text-purple-200'
                        : action.badge === 'Contrato'
                        ? 'bg-indigo-950/80 hover:bg-indigo-900 border-indigo-500/40 text-indigo-200'
                        : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    <span className="truncate">{action.label}</span>
                    {action.badge && (
                      <span className="text-[9px] px-1 py-0.2 rounded bg-black/40 text-cyan-300 font-mono font-bold shrink-0">
                        {action.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    msg.role === 'assistant'
                      ? 'bg-gradient-to-br from-cyan-600 to-indigo-600 shadow-md shadow-cyan-600/30'
                      : 'bg-slate-700'
                  }`}
                >
                  {msg.role === 'assistant' ? (
                    <Bot className="w-3.5 h-3.5 text-white" />
                  ) : (
                    <User className="w-3.5 h-3.5 text-slate-300" />
                  )}
                </div>

                {/* Bubble */}
                <div
                  className={`max-w-[90%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed space-y-1 relative group ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-tr-sm shadow-md'
                      : 'bg-slate-900/90 text-slate-200 rounded-tl-sm border border-slate-800 shadow-lg'
                  }`}
                >
                  {/* Speaker audio button on assistant messages */}
                  {msg.role === 'assistant' && (
                    <button
                      onClick={() => speakText(msg.content, msg.id)}
                      className={`absolute top-2 right-2 p-1 rounded-md transition ${
                        speakingMessageId === msg.id
                          ? 'bg-cyan-500 text-slate-950 animate-pulse'
                          : 'text-slate-500 hover:text-cyan-300 opacity-60 hover:opacity-100'
                      }`}
                      title={speakingMessageId === msg.id ? 'Detener lectura' : 'Escuchar respuesta en voz alta'}
                    >
                      {speakingMessageId === msg.id ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                    </button>
                  )}

                  {msg.role === 'assistant' ? renderContent(msg.content) : <span>{msg.content}</span>}

                  {/* ── ACTION CARD: BUYER MATCH ── */}
                  {msg.actionTaken === 'match_buyer' && msg.actionData && (
                    <div className="mt-2.5 p-2.5 bg-slate-950/90 border border-teal-500/40 rounded-xl space-y-2">
                      <div className="flex items-center justify-between text-teal-400 font-bold text-[11px]">
                        <span className="flex items-center gap-1.5">
                          <Target className="w-3.5 h-3.5 text-teal-400" />
                          Comprador Ideal: {msg.actionData.topBuyer.name}
                        </span>
                        <span className="bg-teal-900/60 px-1.5 py-0.5 rounded text-[10px] text-teal-200 font-mono font-bold">
                          {msg.actionData.topBuyer.matchScore} Match
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-300 bg-slate-900/60 p-2 rounded-lg">
                        <strong>Buy Box:</strong> {msg.actionData.topBuyer.buyBox} | <strong>Tel:</strong> {msg.actionData.topBuyer.phone}
                      </div>
                      <div className="flex gap-1.5 pt-1">
                        <button
                          onClick={() => copyToClipboard(msg.actionData.topBuyer.vipPitch, `pitch-${msg.id}`)}
                          className="px-2 py-1 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 transition"
                        >
                          {copiedKey === `pitch-${msg.id}` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          {copiedKey === `pitch-${msg.id}` ? '¡Mensaje Copiado!' : 'Copiar Pitch al Comprador'}
                        </button>
                        <button
                          onClick={() => onSelectTab?.('cash_buyers')}
                          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-[10px] font-bold flex items-center gap-1 transition"
                        >
                          <ExternalLink className="w-3 h-3" />
                          Ver en Directorio
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ── ACTION CARD: OBJECTION BUSTER ── */}
                  {msg.actionTaken === 'objection_buster' && msg.actionData && (
                    <div className="mt-2.5 p-2.5 bg-slate-950/90 border border-rose-500/40 rounded-xl space-y-2">
                      <div className="flex items-center justify-between text-rose-400 font-bold text-[11px]">
                        <span className="flex items-center gap-1.5">
                          <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                          Battle-Card de Objeción
                        </span>
                        <span className="bg-rose-900/60 px-1.5 py-0.5 rounded text-[10px] text-rose-200">
                          Psicología de Cierre
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-300 bg-slate-900/60 p-2 rounded-lg italic">
                        "{msg.actionData.rebuttalScript}"
                      </div>
                      <button
                        onClick={() => copyToClipboard(msg.actionData.rebuttalScript, `rebuttal-${msg.id}`)}
                        className="px-2.5 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 transition"
                      >
                        {copiedKey === `rebuttal-${msg.id}` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        {copiedKey === `rebuttal-${msg.id}` ? '¡Guion Copiado!' : 'Copiar Respuesta al Vendedor'}
                      </button>
                    </div>
                  )}

                  {/* ── ACTION CARD: DEAL WIZARD ── */}
                  {msg.actionTaken === 'deal_wizard' && msg.actionData && (
                    <div className="mt-2.5 p-2.5 bg-slate-950/90 border border-amber-500/40 rounded-xl space-y-2">
                      <div className="flex items-center justify-between text-amber-400 font-bold text-[11px]">
                        <span className="flex items-center gap-1.5">
                          <Wand2 className="w-3.5 h-3.5 text-amber-400" />
                          Deal Wizard: Ciclo de 6 Fases Completado
                        </span>
                        <span className="bg-amber-900/60 px-1.5 py-0.5 rounded text-[10px] text-amber-200 font-bold">
                          {msg.actionData.step6_Payout.netProfitCheck}
                        </span>
                      </div>
                      <div className="text-[10px] grid grid-cols-2 gap-1.5 bg-slate-900/70 p-2 rounded-lg text-slate-300">
                        <div>🏠 <strong>Propiedad:</strong> {msg.actionData.step1_Lead.property}</div>
                        <div>📞 <strong>Teléfono:</strong> {msg.actionData.step2_SkipTrace.phone}</div>
                        <div>💰 <strong>Oferta MAO:</strong> ${msg.actionData.step3_Numbers.purchasePrice?.toLocaleString()}</div>
                        <div>👥 <strong>Buyer:</strong> {msg.actionData.step4_CashBuyer.buyer}</div>
                      </div>
                      <div className="flex gap-1.5 pt-1">
                        <a
                          href={msg.actionData.step5_Contract.eSignUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2 py-1 bg-amber-600 hover:bg-amber-500 text-slate-950 rounded-lg text-[10px] font-bold flex items-center gap-1 transition"
                        >
                          <ExternalLink className="w-3 h-3" />
                          Abrir Contrato E-Sign
                        </a>
                        <button
                          onClick={() => onSelectTab?.('institutional_suite')}
                          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-[10px] font-bold flex items-center gap-1 transition"
                        >
                          Ver en Suite Pro
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ── ACTION CARD: SKIP TRACE ── */}
                  {msg.actionTaken === 'skip_trace' && msg.actionData && (
                    <div className="mt-2.5 p-2.5 bg-slate-950/90 border border-cyan-500/40 rounded-xl space-y-2">
                      <div className="flex items-center justify-between text-cyan-400 font-bold text-[11px]">
                        <span className="flex items-center gap-1.5">
                          <Search className="w-3.5 h-3.5 text-cyan-400" />
                          Skip-Trace: {msg.actionData.ownerName}
                        </span>
                        <span className="bg-cyan-900/60 px-1.5 py-0.5 rounded text-[10px] text-cyan-200">
                          {msg.actionData.verifiedPhones[0]}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        <a
                          href={msg.actionData.truePeopleSearchUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2 py-1 bg-cyan-950 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-900 rounded-lg text-[10px] font-bold flex items-center gap-1"
                        >
                          TruePeopleSearch ↗
                        </a>
                        <a
                          href={msg.actionData.fastPeopleSearchUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2 py-1 bg-slate-900 border border-slate-700 text-slate-300 hover:bg-slate-800 rounded-lg text-[10px] font-bold flex items-center gap-1"
                        >
                          FastPeopleSearch ↗
                        </a>
                        <a
                          href={msg.actionData.legacyObituaryUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2 py-1 bg-purple-950 border border-purple-500/40 text-purple-300 hover:bg-purple-900 rounded-lg text-[10px] font-bold flex items-center gap-1"
                        >
                          Obituarios Legacy ↗
                        </a>
                      </div>
                    </div>
                  )}

                  {/* ── ACTION CARD: CURATIVE TITLE REDUCTION ── */}
                  {msg.actionTaken === 'curative_title_reduction' && msg.actionData && (
                    <div className="mt-2.5 p-2.5 bg-slate-950/90 border border-emerald-500/40 rounded-xl space-y-2">
                      <div className="flex items-center justify-between text-emerald-400 font-bold text-[11px]">
                        <span className="flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                          Petición de Reducción de Multas
                        </span>
                        <span className="bg-emerald-900/60 px-1.5 py-0.5 rounded text-[10px] text-emerald-200 font-bold">
                          Ahorro {msg.actionData.savingsRate}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-300">
                        De <strong>${msg.actionData.originalLienAmount?.toLocaleString()}</strong> a solo <strong>${msg.actionData.settlementOffer?.toLocaleString()}</strong> en el cierre.
                      </div>
                      <button
                        onClick={() => copyToClipboard(msg.actionData.reductionLetterText, `letter-${msg.id}`)}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 transition"
                      >
                        {copiedKey === `letter-${msg.id}` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        {copiedKey === `letter-${msg.id}` ? '¡Carta Copiada!' : 'Copiar Carta para el Magistrado'}
                      </button>
                    </div>
                  )}

                  {/* ── ACTION CARD: PREPARE VOICE CALL ── */}
                  {msg.actionTaken === 'prepare_voice_call' && msg.actionData && (
                    <div className="mt-2.5 p-2.5 bg-slate-950/90 border border-emerald-500/40 rounded-xl space-y-2">
                      <div className="flex items-center justify-between text-emerald-400 font-bold text-[11px]">
                        <span className="flex items-center gap-1.5">
                          <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                          Llamada Calibrada Lista (Vapi / Twilio)
                        </span>
                        <span className="bg-emerald-900/60 px-1.5 py-0.5 rounded text-[10px] text-emerald-300 font-mono">
                          {msg.actionData.targetPhone}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-300">
                        <strong>Vendedor:</strong> {msg.actionData.ownerName} | <strong>Oferta:</strong> ${Number(msg.actionData.maoOffer).toLocaleString()}
                      </div>
                      <div className="flex gap-1.5 pt-1">
                        <button
                          onClick={() => copyToClipboard(JSON.stringify(msg.actionData.vapiPayload, null, 2), `vapi-${msg.id}`)}
                          className="px-2 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 transition"
                        >
                          {copiedKey === `vapi-${msg.id}` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          {copiedKey === `vapi-${msg.id}` ? '¡Payload Copiado!' : 'Copiar Payload Vapi'}
                        </button>
                        <button
                          onClick={() => onSelectTab?.('seller_pipeline')}
                          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-[10px] font-bold flex items-center gap-1 transition"
                        >
                          <ExternalLink className="w-3 h-3" />
                          Abrir Telefonía IA
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ── ACTION CARD: CALCULATE MAO ── */}
                  {msg.actionTaken === 'calculate_mao' && msg.actionData && (
                    <div className="mt-2.5 p-2.5 bg-slate-950/90 border border-purple-500/40 rounded-xl space-y-2">
                      <div className="flex items-center justify-between text-purple-400 font-bold text-[11px]">
                        <span className="flex items-center gap-1.5">
                          <Calculator className="w-3.5 h-3.5 text-purple-400" />
                          Resultado de la Fórmula MAO 70%
                        </span>
                        <span className="bg-purple-900/60 px-1.5 py-0.5 rounded text-[10px] text-purple-300 font-mono">
                          Fee: ${msg.actionData.assignmentFee?.toLocaleString()}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5 text-[11px] bg-slate-900/60 p-2 rounded-lg">
                        <div>ARV: <strong className="text-white">${msg.actionData.arv?.toLocaleString()}</strong></div>
                        <div>Reparaciones: <strong className="text-amber-400">-${msg.actionData.repairs?.toLocaleString()}</strong></div>
                        <div>MAO Objetivo: <strong className="text-emerald-400">${msg.actionData.maoTarget?.toLocaleString()}</strong></div>
                        <div>Anclaje Inverso: <strong className="text-cyan-400">${msg.actionData.reverseAnchorOffer?.toLocaleString()}</strong></div>
                      </div>
                      <button
                        onClick={() => sendMessage(`Genera el contrato PSA para la oferta acordada de $${msg.actionData.maoTarget}`)}
                        className="w-full py-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-lg text-[10px] font-bold flex items-center justify-center gap-1.5 transition"
                      >
                        <FileText className="w-3 h-3" />
                        Redactar Contrato PSA con esta Oferta ($${msg.actionData.maoTarget?.toLocaleString()})
                      </button>
                    </div>
                  )}

                  {/* ── ACTION CARD: GENERATE CONTRACT ── */}
                  {msg.actionTaken === 'generate_contract' && msg.actionData && (
                    <div className="mt-2.5 p-2.5 bg-slate-950/90 border border-indigo-500/40 rounded-xl space-y-2">
                      <div className="flex items-center justify-between text-indigo-400 font-bold text-[11px]">
                        <span className="flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-indigo-400" />
                          Contrato Listo: {msg.actionData.type}
                        </span>
                        <span className="bg-indigo-900/60 px-1.5 py-0.5 rounded text-[10px] text-indigo-200">
                          AI Automated Services LLC
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-300">
                        {msg.actionData.propertyAddress || msg.actionData.property} — ${(msg.actionData.purchasePrice || msg.actionData.originalPrice)?.toLocaleString()} USD
                      </div>
                      <div className="flex gap-1.5 pt-1">
                        <button
                          onClick={() => copyToClipboard(msg.actionData.contractSnippet, `contract-${msg.id}`)}
                          className="px-2 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 transition"
                        >
                          {copiedKey === `contract-${msg.id}` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          {copiedKey === `contract-${msg.id}` ? '¡Contrato Copiado!' : 'Copiar Texto Legal'}
                        </button>
                        <a
                          href={msg.actionData.eSignUrl || '/sign/lead-canton-realtor'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 transition"
                        >
                          <ExternalLink className="w-3 h-3" />
                          Abrir Portal E-Sign
                        </a>
                      </div>
                    </div>
                  )}

                  {msg.actionExecuted && !['match_buyer', 'objection_buster', 'deal_wizard', 'skip_trace', 'curative_title_reduction', 'prepare_voice_call', 'calculate_mao', 'generate_contract'].includes(msg.actionTaken || '') && (
                    <div className="flex items-center gap-1 mt-2 pt-1.5 border-t border-slate-800 text-cyan-400">
                      <Zap className="w-3 h-3 text-cyan-400 animate-pulse" />
                      <span className="text-[10px] font-bold">Acción ejecutada con éxito en la plataforma</span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex gap-2.5">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-600 to-indigo-600 flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  <span className="text-[11px] text-slate-400 ml-1 font-mono">Consultando datos y ejecutando acción…</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input & Voice Bar */}
          <div className="border-t border-slate-800 bg-slate-900/60 px-3 py-2.5 flex items-end gap-2 shrink-0">
            {/* Microphone button */}
            <button
              onClick={toggleListening}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition shrink-0 border ${
                isListening
                  ? 'bg-red-600 border-red-400 text-white animate-pulse'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50'
              }`}
              title={isListening ? 'Detener micrófono' : 'Hablar por micrófono (Dictado por voz)'}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isListening ? 'Escuchando tu voz...' : 'Pregunta o comanda (ej: ¿A quién le vendo este lote en Palm Bay?)...'}
              rows={1}
              className={`flex-1 bg-slate-950 border rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 resize-none focus:outline-none transition max-h-24 min-h-[38px] ${
                isListening ? 'border-red-500/70 shadow-sm shadow-red-500/30' : 'border-slate-700/70 focus:border-cyan-500'
              }`}
              style={{ height: 'auto' }}
              onInput={(e) => {
                const t = e.target as HTMLTextAreaElement;
                t.style.height = 'auto';
                t.style.height = `${Math.min(t.scrollHeight, 96)}px`;
              }}
            />

            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || isLoading}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-600 to-indigo-600 flex items-center justify-center hover:from-cyan-500 hover:to-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed transition shrink-0 shadow-md shadow-cyan-600/30"
              title="Enviar comando a la IA"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 text-white animate-spin" />
              ) : (
                <Send className="w-4 h-4 text-white" />
              )}
            </button>
          </div>
        </div>
      )}

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </>
  );
}
