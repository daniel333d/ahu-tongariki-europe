export type PartnerTier = "founding" | "strategic" | "supporting";

export type Partner = {
  id: string;
  name: string;
  tier: PartnerTier;
  roleKey: string;
  descriptionKey: string;
  logoSrc: string;
  href?: string;
  confirmed: boolean;
  order: number;
};

export const partnerTierOrder: PartnerTier[] = ["founding", "strategic", "supporting"];

export const partners: Partner[] = [];

export function getConfirmedPartners() {
  return partners
    .filter((partner) => partner.confirmed)
    .sort((firstPartner, secondPartner) => {
      const firstTier = partnerTierOrder.indexOf(firstPartner.tier);
      const secondTier = partnerTierOrder.indexOf(secondPartner.tier);

      if (firstTier !== secondTier) {
        return firstTier - secondTier;
      }

      return firstPartner.order - secondPartner.order;
    });
}
