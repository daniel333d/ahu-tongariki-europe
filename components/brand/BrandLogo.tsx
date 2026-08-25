import Image from "next/image";

type BrandLogoProps = {
  variant?: "header" | "footer" | "mark";
  className?: string;
};

export function BrandLogo({ variant = "header", className = "" }: BrandLogoProps) {
  if (variant === "mark") {
    return (
      <Image
        src="/brand/rapanuipark-mark.webp"
        alt="RapaNuiPark"
        width={256}
        height={256}
        className={className}
      />
    );
  }

  const isFooter = variant === "footer";

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Image
        src={isFooter ? "/brand/rapanuipark-logo-footer.webp" : "/brand/rapanuipark-mark.webp"}
        alt=""
        width={isFooter ? 220 : 56}
        height={isFooter ? 220 : 56}
        className={isFooter ? "h-28 w-28 object-contain sm:h-36 sm:w-36" : "h-12 w-12 object-contain sm:h-14 sm:w-14"}
        aria-hidden="true"
      />
      {!isFooter ? (
        <span className="hidden min-w-0 flex-col leading-none sm:flex">
          <span className="font-serif text-2xl font-semibold tracking-wide text-white">RapaNuiPark</span>
          <span className="mt-1 text-[0.62rem] font-bold uppercase tracking-[0.24em] text-gold/82">
            Bystrzyca Kłodzka
          </span>
        </span>
      ) : null}
    </span>
  );
}
