'use client'

import React, { useState } from "react";

// Components Import
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
    <div className="min-h-[90%] flex items-center justify-center px-8">
      <Card className="bg-white p-8 mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center poppins-regular text-[#5a56f4]">Cek Stres</h1>
        {questions.map((question, index) => (
          <div key={question.id} className="mb-4">
            <p className="poppins-regular">{question.text}</p>
            <div className="flex space-x-2 mt-2">
              {question.options.map((option, optionIndex) => (
                <Button
                  key={optionIndex}
                  onClick={() => handleAnswerChange(index, optionIndex)}
                  className={`px-4 py-2 rounded-md text-sm poppins-regular ${
                    answers[index] === optionIndex
                      ? "bg-[#5a56f4] text-white hover:bg-[#5a56f4]/90"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        ))}
        <Button
          onClick={calculateStressLevel}
          className="poppins-regular w-full bg-[#5a56f4] text-white font-medium py-2 rounded-md mt-4 hover:bg-[#5a56f4]/90"
        >
          Hitung Tingkat Stres
        </Button>
        {result && (
          <div className="mt-6 p-4 bg-gray-100 rounded-md text-center border-2 border-[#5a56f4]">
            <p className="text-[#5a56f4] poppins-regular">{result}</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default StressCheckPage;
