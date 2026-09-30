'use client';

import React, { useState, useEffect } from 'react';
import {
  FileCheck2,
  ExternalLink,
  PhoneCall,
  Send,
  Globe,
  Radio,
  Copy,
  Check,
  Radar,
  Sparkles,
  ShieldCheck,
  Flame,
  MessageSquare,
  Bookmark,
  Share2,
  Layers,
  Settings,
} from 'lucide-react';
import { MotivatedSellerLead } from '@/types/skill';

interface AdvancedWholesaleSuiteProps {
  sellerLeads: MotivatedSellerLead[];
  onLeadsUpdated?: () => void;
}

export default function AdvancedWholesaleSuite({ sellerLeads }: AdvancedWholesaleSuiteProps) {
  const [activeSubTab, setActiveSubTab] = useState<
    'esign' | 'deal_landing' | 'telephony' | 'chrome_ext' | 'skydrive_vision' | 'webhooks'
  >('esign');
  const [copiedId, setCopiedId] = useState('');

  // 1. E-Sign State
  const [selectedLeadId, setSelectedLeadId] = useState<string>(sellerLeads[0]?.id || '');

  // 2. Telephony State
  const [callProvider, setCallProvider] = useState<'built_in' | 'vapi' | 'retell'>('built_in');
  const [callApiKey, setCallApiKey] = useState('');
  const [callPhone, setCallPhone] = useState(sellerLeads[0]?.phone || '(555) 000-0000');
  const [callStatusMsg, setCallStatusMsg] = useState('');
  const [callLoading, setCallLoading] = useState(false);
  const [callTranscript, setCallTranscript] = useState(
    `Agente: "Hola, llamo por la propiedad en ${sellerLeads[0]?.propertyAddress || 'Tampa'}. ¿Sigue disponible para una oferta en efectivo?"\nVendedor: "Sí, la casa necesita techo y algo de pintura, pero queremos venderla rápido antes de fin de mes."\nAgente: "¿Estarían dispuestos a aceptar una oferta neta en efectivo de $${(sellerLeads[0]?.recommendedMaoOffer || 170000).toLocaleString()} donde nosotros cubrimos los gastos de título?"\nVendedor: "Si es en efectivo y cerramos en 20 días, sí acepto."`
  );
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  // 3. SkyDrive Vision State
  const [visionAddress, setVisionAddress] = useState(sellerLeads[0]?.propertyAddress || '4821 N Habana Ave, Tampa, FL 33614');
  const [visionLoading, setVisionLoading] = useState(false);
  const [visionData, setVisionData] = useState<any>(null);

  // 4. Webhooks State
  const [discordUrl, setDiscordUrl] = useState('');
  const [telegramToken, setTelegramToken] = useState('');
  const [telegramChatId, setTelegramChatId] = useState('');
  const [ghlWebhook, setGhlWebhook] = useState('');
  const [webhookMsg, setWebhookMsg] = useState('');

  useEffect(() => {
    fetch('/api/webhooks')
      .then((r) => r.json())
      .then((d) => {
        if (d.webhooks) {
          setDiscordUrl(d.webhooks.discordWebhookUrl || '');
          setTelegramToken(d.webhooks.telegramBotToken || '');
          setTelegramChatId(d.webhooks.telegramChatId || '');
          setGhlWebhook(d.webhooks.goHighLevelWebhookUrl || '');
        }
      });
  }, []);

  const copyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(''), 2200);
  };

  const selectedLead = sellerLeads.find((l) => l.id === selectedLeadId) || sellerLeads[0];

  const handleTriggerCall = async () => {
    setCallLoading(true);
    setCallStatusMsg('Iniciando llamada...');
    try {
      const res = await fetch('/api/voice-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'trigger_telephony_call',
          leadId: selectedLead?.id,
          provider: callProvider,
          apiKey: callApiKey,
          phoneNumber: callPhone,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setCallStatusMsg(`✅ ${data.message || 'Llamada conectada'}`);
      } else {
        setCallStatusMsg(`❌ ${data.error || 'Error'}`);
      }
    } finally {
      setCallLoading(false);
    }
  };

  const handleAnalyzeTranscript = async () => {
    setCallLoading(true);
    try {
      const res = await fetch('/api/voice-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'analyze_call_transcript',
          leadId: selectedLead?.id,
          transcript: callTranscript,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setAnalysisResult(data.analysis);
      }
    } finally {
      setCallLoading(false);
    }
  };

  const handleRunVisionAnalysis = async () => {
    setVisionLoading(true);
    try {
      const res = await fetch('/api/skydrive-vision', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: visionAddress }),
      });
      const data = await res.json();
      if (res.ok) {
        setVisionData(data.data);
      }
    } finally {
      setVisionLoading(false);
    }
  };

  const handleSaveWebhooks = async () => {
    setWebhookMsg('Guardando webhooks...');
    const res = await fetch('/api/webhooks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'save_webhooks',
        webhooks: {
          discordWebhookUrl: discordUrl,
          telegramBotToken: telegramToken,
          telegramChatId: telegramChatId,
          goHighLevelWebhookUrl: ghlWebhook,
        },
      }),
    });
    if (res.ok) {
      setWebhookMsg('✅ Webhooks guardados con éxito');
      setTimeout(() => setWebhookMsg(''), 3000);
    }
  };

  const handleTestWebhook = async () => {
    setWebhookMsg('Enviando notificación de prueba...');
    const res = await fetch('/api/webhooks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'test_or_dispatch',
        eventName: '🔔 Notificación de Prueba — WholesalePlatform AI',
        payload: {
          message: '¡Conexión exitosa! Las alertas de contratos firmados y ofertas de compradores llegarán a este canal en tiempo real.',
        },
      }),
    });
    const data = await res.json();
    if (res.ok) {
      setWebhookMsg(`✅ Enviado: ${JSON.stringify(data.results)}`);
      setTimeout(() => setWebhookMsg(''), 5000);
    }
  };

  // 1-Click Bookmarklet code
  const bookmarkletCode = `javascript:(function(){var addr=document.querySelector('h1')?.innerText||document.title;var price=document.querySelector('[data-test-id="price"]')?.innerText||'';fetch('http://localhost:3005/api/seller-outreach',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'create_lead',lead:{propertyAddress:addr,ownerName:'Zillow Lead',leadSource:'Zillow FSBO',cityState:'FL',phone:'',email:'',askingOrAssessedPrice:parseInt(price.replace(/[^0-9]/g,''))||200000,recommendedMaoOffer:Math.round((parseInt(price.replace(/[^0-9]/g,''))||200000)*0.65),estimatedArv:Math.round((parseInt(price.replace(/[^0-9]/g,''))||200000)*1.15),taxOrMortgageArrears:0,status:'new'}})}).then(function(){alert('¡Propiedad enviada con éxito a tu Pipeline de WholesalePlatform!')}).catch(function(e){alert('Asegúrate de que WholesalePlatform esté corriendo en localhost:3005')});})();`;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-950/70 via-slate-900 to-emerald-950/50 border border-indigo-500/30 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold">
                SUITE INSTITUCIONAL NIVEL EMPRESARIAL
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                7 HERRAMIENTAS ACTIVAS
              </span>
            </div>
            <h2 className="text-xl font-black text-white mt-1">
              ⚡ Suite Avanzada: E-Sign, Deal Portals, Telefonía IA, Visión Satelital & Webhooks
            </h2>
            <p className="text-xs text-slate-300 mt-0.5 max-w-4xl">
              Convierte el dashboard en una operación 100% autónoma: envía contratos para firma con el dedo en celular (`/sign/[id]`), genera páginas públicas de tratos (`/deal/[id]`), dispara llamadas con IA, importa casas de Zillow en 1 clic y conecta con tu CRM en tiempo real.
            </p>
          </div>
        </div>

        {/* Sub Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mt-4">
          {[
            { id: 'esign', label: '1. Firma E-Sign (/sign)', icon: FileCheck2 },
            { id: 'deal_landing', label: '2. Deal Landing (/deal)', icon: Globe },
            { id: 'telephony', label: '3. Telefonía & Llamadas IA', icon: PhoneCall },
            { id: 'chrome_ext', label: '4. Extensión Zillow / GIS', icon: Bookmark },
            { id: 'skydrive_vision', label: '5. Visión Satelital AI', icon: Radar },
            { id: 'webhooks', label: '6. Webhooks & CRM', icon: Radio },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition text-center ${
                  active
                    ? 'bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-600/25'
                    : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate w-full">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 1. E-SIGN NATIVO                                                      */}
      {/* ===================================================================== */}
      {activeSubTab === 'esign' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-emerald-400" />
                Firma Electrónica Legal en Pantalla / Celular (E-Sign Portal)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Envía este enlace por SMS o WhatsApp al vendedor para que firme con el dedo desde su teléfono.
              </p>
            </div>

            <select
              value={selectedLeadId}
              onChange={(e) => setSelectedLeadId(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
            >
              {sellerLeads.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.ownerName} ({l.propertyAddress})
                </option>
              ))}
            </select>
          </div>

          {selectedLead && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5">
                  <div className="text-[11px] text-slate-400">Propietario / Dirección</div>
                  <div className="font-bold text-white mt-1">{selectedLead.ownerName}</div>
                  <div className="text-slate-400">{selectedLead.propertyAddress}</div>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5">
                  <div className="text-[11px] text-slate-400">Precio en Contrato</div>
                  <div className="text-lg font-black text-emerald-400 mt-1">
                    ${(selectedLead.agreedPrice || selectedLead.recommendedMaoOffer).toLocaleString()} USD
                  </div>
                  <div className="text-slate-500">Cláusula 4 de Asignabilidad Incluida</div>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5">
                  <div className="text-[11px] text-slate-400">Estado Actual de Firma</div>
                  <div className="font-bold text-amber-300 mt-1 uppercase">
                    {selectedLead.status === 'contract_signed' ? '✅ Contrato Firmado' : '⏳ Pendiente de Firma'}
                  </div>
                  <div className="text-slate-500">
                    {selectedLead.status === 'contract_signed'
                      ? 'Listo para enviar a la compañía de título'
                      : 'Listo para enviar enlace al vendedor'}
                  </div>
                </div>
              </div>

              {/* Shareable Link Box */}
              <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                    <Share2 className="w-4 h-4" />
                    Enlace Público de Firma Electrónica para el Vendedor:
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyText('sign-link', `http://localhost:3005/sign/${selectedLead.id}`)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1 transition"
                    >
                      {copiedId === 'sign-link' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      Copiar Enlace
                    </button>
                    <a
                      href={`/sign/${selectedLead.id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 transition"
                    >
                      Abrir Portal de Firma <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
                <div className="text-xs font-mono text-slate-300 bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  http://localhost:3005/sign/{selectedLead.id}
                </div>

                {/* SMS ready text */}
                <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-sky-300">
                      📱 Mensaje SMS / WhatsApp Listo para Enviar al Vendedor:
                    </span>
                    <button
                      onClick={() =>
                        copyText(
                          'sign-sms',
                          `Hola ${selectedLead.ownerName}, fue un gusto hablar contigo. Ya redactamos el acuerdo de compra en efectivo por $${(selectedLead.agreedPrice || selectedLead.recommendedMaoOffer).toLocaleString()} para ${selectedLead.propertyAddress}. Puedes revisarlo y firmarlo con tu dedo en tu celular en este enlace seguro: http://localhost:3005/sign/${selectedLead.id}`
                        )
                      }
                      className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1"
                    >
                      {copiedId === 'sign-sms' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      Copiar SMS
                    </button>
                  </div>
                  <p className="text-xs text-slate-300 font-sans bg-slate-900 p-3 rounded-lg border border-slate-800">
                    Hola {selectedLead.ownerName}, fue un gusto hablar contigo. Ya redactamos el acuerdo de compra en efectivo por ${(selectedLead.agreedPrice || selectedLead.recommendedMaoOffer).toLocaleString()} para {selectedLead.propertyAddress}. Puedes revisarlo y firmarlo con tu dedo en tu celular en este enlace seguro: http://localhost:3005/sign/{selectedLead.id}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===================================================================== */}
      {/* 2. DEAL LANDING PAGE                                                  */}
      {/* ===================================================================== */}
      {activeSubTab === 'deal_landing' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-sky-400" />
                Landing Pages Públicas de Tratos (Deal Packet Interactivo para Cash Buyers)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Genera una página web profesional con fotos, comps, números y botón de oferta para enviar a tus 33 compradores.
              </p>
            </div>

            <select
              value={selectedLeadId}
              onChange={(e) => setSelectedLeadId(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
            >
              {sellerLeads.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.propertyAddress} (${(l.agreedPrice || l.recommendedMaoOffer).toLocaleString()})
                </option>
              ))}
            </select>
          </div>

          {selectedLead && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-sky-500/30 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-sky-300 flex items-center gap-1.5">
                    <Globe className="w-4 h-4" />
                    Enlace Público del Deal Packet para Compartir con Compradores:
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyText('deal-link', `http://localhost:3005/deal/${selectedLead.id}`)}
                      className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold flex items-center gap-1 transition"
                    >
                      {copiedId === 'deal-link' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      Copiar Enlace
                    </button>
                    <a
                      href={`/deal/${selectedLead.id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 transition"
                    >
                      Ver Deal Page en Vivo <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="text-xs font-mono text-slate-300 bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  http://localhost:3005/deal/{selectedLead.id}
                </div>

                {/* Buyer Blast Text */}
                <div className="pt-2 border-t border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-emerald-300">
                      🚀 Dispo Blast para Enviar a los 33 Cash Buyers del Módulo 3:
                    </span>
                    <button
                      onClick={() =>
                        copyText(
                          'dispo-blast-lead',
                          `🔥 OFF-MARKET DEAL: ${selectedLead.propertyAddress}\nAsking: $${((selectedLead.agreedPrice || selectedLead.recommendedMaoOffer) + (selectedLead.assignmentFeeProjected || 20000)).toLocaleString()} (Cash / Hard Money)\nARV Comps: $${(selectedLead.estimatedArv || 320000).toLocaleString()}\nRevisa fotos, comps y envía tu oferta aquí: http://localhost:3005/deal/${selectedLead.id}`
                        )
                      }
                      className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1"
                    >
                      {copiedId === 'dispo-blast-lead' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      Copiar Dispo Blast
                    </button>
                  </div>
                  <pre className="text-xs text-slate-300 font-sans whitespace-pre-wrap bg-slate-900 p-3 rounded-lg border border-slate-800">
                    🔥 OFF-MARKET DEAL: {selectedLead.propertyAddress}{'\n'}
                    Asking: ${((selectedLead.agreedPrice || selectedLead.recommendedMaoOffer) + (selectedLead.assignmentFeeProjected || 20000)).toLocaleString()} (Cash / Hard Money){'\n'}
                    ARV Comps: ${(selectedLead.estimatedArv || 320000).toLocaleString()}{'\n'}
                    Revisa fotos, comps y envía tu oferta aquí: http://localhost:3005/deal/{selectedLead.id}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===================================================================== */}
      {/* 3. TELEFONÍA & LLAMADAS IA                                            */}
      {/* ===================================================================== */}
      {activeSubTab === 'telephony' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <PhoneCall className="w-5 h-5 text-emerald-400" />
              Agente de Telefonía & Llamadas IA en Vivo (Vapi.ai / Retell AI / WebRTC)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Conecta tu cuenta de telefonía o usa el motor inteligente incorporado para ejecutar llamadas y analizar el acuerdo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            <div className="md:col-span-5 space-y-3.5">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Proveedor de Telefonía</label>
                <select
                  value={callProvider}
                  onChange={(e) => setCallProvider(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                >
                  <option value="built_in">Simulador & Agente WebRTC Incorporado ($0)</option>
                  <option value="vapi">Vapi.ai (Llamadas Telefónicas Reales por API)</option>
                  <option value="retell">Retell AI (Llamadas Telefónicas de Baja Latencia)</option>
                </select>
              </div>

              {callProvider !== 'built_in' && (
                <div>
                  <label className="text-xs text-slate-400 block mb-1">API Key de {callProvider.toUpperCase()}</label>
                  <input
                    type="password"
                    value={callApiKey}
                    onChange={(e) => setCallApiKey(e.target.value)}
                    placeholder="sk_vapi_... o key_retell_..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              )}

              <div>
                <label className="text-xs text-slate-400 block mb-1">Número de Teléfono del Vendedor</label>
                <input
                  type="text"
                  value={callPhone}
                  onChange={(e) => setCallPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <button
                onClick={handleTriggerCall}
                disabled={callLoading}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition"
              >
                <PhoneCall className="w-4 h-4" />
                {callLoading ? 'Conectando...' : 'Iniciar Llamada de Adquisición'}
              </button>

              {callStatusMsg && (
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                  {callStatusMsg}
                </div>
              )}
            </div>

            <div className="md:col-span-7 space-y-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">
                  Transcripción de la Conversación (4 Pilares de Motivación):
                </label>
                <textarea
                  rows={6}
                  value={callTranscript}
                  onChange={(e) => setCallTranscript(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white font-mono"
                />
              </div>

              <button
                onClick={handleAnalyzeTranscript}
                disabled={callLoading}
                className="py-2 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 transition"
              >
                <Sparkles className="w-4 h-4" />
                Analizar Motivación y Acordar Trato con IA
              </button>

              {analysisResult && (
                <div className="p-4 rounded-xl bg-slate-950 border border-indigo-500/40 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">Veredicto IA: {analysisResult.dealVerdict}</span>
                    <span className="text-emerald-400 font-bold">
                      Motivación: {analysisResult.sellerMotivationScore}/100
                    </span>
                  </div>
                  <div className="text-slate-300">
                    <strong>Precio Acordado / Objetivo:</strong> ${analysisResult.agreedOrTargetPrice?.toLocaleString()} USD
                  </div>
                  <div className="text-slate-400">
                    <strong>Siguiente Acción:</strong> {analysisResult.nextAction}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 4. CHROME EXTENSION & BOOKMARKLET                                     */}
      {/* ===================================================================== */}
      {activeSubTab === 'chrome_ext' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-amber-400" />
              Extensión de Chrome & Bookmarklet Zillow/GIS en 1 Clic
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Importa cualquier propiedad de Zillow o Redfin directo a tu Pipeline sin copiar y pegar manualmente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* 1. Bookmarklet */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-xs font-bold">
                  OPCIÓN 1: INSTANTÁNEA (Sin Instalar Nada)
                </span>
              </div>
              <h4 className="text-sm font-bold text-white">Bookmarklet para tu Barra de Marcadores</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Copia este código y guárdalo como un marcador en tu navegador. Cuando estés en cualquier casa en Zillow, haz clic en el marcador y la casa se guardará de inmediato en tu Pipeline:
              </p>
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-[11px] font-mono text-slate-400 truncate">
                {bookmarkletCode}
              </div>
              <button
                onClick={() => copyText('bookmarklet', bookmarkletCode)}
                className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition"
              >
                {copiedId === 'bookmarklet' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                Copiar Código Bookmarklet
              </button>
            </div>

            {/* 2. Chrome Extension Files */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-xs font-bold">
                  OPCIÓN 2: EXTENSIÓN OFICIAL DE CHROME
                </span>
              </div>
              <h4 className="text-sm font-bold text-white">Extensión empaquetada en la carpeta <code>chrome-extension/</code></h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Inyecta un botón flotante verde <strong>"⚡ Enviar a WholesalePlatform"</strong> en la esquina inferior derecha de cada casa en Zillow y Redfin.
              </p>
              <div className="text-xs text-slate-400 space-y-1 bg-slate-900 p-3 rounded-lg border border-slate-800">
                <div>1. Abre <code>chrome://extensions/</code> en tu navegador.</div>
                <div>2. Activa el "Modo Desarrollador" en la esquina superior derecha.</div>
                <div>3. Haz clic en "Cargar extensión sin empaquetar" y selecciona la carpeta:</div>
                <div className="text-emerald-400 font-mono text-[11px]">C:\Users\Usuario\.gemini\antigravity\scratch\skill-forge\chrome-extension</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 5. SKYDRIVE MULTIMODAL VISION                                         */}
      {/* ===================================================================== */}
      {activeSubTab === 'skydrive_vision' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Radar className="w-5 h-5 text-emerald-400" />
              SkyDrive AI con Visión Satelital & Forense Inmobiliario
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Diagnostica el deterioro físico del techo, lote y fachada con enlaces satelitales y Street View 3D.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            <div className="md:col-span-5 space-y-3">
              <label className="text-xs text-slate-400 block mb-1">Dirección a Inspeccionar</label>
              <input
                type="text"
                value={visionAddress}
                onChange={(e) => setVisionAddress(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
              />
              <button
                onClick={handleRunVisionAnalysis}
                disabled={visionLoading}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition"
              >
                <Radar className="w-4 h-4" />
                {visionLoading ? 'Analizando Imágenes Satelitales...' : 'Ejecutar Diagnóstico Visual'}
              </button>
            </div>

            <div className="md:col-span-7">
              {visionData ? (
                <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">{visionData.verdict}</span>
                    <span className="text-emerald-400 font-black text-sm">
                      Score: {visionData.visualDistressScore}/100
                    </span>
                  </div>

                  <div className="space-y-1.5 text-slate-300">
                    <div>
                      <strong>🏠 Techo ({visionData.inspectionBreakdown?.roofConditionScore} pts):</strong>{' '}
                      {visionData.inspectionBreakdown?.roofDetails}
                    </div>
                    <div>
                      <strong>🌿 Patio/Lote ({visionData.inspectionBreakdown?.lotAndYardScore} pts):</strong>{' '}
                      {visionData.inspectionBreakdown?.lotDetails}
                    </div>
                    <div>
                      <strong>🎨 Fachada ({visionData.inspectionBreakdown?.exteriorWallsAndPaintScore} pts):</strong>{' '}
                      {visionData.inspectionBreakdown?.exteriorDetails}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800">
                    <a
                      href={visionData.satelliteLinks?.googleStreetViewUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1"
                    >
                      Google Street View <ExternalLink className="w-3 h-3" />
                    </a>
                    <a
                      href={visionData.satelliteLinks?.googleEarthUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-sky-600/20 text-sky-300 border border-sky-500/30 text-xs font-semibold flex items-center gap-1"
                    >
                      Google Earth 3D <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ) : (
                <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 text-center text-xs text-slate-400">
                  Presiona "Ejecutar Diagnóstico Visual" para obtener el desglose forense de la propiedad.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 6. WEBHOOKS & REAL-TIME CRM SYNC                                      */}
      {/* ===================================================================== */}
      {activeSubTab === 'webhooks' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Radio className="w-5 h-5 text-indigo-400" />
              Sincronización en Tiempo Real con CRM (GoHighLevel / Discord / Telegram)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Recibe notificaciones en tu celular cada vez que un contrato se firme en E-Sign o un comprador envíe una oferta.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-slate-400 block mb-1 font-semibold">Discord Webhook URL</label>
              <input
                type="url"
                value={discordUrl}
                onChange={(e) => setDiscordUrl(e.target.value)}
                placeholder="https://discord.com/api/webhooks/..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1 font-semibold">GoHighLevel Webhook URL</label>
              <input
                type="url"
                value={ghlWebhook}
                onChange={(e) => setGhlWebhook(e.target.value)}
                placeholder="https://services.leadconnectorhq.com/hooks/..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1 font-semibold">Telegram Bot Token (Opcional)</label>
              <input
                type="text"
                value={telegramToken}
                onChange={(e) => setTelegramToken(e.target.value)}
                placeholder="123456:ABC-DEF1234..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1 font-semibold">Telegram Chat ID</label>
              <input
                type="text"
                value={telegramChatId}
                onChange={(e) => setTelegramChatId(e.target.value)}
                placeholder="-100123456789 o tu ID"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleSaveWebhooks}
              className="py-2 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 transition"
            >
              <Settings className="w-4 h-4" />
              Guardar Configuración
            </button>

            <button
              onClick={handleTestWebhook}
              className="py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5 transition"
            >
              <Radio className="w-4 h-4 text-emerald-400" />
              Enviar Notificación de Prueba
            </button>

            {webhookMsg && <span className="text-xs text-emerald-400 font-medium">{webhookMsg}</span>}
          </div>
        </div>
      )}
    </div>
  );
}
