export default function CostSaving() {
  return (
    <section className="max-w-5xl mx-auto py-24 px-6 text-center">
      <h1 className="text-4xl font-bold text-blue-700 mb-8">Calculate Cost Saving</h1>
      <p className="text-gray-600 mb-10">
        Estimate how much you save using RecruitAI versus traditional recruitment.
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
}
