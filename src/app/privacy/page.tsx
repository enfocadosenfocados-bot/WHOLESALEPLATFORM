import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft, Lock } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | AI Automated Services LLC',
  description: 'Official Privacy Policy and A2P 10DLC SMS Compliance for AI Automated Services LLC.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-emerald-500 selection:text-black">
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href="/sell"
            className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            A2P 10DLC & TCPA Compliant
          </span>
        </div>
      </header>

      {/* Policy Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8 leading-relaxed text-sm">
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-black text-white tracking-tight">Privacy Policy</h1>
          <p className="text-xs text-slate-400 mt-2">
            Last Updated: October 6, 2026 • Legal Entity: <strong>AI Automated Services LLC</strong>
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">1. Introduction & Scope</h2>
          <p className="text-slate-300">
            AI Automated Services LLC (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates real estate acquisition services across the United States. We respect your privacy and are committed to protecting personal information collected through our website, communications, and acquisition platforms.
          </p>
        </section>

        {/* CRITICAL CLAUSE REQUIRED BY MOBILE CARRIERS FOR A2P 10DLC APPROVAL */}
        <section className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-2">
          <h2 className="text-base font-bold text-emerald-300 flex items-center gap-2">
            <Lock className="w-4 h-4" />
            2. Strict Non-Disclosure & Mobile Data Protection (A2P 10DLC Guarantee)
          </h2>
          <p className="text-xs text-emerald-100 font-medium leading-relaxed">
            <strong>No mobile information will be shared with third parties/affiliates for marketing/promotional purposes.</strong> All the above categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties under any circumstances.
          </p>
          <p className="text-xs text-slate-300 mt-1">
            We will not sell, rent, lease, or share your telephone numbers, contact information, or SMS consent records with any external marketing agencies, lead brokers, or advertisers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">3. Information We Collect</h2>
          <p className="text-slate-300">
            When you request an all-cash property evaluation or interact with our representatives, we may collect:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-slate-300 text-xs">
            <li><strong>Contact Details:</strong> Full name, telephone number, mailing address, and email address.</li>
            <li><strong>Property Details:</strong> Physical address, condition, estimated repairs needed, occupancy status, and desired selling timeline.</li>
            <li><strong>Public Records Data:</strong> Information obtained from county property appraisers, tax collectors, and public deed records.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">4. How We Use Your Information</h2>
          <p className="text-slate-300">
            We use collected data solely for legitimate business operations relating to real estate transactions:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-slate-300 text-xs">
            <li>Calculating accurate, As-Is cash offers based on comparable market sales.</li>
            <li>Preparing formal Purchase and Sale Agreements (PSA), amendments, and title documents.</li>
            <li>Communicating transaction updates via phone, SMS, or email.</li>
            <li>Coordinating title search and closing details with licensed title and escrow companies.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">5. SMS / Text Messaging Terms & Opt-Out (TCPA Compliance)</h2>
          <p className="text-slate-300">
            If you provide your phone number to AI Automated Services LLC, you may receive conversational SMS text messages regarding your property evaluation or transaction updates. Message frequency varies based on transaction status. Message and data rates may apply.
          </p>
          <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 text-xs space-y-1 text-slate-300">
            <p><strong>To Stop Receiving Messages:</strong> You may opt out of receiving SMS messages at any time by replying <strong>&quot;STOP&quot;</strong>, <strong>&quot;END&quot;</strong>, <strong>&quot;CANCEL&quot;</strong>, or <strong>&quot;UNSUBSCRIBE&quot;</strong> to any text message received from us.</p>
            <p><strong>Customer Care:</strong> For assistance, reply <strong>&quot;HELP&quot;</strong> or contact our team directly at (800) 555-0199 or via email at info@aiautomatedservices.com.</p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">6. Contact Information</h2>
          <p className="text-slate-300">
            For questions regarding this Privacy Policy or our data practices, please contact:
          </p>
          <div className="text-xs text-slate-400 font-mono space-y-0.5">
            <p className="text-white font-bold">AI Automated Services LLC</p>
            <p>Direct Acquisitions Department</p>
            <p>Email: legal@aiautomatedservices.com</p>
            <p>Phone: (800) 555-0199</p>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800 bg-slate-900/40 py-8 px-4 text-center text-xs text-slate-500">
        AI Automated Services LLC • All Rights Reserved © {new Date().getFullYear()}
      </footer>
    </div>
  );
}
