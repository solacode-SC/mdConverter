"use client";

import React, { useState } from 'react';
import UploadBox from '@/components/UploadBox';
import MarkdownPreview from '@/components/MarkdownPreview';

export default function Home() {
  const [result, setResult] = useState<{ filename: string; markdown: string } | null>(null);

  const handleSuccess = (filename: string, markdown: string) => {
    setResult({ filename, markdown });
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <div className="w-full flex flex-col items-center min-h-[80vh] justify-center py-10">
      {!result ? (
        <UploadBox onSuccess={handleSuccess} />
      ) : (
        <MarkdownPreview 
          filename={result.filename} 
          markdown={result.markdown} 
          onReset={handleReset} 
        />
      )}
    </div>
  );
}
