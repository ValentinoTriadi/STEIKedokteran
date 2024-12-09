"use client";


// Library Import
import React, { useState } from "react";

// Components Import
import {
  Card,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const KalkulatorBMI = () => {
  const [height, setHeight] = useState<number | ''>('');
  const [weight, setWeight] = useState<number | ''>('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [status, setStatus] = useState<string>('');

  const calculateBMI = () => {
    if (!height || !weight) {
      alert("Harap masukkan tinggi dan berat badan!");
      return;
    }

    const heightInMeters = height / 100; // Konversi cm ke meter
    const bmiValue = parseFloat((weight / (heightInMeters ** 2)).toFixed(2)); // Hitung BMI dengan pembulatan 2 desimal
    setBmi(bmiValue);

    // Tentukan status berdasarkan nilai BMI
    if (bmiValue < 18.5) {
      setStatus("Berat badan kurang");
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      setStatus("Berat badan normal");
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      setStatus("Kelebihan berat badan");
    } else {
      setStatus("Obesitas");
    }
  };

  return (
    <div className="min-h-[90%] flex flex-col items-center justify-center px-8">
      <Card className="w-full max-w-md bg-white p-8">
        <h1 className="text-2xl font-bold text-center mb-6 poppins-regular text-[#5a56f4]">Kalkulator BMI</h1>
        <div className="mb-4 space-y-2">
          <label htmlFor="height" className="block text-sm font-medium text-gray-700 poppins-regular">
            Tinggi Badan (cm):
          </label>
          <Input
            type="number"
            id="height"
            value={height}
            onChange={(e) => setHeight(e.target.value ? parseFloat(e.target.value) : '')}
            placeholder="Masukkan tinggi badan"
            className="mt-1 block w-full sm:text-sm focus-visible:ring-transparent poppins-regular"
          />
        </div>
        <div className="mb-4 space-y-2">
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700 poppins-regular">
            Berat Badan (kg):
          </label>
          <Input
            type="number"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value ? parseFloat(e.target.value) : '')}
            placeholder="Masukkan berat badan"
            className="mt-1 block w-full sm:text-sm focus-visible:ring-transparent poppins-regular"
          />
        </div>
        <Button
          onClick={calculateBMI}
          className="w-full py-2 px-4 poppins-regular bg-[#5a56f4] text-white font-medium rounded-md hover:bg-[#5a56f4]/90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Hitung BMI
        </Button>
        <div className="mt-6 text-start poppins-regular">
          <h2 className="text-xl font-bold text-[#5a56f4]">Hasil BMI: {bmi !== null ? bmi : "-"}</h2>
          <p className="text-lg text-gray-600">Status: {status || "-"}</p>
        </div>
      </Card>
    </div>
  );
};

export default KalkulatorBMI;