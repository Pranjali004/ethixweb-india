import React from 'react';
import { Link } from 'react-router-dom';
import {
  Code2,
  Cpu,
  Smartphone,
  TrendingUp,
  Search,
  ShieldCheck,
  Check,
  ArrowUpRight,
  Layers,
  Database,
  Lock,
} from 'lucide-react';
import ContactForm from '../components/ContactForm';

export default function ServicesPage() {
  const serviceDetails = [
    {
      id: 'web-dev',
      icon: Code2,
      category: 'Web & App Engineering',
      title: 'Enterprise Web & Mobile Applications',
      tagline: 'Lightning-fast, highly scalable web software built with React, Next.js, and Node.js.',
      problemSolved:
        'Slow, fragile WordPress sites that crash during high-traffic ad spikes or fail on Indian 4G/5G mobile connections.',
      deliverables: [
        'Custom single-page or SSR applications with sub-1.2s mobile load time',
        'Modular component architecture and clean TypeScript/React foundations',
        'Secure RESTful and GraphQL API backends with Node.js & databases',
        'Automated CI/CD pipelines on Render, Vercel, or AWS',
      ],
      techStack: ['React', 'Next.js', 'Node.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
      priceAnchor: 'From ₹2.5 Lakhs per sprint',
    },
    {
      id: 'ecommerce-upi',
      icon: Smartphone,
      category: 'Bharat Commerce',
      title: 'UPI & Razorpay Headless E-Commerce',
      tagline: 'High-converting D2C and B2B digital storefronts optimized for Indian payment behavior.',
      problemSolved:
        'High cart abandonment due to complex checkout flows, lack of instant UPI, or slow payment gateway redirections.',
      deliverables: [
        'Instant 1-click UPI checkout with Razorpay, Cashfree, and PhonePe',
        'Automated GST tax invoice generation compliant with Indian regulations',
        'Cash-on-Delivery (COD) verification via OTP to minimize RTO losses',
        'Headless Shopify Plus or custom Next.js storefronts',
      ],
      techStack: ['Shopify Plus', 'Razorpay', 'Cashfree', 'Next.js', 'PostgreSQL', 'Stripe'],
      priceAnchor: 'From ₹3.5 Lakhs per sprint',
    },
    {
      id: 'whatsapp-ai',
      icon: Cpu,
      category: 'Conversational Automation',
      title: 'WhatsApp Business API & AI Receptionists',
      tagline: 'Automate sales triage and customer interactions on the platform 500M+ Indians use daily.',
      problemSolved:
        'Lost leads that go cold because sales reps cannot respond within 5 minutes or manage weekend inquiries.',
      deliverables: [
        'Meta-verified WhatsApp Cloud API setup and green-tick onboarding support',
        'Custom AI receptionist bot that answers FAQs, qualifies budget, and routes leads',
        'Automated calendar appointment booking directly inside WhatsApp chat',
        'Bi-directional synchronization with Zoho CRM, HubSpot, or custom databases',
      ],
      techStack: ['WhatsApp Cloud API', 'OpenAI/Claude', 'Node.js', 'Webhooks', 'Zoho CRM'],
      priceAnchor: 'From ₹1.8 Lakhs per sprint',
    },
    {
      id: 'growth-ads',
      icon: TrendingUp,
      category: 'Acquisition & ROAS',
      title: 'Performance Marketing & Meta/Google Ads',
      tagline: 'Metric-driven media buying built to lower Customer Acquisition Cost (CAC) and scale ROAS.',
      problemSolved:
        'Wasting marketing budgets on vanity impressions with agencies that do not understand Indian buyer unit economics.',
      deliverables: [
        'High-converting landing page creation paired specifically to ad campaign hooks',
        'Meta Ads (Instagram/Facebook) and Google Ads search/shopping setup',
        'Advanced Server-Side CAPI (Conversion API) tracking for 100% data accuracy',
        'Continuous weekly A/B testing on ad creatives, copy angles, and vernacular hooks',
      ],
      techStack: ['Google Ads', 'Meta CAPI', 'Mixpanel', 'Google Analytics 4', 'Looker Studio'],
      priceAnchor: 'From ₹1.5 Lakhs/mo retainer',
    },
    {
      id: 'seo-discovery',
      icon: Search,
      category: 'Organic Dominance',
      title: 'Technical SEO & Bharat Regional Discovery',
      tagline: 'Durable organic traffic acquisition that compounds into qualified Indian enterprise leads.',
      problemSolved:
        'Getting buried under competitors in Google search results or suffering algorithmic penalties from poor site structure.',
      deliverables: [
        'Full technical Core Web Vitals audit and resolution to achieve 90+ PageSpeed',
        'Targeted search architecture for Tier 1, 2, and 3 business hubs across India',
        'Structured schema markup for rich search engine snippets and local presence',
        'High-authority organic content strategy focused on commercial intent keywords',
      ],
      techStack: ['Ahrefs', 'Semrush', 'Schema.org', 'Screaming Frog', 'Lighthouse'],
      priceAnchor: 'From ₹1.2 Lakhs/mo retainer',
    },
    {
      id: 'devops-ops',
      icon: ShieldCheck,
      category: '24/7 Operations',
      title: 'Dedicated Digital Ops & SLA Maintenance',
      tagline: 'An enterprise-grade tech squad safeguarding your uptime, security, and weekly releases.',
      problemSolved:
        'Broken forms, sudden site downtime, and waiting days for freelance developers to make simple urgent updates.',
      deliverables: [
        'Guaranteed response time within 1 hour during business hours',
        'Continuous automated uptime and server health monitoring',
        'Security patching, vulnerability scans, and database backup routines',
        'Monthly operational reporting and continuous speed fine-tuning',
      ],
      techStack: ['Render', 'AWS', 'Docker', 'GitHub Actions', 'Datadog', 'Uptime Kuma'],
      priceAnchor: 'From ₹90,000/mo retainer',
    },
  ];

  return (
    <div className="space-y-24 sm:space-y-32 py-12">
      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ethix-dark border border-ethix-border text-xs text-slate-300">
          <span className="w-2 h-2 rounded-full bg-ethix-red" />
          <span>Complete Technical Capabilities</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight max-w-4xl mx-auto">
          Disciplined Digital Engineering for{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-ethix-red to-amber-500">
            High-Growth Indian Brands
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
          We combine Silicon Valley engineering practices with deep Indian market instincts. Every service is built to convert, scale, and deliver measurable revenue.
        </p>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {serviceDetails.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                id={service.id}
                className="bg-ethix-dark border border-ethix-border rounded-2xl p-7 sm:p-9 shadow-ethix-card flex flex-col justify-between space-y-6 hover:border-ethix-red/40 transition-all"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-ethix-card border border-ethix-border flex items-center justify-center text-ethix-red">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-ethix-card border border-ethix-border text-slate-300">
                      {service.priceAnchor}
                    </span>
                  </div>

                  <div>
                    <div className="text-xs uppercase tracking-wider font-bold text-ethix-red">
                      {service.category}
                    </div>
                    <h2 className="text-2xl font-bold text-white mt-1">{service.title}</h2>
                    <p className="text-sm text-slate-300 mt-2 font-medium">{service.tagline}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-ethix-card/60 border border-ethix-border text-xs text-slate-400">
                    <span className="text-slate-200 font-semibold block mb-1">Bottleneck We Fix:</span>
                    {service.problemSolved}
                  </div>

                  <div className="space-y-2.5">
                    <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider block">
                      Core Sprint Deliverables:
                    </span>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                      {service.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-ethix-border flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {service.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-ethix-card text-slate-400 border border-ethix-border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-ethix-red hover:text-white transition-colors"
                  >
                    Discuss This Service
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Tech Stack Standards */}
      <section className="bg-ethix-dark/40 border-y border-ethix-border py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-center">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white">Our Engineering Standards</h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
              We build strictly with battle-tested modern web tools for zero technical debt and maximum team velocity.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {['React & Next.js', 'Node.js & Express', 'MongoDB & PostgreSQL', 'Tailwind CSS', 'Razorpay & UPI', 'Render & Vercel'].map(
              (tech, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-ethix-card border border-ethix-border text-xs font-semibold text-slate-200"
                >
                  {tech}
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ContactForm defaultService="web_dev" />
      </section>
    </div>
  );
}
