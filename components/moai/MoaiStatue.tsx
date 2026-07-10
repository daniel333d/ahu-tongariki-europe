import type { MoaiStatueData } from "./types";
import { assets } from "../../lib/asset-paths";

type MoaiStatueProps = {
  statue: MoaiStatueData;
};

const variantClasses: Record<MoaiStatueData["silhouetteVariant"], string> = {
  slender: "rounded-t-[42%] rounded-b-[18%] before:left-[29%] before:w-[42%] after:left-[31%] after:w-[48%]",
  broad: "rounded-t-[32%] rounded-b-[14%] before:left-[24%] before:w-[52%] after:left-[25%] after:w-[55%]",
  weathered:
    "rounded-t-[38%] rounded-b-[20%] before:left-[26%] before:w-[44%] after:left-[28%] after:w-[51%]",
  tall: "rounded-t-[36%] rounded-b-[13%] before:left-[30%] before:w-[38%] after:left-[30%] after:w-[49%]",
  compact: "rounded-t-[34%] rounded-b-[22%] before:left-[25%] before:w-[49%] after:left-[27%] after:w-[54%]"
};

export function MoaiStatue({ statue }: MoaiStatueProps) {
  return (
    <div
      className="relative flex shrink-0 justify-center"
      style={{
        width: `${statue.width}px`,
        height: `${statue.height + 18}px`,
        transform: `translateY(${statue.offsetY}px) rotate(${statue.rotation}deg)`
      }}
      aria-label={`Moai numer ${statue.id}${statue.hasPukao ? " z pukao" : ""}, zwrócony w stronę zachodu słońca`}
      data-moai-id={statue.id}
      data-has-pukao={statue.hasPukao}
      data-facing="sunset"
      data-asset={assets.moai.statues[statue.id - 1]}
    >
      {statue.hasPukao ? (
        <div className="absolute -top-1 z-20 h-[14px] w-[68%] rounded-[35%] bg-[linear-gradient(180deg,#7d2c1d,#4b1710)] shadow-[0_3px_10px_rgba(91,29,17,0.55)]" />
      ) : null}

      <div
        className={[
          "relative mt-[9px] h-full w-full overflow-hidden bg-[linear-gradient(90deg,#1d1811_0%,#725f42_34%,#342b1f_70%,#0f0d09_100%)] shadow-[inset_8px_0_14px_rgba(225,184,99,0.22),inset_-10px_0_16px_rgba(0,0,0,0.56),0_0_14px_rgba(216,171,91,0.18),0_12px_18px_rgba(0,0,0,0.42)]",
          "before:absolute before:top-[22%] before:h-[9%] before:rounded-full before:bg-[rgba(4,4,3,0.65)] before:shadow-[0_18px_0_rgba(9,8,6,0.56)]",
          "after:absolute after:top-[55%] after:h-[5%] after:rounded-full after:bg-[rgba(6,5,4,0.72)]",
          variantClasses[statue.silhouetteVariant]
        ].join(" ")}
      >
        <span className="absolute left-[48%] top-[32%] h-[20%] w-[15%] -translate-x-1/2 rounded-[45%] bg-[linear-gradient(180deg,#8f744d,#3a2f21)] shadow-[5px_2px_9px_rgba(0,0,0,0.55)]" />
        <span className="absolute bottom-[18%] left-[18%] h-[20%] w-[64%] rounded-t-[36%] border-t border-[#8a714a]/50 bg-[linear-gradient(180deg,rgba(139,113,74,0.42),rgba(31,25,18,0.55))]" />
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_24%_28%,rgba(238,199,121,0.22)_0_2px,transparent_3px),radial-gradient(circle_at_64%_48%,rgba(0,0,0,0.23)_0_2px,transparent_3px),radial-gradient(circle_at_50%_74%,rgba(229,183,105,0.18)_0_1px,transparent_2px)] opacity-80" />
      </div>
    </div>
  );
}
