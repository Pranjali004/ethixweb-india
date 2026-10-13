import React from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  Code,
  ShieldCheck,
  Zap,
  CheckCircle,
  ArrowUpRight,
  Sparkles,
  Globe,
  MapPin,
  TrendingUp,
} from 'lucide-react';
import ContactForm from '../components/ContactForm';

export default function AboutPage() {
  const pillars = [
    {
      title: 'Global Engineering Discipline',
      desc: 'We bring Silicon Valley software architecture rigor—clean TypeScript, modular component design, and zero bloated plugins—to Indian ventures.',
    },
    {
      title: 'Tuned for Bharat Scale',
      desc: 'Sub-second mobile performance optimized for Jio and Airtel network speeds across Tier 1, 2, and 3 Indian commercial hubs.',
    },
    {
      title: 'Conversational & UPI First',
      desc: 'Indian customer journeys do not happen in static email chains. We integrate WhatsApp Cloud API and 1-click UPI checkout as standard foundations.',
    },
    {
      title: 'Zero Bureaucracy, Pure Velocity',
      desc: 'No junior account managers or endless discovery meetings. You collaborate directly with experienced technical builders who deploy weekly.',
    },
  ];

  return (
    <div className="space-y-24 sm:space-y-32 py-12">
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ethix-dark border border-ethix-border text-xs text-slate-300">
          <span className="w-2 h-2 rounded-full bg-ethix-red" />
          <span>Our India Expansion Story</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight max-w-4xl mx-auto">
          Bridging World-Class Engineering with{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-ethix-red to-amber-500">
            Indian Business Velocity
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          How we reimagined Ethixweb’s global digital operations model to empower Indian startups, D2C brands, and forward-thinking enterprises.
        </p>
      </section>

      {/* Honest Story Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-ethix-dark border border-ethix-border rounded-3xl p-8 sm:p-12 space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">The India Opportunity & The Dilemma</h2>
            <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
              <p>
                Ethixweb established its foundation delivering full-stack digital operations, AI automation, and custom web engineering for businesses worldwide. Over the past few years, we observed an undeniable surge: India’s entrepreneurial ecosystem has become one of the most vibrant, fast-moving markets on the planet.
              </p>
              <p>
                However, when Indian founders and business leaders seek digital partners, they face a painful dilemma:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div className="p-5 rounded-xl bg-ethix-card border border-rose-900/40 space-y-2">
              <div className="text-xs uppercase font-bold text-rose-400">The Traditional Agency Trap</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Slow, bloated WordPress themes with dozens of vulnerable plugins, zero understanding of high-concurrency payment spikes, and weeks of wasted time waiting for simple CSS updates.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-ethix-card border border-amber-900/40 space-y-2">
              <div className="text-xs uppercase font-bold text-amber-400">The Legacy IT Consultancies</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Massive overhead, rigid 6-month timelines, inflated pricing, and layers of account managers that dilute technical execution and kill early market momentum.
              </p>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-ethix-border">
            <h3 className="text-xl font-bold text-white">Ethixweb India: The Pragmatic Alternative</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              We redesigned Ethixweb specifically for India to solve this exact problem. We combine modern Silicon Valley engineering principles—clean React codebases, headless architectures, automated CI/CD—with dedicated delivery leadership attuned to the ground realities of Indian commerce:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm text-slate-200">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Instant UPI & Razorpay Checkout Integration</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp Cloud API Automations</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Sub-1.2s mobile loading for Jio/Airtel 4G/5G</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Full GST-compliant Invoicing & DPDP adherence</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Guiding Principles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-white">Our Engineering Principles</h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            The non-negotiable standards behind every sprint we deploy.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-ethix-dark border border-ethix-border space-y-3">
              <div className="w-10 h-10 rounded-lg bg-ethix-card border border-ethix-border flex items-center justify-center text-ethix-red font-mono font-bold">
                0{idx + 1}
              </div>
              <h3 className="text-base font-bold text-white">{pillar.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ContactForm defaultService="web_dev" />
      </section>
    </div>
  );
}
