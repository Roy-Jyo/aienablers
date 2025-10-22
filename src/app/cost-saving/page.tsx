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
      if (cost <= 1750) {
        setPopupMessage({
          title: "You're already cost-efficient! 🎉",
          text: "Your recruitment process is already performing at an efficient level compared to market standards. That’s impressive — and with AIEnablers RaaS, you can still enhance scalability, automation, and time-to-hire.",
          color: "text-green-600",
        });
      } else {
        setPopupMessage({
          title: "You could save up to 50%! 💡",
          text: "Your current recruitment cost could be significantly reduced through AI automation. AIEnablers helps streamline job posting, screening, and interviews for faster, smarter, and bias-free hiring.",
          color: "text-blue-600",
        });
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
            <h2 className={`text-xl font-semibold mb-2 ${popupMessage.color}`}>
              {popupMessage.title}
            </h2>
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
