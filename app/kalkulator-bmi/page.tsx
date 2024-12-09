"use client"

import React, { useState } from 'react'

const KalkulatorBMI = () => {
  const [height, setHeight] = useState<number | ''>('');
  const [weight, setWeight] = useState<number | ''>('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [status, setStatus] = useState<string>('');

  const calculateBMI = () => {
    if (!height || !weight) {
      alert('Please enter both height and weight!');
      return;
    }

    const heightInMeters = height / 100;
    const bmiValue = parseFloat((weight / (heightInMeters ** 2)).toFixed(2));
    setBmi(bmiValue);

    if (bmiValue < 18.5) {
      setStatus('Underweight');
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      setStatus('Normal weight');
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      setStatus('Overweight');
    } else {
      setStatus('Obesity');
    }
  };

  return (
    <div className="min-h-[90%] flex flex-col items-center justify-center px-8">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Kalkulator BMI</h1>
        <div className="mb-4">
          <label htmlFor="height" className="block text-sm font-medium text-gray-700">
            Tinggi Badan (cm):
          </label>
          <input
            type="number"
            id="height"
            placeholder="Masukkan tinggi badan"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
            Berat Badan (kg):
          </label>
          <input
            type="number"
            id="weight"
            placeholder="Masukkan berat badan"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <button
          className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Hitung BMI
        </button>
        <div className="mt-6 text-center">
          <h2 className="text-xl font-bold">Hasil BMI: -</h2>
          <p className="text-lg text-gray-600">Status: -</p>
        </div>
      </div>
    </div>
  );    
}

export default KalkulatorBMI
