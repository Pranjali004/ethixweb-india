import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';

export default function WhatsAppFloatingButton() {
  const [tooltipDismissed, setTooltipDismissed] = useState(false);
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Namaste! I would like to explore website redesign / development services with Ethixweb India.'
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-end gap-3 pointer-events-auto">
      {/* Tooltip banner for Indian buyers */}
      {!tooltipDismissed && (
        <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-ethix-card border border-emerald-500/30 text-white shadow-xl text-xs backdrop-blur-md animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-medium text-slate-200">Chat with India Tech Lead on WhatsApp</span>
          <button
            onClick={() => setTooltipDismissed(true)}
            className="text-slate-400 hover:text-white ml-1 p-0.5"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-500/30 transition-transform duration-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-500/40"
        aria-label="Contact us directly on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-300" />
        </span>
        <MessageSquare className="w-7 h-7 text-white fill-white" />
      </a>
    </div>
  );
}
