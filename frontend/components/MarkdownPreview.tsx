"use client";

import React, { useState } from 'react';
import { Copy, Download, Check, FileCode2 } from 'lucide-react';

interface MarkdownPreviewProps {
  filename: string;
  markdown: string;
  onReset: () => void;
}

export default function MarkdownPreview({ filename, markdown, onReset }: MarkdownPreviewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 mb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
        <div>
          <h2 className="font-display font-semibold text-2xl text-text-primary">Your Markdown is ready</h2>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button 
            onClick={handleCopy}
            className={`px-3 py-1.5 rounded-lg border text-sm font-body font-medium flex items-center gap-1.5 transition-colors
              ${copied ? 'bg-green-50 border-green-200 text-green-700' : 'bg-card border-border text-text-secondary hover:bg-muted hover:text-text-primary'}
            `}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
          <button 
            onClick={handleDownload}
            className="px-3 py-1.5 rounded-lg border border-border bg-card text-text-secondary text-sm font-body font-medium hover:bg-muted hover:text-text-primary transition-colors flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            Download .md
          </button>
          <button 
            onClick={onReset}
            className="px-4 py-1.5 rounded-lg bg-brand-blue text-white text-sm font-body font-medium hover:bg-brand-hover transition-colors"
          >
            Convert Another
          </button>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="bg-white border-b border-border px-4 py-2 flex items-center gap-2">
          <FileCode2 className="w-4 h-4 text-brand-blue" />
          <span className="font-mono text-xs text-text-secondary">{filename}</span>
        </div>
        <div className="p-6 max-h-[480px] overflow-y-auto">
          <pre className="font-mono text-[13px] leading-relaxed text-text-primary whitespace-pre-wrap">
            {markdown || "No text could be extracted."}
          </pre>
        </div>
      </div>
    </div>
  );
}
