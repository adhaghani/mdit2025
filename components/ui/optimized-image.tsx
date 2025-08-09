"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends Omit<ImageProps, "onLoad"> {
  fallbackSrc?: string;
  showLoadingBlur?: boolean;
  quality?: number;
}

export function OptimizedImage({
  src,
  alt,
  className,
  fallbackSrc,
  showLoadingBlur = true,
  quality = 85,
  priority = false,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  // Use fallback if there's an error
  const imageSrc = hasError && fallbackSrc ? fallbackSrc : src;

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={imageSrc}
        alt={alt}
        quality={quality}
        priority={priority}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "transition-all duration-300",
          isLoading && showLoadingBlur && "blur-sm scale-105",
          !isLoading && "blur-0 scale-100"
        )}
        {...props}
      />

      {/* Loading overlay */}
      {isLoading && showLoadingBlur && (
        <div className="absolute inset-0 bg-muted/50 animate-pulse" />
      )}
    </div>
  );
}

// Pre-configured optimized image variants for common use cases
export function TeamPhoto({
  src,
  alt,
  ...props
}: Omit<OptimizedImageProps, "width" | "height">) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={400}
      height={400}
      quality={80}
      sizes="(max-width: 640px) 200px, (max-width: 1024px) 300px, 400px"
      {...props}
    />
  );
}

export function EventPhoto({
  src,
  alt,
  ...props
}: Omit<OptimizedImageProps, "width" | "height">) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={800}
      height={600}
      quality={85}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 800px"
      {...props}
    />
  );
}

export function LogoImage({
  src,
  alt,
  ...props
}: Omit<OptimizedImageProps, "width" | "height">) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={200}
      height={200}
      quality={90}
      priority={true}
      sizes="(max-width: 640px) 80px, (max-width: 1024px) 120px, 200px"
      {...props}
    />
  );
}

export function BackgroundImage({
  src,
  alt,
  ...props
}: Omit<OptimizedImageProps, "width" | "height">) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={1920}
      height={1080}
      quality={75}
      priority={false}
      sizes="100vw"
      {...props}
    />
  );
}
