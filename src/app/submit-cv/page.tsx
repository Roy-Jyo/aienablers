'use client';

import { useState } from 'react';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const getTransactionId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}`;

export default function SubmitCV() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return setStatus('Please choose a file first.');

    const formData = new FormData();
    formData.append('file', file);

    setStatus('Uploading...');

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      if (res.ok) {
        setStatus('✅ File uploaded successfully!');
        window.gtag?.('event', 'conversion', {
          send_to: 'AW-17911983430/rP9_CJWSle4bEMbajN1C',
          value: 1.0,
          currency: 'AUD',
          transaction_id: getTransactionId(),
        });
      } else {
        setStatus('❌ Upload failed.');
      }
    } catch {
      setStatus('❌ Upload failed.');
    }
  };

  return (
    <section className="max-w-4xl mx-auto py-24 px-6 text-center">
      <h1 className="text-4xl font-bold text-blue-700 mb-8">Submit Your CV</h1>
      <p className="text-gray-600 mb-10">
        Upload your resume securely to our Microsoft 365 cloud.
      </p>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md space-y-4"
      >
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full border border-gray-300 p-3 rounded-md"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          Upload CV
        </button>
      </form>
      {status && <p className="mt-4 text-sm text-blue-600">{status}</p>}
    </section>
  );
}
