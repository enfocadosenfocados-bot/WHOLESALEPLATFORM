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
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  actionExecuted?: boolean;
}

export type DashboardTabKey =
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
  { key: 'how_to_close_deals', label: '📜 Cómo se Cierran Deals & Docs', shortLabel: 'Cerrar Deals', icon: '📜', color: 'from-emerald-600 via-indigo-600 to-purple-600' },
  { key: 'saas_replacement', label: '🔥 Motor Leads (Reemplazo SaaS $0)', shortLabel: 'Motor Leads', icon: '🔥', color: 'from-emerald-600 to-cyan-600' },
  { key: 'daily_automation', label: '🤖 Auto-Pilot Diario', shortLabel: 'Auto-Pilot', icon: '🤖', color: 'from-emerald-600 to-cyan-600' },
  { key: 'institutional_suite', label: '⚡ Suite Institucional (E-Sign/Deals)', shortLabel: 'Suite Pro', icon: '⚡', color: 'from-cyan-600 to-indigo-600' },
  { key: 'xleads_pumpstacker', label: '⚡ PumpStacker & XLeads', shortLabel: 'PumpStacker', icon: '🔥', color: 'from-red-600 to-amber-600' },
  { key: 'seller_pipeline', label: '📞 2. Vendedores (SMS/Llamada IA)', shortLabel: 'Vendedores', icon: '📞', color: 'from-sky-600 to-blue-600' },
  { key: 'cash_buyers', label: '👥 3. Cash Buyers (33)', shortLabel: 'Cash Buyers', icon: '👥', color: 'from-emerald-600 to-teal-600' },
  { key: 'ig_creators', label: '📸 4. Creadores IG (8)', shortLabel: 'Creadores IG', icon: '📸', color: 'from-pink-600 to-rose-600' },
  { key: 'skills', label: '📚 1. Árbol de Skills', shortLabel: 'Skills', icon: '📚', color: 'from-indigo-600 to-purple-600' },
  { key: 'executors', label: '🛠️ 5. Calculadoras & FOIA', shortLabel: 'Calculadoras', icon: '🛠️', color: 'from-purple-600 to-pink-600' },
  { key: 'history', label: '📜 6. Historial Reels & OCR', shortLabel: 'Historial', icon: '📜', color: 'from-amber-600 to-orange-600' },
];

const DEAL_PACK_ACTIONS = [
  { label: '⚡ Master Deal Pack (TODOS los 35 Buyers en Excel+Word)', prompt: 'Genera el Master Deal Pack para TODOS los cash buyers que tengo en el dashboard en Excel y Word con números de vendedores, scripts de SMS/Email, scripts del bot closer con ofertas calculadas y contratos listos', badge: 'MASTER' },
  { label: '🎯 Deal Pack Richard Taylor (Detroit/Fourplex)', prompt: 'Para Richard Taylor (@richardgrandintaylor) encuéntrame las propiedades que necesita en Excel y Word con números de vendedores, scripts de SMS/Email, script del bot closer con la oferta calculada y contratos listos', badge: 'Section 8' },
  { label: '🌴 Deal Pack Zach Ginn (Florida/Clarksville)', prompt: 'Para Zach Ginn (@flipwithzach) encuéntrame las propiedades de Fix & Flip en Florida y Clarksville TN con números de vendedores, scripts de SMS/Email, script del bot closer y contratos listos', badge: 'Fix & Flip' },
  { label: '🌿 Deal Pack Carson (Land Flipping Lotes)', prompt: 'Para Carson (@carsonbuysland) encuéntrame los lotes baldíos de constructores en Palm Bay y Lehigh Acres FL con números de vendedores, scripts y contratos listos', badge: 'Terrenos' },
  { label: '🔑 Deal Pack Samuel G (Hipotecas 2.8% Assumables)', prompt: 'Para Samuel G (@ownwithsam) encuéntrame las propiedades con hipotecas asumibles al 2.8% en Tampa y Texas con números de vendedores, scripts y contratos listos', badge: 'SubTo' },
  { label: '💰 Deal Pack Jerry Norton ($10k Finder Fee)', prompt: 'Para Jerry Norton (@flippingmastery) encuéntrame las propiedades que cumplen su buy box con números de vendedores, scripts y contratos listos para cobrar $10k', badge: 'Finder Fee' },
  { label: '🏢 Deal Pack Jamil Damji (KeyGlee Dispo)', prompt: 'Para Jamil Damji de KeyGlee encuéntrame propiedades con alto equity en Phoenix y Dallas con números de vendedores y contratos listos', badge: 'KeyGlee' },
  { label: '🤖 Ejecutar Auto-Pilot Diario Ahora', prompt: 'Ejecuta el auto-pilot ahora y busca propiedades para mis buyers', badge: 'Auto' },
  { label: '📊 Ver Estadísticas del Pipeline', prompt: '¿Cuántos leads, buyers y deals tengo en la plataforma?', badge: 'Stats' },
  { label: '🔍 Scrape Buyers en Redes', prompt: 'Busca nuevos cash buyers en Facebook y Reddit ahora', badge: 'Scrape' },
  { label: '🛰️ SkyDrive Vision en Propiedad', prompt: 'Analiza con SkyDrive Vision la propiedad en 4821 N Habana Ave Tampa FL', badge: 'Vision' },
];

function renderContent(text: string) {
  const lines = text.split('\n');
  return lines.map((line, i) => {
    // Markdown links: [text](url)
    let processed = line.replace(
      /\[(.*?)\]\((.*?)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-cyan-400 font-bold underline hover:text-cyan-300 inline-flex items-center gap-0.5">$1 ↗</a>'
    );
    // Bold
    processed = processed.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    // Code blocks / inline code
    processed = processed.replace(/`([^`]+)`/g, '<code class="bg-slate-900 px-1 py-0.5 rounded text-amber-300 font-mono text-[11px]">$1</code>');

    // Bullet
    if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
      return (
        <div key={i} className="flex gap-1.5 items-start">
          <span className="text-cyan-400 shrink-0 mt-0.5">▸</span>
          <span dangerouslySetInnerHTML={{ __html: processed.replace(/^[•\-]\s*/, '') }} />
        </div>
      );
    }
    // Blockquote
    if (line.trim().startsWith('>')) {
      return (
        <div key={i} className="border-l-2 border-cyan-500/50 pl-2.5 py-1 my-1 bg-slate-900/60 rounded-r text-slate-300 italic" dangerouslySetInnerHTML={{ __html: processed.replace(/^>\s*/, '') }} />
      );
    }
    // Heading-like
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
  const [activePillSection, setActivePillSection] = useState<'tabs' | 'deals'>('tabs');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: '¡Hola! Soy tu Asistente IA de WholesalePlatform 🤖\n\nTengo acceso completo a tu plataforma — puedo ejecutar el auto-pilot, generar deal packs para tus 35 buyers en Excel/Word con teléfonos de vendedores, mostrarte estadísticas y cambiar de pestaña.\n\n¿Qué quieres hacer?',
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

      const assistantMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        role: 'assistant',
        content: data.reply || '❌ Error al procesar la respuesta.',
        timestamp: new Date(),
        actionExecuted: data.actionExecuted,
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

  const chatWidth = isExpanded ? 'w-[740px]' : 'w-[420px]';
  const chatHeight = isExpanded ? 'h-[85vh]' : 'h-[620px]';
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
        title="Asistente IA WholesalePlatform"
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
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-950" />
              </div>
              <div>
                <div className="text-xs font-black text-white flex items-center gap-1.5">
                  WholesalePlatform AI
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                </div>
                <div className="text-[10px] text-emerald-400 font-medium">● En línea — Control de Pestañas & Deals</div>
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

          {/* Sub-Header: Mode Selector Tabs (Dashboard Tabs vs Deal Packs) */}
          <div className="bg-slate-900/90 border-b border-slate-800/80 px-3 py-1.5 flex items-center justify-between gap-2 shrink-0 text-[11px]">
            <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded-lg border border-slate-800">
              <button
                onClick={() => setActivePillSection('tabs')}
                className={`px-2.5 py-1 rounded-md font-bold transition flex items-center gap-1.5 ${
                  activePillSection === 'tabs'
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Layers className="w-3 h-3" />
                Pestañas del Dashboard ({DASHBOARD_TABS.length})
              </button>
              <button
                onClick={() => setActivePillSection('deals')}
                className={`px-2.5 py-1 rounded-md font-bold transition flex items-center gap-1.5 ${
                  activePillSection === 'deals'
                    ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Zap className="w-3 h-3 text-cyan-300" />
                Deal Packs & Acciones ({DEAL_PACK_ACTIONS.length})
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

          {/* SECTION 1: DASHBOARD TABS (Live Navigator to all 9 tabs) */}
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

          {/* SECTION 2: DEAL PACKS & AI ACTIONS */}
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

          {/* Messages */}
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
                  className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed space-y-0.5 ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-tr-sm shadow-md'
                      : 'bg-slate-900/90 text-slate-200 rounded-tl-sm border border-slate-800 shadow-lg'
                  }`}
                >
                  {msg.role === 'assistant' ? renderContent(msg.content) : <span>{msg.content}</span>}
                  {msg.actionExecuted && (
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
                  <span className="text-[11px] text-slate-400 ml-1 font-mono">Procesando y generando documentos…</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-slate-800 bg-slate-900/60 px-3 py-2.5 flex items-end gap-2 shrink-0">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe lo que quieras (ej: Deal Pack para todos los buyers en Excel)..."
              rows={1}
              className="flex-1 bg-slate-950 border border-slate-700/70 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 resize-none focus:outline-none focus:border-cyan-500 transition max-h-24 min-h-[38px]"
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
              title="Enviar mensaje"
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
