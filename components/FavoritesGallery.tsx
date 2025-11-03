import React from 'react';

interface FavoritesGalleryProps {
  favorites: string[];
}

export const FavoritesGallery: React.FC<FavoritesGalleryProps> = ({ favorites }) => {
  return (
    <div className="bg-black/20 p-6 rounded-2xl shadow-lg mt-8">
        <h2 className="text-3xl font-bold text-secondary mb-6">My Favorites</h2>
        {favorites.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {favorites.map((fav, index) => (
                <div key={index} className="rounded-lg overflow-hidden shadow-md group relative">
                    <img src={fav} alt={`Favorite ${index + 1}`} className="w-full h-full object-cover aspect-square transition-transform duration-300 group-hover:scale-105" />
                </div>
            ))}
            </div>
        ) : (
            <p className="text-center text-secondary/70 py-8">Your saved outfits will appear here.</p>
        )}
    </div>
  );
};