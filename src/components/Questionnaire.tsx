'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const questions = [
  {
    id: 'budget',
    question: 'What is your budget range for a car?',
    options: ['Under $20,000', '$20,000 - $35,000', '$35,000 - $50,000', '$50,000 - $75,000', 'Over $75,000']
  },
  {
    id: 'usage',
    question: 'How do you primarily use your car?',
    options: ['Daily commuting', 'Weekend trips', 'Family transportation', 'Business/work', 'Recreation/hobbies']
  },
  {
    id: 'size',
    question: 'What size vehicle do you prefer?',
    options: ['Compact/Small', 'Mid-size', 'Large/Full-size', 'SUV/Crossover', 'Truck/Van']
  },
  {
    id: 'fuel',
    question: 'What type of fuel/power do you prefer?',
    options: ['Gasoline', 'Hybrid', 'Electric', 'Diesel', 'No preference']
  },
  {
    id: 'priority',
    question: 'What is most important to you in a car?',
    options: ['Fuel efficiency', 'Reliability', 'Performance/Speed', 'Luxury/Comfort', 'Safety features']
  },
  {
    id: 'passengers',
    question: 'How many passengers do you typically carry?',
    options: ['Just myself', '2-3 people', '4-5 people', '6-7 people', '8+ people']
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