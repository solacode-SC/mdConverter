import React from 'react';
import { Github, Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-border mt-auto h-14 flex items-center">
      <div className="max-w-6xl mx-auto px-6 w-full flex items-center justify-between">
        <p className="font-body text-[13px] text-[#9CA3AF] flex items-center gap-1">
          MD Converter · Built for simplicity and speed <Zap className="w-3 h-3 text-yellow-500 fill-yellow-500" />
        </p>
        <a href="https://github.com/solacode-SC/mdConverter" target="_blank" rel="noopener noreferrer" className="text-[#9CA3AF] hover:text-text-primary transition-colors">
          <Github className="w-4 h-4" />
        </a>
      </div>
    </footer>
  );
}
