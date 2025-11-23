import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Collect all image URLs from the portfolio
  const imageUrls = [
    // Hero image
    'https://storage.googleapis.com/storage.magicpath.ai/user/323295203727400960/assets/a162f3c9-9017-4e52-a2b7-d48614b32b0f.jpg',
    // Project card images
    'https://res.cloudinary.com/dky01erho/image/upload/v1761388415/Slide_4_3_-_1_2_zr9r7i.png',
    'https://res.cloudinary.com/dky01erho/image/upload/v1760525270/190_2x_shots_so_gytftu.png',
    'https://res.cloudinary.com/dky01erho/image/upload/v1760525138/172_2x_shots_so_plr79y.png',
    'https://res.cloudinary.com/dky01erho/image/upload/v1761388291/656_3x_shots_so_qced29.png',
    // Figma assets (Principles section)
    'https://www.figma.com/api/mcp/asset/58263a68-76ec-40ae-9d3a-0f30c28debaf',
    'https://www.figma.com/api/mcp/asset/9d49b638-e5c9-4a84-bffa-2988b0f687f3',
    'https://www.figma.com/api/mcp/asset/0de2028f-a4ae-40d3-a439-2b4ea84ff274',
    'https://www.figma.com/api/mcp/asset/2af8764a-886e-47c4-aecb-600c080d9937',
    'https://www.figma.com/api/mcp/asset/56e2472b-c849-4d99-a14a-52f98463f9eb',
    'https://www.figma.com/api/mcp/asset/c6579de0-7126-4c23-9b7b-c74d298edbf7',
    'https://www.figma.com/api/mcp/asset/b0b89c9e-a322-4352-b4a0-9a84f8d59567',
    'https://www.figma.com/api/mcp/asset/2d2422c3-f026-4f75-83be-2cd745c745d8',
  ];

  useEffect(() => {
    let loadedCount = 0;
    const totalImages = imageUrls.length;
    let isMounted = true;

    const loadImage = (url: string): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        
        img.onload = () => {
          if (!isMounted) return;
          loadedCount++;
          const newProgress = Math.min(Math.round((loadedCount / totalImages) * 100), 100);
          setProgress(newProgress);
          resolve();
        };
        
        img.onerror = () => {
          if (!isMounted) return;
          // Still count as loaded to not block the loading screen
          loadedCount++;
          const newProgress = Math.min(Math.round((loadedCount / totalImages) * 100), 100);
          setProgress(newProgress);
          resolve();
        };
        
        img.src = url;
      });
    };

    // Load all images
    const loadAllImages = async () => {
      try {
        await Promise.all(imageUrls.map(loadImage));
        
        if (!isMounted) return;
        
        // Small delay to ensure smooth transition
        setTimeout(() => {
          if (!isMounted) return;
          setIsComplete(true);
          setTimeout(() => {
            if (!isMounted) return;
            onComplete();
          }, 300); // Fade out duration
        }, 200);
      } catch (error) {
        console.error('Error loading images:', error);
        if (!isMounted) return;
        // Still complete loading even if there's an error
        setIsComplete(true);
        setTimeout(() => {
          if (!isMounted) return;
          onComplete();
        }, 300);
      }
    };

    loadAllImages();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-300 ${
        isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        background: 'linear-gradient(180deg, #E5E3FF 0%, #F5F5F5 50%, #111111 100%)',
      }}
    >
      {/* Main text */}
      <div
        className="text-center mb-8"
        style={{
          fontFamily: "'neulis-cursive', 'Neulis Cursive', cursive",
          fontSize: 'clamp(32px, 8vw, 64px)',
          color: 'rgba(0, 0, 0, 0.7)',
          fontWeight: 500,
          letterSpacing: '-0.02em',
        }}
      >
        curating work
      </div>

      {/* Progress percentage */}
      <div
        className="text-center"
        style={{
          fontFamily: "'neulis-cursive', 'Neulis Cursive', cursive",
          fontSize: 'clamp(16px, 3vw, 24px)',
          color: 'rgba(0, 0, 0, 0.5)',
          fontWeight: 400,
        }}
      >
        {progress}%
      </div>
    </div>
  );
};

