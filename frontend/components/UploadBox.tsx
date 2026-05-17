"use client";

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, File, X, Loader2 } from 'lucide-react';
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
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024 // 10MB
  });

  const handleClear = () => {
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

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2 text-primary">Convert to Markdown</h2>
        <p className="text-muted text-lg">Convert PDF, Word & PowerPoint into clean Markdown instantly</p>
      </div>

      <div 
        {...getRootProps()} 
        className={`w-full max-w-2xl p-12 border-2 border-dashed rounded-[24px] bg-white transition-all duration-300 cursor-pointer flex flex-col items-center justify-center min-h-[300px]
          ${isDragActive ? 'border-primary bg-gray-50' : 'border-border hover:border-gray-400 hover:bg-gray-50'}
        `}
      >
        <input {...getInputProps()} />
        
        {!file ? (
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-2">
              <UploadCloud className="w-8 h-8 text-primary" />
            </div>
            <p className="text-xl font-semibold text-primary">Drag & drop your file here or click to upload</p>
            <p className="text-muted">Supported formats: PDF, DOCX, PPTX</p>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center gap-4">
            <File className="w-16 h-16 text-primary mb-2" />
            <div>
              <p className="text-xl font-semibold text-primary truncate max-w-[300px]">{file.name}</p>
              <p className="text-muted">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="text-red-500 font-medium bg-red-50 px-4 py-2 rounded-lg border border-red-200">
          {error}
        </div>
      )}

      <div className="flex items-center gap-4 w-full max-w-2xl">
        <button
          onClick={handleConvert}
          disabled={!file || isConverting}
          className={`flex-1 py-4 px-6 rounded-[16px] font-semibold text-lg transition-all duration-200 flex justify-center items-center gap-2
            ${!file || isConverting 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-primary text-white hover:bg-gray-800 active:scale-[0.98]'
            }
          `}
        >
          {isConverting ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              Converting...
            </>
          ) : (
            'Convert to Markdown'
          )}
        </button>

        <button
          onClick={handleClear}
          disabled={!file || isConverting}
          className={`py-4 px-6 rounded-[16px] font-semibold text-lg border border-border transition-all duration-200 flex justify-center items-center
            ${!file || isConverting 
              ? 'text-gray-400 border-gray-200 cursor-not-allowed' 
              : 'text-primary bg-white hover:bg-gray-50 active:scale-[0.98]'
            }
          `}
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
