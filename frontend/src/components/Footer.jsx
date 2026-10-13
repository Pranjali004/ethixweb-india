import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MessageSquare, ArrowUpRight, ShieldCheck, MapPin } from 'lucide-react';
import EthixLogo from './EthixLogo';

export default function Footer() {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210';
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || 'india@ethixweb.com';

  return (
    <footer className="bg-ethix-black border-t border-ethix-border text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1 & 2: Brand & Positioning */}
          <div className="lg:col-span-2 space-y-4">
            <EthixLogo />
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              World-class digital engineering, headless commerce, UPI integrations, and AI workflow automations engineered specifically for high-growth Indian enterprises, D2C disruptors, and ambitious startups.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs bg-ethix-card border border-ethix-border text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-ethix-red" />
                GST Invoicing Compliant
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs bg-ethix-card border border-ethix-border text-slate-300">
                DPDP Act (2023) Aligned
              </span>
            </div>
          </div>

          {/* Column 3: Core Services */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-slate-200 font-bold mb-4">Capabilities</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Enterprise Web Apps
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  UPI & Razorpay Commerce
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  WhatsApp Cloud API & AI
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Performance Marketing (ROAS)
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Bharat Technical SEO
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  24/7 SLA DevOps Operations
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Quick Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-slate-200 font-bold mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  Our India Story
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Get in Touch
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-ethix-red transition-colors flex items-center gap-1">
                  <span>Admin CRM</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Desk</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: India Connect */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-slate-200 font-bold mb-4">India Delivery</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-ethix-red shrink-0 mt-0.5" />
                <span className="text-slate-300">
                  Engineering delivery for Indian clients across Bengaluru, Mumbai & Delhi-NCR
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <a href={`mailto:${contactEmail}`} className="hover:text-white transition-colors">
                  {contactEmail}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="text-slate-300">+91 (India Team Desk)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-ethix-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-400 text-center sm:text-left">
            © {new Date().getFullYear()} Ethixweb. Redesigned with world-class engineering for the Indian ecosystem.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-slate-200 transition-colors">
              Ethixweb Global & India
            </Link>
            <Link to="/contact" className="hover:text-slate-200 transition-colors">
              Privacy & DPDP Compliance
            </Link>
            <Link to="/admin" className="hover:text-slate-200 transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
