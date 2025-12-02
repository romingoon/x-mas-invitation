declare module 'next/image' {
  import { ComponentType, ImgHTMLAttributes } from 'react';

  export interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'ref'> {
    src: string | import('next/dist/shared/lib/get-img-props').StaticImport;
    alt: string;
    width?: number | `${number}`;
    height?: number | `${number}`;
    fill?: boolean;
    quality?: number | `${number}`;
    priority?: boolean;
    loading?: 'lazy' | 'eager';
    placeholder?: 'blur' | 'empty';
    blurDataURL?: string;
    unoptimized?: boolean;
    onLoadingComplete?: (result: { naturalWidth: number; naturalHeight: number }) => void;
    sizes?: string;
    style?: React.CSSProperties;
  }

  const Image: ComponentType<ImageProps>;
  export default Image;
}


