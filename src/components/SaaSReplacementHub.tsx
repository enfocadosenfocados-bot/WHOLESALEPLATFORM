'use client';

import React, { useState, useEffect } from 'react';
import {
  Layers,
  Search,
  Filter,
  Download,
  Flame,
  AlertTriangle,
  Building2,
  DollarSign,
  UserCheck,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Check,
  Copy,
  Sparkles,
  RefreshCw,
  PhoneCall,
  FileText
} from 'lucide-react';

interface DistressedLead {
  id: string;
  parcelId: string;
  propertyAddress: string;
  city: string;
  state: string;
  zipCode: string;
  ownerName: string;
  ownerMailingAddress: string;
  isAbsenteeOwner: boolean;
  distressType: string;
  distressSeverity: 'ALTA' | 'MEDIA' | 'CRITICA';
  estimatedEquity: number;
  estimatedArv: number;
  taxDelinquentAmount?: number;
  violationDescription?: string;
  recommendedOffer: number;
  sourceOrigin: string;
}

export default function SaaSReplacementHub() {
  const [leads, setLeads] = useState<DistressedLead[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterType, setFilterType] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLead, setSelectedLead] = useState<DistressedLead | null>(null);
  const [copiedId, setCopiedId] = useState('');

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/enterprise-leads');
      const data = await res.json();
      if (data.records) {
        setLeads(data.records);
        if (!selectedLead && data.records.length > 0) {
          setSelectedLead(data.records[0]);
        }
      }
    } catch (err) {
      console.error('Error fetching leads:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      l.propertyAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.city.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterType === 'ALL') return matchesSearch;
    if (filterType === 'ABSENTEE') return matchesSearch && l.isAbsenteeOwner;
    if (filterType === 'CRITICA') return matchesSearch && l.distressSeverity === 'CRITICA';
    if (filterType === 'TAX') return matchesSearch && l.distressType.toLowerCase().includes('tax');
    if (filterType === 'CODE') return matchesSearch && l.distressType.toLowerCase().includes('code');
    if (filterType === 'PROBATE') return matchesSearch && l.distressType.toLowerCase().includes('probate');
    return matchesSearch;
  });

  const exportCSV = () => {
    if (filteredLeads.length === 0) return;
    const headers = [
      'ID',
      'APN_PIN',
      'Direccion',
      'Ciudad',
      'Estado',
      'ZIP',
      'Propietario',
      'Direccion_Postal',
      'Es_Absentee',
      'Tipo_Distress',
      'Gravedad',
      'ARV_Estimado',
      'Oferta_Recomendada',
      'Fuente'
    ];
    const rows = filteredLeads.map((r) => [
      `"${r.id}"`,
      `"${r.parcelId}"`,
      `"${r.propertyAddress.replace(/"/g, '""')}"`,
      `"${r.city}"`,
      `"${r.state}"`,
      `"${r.zipCode}"`,
      `"${r.ownerName.replace(/"/g, '""')}"`,
      `"${r.ownerMailingAddress.replace(/"/g, '""')}"`,
      r.isAbsenteeOwner ? 'SI' : 'NO',
      `"${r.distressType}"`,
      `"${r.distressSeverity}"`,
      r.estimatedArv,
      r.recommendedOffer,
      `"${r.sourceOrigin}"`
    ]);
    const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `SaaS_Replacement_Distressed_Leads_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(''), 2000);
  };

  return (
    <div className="space-y-6">
      {/* HEADER EXPLICATIVO DE REEMPLAZO SAAS */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                Motor Central de Leads Multicapa (Reemplazo SaaS $0)
                <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800">
                  Sin Suscripción
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Reemplaza PropStream, BatchLeads, XLeads y Tranchi consumiendo directamente registros de los condados (Tax Assessor, SODA Open Data, Probate Courts y Land Banks).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchLeads}
              disabled={loading}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 transition disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              Actualizar
            </button>
            <button
              onClick={exportCSV}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-emerald-500/10 transition"
            >
              <Download className="w-3.5 h-3.5" />
              Exportar CSV ({filteredLeads.length})
            </button>
          </div>
        </div>

        {/* COMPARATIVA DE VALOR */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-slate-800/80">
          <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase">Filtro Absentee Owner</span>
            <span className="text-xs font-bold text-emerald-400">Mailing != Property Address</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase">Infracciones de Código</span>
            <span className="text-xs font-bold text-amber-400">APIs Abiertas SODA (En Vivo)</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase">Sucesiones / Pre-Probate</span>
            <span className="text-xs font-bold text-purple-400">Tribunales del Condado</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 block uppercase">Ahorro Mensual Estimado</span>
            <span className="text-xs font-bold text-emerald-300">+$600 USD / Mes</span>
          </div>
        </div>
      </div>

      {/* CONTROLES DE BÚSQUEDA Y FILTRADO */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por dirección, dueño o ciudad..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1">
          {[
            { id: 'ALL', label: 'Todos' },
            { id: 'ABSENTEE', label: 'Dueño Ausente (Absentee)' },
            { id: 'CRITICA', label: 'Urgencia Crítica' },
            { id: 'TAX', label: 'Impuestos (Tax Delinquent)' },
            { id: 'CODE', label: 'Código (Violations)' },
            { id: 'PROBATE', label: 'Herencias (Pre-Probate)' }
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setFilterType(btn.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                filterType === btn.id
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* GRID DE TABLA Y DETALLE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LISTADO DE PROPIEDADES */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-950/60 overflow-hidden">
          <div className="p-3.5 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Mostrando {filteredLeads.length} propiedades con señales de motivación</span>
            <span className="font-mono text-[11px]">Empresa: AI Automated Services LLC</span>
          </div>

          <div className="divide-y divide-slate-800/60 max-h-[580px] overflow-y-auto">
            {filteredLeads.map((lead) => {
              const isSelected = selectedLead?.id === lead.id;
              return (
                <div
                  key={lead.id}
                  onClick={() => setSelectedLead(lead)}
                  className={`p-4 cursor-pointer transition ${
                    isSelected ? 'bg-emerald-950/30 border-l-4 border-emerald-400' : 'hover:bg-slate-900/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{lead.propertyAddress}</span>
                        {lead.isAbsenteeOwner && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] bg-blue-950 text-blue-300 border border-blue-800">
                            Absentee
                          </span>
                        )}
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] border ${
                            lead.distressSeverity === 'CRITICA'
                              ? 'bg-red-950/80 text-red-300 border-red-800'
                              : 'bg-amber-950/80 text-amber-300 border-amber-800'
                          }`}
                        >
                          {lead.distressSeverity}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {lead.city}, {lead.state} {lead.zipCode} | Dueño: {lead.ownerName}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-mono font-bold text-emerald-400">
                        ${lead.recommendedOffer.toLocaleString()} USD
                      </span>
                      <span className="text-[10px] text-slate-500 block">Oferta MAO Sugerida</span>
                    </div>
                  </div>

                  <div className="mt-2.5 flex items-center gap-4 text-[11px] text-slate-400 font-mono">
                    <span className="truncate max-w-xs text-amber-300/90">
                      ⚡ {lead.distressType}
                    </span>
                    <span>ARV: ${lead.estimatedArv.toLocaleString()}</span>
                    <span className="text-slate-500 truncate max-w-[150px]">{lead.sourceOrigin}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* DETALLE Y ACCIONES DIRECTAS */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-5">
          {selectedLead ? (
            <>
              <div className="border-b border-slate-800 pb-4">
                <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                  Ficha de Lead Analizada
                </span>
                <h3 className="text-base font-bold text-white mt-1">{selectedLead.propertyAddress}</h3>
                <p className="text-xs text-slate-400">
                  {selectedLead.city}, {selectedLead.state} {selectedLead.zipCode}
                </p>
              </div>

              {/* ANÁLISIS DE MOTIVACIÓN & DATOS DE REGISTRO */}
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <span className="text-slate-500 uppercase text-[10px] font-bold block">
                    Datos Catastrales (County Assessor)
                  </span>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Parcel ID (APN):</span>
                    <span className="font-mono text-white">{selectedLead.parcelId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Propietario Legal:</span>
                    <span className="text-white font-medium">{selectedLead.ownerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Dirección de Correo:</span>
                    <span className="text-slate-300 truncate max-w-[160px]">
                      {selectedLead.ownerMailingAddress}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <span className="text-slate-500 uppercase text-[10px] font-bold block">
                    Cálculos de Descuento (Reverse Price Anchor)
                  </span>
                  <div className="flex justify-between">
                    <span className="text-slate-400">ARV Estimado:</span>
                    <span className="font-mono text-white">
                      ${selectedLead.estimatedArv.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Equity Estimada:</span>
                    <span className="font-mono text-emerald-400">
                      ${selectedLead.estimatedEquity.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold pt-1 border-t border-slate-800">
                    <span className="text-slate-200">Oferta MAO Recomendada:</span>
                    <span className="font-mono text-emerald-400">
                      ${selectedLead.recommendedOffer.toLocaleString()}
                    </span>
                  </div>
                </div>

                {selectedLead.violationDescription && (
                  <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-800/40 text-amber-200">
                    <span className="text-[10px] uppercase font-bold text-amber-400 block mb-1">
                      Detalle de Infracción / Distress
                    </span>
                    <p className="text-xs leading-relaxed">{selectedLead.violationDescription}</p>
                  </div>
                )}
              </div>

              {/* BOTONES DE ACCIÓN RÁPIDA */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <button
                  onClick={() => {
                    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
                      `${selectedLead.ownerName} ${selectedLead.city} ${selectedLead.state} phone`
                    )}`;
                    window.open(searchUrl, '_blank');
                  }}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition"
                >
                  <Search className="w-3.5 h-3.5" />
                  Buscar Teléfono Gratis en la Red
                </button>

                <button
                  onClick={() =>
                    copyToClipboard(
                      `PURCHASE AND SALE AGREEMENT (AS-IS)\nProperty: ${selectedLead.propertyAddress}, ${selectedLead.city}, ${selectedLead.state}\nBuyer: AI Automated Services LLC and/or assigns\nSeller: ${selectedLead.ownerName}\nPurchase Price: $${selectedLead.recommendedOffer.toLocaleString()} USD\nClosing: 14 business days. Standard inspection contingency.`,
                      selectedLead.id
                    )
                  }
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition"
                >
                  {copiedId === selectedLead.id ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Contrato As-Is Copiado
                    </>
                  ) : (
                    <>
                      <FileText className="w-3.5 h-3.5" />
                      Generar Contrato Pre-Llenado ($5k-$10k Fee)
                    </>
                  )}
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-slate-500 text-xs">
              Selecciona una propiedad de la lista para ver el análisis de motivación y emitir la oferta.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
