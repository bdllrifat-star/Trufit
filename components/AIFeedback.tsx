import React from 'react';

interface AIFeedbackProps {
  feedback: string | null;
  isLoading: boolean;
}

export const AIFeedback: React.FC<AIFeedbackProps> = ({ feedback, isLoading }) => {
  if (!isLoading && !feedback) {
    return null;
  }

  return (
    <div className="w-full max-w-md bg-secondary/10 border-l-4 border-secondary text-secondary p-4 rounded-r-lg" role="alert">
      {isLoading && (
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-3 py-1">
            <div className="h-2 bg-secondary/30 rounded"></div>
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-secondary/30 rounded col-span-2"></div>
              <div className="h-2 bg-secondary/30 rounded col-span-1"></div>
            </div>
          </div>
        </div>
      )}
      {!isLoading && feedback && (
        <>
            <p className="font-bold text-secondary/80">AI Feedback</p>
            <p className="italic">"{feedback}"</p>
        </>
      )}
    </div>
  );
};