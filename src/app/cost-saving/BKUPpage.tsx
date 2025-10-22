'use client';

import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

export default function CostSaving() {
  const [cost, setCost] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const baseCost = 1750; // AI Enablers RaaS base cost per role
    const userCost = parseFloat(cost);
    if (!isNaN(userCost)) {
      const percent = ((baseCost - userCost) / baseCost) * 100;
      setSaving(percent);
      setShowModal(true);
    }
  };

  const COLORS = ['#2563EB', '#CBD5E1'];

  const data = saving
    ? [
        { name: 'Saving', value: saving > 0 ? saving : 0 },
        { name: 'Remaining Cost', value: saving > 0 ? 100 - saving : 100 },
      ]
    : [];

  return (
    <section className="max-w-4xl mx-auto py-24 px-6 text-center">
      <h1 className="text-4xl font-bold text-blue-700 mb-8">
        Calculate Your Cost Saving
      </h1>

      <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
        Compare your recruitment cost per role against our offering. Discover how much you save with{' '}
        <strong>AI Enablers RaaS</strong> — and how those savings grow as you
        scale your hiring.
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
          /*className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required */
          className="w-full border border-gray-300 p-3 rounded-md text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <div className="bg-white rounded-2xl shadow-lg p-8 w-11/12 max-w-lg text-center relative">
            <h2 className="text-2xl font-bold text-blue-700 mb-6">
              Your Cost Saving
            </h2>

            <div className="w-full h-60 mb-6">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={3}
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Legend verticalAlign="bottom" />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {saving >= 0 ? (
              <p className="text-lg text-gray-700 mb-4">
                You save <strong>{saving.toFixed(1)}%</strong> per role compared
                to traditional agencies — with{' '}
                <strong>AI Enablers RaaS</strong> priced at a flat{' '}
                <strong>$1,750</strong> for the first role.
              </p>
            ) : (
              <p className="text-lg text-gray-700 mb-4">
                Your cost per role is{' '}
                <strong>{Math.abs(Number(saving.toFixed(1)))}% higher compared to </strong>
                <strong>AI Enablers RaaS</strong>. Switching can immediately
                reduce your recruitment spend.
              </p>
            )}

            <p className="text-gray-600 mb-6">
              With <strong>AI Enablers RaaS</strong>, subsequent roles fulfilled
              within the same month are offered at a reduced cost — delivering
              even greater savings as you scale your hiring. The more roles you
              fill, the higher your overall efficiency and ROI.
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


