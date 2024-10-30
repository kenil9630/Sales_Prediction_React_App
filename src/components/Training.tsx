import React, { useEffect, useState } from 'react';
import { Brain } from 'lucide-react';

interface TrainingProps {
  onNext: () => void;
}

export default function Training({ onNext }: TrainingProps) {
  const [progress, setProgress] = useState(0);
  const [currentEpoch, setCurrentEpoch] = useState(1);
  const totalEpochs = 100;

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onNext, 1000);
          return 100;
        }
        setCurrentEpoch(Math.floor((prev + 1) * totalEpochs / 100));
        return prev + 1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onNext]);

  return (
    <div className="flex flex-col items-center justify-center h-[400px] space-y-8">
      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <Brain className="w-12 h-12 text-blue-600 animate-pulse" />
        </div>
        <svg className="w-32 h-32 rotate-[-90deg]">
          <circle
            cx="64"
            cy="64"
            r="60"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-blue-100"
          />
          <circle
            cx="64"
            cy="64"
            r="60"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-blue-600"
            strokeDasharray={377}
            strokeDashoffset={377 - (377 * progress) / 100}
          />
        </svg>
      </div>

      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold text-gray-900">Training in Progress</h3>
        <p className="text-gray-500">
          Epoch {currentEpoch} of {totalEpochs}
        </p>
        <p className="text-blue-600 font-medium">{progress}% Complete</p>
      </div>

      <div className="w-full max-w-md bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}