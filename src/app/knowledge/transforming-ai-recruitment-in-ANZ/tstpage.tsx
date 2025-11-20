import Link from "next/link";

export default function TransformingAIRecruitmentANZ() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-4xl mx-auto py-16 px-6">
        <p className="text-xs text-gray-500 mb-2">
          <Link href="/knowledge" className="text-blue-600 hover:underline">
            Knowledge Hub
          </Link>{" "}
          / Transforming AI Recruitment in ANZ
        </p>

        <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
          Transforming AI Recruitment in ANZ
        </h1>
        <p className="text-gray-700">
          Test page – if you can see this, the route is working correctly.
        </p>
      </section>
    </main>
  );
}
