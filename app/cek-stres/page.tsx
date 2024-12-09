'use client'

import React, { useState } from "react";

const StressCheckPage: React.FC = () => {
  const questions = [
    { id: 1, text: "Saya merasa mudah lelah.", options: ["Tidak Pernah", "Kadang-Kadang", "Sering", "Sangat Sering"] },
    { id: 2, text: "Saya merasa sulit berkonsentrasi.", options: ["Tidak Pernah", "Kadang-Kadang", "Sering", "Sangat Sering"] },
    { id: 3, text: "Saya merasa cemas atau khawatir secara berlebihan.", options: ["Tidak Pernah", "Kadang-Kadang", "Sering", "Sangat Sering"] },
    { id: 4, text: "Saya merasa sulit tidur atau kualitas tidur buruk.", options: ["Tidak Pernah", "Kadang-Kadang", "Sering", "Sangat Sering"] },
  ];

  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(0));
  const [result, setResult] = useState<string | null>(null);

  const handleAnswerChange = (questionId: number, value: number) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionId] = value;
    setAnswers(updatedAnswers);
  };

  const calculateStressLevel = () => {
    const totalScore = answers.reduce((sum, value) => sum + value, 0);

    if (totalScore <= 4) setResult("Tingkat stres Anda rendah. Tetap jaga kesehatan mental Anda!");
    else if (totalScore <= 8) setResult("Tingkat stres Anda sedang. Perhatikan tanda-tanda stres dan cari waktu untuk relaksasi.");
    else setResult("Tingkat stres Anda tinggi. Pertimbangkan untuk berkonsultasi dengan profesional kesehatan.");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">Cek Stres</h1>
        {questions.map((question, index) => (
          <div key={question.id} className="mb-4">
            <p className="text-lg font-medium">{question.text}</p>
            <div className="flex space-x-2 mt-2">
              {question.options.map((option, optionIndex) => (
                <button
                  key={optionIndex}
                  onClick={() => handleAnswerChange(index, optionIndex)}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    answers[index] === optionIndex
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}
        <button
          onClick={calculateStressLevel}
          className="w-full bg-blue-500 text-white font-medium py-2 rounded-md mt-4 hover:bg-blue-600"
        >
          Hitung Tingkat Stres
        </button>
        {result && (
          <div className="mt-6 p-4 bg-gray-100 rounded-md text-center">
            <p className="text-lg font-medium">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StressCheckPage;
