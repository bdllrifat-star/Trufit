import React, { useState, useCallback } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { ResultDisplay } from './components/ResultDisplay';
import { AwesomePopup } from './components/AwesomePopup';
import { FavoritesGallery } from './components/FavoritesGallery';
import { generateTryOnImage, generateAIFeedback } from './services/geminiService';

const App: React.FC = () => {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [outfitImage, setOutfitImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // New features state
  const [showAwesomePopup, setShowAwesomePopup] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [isFeedbackLoading, setIsFeedbackLoading] = useState<boolean>(false);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleUserImageUpload = async (file: File) => {
    try {
      const base64 = await fileToBase64(file);
      setUserImage(base64);
      setResultImage(null);
      setAiFeedback(null);
    } catch (err) {
      setError('Failed to load user image.');
    }
  };

  const handleOutfitImageUpload = async (file: File) => {
    try {
      const base64 = await fileToBase64(file);
      setOutfitImage(base64);
      setResultImage(null);
       setAiFeedback(null);
    } catch (err) {
      setError('Failed to load outfit image.');
    }
  };

  const handleGetAIFeedback = useCallback(async () => {
    if (!userImage || !outfitImage) return;

    setIsFeedbackLoading(true);
    try {
      const feedback = await generateAIFeedback(userImage, outfitImage);
      setAiFeedback(feedback);
    } catch (err) {
      console.error("Feedback generation failed:", err);
      // Silently fail, don't show an error to the user for this
    } finally {
      setIsFeedbackLoading(false);
    }
  }, [userImage, outfitImage]);

  const handleTryOn = useCallback(async () => {
    if (!userImage || !outfitImage) {
      setError('Please upload both a user photo and an outfit photo.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResultImage(null);
    setAiFeedback(null);

    try {
      const generatedImage = await generateTryOnImage(userImage, outfitImage);
      setResultImage(generatedImage);
      setShowAwesomePopup(true);
      setTimeout(() => setShowAwesomePopup(false), 2500); // Show popup for 2.5 seconds
      handleGetAIFeedback();
    } catch (err) {
      console.error(err);
      setError('Failed to generate the try-on image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [userImage, outfitImage, handleGetAIFeedback]);
  
  const handleSaveFavorite = () => {
    if (resultImage && !favorites.includes(resultImage)) {
      setFavorites([resultImage, ...favorites]);
    }
  };

  const handleTryAnotherOutfit = () => {
    setOutfitImage(null);
    setResultImage(null);
    setError(null);
    setAiFeedback(null);
  };

  return (
    <div className="min-h-screen bg-primary text-secondary font-sans p-4 sm:p-6 lg:p-8">
      <AwesomePopup show={showAwesomePopup} />
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary">
            TryMeUp
          </h1>
          <p className="mt-2 text-lg text-secondary/80">
            Try before you buy — in seconds.
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            <ImageUploader
              id="user-image"
              title="Your Photo"
              iconClass="fa-user"
              onImageUpload={handleUserImageUpload}
              imageSrc={userImage}
            />
            <ImageUploader
              id="outfit-image"
              title="Outfit Photo"
              iconClass="fa-shirt"
              onImageUpload={handleOutfitImageUpload}
              imageSrc={outfitImage}
            />
          </div>

          <div className="lg:col-span-1 bg-black/20 p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center space-y-6">
            <button
              onClick={handleTryOn}
              disabled={!userImage || !outfitImage || isLoading}
              className="w-full bg-secondary text-primary font-bold py-3 px-6 rounded-lg shadow-md hover:bg-opacity-90 disabled:bg-secondary/50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-wand-magic-sparkles mr-2"></i>
                  Generate Try-On
                </>
              )}
            </button>
             {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          </div>
        </main>
        
        <div className="mt-8">
            <ResultDisplay
              resultImage={resultImage}
              isLoading={isLoading}
              onTryAnotherOutfit={handleTryAnotherOutfit}
              onSaveFavorite={handleSaveFavorite}
              aiFeedback={aiFeedback}
              isFeedbackLoading={isFeedbackLoading}
            />
        </div>

        {favorites.length > 0 && <FavoritesGallery favorites={favorites} />}

      </div>
      <footer className="text-center mt-12 py-4 border-t border-secondary/20">
        <p className="text-sm text-secondary/70">
          Created by Rifat Ahmed, for Aurestry
        </p>
        <div className="flex justify-center items-center space-x-2 mt-2">
            <div className="w-4 h-4 rounded-full bg-secondary"></div>
            <div className="w-4 h-4 rounded-full bg-primary border border-secondary"></div>
        </div>
      </footer>
    </div>
  );
};

export default App;