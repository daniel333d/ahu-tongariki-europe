import { AssetImage } from "../common/AssetImage";
import { assets } from "../../lib/asset-paths";

export function HeroBackground() {
  return (
    <AssetImage
      src={assets.hero.panorama}
      alt=""
      fill
      priority
      sizes="100vw"
      className="absolute inset-0 object-cover object-[center_44%] brightness-[1.32] contrast-[1.04] saturate-[1.06]"
      aria-hidden="true"
      data-asset={assets.hero.panorama}
    />
  );
}
