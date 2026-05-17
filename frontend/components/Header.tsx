import React from 'react';
import { FileText } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full border-b border-border h-16 flex items-center justify-center bg-white sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <FileText className="w-6 h-6 text-primary" />
        <h1 className="text-xl font-bold tracking-tight text-primary">
          MD Converter
        </h1>
      </div>
    </header>
  );
}
