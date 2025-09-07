"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
        <main className="text-center">
          <div className="relative">
            <div
              className="animate-spin rounded-full h-32 w-32 border-4 border-transparent border-t-blue-500 border-r-cyan-400 mx-auto mb-4"
              aria-label="Loading animation"
              style={{ willChange: "transform" }}
            ></div>
            <div
              className="absolute top-2 left-2 animate-spin rounded-full h-28 w-28 border-4 border-transparent border-b-amber-400 border-l-blue-300"
              style={{
                animationDirection: "reverse",
                animationDuration: "1.5s",
                willChange: "transform",
              }}
            ></div>
          </div>
          <p className="text-xl text-slate-300">
            Loading your car recommendations...
          </p>
        </main>
      </div>
    );
  }

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              name: "Car Recommendations",
              description:
                "Personalized car recommendations based on AI analysis",
              numberOfItems: recommendations.length,
              itemListElement: recommendations.map((car, index) => ({
                "@type": "Product",
                position: index + 1,
                name: `${car.year} ${car.make} ${car.model}`,
                description: car.reason,
                brand: {
                  "@type": "Brand",
                  name: car.make,
                },
                model: car.model,
                vehicleModelDate: car.year.toString(),
                category: "Vehicle",
              })),
            }),
          }}
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7658109687581666"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 relative">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.05)_25%,rgba(68,68,68,.05)_75%,transparent_75%,transparent),linear-gradient(-45deg,transparent_25%,rgba(68,68,68,.05)_25%,rgba(68,68,68,.05)_75%,transparent_75%,transparent)] bg-[length:40px_40px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/50"></div>

        <div className="relative py-16 px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <header className="text-center mb-16">
              {/* Success Badge */}
              <div className="inline-flex items-center space-x-3 bg-green-500/10 backdrop-blur-sm px-6 py-3 rounded-full border border-green-500/30 mb-8">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-300 font-medium">
                  Analysis Complete
                </span>
              </div>

              {/* Main Title */}
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
                  Your Perfect Vehicle Matches
                </span>
              </h1>

              <h2 className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Our AI has analyzed your preferences and lifestyle to recommend
                these carefully selected vehicles
              </h2>
            </header>

            {/* Recommendations Grid */}
            <main className="grid gap-8 lg:gap-10">
              {recommendations.map((car, index) => (
                <article
                  key={index}
                  className="group relative bg-slate-800/30 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8 md:p-10 shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:border-blue-400/50"
                  itemScope
                  itemType="https://schema.org/Product"
                >
                  {/* Rank Badge */}
                  <div className="absolute -top-4 left-8">
                    <div className="bg-gradient-to-br from-blue-500 to-cyan-400 text-white rounded-2xl px-4 py-2 font-bold text-lg shadow-lg">
                      #{index + 1} Match
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="pt-4">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
                      {/* Vehicle Info */}
                      <div className="flex-1">
                        <div className="mb-6">
                          <h3
                            className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-blue-100 transition-colors duration-300"
                            itemProp="name"
                          >
                            {car.year} {car.make} {car.model}
                          </h3>
                          <meta itemProp="brand" content={car.make} />
                          <meta itemProp="model" content={car.model} />
                          <meta
                            itemProp="vehicleModelDate"
                            content={car.year.toString()}
                          />
                          <div className="flex items-center space-x-3">
                            <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"></div>
                            <span className="text-slate-400 font-medium">
                              Recommended for you
                            </span>
                          </div>
                        </div>

                        {/* Reasoning */}
                        <div className="bg-slate-900/40 rounded-2xl p-6 border border-slate-700/30">
                          <h3 className="text-xl font-semibold text-blue-300 mb-3 flex items-center">
                            <svg
                              className="w-5 h-5 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                              />
                            </svg>
                            Why This Car Matches You
                          </h3>
                          <p
                            className="text-slate-300 leading-relaxed text-lg"
                            itemProp="description"
                          >
                            {car.reason}
                          </p>
                        </div>
                      </div>

                      {/* Match Score Visualization */}
                      <div className="mt-6 lg:mt-0 lg:w-48">
                        <div className="bg-slate-900/40 rounded-2xl p-6 border border-slate-700/30 text-center">
                          <div className="mb-4">
                            <div className="text-3xl font-bold text-white mb-1">
                              {95 - index * 8}%
                            </div>
                            <div className="text-slate-400 text-sm font-medium">
                              Match Score
                            </div>
                          </div>

                          {/* Circular Progress */}
                          <div className="relative w-20 h-20 mx-auto">
                            <svg
                              className="w-20 h-20 transform -rotate-90"
                              viewBox="0 0 36 36"
                            >
                              <path
                                className="text-slate-700"
                                stroke="currentColor"
                                strokeWidth="3"
                                fill="transparent"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              />
                              <path
                                className="text-blue-400"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeDasharray={`${95 - index * 8}, 100`}
                                strokeLinecap="round"
                                fill="transparent"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/5 to-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </article>
              ))}
            </main>

            {/* Action Section */}
            <section className="text-center mt-16">
              <div className="bg-slate-800/30 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8 md:p-10 shadow-2xl max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Need Different Car Recommendations?
                </h3>
                <p className="text-slate-300 mb-8 leading-relaxed">
                  If none of these options feel right, take the quiz again with
                  different preferences to get new recommendations.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={startOver}
                    className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-500 hover:to-cyan-400 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 text-lg"
                  >
                    Take Quiz Again
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
