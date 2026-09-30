'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import {
  FileCheck2,
  CheckCircle2,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Lock,
  Printer,
  Calendar,
  Building,
} from 'lucide-react';

export default function ESignPublicPage() {
  const params = useParams();
  const leadId = params?.id as string;

  const [contractData, setContractData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [signerName, setSignerName] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [signSuccess, setSignSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Signature Canvas
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  useEffect(() => {
    if (!leadId) return;
    fetch(`/api/sign/${leadId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.lead) {
          setContractData(data.lead);
          setSignerName(data.lead.ownerName || '');
          if (data.lead.isSigned) {
            setSignSuccess(true);
          }
        } else {
          setErrorMsg(data.error || 'No se encontró el contrato');
        }
      })
      .catch((err) => setErrorMsg(err.message))
      .finally(() => setLoading(false));
  }, [leadId]);

  // Canvas drawing functions
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (contractData?.isSigned || signSuccess) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    setHasSignature(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  const handleSignSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasSignature) {
      alert('Por favor dibuja tu firma con tu dedo o mouse en el recuadro antes de enviar.');
      return;
    }
    if (!signerName.trim()) {
      alert('Por favor escribe tu nombre completo.');
      return;
    }
    if (!agreed) {
      alert('Debes marcar la casilla aceptando los términos de venta.');
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const signatureImage = canvas.toDataURL('image/png');

    setSubmitting(true);
    try {
      const res = await fetch(`/api/sign/${leadId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          signerName,
          signatureImage,
          agreedToTerms: agreed,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSignSuccess(true);
        setContractData({
          ...contractData,
          isSigned: true,
          signerName,
          signatureImage,
          signedAt: data.signedAt,
        });
      } else {
        alert(data.error || 'Error al guardar la firma');
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-200">
        <div className="flex items-center gap-3 text-sm font-semibold">
          <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          Cargando Acuerdo de Compra y Venta (E-Sign Portal)...
        </div>
      </div>
    );
  }

  if (errorMsg || !contractData) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 border border-red-500/40 rounded-2xl p-6 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-white">Contrato No Disponible</h2>
          <p className="text-xs text-slate-400">{errorMsg || 'El enlace puede haber expirado o ser inválido.'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <FileCheck2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black text-white">Portal de Firma Electrónica Segura (E-Sign)</h1>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                  256-Bit SSL Encriptado
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Acuerdo Residencial de Compra y Venta • {contractData.propertyAddress}, {contractData.cityState}
              </p>
            </div>
          </div>

          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <Printer className="w-3.5 h-3.5" />
            Imprimir / Guardar PDF
          </button>
        </div>

        {/* Success Banner if already signed */}
        {signSuccess && (
          <div className="bg-emerald-950/60 border border-emerald-500/50 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4 shadow-lg shadow-emerald-500/10">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0" />
              <div>
                <h3 className="text-sm font-bold text-white">¡Acuerdo Firmado Electrónicamente con Éxito!</h3>
                <p className="text-xs text-emerald-200">
                  Firmado por: <strong>{contractData.signerName}</strong> • Fecha: {new Date(contractData.signedAt || Date.now()).toLocaleString()}
                </p>
              </div>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-extrabold">
              CONTRATO LEGALMENTE VINCULANTE
            </span>
          </div>
        )}

        {/* Key Deal Terms Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <div className="text-[11px] text-slate-400 font-semibold uppercase flex items-center gap-1">
              <Building className="w-3 h-3 text-sky-400" />
              Propiedad en Venta
            </div>
            <div className="text-sm font-bold text-white mt-1 truncate">{contractData.propertyAddress}</div>
            <div className="text-xs text-slate-400">{contractData.cityState}</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <div className="text-[11px] text-slate-400 font-semibold uppercase flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              Precio en Efectivo Acordado
            </div>
            <div className="text-xl font-black text-emerald-400 mt-0.5">
              ${contractData.agreedPrice?.toLocaleString()} USD
            </div>
            <div className="text-[11px] text-slate-400">Fondos garantizados al cierre</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <div className="text-[11px] text-slate-400 font-semibold uppercase flex items-center gap-1">
              <Calendar className="w-3 h-3 text-amber-400" />
              Condiciones de Cierre
            </div>
            <div className="text-sm font-bold text-white mt-1">Cierre en ~21 a 45 días</div>
            <div className="text-[11px] text-slate-400">Comprador cubre gastos de título</div>
          </div>
        </div>

        {/* Contract Text Body */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Texto Completo del Acuerdo (Purchase & Sale Agreement)
            </h2>
            <span className="text-xs text-slate-400">Cláusula 4: Asignabilidad a Terceros Activa</span>
          </div>

          <pre className="bg-slate-950 border border-slate-800 p-5 rounded-xl text-xs text-slate-200 font-mono whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto">
            {contractData.contractText}
          </pre>
        </div>

        {/* Signature Box Section */}
        {!signSuccess ? (
          <form onSubmit={handleSignSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-emerald-400" />
                  Firma Electrónica del Vendedor / Propietario
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Dibuja tu firma con tu dedo (en celular) o ratón (en computadora) en el recuadro blanco a continuación.
                </p>
              </div>

              <button
                type="button"
                onClick={clearSignature}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1 transition"
              >
                <RotateCcw className="w-3 h-3" />
                Borrar Firma
              </button>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Nombre Completo del Firmante (Tal como aparece en el título):
              </label>
              <input
                type="text"
                value={signerName}
                onChange={(e) => setSignerName(e.target.value)}
                placeholder="Ej: John Doe / Robert H. Miller"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                required
              />
            </div>

            {/* Canvas Area */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Recuadro de Firma Digital (Dibuja aquí):
              </label>
              <div className="border-2 border-dashed border-emerald-500/40 rounded-xl overflow-hidden bg-slate-950">
                <canvas
                  ref={canvasRef}
                  width={750}
                  height={180}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="w-full h-44 touch-none cursor-crosshair"
                />
              </div>
              <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
                <span>{hasSignature ? '✓ Firma registrada en el lienzo' : 'Por favor firma dentro del recuadro'}</span>
                <span>Firma legal bajo ESIGN Act & UETA de EE.UU.</span>
              </div>
            </div>

            {/* Checkbox agreement */}
            <label className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-700 bg-slate-900"
              />
              <span className="text-xs text-slate-300 leading-relaxed">
                Confirmo que he leído y acepto los términos del acuerdo de compra y venta por <strong>${contractData.agreedPrice?.toLocaleString()} USD</strong>, autorizo mi firma digital como legalmente válida y entiendo que la compañía de título coordinará el cierre.
              </span>
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-600/25 transition disabled:opacity-50"
            >
              <CheckCircle2 className="w-5 h-5" />
              {submitting ? 'Guardando y Certificando Firma Electrónica...' : 'Firmar y Enviar Contrato Formalmente'}
            </button>
          </form>
        ) : (
          <div className="bg-slate-900 border border-emerald-500/40 rounded-2xl p-6 space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Certificado de Firma Electrónica Registrada
            </h4>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-sm font-bold text-white">Firmado por: {contractData.signerName}</div>
                <div className="text-xs text-emerald-400">
                  Fecha de Firma: {new Date(contractData.signedAt || Date.now()).toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-500 font-mono">
                  Certificado de Autenticidad #WS-{leadId.slice(0, 8).toUpperCase()}-ESIGN
                </div>
              </div>

              {contractData.signatureImage && (
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <img src={contractData.signatureImage} alt="Firma Electrónica" className="h-16 object-contain" />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
