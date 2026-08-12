"use client";

import Image from "next/image";
import { useState } from "react";

interface ProjectImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export default function ProjectImage({
  src,
  alt,
  fill = false,
  width,
  height,
  className = "",
  priority = false,
  sizes,
}: ProjectImageProps) {
  const [error, setError] = useState(false);

  const imgSrc = error ? "/placeholder.svg" : src;

  if (fill) {
    return (
      <Image
        src={imgSrc}
        alt={alt}
        fill
        sizes={sizes ?? "(max-width: 768px) 100vw, 50vw"}
        className={className}
        priority={priority}
        onError={() => setError(true)}
      />
    );
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width ?? 800}
      height={height ?? 600}
      className={className}
      priority={priority}
      onError={() => setError(true)}
    />
  );
}
