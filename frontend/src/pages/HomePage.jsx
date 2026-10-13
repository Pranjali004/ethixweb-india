import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Code2,
  Cpu,
  Smartphone,
  TrendingUp,
  Search,
  ShieldAlert,
  CheckCircle,
  Zap,
  Sparkles,
  MessageSquare,
  ShieldCheck,
  Building2,
  Users2,
  Award,
  ChevronRight,
} from 'lucide-react';
import ContactForm from '../components/ContactForm';

export default function HomePage() {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210';

  const capabilities = [
    {
      icon: Code2,
      tag: 'Core Engineering',
      title: 'Enterprise Web & Mobile Applications',
      description:
        'High-performance full-stack web platforms engineered with React, Next.js, and Node.js. Sub-second response times tuned for Indian mobile network conditions across Jio and Airtel.',
      badge: 'React & Node.js',
    },
    {
      icon: Smartphone,
      tag: 'Bharat Commerce',
      title: 'UPI & Razorpay Headless E-Commerce',
      description:
        'Custom D2C storefronts with instant 1-click UPI checkout, Razorpay/Cashfree payment integrations, automated GST invoice dispatch, and Cash-on-Delivery verification.',
      badge: 'UPI & Razorpay',
    },
    {
      icon: Cpu,
      tag: 'Conversational Ops',
      title: 'WhatsApp Business API & AI Automations',
      description:
        'Automate lead qualification, appointment booking, and customer updates directly on WhatsApp where 500M+ Indians do business every day.',
      badge: 'WhatsApp Cloud API',
    },
    {
      icon: TrendingUp,
      tag: 'Revenue Growth',
      title: 'Performance Marketing & Meta/Google Ads',
      description:
        'Full-funnel digital acquisition focused strictly on blended ROAS, lowering CAC, and conversion rate optimization tailored to Indian purchasing psychology.',
      badge: 'Google & Meta Ads',
    },
    {
      icon: Search,
      tag: 'Organic Demand',
      title: 'Technical SEO & Bharat Regional Discovery',
      description:
        'Dominate search engine results across tier-1, tier-2, and tier-3 business queries with semantic markup, localized landing hubs, and lightning-fast Core Web Vitals.',
      badge: 'Core Web Vitals 95+',
    },
    {
      icon: ShieldAlert,
      tag: 'Continuous Delivery',
      title: 'Dedicated Digital Ops & 24/7 SLA Support',
      description:
        'A dedicated technical squad taking full ownership of your digital infrastructure, security updates, uptime monitoring, and weekly deployment cycles.',
      badge: '24/7 SLA Care',
    },
  ];

  const sprintStages = [
    {
      step: '01',
      title: 'Architecture & Discovery',
      desc: 'Technical audit of current digital stack, user journey mapping, and India-specific payment/channel architecture.',
    },
    {
      step: '02',
      title: 'Sprint Development',
      desc: 'High-velocity iterative builds with clean modular components, headless CMS integrations, and responsive micro-interactions.',
    },
    {
      step: '03',
      title: 'Integrations & Hardening',
      desc: 'Rigorous integration of Indian payment gateways (UPI), WhatsApp Cloud API, and Core Web Vitals optimization.',
    },
    {
      step: '04',
      title: 'Launch & 24/7 Ops',
      desc: 'Zero-downtime production deployment, real-time analytics monitoring, and proactive SLA-backed support.',
    },
  ];

  const illustrativeCaseStudies = [
    {
      clientType: 'D2C Wellness & Ayurveda Brand (Concept)',
      metric: '3.8x Blended ROAS',
      highlight: 'Headless storefront migration with 1-click UPI checkout & WhatsApp order notifications',
      tag: 'E-Commerce & UPI',
    },
    {
      clientType: 'B2B Industrial Machinery Manufacturer (Concept)',
      metric: '62% Reduction in Lead Response Time',
      highlight: 'Custom enterprise portal with automated GST quotation generation and WhatsApp dispatch',
      tag: 'Enterprise Web Portal',
    },
    {
      clientType: 'HealthTech Teleconsultation Platform (Concept)',
      metric: '45,000+ Monthly Bookings',
      highlight: 'WhatsApp AI receptionist qualification bot synced with clinic ERP calendars',
      tag: 'AI & WhatsApp Cloud',
    },
  ];

  return (
    <div className="space-y-24 sm:space-y-32">
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 overflow-hidden">
        {/* Subtle geometric grid background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

        {/* Ambient Red Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-ethix-red/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ethix-dark border border-ethix-border text-xs text-slate-300 shadow-sm animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-ethix-red animate-pulse" />
            <span className="font-medium">Ethixweb Reimagined for India</span>
            <span className="text-slate-600">|</span>
            <span className="text-amber-400 font-semibold">Bengaluru · Mumbai · Delhi-NCR Delivery</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
            We Run The Tech.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ethix-red via-rose-500 to-amber-500">
              You Scale The Business.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            World-class web engineering, WhatsApp commerce automation, and high-velocity digital operations built specifically for the realities of the Indian market.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-ethix-red hover:bg-ethix-red-hover text-white text-sm font-semibold transition-all shadow-lg shadow-ethix-red/25 hover:scale-105 active:scale-95"
            >
              Start Your India Project
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                'Namaste! We are looking to discuss our digital tech and web development requirements.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-ethix-dark border border-emerald-500/40 text-emerald-300 hover:bg-emerald-950/40 text-sm font-semibold transition-all hover:scale-105"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              Chat on WhatsApp (+91)
            </a>
          </div>

          {/* Trust Highlights Strip */}
          <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-4 rounded-xl bg-ethix-dark/70 border border-ethix-border">
              <div className="text-2xl font-bold text-white tracking-tight">Sub-1.2s</div>
              <div className="text-xs text-slate-400 mt-1">Mobile LCP on 4G/5G Jio & Airtel</div>
            </div>
            <div className="p-4 rounded-xl bg-ethix-dark/70 border border-ethix-border">
              <div className="text-2xl font-bold text-white tracking-tight">100% UPI</div>
              <div className="text-xs text-slate-400 mt-1">Razorpay & Cashfree Native Checkout</div>
            </div>
            <div className="p-4 rounded-xl bg-ethix-dark/70 border border-ethix-border">
              <div className="text-2xl font-bold text-white tracking-tight">WhatsApp</div>
              <div className="text-xs text-slate-400 mt-1">Automated Lead & Booking Flows</div>
            </div>
            <div className="p-4 rounded-xl bg-ethix-dark/70 border border-ethix-border">
              <div className="text-2xl font-bold text-white tracking-tight">GST & DPDP</div>
              <div className="text-xs text-slate-400 mt-1">Compliant Invoicing & Data Protection</div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities / Services Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-semibold bg-ethix-red/10 border border-ethix-red/30 text-ethix-red">
            Engineered For Indian Scale
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Full-Stack Digital Capabilities
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            From modern web applications to automated WhatsApp customer channels and high-conversion ad engines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group relative p-6 sm:p-7 rounded-2xl bg-ethix-dark border border-ethix-border hover:border-ethix-red/50 transition-all duration-200 hover:-translate-y-1 shadow-ethix-card"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-ethix-card border border-ethix-border flex items-center justify-center text-ethix-red group-hover:text-white group-hover:bg-ethix-red transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-md bg-ethix-card border border-ethix-border text-slate-400">
                    {item.badge}
                  </span>
                </div>

                <div className="text-xs uppercase font-semibold tracking-wider text-ethix-red mb-1">
                  {item.tag}
                </div>
                <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-rose-200 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center pt-2">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-200 hover:text-ethix-red transition-colors"
          >
            Explore Complete Service Catalog & Technical Architecture
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Agile 4-Week Sprint Process */}
      <section className="bg-ethix-dark/50 border-y border-ethix-border py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-semibold bg-amber-500/10 border border-amber-500/30 text-amber-400">
              High-Velocity Delivery Model
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Our 4-Stage India Sprint Framework
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
              Indian businesses move fast. We cut out weeks of agency bureaucracy with disciplined agile sprints.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sprintStages.map((stage, idx) => (
              <div
                key={idx}
                className="relative p-6 rounded-2xl bg-ethix-card border border-ethix-border space-y-3"
              >
                <div className="text-3xl font-black text-ethix-red/70 font-mono">{stage.step}</div>
                <h3 className="text-base font-bold text-white">{stage.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{stage.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Illustrative Case Studies */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-semibold bg-ethix-red/10 border border-ethix-red/30 text-ethix-red">
              Concept Case Studies
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Transforming Bharat Digital Commerce
            </h2>
            <p className="text-xs text-slate-400">
              *Illustrative architectural case studies reflecting Ethixweb delivery benchmarks.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-xs font-semibold text-ethix-red hover:text-white transition-colors"
          >
            Request Custom Architecture Blueprint
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {illustrativeCaseStudies.map((study, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-ethix-dark border border-ethix-border space-y-4 hover:border-slate-600 transition-colors"
            >
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-ethix-card text-slate-300 border border-ethix-border">
                {study.tag}
              </span>
              <div className="text-2xl font-extrabold text-emerald-400">{study.metric}</div>
              <h3 className="text-base font-bold text-white">{study.clientType}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{study.highlight}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Ethixweb vs Traditional Agencies */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-ethix-dark to-ethix-card border border-ethix-border rounded-3xl p-8 sm:p-12 space-y-8">
          <div className="max-w-2xl space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Why Indian Founders & Leaders Choose Ethixweb
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Most local digital agencies sell outdated WordPress templates or slow manual processes. We operate like an embedded Silicon Valley engineering team with hyper-localized Indian operational intuition.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white font-semibold text-sm">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Zero Fragile Templates
              </div>
              <p className="text-xs text-slate-400">
                Custom engineered with modern Next.js and React stacks designed for high concurrency and zero plugin bloat.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white font-semibold text-sm">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                WhatsApp-First Customer Flow
              </div>
              <p className="text-xs text-slate-400">
                Direct integration with WhatsApp Cloud API to capture, qualify, and convert leads where Indians actually chat.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white font-semibold text-sm">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Direct Senior Engineering Access
              </div>
              <p className="text-xs text-slate-400">
                No junior account managers passing messages. You collaborate directly with tech leads and growth engineers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section id="inquiry" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <ContactForm defaultService="web_dev" />
      </section>
    </div>
  );
}
