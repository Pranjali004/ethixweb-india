import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, MapPin, ShieldCheck, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import ContactForm from '../components/ContactForm';

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210';
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || 'india@ethixweb.com';

  const faqs = [
    {
      q: 'Do you provide GST-compliant invoices for Indian businesses?',
      a: 'Yes, absolutely. All project contracts and sprint milestones are billed with standard GST-compliant tax invoices containing our registered GSTIN and your business credentials for input tax credit claiming.',
    },
    {
      q: 'Who retains ownership of the source code and design assets?',
      a: 'You retain 100% intellectual property and full ownership of all source code, Figma design files, and deployment configurations. We perform a clean GitHub repository transfer and credential handover at project completion.',
    },
    {
      q: 'How fast can our team kick off an active sprint?',
      a: 'Once your architectural brief and milestone scope are locked, our dedicated technical squad initiates sprint execution within 3 to 5 business days.',
    },
    {
      q: 'Which Indian payment gateways and checkout providers do you support?',
      a: 'We have native engineering expertise with Razorpay, Cashfree, PhonePe Payment Gateway, Paytm, and Stripe (for international cross-border sales), as well as eNACH recurring mandate setups.',
    },
    {
      q: 'How do you adhere to India’s DPDP Act (2023)?',
      a: 'We implement zero unnecessary data tracking, explicit consent capture mechanisms, SSL/TLS encryption in transit, and secure data storage defaults aligned with the Digital Personal Data Protection Act (DPDP Act, 2023).',
    },
  ];

  return (
    <div className="space-y-20 sm:space-y-28 py-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ethix-dark border border-ethix-border text-xs text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>India Delivery Desk Is Live</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
          Let’s Build Something{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-ethix-red to-amber-500">
            Exceptional Together
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
          Share your project requirements, technical challenges, or growth goals. Our India delivery leadership will respond with a clear architectural roadmap.
        </p>
      </section>

      {/* Main Grid: Info + Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Touchpoints & Presence */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-ethix-dark border border-ethix-border rounded-2xl p-6 sm:p-8 space-y-6">
              <h3 className="text-xl font-bold text-white">Direct Communication Channels</h3>

              <div className="space-y-4">
                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                    'Namaste Ethixweb India team! We would like to connect regarding our web/tech project.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between group hover:bg-emerald-900/40 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs uppercase font-bold text-emerald-400">WhatsApp Instant Connect</div>
                      <div className="text-sm font-semibold text-white">+91 Desk (Active Daily)</div>
                    </div>
                  </div>
                  <span className="text-xs text-emerald-400 group-hover:translate-x-1 transition-transform">
                    Chat &rarr;
                  </span>
                </a>

                {/* Email */}
                <div className="p-4 rounded-xl bg-ethix-card border border-ethix-border flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-ethix-dark flex items-center justify-center text-ethix-red">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase font-bold text-slate-400">Project Inquiries</div>
                    <a
                      href={`mailto:${contactEmail}`}
                      className="text-sm font-semibold text-white hover:text-ethix-red transition-colors"
                    >
                      {contactEmail}
                    </a>
                  </div>
                </div>

                {/* Geographic Delivery Presence */}
                <div className="p-4 rounded-xl bg-ethix-card border border-ethix-border flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-ethix-dark flex items-center justify-center text-ethix-red shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase font-bold text-slate-400">Client Delivery Network</div>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Engineering delivery and strategic coverage across Bengaluru, Mumbai, and Delhi-NCR for Indian enterprises and global diaspora.
                    </p>
                  </div>
                </div>
              </div>

              {/* Guarantees */}
              <div className="pt-4 border-t border-ethix-border space-y-2.5 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Mutual Non-Disclosure Agreement (NDA) supported upon request</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Guaranteed response within 24 hours on all business days</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Frequently Asked Questions</h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Clear answers to common questions about our Indian delivery model.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-ethix-dark border border-ethix-border rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left text-sm font-semibold text-white focus:outline-none"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-ethix-red shrink-0 ml-2" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-ethix-border/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
