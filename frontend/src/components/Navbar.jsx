import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MessageSquare, ArrowUpRight, ShieldCheck } from 'lucide-react';
import EthixLogo from './EthixLogo';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Our India Story', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Hi Ethixweb India team! I would like to discuss a digital engineering / web project for my business.'
  )}`;

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-ethix-black/95 backdrop-blur-md border-b border-ethix-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="focus:outline-none focus:ring-2 focus:ring-ethix-red rounded-lg p-1">
          <EthixLogo />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors duration-150 ${
                isActive(link.path)
                  ? 'text-white font-semibold border-b-2 border-ethix-red pb-1'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/admin"
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 bg-ethix-dark px-2.5 py-1 rounded-md border border-ethix-border transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-ethix-red" />
            Admin Portal
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-emerald-950/60 border border-emerald-600/40 text-emerald-300 hover:bg-emerald-900/60 transition-all"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            WhatsApp Us
          </a>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-ethix-red hover:bg-ethix-red-hover text-white transition-all shadow-md shadow-ethix-red/20 active:scale-95"
          >
            Start Project
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            to="/contact"
            className="px-3 py-1.5 text-xs font-semibold rounded-md bg-ethix-red text-white"
          >
            Start
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-ethix-dark border border-ethix-border text-slate-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-ethix-red"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-ethix-dark border-b border-ethix-border px-4 pt-3 pb-6 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg text-base font-medium ${
                isActive(link.path)
                  ? 'bg-ethix-card text-white border-l-4 border-ethix-red'
                  : 'text-slate-300 hover:bg-ethix-card hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-3 border-t border-ethix-border flex flex-col gap-2.5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-950/80 border border-emerald-600/50 text-emerald-300 text-sm font-semibold"
            >
              <MessageSquare className="w-4 h-4" />
              Chat on WhatsApp (+91)
            </a>
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-ethix-card border border-ethix-border text-slate-300 text-xs font-medium"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-ethix-red" />
              Go to Protected Admin Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
