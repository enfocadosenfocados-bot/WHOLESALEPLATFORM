'use client';

import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Copy,
  Check,
  Printer,
  FileCheck2,
  AlertTriangle,
  ExternalLink,
  Lock,
  Building,
} from 'lucide-react';
import { MotivatedSellerLead } from '@/types/skill';

interface LegalShieldMemorandumModalProps {
  lead: MotivatedSellerLead | null;
  onClose: () => void;
}

export default function LegalShieldMemorandumModal({
  lead,
  onClose,
}: LegalShieldMemorandumModalProps) {
  const [copied, setCopied] = useState(false);
  const [copiedGuide, setCopiedGuide] = useState(false);

  if (!lead) return null;

  const todayStr = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const memorandumText = `RECORDING REQUESTED BY AND
WHEN RECORDED MAIL TO:
AI Automated Services LLC and/or assigns
Attn: Legal Department / Acquisitions Escrow
Email: title@wholesaleplatform.io

SPACE ABOVE THIS LINE FOR RECORDER'S USE ONLY
--------------------------------------------------------------------------------
MEMORANDUM OF PURCHASE AND SALE AGREEMENT
(NOTICE OF EQUITABLE INTEREST IN REAL PROPERTY)

STATE OF: ${lead.cityState?.split(',')[1]?.trim() || 'FL'}
COUNTY OF: ${lead.cityState?.split(',')[0]?.trim() || 'County'}

NOTICE IS HEREBY GIVEN that AI Automated Services LLC and/or assigns ("Buyer"), whose address is c/o WholesalePlatform Title Escrow, has entered into that certain unrecorded Purchase and Sale Agreement dated ${todayStr}, with:

SELLER: ${lead.ownerName} ("Seller")
PROPERTY ADDRESS: ${lead.propertyAddress}
PARCEL IDENTIFICATION / TAX ID: ${lead.propertyAddress.replace(/[^0-9]/g, '').slice(0, 8) || 'PARCEL-001'}
LEGAL DESCRIPTION: Lot as recorded in the Public Records of said County, commonly known as ${lead.propertyAddress}.

1. EQUITABLE INTEREST: Pursuant to said Agreement, Seller has agreed to sell and Buyer has agreed to buy the real property described above. Buyer holds equitable title and rights of first priority in and to the property.
2. NOTICE TO THIRD PARTIES: Any person or entity acquiring any interest in, title to, or lien upon the Property does so subject to the prior rights and equitable interest of Buyer under said Purchase Agreement.
3. INQUIRIES: Inquiries regarding this Memorandum or any requests for release, payoff, or settlement statement must be directed in writing to AI Automated Services LLC and/or assigns at title@wholesaleplatform.io.

IN WITNESS WHEREOF, the Buyer has executed this Memorandum of Purchase and Sale Agreement on this day of ${todayStr}.

BUYER:
AI Automated Services LLC and/or assigns

By: ____________________________________________
    Authorized Officer / Acquisitions Specialist

NOTARY ACKNOWLEDGMENT
State of _____________________
County of ____________________

On this _____ day of ____________, 20___, before me, the undersigned Notary Public, personally appeared the authorized representative of AI Automated Services LLC, known to me (or proved to me on the basis of satisfactory evidence) to be the person whose name is subscribed to within this instrument, and acknowledged that he/she executed the same for the purposes therein contained.

WITNESS my hand and official seal.

_______________________________________________
Notary Public, State of _________________________
My Commission Expires: ________________________`;

  const copyText = () => {
    navigator.clipboard.writeText(memorandumText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const copyRecordingGuide = () => {
    const guide = `GUÍA DE RADICACIÓN (RECORDING) DEL MEMORANDUM OF AGREEMENT:
1. Firma el documento ante un Notario Público (puedes usar OneNotary o Notarize.com por $25 en 10 minutos).
2. Ingresa al portal del Clerk of Court / County Recorder del condado donde está la propiedad (o usa e-recording con Simplifile.com).
3. Radica el documento bajo la categoría "Memorandum of Contract" o "Notice of Agreement". El costo oscila entre $10 y $25 USD.
4. Esto crea una "Nube en el Título" (Cloud on Title). Si el vendedor intenta venderle a otro, la Title Company detendrá el cierre y tendrá que pagarte tu Assignment Fee para que firmes el "Release of Memorandum".`;

    navigator.clipboard.writeText(guide);
    setCopiedGuide(true);
    setTimeout(() => setCopiedGuide(false), 2200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-slate-900 border border-emerald-500/40 rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl shadow-emerald-950/60 overflow-hidden">
        {/* Header */}
        <div className="bg-slate-950 px-5 py-3 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-black uppercase tracking-wider text-emerald-300">
              Blindaje Legal: Memorandum of Agreement (Cloud on Title)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={copyRecordingGuide}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold flex items-center gap-1.5 transition border border-slate-700"
            >
              {copiedGuide ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />}
              {copiedGuide ? '¡Guía Copiada!' : 'Copiar Instrucciones'}
            </button>
            <button
              onClick={copyText}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-black flex items-center gap-1.5 transition shadow-md shadow-emerald-600/30"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? '¡Copiado!' : 'Copiar Documento'}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
          {/* Alert Explanatory Box */}
          <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 space-y-1.5">
            <div className="font-bold flex items-center gap-1.5 text-emerald-300">
              <ShieldCheck className="w-4 h-4" />
              ¿Por qué este documento protege tu comisión al 100%?
            </div>
            <p className="text-[11px] text-emerald-100/90 leading-relaxed">
              Al radicar este <strong>Memorandum</strong> en la corte del condado por $10-$20, colocas un aviso público oficial en los registros inmobiliarios. 
              Si el vendedor intenta retractarse o venderle a espaldas tuyas a otro inversionista o realtor, <strong>ninguna compañía de título podrá emitir seguro ni cerrar la transacción</strong> hasta que tú firmes la liberación y cobres tu dinero.
            </p>
          </div>

          {/* Document Preview Box */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-[11px] text-slate-300 leading-relaxed max-h-96 overflow-y-auto whitespace-pre-wrap select-all">
            {memorandumText}
          </div>

          {/* Quick Steps Card */}
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <span className="font-bold text-white text-xs uppercase tracking-wide">
              Pasos para Radicar en 24 Horas:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
              <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                <strong className="text-cyan-300 block">1. Notaría Online</strong>
                Entra a OneNotary o Notarize.com y fírmalo ante notario digital ($25).
              </div>
              <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                <strong className="text-cyan-300 block">2. E-Recording</strong>
                Sube el PDF a Simplifile.com o al portal web del County Clerk ($10-$15 fee).
              </div>
              <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                <strong className="text-cyan-300 block">3. Trato Blindado</strong>
                Tu posición queda grabada en el título hasta la fecha de cierre.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
