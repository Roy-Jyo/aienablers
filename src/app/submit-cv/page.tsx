export default function SubmitCV() {
  return (
    <section className="max-w-4xl mx-auto py-24 px-6 text-center">
      <h1 className="text-4xl font-bold text-blue-700 mb-8">Submit Your CV</h1>
      <p className="text-gray-600 mb-10">
        Upload your resume and let our AI match you to the best opportunities.
      </p>
      <form className="bg-white p-8 rounded-2xl shadow-md space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full border border-gray-300 p-3 rounded-md"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 p-3 rounded-md"
        />
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          className="w-full border border-gray-300 p-3 rounded-md"
        />
        <button className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition">
          Submit CV
        </button>
      </form>
    </section>
  );
}
