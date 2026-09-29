'use client';

import React, { useState } from 'react';
import { FileSignature, Copy, Check, Download } from 'lucide-react';

export default function ContractAndScriptGenerator() {
  const [docType, setDocType] = useState<'psa' | 'assignment'>('psa');
  const [sellerName, setSellerName] = useState('John & Mary Smith');
  const [buyerName, setBuyerName] = useState('Tu Inversiones LLC and/or assigns');
  const [endBuyerName, setEndBuyerName] = useState('Tampa Cash Flippers LLC');
  const [propertyAddress, setPropertyAddress] = useState('1420 Oak Ave, Tampa, FL 33602');
  const [purchasePrice, setPurchasePrice] = useState('165,000');
  const [assignmentFee, setAssignmentFee] = useState('15,000');
  const [inspectionDays, setInspectionDays] = useState('14');
  const [emd, setEmd] = useState('100');
  const [copied, setCopied] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  const contractText =
    docType === 'psa'
      ? `REAL ESTATE PURCHASE AND SALE AGREEMENT (WHOLESALE AS-IS)
Effective Date: ${today}

1. PARTIES:
Seller(s): ${sellerName} ("Seller")
Buyer: ${buyerName} ("Buyer")

2. PROPERTY:
Seller agrees to sell and Buyer agrees to buy the real property located at:
${propertyAddress} (including all fixtures and improvements thereon).

3. PURCHASE PRICE & EARNEST MONEY:
- Total Purchase Price: $${purchasePrice} USD (Cash at Closing)
- Earnest Money Deposit (EMD): $${emd} USD to be deposited with the closing Title Company within 5 business days after the Inspection Period.

4. CONDITION OF PROPERTY (AS-IS):
Property is being sold strictly "AS-IS, WHERE-IS", with Seller making no warranties regarding physical condition. Buyer shall pay all standard closing costs; Seller shall leave no personal trash constraints if agreed.

5. INSPECTION & DUE DILIGENCE PERIOD:
Buyer shall have ${inspectionDays} business days from the Effective Date to inspect the Property and perform due diligence. Buyer may cancel this Agreement at Buyer's sole discretion prior to expiration of the Inspection Period by written notice to Seller and receive a 100% refund of any EMD.

6. ASSIGNMENT CLAUSE:
Buyer may assign this Agreement to another party or entity without further consent from Seller. Buyer shall also have reasonable access to show the Property to partners, contractors, and assignees.

7. CLEAR MARKETABLE TITLE:
Seller shall convey marketable title free and clear of all liens, mortgages, and code encumbrances (paid out of closing proceeds).

SELLER SIGNATURE: ___________________________   Date: ___________
(${sellerName})

BUYER SIGNATURE:  ___________________________   Date: ___________
(${buyerName})`
      : `ASSIGNMENT OF REAL ESTATE PURCHASE AND SALE AGREEMENT
Effective Date: ${today}

1. PARTIES:
Assignor (Original Buyer): ${buyerName}
Assignee (End Cash Buyer): ${endBuyerName}

2. ORIGINAL CONTRACT REFERENCE:
Assignor entered into a Real Estate Purchase and Sale Agreement with ${sellerName} ("Seller") for the property located at:
${propertyAddress}
with an original contract purchase price of $${purchasePrice} USD.

3. ASSIGNMENT FEE & TOTAL CONSIDERATION:
In consideration of an Assignment Fee of $${assignmentFee} USD, Assignor hereby assigns all rights, title, and interest in the Original Purchase Agreement to Assignee.
- Original Contract Price: $${purchasePrice} USD
- Assignment Fee to Assignor: $${assignmentFee} USD

4. NON-REFUNDABLE EARNEST MONEY DEPOSIT:
Assignee shall deposit a NON-REFUNDABLE Earnest Money Deposit of $3,000 USD with the closing Title Company within 24 hours of executing this Assignment Agreement.

5. ASSUMPTION OF OBLIGATIONS:
Assignee agrees to fulfill all terms, conditions, and closing dates stipulated in the Original Purchase and Sale Agreement.

ASSIGNOR SIGNATURE: ___________________________   Date: ___________
(${buyerName})

ASSIGNEE SIGNATURE: ___________________________   Date: ___________
(${endBuyerName})`;

  const copyContract = () => {
    navigator.clipboard.writeText(contractText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const downloadTxt = () => {
    const blob = new Blob([contractText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${docType === 'psa' ? 'Purchase_Sale_Agreement' : 'Assignment_Contract'}_${propertyAddress.slice(0, 15).replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-slate-900/90 border border-purple-500/30 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400">
            <FileSignature className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              Ejecutor: Generador de Contratos Wholesale (PSA & Assignment)
            </h3>
            <p className="text-sm text-slate-400">
              Genera contratos simples de 1 página con cláusulas de inspección y asignación listos para DocuSign/SignNow.
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setDocType('psa')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
              docType === 'psa'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            1. Purchase & Sale (Vendedor)
          </button>
          <button
            type="button"
            onClick={() => setDocType('assignment')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
              docType === 'assignment'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            2. Assignment (Cash Buyer)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 space-y-3">
          <div>
            <label className="block text-xs text-slate-400 mb-1">Nombre del Vendedor (Seller)</label>
            <input
              type="text"
              value={sellerName}
              onChange={(e) => setSellerName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">Tu Nombre / LLC (Buyer / Assignor)</label>
            <input
              type="text"
              value={buyerName}
              onChange={(e) => setBuyerName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
            />
          </div>
          {docType === 'assignment' && (
            <div>
              <label className="block text-xs text-slate-400 mb-1">Cash Buyer Final (Assignee)</label>
              <input
                type="text"
                value={endBuyerName}
                onChange={(e) => setEndBuyerName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>
          )}
          <div>
            <label className="block text-xs text-slate-400 mb-1">Dirección de la Propiedad</label>
            <input
              type="text"
              value={propertyAddress}
              onChange={(e) => setPropertyAddress(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Precio Compra ($)</label>
              <input
                type="text"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>
            {docType === 'psa' ? (
              <>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Días Inspección</label>
                  <input
                    type="text"
                    value={inspectionDays}
                    onChange={(e) => setInspectionDays(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">EMD ($)</label>
                  <input
                    type="text"
                    value={emd}
                    onChange={(e) => setEmd(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </>
            ) : (
              <div className="col-span-2">
                <label className="block text-xs text-slate-400 mb-1">Tu Assignment Fee ($)</label>
                <input
                  type="text"
                  value={assignmentFee}
                  onChange={(e) => setAssignmentFee(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-purple-300">
              Vista Previa del Contrato Legal
            </span>
            <div className="flex gap-2">
              <button
                onClick={copyContract}
                className="text-xs px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copiado' : 'Copiar'}
              </button>
              <button
                onClick={downloadTxt}
                className="text-xs px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                Descargar Contrato
              </button>
            </div>
          </div>
          <pre className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-slate-300 font-mono whitespace-pre-wrap max-h-72 overflow-y-auto">
            {contractText}
          </pre>
        </div>
      </div>
    </div>
  );
}
