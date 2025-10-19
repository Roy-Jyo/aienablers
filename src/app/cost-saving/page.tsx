'use client';

import { useState } from 'react';

export default function CostSaving() {
  const [cost, setCost] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const baseCost = 1750;
    const userCost = parseFloat(cost);
    if (!isNaN(userCost)) {
      const percent = ((baseCost - userCost) / baseCost) * 100;
      setSaving(percent);
      setShowModal(true);
    }
  };

  return (
    <section className="max-w-4xl mx-auto py-24 px-6 text-center">
      <h1 className="text-4xl font-bold text-blue-700 mb-8">
        Calculate Your Cost Saving
      </h1>
      <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
        Compare your recruitment cost per role to the traditional average of <strong>$1750</strong>.
        Discover how much you save with AIENablers' RaaS — and how those savings grow with scale.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md max-w-md mx-auto space-y-4"
      >
        <input
          type="number"
          placeholder="Your average cost per role ($)"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          Calculate Saving
        </button>
      </form>

      {/* Modal Popup */}
      {showModal && saving !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-2xl shadow-lg p-8 w-11/12 max-w-lg text-center">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">Your Saving</h2>

            {saving >= 0 ? (
              <p className="text-lg text-gray-700 mb-6">
                You save <strong>{saving.toFixed(1)}%</strong> per role using AIENablers' RaaS
                compared to the traditional agency cost of $1750.
              </p>
            ) : (
              <p className="text-lg text-gray-700 mb-6">
                Your cost per role is <strong>{Math.abs(saving.toFixed(1))}% higher</strong>
                than the traditional average — explore our service to optimise further!
              </p>
            )}

            <p className="text-gray-600 mb-8">
              As you fulfil more roles each month, your total saving compounds — 
              imagine saving <strong>{(saving > 0 ? saving : 0).toFixed(1)}%</strong> across
              5, 10, or 20 roles — that’s significant ROI for your business.
            </p>

            <button
              onClick={() => setShowModal(false)}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}


/* 
export default function CostSaving() {
  return (
    <section className="max-w-5xl mx-auto py-24 px-6 text-center">
      <h1 className="text-4xl font-bold text-blue-700 mb-8">Calculate Cost Saving</h1>
      <p className="text-gray-600 mb-10">
        Estimate how much you save using AI Enabler's RaaS versus traditional recruitment.
      </p>

      <div className="bg-white p-8 rounded-2xl shadow-md max-w-md mx-auto">
        <form className="space-y-4">
          <input
            type="number"
            placeholder="Number of Roles per Year"
            className="w-full border border-gray-300 p-3 rounded-md"
          />
          <input
            type="number"
            placeholder="Average Cost per Role ($)"
            className="w-full border border-gray-300 p-3 rounded-md"
          />
          <button className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition">
            Calculate
          </button>
        </form>
      </div>
    </section>
  );
} */


