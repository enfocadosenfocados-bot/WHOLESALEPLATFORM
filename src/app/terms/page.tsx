import React from 'react';
import Link from 'next/link';
import { FileText, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service | AI Automated Services LLC',
  description: 'Official Terms of Service and Real Estate Disclosures for AI Automated Services LLC.',
};

export default function TermsOfServicePage() {
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

          <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-emerald-400" />
            Terms of Service
          </span>
        </div>
      </header>

      {/* Terms Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8 leading-relaxed text-sm">
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-black text-white tracking-tight">Terms of Service</h1>
          <p className="text-xs text-slate-400 mt-2">
            Last Updated: October 6, 2026 • Legal Entity: <strong>AI Automated Services LLC and/or assigns</strong>
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">1. Agreement to Terms</h2>
          <p className="text-slate-300">
            By accessing or using the services, websites, or communication channels provided by AI Automated Services LLC (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), you agree to be bound by these Terms of Service. If you do not agree, please refrain from submitting inquiries or using our platform.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">2. Real Estate Investor Disclosure (Not a Real Estate Brokerage)</h2>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs text-slate-300">
            <p>
              <strong>AI Automated Services LLC is a private real estate investment and solutions company.</strong> We are not licensed real estate brokers or agents, and we do not represent buyers or sellers as fiduciaries.
            </p>
            <p>
              We purchase properties on our own behalf as principal or through contractual assignment rights (&quot;and/or assigns&quot;). No statements on our platform should be construed as legal, tax, or financial advice. We encourage property owners to consult with independent legal counsel before executing binding contracts.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">3. Property Offers & Purchase Agreements</h2>
          <p className="text-slate-300">
            Any preliminary numbers, letters of intent, or estimates provided via our online forms, phone calls, or emails are non-binding valuations. A binding transaction occurs solely upon mutual execution of a formal, written Purchase and Sale Agreement (PSA) signed by authorized representatives of both Seller and Buyer.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">4. TCPA & Automated Communications Consent</h2>
          <p className="text-slate-300">
            By submitting your contact information through our website or initiating contact with our company, you expressly grant permission to AI Automated Services LLC and its representatives to contact you via telephone calls, SMS text messages, and email communications concerning your real estate property inquiry.
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-slate-300 text-xs">
            <li>Communications may include conversational artificial intelligence assistants or automated reminders.</li>
            <li>You may revoke this consent at any time by replying <strong>&quot;STOP&quot;</strong> to any SMS communication or requesting verbal removal during a phone call.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">5. Governing Law & Dispute Resolution</h2>
          <p className="text-slate-300">
            These Terms shall be governed by and construed in accordance with the laws of the State of organization of AI Automated Services LLC, without regard to its conflict of law provisions. Any dispute arising out of or related to these Terms shall be resolved through binding arbitration or mediation in accordance with commercial arbitration rules.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">6. Contact Information</h2>
          <div className="text-xs text-slate-400 font-mono space-y-0.5">
            <p className="text-white font-bold">AI Automated Services LLC and/or assigns</p>
            <p>Email: legal@aiautomatedservices.com</p>
            <p>Phone: (800) 555-0199</p>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800 bg-slate-900/40 py-8 px-4 text-center text-xs text-slate-500">
        AI Automated Services LLC and/or assigns • All Rights Reserved © {new Date().getFullYear()}
      </footer>
    </div>
  );
}
