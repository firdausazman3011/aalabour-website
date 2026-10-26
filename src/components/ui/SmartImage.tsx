"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";

// Falls back to a branded panel when an image is missing, so pages stay presentable
// before every asset from the original site has been downloaded.
export function SmartImage({ className, alt, ...props }: ImageProps) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "grid-bg flex items-center justify-center bg-gradient-to-br from-navy-800 to-navy-950",
          props.fill && "absolute inset-0",
          className,
        )}
      >
        <span className="text-2xl font-extrabold tracking-tight text-white/20">AA</span>
      </div>
    );
  }
  return <Image alt={alt} className={className} onError={() => setFailed(true)} {...props} />;
}
