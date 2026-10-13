import React from 'react';

export default function EthixLogo({ showBadge = true, size = 'default' }) {
  const isSmall = size === 'small';

  return (
    <div className="flex items-center gap-2.5 group select-none">
      {/* Ethixweb Recreated 3-Bar Brand Mark */}
      <div
        className={`relative flex flex-col justify-between p-2 rounded-lg bg-ethix-dark border border-ethix-border transition-transform duration-200 group-hover:scale-105 ${
          isSmall ? 'w-8 h-8 p-1.5' : 'w-9 h-9'
        }`}
        aria-label="Ethixweb recreated brand logo"
      >
        <div className="h-1 w-full bg-ethix-red rounded-full shadow-[0_0_8px_#E11D48]" />
        <div className="h-1 w-3/4 bg-ethix-red rounded-full" />
        <div className="h-1 w-full bg-ethix-red rounded-full" />
      </div>

      {/* Ethixweb Typography (Recreated from brand design system) */}
      <div className="flex flex-col">
        <div className="flex items-center tracking-wider font-extrabold text-lg leading-none">
          <span className="text-white">ETHIX</span>
          <span className="text-ethix-red">WEB</span>
        </div>
        {showBadge && (
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
              India Edition
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" title="Systems Active" />
          </div>
        )}
      </div>
    </div>
  );
}
