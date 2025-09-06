'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const questions = [
  {
    id: 'budget',
    question: 'What is your total budget for purchasing a car?',
    options: ['Under $15,000', '$15,000 - $25,000', '$25,000 - $40,000', '$40,000 - $60,000', '$60,000 - $85,000', 'Over $85,000']
  },
  {
    id: 'financing',
    question: 'How are you planning to pay for the car?',
    options: ['Cash payment', 'Finance/loan', 'Lease', 'Trade-in plus financing', 'Not sure yet']
  },
  {
    id: 'usage_primary',
    question: 'What will be your primary use for this car?',
    options: ['Daily work commute', 'Family transportation', 'Weekend recreation', 'Business travel', 'Delivery/work vehicle']
  },
  {
    id: 'daily_miles',
    question: 'How many miles do you drive on a typical day?',
    options: ['Less than 20 miles', '20-50 miles', '50-100 miles', '100-150 miles', 'More than 150 miles']
  },
  {
    id: 'commute_type',
    question: 'What type of driving do you do most?',
    options: ['City/urban driving', 'Highway/freeway', 'Mixed city and highway', 'Rural/country roads', 'Off-road/unpaved']
  },
  {
    id: 'passengers',
    question: 'How many people do you need to seat regularly?',
    options: ['Just myself (1)', '2 people', '3-4 people', '5-6 people', '7+ people']
  },
  {
    id: 'cargo_needs',
    question: 'How much cargo/storage space do you need?',
    options: ['Minimal (small trunk)', 'Moderate (standard trunk)', 'Large (SUV-sized)', 'Maximum (truck bed/large van)', 'Flexible/removable seats']
  },
  {
    id: 'vehicle_type',
    question: 'What type of vehicle appeals to you most?',
    options: ['Sedan', 'Hatchback/wagon', 'SUV/Crossover', 'Pickup truck', 'Sports car', 'Minivan']
  },
  {
    id: 'size_preference',
    question: 'What size vehicle do you prefer?',
    options: ['Compact (easy parking)', 'Mid-size (balanced)', 'Full-size (spacious)', 'No preference', 'Depends on other factors']
  },
  {
    id: 'fuel_type',
    question: 'What type of power/fuel do you prefer?',
    options: ['Gasoline', 'Hybrid (gas + electric)', 'Fully electric', 'Plug-in hybrid', 'Diesel', 'No preference']
  },
  {
    id: 'fuel_economy',
    question: 'How important is fuel economy to you?',
    options: ['Extremely important (35+ MPG)', 'Very important (25-35 MPG)', 'Moderately important (20-25 MPG)', 'Less important (15-20 MPG)', 'Not a concern']
  },
  {
    id: 'brand_preference',
    question: 'Do you have any brand preferences?',
    options: ['American brands (Ford, GM, Chrysler)', 'Japanese brands (Toyota, Honda, Nissan)', 'German luxury (BMW, Mercedes, Audi)', 'Korean brands (Hyundai, Kia)', 'No preference', 'Avoid certain brands']
  },
  {
    id: 'reliability_importance',
    question: 'How important is long-term reliability to you?',
    options: ['Extremely important (keep 10+ years)', 'Very important (keep 5-10 years)', 'Moderately important (keep 3-5 years)', 'Less important (keep 2-3 years)', 'Not important (frequent upgrades)']
  },
  {
    id: 'features_priority',
    question: 'Which feature category matters most to you?',
    options: ['Safety features (collision avoidance, airbags)', 'Technology (infotainment, smartphone integration)', 'Comfort (heated seats, climate control)', 'Performance (acceleration, handling)', 'Convenience (keyless entry, remote start)']
  },
  {
    id: 'driving_style',
    question: 'How would you describe your driving style?',
    options: ['Calm and conservative', 'Practical and efficient', 'Enthusiastic but safe', 'Performance-oriented', 'Varies by situation']
  },
  {
    id: 'weather_conditions',
    question: 'What weather conditions do you regularly drive in?',
    options: ['Mild weather year-round', 'Regular rain/wet conditions', 'Snow and ice in winter', 'Extreme heat', 'All weather conditions']
  },
  {
    id: 'parking_situation',
    question: 'Where do you typically park?',
    options: ['Garage at home', 'Driveway', 'Street parking', 'Parking lots/garages', 'Mix of locations']
  },
  {
    id: 'maintenance_preference',
    question: 'How do you prefer to handle maintenance?',
    options: ['Dealership service only', 'Independent mechanic', 'Do some work myself', 'Minimal maintenance preferred', 'Whatever is most convenient']
  },
  {
    id: 'resale_concern',
    question: 'How important is resale value to you?',
    options: ['Very important (planning to sell)', 'Moderately important', 'Somewhat important', 'Not very important', 'Plan to drive until it dies']
  },
  {
    id: 'timeline',
    question: 'When do you need to purchase this car?',
    options: ['Immediately (within 2 weeks)', 'Soon (within 1-2 months)', 'This year', 'Flexible timeline', 'Just researching for now']
  }
];

export default function Questionnaire() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleAnswer = (answer: string) => {
    const newAnswers = {
      ...answers,
      [questions[currentQuestion].question]: answer
    };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      submitAnswers(newAnswers);
    }
  };

  const submitAnswers = async (finalAnswers: Record<string, string>) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/recommend-cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers: finalAnswers }),
      });

      if (response.ok) {
        const { recommendations } = await response.json();
        sessionStorage.setItem('carRecommendations', JSON.stringify(recommendations));
        router.push('/results');
      } else {
        console.error('Failed to get recommendations');
      }
    } catch (error) {
      console.error('Error submitting answers:', error);
    }
    setIsLoading(false);
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      const newAnswers = { ...answers };
      delete newAnswers[questions[currentQuestion].question];
      setAnswers(newAnswers);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
        <div className="text-center">
          <div className="relative">
            {/* Outer rotating ring */}
            <div className="animate-spin rounded-full h-32 w-32 border-4 border-transparent border-t-blue-500 border-r-cyan-400 mx-auto mb-4"></div>
            {/* Inner rotating ring */}
            <div className="absolute top-2 left-2 animate-spin rounded-full h-28 w-28 border-4 border-transparent border-b-amber-400 border-l-blue-300" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
            {/* Center circle */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-slate-900 rounded-full"></div>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Analyzing Your Preferences</h3>
          <p className="text-lg text-slate-300 max-w-md mx-auto">
            Our AI is processing your answers to find the perfect vehicle matches...
          </p>
          <div className="flex justify-center space-x-1 mt-6">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 py-8 px-4 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.05)_25%,rgba(68,68,68,.05)_75%,transparent_75%,transparent),linear-gradient(-45deg,transparent_25%,rgba(68,68,68,.05)_25%,rgba(68,68,68,.05)_75%,transparent_75%,transparent)] bg-[length:40px_40px]"></div>
      
      <div className="max-w-4xl mx-auto relative">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-3 bg-slate-800/50 backdrop-blur-sm px-6 py-3 rounded-full border border-slate-700/50 mb-6">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
            </div>
            <span className="text-slate-300 font-medium">AI Analysis in Progress</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Vehicle Matching System
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Question {currentQuestion + 1} of {questions.length} • Estimated time: {Math.max(1, questions.length - currentQuestion - 1)} min remaining
          </p>
        </div>

        {/* Progress Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-slate-400">Progress</span>
            <span className="text-sm font-medium text-slate-300">
              {Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete
            </span>
          </div>
          <div className="relative w-full bg-slate-800/50 rounded-full h-3 backdrop-blur-sm border border-slate-700/50">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-amber-400 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full"></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-slate-800/30 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8 md:p-12 shadow-2xl">
          <div className="mb-10">
            <div className="flex items-start space-x-4 mb-6">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">{currentQuestion + 1}</span>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                  {question.question}
                </h2>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:gap-5">
            {question.options.map((option, index) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className="group relative w-full text-left p-5 md:p-6 bg-slate-900/30 border border-slate-700/50 rounded-xl hover:border-blue-400/50 hover:bg-slate-800/40 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-slate-600 group-hover:border-blue-400 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-slate-600 group-hover:bg-blue-400 transition-colors duration-300"></div>
                  </div>
                  <span className="text-slate-200 group-hover:text-white transition-colors duration-300 text-lg font-medium">
                    {option}
                  </span>
                </div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12">
            {currentQuestion > 0 ? (
              <button
                onClick={goBack}
                className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors duration-300 font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Previous Question</span>
              </button>
            ) : (
              <div></div>
            )}
            
            <div className="text-right">
              <p className="text-slate-500 text-sm mb-1">Select an option to continue</p>
              <div className="flex space-x-1">
                {questions.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                      index < currentQuestion ? 'bg-green-400' :
                      index === currentQuestion ? 'bg-blue-400' : 'bg-slate-700'
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}