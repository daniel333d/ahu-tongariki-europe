import { moaiStatues, validateMoaiData } from "./moai-data";
import { MoaiStatue } from "./MoaiStatue";
import { assets } from "../../lib/asset-paths";

type MoaiPlatformProps = {
  className?: string;
};

export function MoaiPlatform({ className = "" }: MoaiPlatformProps) {
  validateMoaiData(moaiStatues);

  return (
    <div
      className={[
        "relative mx-auto w-full max-w-[1040px]",
        "before:absolute before:left-[3%] before:right-[3%] before:top-[63%] before:h-[36%] before:skew-x-[-8deg] before:bg-[linear-gradient(180deg,#3d3425,#18140e)] before:shadow-[0_26px_40px_rgba(0,0,0,0.5),inset_0_8px_16px_rgba(219,172,92,0.12)]",
        "after:absolute after:left-[5%] after:right-[5%] after:top-[72%] after:h-[11%] after:bg-[repeating-linear-gradient(90deg,rgba(214,172,97,0.28)_0_1px,transparent_1px_32px)] after:opacity-70",
        className
      ].join(" ")}
      aria-label="Platforma Ahu Tongariki z dokładnie 15 posągami Moai, zwróconymi w stronę zachodu słońca"
      data-moai-count={moaiStatues.length}
      data-asset={assets.moai.platform}
    >
      <div className="relative z-10 flex h-[190px] items-end justify-center gap-[clamp(4px,0.7vw,12px)] px-5 sm:h-[220px] lg:h-[250px]">
        {moaiStatues.map((statue) => (
          <MoaiStatue key={statue.id} statue={statue} />
        ))}
      </div>
      <div className="relative z-0 mx-auto -mt-7 h-12 w-[94%] skew-x-[-10deg] rounded-[18%] bg-[linear-gradient(180deg,#625137,#201a12_65%,#0d0a07)] shadow-[0_16px_32px_rgba(0,0,0,0.55)]" />
      <div className="relative mx-auto h-8 w-[88%] bg-[repeating-linear-gradient(90deg,#18130d_0_24px,#2e2519_24px_28px,#15110c_28px_52px)] opacity-90 shadow-[0_18px_30px_rgba(0,0,0,0.5)]" />
    </div>
  );
}
