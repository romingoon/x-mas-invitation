'use client';

import { useEffect } from 'react';
import { CHOIRS } from '@/lib/constants';

const ImagePreloader: React.FC = () => {
  useEffect(() => {
    // Preload critical above-the-fold image with high priority
    const preloadCriticalImage = (src: string) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      link.fetchPriority = 'high';
      document.head.appendChild(link);
    };

    // Preload only poster (shown immediately)
    preloadCriticalImage('/images/poster1.jpeg');

    // Lazy preload other images after initial render
    const lazyPreloadImages = () => {
      CHOIRS.forEach((choir) => {
        if (choir.image) {
          const img = new Image();
          img.src = choir.image;
        }
      });
    };

    // Wait for idle time to preload non-critical images
    if ('requestIdleCallback' in window) {
      requestIdleCallback(lazyPreloadImages, { timeout: 3000 });
    } else {
      setTimeout(lazyPreloadImages, 2000);
    }
  }, []);

  return null;
};

export default ImagePreloader;
