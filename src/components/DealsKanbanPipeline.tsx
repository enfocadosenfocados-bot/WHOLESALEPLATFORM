'use client';

import React, { useState } from 'react';
import {
  Trophy,
  PhoneCall,
  FileText,
  DollarSign,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Printer,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { MotivatedSellerLead } from '@/types/skill';

interface DealsKanbanPipelineProps {
  leads: MotivatedSellerLead[];
  onOpenFlyer: (lead: MotivatedSellerLead) => void;
  onOpenMemorandum: (lead: MotivatedSellerLead) => void;
  onLeadStatusChanged?: (leadId: string, newStatus: string) => void;
}

interface KanbanColumn {
  id: string;
  title: string;
  badgeColor: string;
  dotColor: string;
}

const KANBAN_COLUMNS: KanbanColumn[] = [
  { id: 'new', title: '1. Nuevo Lead', badgeColor: 'bg-slate-800 text-slate-300', dotColor: 'bg-slate-400' },
  { id: 'calling', title: '2. En Contacto / Vapi', badgeColor: 'bg-sky-950 text-sky-300 border-sky-800', dotColor: 'bg-sky-400' },
  { id: 'offer_presented', title: '3. Oferta Presentada', badgeColor: 'bg-purple-950 text-purple-300 border-purple-800', dotColor: 'bg-purple-400' },
  { id: 'contract_signed', title: '4. PSA Firmado', badgeColor: 'bg-indigo-950 text-indigo-300 border-indigo-800', dotColor: 'bg-indigo-400' },
  { id: 'title_escrow', title: '5. Título Abierto (EMD)', badgeColor: 'bg-amber-950 text-amber-300 border-amber-800', dotColor: 'bg-amber-400' },
  { id: 'assigned_buyer', title: '6. Asignado a Buyer', badgeColor: 'bg-teal-950 text-teal-300 border-teal-800', dotColor: 'bg-teal-400' },
  { id: 'closed_won', title: '7. Cerrado & Cobrado 🎉', badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-800', dotColor: 'bg-emerald-400' },
];

export default function DealsKanbanPipeline({
  leads,
  onOpenFlyer,
  onOpenMemorandum,
  onLeadStatusChanged,
}: DealsKanbanPipelineProps) {
  // Local state mapping lead IDs to kanban column ID
  const [leadColumns, setLeadColumns] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    leads.forEach((l, idx) => {
      if (l.status === 'contract_signed') {
        initial[l.id] = 'contract_signed';
      } else if (l.status === 'deal_agreed_yes') {
        initial[l.id] = 'offer_presented';
      } else if (l.status === 'in_call' || (l.status as any) === 'call_ready') {
        initial[l.id] = 'calling';
      } else if (idx === 1) {
        initial[l.id] = 'title_escrow';
      } else if (idx === 2) {
        initial[l.id] = 'assigned_buyer';
      } else if (idx === 3) {
        initial[l.id] = 'closed_won';
      } else {
        initial[l.id] = 'new';
      }
    });
    return initial;
  });

  const moveLead = (leadId: string, direction: 'prev' | 'next') => {
    const currentColId = leadColumns[leadId] || 'new';
    const currentIdx = KANBAN_COLUMNS.findIndex((c) => c.id === currentColId);
    let newIdx = currentIdx;

    if (direction === 'next' && currentIdx < KANBAN_COLUMNS.length - 1) {
      newIdx = currentIdx + 1;
    } else if (direction === 'prev' && currentIdx > 0) {
      newIdx = currentIdx - 1;
    }

    if (newIdx !== currentIdx) {
      const targetCol = KANBAN_COLUMNS[newIdx].id;
      setLeadColumns((prev) => ({ ...prev, [leadId]: targetCol }));
      if (onLeadStatusChanged) {
        onLeadStatusChanged(leadId, targetCol);
      }
    }
  };

  // Pipeline metrics
  const totalLeads = leads.length;
  const underContractCount = Object.values(leadColumns).filter((c) =>
    ['contract_signed', 'title_escrow', 'assigned_buyer'].includes(c)
  ).length;
  const closedWonCount = Object.values(leadColumns).filter((c) => c === 'closed_won').length;
  const projectedFees = (underContractCount + closedWonCount) * 10000;
  const realizedFees = closedWonCount * 10000;

  return (
    <div className="space-y-4">
      {/* Metrics Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-900/90 border border-slate-800 p-3.5 rounded-2xl shadow-lg">
        <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Deals Activos</span>
          <div className="text-xl font-black text-white mt-0.5">{totalLeads} Propiedades</div>
          <span className="text-[10px] text-slate-500">Pipeline total</span>
        </div>
        <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Bajo Contrato (PSA)</span>
          <div className="text-xl font-black text-indigo-400 mt-0.5">{underContractCount} Deals</div>
          <span className="text-[10px] text-indigo-300">En periodo de inspección / escrow</span>
        </div>
        <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Honorarios Proyectados</span>
          <div className="text-xl font-black text-cyan-400 mt-0.5">${projectedFees.toLocaleString()} USD</div>
          <span className="text-[10px] text-cyan-500">A $10,000 fee por asignación</span>
        </div>
        <div className="bg-slate-950/70 p-3 rounded-xl border border-emerald-500/30 bg-emerald-950/20">
          <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">Cobrado & Liquidado 🎉</span>
          <div className="text-xl font-black text-emerald-400 mt-0.5">${realizedFees.toLocaleString()} USD</div>
          <span className="text-[10px] text-emerald-300">Wire transfer recibido de Title Co.</span>
        </div>
      </div>

      {/* Kanban Board Horizontal Scroll */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-3 min-w-[1300px]">
          {KANBAN_COLUMNS.map((col) => {
            const columnLeads = leads.filter(
              (l) => (leadColumns[l.id] || 'new') === col.id
            );

            return (
              <div
                key={col.id}
                className="flex-1 bg-slate-950/80 border border-slate-800/90 rounded-2xl p-3 flex flex-col min-w-[210px] shadow-sm"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${col.dotColor}`} />
                    <span className="text-xs font-black text-white">{col.title}</span>
                  </div>
                  <span className={`text-[10px] font-black px-1.5 py-0.2 rounded-full border ${col.badgeColor}`}>
                    {columnLeads.length}
                  </span>
                </div>

                {/* Column Cards */}
                <div className="flex-1 space-y-2.5 overflow-y-auto max-h-[580px] pr-0.5">
                  {columnLeads.length === 0 ? (
                    <div className="p-4 text-center text-[11px] text-slate-600 border border-dashed border-slate-800/60 rounded-xl">
                      Sin deals en esta etapa
                    </div>
                  ) : (
                    columnLeads.map((lead) => (
                      <div
                        key={lead.id}
                        className="bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 p-3 rounded-xl shadow-md space-y-2 transition"
                      >
                        {/* Title & Location */}
                        <div>
                          <div className="text-[11px] font-black text-white leading-tight">
                            {lead.propertyAddress}
                          </div>
                          <div className="text-[10px] text-slate-400 mt-0.5">
                            {lead.cityState} • <strong>{lead.ownerName}</strong>
                          </div>
                        </div>

                        {/* Financial Snapshot */}
                        <div className="bg-slate-950/80 p-2 rounded-lg text-[10px] space-y-0.5 border border-slate-800/60">
                          <div className="flex justify-between">
                            <span className="text-slate-500">ARV:</span>
                            <span className="font-bold text-white">${lead.estimatedArv?.toLocaleString() || '145,000'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Oferta MAO:</span>
                            <span className="font-bold text-emerald-400">${lead.recommendedMaoOffer?.toLocaleString() || '62,000'}</span>
                          </div>
                          <div className="flex justify-between text-cyan-300">
                            <span>Fee Asignación:</span>
                            <span className="font-bold">$10,000</span>
                          </div>
                        </div>

                        {/* Quick Action Buttons */}
                        <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 text-[10px]">
                          <div className="flex gap-1">
                            <button
                              onClick={() => onOpenFlyer(lead)}
                              className="p-1 rounded bg-slate-800 hover:bg-cyan-950 hover:text-cyan-300 text-slate-400 transition"
                              title="Generar Flyer PDF para Buyers"
                            >
                              <Printer className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => onOpenMemorandum(lead)}
                              className="p-1 rounded bg-slate-800 hover:bg-emerald-950 hover:text-emerald-300 text-slate-400 transition"
                              title="Generar Memorandum (Blindaje Legal)"
                            >
                              <ShieldCheck className="w-3.5 h-3.5" />
                            </button>
                            <a
                              href={`/sign/lead-canton-realtor`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1 rounded bg-slate-800 hover:bg-indigo-950 hover:text-indigo-300 text-slate-400 transition"
                              title="Abrir E-Sign Portal"
                            >
                              <FileText className="w-3.5 h-3.5" />
                            </a>
                          </div>

                          {/* Move Left / Right Buttons */}
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => moveLead(lead.id, 'prev')}
                              disabled={col.id === 'new'}
                              className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white disabled:opacity-20 transition"
                              title="Mover a etapa anterior"
                            >
                              <ChevronLeft className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => moveLead(lead.id, 'next')}
                              disabled={col.id === 'closed_won'}
                              className="p-1 rounded hover:bg-slate-800 text-cyan-400 hover:text-cyan-300 disabled:opacity-20 transition"
                              title="Mover a etapa siguiente"
                            >
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
