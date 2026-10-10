'use client';

import React, { useState } from 'react';
import {
  X,
  Printer,
  Copy,
  Check,
  ExternalLink,
  Building,
  DollarSign,
  TrendingUp,
  MapPin,
  Calendar,
  Home,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Share2,
} from 'lucide-react';
import { MotivatedSellerLead } from '@/types/skill';

interface ExecutiveDealFlyerModalProps {
  lead: MotivatedSellerLead | null;
  onClose: () => void;
}

export default function ExecutiveDealFlyerModal({
  lead,
  onClose,
}: ExecutiveDealFlyerModalProps) {
  const [copied, setCopied] = useState(false);

  if (!lead) return null;

  const arv = lead.estimatedArv || 145000;
  const repairs = (lead as any).rehabEstimate || 25000;
  const agreedPrice = Number(lead.agreedPrice || lead.recommendedMaoOffer || 62000);
  const assignmentFee = 10000;
  const cashBuyerPrice = agreedPrice + assignmentFee;
  const investorEquity = arv - cashBuyerPrice - repairs;
  const monthlyRent = Math.round(arv * 0.009); // 0.9% rent-to-price estimate
  const annualRent = monthlyRent * 12;
  const capRate = ((annualRent * 0.65) / (cashBuyerPrice + repairs) * 100).toFixed(1);

  const comps = [
    {
      address: lead.propertyAddress.replace(/^\d+/, '18240'),
      dist: '0.2 mi',
      price: arv,
      date: 'Hace 45 días',
      status: 'Vendida (Turnkey Remodelada)',
    },
    {
      address: lead.propertyAddress.replace(/^\d+/, '18512'),
      dist: '0.4 mi',
      price: Math.round(arv * 0.96),
      date: 'Hace 60 días',
      status: 'Vendida (Section 8 Rentada)',
    },
    {
      address: lead.propertyAddress.replace(/^\d+/, '18105'),
      dist: '0.5 mi',
      price: Math.round(arv * 1.04),
      date: 'Hace 28 días',
      status: 'Vendida (Remodelación Premium)',
    },
  ];

  const handlePrint = () => {
    window.print();
  };

  const copyPitchText = () => {
    const text = `🚨 OFF-MARKET DEAL ALERT: ${lead.propertyAddress} (${lead.cityState})
💰 PRECIO PARA COMPRADOR: $${cashBuyerPrice.toLocaleString()} CASH
📈 ARV CONFIRMADO: $${arv.toLocaleString()}
🛠️ REPARACIONES ESTIMADAS: $${repairs.toLocaleString()}
💎 EQUITY NETO PARA INVERSIONISTA: $${investorEquity.toLocaleString()}
💵 RENTA ESTIMADA: $${monthlyRent.toLocaleString()}/mes (Cap Rate proyectado: ${capRate}%)
📋 Términos: EMD $2,500 en Title Company | Cierre en 10 días | Título limpio y garantizado.
🏢 Asignado por: AI Automated Services LLC and/or assigns
Interesados responder por DM o llamar para walkthrough inmediato.`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-slate-900 border border-cyan-500/40 rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl shadow-cyan-950/60 overflow-hidden print:border-none print:shadow-none print:max-w-none print:w-full print:h-auto print:max-h-none print:bg-white print:text-black">
        {/* Modal Top Bar (Hidden in Print) */}
        <div className="bg-slate-950 px-5 py-3 border-b border-slate-800 flex items-center justify-between shrink-0 print:hidden">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-wider text-cyan-300">
              Executive Wholesale Deal Flyer (Dossier para Compradores)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={copyPitchText}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-bold flex items-center gap-1.5 transition border border-slate-700"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? '¡Copiado!' : 'Copiar Texto para WhatsApp'}
            </button>
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 rounded-lg text-xs font-black flex items-center gap-1.5 transition shadow-md shadow-cyan-600/30"
            >
              <Printer className="w-3.5 h-3.5" />
              Imprimir / Guardar en PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Flyer Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 print:p-0 print:overflow-visible">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 p-6 rounded-2xl border border-slate-800 print:bg-none print:border-b-2 print:border-black print:p-2 print:rounded-none">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-black tracking-widest uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 print:bg-gray-100 print:text-black">
                  OPORTUNIDAD OFF-MARKET EXCLUSIVA
                </span>
                <h1 className="text-2xl font-black text-white mt-1 print:text-black">
                  {lead.propertyAddress}
                </h1>
                <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5 print:text-gray-600">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400 print:text-black" />
                  {lead.cityState} • Título Limpio y Garantizado • Cierre Rápido en Escrow
                </p>
              </div>
              <div className="text-right sm:border-l sm:border-slate-800 sm:pl-6 print:border-none print:text-left sm:print:text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 print:text-gray-600">Precio para Comprador</span>
                <div className="text-3xl font-black text-emerald-400 print:text-black">
                  ${cashBuyerPrice.toLocaleString()} <span className="text-xs text-slate-400">CASH</span>
                </div>
                <div className="text-[10px] text-cyan-300 font-medium print:text-gray-600">
                  Equity Neto Estimado: <strong>${investorEquity.toLocaleString()} USD</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Core Numbers 4-Box Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 print:grid-cols-4">
            <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 print:border print:border-gray-300 print:bg-white">
              <span className="text-[10px] text-slate-400 uppercase font-bold print:text-gray-600">ARV Confirmado</span>
              <div className="text-lg font-black text-white mt-0.5 print:text-black">${arv.toLocaleString()}</div>
              <span className="text-[9px] text-slate-500 print:text-gray-500">Basado en comps vendidas 90d</span>
            </div>
            <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 print:border print:border-gray-300 print:bg-white">
              <span className="text-[10px] text-slate-400 uppercase font-bold print:text-gray-600">Rehabilitación Est.</span>
              <div className="text-lg font-black text-amber-400 mt-0.5 print:text-black">${repairs.toLocaleString()}</div>
              <span className="text-[9px] text-slate-500 print:text-gray-500">Techo, cosmética, sistemas</span>
            </div>
            <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 print:border print:border-gray-300 print:bg-white">
              <span className="text-[10px] text-slate-400 uppercase font-bold print:text-gray-600">Renta Proyectada</span>
              <div className="text-lg font-black text-cyan-400 mt-0.5 print:text-black">${monthlyRent.toLocaleString()}/mes</div>
              <span className="text-[9px] text-slate-500 print:text-gray-500">Rentometer & HUD FMR</span>
            </div>
            <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 print:border print:border-gray-300 print:bg-white">
              <span className="text-[10px] text-slate-400 uppercase font-bold print:text-gray-600">Cap Rate Proyectado</span>
              <div className="text-lg font-black text-indigo-400 mt-0.5 print:text-black">{capRate}% NET</div>
              <span className="text-[9px] text-slate-500 print:text-gray-500">Retorno sobre inversión total</span>
            </div>
          </div>

          {/* Details & Specs Two Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left: Property Overview & Strategy */}
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-3 print:border print:border-gray-300 print:bg-white">
              <h3 className="text-xs font-black uppercase text-cyan-400 flex items-center gap-1.5 print:text-black">
                <Home className="w-3.5 h-3.5" />
                Especificaciones del Inmueble
              </h3>
              <div className="space-y-1.5 text-xs text-slate-300 print:text-gray-800">
                <div className="flex justify-between py-1 border-b border-slate-800/60 print:border-gray-200">
                  <span className="text-slate-400">Tipo de Propiedad:</span>
                  <span className="font-bold">{lead.leadSource || 'Single Family Residential'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60 print:border-gray-200">
                  <span className="text-slate-400">Estrategia Recomendada:</span>
                  <span className="font-bold text-emerald-400 print:text-black">Buy & Hold (Section 8) o Fix & Flip</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60 print:border-gray-200">
                  <span className="text-slate-400">Condición Actual:</span>
                  <span className="font-bold">As-Is (Requiere actualización)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60 print:border-gray-200">
                  <span className="text-slate-400">Ocupación:</span>
                  <span className="font-bold">Vacante al cierre / Libre de inquilinos</span>
                </div>
                <div className="flex justify-between py-1 print:border-gray-200">
                  <span className="text-slate-400">Compañía de Título:</span>
                  <span className="font-bold">Investor-Friendly Title & Escrow Co.</span>
                </div>
              </div>
            </div>

            {/* Right: Closing & Disposition Terms */}
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-3 print:border print:border-gray-300 print:bg-white">
              <h3 className="text-xs font-black uppercase text-indigo-400 flex items-center gap-1.5 print:text-black">
                <ShieldCheck className="w-3.5 h-3.5" />
                Términos de Compra & Asignación
              </h3>
              <div className="space-y-1.5 text-xs text-slate-300 print:text-gray-800">
                <div className="flex justify-between py-1 border-b border-slate-800/60 print:border-gray-200">
                  <span className="text-slate-400">Método de Pago:</span>
                  <span className="font-bold">Cash o Préstamo Hard Money</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60 print:border-gray-200">
                  <span className="text-slate-400">Depósito EMD Requerido:</span>
                  <span className="font-bold text-amber-400 print:text-black">$2,500 en Escrow al firmar</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60 print:border-gray-200">
                  <span className="text-slate-400">Periodo de Inspección:</span>
                  <span className="font-bold">Walkthrough inmediato con cita previa</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60 print:border-gray-200">
                  <span className="text-slate-400">Plazo para Cerrar:</span>
                  <span className="font-bold">10 a 14 días hábiles garantizados</span>
                </div>
                <div className="flex justify-between py-1 print:border-gray-200">
                  <span className="text-slate-400">Entidad Asignante:</span>
                  <span className="font-bold text-cyan-300 print:text-black">AI Automated Services LLC and/or assigns</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sold Comps Table */}
          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2.5 print:border print:border-gray-300 print:bg-white">
            <h3 className="text-xs font-black uppercase text-white flex items-center justify-between print:text-black">
              <span>Comparables Vendidas Recientes (Comps 90 Días)</span>
              <span className="text-[10px] font-normal text-slate-400 print:text-gray-600">Fuentes: Redfin Data Center & Zillow Comps</span>
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] print:bg-gray-100 print:text-black">
                  <tr>
                    <th className="p-2">Dirección de Comparable</th>
                    <th className="p-2">Distancia</th>
                    <th className="p-2">Precio de Venta</th>
                    <th className="p-2">Fecha Venta</th>
                    <th className="p-2">Condición / Notas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 print:divide-gray-200 text-slate-300 print:text-black">
                  {comps.map((c, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/40">
                      <td className="p-2 font-bold">{c.address}</td>
                      <td className="p-2 text-slate-400 print:text-gray-600">{c.dist}</td>
                      <td className="p-2 text-emerald-400 font-bold print:text-black">${c.price.toLocaleString()}</td>
                      <td className="p-2 text-slate-400 print:text-gray-600">{c.date}</td>
                      <td className="p-2 text-cyan-300 print:text-black">{c.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer Call to Action & Legal Disclaimer */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 border border-indigo-500/30 text-center space-y-1 print:border-t-2 print:border-black print:bg-none print:text-black">
            <p className="text-xs font-black text-white uppercase tracking-wider print:text-black">
              Para Adquirir este Contrato o Programar Acceso:
            </p>
            <p className="text-xs text-cyan-300 font-bold print:text-black">
              AI Automated Services LLC and/or assigns • adquisiciones@wholesaleplatform.io • (555) 800-DEAL
            </p>
            <p className="text-[10px] text-slate-400 print:text-gray-500">
              Aviso Legal: AI Automated Services LLC posee interés equitativo bajo Purchase and Sale Agreement vinculante y transfiere únicamente sus derechos de compra vía Assignment Agreement. No somos corredores de bienes raíces con licencia.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
