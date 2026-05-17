import React from 'react';
import { ArrowDownToLine, Github } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="w-full bg-white/80 backdrop-blur border-b border-border h-14 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-brand-blue rounded flex items-center justify-center">
            <ArrowDownToLine className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-semibold text-[#1A1D23] text-lg tracking-tight">
            MD Converter
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
            API Docs
          </button>
          <a href="https://github.com/solacode-SC/mdConverter" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text-primary transition-colors">
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>
    </header>
  );
}
