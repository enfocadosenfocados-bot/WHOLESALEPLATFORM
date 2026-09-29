'use client';

import React, { useState } from 'react';
import {
  Instagram,
  Send,
  Copy,
  Check,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  Film,
  MapPin,
  Briefcase,
} from 'lucide-react';
import { InstagramCreatorPartner, SkillDatabase } from '@/types/skill';

interface InstagramCreatorsOutreachProps {
  creators: InstagramCreatorPartner[];
  onDatabaseUpdated: (db: SkillDatabase) => void;
}

export default function InstagramCreatorsOutreach({
  creators,
  onDatabaseUpdated,
}: InstagramCreatorsOutreachProps) {
  const [selectedLang, setSelectedLang] = useState<'en' | 'es'>('en');
  const [copiedId, setCopiedId] = useState('');
  const [editingDms, setEditingDms] = useState<Record<string, string>>({});

  const updateStatus = async (
    creatorId: string,
    outreachStatus: InstagramCreatorPartner['outreachStatus']
  ) => {
    const res = await fetch('/api/ig-creators', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ creatorId, outreachStatus }),
    });
    const data = await res.json();
    if (res.ok && data.db) {
      onDatabaseUpdated(data.db);
    }
  };

  const handleCopyAndOpenIg = (creator: InstagramCreatorPartner) => {
    const textToCopy =
      editingDms[`${creator.id}_${selectedLang}`] ||
      (selectedLang === 'en'
        ? creator.customDmEnglish
        : creator.customDmSpanish);

    navigator.clipboard.writeText(textToCopy);
    setCopiedId(creator.id);
    setTimeout(() => setCopiedId(''), 3000);

    if (creator.outreachStatus === 'pending') {
      updateStatus(creator.id, 'dm_sent');
    }

    const cleanUsername = creator.handle.replace('@', '').trim();
    window.open(`https://ig.me/m/${cleanUsername}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-pink-950/40 border border-pink-500/30 rounded-2xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="max-w-3xl">
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 font-semibold flex items-center gap-1.5 w-fit">
            <Instagram className="w-3.5 h-3.5" />
            Perfiles Extraídos Automáticamente de tus 11 Reels de Instagram
          </span>
          <h2 className="text-xl font-extrabold text-white mt-1.5">
            Creadores, Mentores y Compradores de Instagram (Outreach para Trabajar con Ellos)
          </h2>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            Cada perfil fue extraído de tus links. Cada tarjeta incluye el análisis de qué propiedades compran y un **Mensaje Directo (DM) personalizado** diciendo que los sigues desde hace tiempo, que quieres trabajar con ellos llevándoles tratos y preguntándoles **qué propiedades buscan (Buy Box)** y **si necesitan que ya tengas el contrato cerrado con el vendedor**.
          </p>
        </div>

        {/* Language Toggle */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => setSelectedLang('en')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition ${
              selectedLang === 'en'
                ? 'bg-pink-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🇬🇧 DM en Inglés (Recomendado EE.UU.)
          </button>
          <button
            type="button"
            onClick={() => setSelectedLang('es')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition ${
              selectedLang === 'es'
                ? 'bg-pink-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🇪🇸 DM en Español
          </button>
        </div>
      </div>

      {/* Creators Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {creators.map((creator) => {
          const dmKey = `${creator.id}_${selectedLang}`;
          const currentDm =
            editingDms[dmKey] ??
            (selectedLang === 'en'
              ? creator.customDmEnglish
              : creator.customDmSpanish);

          const cleanUsername = creator.handle.replace('@', '').trim();

          return (
            <div
              key={creator.id}
              className="bg-slate-900 border border-slate-800 hover:border-pink-500/40 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-lg transition"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <a
                        href={creator.profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base font-extrabold text-pink-400 hover:text-pink-300 flex items-center gap-1"
                      >
                        {creator.handle}
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 flex items-center gap-1">
                        <Film className="w-3 h-3 text-pink-400" />
                        {creator.reelsCount} Reel(s) en tu Dashboard
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-white mt-0.5">
                      {creator.fullName}
                    </h3>
                    <span className="text-xs text-amber-300 font-medium block mt-0.5">
                      {creator.role}
                    </span>
                  </div>

                  {/* Status Selector */}
                  <select
                    value={creator.outreachStatus}
                    onChange={(e) =>
                      updateStatus(
                        creator.id,
                        e.target.value as InstagramCreatorPartner['outreachStatus']
                      )
                    }
                    className={`text-xs font-bold px-2.5 py-1.5 rounded-xl border ${
                      creator.outreachStatus === 'active_partner'
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                        : creator.outreachStatus === 'replied_buybox'
                        ? 'bg-sky-950 text-sky-300 border-sky-500/40'
                        : creator.outreachStatus === 'dm_sent'
                        ? 'bg-amber-950 text-amber-300 border-amber-500/40'
                        : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}
                  >
                    <option value="pending">⏳ Pendiente de Enviar DM</option>
                    <option value="dm_sent">📤 DM Enviado</option>
                    <option value="replied_buybox">💬 Respondió su Buy-Box</option>
                    <option value="active_partner">🤝 Socio / Comprador Activo</option>
                  </select>
                </div>

                {/* Buy Box & Deal Structure Summary from their Reels */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-200">Mercados donde opera/compra:</strong>{' '}
                      <span className="text-slate-300">{creator.marketsTheyBuy}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-200">Qué busca según sus Reels:</strong>{' '}
                      <span className="text-slate-300">{creator.whatTheyLookFor}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Briefcase className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-200">Cómo estructura los deals:</strong>{' '}
                      <span className="text-slate-300">
                        {creator.dealStructurePreference}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Editable DM Box */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-pink-300">
                      Mensaje Personalizado Listo para Enviar a {creator.handle}:
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(currentDm);
                        setCopiedId(creator.id);
                        setTimeout(() => setCopiedId(''), 2500);
                      }}
                      className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1"
                    >
                      {copiedId === creator.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      {copiedId === creator.id ? 'Copiado' : 'Solo Copiar'}
                    </button>
                  </div>
                  <textarea
                    rows={7}
                    value={currentDm}
                    onChange={(e) =>
                      setEditingDms({
                        ...editingDms,
                        [dmKey]: e.target.value,
                      })
                    }
                    className="w-full bg-slate-950 border border-slate-800 focus:border-pink-500 rounded-xl p-3.5 text-xs text-slate-200 font-mono leading-relaxed focus:outline-none"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
                <a
                  href={creator.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                >
                  Ver Perfil: instagram.com/{cleanUsername}
                  <ExternalLink className="w-3 h-3" />
                </a>

                <button
                  type="button"
                  onClick={() => handleCopyAndOpenIg(creator)}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs font-extrabold flex items-center gap-2 shadow-lg shadow-pink-600/25 transition"
                >
                  {copiedId === creator.id ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      ¡Copiado! Pega (Ctrl+V) en su Chat
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Copiar DM + Abrir Chat de {creator.handle}
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
