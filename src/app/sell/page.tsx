'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Building2,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  ArrowRight,
  Sparkles,
  MapPin,
  Trees,
  Layers,
  FileText,
  BadgeAlert,
  Coins,
  Scale,
  Landmark,
  Home,
  Loader2,
} from 'lucide-react';

export default function SellPropertyPage() {
  const [assetType, setAssetType] = useState('single_family');
  const [address, setAddress] = useState('');
  const [parcelPin, setParcelPin] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [propertyCondition, setPropertyCondition] = useState('as_is_any');
  const [legalSituation, setLegalSituation] = useState('clean_title');
  const [timeline, setTimeline] = useState('asap');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!address && !parcelPin) || !phone || !fullName) return;

    setLoading(true);
    try {
      await fetch('/api/seller-outreach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create_inbound_lead',
          lead: {
            propertyAddress: address || `Parcel / APN: ${parcelPin}`,
            ownerName: fullName,
            phone: phone,
            email: email,
            propertyCondition: `${assetType.toUpperCase()} | ${propertyCondition} | Situación: ${legalSituation}`,
            timeline: timeline,
            leadSource: `Website Inbound (${assetType})`,
          },
        }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-black">
      {/* Top Corporate Nav */}
      <nav className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-500/20">
              AI
            </div>
            <div>
              <span className="font-extrabold text-sm tracking-tight text-white block">
                AI Automated Services LLC
              </span>
              <span className="text-[10px] text-emerald-400 font-mono tracking-wider uppercase block">
                Multi-Asset Acquisitions & Curative Solutions
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="tel:+18005550199"
              className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              (800) 555-0199
            </a>
            <a
              href="#offer-form"
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 transition"
            >
              Get Cash Offer
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 px-4 sm:px-6 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            Houses • Vacant Land • Multifamily • Probates • Tax Deeds • Surplus Funds
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
            We Buy Real Estate Assets <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Nationwide</span> In Any Condition.
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            Whether you own a single-family house, a vacant infill lot, a multifamily complex, an inherited property stuck in probate, or have unclaimed surplus funds from a foreclosure auction, <strong>AI Automated Services LLC</strong> delivers fast cash liquidity and solves complex title situations.
          </p>

          {/* Asset Classes Multi-Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-800">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <Home className="w-4 h-4 text-emerald-400 mb-1" />
              <h2 className="text-xs font-bold text-white">Single-Family (SFH)</h2>
              <p className="text-[11px] text-slate-400">As-is, fire damage, tenant occupied, Section 8.</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <Trees className="w-4 h-4 text-emerald-400 mb-1" />
              <h2 className="text-xs font-bold text-white">Vacant Land & Lots</h2>
              <p className="text-[11px] text-slate-400">Infill parcels, acreage, mobile home land, builder lots.</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <Building2 className="w-4 h-4 text-emerald-400 mb-1" />
              <h2 className="text-xs font-bold text-white">Multifamily & Commercial</h2>
              <p className="text-[11px] text-slate-400">Duplex, Fourplex, apartments, seller finance.</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <Scale className="w-4 h-4 text-purple-400 mb-1" />
              <h2 className="text-xs font-bold text-white">Probate & Inherited</h2>
              <p className="text-[11px] text-slate-400">Heirs out of state, title resolution, no will estates.</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <Landmark className="w-4 h-4 text-amber-400 mb-1" />
              <h2 className="text-xs font-bold text-white">Tax Delinquent & Liens</h2>
              <p className="text-[11px] text-slate-400">Back taxes, code violations, water shut-offs, CCLBA.</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <Coins className="w-4 h-4 text-cyan-400 mb-1" />
              <h2 className="text-xs font-bold text-white">Surplus Funds Recovery</h2>
              <p className="text-[11px] text-slate-400">Overages from tax deeds & foreclosure auctions.</p>
            </div>
          </div>
        </div>

        {/* Lead Capture Form Card */}
        <div id="offer-form" className="lg:col-span-5">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur p-6 sm:p-7 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h2 className="text-xl font-black text-white">Asset Details Received!</h2>
                <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                  Thank you! Our underwriting and acquisitions team at <strong>AI Automated Services LLC</strong> is auditing public records, zoning maps, and comparable sales for this asset. We will contact you within 24 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-3 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200"
                >
                  Submit Another Property or Asset
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                    Request a Direct Cash Offer / Asset Review
                  </h2>
                  <p className="text-[11px] text-slate-400">
                    No obligations. Zero realtor fees. Title fees paid by Buyer.
                  </p>
                </div>

                {/* Asset Category Selector */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    What type of real estate asset do you own? *
                  </label>
                  <select
                    value={assetType}
                    onChange={(e) => setAssetType(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-medium focus:outline-none focus:border-emerald-500 transition"
                  >
                    <option value="single_family">Single-Family House (Residential / SFR)</option>
                    <option value="vacant_lot">Vacant Land / Infill Lot / Mobile Home Parcel</option>
                    <option value="multifamily">Multifamily (Duplex, Fourplex, Apartment Complex)</option>
                    <option value="probate_estate">Inherited Property / Probate Estate</option>
                    <option value="tax_delinquent">Tax Delinquent Property / Government Lien</option>
                    <option value="creative_assumable">House with Existing Mortgage (Assumable / Subject-To)</option>
                    <option value="surplus_claim">Surplus Funds / Overages Claim from Auction</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Property Address or Parcel ID (APN) *
                  </label>
                  <div className="relative">
                    <MapPin className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. 18418 Joann St, Detroit or Parcel #042-198-02-004"
                      className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Your Name / Estate Representative"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(555) 000-0000"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Email Address (For written offer delivery)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Legal / Title Situation
                    </label>
                    <select
                      value={legalSituation}
                      onChange={(e) => setLegalSituation(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500 transition"
                    >
                      <option value="clean_title">Clear Title (No Major Liens)</option>
                      <option value="probate_pending">Probate / Deceased Owner (Heirs Selling)</option>
                      <option value="tax_delinquent">Back Taxes Owed to County</option>
                      <option value="code_violations">City Code Violations / Fines</option>
                      <option value="behind_mortgage">Behind on Mortgage Payments (Pre-Foreclosure)</option>
                      <option value="surplus_recovery">Property Sold at Auction (Unclaimed Funds)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Selling Timeline
                    </label>
                    <select
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500 transition"
                    >
                      <option value="asap">Immediate (7-14 Days)</option>
                      <option value="30_days">Within 30 Days</option>
                      <option value="flexible">Flexible Timeline</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Analyzing Asset Records...
                    </>
                  ) : (
                    <>
                      Get My Cash Offer / Curative Solution
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>

                <p className="text-[10px] text-slate-500 leading-relaxed text-center">
                  By clicking submit, you authorize AI Automated Services LLC and/or assigns to contact you regarding your real estate inquiry. Reply STOP to cancel anytime.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Corporate Multi-Asset Solutions Grid */}
      <section className="border-t border-slate-800/80 bg-slate-900/40 py-14 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Our Complete Acquisition Scope
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Solutions for Every Real Estate Situation
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              We specialize in complex situations that traditional realtors cannot or will not touch.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
              <Trees className="w-5 h-5 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">Vacant Land & Infill Lots</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tired of paying annual property taxes on a vacant parcel? We purchase buildable infill lots, rural acreage, and land with zoning suitable for residential development.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
              <Scale className="w-5 h-5 text-purple-400" />
              <h3 className="text-sm font-bold text-white">Probate & Heirship Clearance</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Inherited a property with multiple out-of-state heirs? Our curative title partners coordinate Letters of Administration, Affidavits of Heirship, and court approval to disburse cash cleanly.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
              <Coins className="w-5 h-5 text-cyan-400" />
              <h3 className="text-sm font-bold text-white">Tax Overages & Surplus Funds</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                If your property was sold at a county tax deed or mortgage foreclosure auction for more than the debt owed, the surplus money belongs to you. We audit and file the court recovery at zero out-of-pocket cost.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-950 py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
          <div>
            <span className="font-bold text-slate-300 block mb-0.5">
              AI Automated Services LLC and/or assigns
            </span>
            <span>
              Real Estate Investments, Curative Title & Asset Acquisitions • All Rights Reserved © {new Date().getFullYear()}
            </span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-emerald-400 transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-emerald-400 transition">
              Terms of Service
            </Link>
            <Link href="/" className="hover:text-white transition">
              Internal Platform
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
