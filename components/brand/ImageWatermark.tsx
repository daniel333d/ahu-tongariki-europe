import Image from "next/image";

type ImageWatermarkProps = {
  className?: string;
};

export function ImageWatermark({ className = "" }: ImageWatermarkProps) {
  return (
    <span
      className={`pointer-events-none absolute bottom-6 right-6 z-20 block w-[min(12%,96px)] min-w-12 opacity-[0.13] select-none sm:bottom-8 sm:right-8 sm:w-[min(10%,118px)] sm:opacity-[0.16] ${className}`}
      aria-hidden="true"
    >
      <Image
        src="/brand/rapanuipark-watermark.webp"
        alt=""
        width={960}
        height={960}
        className="h-auto w-full object-contain"
        loading="lazy"
      />
    </span>
  );
}
