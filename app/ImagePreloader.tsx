'use client';

import { useEffect } from 'react';
import { CHOIRS } from '@/lib/constants';

const ImagePreloader: React.FC = () => {
  useEffect(() => {
    const preloadImage = (src: string) => {
      const img = new window.Image();
      img.src = src;
    };

    // 배경 이미지 프리로드
    preloadImage('/images/background.jpg');

    // 찬양대 이미지 프리로드
    CHOIRS.forEach((choir) => {
      if (choir.image) {
        preloadImage(choir.image);
      }
    });
  }, []);

  return null;
};

export default ImagePreloader;
