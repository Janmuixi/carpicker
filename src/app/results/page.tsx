"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface CarRecommendation {
  make: string;
  model: string;
  year: number;
  reason: string;
}

export default function ResultsPage() {
  const [recommendations, setRecommendations] = useState<CarRecommendation[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedRecommendations = sessionStorage.getItem("carRecommendations");
    if (storedRecommendations) {
      setRecommendations(JSON.parse(storedRecommendations));
    } else {
      router.push("/");
    }
    setLoading(false);
  }, [router]);

  const startOver = () => {
    sessionStorage.removeItem("carRecommendations");
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white mb-4">
            Your Personalized Car Recommendations
          </h1>
          <p className="text-lg text-gray-300">
            Based on your preferences, here are 5 cars we think you&apos;ll love
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {recommendations.map((car, index) => (
            <div
              key={index}
              className="bg-gray-800 border border-gray-700 rounded-lg shadow-xl p-6 hover:shadow-2xl hover:border-gray-600 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {car.year} {car.make} {car.model}
                    </h3>
                  </div>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">{car.reason}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={startOver}
            className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-400 transition-colors font-medium"
          >
            Take Quiz Again
          </button>
        </div>
      </div>
    </div>
  );
}
