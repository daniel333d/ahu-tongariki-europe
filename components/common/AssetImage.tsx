"use client";

import Image, { type ImageProps } from "next/image";
import { useMemo, useState } from "react";

const TRANSPARENT_BLUR = "data:image/gif;base64,R0lGODlhAQABAPAAAP///wAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==";

type AssetImageProps = Omit<ImageProps, "src" | "placeholder" | "blurDataURL"> & {
  src: string;
  avifSrc?: string;
  webpSrc?: string;
  fallbackSrc?: string;
  placeholder?: ImageProps["placeholder"];
  blurDataURL?: string;
};

export function AssetImage({
  src,
  avifSrc,
  webpSrc,
  fallbackSrc = "/assets/ui/fallback-image.webp",
  placeholder = "blur",
  blurDataURL = TRANSPARENT_BLUR,
  loading = "lazy",
  onError,
  ...props
}: AssetImageProps) {
  const preferredSrc = useMemo(() => avifSrc ?? webpSrc ?? src, [avifSrc, webpSrc, src]);
  const [currentSrc, setCurrentSrc] = useState(preferredSrc);

  return (
    <Image
      {...props}
      src={currentSrc}
      loading={props.priority ? undefined : loading}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      onError={(event) => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }

        onError?.(event);
      }}
    />
  );
}
