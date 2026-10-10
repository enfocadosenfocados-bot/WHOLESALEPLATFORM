'use client';

import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Send,
  Sparkles,
  Settings,
  Phone,
  ShieldCheck,
  Check,
  Copy,
  Clock,
  User,
  Bot,
  AlertCircle,
  ExternalLink,
  Save,
  KeyRound,
  X,
} from 'lucide-react';

interface SMSMessage {
  id: string;
  sender: 'user' | 'seller';
  text: string;
  timestamp: string;
}

interface SMSTread {
  id: string;
  sellerName: string;
  phone: string;
  property: string;
  status: 'active' | 'negotiating' | 'ready_to_sign';
  unread: boolean;
  messages: SMSMessage[];
}

const INITIAL_THREADS: SMSTread[] = [
  {
    id: 'thread-marcus',
    sellerName: 'Marcus Vance',
    phone: '(313) 555-8291',
    property: '18418 Joann St, Detroit, MI',
    status: 'negotiating',
    unread: true,
    messages: [
      {
        id: 'm1',
        sender: 'user',
        text: 'Hola Marcus, habla Alex de AI Automated Services LLC. Vi tu casa en 18418 Joann St. Compramos al contado en 10 días absorbiendo todos los costos de título. ¿Estarías abierto a una oferta neta en mano de $62,000?',
        timestamp: '10:14 AM',
      },
      {
        id: 'm2',
        sender: 'seller',
        text: 'Hola Alex. La casa necesita unos $20k en reparaciones en el techo y plomería. Si cerramos en efectivo y tú pagas los gastos de cierre de título, ¿podrías llegar a $65,000 netos?',
        timestamp: '10:22 AM',
      },
    ],
  },
  {
    id: 'thread-arthur',
    sellerName: 'Arthur Pendleton',
    phone: '(321) 555-7491',
    property: '842 Eldron Blvd SE, Palm Bay, FL',
    status: 'ready_to_sign',
    unread: false,
    messages: [
      {
        id: 'm3',
        sender: 'user',
        text: 'Hola Arthur! Te escribo sobre el lote baldío en 842 Eldron Blvd en Palm Bay. Cerramos al contado sin comisiones. ¿Venderías en $14,000 netos?',
        timestamp: 'Ayer 3:45 PM',
      },
      {
        id: 'm4',
        sender: 'seller',
        text: 'Sí, ya no quiero pagar más impuestos por ese terreno. Mándame el contrato por aquí para revisarlo y firmarlo con el celular.',
        timestamp: 'Ayer 4:10 PM',
      },
    ],
  },
];

export default function TwoWaySMSHub() {
  const [threads, setThreads] = useState<SMSTread[]>(INITIAL_THREADS);
  const [activeThreadId, setActiveThreadId] = useState<string>('thread-marcus');
  const [inputText, setInputText] = useState('');
  const [showTwilioConfig, setShowTwilioConfig] = useState(false);

  // Twilio credentials state
  const [twilioSid, setTwilioSid] = useState('');
  const [twilioToken, setTwilioToken] = useState('');
  const [twilioPhone, setTwilioPhone] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTwilioSid(localStorage.getItem('TWILIO_ACCOUNT_SID') || '');
      setTwilioToken(localStorage.getItem('TWILIO_AUTH_TOKEN') || '');
      setTwilioPhone(localStorage.getItem('TWILIO_PHONE_NUMBER') || '');
    }
  }, []);

  const saveTwilioCredentials = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('TWILIO_ACCOUNT_SID', twilioSid);
      localStorage.setItem('TWILIO_AUTH_TOKEN', twilioToken);
      localStorage.setItem('TWILIO_PHONE_NUMBER', twilioPhone);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    }
  };

  const activeThread = threads.find((t) => t.id === activeThreadId) || threads[0];

  const handleSendMessage = (customText?: string) => {
    const textToSend = customText || inputText;
    if (!textToSend.trim()) return;

    const newMsg: SMSMessage = {
      id: `m-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setThreads((prev) =>
      prev.map((t) =>
        t.id === activeThread.id
          ? { ...t, messages: [...t.messages, newMsg], unread: false }
          : t
      )
    );
    setInputText('');
  };

  // 3 Smart AI Replies based on active conversation
  const smartReplies = [
    {
      label: '🤝 Aceptar & Ajustar a $64k (Meet in the Middle)',
      text: `Entiendo perfectamente, Marcus. Si cerramos el próximo viernes en una compañía de título local y nosotros absorbemos el 100% de los gastos, puedo autorizar $64,000 netos en mano como término final. Te envío el contrato de 1 página a tu celular ahora mismo. ¿Hacemos el trato?`,
    },
    {
      label: '✍️ Enviar Enlace de Contrato E-Sign',
      text: `Excelente acuerdo. Acabo de generar tu contrato formal de compra y venta bajo AI Automated Services LLC and/or assigns. Puedes firmarlo con tu dedo en tu celular en menos de 2 minutos aquí: http://localhost:3005/sign/lead-canton-realtor`,
    },
    {
      label: '📸 Solicitar Fotos de Techo & Daños',
      text: `Para validar el ajuste final de precio con nuestro comité de adquisiciones, ¿podrías enviarme 2 o 3 fotos del estado actual del techo y el calentador de agua por este mismo chat?`,
    },
  ];

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-4 shadow-xl">
      {/* Header with Twilio Setup Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
            Centro de SMS de 2 Vías & Respuestas Inteligentes IA
          </span>
          <h2 className="text-base font-black text-white mt-0.5">
            Bandeja de Entrada de Mensajería con Vendedores Motivados
          </h2>
        </div>

        <button
          onClick={() => setShowTwilioConfig(true)}
          className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition self-start sm:self-auto"
        >
          <Settings className="w-3.5 h-3.5 text-cyan-400" />
          <span>Configurar Twilio {twilioPhone ? `(${twilioPhone})` : '(Pendiente)'}</span>
        </button>
      </div>

      {/* Main SMS Interface (Threads Sidebar + Chat Window) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 min-h-[460px]">
        {/* Threads Sidebar (4 Cols) */}
        <div className="md:col-span-4 bg-slate-900/90 border border-slate-800 rounded-2xl p-2.5 flex flex-col space-y-1.5">
          <span className="text-[10px] text-slate-500 font-bold uppercase px-2 py-1">Conversaciones Activas</span>
          {threads.map((thread) => {
            const isSelected = thread.id === activeThread.id;
            const lastMsg = thread.messages[thread.messages.length - 1];
            return (
              <button
                key={thread.id}
                onClick={() => setActiveThreadId(thread.id)}
                className={`w-full text-left p-3 rounded-xl transition border flex flex-col space-y-1 ${
                  isSelected
                    ? 'bg-slate-950 border-cyan-500/50 shadow-md ring-1 ring-cyan-500/20'
                    : 'bg-slate-900 hover:bg-slate-800/80 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-white">{thread.sellerName}</span>
                  <span className="text-[10px] text-slate-500">{lastMsg?.timestamp}</span>
                </div>
                <div className="text-[11px] text-cyan-300 truncate font-medium">
                  {thread.property}
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  {lastMsg ? `${lastMsg.sender === 'user' ? 'Tú: ' : ''}${lastMsg.text}` : ''}
                </div>
              </button>
            );
          })}
        </div>

        {/* Chat Window & Smart Replies (8 Cols) */}
        <div className="md:col-span-8 bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between space-y-3">
          {/* Thread Header */}
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-black text-white">{activeThread.sellerName}</h3>
              <p className="text-[11px] text-slate-400">
                {activeThread.property} • Tel: <strong className="text-emerald-400">{activeThread.phone}</strong>
              </p>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-cyan-950 border border-cyan-500/40 text-cyan-300">
              SMS VÍA TWILIO
            </span>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto space-y-2.5 max-h-[300px] pr-1">
            {activeThread.messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white rounded-tr-none shadow-md'
                      : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none shadow-sm'
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[9px] text-slate-500 mt-0.5 px-1">{m.timestamp}</span>
              </div>
            ))}
          </div>

          {/* AI Smart Replies Bar */}
          <div className="space-y-1.5 pt-2 border-t border-slate-800">
            <span className="text-[10px] text-cyan-400 font-bold uppercase flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              Respuestas Inteligentes Sugeridas por la IA (1 Clic para Enviar):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
              {smartReplies.map((reply, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(reply.text)}
                  className="p-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 rounded-xl text-left text-[10px] text-slate-300 hover:text-white transition flex flex-col justify-between"
                >
                  <span className="font-bold text-cyan-300 truncate block">{reply.label}</span>
                  <span className="text-[9px] text-slate-500 line-clamp-1 mt-0.5">Enviar de inmediato</span>
                </button>
              ))}
            </div>
          </div>

          {/* Input Box */}
          <div className="flex gap-2 pt-1">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              placeholder="Escribe un SMS personalizado para el vendedor..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
            />
            <button
              onClick={() => handleSendMessage()}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-slate-950 rounded-xl text-xs font-black flex items-center gap-1.5 transition shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
              Enviar SMS
            </button>
          </div>
        </div>
      </div>

      {/* Twilio Settings Modal */}
      {showTwilioConfig && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-cyan-500/40 rounded-2xl max-w-lg w-full p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-black text-white">Configuración de Twilio (SMS & Voice)</h3>
              </div>
              <button
                onClick={() => setShowTwilioConfig(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Para enviar y recibir SMS reales y hacer que el bot de Vapi/Twilio marque automáticamente, ingresa las credenciales de tu cuenta de Twilio cuando la tengas lista:
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 font-bold block mb-1">Twilio Account SID (empieza con AC...):</label>
                <input
                  type="text"
                  value={twilioSid}
                  onChange={(e) => setTwilioSid(e.target.value)}
                  placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-slate-400 font-bold block mb-1">Twilio Auth Token (Clave Secreta):</label>
                <input
                  type="password"
                  value={twilioToken}
                  onChange={(e) => setTwilioToken(e.target.value)}
                  placeholder="••••••••••••••••••••••••••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-slate-400 font-bold block mb-1">Tu Número Telefónico de Twilio:</label>
                <input
                  type="text"
                  value={twilioPhone}
                  onChange={(e) => setTwilioPhone(e.target.value)}
                  placeholder="+13215550199"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <strong className="text-cyan-300 block">¿Cómo obtener estos datos?</strong>
              <p>1. Entra en <a href="https://console.twilio.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">console.twilio.com ↗</a> y copia tu <strong>Account SID</strong> y <strong>Auth Token</strong> del panel de bienvenida.</p>
              <p>2. Compra un número de teléfono local en Florida, Michigan u Ohio ($1.15/mes) con capacidad de <strong>Voice</strong> y <strong>SMS</strong>.</p>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setShowTwilioConfig(false)}
                className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-xs"
              >
                Cerrar
              </button>
              <button
                onClick={saveTwilioCredentials}
                className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 rounded-lg text-xs font-black flex items-center gap-1.5"
              >
                {savedSuccess ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
                {savedSuccess ? '¡Guardado!' : 'Guardar Credenciales'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
