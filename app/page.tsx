import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-green-50 flex flex-col items-center justify-center py-6">
      <h1 className="text-5xl font-bold text-green-700 mb-4">
        TraceGreen
      </h1>

      <p className="text-lg text-gray-700 text-center max-w-xl mb-8">
        Smart sustainability dashboard for SMEs to track carbon impact,
        improve efficiency, and build a greener future.
      </p>

      <Link
        href="/assessment"
        className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition"
      >
        Start Assessment
      </Link>
    </main>
  );
}
