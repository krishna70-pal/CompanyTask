import { useState, useRef, useEffect } from 'react';
import './LazyImage.css';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function LazyImage({ src, alt, className = '' }: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  // Use IntersectionObserver for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className={`lazy-image-container ${className}`}>
      {/* Placeholder shimmer */}
      {!isLoaded && <div className="lazy-image-placeholder" aria-hidden="true" />}

      {/* Actual image */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={`lazy-image ${isLoaded ? 'lazy-image-loaded' : ''}`}
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
        />
      )}
    </div>
  );
}
