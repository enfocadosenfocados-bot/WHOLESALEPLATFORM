'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Flame,
  Layers,
  Filter,
  PhoneCall,
  Calculator,
  Printer,
  Sparkles,
  ExternalLink,
  Building,
  Home,
  CheckCircle2,
  Navigation,
} from 'lucide-react';
import { MotivatedSellerLead } from '@/types/skill';

interface HotspotDeal {
  id: string;
  property: string;
  city: string;
  state: string;
  type: 'land' | 'section8' | 'code_violation' | 'subto';
  typeLabel: string;
  badgeColor: string;
  owner: string;
  phone: string;
  arv: number;
  mao: number;
  fee: number;
  buyerMatch: string;
  strategy: string;
  coords: { x: number; y: number }; // Percentage positions on custom US map SVG
}

const RADAR_DEALS: HotspotDeal[] = [
  {
    id: 'radar-fl-palmbay',
    property: '842 Eldron Blvd SE',
    city: 'Palm Bay',
    state: 'FL',
    type: 'land',
    typeLabel: 'Lote Constructor (0.23 Ac)',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    owner: 'Arthur Pendleton',
    phone: '(321) 555-7491',
    arv: 34000,
    mao: 14000,
    fee: 18000,
    buyerMatch: 'Carson (@carsonbuysland)',
    strategy: 'Land Wholesaling Infill Lot — 40% del valor de mercado',
    coords: { x: 78, y: 82 },
  },
  {
    id: 'radar-fl-lehigh',
    property: '3914 12th St W',
    city: 'Lehigh Acres',
    state: 'FL',
    type: 'land',
    typeLabel: 'Lote Constructor (0.25 Ac)',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    owner: 'Cynthia Morales',
    phone: '(239) 555-1029',
    arv: 36000,
    mao: 15500,
    fee: 19500,
    buyerMatch: 'Carson (@carsonbuysland)',
    strategy: 'Lote baldío listo con servicios al pie de calle',
    coords: { x: 74, y: 86 },
  },
  {
    id: 'radar-mi-detroit',
    property: '18418 Joann St',
    city: 'Detroit',
    state: 'MI',
    type: 'section8',
    typeLabel: 'Section 8 Single Family',
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
    owner: 'Marcus Vance',
    phone: '(313) 555-8291',
    arv: 135000,
    mao: 62000,
    fee: 10000,
    buyerMatch: 'Richard Taylor (@richardgrandintaylor)',
    strategy: 'Tired Landlord — Renta $1,250/mes con voucher municipal',
    coords: { x: 68, y: 34 },
  },
  {
    id: 'radar-mi-detroit-fourplex',
    property: '2940 W Grand Blvd',
    city: 'Detroit',
    state: 'MI',
    type: 'subto',
    typeLabel: 'Fourplex (4 Unidades)',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    owner: 'David Henderson',
    phone: '(313) 555-4920',
    arv: 240000,
    mao: 17500,
    fee: 10000,
    buyerMatch: 'Richard Taylor (@richardgrandintaylor)',
    strategy: 'Seller Financing — 10% Down, 5% Interés, $1,800 Cash Flow',
    coords: { x: 69, y: 37 },
  },
  {
    id: 'radar-oh-canton',
    property: '519 17th St NW',
    city: 'Canton',
    state: 'OH',
    type: 'code_violation',
    typeLabel: 'Code Violation & Tax Distress',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    owner: 'Robert Langston',
    phone: '(330) 555-0163',
    arv: 145000,
    mao: 45000,
    fee: 10000,
    buyerMatch: 'Jerry Norton & Richard Taylor',
    strategy: 'Multa diaria municipal — Negociación agresiva al 31% ARV',
    coords: { x: 72, y: 44 },
  },
  {
    id: 'radar-al-birmingham',
    property: '1420 4th Ave N',
    city: 'Birmingham',
    state: 'AL',
    type: 'section8',
    typeLabel: 'Tired Landlord SFH',
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
    owner: 'Patricia Cooper',
    phone: '(205) 555-3921',
    arv: 128000,
    mao: 54000,
    fee: 10000,
    buyerMatch: 'FreeWholesaling Cash Buyers',
    strategy: 'Estado pro-inversor sin licencias de wholesale requeridas',
    coords: { x: 64, y: 65 },
  },
  {
    id: 'radar-ga-atlanta',
    property: '782 Cascade Ave SW',
    city: 'Atlanta',
    state: 'GA',
    type: 'code_violation',
    typeLabel: 'Fix & Flip Distressed',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    owner: 'Clarence Washington',
    phone: '(404) 555-8832',
    arv: 285000,
    mao: 145000,
    fee: 15000,
    buyerMatch: 'Jamil Damji / KeyGlee Dispo',
    strategy: 'Mercado de ultra liquidez para asignaciones de $15,000+',
    coords: { x: 70, y: 64 },
  },
];

interface InteractiveDealRadarMapProps {
  onSelectPropertyForCall?: (property: string, phone: string) => void;
  onOpenFlyer?: (lead: MotivatedSellerLead) => void;
}

export default function InteractiveDealRadarMap({
  onSelectPropertyForCall,
  onOpenFlyer,
}: InteractiveDealRadarMapProps) {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'land' | 'section8' | 'code_violation' | 'subto'>('all');
  const [activeDealId, setActiveDealId] = useState<string>(RADAR_DEALS[0].id);

  const filteredDeals = selectedFilter === 'all'
    ? RADAR_DEALS
    : RADAR_DEALS.filter((d) => d.type === selectedFilter);

  const activeDeal = RADAR_DEALS.find((d) => d.id === activeDealId) || RADAR_DEALS[0];

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-4 shadow-xl">
      {/* Title & Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-cyan-400" />
            Radar Satelital GIS & Puntos Calientes (Top 5 Estados)
          </span>
          <h2 className="text-base font-black text-white mt-0.5">
            Geolocalización de Deals de Máxima Motivación & Compradores Activos
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-bold">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-2.5 py-1 rounded-lg transition ${
              selectedFilter === 'all' ? 'bg-cyan-600 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            Todos ({RADAR_DEALS.length})
          </button>
          <button
            onClick={() => setSelectedFilter('land')}
            className={`px-2.5 py-1 rounded-lg transition ${
              selectedFilter === 'land' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-emerald-300'
            }`}
          >
            🌿 Terrenos / Lotes
          </button>
          <button
            onClick={() => setSelectedFilter('section8')}
            className={`px-2.5 py-1 rounded-lg transition ${
              selectedFilter === 'section8' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-indigo-300'
            }`}
          >
            🏠 Section 8
          </button>
          <button
            onClick={() => setSelectedFilter('code_violation')}
            className={`px-2.5 py-1 rounded-lg transition ${
              selectedFilter === 'code_violation' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-amber-300'
            }`}
          >
            ⚠️ Code Violations
          </button>
        </div>
      </div>

      {/* Map Graphic Canvas + Selected Deal Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Radar Graphic Canvas (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-4 relative min-h-[360px] flex flex-col justify-between overflow-hidden shadow-inner">
          {/* Subtle Grid and Map Silhouette Backing */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="flex items-center justify-between z-10 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <Navigation className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
              Escáner de Estados Fáciles (FL, MI, OH, AL, GA)
            </span>
            <span className="text-[10px] text-emerald-400 font-mono">
              ● {filteredDeals.length} Deals detectados
            </span>
          </div>

          {/* Interactive Map Area with Positioned Pins */}
          <div className="relative w-full h-[280px] my-auto">
            {filteredDeals.map((deal) => {
              const isSelected = deal.id === activeDealId;
              return (
                <button
                  key={deal.id}
                  onClick={() => setActiveDealId(deal.id)}
                  style={{ left: `${deal.coords.x}%`, top: `${deal.coords.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-transform ${
                    isSelected ? 'scale-125 z-30' : 'hover:scale-110 z-20'
                  }`}
                  title={`${deal.property} (${deal.city}, ${deal.state})`}
                >
                  <div className="relative flex items-center justify-center">
                    <span
                      className={`absolute w-7 h-7 rounded-full animate-ping opacity-75 ${
                        deal.type === 'land'
                          ? 'bg-emerald-400'
                          : deal.type === 'code_violation'
                          ? 'bg-amber-400'
                          : 'bg-cyan-400'
                      }`}
                    />
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shadow-lg border-2 ${
                        isSelected
                          ? 'bg-white text-slate-950 border-cyan-400 ring-2 ring-cyan-400/50'
                          : deal.type === 'land'
                          ? 'bg-emerald-600 text-white border-emerald-300'
                          : deal.type === 'code_violation'
                          ? 'bg-amber-600 text-white border-amber-300'
                          : 'bg-cyan-600 text-white border-cyan-300'
                      }`}
                    >
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  {/* Pin Hover Label */}
                  <div className="absolute top-7 left-1/2 -translate-x-1/2 bg-slate-950/95 border border-slate-700 px-2 py-0.5 rounded text-[10px] font-bold text-white whitespace-nowrap shadow-md pointer-events-none opacity-0 group-hover:opacity-100 transition">
                    {deal.city}, {deal.state} • ${deal.mao.toLocaleString()}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="z-10 flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-800/60">
            <span>Leyenda: 🟢 Lotes Baldíos | 🟡 Violaciones Código | 🔵 Section 8 / Flips</span>
            <span>Haz clic en un pin para ver el detalle</span>
          </div>
        </div>

        {/* Selected Deal Detail Card (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-4.5 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between">
              <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase border ${activeDeal.badgeColor}`}>
                {activeDeal.typeLabel}
              </span>
              <span className="text-[11px] font-bold text-cyan-400">
                {activeDeal.city}, {activeDeal.state}
              </span>
            </div>

            <h3 className="text-base font-black text-white mt-1.5 leading-snug">
              {activeDeal.property}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Propietario: <strong>{activeDeal.owner}</strong> • Tel: <strong className="text-emerald-400">{activeDeal.phone}</strong>
            </p>

            <div className="mt-3 p-3 bg-slate-950 rounded-xl border border-slate-800/80 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-400">ARV de Mercado:</span>
                <span className="font-bold text-white">${activeDeal.arv.toLocaleString()} USD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Oferta MAO Recomendada:</span>
                <span className="font-bold text-emerald-400">${activeDeal.mao.toLocaleString()} USD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Fee de Asignación Proyectado:</span>
                <span className="font-bold text-cyan-300">+${activeDeal.fee.toLocaleString()} USD</span>
              </div>
              <div className="pt-1.5 border-t border-slate-800 flex justify-between text-[11px]">
                <span className="text-slate-400">Comprador Ideal Emparejado:</span>
                <span className="font-black text-amber-300">{activeDeal.buyerMatch}</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 mt-2.5 italic bg-slate-950/40 p-2 rounded-lg border border-slate-800/40">
              💡 {activeDeal.strategy}
            </p>
          </div>

          {/* Action Triggers */}
          <div className="space-y-1.5 pt-2">
            <button
              onClick={() => onSelectPropertyForCall?.(activeDeal.property, activeDeal.phone)}
              className="w-full py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition shadow-md shadow-emerald-600/20"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              Lanzar Llamada con Vapi ({activeDeal.phone})
            </button>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => {
                  if (onOpenFlyer) {
                    onOpenFlyer({
                      id: activeDeal.id,
                      ownerName: activeDeal.owner,
                      propertyAddress: activeDeal.property,
                      cityState: `${activeDeal.city}, ${activeDeal.state}`,
                      phone: activeDeal.phone,
                      estimatedArv: activeDeal.arv,
                      recommendedMaoOffer: activeDeal.mao,
                      status: 'in_call',
                      leadSource: activeDeal.typeLabel as any,
                      notes: activeDeal.strategy,
                    } as unknown as MotivatedSellerLead);
                  }
                }}
                className="py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition border border-slate-700"
              >
                <Printer className="w-3.5 h-3.5" />
                Flyer PDF
              </button>
              <a
                href={`/sign/lead-canton-realtor`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition border border-slate-700"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Portal E-Sign
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
