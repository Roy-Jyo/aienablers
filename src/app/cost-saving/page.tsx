"use client";
import React, { useState } from "react";

export default function CostSavingCalculator() {
  const [cost, setCost] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isCheaper, setIsCheaper] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cost !== null) {
      if (cost <= 1750) {
        setIsCheaper(true);
      } else {
        setIsCheaper(false);
      }
      setShowPopup(true);
    }
  };

  const handleClose = () => setShowPopup(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Calculate Your Recruitment Cost Saving
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-md"
      >
        <label className="block mb-2 text-gray-700 font-medium">
          Your average cost per role ($)
        </label>
        <input
          type="number"
          value={cost ?? ""}
          onChange={(e) => setCost(parseFloat(e.target.value))}
          className="border border-gray-300 rounded-md w-full p-2 mb-4 focus:ring-2 focus:ring-blue-500 text-blue-700"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg w-full"
        >
          Calculate
        </button>
      </form>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 shadow-xl w-full max-w-sm text-center">
            {isCheaper ? (
              <>
                <h2 className="text-xl font-semibold text-green-600 mb-2">
                  You’re already cost-efficient! 🎉
                </h2>
                <p className="text-gray-700 mb-4">
                  Your current cost per role is below <strong>$1750</strong>.
                  That’s an excellent benchmark — but with AIEnablers RaaS, you
                  can still gain speed, scale, and automation benefits.
                </p>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-blue-600 mb-2">
                  You could save up to 50%! 💡
                </h2>
                <p className="text-gray-700 mb-4">
                  Your current cost per role exceeds <strong>$1750</strong>. AIEnablers
                  can help you reduce time-to-hire and cost-per-role through
                  automation and AI screening.
                </p>
              </>
            )}
            <button
              onClick={handleClose}
              className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
