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
  Minimize2,
  Maximize2,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  actionExecuted?: boolean;
}

const QUICK_ACTIONS = [
  { label: '🤖 Ejecutar Auto-Pilot', prompt: 'Ejecuta el auto-pilot ahora y busca propiedades para mis buyers' },
  { label: '📊 Ver Estadísticas', prompt: '¿Cuántos leads, buyers y deals tengo en la plataforma?' },
  { label: '👥 Ver mis Buyers', prompt: 'Muéstrame mis top cash buyers y qué están buscando' },
  { label: '🏠 Ver mis Leads', prompt: 'Muéstrame los seller leads más recientes de mi pipeline' },
  { label: '🔍 Buscar Buyers', prompt: 'Busca nuevos cash buyers en Facebook y Reddit ahora' },
  { label: '🛰️ Analizar Propiedad', prompt: 'Analiza con SkyDrive Vision la propiedad en 4821 N Habana Ave Tampa FL' },
];

// Simple markdown-ish renderer for chat
function renderContent(text: string) {
  const lines = text.split('\n');
  return lines.map((line, i) => {
    // Bold
    const boldified = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    // Bullet
    if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
      return (
        <div key={i} className="flex gap-1.5 items-start">
          <span className="text-cyan-400 shrink-0 mt-0.5">▸</span>
          <span dangerouslySetInnerHTML={{ __html: boldified.replace(/^[•\-]\s*/, '') }} />
        </div>
      );
    }
    // Heading-like
    if (line.startsWith('##') || line.startsWith('**') && line.endsWith('**')) {
      return (
        <div key={i} className="font-bold text-white mt-1" dangerouslySetInnerHTML={{ __html: boldified }} />
      );
    }
    if (line.trim() === '') return <div key={i} className="h-1" />;
    return <div key={i} dangerouslySetInnerHTML={{ __html: boldified }} />;
  });
}

interface PlatformChatProps {
  apiKey?: string;
}

export default function PlatformChat({ apiKey = '' }: PlatformChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: '¡Hola! Soy tu Asistente IA de WholesalePlatform 🤖\n\nTengo acceso completo a tu plataforma — puedo ejecutar el auto-pilot, mostrarte estadísticas, buscar buyers, analizar propiedades y mucho más.\n\n¿Qué quieres hacer?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

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

  const chatWidth = isExpanded ? 'w-[680px]' : 'w-[380px]';
  const chatHeight = isExpanded ? 'h-[82vh]' : 'h-[560px]';

  return (
    <>
      {/* ── Floating Toggle Button ── */}
      <button
        onClick={() => { setIsOpen((v) => !v); setHasNewMessage(false); }}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${
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
          className={`fixed bottom-24 right-6 z-50 ${chatWidth} ${chatHeight} bg-slate-950 border border-slate-700/80 rounded-2xl shadow-2xl shadow-black/60 flex flex-col overflow-hidden transition-all duration-200`}
          style={{ backdropFilter: 'blur(16px)' }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 to-indigo-950 border-b border-slate-800 px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center">
                  <Bot className="w-4.5 h-4.5 text-white" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-950" />
              </div>
              <div>
                <div className="text-xs font-black text-white flex items-center gap-1">
                  WholesalePlatform AI
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                </div>
                <div className="text-[10px] text-emerald-400">● En línea — Acceso completo a la plataforma</div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsExpanded((v) => !v)}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-500 hover:text-slate-300 transition"
                title={isExpanded ? 'Reducir' : 'Expandir'}
              >
                {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-500 hover:text-slate-300 transition"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-1.5 px-3 py-2 overflow-x-auto shrink-0 border-b border-slate-900 no-scrollbar">
            {QUICK_ACTIONS.map((qa) => (
              <button
                key={qa.label}
                onClick={() => sendMessage(qa.prompt)}
                disabled={isLoading}
                className="shrink-0 text-[10px] font-semibold px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700/60 text-slate-300 hover:text-white transition whitespace-nowrap disabled:opacity-50"
              >
                {qa.label}
              </button>
            ))}
          </div>

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
                      ? 'bg-gradient-to-br from-cyan-600 to-indigo-600'
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
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed space-y-0.5 ${
                    msg.role === 'user'
                      ? 'bg-indigo-600 text-white rounded-tr-sm'
                      : 'bg-slate-800/90 text-slate-200 rounded-tl-sm border border-slate-700/50'
                  }`}
                >
                  {msg.role === 'assistant' ? renderContent(msg.content) : <span>{msg.content}</span>}
                  {msg.actionExecuted && (
                    <div className="flex items-center gap-1 mt-1.5 pt-1.5 border-t border-slate-700/50">
                      <Zap className="w-3 h-3 text-cyan-400" />
                      <span className="text-[10px] text-cyan-400 font-semibold">Acción ejecutada en la plataforma</span>
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
                <div className="bg-slate-800/90 border border-slate-700/50 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-slate-800 px-3 py-3 flex items-end gap-2.5 shrink-0">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe aquí... (Enter para enviar)"
              rows={1}
              className="flex-1 bg-slate-800/80 border border-slate-700/60 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 resize-none focus:outline-none focus:border-cyan-500/50 transition max-h-24 min-h-[36px]"
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
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-600 to-indigo-600 flex items-center justify-center hover:from-cyan-500 hover:to-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed transition shrink-0"
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
