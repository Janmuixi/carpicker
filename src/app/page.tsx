import Questionnaire from '@/components/Questionnaire';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="text-center py-12 bg-gray-800 shadow-lg border-b border-gray-700">
        <h1 className="text-4xl font-bold text-white mb-4">
          Car Picker
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto px-4">
          Answer a few quick questions and get personalized car recommendations 
          powered by AI to help you find your perfect vehicle.
        </p>
      </div>
      <Questionnaire />
    </div>
  );
}
