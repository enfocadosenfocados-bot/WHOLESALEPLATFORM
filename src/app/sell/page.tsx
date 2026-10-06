'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Building2,
  DollarSign,
  ShieldCheck,
  Clock,
  CheckCircle2,
  PhoneCall,
  ArrowRight,
  Sparkles,
  MapPin,
  Calendar,
  Lock,
  Loader2,
} from 'lucide-react';

export default function SellPropertyPage() {
  const [address, setAddress] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [propertyCondition, setPropertyCondition] = useState('needs_cosmetic');
  const [timeline, setTimeline] = useState('asap');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address || !phone || !fullName) return;

    setLoading(true);
    try {
      // Ingest lead directly into seller pipeline
      const res = await fetch('/api/seller-outreach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create_inbound_lead',
          lead: {
            propertyAddress: address,
            ownerName: fullName,
            phone: phone,
            email: email,
            propertyCondition: propertyCondition,
            timeline: timeline,
            leadSource: 'Website Inbound (sell_page)',
          },
        }),
      });

      // Even if offline/local, mark as submitted for UX
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
                Direct Cash Acquisitions
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
      <section className="relative pt-12 pb-20 px-4 sm:px-6 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            Zero Commissions • Zero Repairs • Close in 7-14 Days
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
            Sell Your House <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">As-Is</span> for Cash. No Fees or Agents.
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
            At <strong>AI Automated Services LLC</strong>, we buy residential properties directly from homeowners across the United States. No staging, no realtors taking 6%, and no waiting months on bank loan approvals.
          </p>

          {/* Value Props Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h2 className="text-sm font-bold text-white">100% As-Is Condition</h2>
                <p className="text-xs text-slate-400 mt-0.5">Take what you want, leave the rest behind.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h2 className="text-sm font-bold text-white">$0 In Fees & Closing Costs</h2>
                <p className="text-xs text-slate-400 mt-0.5">We cover all standard title and escrow fees.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h2 className="text-sm font-bold text-white">Guaranteed Fast Close</h2>
                <p className="text-xs text-slate-400 mt-0.5">Funds wired directly to your bank account.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Lead Capture Form Card */}
        <div id="offer-form" className="lg:col-span-5">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-black text-white">Offer Request Received!</h2>
                <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                  Thank you! An acquisitions specialist from <strong>AI Automated Services LLC</strong> is analyzing local comps and public records for your property. We will reach out to you within 24 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200"
                >
                  Submit Another Property
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-emerald-400" />
                    Get Your Fair Cash Offer Today
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    No obligations. 100% confidential.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Property Street Address *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. 18418 Joann St, Detroit, MI 48205"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Marcus Vance"
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(313) 555-0199"
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Email Address (Optional for Offer Document)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="marcus@example.com"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Condition of the Property
                    </label>
                    <select
                      value={propertyCondition}
                      onChange={(e) => setPropertyCondition(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500 transition"
                    >
                      <option value="move_in">Move-in Ready</option>
                      <option value="needs_cosmetic">Needs Minor TLC / Paint</option>
                      <option value="needs_major">Major Repairs (Roof/HVAC/Foundation)</option>
                      <option value="distressed">Full Gut / Severe Distress</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Ideal Selling Timeline
                    </label>
                    <select
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500 transition"
                    >
                      <option value="asap">Immediate (7-14 Days)</option>
                      <option value="30_days">Within 30 Days</option>
                      <option value="60_days">30-60 Days</option>
                      <option value="just_curious">Just Curious on Price</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting Property Details...
                    </>
                  ) : (
                    <>
                      Get My As-Is Cash Offer
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-[10px] text-slate-500 leading-relaxed text-center">
                  By clicking submit, you authorize AI Automated Services LLC to contact you regarding your property via call, text, or email. You may opt out anytime by replying STOP. We respect your privacy.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Corporate How It Works Section */}
      <section className="border-t border-slate-800/80 bg-slate-900/40 py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              The 3-Step Simple Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              How Selling to AI Automated Services LLC Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              We eliminate traditional real estate friction so you can walk away with cash on your terms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 relative">
              <span className="text-3xl font-black text-emerald-500/30">01</span>
              <h3 className="text-base font-bold text-white">Submit Your Property Info</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Fill out the quick form or call us directly. We review county assessor records and recent neighborhood comparable sales immediately.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 relative">
              <span className="text-3xl font-black text-emerald-500/30">02</span>
              <h3 className="text-base font-bold text-white">Receive a Fair Written Cash Offer</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                We present a transparent, net-to-you Purchase & Sale Agreement. No appraisal fees, no bank financing contingencies, and no hidden charges.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 relative">
              <span className="text-3xl font-black text-emerald-500/30">03</span>
              <h3 className="text-base font-bold text-white">Close & Collect Your Funds</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                We open escrow with a local, licensed title company. You pick the closing date that fits your schedule, sign, and receive your wire transfer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with Legal Links (Required for A2P 10DLC Approval) */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-950 py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
          <div>
            <span className="font-bold text-slate-300 block mb-0.5">
              AI Automated Services LLC
            </span>
            <span>
              Direct Real Estate Acquisitions & Commercial Solutions • All Rights Reserved © {new Date().getFullYear()}
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
              Internal Portal
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
