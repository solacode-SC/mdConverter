"use client";

import React, { useState } from 'react';
import { Copy, Download, CheckCircle2 } from 'lucide-react';

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
    setTimeout(() => setCopied(false), 2000);
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
    <div className="w-full flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-primary mb-1">Conversion Complete</h2>
          <p className="text-muted">Successfully extracted markdown from your file.</p>
        </div>
        <button 
          onClick={onReset}
          className="text-sm font-medium text-muted hover:text-primary transition-colors underline underline-offset-4"
        >
          Convert another file
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6 h-[500px]">
        {/* Left Info Panel */}
        <div className="w-full md:w-1/3 bg-gray-50 rounded-[24px] p-6 border border-border flex flex-col justify-between">
          <div>
            <div className="mb-6">
              <p className="text-sm text-muted uppercase tracking-wider font-semibold mb-1">File Name</p>
              <p className="font-medium text-primary break-all">{filename}</p>
            </div>
            
            <div className="mb-6">
              <p className="text-sm text-muted uppercase tracking-wider font-semibold mb-1">Content Stats</p>
              <p className="font-medium text-primary">{markdown.length.toLocaleString()} characters</p>
              <p className="font-medium text-primary">{markdown.split(/\s+/).length.toLocaleString()} words</p>
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            <button 
              onClick={handleCopy}
              className="w-full py-3 px-4 rounded-xl border border-border bg-white text-primary font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              {copied ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
              {copied ? 'Copied!' : 'Copy Markdown'}
            </button>
            <button 
              onClick={handleDownload}
              className="w-full py-3 px-4 rounded-xl bg-primary text-white font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download .md
            </button>
          </div>
        </div>

        {/* Right Preview Panel */}
        <div className="w-full md:w-2/3 bg-gray-900 rounded-[24px] border border-border overflow-hidden flex flex-col relative shadow-sm">
          <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 flex items-center">
             <div className="flex gap-2">
               <div className="w-3 h-3 rounded-full bg-red-400"></div>
               <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
               <div className="w-3 h-3 rounded-full bg-green-400"></div>
             </div>
             <p className="text-xs text-gray-400 font-mono ml-4">{filename}</p>
          </div>
          <div className="p-6 overflow-auto flex-1">
            <pre className="font-mono text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">
              {markdown || "No text could be extracted."}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
