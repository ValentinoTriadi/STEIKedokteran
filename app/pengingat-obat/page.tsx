"use client";

import { useState } from "react";

// Components Import
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Reminder = {
  id: number;
  medicineName: string;
  dosage: number;
  time: string;
};

const MedicineReminder: React.FC = () => {
  const [medicineName, setMedicineName] = useState<string>("");
  const [dosage, setDosage] = useState<number | "">("");
  const [time, setTime] = useState<string>("");
  const [reminders, setReminders] = useState<Reminder[]>([]);

  const handleAddReminder = () => {
    if (!medicineName || !dosage || !time) {
      alert("Please fill out all fields!");
      return;
    }

    const newReminder: Reminder = {
      id: Date.now(),
      medicineName,
      dosage: Number(dosage),
      time,
    };

    setReminders([...reminders, newReminder]);
    setMedicineName("");
    setDosage("");
    setTime("");
  };

  const handleDeleteReminder = (id: number) => {
    setReminders(reminders.filter((reminder) => reminder.id !== id));
  };

  return (
    <div className="min-h-[90%] flex items-center justify-center px-8">
      <Card className="w-full max-w-5xl p-8 flex flex-col lg:flex-row gap-8">
        {/* Form Input */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-center mb-6 poppins-regular text-[#5a56f4]">
            Pengingat Obat
          </h1>

          <div className="space-y-4">
            <div className="space-y-2 poppins-regular">
              <label
                htmlFor="medicineName"
                className="block text-sm font-medium text-gray-700"
              >
                Nama Obat
              </label>
              <Input
                type="text"
                id="medicineName"
                value={medicineName}
                onChange={(e) => setMedicineName(e.target.value)}
                placeholder="Masukkan nama obat"
                className="mt-1 block w-full sm:text-sm focus-visible:ring-transparent"
              />
            </div>

            <div className="space-y-2 poppins-regular">
              <label
                htmlFor="dosage"
                className="block text-sm font-medium text-gray-700"
              >
                Dosis Per Hari
              </label>
              <Input
                type="number"
                id="dosage"
                value={dosage || ""}
                onChange={(e) => setDosage(Number(e.target.value))}
                placeholder="Masukkan dosis"
                className="mt-1 block w-full sm:text-sm focus-visible:ring-transparent"
              />
            </div>

            <div className="space-y-2 poppins-regular">
              <label
                htmlFor="time"
                className="block text-sm font-medium text-gray-700"
              >
                Jam Pengingat
              </label>
              <Input
                type="time"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="mt-1 block w-full rounded-md focus-visible:ring-transparent sm:text-sm"
              />
            </div>
          </div>

          <Button
            onClick={handleAddReminder}
            className="mt-4 poppins-regular w-full py-2 px-4 bg-[#5a56f4] text-white font-medium rounded-md hover:bg-[#5a56f4]/90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Tambahkan Pengingat
          </Button>
        </div>

        {/* Reminder List */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-4 text-[#5a56f4] poppins-regular">
            Daftar Pengingat
          </h2>
          {reminders.length > 0 ? (
            <ul className="space-y-4">
              {reminders.map((reminder) => (
                <li
                  key={reminder.id}
                  className="flex justify-between items-center bg-[#5a56f4] p-4 rounded-md shadow-sm"
                >
                  <div className="poppins-regular text-white">
                    <p className="text-lg font-medium">{reminder.medicineName}</p>
                    <p className="text-sm text-white/90">
                      {reminder.dosage} kali sehari - {reminder.time}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteReminder(reminder.id)}
                    className="text-red-600 bg-white rounded-full px-4 py-2 text-sm"
                  >
                    Hapus
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 poppins-regular">Belum ada pengingat yang ditambahkan.</p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default MedicineReminder;