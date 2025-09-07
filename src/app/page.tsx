import Questionnaire from '@/components/Questionnaire';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.1)_25%,rgba(68,68,68,.1)_75%,transparent_75%,transparent),linear-gradient(-45deg,transparent_25%,rgba(68,68,68,.1)_25%,rgba(68,68,68,.1)_75%,transparent_75%,transparent)] bg-[length:20px_20px]"></div>
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-amber-500/10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/50"></div>
        
        <div className="relative text-center py-20 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Main Heading */}
            <div className="mb-6">
              <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-amber-200 bg-clip-text text-transparent mb-4">
                Find Your Perfect Car with AI
              </h1>
            </div>
            
            {/* Subtitle */}
            <h2 className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Advanced AI-powered matching system analyzes your lifestyle, preferences, and needs 
              to recommend the ideal vehicle from thousands of car options.
            </h2>
            
            {/* Features */}
            <section className="flex flex-wrap justify-center gap-6 mb-12 text-sm md:text-base" aria-label="Key Features">
              <div className="flex items-center space-x-2 bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-700/50">
                <div className="w-2 h-2 bg-green-400 rounded-full" aria-hidden="true"></div>
                <span className="text-slate-300">20 Smart Questions</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-700/50">
                <div className="w-2 h-2 bg-blue-400 rounded-full" aria-hidden="true"></div>
                <span className="text-slate-300">AI-Powered Analysis</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-700/50">
                <div className="w-2 h-2 bg-amber-400 rounded-full" aria-hidden="true"></div>
                <span className="text-slate-300">Personalized Results</span>
              </div>
            </section>
          </div>
        </div>
      </header>
      
      <main>
        <Questionnaire />
      </main>
    </div>
  );
}
