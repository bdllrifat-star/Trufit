import React from 'react';
import { AIFeedback } from './AIFeedback';

interface ResultDisplayProps {
  resultImage: string | null;
  isLoading: boolean;
  onTryAnotherOutfit: () => void;
  onSaveFavorite: () => void;
  aiFeedback: string | null;
  isFeedbackLoading: boolean;
}

const LoadingSkeleton: React.FC = () => (
  <div className="w-full animate-pulse flex flex-col items-center">
    <div className="bg-secondary/20 rounded-2xl w-full h-[400px] md:h-[600px]"></div>
    <div className="h-6 bg-secondary/20 rounded-md w-3/4 mt-4"></div>
    <div className="h-4 bg-secondary/20 rounded-md w-1/2 mt-2"></div>
  </div>
);

const Placeholder: React.FC = () => (
  <div className="text-center text-secondary/70 py-16">
    <i className="fa-solid fa-wand-magic-sparkles text-6xl mb-4 text-secondary/50"></i>
    <h3 className="text-2xl font-bold text-secondary">Your AI-powered preview will appear here</h3>
    <p className="mt-2">Upload your photos and click "Generate Try-On" to begin.</p>
  </div>
);

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ resultImage, isLoading, onTryAnotherOutfit, onSaveFavorite, aiFeedback, isFeedbackLoading }) => {
  return (
    <div className="bg-black/20 p-6 rounded-2xl shadow-lg mt-8 flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold text-secondary mb-6 self-start">AI Snapshot</h2>
      <div className="w-full min-h-[400px] flex items-center justify-center">
        {isLoading && <LoadingSkeleton />}
        {!isLoading && !resultImage && <Placeholder />}
        {!isLoading && resultImage && (
          <div className="w-full flex flex-col items-center space-y-6">
            <div className="relative rounded-xl" style={{boxShadow: '0 0 30px 8px rgba(253, 205, 137, 0.4)'}}>
                <img src={resultImage} alt="Virtual Try-On Result" className="max-w-full max-h-[600px] rounded-xl object-contain" />
            </div>

            <AIFeedback feedback={aiFeedback} isLoading={isFeedbackLoading} />

            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
              <a
                href={resultImage}
                download="trufit-try-on.png"
                className="flex-1 bg-secondary text-primary font-bold py-3 px-6 rounded-lg shadow-md hover:bg-opacity-90 transition-all duration-300 text-center flex items-center justify-center"
              >
                <i className="fa-solid fa-download mr-2"></i>
                Download
              </a>
               <button
                onClick={onSaveFavorite}
                className="flex-1 border border-secondary text-secondary font-bold py-3 px-6 rounded-lg shadow-md hover:bg-secondary hover:text-primary transition-all duration-300 flex items-center justify-center"
              >
                <i className="fa-solid fa-heart mr-2"></i>
                Save
              </button>
              <button
                onClick={onTryAnotherOutfit}
                className="flex-1 bg-black/30 text-secondary/80 font-bold py-3 px-6 rounded-lg shadow-md hover:bg-black/40 transition-all duration-300 flex items-center justify-center"
              >
                <i className="fa-solid fa-retweet mr-2"></i>
                Try Another
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};