import React from 'react';

interface AwesomePopupProps {
  show: boolean;
}

export const AwesomePopup: React.FC<AwesomePopupProps> = ({ show }) => {
  if (!show) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 animate-fade-in"
    >
      <div className="bg-primary p-8 rounded-2xl shadow-2xl text-center animate-zoom-in border-2 border-secondary">
        <h2 className="text-4xl font-bold text-secondary">🎉 You are Awesome!</h2>
      </div>
    </div>
  );
};