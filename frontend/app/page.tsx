"use client";

import React, { useState } from 'react';
import UploadBox from '@/components/UploadBox';
import MarkdownPreview from '@/components/MarkdownPreview';
import { UploadCloud, Zap, FileDown, FileText, FileType, Presentation } from 'lucide-react';

export default function Home() {
  const [result, setResult] = useState<{ filename: string; markdown: string } | null>(null);

  const handleSuccess = (filename: string, markdown: string) => {
    setResult({ filename, markdown });
  };

  const handleReset = () => {
    setResult(null);
  };

  const scrollToUpload = () => {
    document.getElementById('upload-zone')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* Hero Section */}
      <section className="w-full bg-white flex flex-col items-center justify-center py-20 px-6 border-b border-border">
        <div className="inline-flex items-center border border-brand-blue/30 bg-brand-blue/10 rounded-full px-3 py-1 mb-8">
           <span className="font-body text-[12px] font-semibold text-brand-blue tracking-wide uppercase">
             Free · No Login · Open Source
           </span>
        </div>
        <h1 className="font-display font-extrabold text-4xl md:text-5xl text-center text-text-primary leading-[1.15] max-w-[640px]">
          Transform Any Document into<br />Clean Markdown Instantly
        </h1>
        <p className="font-body text-base text-text-secondary mt-5 max-w-md text-center">
          Upload a PDF, Word, or PowerPoint file. Get structured Markdown back in seconds.
        </p>
        {!result && (
          <button onClick={scrollToUpload} className="mt-8 bg-brand-blue hover:bg-brand-hover text-white px-6 py-3 rounded-xl font-body font-semibold transition-colors shadow-sm active:scale-[0.98]">
            Start Converting ↓
          </button>
        )}
      </section>

      {/* Upload or Result Zone */}
      <section id="upload-zone" className="w-full px-6 pt-10 pb-20 bg-surface">
        {!result ? (
          <UploadBox onSuccess={handleSuccess} />
        ) : (
          <MarkdownPreview 
            filename={result.filename} 
            markdown={result.markdown} 
            onReset={handleReset} 
          />
        )}
      </section>

      {/* How It Works Section */}
      <section className="w-full bg-muted py-24 px-6 border-y border-border">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display font-bold text-3xl text-center text-text-primary mb-12">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card rounded-2xl p-6 shadow-card border border-border hover:shadow-md transition-shadow">
               <span className="font-display font-extrabold text-[13px] text-brand-blue bg-brand-blue/10 rounded-full px-2.5 py-0.5 inline-block mb-4">01</span>
               <UploadCloud className="w-8 h-8 text-brand-blue mb-4" />
               <h3 className="font-body font-semibold text-base text-text-primary mb-2">Upload Your File</h3>
               <p className="font-body text-sm text-text-secondary leading-relaxed">Drop a PDF, Word doc, or PowerPoint. We support all major document formats up to 2GB.</p>
            </div>
            <div className="bg-card rounded-2xl p-6 shadow-card border border-border hover:shadow-md transition-shadow">
               <span className="font-display font-extrabold text-[13px] text-brand-blue bg-brand-blue/10 rounded-full px-2.5 py-0.5 inline-block mb-4">02</span>
               <Zap className="w-8 h-8 text-brand-blue mb-4" />
               <h3 className="font-body font-semibold text-base text-text-primary mb-2">Instant Conversion</h3>
               <p className="font-body text-sm text-text-secondary leading-relaxed">Our parser extracts text, headings, and structure from your document in under a second—no server queues, no waiting.</p>
            </div>
            <div className="bg-card rounded-2xl p-6 shadow-card border border-border hover:shadow-md transition-shadow">
               <span className="font-display font-extrabold text-[13px] text-brand-blue bg-brand-blue/10 rounded-full px-2.5 py-0.5 inline-block mb-4">03</span>
               <FileDown className="w-8 h-8 text-brand-blue mb-4" />
               <h3 className="font-body font-semibold text-base text-text-primary mb-2">Copy or Download</h3>
               <p className="font-body text-sm text-text-secondary leading-relaxed">Grab the clean .md output directly. Paste it into your notes, repo, or docs platform right away.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Formats Section */}
      <section className="w-full bg-white py-24 px-6">
         <div className="max-w-5xl mx-auto">
            <h2 className="font-display font-bold text-2xl text-center text-text-primary mb-10">Supported Formats</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="flex items-start gap-4 p-6 rounded-xl bg-card border border-border shadow-sm">
                  <FileText className="w-8 h-8 text-text-primary flex-shrink-0" />
                  <div>
                     <h4 className="font-body font-bold text-base text-text-primary mb-1">PDF</h4>
                     <p className="font-body text-sm text-text-secondary">PyMuPDF · Text & structure extraction</p>
                  </div>
               </div>
               <div className="flex items-start gap-4 p-6 rounded-xl bg-card border border-border shadow-sm">
                  <FileType className="w-8 h-8 text-text-primary flex-shrink-0" />
                  <div>
                     <h4 className="font-body font-bold text-base text-text-primary mb-1">DOCX</h4>
                     <p className="font-body text-sm text-text-secondary">mammoth · Native Markdown output</p>
                  </div>
               </div>
               <div className="flex items-start gap-4 p-6 rounded-xl bg-card border border-border shadow-sm">
                  <Presentation className="w-8 h-8 text-text-primary flex-shrink-0" />
                  <div>
                     <h4 className="font-body font-bold text-base text-text-primary mb-1">PPTX</h4>
                     <p className="font-body text-sm text-text-secondary">python-pptx · Slide-by-slide text</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

    </div>
  );
}
