import Image from "next/image";

type BrandBackdropProps = {
  className?: string;
};

export function BrandBackdrop({ className = "" }: BrandBackdropProps) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <Image
        src="/brand/rapanuipark-watermark.webp"
        alt=""
        width={960}
        height={960}
        className="absolute -right-24 top-10 w-[420px] max-w-none opacity-[0.045] sm:-right-16 sm:w-[560px] lg:w-[720px]"
        loading="lazy"
      />
    </div>
  );
}
