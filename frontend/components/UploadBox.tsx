"use client";

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, FileText, Presentation, File, X, Loader2, FileDown } from 'lucide-react';
import { convertFile } from '@/lib/api';

interface UploadBoxProps {
  onSuccess: (filename: string, markdown: string) => void;
}

export default function UploadBox({ onSuccess }: UploadBoxProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setError(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
      'application/msword': ['.doc', '.docx'],
      'application/vnd.ms-powerpoint': ['.ppt', '.pptx'],
      'application/zip': ['.docx', '.pptx'],
      'application/x-zip-compressed': ['.docx', '.pptx'],
      'application/octet-stream': ['.doc', '.docx', '.ppt', '.pptx']
    },
    maxFiles: 1,
    maxSize: 2 * 1024 * 1024 * 1024 // 2GB
  });

  const handleClear = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFile(null);
    setError(null);
  };

  const handleConvert = async () => {
    if (!file) return;
    setIsConverting(true);
    setError(null);
    try {
      const data = await convertFile(file);
      onSuccess(data.filename, data.markdown);
    } catch (err: any) {
      setError(err.message || 'An error occurred during conversion');
    } finally {
      setIsConverting(false);
    }
  };

  const getFileIcon = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    if (ext === 'pdf') return <FileText className="w-5 h-5 text-brand-blue" />;
    if (['ppt', 'pptx'].includes(ext || '')) return <Presentation className="w-5 h-5 text-brand-blue" />;
    return <File className="w-5 h-5 text-brand-blue" />;
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-12 mb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {!file ? (
        <div 
          {...getRootProps()} 
          className={`w-full bg-card border-2 border-dashed rounded-2xl p-12 transition-all duration-200 cursor-pointer flex flex-col items-center justify-center min-h-[300px]
            ${isDragActive ? 'border-brand-blue bg-brand-blue/5' : 'border-[#C7D0DC] hover:border-brand-blue hover:bg-brand-blue/5'}
          `}
        >
          <input {...getInputProps()} />
          
          <UploadCloud className="w-12 h-12 text-brand-blue mb-4" />
          <p className="font-display font-semibold text-lg text-text-primary">Drag & drop your file here</p>
          <p className="font-body text-sm text-text-secondary mt-1">or click to browse</p>
          
          <div className="flex gap-2 mt-6">
             <span className="bg-muted rounded-full px-3 py-1 text-xs font-mono text-text-secondary flex items-center gap-1">
               📄 PDF
             </span>
             <span className="bg-muted rounded-full px-3 py-1 text-xs font-mono text-text-secondary flex items-center gap-1">
               📝 DOCX
             </span>
             <span className="bg-muted rounded-full px-3 py-1 text-xs font-mono text-text-secondary flex items-center gap-1">
               📊 PPTX
             </span>
          </div>
          
          <p className="text-xs text-[#9CA3AF] mt-4">Max 2GB</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 animate-in slide-in-from-top-2 fade-in duration-300">
          <div className="bg-muted rounded-xl px-4 py-3 flex items-center gap-3">
             {getFileIcon(file.name)}
             <div className="flex-grow min-w-0">
               <p className="font-body text-sm font-medium text-text-primary truncate">{file.name}</p>
               <p className="font-body text-xs text-text-secondary">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
             </div>
             <button 
               onClick={handleClear} 
               disabled={isConverting}
               className="p-1 hover:bg-black/5 rounded-md transition-colors text-text-secondary hover:text-text-primary disabled:opacity-50"
             >
               <X className="w-5 h-5" />
             </button>
          </div>
          
          <button
            onClick={handleConvert}
            disabled={isConverting}
            className={`w-full py-3.5 rounded-xl font-body font-semibold text-base transition-all duration-200 flex justify-center items-center gap-2
              ${isConverting 
                ? 'bg-brand-blue/80 text-white cursor-not-allowed' 
                : 'bg-brand-blue text-white hover:bg-brand-hover active:scale-[0.99] shadow-sm hover:shadow-md'
              }
            `}
          >
            {isConverting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Converting...
              </>
            ) : (
              <>
                Convert to Markdown <FileDown className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      )}

      {error && (
        <div className="mt-4 text-red-600 font-body text-sm bg-red-50 px-4 py-3 rounded-xl border border-red-200 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
          {error}
        </div>
      )}
    </div>
  );
}
