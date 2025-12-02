'use client';

import { useEffect } from 'react';

const ImagePreloader: React.FC = () => {
  useEffect(() => {
    const preloadImage = (src: string) => {
      const img = new window.Image();
      img.src = src;
    };

    // 배경 이미지 프리로드
    preloadImage('/images/background.jpg');
  }, []);

  return null;
};

export default ImagePreloader;
