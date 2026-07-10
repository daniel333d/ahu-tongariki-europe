import { assets } from "../../lib/asset-paths";

export function HeroOverlay() {
  return (
    <>
      <div className="absolute left-0 top-0 h-[78%] w-[44%] bg-[linear-gradient(90deg,#02080d_0%,#02080d_66%,rgba(2,8,13,0.78)_84%,rgba(2,8,13,0)_100%)]" />
      <div className="bg-[#02080d]/78 absolute right-[1%] top-[1%] h-[48%] w-[25%] rounded-xl blur-sm" />
      <div
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,8,13,0.66)_0%,rgba(2,8,13,0.3)_34%,rgba(2,8,13,0.05)_58%,rgba(2,8,13,0.48)_100%)]"
        data-asset={assets.overlays.heroVignette}
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_52%_20%,rgba(200,164,90,0.16),transparent_34%),radial-gradient(ellipse_at_56%_58%,rgba(214,172,97,0.14),transparent_34%),linear-gradient(180deg,rgba(2,8,13,0.05)_0%,rgba(2,8,13,0.01)_46%,rgba(2,8,13,0.58)_100%)]"
        data-asset={`${assets.gradients.sunsetGold},${assets.gradients.deepNavy}`}
      />
    </>
  );
}
