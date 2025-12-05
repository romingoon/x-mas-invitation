'use client';

import { useEffect } from 'react';
import { CHOIRS } from '@/lib/constants';

const ImagePreloader: React.FC = () => {
  useEffect(() => {
    // Use link preload for better browser optimization
    const preloadImage = (src: string) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    };

    // Preload critical images
    preloadImage('/images/poster1.jpeg');

    // Preload choir images (these are shown in the ChoirsSection)
    CHOIRS.forEach((choir) => {
      if (choir.image) {
        preloadImage(choir.image);
      }
    });
  }, []);

  return null;
};

export default ImagePreloader;
