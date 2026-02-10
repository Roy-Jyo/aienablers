"use client";
import React, { useState } from "react";

export default function CostSavingCalculator() {
  const [cost, setCost] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState({
    title: "",
    text: "",
    color: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (cost !== null) {
      if (cost <= 500) {
        setPopupMessage({
          title: "You're already cost-efficient! 🎉",
          text: "You’re already efficiently managing role fulfilment at $500 or less per role.",
          color: "text-green-600",
        });
        setShowPopup(true);
      } else {
        setPopupMessage({
          title: "Significant savings ahead 💡",
          text: "You can have a significant cost saving with AIEnablers service.",
          color: "text-blue-600",
        });
        setShowPopup(true);
      }
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
            <h2 className={`text-xl font-semibold mb-2 ${popupMessage.color}`}>
              {popupMessage.title}
            </h2>
            {cost !== null && cost > 500 && (
              <div className="mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-white shadow-inner">
                <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-slate-100">
                  <div className="absolute inset-0 rounded-full bg-[conic-gradient(theme(colors.blue.500)_0deg_220deg,theme(colors.slate.200)_220deg_360deg)]" />
                  <div className="relative z-10 rounded-full bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow">
                    Savings
                  </div>
                </div>
              </div>
            )}
            <p className="text-gray-700 mb-4">{popupMessage.text}</p>
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
