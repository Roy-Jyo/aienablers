'use client';

import { useState } from 'react';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Array<Record<string, unknown>>;
  }
}

const getTransactionId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}`;

export default function SubmitCV() {
  const [file, setFile] = useState<File | null>(null);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return setStatus('Please choose a file first.');
    if (!email && !phone)
      return setStatus('Please provide an email or phone number.');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('email', email);
    formData.append('phone', phone);

    setStatus('Uploading...');

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      if (res.ok) {
        setStatus('✅ File uploaded successfully!');
        if (email || phone) {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: 'lead_form_submit',
            user_data: {
              email: email || undefined,
              phone_number: phone || undefined,
            },
          });
        }
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
        Upload your resume and share your contact details so we can follow up.
      </p>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md space-y-4"
      >
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className="w-full border border-gray-300 p-3 rounded-md"
        />
        <input
          type="tel"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone number (include country code)"
          className="w-full border border-gray-300 p-3 rounded-md"
        />
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
