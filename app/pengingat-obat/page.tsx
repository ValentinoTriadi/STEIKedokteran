"use client";

import { useState } from 'react';

type Reminder = {
  id: number;
  medicineName: string;
  dosage: number;
  time: string;
};

const MedicineReminder: React.FC = () => {
  const [medicineName, setMedicineName] = useState<string>('');
  const [dosage, setDosage] = useState<number | ''>('');
  const [time, setTime] = useState<string>('');
  const [reminders, setReminders] = useState<Reminder[]>([]);

  const handleAddReminder = () => {
    if (!medicineName || !dosage || !time) {
      alert('Please fill out all fields!');
      return;
    }

    const newReminder: Reminder = {
      id: Date.now(),
      medicineName,
      dosage: Number(dosage),
      time,
    };

    setReminders([...reminders, newReminder]);
    setMedicineName('');
    setDosage('');
    setTime('');
  };

  const handleDeleteReminder = (id: number) => {
    setReminders(reminders.filter((reminder) => reminder.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Pengingat Obat</h1>

        {/* Input Fields */}
        <div className="space-y-4">
          <div>
            <label htmlFor="medicineName" className="block text-sm font-medium text-gray-700">
              Nama Obat
            </label>
            <input
              type="text"
              id="medicineName"
              value={medicineName}
              onChange={(e) => setMedicineName(e.target.value)}
              placeholder="Masukkan nama obat"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="dosage" className="block text-sm font-medium text-gray-700">
              Dosis Per Hari
            </label>
            <input
              type="number"
              id="dosage"
              value={dosage || ''}
              onChange={(e) => setDosage(Number(e.target.value))}
              placeholder="Masukkan dosis"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700">
              Jam Pengingat
            </label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Add Button */}
        <button
          onClick={handleAddReminder}
          className="mt-6 w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Tambahkan Pengingat
        </button>

        {/* Reminder List */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Daftar Pengingat</h2>
          {reminders.length > 0 ? (
            <ul className="space-y-4">
              {reminders.map((reminder) => (
                <li
                  key={reminder.id}
                  className="flex justify-between items-center bg-gray-50 p-4 rounded-md shadow-sm"
                >
                  <div>
                    <p className="text-lg font-medium">{reminder.medicineName}</p>
                    <p className="text-sm text-gray-500">
                      {reminder.dosage} kali sehari - {reminder.time}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteReminder(reminder.id)}
                    className="text-red-600 hover:underline"
                  >
                    Hapus
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Belum ada pengingat yang ditambahkan.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicineReminder;