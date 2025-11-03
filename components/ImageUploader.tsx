import React, { useRef } from 'react';

interface ImageUploaderProps {
  id: string;
  title: string;
  iconClass: string;
  onImageUpload: (file: File) => void;
  imageSrc: string | null;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ id, title, iconClass, onImageUpload, imageSrc }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleCardClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="bg-black/20 p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center space-y-4 h-full">
      <h2 className="text-xl font-bold text-secondary">{title}</h2>
      <div
        onClick={handleCardClick}
        className="w-full h-64 md:h-80 border-2 border-dashed border-secondary/40 rounded-xl flex items-center justify-center cursor-pointer bg-black/20 hover:bg-black/30 hover:border-secondary transition-colors duration-300 overflow-hidden"
      >
        <input
          type="file"
          id={id}
          ref={inputRef}
          onChange={handleFileChange}
          accept="image/png, image/jpeg, image/webp"
          className="hidden"
        />
        {imageSrc ? (
          <img src={imageSrc} alt={title} className="w-full h-full object-contain" />
        ) : (
          <div className="text-center text-secondary/70">
            <i className={`fa-solid ${iconClass} text-5xl mb-4`}></i>
            <p className="font-semibold">Click to upload</p>
            <p className="text-sm">PNG, JPG, or WEBP</p>
          </div>
        )}
      </div>
    </div>
  );
};