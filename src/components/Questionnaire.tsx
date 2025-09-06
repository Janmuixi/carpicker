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
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-xl text-gray-300">Getting your personalized car recommendations...</p>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-700 p-8">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-white">Car Recommendation Quiz</h1>
              <span className="text-sm text-gray-400">
                {currentQuestion + 1} of {questions.length}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-200 mb-6">
              {question.question}
            </h2>
            <div className="space-y-3">
              {question.options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  className="w-full text-left p-4 border border-gray-600 rounded-lg hover:border-blue-400 hover:bg-gray-700 transition-colors text-gray-200"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {currentQuestion > 0 && (
            <button
              onClick={goBack}
              className="text-blue-400 hover:text-blue-300 font-medium"
            >
              ← Go back
            </button>
          )}
        </div>
      </div>
    </div>
  );
}