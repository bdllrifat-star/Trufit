import React from 'react';
import type { Angle } from '../types';

interface AngleSelectorProps {
  selectedAngle: Angle;
  onAngleChange: (angle: Angle) => void;
}

export const AngleSelector: React.FC<AngleSelectorProps> = ({ selectedAngle, onAngleChange }) => {
  const getButtonClasses = (angle: Angle) => {
    const baseClasses = 'flex-1 py-2 px-4 rounded-md font-semibold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary';
    if (selectedAngle === angle) {
      return `${baseClasses} bg-primary text-white shadow`;
    }
    return `${baseClasses} bg-gray-200 text-gray-700 hover:bg-gray-300`;
  };

  return (
    <div className="w-full">
        <label className="block text-center text-sm font-medium text-gray-700 mb-2">Outfit Angle</label>
        <div className="flex bg-gray-100 p-1 rounded-lg w-full">
            <button
                onClick={() => onAngleChange('front')}
                className={getButtonClasses('front')}
            >
                Front
            </button>
            <button
                onClick={() => onAngleChange('side')}
                className={getButtonClasses('side')}
            >
                Side
            </button>
        </div>
    </div>
  );
};