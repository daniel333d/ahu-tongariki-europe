"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ExternalLink, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useI18n } from "../../app/i18n-provider";
import { getConfirmedPartners, partnerTierOrder, type Partner, type PartnerTier } from "../../data/partners";

type CoCreatorsSectionProps = {
  layoutDemo?: boolean;
  showMuseumExhibit?: boolean;
};

const tierGridClasses: Record<PartnerTier, string> = {
  founding: "grid-cols-1 lg:grid-cols-2",
  strategic: "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
  supporting: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
};

const demoSlotCounts: Record<PartnerTier, number> = {
  founding: 2,
  strategic: 3,
  supporting: 4
};

function getTierCopy(copy: ReturnType<typeof useI18n>["copy"], tier: PartnerTier) {
  return copy.coCreators.tiers[tier];
}

function AbstractRongorongoInspiredOrnament() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.16]" aria-hidden="true">
      <div className="absolute left-0 right-0 top-8 flex flex-col gap-5">
        {Array.from({ length: 5 }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex min-w-max gap-5 px-8">
            {Array.from({ length: 22 }).map((__, itemIndex) => (
              <span
                key={`${rowIndex}-${itemIndex}`}
                className="h-[9px] rounded-full border border-gold/55"
                style={{
                  width: `${18 + ((rowIndex + itemIndex) % 4) * 8}px`,
                  transform: `rotate(${((rowIndex + itemIndex) % 5) * 3 - 6}deg)`
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function WoodPanel({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-lg border border-gold/25 bg-[#160f0a] p-[1px] shadow-[0_32px_90px_rgba(0,0,0,0.38)]">
      <div
        className="absolute inset-0 bg-[linear-gradient(110deg,rgba(200,164,90,0.18),transparent_18%,transparent_80%,rgba(200,164,90,0.16)),radial-gradient(circle_at_18%_0%,rgba(200,164,90,0.14),transparent_34%),linear-gradient(90deg,#110b07,#24150c_35%,#140d08_70%,#2a190e)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-35 [background:repeating-linear-gradient(0deg,transparent_0_18px,rgba(255,255,255,0.035)_19px,transparent_21px),repeating-linear-gradient(92deg,rgba(255,255,255,0.04)_0_1px,transparent_1px_58px)]"
        aria-hidden="true"
      />
      <AbstractRongorongoInspiredOrnament />
      <div className="relative border border-white/8 bg-black/18 px-5 py-8 backdrop-blur-[1px] sm:px-8 sm:py-10 lg:px-12">
        {children}
      </div>
    </div>
  );
}

function WoodenMemoryExhibit() {
  const { copy } = useI18n();

  return (
    <figure className="mt-10 max-w-2xl lg:mt-12">
      <div className="relative mx-auto aspect-[3.45/1] max-w-[38rem] overflow-visible">
        <div
          className="absolute -inset-x-10 -top-12 h-24 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,219,148,0.24),transparent_70%)] blur-2xl"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-12 bottom-[-18%] h-10 rounded-full bg-black/70 blur-xl"
          aria-hidden="true"
        />
        <div className="relative h-full rotate-[-2.5deg] rounded-[48%_52%_45%_55%/22%_24%_20%_24%] border border-gold/20 bg-[#140905] p-[2px] shadow-[0_34px_95px_rgba(0,0,0,0.58)] [transform-style:preserve-3d]">
          <div
            className="absolute inset-0 rounded-[48%_52%_45%_55%/22%_24%_20%_24%] bg-[linear-gradient(100deg,rgba(255,219,150,0.18),transparent_14%,transparent_86%,rgba(200,164,90,0.14)),radial-gradient(ellipse_at_24%_24%,rgba(255,196,104,0.17),transparent_34%),radial-gradient(ellipse_at_72%_78%,rgba(255,221,165,0.08),transparent_26%),linear-gradient(90deg,#180b05_0%,#3c1e0d_18%,#251107_42%,#4a2510_66%,#190c06_100%)]"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 rounded-[48%_52%_45%_55%/22%_24%_20%_24%] opacity-70 [background:repeating-linear-gradient(1deg,rgba(255,229,174,0.065)_0_1px,transparent_1px_9px),repeating-linear-gradient(93deg,rgba(0,0,0,0.22)_0_2px,transparent_2px_42px)]"
            aria-hidden="true"
          />
          <div
            className="absolute inset-x-[5%] top-[13%] h-[16%] rounded-full bg-[linear-gradient(180deg,rgba(255,236,184,0.16),transparent)] blur-sm"
            aria-hidden="true"
          />
          <div className="relative flex h-full flex-col justify-center gap-[9%] rounded-[48%_52%_45%_55%/22%_24%_20%_24%] border border-white/8 px-[8%] py-[5.5%]">
            <div
              className="pointer-events-none absolute inset-x-[7%] top-[17%] h-px bg-gradient-to-r from-transparent via-[#f1c878]/38 to-transparent"
              aria-hidden="true"
            />
            {Array.from({ length: 4 }).map((_, rowIndex) => (
              <div key={rowIndex} className="flex items-center justify-center gap-[1.9%]" aria-hidden="true">
                {Array.from({ length: 18 }).map((__, itemIndex) => {
                  const variant = (rowIndex * 5 + itemIndex) % 6;
                  return (
                    <span
                      key={`${rowIndex}-${itemIndex}`}
                      className="block border border-black/45 bg-[#0c0502]/35 shadow-[inset_0_1px_2px_rgba(0,0,0,0.78),0_1px_0_rgba(255,224,154,0.12)]"
                      style={{
                        width: `${8 + variant * 2}px`,
                        height: `${variant === 0 ? 5 : variant === 1 ? 10 : variant === 2 ? 7 : variant === 3 ? 13 : variant === 4 ? 8 : 11}px`,
                        borderRadius: variant === 2 || variant === 5 ? "55% 45% 50% 50%" : "999px",
                        transform: `rotate(${variant * 8 - 16}deg) skewX(${variant % 2 === 0 ? -4 : 3}deg)`
                      }}
                    />
                  );
                })}
              </div>
            ))}
            <div
              className="pointer-events-none absolute inset-x-[8%] bottom-[16%] h-px bg-gradient-to-r from-transparent via-[#f1c878]/26 to-transparent"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
      <figcaption className="mx-auto mt-8 max-w-xl border-l border-gold/45 pl-5">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">
          {copy.coCreators.exhibit.title}
        </p>
        <p className="mt-3 font-serif text-2xl font-semibold leading-tight text-white sm:text-3xl">
          {copy.coCreators.exhibit.subtitle}
        </p>
        <p className="mt-4 text-sm leading-7 text-white/64 sm:text-base">{copy.coCreators.exhibit.memoryText}</p>
      </figcaption>
    </figure>
  );
}

function EmptyPartnersState() {
  const { copy } = useI18n();

  return (
    <div className="border-white/12 relative overflow-hidden rounded-lg border bg-white/[0.035] px-6 py-8 text-center sm:px-10 sm:py-10">
      <div
        className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-gold/55 to-transparent"
        aria-hidden="true"
      />
      <p className="font-serif text-2xl font-semibold leading-tight text-white sm:text-3xl">
        {copy.coCreators.emptyState.title}
      </p>
      <p className="text-white/66 mx-auto mt-5 max-w-3xl whitespace-pre-line text-base leading-8 sm:text-lg">
        {copy.coCreators.emptyState.description}
      </p>
    </div>
  );
}

function DemoPartnerSlot({ tier }: { tier: PartnerTier }) {
  const { copy } = useI18n();
  const tierCopy = getTierCopy(copy, tier);

  return (
    <div className="border-white/12 group min-h-[132px] rounded border bg-[#08131f]/88 p-5 transition duration-300 hover:-translate-y-1 hover:border-gold/45 hover:bg-[#0b1827] sm:min-h-[150px]">
      <div className="flex h-full items-center justify-center rounded-sm border border-dashed border-gold/25 bg-gold/[0.035] px-5 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold/78">{tierCopy.placeholder}</p>
      </div>
    </div>
  );
}

function PartnerCard({ partner, onSelect }: { partner: Partner; onSelect: (partner: Partner) => void }) {
  const { copy } = useI18n();
  const tierCopy = getTierCopy(copy, partner.tier);

  return (
    <button
      type="button"
      onClick={() => onSelect(partner)}
      className="border-white/12 group min-h-[150px] rounded border bg-[#08131f]/88 p-5 text-left transition duration-300 hover:-translate-y-1 hover:border-gold/45 hover:shadow-[0_24px_70px_rgba(200,164,90,0.12)] focus:outline-none focus:ring-2 focus:ring-gold/70"
      aria-label={copy.coCreators.partnerAria
        .replace("{name}", partner.name)
        .replace("{role}", tierCopy.title)}
    >
      <span className="flex h-20 items-center justify-center rounded-sm border border-white/10 bg-white/[0.035] px-6">
        <Image
          src={partner.logoSrc}
          alt={`${partner.name} - ${tierCopy.title}`}
          width={180}
          height={72}
          className="max-h-14 w-auto object-contain opacity-75 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
        />
      </span>
      <span className="mt-5 block font-serif text-xl font-semibold text-white">{partner.name}</span>
      <span className="mt-2 block text-xs font-bold uppercase tracking-[0.16em] text-gold/75">{tierCopy.title}</span>
    </button>
  );
}

function PartnerTierSection({
  tier,
  partners,
  layoutDemo,
  onSelect
}: {
  tier: PartnerTier;
  partners: Partner[];
  layoutDemo: boolean;
  onSelect: (partner: Partner) => void;
}) {
  const { copy } = useI18n();
  const tierCopy = getTierCopy(copy, tier);

  return (
    <section className="border-white/10 border-t pt-9">
      <div className="grid gap-5 lg:grid-cols-[0.42fr_1fr] lg:gap-10">
        <div>
          <h3 className="font-serif text-2xl font-semibold leading-tight text-white sm:text-3xl">{tierCopy.title}</h3>
          <p className="text-white/62 mt-4 text-sm leading-7 sm:text-base">{tierCopy.description}</p>
        </div>
        <div className={`grid gap-4 ${tierGridClasses[tier]}`}>
          {partners.map((partner) => (
            <PartnerCard key={partner.id} partner={partner} onSelect={onSelect} />
          ))}
          {layoutDemo
            ? Array.from({ length: demoSlotCounts[tier] }).map((_, index) => (
                <DemoPartnerSlot key={`${tier}-${index}`} tier={tier} />
              ))
            : null}
        </div>
      </div>
    </section>
  );
}

function PartnerModal({ partner, onClose }: { partner: Partner | null; onClose: () => void }) {
  const { copy } = useI18n();
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!partner) {
      return;
    }

    const previousActiveElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previousActiveElement?.focus();
    };
  }, [onClose, partner]);

  return (
    <AnimatePresence>
      {partner ? (
        <motion.div
          className="fixed inset-0 z-[90] flex items-end justify-center bg-black/72 px-4 py-6 backdrop-blur-sm sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-label={copy.coCreators.modal.ariaLabel.replace("{name}", partner.name)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            className="relative w-full max-w-2xl rounded-lg border border-gold/35 bg-[#071426] p-6 text-white shadow-[0_30px_90px_rgba(0,0,0,0.5)] sm:p-8"
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center border border-white/16 text-white/72 transition hover:border-gold hover:text-gold focus:outline-none focus:ring-2 focus:ring-gold/70"
              aria-label={copy.coCreators.modal.close}
            >
              <X size={18} />
            </button>
            <div className="pr-12">
              <p className="section-kicker">{getTierCopy(copy, partner.tier).title}</p>
              <h3 className="mt-4 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl">
                {partner.name}
              </h3>
              <p className="text-white/68 mt-5 text-base leading-8">
                {(copy.coCreators.partnerDescriptions as Record<string, string>)[partner.descriptionKey] ??
                  partner.descriptionKey}
              </p>
              {partner.href ? (
                <a
                  href={partner.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex min-h-11 items-center gap-3 border border-gold/55 px-5 py-3 text-sm font-bold uppercase tracking-[0.13em] text-gold transition hover:bg-gold hover:text-navy focus:outline-none focus:ring-2 focus:ring-gold/70"
                >
                  {copy.coCreators.modal.visitWebsite}
                  <ExternalLink size={16} />
                </a>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function CoCreatorsSection({ layoutDemo = false, showMuseumExhibit = false }: CoCreatorsSectionProps) {
  const { copy } = useI18n();
  const [activePartner, setActivePartner] = useState<Partner | null>(null);
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);
  const confirmedPartners = useMemo(() => getConfirmedPartners(), []);
  const partnersByTier = useMemo(
    () =>
      partnerTierOrder.reduce<Record<PartnerTier, Partner[]>>(
        (tiers, tier) => {
          tiers[tier] = confirmedPartners.filter((partner) => partner.tier === tier);
          return tiers;
        },
        { founding: [], strategic: [], supporting: [] }
      ),
    [confirmedPartners]
  );
  const hasPartners = confirmedPartners.length > 0;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setShouldReduceMotion(mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  return (
    <section
      id="wspoltworcy"
      className="relative overflow-hidden bg-[#02080d] px-6 py-28 text-white sm:py-32 lg:px-10"
      aria-labelledby="co-creators-title"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_24%_12%,rgba(200,164,90,0.14),transparent_30%),radial-gradient(circle_at_88%_62%,rgba(92,58,27,0.2),transparent_28%),linear-gradient(180deg,#06101f_0%,#02080d_58%,#050a0e_100%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-[0.22] [background:repeating-linear-gradient(130deg,rgba(255,255,255,0.045)_0_1px,transparent_1px_18px)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40 bg-[radial-gradient(ellipse_at_center,rgba(200,164,90,0.12),transparent_62%)]"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-1/2 h-16 w-[76rem] max-w-[120vw] -translate-x-1/2 rounded-t-full bg-black/28 blur-sm"
        aria-hidden="true"
      />

      <motion.div
        className="relative mx-auto max-w-[1400px]"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-12% 0px" }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.75, ease: "easeOut" }}
      >
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <p className="section-kicker">{copy.coCreators.kicker}</p>
            <h2
              id="co-creators-title"
              className="mt-5 max-w-4xl text-balance font-serif text-[2.7rem] font-semibold leading-[1.02] text-white sm:text-6xl lg:text-7xl"
            >
              {copy.coCreators.title}
            </h2>
            <p className="mt-6 font-serif text-2xl font-semibold leading-tight text-gold sm:text-4xl">
              {copy.coCreators.emotionalTitle}
            </p>
          </div>
          <blockquote className="border-l border-gold/65 pl-6 font-serif text-2xl leading-snug text-white/92 sm:pl-8 sm:text-3xl">
            {copy.coCreators.quote}
          </blockquote>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14">
          <div>
            <p className="text-white/68 whitespace-pre-line text-base leading-8 sm:text-lg">
              {copy.coCreators.description}
            </p>
            {showMuseumExhibit ? <WoodenMemoryExhibit /> : null}
          </div>
          <WoodPanel>
            <div className="space-y-10">
              {partnerTierOrder.map((tier) => (
                <PartnerTierSection
                  key={tier}
                  tier={tier}
                  partners={partnersByTier[tier]}
                  layoutDemo={layoutDemo}
                  onSelect={setActivePartner}
                />
              ))}
              {!hasPartners && !layoutDemo ? <EmptyPartnersState /> : null}
            </div>
          </WoodPanel>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-white/12 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-serif text-2xl font-semibold leading-tight text-white sm:text-4xl">
            {copy.coCreators.ctaText}
          </p>
          <Link
            href="/#kontakt"
            className="stable-action inline-flex min-h-12 items-center justify-center gap-3 border border-gold/65 px-6 py-4 text-sm font-bold uppercase tracking-[0.14em] text-gold transition hover:bg-gold hover:text-navy focus:outline-none focus:ring-2 focus:ring-gold/70"
            aria-label={copy.coCreators.ctaAria}
          >
            {copy.coCreators.ctaButton}
            <ArrowRight size={17} />
          </Link>
        </div>
      </motion.div>

      <PartnerModal partner={activePartner} onClose={() => setActivePartner(null)} />
    </section>
  );
}
