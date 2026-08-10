"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { content, imagePath, localizedPath, routes, type SiteLanguage, type SiteRoute } from "./aeromorphism-content";

type PageCopy = (typeof content)[SiteLanguage];
type Work = PageCopy["works"][number];

type HomeClientProps = {
  language: SiteLanguage;
  route?: SiteRoute;
};

function SectionShell({
  id,
  tone = "dark",
  children
}: {
  id?: string;
  tone?: "dark" | "light" | "black";
  children: React.ReactNode;
}) {
  const toneClass =
    tone === "light"
      ? "bg-[#f0ece5] text-[#181716]"
      : tone === "black"
        ? "bg-[#0a0a0a] text-[#f0ece5]"
        : "bg-[#181716] text-[#f0ece5]";

  return (
    <section id={id} className={`${toneClass} px-5 py-24 sm:px-8 sm:py-32 lg:px-12`}>
      <div className="mx-auto max-w-[1480px]">{children}</div>
    </section>
  );
}

function Kicker({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p
      className={`text-[0.64rem] font-semibold uppercase tracking-[0.14em] [overflow-wrap:anywhere] sm:text-xs sm:tracking-[0.22em] ${light ? "text-[#b08a5a]" : "text-[#8d6e47]"}`}
    >
      {children}
    </p>
  );
}

function WorkCaption({ work, light = false }: { work: Work; light?: boolean }) {
  return (
    <div
      className={`grid gap-1 text-[0.62rem] font-bold uppercase leading-5 tracking-[0.08em] [overflow-wrap:anywhere] sm:text-xs sm:tracking-[0.15em] ${light ? "text-[#d7d1c7]/72" : "text-[#181716]/68"}`}
    >
      <span className={light ? "text-[#f0ece5]" : "text-[#181716]"}>{work.title}</span>
      <span>{work.year}</span>
      <span>{work.author}</span>
      <span>{work.movement}</span>
      <span>{work.status}</span>
    </div>
  );
}

function Header({ copy, language, activeRoute }: { copy: PageCopy; language: SiteLanguage; activeRoute: SiteRoute }) {
  const [open, setOpen] = useState(false);
  const languageToggle = (
    <div className="flex items-center gap-2" aria-label="PL / EN">
      {(["pl", "en"] as const).map((option) => (
        <Link
          key={option}
          href={localizedPath(option, activeRoute)}
          aria-current={language === option ? "page" : undefined}
          className={`px-1.5 py-1 transition hover:text-[#b08a5a] ${
            language === option ? "text-[#b08a5a]" : "text-[#d7d1c7]/76"
          }`}
        >
          {option.toUpperCase()}
        </Link>
      ))}
    </div>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/82 text-[#f0ece5] backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-[1480px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link href={localizedPath(language)} className="font-serif text-lg font-semibold tracking-[0.15em]">
          {copy.brandLabel}
        </Link>
        <div className="hidden items-center gap-7 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#d7d1c7]/76 lg:flex">
          {routes.map((item) => (
            <Link
              key={item.key}
              href={localizedPath(language, item.key)}
              className={`transition hover:text-[#b08a5a] ${activeRoute === item.key ? "text-[#b08a5a]" : ""}`}
            >
              {copy.nav[item.key]}
            </Link>
          ))}
          <div className="border-l border-white/18 pl-7">{languageToggle}</div>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex h-11 w-11 items-center justify-center border border-white/18 lg:hidden"
          aria-label={copy.nav.menu}
          aria-expanded={open}
        >
          <Menu size={20} aria-hidden="true" />
        </button>
      </nav>
      {open ? (
        <div className="fixed inset-0 z-50 min-h-screen bg-[#0a0a0a] px-5 py-5 text-[#f0ece5] lg:hidden">
          <div className="flex items-center justify-between">
            <span className="font-serif text-lg tracking-[0.15em]">{copy.brandLabel}</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-11 w-11 items-center justify-center border border-white/18"
              aria-label={copy.nav.close}
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>
          <div className="mt-16 grid gap-7 text-3xl font-semibold">
            {routes.map((item) => (
              <Link key={item.key} href={localizedPath(language, item.key)} onClick={() => setOpen(false)}>
                {copy.nav[item.key]}
              </Link>
            ))}
            <div className="mt-4 flex gap-5 border-t border-white/12 pt-8 text-2xl">{languageToggle}</div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function Hero({ copy, language }: { copy: PageCopy; language: SiteLanguage }) {
  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-[#0a0a0a] px-5 pb-16 pt-24 text-[#f0ece5] sm:px-8 lg:px-12">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_74%_42%,rgba(176,138,90,0.20),transparent_36%),linear-gradient(120deg,#0a0a0a_0%,#181716_48%,#2a2622_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(10,10,10,0.94),rgba(10,10,10,0.60)_42%,rgba(10,10,10,0.16)_100%)]" />
      <div className="mx-auto grid max-w-[1480px] gap-10 lg:min-h-[calc(100vh-10rem)] lg:grid-cols-[minmax(0,1.18fr)_minmax(0,0.82fr)] lg:items-center">
        <div className="relative z-10 max-w-4xl">
          <Kicker light>{copy.creatorLine}</Kicker>
          <h1 className="mt-7 overflow-visible text-balance font-serif text-[clamp(1.82rem,7vw,2.35rem)] font-semibold leading-[1.04] sm:text-[clamp(4.2rem,8.4vw,9rem)] sm:leading-[0.92]">
            {copy.hero.title}
          </h1>
          <p className="mt-8 max-w-3xl text-balance text-base font-semibold uppercase leading-snug tracking-[0.03em] text-[#d7d1c7] [overflow-wrap:anywhere] sm:text-4xl sm:leading-tight sm:tracking-[0.08em]">
            {copy.hero.subtitle}
          </p>
          <div className="mt-8 space-y-2 text-xl leading-8 text-[#d7d1c7]/74 sm:text-2xl">
            {copy.hero.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href={localizedPath(language, "works")}
              className="border border-[#b08a5a] px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[#f0ece5] transition hover:bg-[#b08a5a] hover:text-[#0a0a0a]"
            >
              {copy.hero.secondary}
            </Link>
            <Link
              href={localizedPath(language, "manifest")}
              className="border border-white/18 px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[#f0ece5]/78 transition hover:border-[#d7d1c7] hover:text-[#f0ece5]"
            >
              {copy.hero.primary}
            </Link>
          </div>
        </div>
        <figure className="relative min-h-[500px] overflow-hidden lg:min-h-[calc(100vh-8rem)]">
          <Image
            src={imagePath}
            alt={copy.hero.imageAlt}
            fill
            priority
            sizes="(min-width: 1024px) 56vw, 100vw"
            className="aero-hero-image object-contain object-bottom lg:object-center"
          />
          <figcaption className="absolute bottom-0 left-0 right-0 border-l border-[#b08a5a] bg-[#0a0a0a]/62 px-5 py-4 text-[0.58rem] uppercase leading-5 tracking-[0.08em] text-[#d7d1c7]/74 [overflow-wrap:anywhere] backdrop-blur sm:text-[0.65rem] sm:tracking-[0.12em]">
            {copy.hero.imageCaption.split(" / ").map((part, index, parts) => (
              <span key={part} className="block sm:inline">
                {part}
                {index < parts.length - 1 ? <span className="hidden sm:inline"> / </span> : null}
              </span>
            ))}
          </figcaption>
        </figure>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#181716] to-transparent" />
    </section>
  );
}

function Definition({ copy }: { copy: PageCopy }) {
  return (
    <SectionShell>
      <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
        <Kicker light>{copy.definition.heading}</Kicker>
        <div>
          <blockquote className="text-balance font-serif text-3xl font-semibold leading-tight text-[#f0ece5] sm:text-5xl">
            {copy.definition.quote}
          </blockquote>
          <p className="mt-10 border-l border-[#b08a5a] pl-6 text-xl leading-9 text-[#d7d1c7]/78">
            {copy.definition.principle}
          </p>
        </div>
      </div>
    </SectionShell>
  );
}

function Origins({ copy }: { copy: PageCopy }) {
  return (
    <SectionShell id="origins" tone="black">
      <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr]">
        <div>
          <Kicker light>{copy.origins.kicker}</Kicker>
          <h2 className="mt-5 text-balance font-serif text-5xl font-semibold leading-[0.95] sm:text-7xl">
            {copy.origins.title}
          </h2>
          <p className="mt-8 text-2xl leading-tight text-[#b08a5a] sm:text-4xl">{copy.origins.intro}</p>
        </div>
        <div>
          <div className="space-y-6 text-lg leading-9 text-[#d7d1c7]/76 sm:text-xl">
            {copy.origins.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <blockquote className="mt-10 border-y border-[#b08a5a]/42 py-8 font-serif text-3xl font-semibold leading-tight text-[#f0ece5] sm:text-5xl">
            {copy.origins.quote}
          </blockquote>
          <p className="mt-8 text-xl leading-9 text-[#d7d1c7]/78">{copy.origins.question}</p>
        </div>
      </div>
    </SectionShell>
  );
}

function PrincipleSection({ copy, index }: { copy: PageCopy; index: number }) {
  const item = copy.principles[index];
  const light = index % 2 === 1;

  return (
    <SectionShell id={item.id} tone={light ? "light" : "dark"}>
      <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr]">
        <span className={`font-serif text-5xl ${light ? "text-[#8d6e47]" : "text-[#b08a5a]"}`}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <div>
          <h2 className={`text-balance font-serif text-5xl font-semibold leading-tight sm:text-7xl ${light ? "text-[#181716]" : "text-[#f0ece5]"}`}>
            {item.title}
          </h2>
          <p className={`mt-8 max-w-4xl text-xl leading-9 ${light ? "text-[#181716]/74" : "text-[#d7d1c7]/74"}`}>
            {item.body}
          </p>
          <p className={`mt-10 max-w-4xl border-l border-[#b08a5a] pl-6 font-serif text-3xl font-semibold leading-tight sm:text-5xl ${light ? "text-[#181716]" : "text-[#f0ece5]"}`}>
            {item.quote}
          </p>
        </div>
      </div>
    </SectionShell>
  );
}

function ArchetypeI({ copy }: { copy: PageCopy }) {
  return (
    <SectionShell id="archetypes" tone="light">
      <div className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <figure className="relative min-h-[620px] overflow-hidden bg-[#181716]">
          <Image
            src={imagePath}
            alt={copy.hero.imageAlt}
            fill
            sizes="(min-width: 1024px) 52vw, 100vw"
            className="object-contain object-center p-3 sm:p-8"
          />
        </figure>
        <div>
          <Kicker>{copy.archetype.kicker}</Kicker>
          <h2 className="mt-5 font-serif text-6xl font-semibold leading-none sm:text-8xl">{copy.archetype.title}</h2>
          <p className="mt-8 text-xl leading-9 text-[#181716]/76">{copy.archetype.body}</p>
          <div className="mt-9 border-l border-[#b08a5a] pl-6">
            <WorkCaption work={copy.works[0]} />
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

function ArchetypeMap({ copy }: { copy: PageCopy }) {
  return (
    <SectionShell tone="black">
      <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr]">
        <div>
          <h2 className="text-balance font-serif text-5xl font-semibold leading-tight text-[#f0ece5] sm:text-7xl">
            {copy.archetypesLead}
          </h2>
          <p className="mt-8 text-xl leading-9 text-[#d7d1c7]/74">{copy.archetypesIntro}</p>
        </div>
        <div className="divide-y divide-white/12 border-y border-white/12">
          {copy.archetypeGroups.map((group, index) => (
            <article key={group.id} className="py-8">
              <span className="font-serif text-3xl text-[#b08a5a]">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-5 font-serif text-3xl font-semibold text-[#f0ece5]">{group.title}</h3>
              <p className="mt-4 text-lg leading-8 text-[#d7d1c7]/70">{group.description}</p>
            </article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

function HomeGallery({ copy, language }: { copy: PageCopy; language: SiteLanguage }) {
  const primaryWork = copy.works[0];
  const featuredWorks = copy.works.filter((work) => work.featured && work.id !== primaryWork.id);

  return (
    <SectionShell id="works">
      <div className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div>
          <Kicker light>{copy.gallery.title}</Kicker>
          <h2 className="mt-5 max-w-4xl text-balance font-serif text-5xl font-semibold leading-tight sm:text-7xl">
            {copy.gallery.note}
          </h2>
        </div>
        <Link
          href={localizedPath(language, "works")}
          className="w-fit border border-[#b08a5a] px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[#f0ece5] transition hover:bg-[#b08a5a] hover:text-[#0a0a0a]"
        >
          {copy.gallery.cta}
        </Link>
      </div>
      <article className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <figure className="relative min-h-[680px] overflow-hidden bg-[#0a0a0a]">
          <Image
            src={primaryWork.image}
            alt={primaryWork.alt}
            fill
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-contain p-4 sm:p-8"
          />
        </figure>
        <div className="border-t border-[#b08a5a]/45 pt-8">
          <Kicker light>{primaryWork.archetype}</Kicker>
          <h3 className="mt-5 font-serif text-4xl font-semibold text-[#f0ece5] sm:text-6xl">{primaryWork.title}</h3>
          <div className="mt-8">
            <WorkCaption work={primaryWork} light />
          </div>
        </div>
      </article>
      <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
        {featuredWorks.map((work) => (
          <article key={work.id} className="group border-t border-[#b08a5a]/36 pt-6">
            <figure className="relative min-h-[440px] overflow-hidden bg-[#0a0a0a] sm:min-h-[520px]">
              <Image
                src={work.image}
                alt={work.alt}
                fill
                sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                className="object-contain p-4 transition duration-700 group-hover:scale-[1.025]"
              />
            </figure>
            <div className="mt-6">
              <Kicker light>{work.archetype}</Kicker>
              <h3 className="mt-3 font-serif text-2xl font-semibold leading-tight text-[#f0ece5]">{work.title}</h3>
              <div className="mt-5">
                <WorkCaption work={work} light />
              </div>
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}

function WorksPage({ copy }: { copy: PageCopy }) {
  return (
    <SectionShell id="works">
      <div className="mb-16 max-w-5xl">
        <Kicker light>{copy.gallery.title}</Kicker>
        <h2 className="mt-5 text-balance font-serif text-5xl font-semibold leading-tight text-[#f0ece5] sm:text-7xl">
          {copy.gallery.worksIntro}
        </h2>
        <p className="mt-8 text-lg leading-8 text-[#d7d1c7]/70">{copy.gallery.missingImages}</p>
      </div>
      <div className="space-y-20">
        {copy.archetypeGroups.map((group) => {
          const works = group.works
            .map((workId) => copy.works.find((work) => work.id === workId))
            .filter((work): work is Work => Boolean(work));

          return (
            <section key={group.id} id={group.id} className="border-t border-white/12 pt-10">
              <div className="mb-9 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
                <h3 className="font-serif text-4xl font-semibold leading-tight text-[#f0ece5]">{group.title}</h3>
                <p className="text-lg leading-8 text-[#d7d1c7]/70">{group.description}</p>
              </div>
              {works.length > 0 ? (
                <div className="grid gap-8 lg:grid-cols-2">
                  {works.map((work) => (
                    <article key={work.id} className="grid gap-6">
                      <figure className="relative min-h-[620px] overflow-hidden bg-[#0a0a0a]">
                        <Image src={work.image} alt={work.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-contain p-4 sm:p-8" />
                      </figure>
                      <WorkCaption work={work} light />
                    </article>
                  ))}
                </div>
              ) : null}
            </section>
          );
        })}
      </div>
    </SectionShell>
  );
}

function Manifest({ copy }: { copy: PageCopy }) {
  return (
    <SectionShell id="manifest" tone="black">
      <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
        <div>
          <Kicker light>{copy.manifesto.subtitle}</Kicker>
          <h2 className="mt-5 text-balance font-serif text-5xl font-semibold leading-tight sm:text-7xl">
            {copy.manifesto.title}
          </h2>
          <p className="mt-8 text-lg leading-8 text-[#d7d1c7]/70">{copy.manifesto.intro}</p>
        </div>
        <div className="divide-y divide-white/12 border-y border-white/12">
          {copy.manifesto.items.map((item, index) => (
            <div key={item} className="grid gap-5 py-7 sm:grid-cols-[86px_1fr]">
              <span className="font-serif text-3xl text-[#b08a5a]">{String(index + 1).padStart(2, "0")}</span>
              <p className="text-2xl font-semibold uppercase leading-tight tracking-[0.04em] text-[#f0ece5] sm:text-3xl">
                {item}
              </p>
            </div>
          ))}
          <p className="py-8 text-sm font-bold uppercase tracking-[0.18em] text-[#b08a5a]">{copy.manifesto.sign}</p>
        </div>
      </div>
    </SectionShell>
  );
}

function Author({ copy }: { copy: PageCopy }) {
  return (
    <SectionShell id="author" tone="light">
      <div className="grid gap-12 lg:grid-cols-[0.84fr_1.16fr] lg:items-start">
        <div>
          <Kicker>{copy.authorBlock.kicker}</Kicker>
          <h2 className="mt-5 font-serif text-5xl font-semibold leading-none sm:text-7xl">{copy.authorBlock.title}</h2>
          <p className="mt-5 text-sm font-bold uppercase tracking-[0.2em] text-[#8d6e47]">{copy.authorBlock.subtitle}</p>
        </div>
        <div className="max-w-3xl">
          {copy.authorBlock.body.map((paragraph) => (
            <p key={paragraph} className="mb-7 text-lg leading-9 text-[#181716]/76 sm:text-xl">
              {paragraph}
            </p>
          ))}
          <p className="mt-8 border-t border-black/12 pt-7 text-sm font-bold uppercase leading-6 tracking-[0.18em] text-[#181716]">
            {copy.authorBlock.sign.join(" / ")}
          </p>
        </div>
      </div>
    </SectionShell>
  );
}

function ObservationTower({ copy }: { copy: PageCopy }) {
  const [isBoardOpen, setIsBoardOpen] = useState(false);
  const architecture = copy.architecture;

  return (
    <section id="moai-observation-tower" className="bg-[#0a0a0a] px-5 py-24 text-[#f0ece5] sm:px-8 sm:py-32 lg:px-12">
      <div className="mx-auto max-w-[1480px]">
        <div className="mb-14 max-w-5xl">
          <Kicker light>{architecture.kicker}</Kicker>
          <h2 className="mt-6 text-balance font-serif text-5xl font-semibold leading-[0.92] sm:text-7xl lg:text-8xl">
            {architecture.title}
          </h2>
          <p className="mt-5 text-xl font-semibold uppercase tracking-[0.16em] text-[#b08a5a] sm:text-2xl">
            {architecture.subtitle}
          </p>
        </div>

        <figure className="relative min-h-[460px] overflow-hidden bg-[#181716] sm:min-h-[620px] lg:min-h-[820px]">
          <Image
            src={architecture.dayImage}
            alt={architecture.dayAlt}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <figcaption className="absolute bottom-0 left-0 max-w-xl border-l border-[#b08a5a] bg-[#0a0a0a]/68 px-5 py-4 text-xs font-bold uppercase leading-5 tracking-[0.15em] text-[#d7d1c7]/78 backdrop-blur">
            {architecture.subtitle} / Rapa Nui Park / Concept / Design visualization
          </figcaption>
        </figure>

        <div className="mt-16 grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="border-t border-[#b08a5a]/45 pt-8">
            <div className="grid gap-5">
              {architecture.credits.map(([label, value]) => (
                <div key={label}>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#d7d1c7]/48">{label}</p>
                  <p className="mt-2 text-sm font-bold uppercase tracking-[0.16em] text-[#f0ece5]">{value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-7 text-lg leading-9 text-[#d7d1c7]/76 sm:text-xl">
            {architecture.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p className="whitespace-pre-line border-l border-[#b08a5a] pl-6 font-serif text-3xl font-semibold leading-tight text-[#f0ece5] sm:text-5xl">
              {architecture.quote}
            </p>
            <p className="text-[#f0ece5]">{architecture.philosophy}</p>
          </div>
        </div>
      </div>

      <div className="mx-[calc(50%-50vw)] mt-24 bg-[#f0ece5] px-5 py-20 text-[#181716] sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1480px] gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <button
            type="button"
            onClick={() => setIsBoardOpen(true)}
            className="group relative min-h-[520px] overflow-hidden border border-black/12 bg-white shadow-[0_32px_90px_rgba(10,10,10,0.18)] sm:min-h-[760px]"
            aria-label={architecture.enlarge}
          >
            <Image
              src={architecture.modularImage}
              alt={architecture.modularAlt}
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-contain p-2 transition duration-700 group-hover:scale-[1.012] sm:p-4"
            />
            <span className="absolute bottom-4 right-4 border border-black/20 bg-[#f0ece5]/92 px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[#181716] backdrop-blur">
              {architecture.enlarge}
            </span>
          </button>
          <div>
            <Kicker>{architecture.subtitle}</Kicker>
            <h3 className="mt-5 text-balance font-serif text-4xl font-semibold leading-tight sm:text-6xl">
              Modular Segmentation Proposal
            </h3>
            <p className="mt-8 text-xl leading-9 text-[#181716]/74">{architecture.technicalText}</p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-24 max-w-[1480px]">
        <figure className="relative min-h-[440px] overflow-hidden bg-[#181716] sm:min-h-[620px] lg:min-h-[760px]">
          <Image
            src={architecture.eveningImage}
            alt={architecture.eveningAlt}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </figure>
        <div className="mt-12 border-l border-[#b08a5a] pl-6">
          {architecture.ending.map((line) => (
            <p key={line} className="font-serif text-3xl font-semibold uppercase leading-tight text-[#f0ece5] sm:text-5xl">
              {line}
            </p>
          ))}
        </div>
      </div>

      {isBoardOpen ? (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-[#0a0a0a]/92 p-4 backdrop-blur"
          role="dialog"
          aria-modal="true"
          aria-label={architecture.enlarge}
          onClick={() => setIsBoardOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsBoardOpen(false)}
            className="absolute right-4 top-4 z-10 inline-flex h-12 w-12 items-center justify-center border border-white/24 bg-[#0a0a0a]/72 text-[#f0ece5]"
            aria-label={architecture.close}
          >
            <X size={22} aria-hidden="true" />
          </button>
          <div className="relative h-[88vh] w-full max-w-[1500px] bg-[#f0ece5]" onClick={(event) => event.stopPropagation()}>
            <Image
              src={architecture.modularImage}
              alt={architecture.modularAlt}
              fill
              sizes="100vw"
              className="object-contain p-2 sm:p-5"
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}

function RapaNuiPark({ copy }: { copy: PageCopy }) {
  return (
    <SectionShell tone="light">
      <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
        <h2 className="font-serif text-5xl font-semibold leading-tight sm:text-7xl">{copy.rapaNuiPark.title}</h2>
        <div>
          <p className="text-lg leading-9 text-[#181716]/76 sm:text-xl">{copy.rapaNuiPark.body}</p>
          <a
            href="https://ahutongariki.pl"
            className="mt-8 inline-block border border-[#181716] px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] transition hover:border-[#b08a5a] hover:text-[#8d6e47]"
          >
            {copy.rapaNuiPark.link}
          </a>
        </div>
      </div>
    </SectionShell>
  );
}

function Footer({ copy, language }: { copy: PageCopy; language: SiteLanguage }) {
  return (
    <footer className="bg-[#0a0a0a] px-5 py-12 text-[#d7d1c7] sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-[1480px] flex-col gap-8 border-t border-white/12 pt-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="font-serif text-2xl font-semibold tracking-[0.14em] text-[#f0ece5]">{copy.brand}</p>
          <p className="mt-3 text-sm text-[#d7d1c7]/68">{copy.footer.line}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.16em] text-[#b08a5a]">{copy.footer.creator}</p>
        </div>
        <div className="text-sm text-[#d7d1c7]/68 lg:text-right">
          <p>{copy.footer.copyright}</p>
          <div className="mt-3 flex gap-4 lg:justify-end">
            <Link href={localizedPath(language)}>{language.toUpperCase()}</Link>
            <a href="https://ahutongariki.pl">Rapa Nui Park ↗</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function PageIntro({ copy, route }: { copy: PageCopy; route: SiteRoute }) {
  if (route === "home") {
    return null;
  }

  const titles: Record<SiteRoute, string> = {
    home: copy.title,
    manifest: copy.manifesto.title,
    origins: copy.origins.title,
    archetypes: copy.nav.archetypes,
    works: copy.nav.works,
    author: copy.authorBlock.title
  };

  return (
    <section className="bg-[#0a0a0a] px-5 pb-16 pt-32 text-[#f0ece5] sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1480px]">
        <Kicker light>{copy.creatorLine}</Kicker>
        <h1 className="mt-7 text-balance font-serif text-[clamp(3.5rem,10vw,9rem)] font-semibold leading-[0.88]">
          {titles[route]}
        </h1>
      </div>
    </section>
  );
}

export default function HomeClient({ language, route = "home" }: HomeClientProps) {
  const copy = content[language];

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Header copy={copy} language={language} activeRoute={route} />
      {route === "home" ? <Hero copy={copy} language={language} /> : <PageIntro copy={copy} route={route} />}

      {route === "home" ? (
        <>
          <Definition copy={copy} />
          <Origins copy={copy} />
          <PrincipleSection copy={copy} index={0} />
          <ArchetypeI copy={copy} />
          <PrincipleSection copy={copy} index={1} />
          <PrincipleSection copy={copy} index={2} />
          <PrincipleSection copy={copy} index={3} />
          <PrincipleSection copy={copy} index={4} />
          <PrincipleSection copy={copy} index={5} />
          <ArchetypeMap copy={copy} />
          <HomeGallery copy={copy} language={language} />
          <Manifest copy={copy} />
          <Author copy={copy} />
          <ObservationTower copy={copy} />
          <RapaNuiPark copy={copy} />
        </>
      ) : null}

      {route === "manifest" ? <Manifest copy={copy} /> : null}
      {route === "origins" ? (
        <>
          <Origins copy={copy} />
          <Definition copy={copy} />
          <PrincipleSection copy={copy} index={0} />
        </>
      ) : null}
      {route === "archetypes" ? (
        <>
          <ArchetypeI copy={copy} />
          <ArchetypeMap copy={copy} />
        </>
      ) : null}
      {route === "works" ? <WorksPage copy={copy} /> : null}
      {route === "author" ? (
        <>
          <Author copy={copy} />
          <ObservationTower copy={copy} />
          <RapaNuiPark copy={copy} />
        </>
      ) : null}
      <Footer copy={copy} language={language} />
    </main>
  );
}
