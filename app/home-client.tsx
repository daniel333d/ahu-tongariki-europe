"use client";

import Image from "next/image";
import { type CSSProperties, type FormEvent, useEffect, useState } from "react";
import { languageOptions } from "./i18n";
import { I18nProvider, useI18n } from "./i18n-provider";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  ChevronDown,
  Globe2,
  GraduationCap,
  Handshake,
  Landmark,
  Mail,
  Menu,
  MapPin,
  Mountain,
  X,
  Utensils,
  UsersRound
} from "lucide-react";

const SITE_PASSWORD = "JoranaSkiba2026";
const AUTH_STORAGE_KEY = "ahu-tongariki-authenticated";

const functionIcons = [Landmark, GraduationCap, Building2, Utensils, Mountain, UsersRound];

type ContactFormState = {
  fullName: string;
  organization: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  consent: boolean;
  website: string;
};

const initialContactForm: ContactFormState = {
  fullName: "",
  organization: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  consent: false,
  website: ""
};

const LOCATION_MAPS_URL = "https://maps.app.goo.gl/iAmH8QfGfYALpzUD6";

function AhuTongarikiMiniature({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/ahu-tongariki-miniature.png"
      alt=""
      width={1504}
      height={284}
      aria-hidden="true"
      className={className}
    />
  );
}

function EuropeMap() {
  const { copy } = useI18n();

  return (
    <div className="relative overflow-hidden rounded-lg border border-white/12 bg-navy p-5 text-white shadow-architectural sm:p-6 md:p-9">
      <Image
        src="/europe-map-premium.png"
        alt={copy.location.mapAlt}
        fill
        priority
        className="object-cover object-[58%_center] opacity-86 md:object-cover"
        sizes="(min-width: 1024px) 45vw, 100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,20,38,0.82),rgba(7,20,38,0.24)_52%,rgba(7,20,38,0.12)),radial-gradient(circle_at_66%_48%,rgba(184,150,72,0.16),transparent_22%)]" />
      <div className="group absolute left-[47.1%] top-[60.9%] z-20 -translate-x-1/2 -translate-y-1/2">
        <a
          href={LOCATION_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={copy.location.mapsAria}
          title={copy.accessibility.mapsTitle}
          aria-describedby="location-map-tooltip"
          className="block h-5 w-16 rotate-[18deg] cursor-pointer drop-shadow-[0_0_8px_rgba(184,150,72,0.42)] transition duration-300 hover:scale-110 hover:drop-shadow-[0_0_16px_rgba(184,150,72,0.72)]"
        >
          <AhuTongarikiMiniature className="h-full w-full object-contain" />
        </a>
        <div id="location-map-tooltip" role="tooltip" className="pointer-events-none absolute bottom-full left-1/2 mb-3 w-max -translate-x-1/2 rounded border border-gold/45 bg-navy px-4 py-3 text-center text-xs font-semibold leading-5 text-white opacity-0 shadow-[0_12px_30px_rgba(0,0,0,0.32)] transition duration-300 group-hover:opacity-100">
          {copy.location.tooltip.map((line, index) => (
            <span key={line}>
              {index === 1 ? <><br /><br /></> : null}
              {index > 1 ? <br /> : null}
              {line}
            </span>
          ))}
        </div>
      </div>
      <div className="relative z-10 flex items-center justify-between border-b border-white/12 pb-5 text-xs uppercase tracking-[0.2em] text-white/58">
        <span>{copy.location.mapKicker}</span>
        <span>{copy.location.mapCode}</span>
      </div>
      <div className="relative z-10 mt-8 min-h-[360px] sm:mt-12 md:mt-16 md:min-h-[320px]">
        <div className="absolute left-0 top-0 hidden max-w-[280px] md:block">
          <p className="text-2xl font-semibold leading-tight text-white">{copy.location.mapTitle}</p>
          <p className="mt-4 text-sm leading-6 text-white/68">{copy.location.mapBody}</p>
        </div>
      </div>
      <div className="relative z-10 border-t border-white/12 pt-5 md:hidden">
        <p className="text-xl font-semibold leading-tight text-white">{copy.location.mapTitle}</p>
        <p className="mt-3 text-sm leading-6 text-white/68">{copy.location.mapBody}</p>
      </div>
      <div className="relative z-10 mt-7 grid grid-cols-2 gap-px bg-white/12 text-sm">
        <div className="bg-navy/80 p-4">
          <span className="block text-white/48">{copy.location.orientationLabel}</span>
          <strong className="mt-1 block font-medium">{copy.location.orientationValue}</strong>
        </div>
        <div className="bg-navy/80 p-4">
          <span className="block text-white/48">{copy.location.contextLabel}</span>
          <strong className="mt-1 block font-medium">{copy.location.contextValue}</strong>
        </div>
      </div>
    </div>
  );
}

function SectionHeading({
  kicker,
  title,
  intro,
  light = false
}: {
  kicker: string;
  title: string;
  intro?: string;
  light?: boolean;
}) {
  return (
    <div className="max-w-3xl">
      <p className="section-kicker">{kicker}</p>
      <h2 className={`mt-5 font-serif text-[2.35rem] font-semibold leading-tight text-balance sm:text-5xl ${light ? "text-white" : "text-navy"}`}>
        {title}
      </h2>
      {intro ? (
        <p className={`mt-6 text-[1.05rem] leading-8 sm:text-lg ${light ? "text-white/70" : "text-ink/72"}`}>
          {intro}
        </p>
      ) : null}
    </div>
  );
}

function CinematicIntro() {
  const { copy } = useI18n();

  return (
    <main className="cinematic-intro fixed inset-0 z-[80] overflow-hidden bg-black text-white">
      <Image
        src="/iorana-intro-sunrise.png"
        alt=""
        fill
        priority
        aria-hidden="true"
        className="cinematic-intro-image object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.94)_0%,rgba(2,8,16,0.76)_36%,rgba(4,13,25,0.6)_100%),radial-gradient(circle_at_50%_56%,rgba(200,164,90,0.18),transparent_30%)]" />
      <div className="cinematic-dust absolute inset-0 opacity-45" />
      <section className="relative z-10 flex min-h-screen items-center justify-center px-6 text-center">
        <div className="cinematic-title-wrap">
          <h1 className="cinematic-title font-serif text-[4rem] font-semibold tracking-[0.22em] text-gold min-[430px]:text-7xl sm:text-8xl">
            {copy.brand.iorana}
          </h1>
          <p className="cinematic-subtitle mt-6 text-sm uppercase tracking-[0.28em] text-white/70 sm:text-base">
            {copy.intro.subtitle}
          </p>
        </div>
      </section>
    </main>
  );
}

function LanguageWelcome() {
  const { copy, selectLanguage } = useI18n();

  return (
    <main className="language-welcome multilingual-layout relative min-h-screen overflow-hidden bg-black px-6 py-10 text-white sm:py-14 lg:px-10" aria-label={copy.accessibility.languageWelcomeLabel}>
      <Image
        src="/iorana-intro-sunrise.png"
        alt={copy.intro.imageAlt}
        fill
        priority
        className="language-welcome-image object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,9,18,0.74),rgba(3,9,18,0.88)),linear-gradient(90deg,rgba(3,9,18,0.9),rgba(3,9,18,0.38)_52%,rgba(3,9,18,0.82))]" />
      <div className="cinematic-dust absolute inset-0 opacity-35" />
      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl flex-col items-center justify-center text-center">
        <p className="text-xs font-bold uppercase tracking-[0.32em] text-gold">{copy.brand.name}</p>
        <h1 className="mt-8 font-serif text-[4.6rem] font-semibold leading-none tracking-[0.16em] text-gold min-[430px]:text-8xl sm:text-9xl">
          {copy.brand.iorana}
        </h1>
        <p className="mt-6 max-w-xl text-sm uppercase tracking-[0.24em] text-white/62 sm:text-base">
          {copy.intro.welcomeWords}
        </p>
        <div className="mx-auto mt-10 h-px w-24 bg-gold/70" />
        <p className="mt-8 font-serif text-2xl font-semibold text-white sm:text-4xl">
          {copy.intro.tagline}
        </p>
        <p className="mt-4 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">
          {copy.intro.motto}
        </p>

        <div className="mt-12 text-center">
          <p className="font-serif text-2xl font-semibold leading-tight text-white sm:text-3xl">
            {copy.language.choose1}
          </p>
          <p className="mt-2 text-sm uppercase tracking-[0.2em] text-gold/86">{copy.language.choose2}</p>
          <p className="mt-2 text-sm text-white/58">{copy.language.choose3}</p>
        </div>

        <div className="mt-8 grid w-full max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {languageOptions.map((language) => (
            <button
              key={language.code}
              type="button"
              onClick={() => selectLanguage(language.code)}
              aria-label={copy.accessibility.languageOptionLabel.replace("{language}", copy.language.names[language.code])}
              title={copy.accessibility.languageOptionLabel.replace("{language}", copy.language.names[language.code])}
              className="language-option group border border-white/16 bg-white/[0.055] px-5 py-5 text-center shadow-[0_20px_60px_rgba(0,0,0,0.2)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-gold/75 hover:bg-gold/10"
            >
              <span className="text-lg font-semibold text-white transition group-hover:text-gold">{copy.language.names[language.code]}</span>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}

function LanguageSwitcher({ className = "fixed right-4 top-16 z-50 sm:right-6 sm:top-20" }: { className?: string }) {
  const { copy, language: selectedLanguage, selectLanguage } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const activeLanguage = languageOptions.find((language) => language.code === selectedLanguage) ?? languageOptions[0];

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="stable-action inline-flex min-h-11 items-center gap-2 border border-white/20 bg-navy/72 px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white/78 backdrop-blur transition hover:border-gold hover:text-gold"
        aria-label={copy.language.aria}
        aria-expanded={isOpen}
        aria-controls="language-switcher-menu"
        title={copy.accessibility.languageMenuTitle}
      >
        <Globe2 size={15} />
        {activeLanguage.code.toUpperCase()}
      </button>
      {isOpen ? (
        <div id="language-switcher-menu" className="mt-2 w-44 border border-white/14 bg-navy/94 p-2 text-white shadow-[0_24px_70px_rgba(0,0,0,0.32)] backdrop-blur" aria-label={copy.accessibility.languageMenuLabel}>
          {languageOptions.map((language) => (
            <button
              key={language.code}
              type="button"
              aria-current={language.code === selectedLanguage ? "true" : undefined}
              aria-label={`${copy.accessibility.languageOptionLabel.replace("{language}", copy.language.names[language.code])}${language.code === selectedLanguage ? `. ${copy.accessibility.currentLanguage}` : ""}`}
              title={copy.accessibility.languageOptionLabel.replace("{language}", copy.language.names[language.code])}
              onClick={() => {
                selectLanguage(language.code);
                setIsOpen(false);
              }}
              className="flex w-full items-center gap-3 px-3 py-2 text-left text-sm transition hover:bg-gold/12 hover:text-gold"
            >
              <span>{copy.language.names[language.code]}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function LoginScreen({
  password,
  error,
  confidentialityAccepted,
  confidentialityOpen,
  onPasswordChange,
  onConfidentialityChange,
  onConfidentialityToggle,
  onSubmit
}: {
  password: string;
  error: string;
  confidentialityAccepted: boolean;
  confidentialityOpen: boolean;
  onPasswordChange: (value: string) => void;
  onConfidentialityChange: (value: boolean) => void;
  onConfidentialityToggle: () => void;
  onSubmit: () => void;
}) {
  const { copy } = useI18n();
  const isSubmitDisabled = !password.trim() || !confidentialityAccepted;

  return (
    <main className="login-screen multilingual-layout relative flex min-h-screen flex-col justify-center overflow-x-hidden bg-navy px-6 py-12 text-white sm:py-16 lg:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(200,164,90,0.14),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.07),transparent_42%)]" />
      <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(120deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(30deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:72px_72px]" />

      <section className="login-panel relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center justify-center text-center">
        <div className="w-full max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.32em] text-gold">{copy.brand.name.toUpperCase()}</p>
          <p className="mt-5 text-sm uppercase tracking-[0.22em] text-white/52">{copy.login.concept}</p>
          <h1 className="mt-10 font-serif text-4xl font-semibold leading-tight text-balance sm:text-6xl">
            <span className="block whitespace-normal text-gold min-[430px]:whitespace-nowrap">{copy.login.slogan1}</span>
            <span className="block whitespace-normal min-[430px]:whitespace-nowrap">{copy.login.slogan2}</span>
            <span className="block whitespace-normal text-gold min-[430px]:whitespace-nowrap">{copy.login.slogan3}</span>
          </h1>
          <div className="mx-auto mt-10 h-px w-20 bg-gold/70" />
          <p className="mt-10 text-xl font-semibold text-white">{copy.login.private}</p>
          <p className="mx-auto mt-4 max-w-md text-base leading-7 text-white/66">
            {copy.login.access}
          </p>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              onSubmit();
            }}
            className="mx-auto mt-10 max-w-sm"
          >
            <label className="block text-left">
              <span className="text-sm font-semibold text-white/72">{copy.login.password}</span>
              <input
                type="password"
                value={password}
                onChange={(event) => onPasswordChange(event.target.value)}
                placeholder={copy.login.passwordPlaceholder}
                aria-label={copy.login.password}
                aria-required="true"
                aria-invalid={Boolean(error)}
                className="mt-3 w-full border border-white/16 bg-white/[0.06] px-4 py-4 text-white outline-none transition focus:border-gold"
                autoComplete="current-password"
                autoFocus
              />
            </label>
            <label className="mt-5 flex items-start gap-3 text-left text-xs leading-5 text-white/62">
              <input
                type="checkbox"
                checked={confidentialityAccepted}
                onChange={(event) => onConfidentialityChange(event.target.checked)}
                aria-label={copy.login.confidentiality}
                aria-required="true"
                className="mt-1 h-4 w-4 shrink-0 accent-gold"
              />
              <span>{copy.login.confidentiality}</span>
            </label>
            <button
              type="button"
              onClick={onConfidentialityToggle}
              className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-gold transition hover:text-sand"
              aria-expanded={confidentialityOpen}
              aria-controls="confidentiality-rules"
              title={copy.accessibility.confidentialityToggleTitle}
            >
              {copy.login.rules}
            </button>
            {confidentialityOpen ? (
              <div id="confidentiality-rules" className="mt-4 border border-white/12 bg-white/[0.045] p-4 text-left text-xs leading-6 text-white/62">
                {copy.login.rulesText}
              </div>
            ) : null}
            {password.trim() && !confidentialityAccepted ? (
              <p className="mt-3 text-left text-sm text-gold" role="alert">
                {copy.login.confirmRequired}
              </p>
            ) : null}
            {error ? <p className="mt-3 text-left text-sm text-gold" role="alert">{error}</p> : null}
            <button
              type="button"
              onClick={onSubmit}
              disabled={isSubmitDisabled}
              title={copy.accessibility.loginSubmitTitle}
              className="stable-action mt-5 w-full bg-gold px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-navy transition hover:bg-sand disabled:cursor-not-allowed disabled:bg-white/18 disabled:text-white/38"
            >
              {copy.login.enter}
            </button>
          </form>
        </div>
      </section>

      <footer className="relative z-10 mx-auto mt-[60px] max-w-3xl px-6 text-center text-xs leading-6 text-white/52 sm:text-sm">
        <p>{copy.login.footerCopyright}</p>
        <p>{copy.login.private}</p>
        <p>{copy.login.access}</p>
      </footer>
    </main>
  );
}

export default function Home() {
  return (
    <I18nProvider>
      <HomeContent />
    </I18nProvider>
  );
}

function HomeContent() {
  const { copy, language: selectedLanguage, hasSelectedLanguage } = useI18n();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [confidentialityAccepted, setConfidentialityAccepted] = useState(false);
  const [confidentialityOpen, setConfidentialityOpen] = useState(false);
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const [contactForm, setContactForm] = useState<ContactFormState>(initialContactForm);
  const [contactStatus, setContactStatus] = useState<"idle" | "success" | "error">("idle");
  const [contactMessage, setContactMessage] = useState("");
  const [isContactSubmitting, setIsContactSubmitting] = useState(false);
  const [contactFormStartedAt, setContactFormStartedAt] = useState(() => Date.now());
  const statueFacts = copy.statues.facts;
  const functions = copy.functions.items.map(([title, detail], index) => ({
    title,
    detail,
    icon: functionIcons[index]
  }));
  const regionalValue = copy.regional.items;
  const technicalData = copy.technical.rows;
  const ioranaThemes = copy.iorana.themes.map(([title, detail]) => ({ title, detail }));
  const nightExperiences = copy.night.cards.map(([title, detail]) => ({ title, detail }));

  useEffect(() => {
    setIsAuthenticated(window.localStorage.getItem(AUTH_STORAGE_KEY) === "true");
    setHasCheckedAuth(true);
  }, []);

  useEffect(() => {
    const introTimer = window.setTimeout(() => {
      setIsIntroComplete(true);
    }, 5200);

    return () => window.clearTimeout(introTimer);
  }, []);

  function handleLogin() {
    if (!confidentialityAccepted) {
      setLoginError(copy.login.confirmRequired);
      return;
    }

    if (password === SITE_PASSWORD) {
      window.localStorage.setItem(AUTH_STORAGE_KEY, "true");
      setIsAuthenticated(true);
      setPassword("");
      setLoginError("");
      setConfidentialityAccepted(false);
      return;
    }

    setLoginError(copy.login.invalidPassword);
  }

  function handleLogout() {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    setIsAuthenticated(false);
    setPassword("");
    setLoginError("");
    setConfidentialityAccepted(false);
    setConfidentialityOpen(false);
    setMobileMenuOpen(false);
  }

  function updateContactField<K extends keyof ContactFormState>(field: K, value: ContactFormState[K]) {
    setContactForm((currentForm) => ({
      ...currentForm,
      [field]: value
    }));
  }

  async function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setContactStatus("idle");
    setContactMessage("");

    if (!contactForm.fullName.trim() || !contactForm.email.trim() || !contactForm.subject.trim() || !contactForm.message.trim()) {
      setContactStatus("error");
      setContactMessage(copy.contact.required);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.email.trim())) {
      setContactStatus("error");
      setContactMessage(copy.contact.invalidEmail);
      return;
    }

    if (!contactForm.consent) {
      setContactStatus("error");
      setContactMessage(copy.contact.consentRequired);
      return;
    }

    setIsContactSubmitting(true);

    try {
      const response = await fetch("/api/investor-inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...contactForm,
          language: selectedLanguage,
          formStartedAt: contactFormStartedAt
        })
      });
      await response.json();

      if (!response.ok) {
        throw new Error(copy.contact.sendError);
      }

      setContactForm(initialContactForm);
      setContactFormStartedAt(Date.now());
      setContactStatus("success");
      setContactMessage(copy.contact.success);
    } catch {
      setContactStatus("error");
      setContactMessage(copy.contact.sendError);
    } finally {
      setIsContactSubmitting(false);
    }
  }

  if (!hasCheckedAuth) {
    return <main className="min-h-screen bg-black" aria-label={copy.accessibility.loadingStatus} />;
  }

  if (!hasSelectedLanguage) {
    return isIntroComplete ? <LanguageWelcome /> : <CinematicIntro />;
  }

  if (!isAuthenticated) {
    return (
      <>
        <LanguageSwitcher />
        <LoginScreen
          password={password}
          error={loginError}
          confidentialityAccepted={confidentialityAccepted}
          confidentialityOpen={confidentialityOpen}
          onPasswordChange={setPassword}
          onConfidentialityChange={setConfidentialityAccepted}
          onConfidentialityToggle={() => setConfidentialityOpen((isOpen) => !isOpen)}
          onSubmit={handleLogin}
        />
      </>
    );
  }

  return (
    <main key={selectedLanguage} className="page-language-fade multilingual-layout overflow-hidden bg-ivory text-ink">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:bg-gold focus:px-4 focus:py-3 focus:text-sm focus:font-bold focus:text-navy">
        {copy.accessibility.skipToContent}
      </a>
      <div className="fixed right-4 top-24 z-50 flex flex-wrap items-center justify-end gap-3 sm:right-6 sm:top-28">
        <LanguageSwitcher className="relative" />
        <button
          type="button"
          onClick={handleLogout}
          title={copy.accessibility.logoutTitle}
          aria-label={copy.accessibility.logoutTitle}
          className="border border-white/20 bg-navy/72 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/74 backdrop-blur transition hover:border-gold hover:text-gold"
        >
          {copy.nav.logout}
        </button>
      </div>
      <section className="relative min-h-screen bg-navy text-white">
        <Image
          src="/ahu-tongariki-hero.png"
          alt={copy.hero.imageAlt}
          fill
          priority
          className="object-cover object-[58%_center] md:object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#071426_0%,rgba(7,20,38,0.9)_32%,rgba(7,20,38,0.43)_66%,rgba(7,20,38,0.18)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-navy to-transparent" />

        <nav className="relative z-10 mx-auto flex max-w-[1500px] items-center justify-between px-6 py-7 lg:px-10" aria-label={copy.accessibility.navigationLabel}>
          <a href="#" className="font-serif text-2xl font-semibold tracking-wide">
            {copy.brand.name}
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="inline-flex h-12 w-12 items-center justify-center border border-white/22 text-white/88 transition hover:border-gold hover:text-gold md:hidden"
            aria-label={copy.nav.open}
            aria-expanded={mobileMenuOpen}
            title={copy.accessibility.openMenuTitle}
          >
            <Menu size={22} />
          </button>
          <a
            href="#kontakt"
            title={copy.accessibility.investorContactTitle}
            className="stable-action hidden items-center gap-3 border border-white/22 px-5 py-3 text-sm font-semibold text-white/88 transition hover:border-gold hover:text-gold md:flex"
          >
            <Mail size={16} />
            {copy.nav.contact}
          </a>
        </nav>

        {mobileMenuOpen ? (
          <div className="fixed inset-0 z-50 bg-navy/96 px-6 py-7 text-white backdrop-blur md:hidden" role="dialog" aria-modal="true" aria-label={copy.accessibility.mobileMenuLabel}>
            <div className="flex items-center justify-between">
              <span className="font-serif text-2xl font-semibold tracking-wide">{copy.brand.name}</span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex h-12 w-12 items-center justify-center border border-white/22 text-white/88"
                aria-label={copy.nav.close}
                title={copy.accessibility.closeMenuTitle}
              >
                <X size={22} />
              </button>
            </div>
            <div className="mt-16 grid gap-5 text-2xl font-semibold">
              {["#projekt", "#iorana-moai", "#uklad-posagow", "#lokalizacja", "#kontakt"].map((href, index) => [copy.nav.items[index], href] as const).map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  title={label}
                  onClick={() => setMobileMenuOpen(false)}
                  className="border-b border-white/12 pb-5 font-serif text-white transition hover:text-gold"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        ) : null}

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-96px)] max-w-[1500px] items-end px-6 pb-10 pt-16 sm:pb-14 lg:px-10 lg:pb-20">
          <div className="w-full">
            <div className="max-w-4xl">
              <p className="section-kicker mb-5 max-w-[18rem] sm:mb-6 sm:max-w-none">{copy.hero.location}</p>
              <h1 className="hero-title font-serif text-[3.35rem] font-semibold leading-[0.92] text-balance min-[430px]:text-[3.85rem] sm:text-7xl lg:text-[7.5rem]">
                {copy.brand.name}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-7 text-white/80 sm:mt-8 sm:max-w-2xl sm:text-2xl sm:leading-8">
                {copy.hero.subtitle}
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:mt-11 sm:flex-row sm:gap-4">
                <a
                  href="#projekt"
                  title={copy.accessibility.projectCtaTitle}
                  className="stable-action inline-flex w-full flex-wrap items-center justify-center gap-3 bg-gold px-6 py-4 text-center text-sm font-bold uppercase tracking-[0.14em] text-navy transition hover:bg-sand sm:w-auto sm:px-7 sm:tracking-[0.16em]"
                >
                  {copy.hero.ctaProject}
                  <ArrowRight size={18} />
                </a>
                <a
                  href="#kontakt"
                  title={copy.accessibility.investorContactTitle}
                  className="stable-action inline-flex w-full flex-wrap items-center justify-center gap-3 border border-white/28 px-6 py-4 text-center text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:border-gold hover:text-gold sm:w-auto sm:px-7 sm:tracking-[0.16em]"
                >
                  {copy.hero.ctaContact}</a>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-2 border-y border-white/16 sm:mt-16 md:grid-cols-4">
              {copy.hero.stats.map(([label, value]) => (
                <div key={label} className="border-white/16 py-4 odd:border-r odd:pr-4 even:pl-4 md:border-r md:px-6 md:py-5 first:md:pl-0 last:md:border-r-0">
                  <span className="block text-xs uppercase tracking-[0.22em] text-white/42">{label}</span>
                  <strong className="mt-2 block text-lg font-semibold text-white">{value}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="slogan-section relative flex min-h-screen items-center justify-center overflow-hidden bg-navy px-6 py-24 text-white">
        <Image
          src="/slogan-sunset.png"
          alt={copy.slogan.imageAlt}
          fill
          priority
          className="slogan-parallax object-cover object-[52%_center] md:object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy/68" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,164,90,0.16),transparent_34%),linear-gradient(180deg,rgba(7,20,38,0.12),rgba(7,20,38,0.78))]" />

        <div className="slogan-reveal relative z-10 mx-auto flex max-w-6xl flex-col items-center text-center">
          <h2 className="font-serif text-[2.65rem] font-semibold leading-[1.02] text-balance min-[430px]:text-5xl sm:text-6xl lg:text-7xl">
            {copy.slogan.text1} <span className="text-[#C8A45A]">{copy.slogan.gold1}</span> {copy.slogan.text2}{" "}
            <span className="text-[#C8A45A]">{copy.slogan.gold2}</span>.
          </h2>
          <p className="mt-8 max-w-3xl text-base leading-8 text-white/78 sm:mt-10 sm:text-xl sm:leading-9">{copy.slogan.description}</p>
        </div>

        <div className="scroll-indicator absolute bottom-9 left-1/2 z-10 -translate-x-1/2 text-white/70">
          <ChevronDown size={30} strokeWidth={1.5} />
        </div>
      </section>

      <section id="projekt" className="bg-navy px-6 py-28 text-white sm:py-32 lg:px-10">
        <div id="main-content" className="sr-only" aria-label={copy.accessibility.mainContentLabel} />
        <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <SectionHeading
            kicker={copy.project.kicker}
            title={copy.project.title}
            light
          />
          <div className="border-l border-gold/45 pl-6 text-lg leading-9 text-white/74 sm:pl-7 sm:text-xl">{copy.project.body}</div>
        </div>
      </section>

      <section id="iorana-moai" className="bg-[#071426] px-6 py-28 text-white sm:py-32 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <p className="section-kicker">{copy.iorana.kicker}</p>
              <h2 className="mt-5 font-serif text-[2.8rem] font-semibold leading-[0.98] text-balance sm:text-6xl lg:text-7xl">
                {copy.brand.ioranaMoai}
              </h2>
            </div>
            <p className="max-w-3xl border-l border-gold/55 pl-6 text-lg leading-9 text-white/74 sm:pl-7 sm:text-xl">{copy.iorana.intro}</p>
          </div>

          <div className="mt-14 overflow-hidden border border-white/12 bg-navy shadow-architectural sm:mt-16">
            <div className="relative min-h-[620px] lg:min-h-[760px]">
              <Image
                src="/iorana-moai-rano-raraku.png"
                alt={copy.iorana.imageAlt}
                fill
                className="object-cover object-[63%_center] sm:object-center"
                sizes="(min-width: 1024px) 1400px, 100vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,20,38,0.88),rgba(7,20,38,0.42)_42%,rgba(7,20,38,0.08)),linear-gradient(0deg,rgba(7,20,38,0.94),transparent_34%)]" />
              <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-8 lg:p-12">
                <div className="max-w-2xl">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold">{copy.iorana.imageKicker}</p>
                  <h3 className="mt-4 font-serif text-3xl font-semibold leading-tight text-balance sm:text-5xl">{copy.iorana.imageTitle}</h3>
                  <p className="mt-6 text-base leading-8 text-white/72 sm:text-lg sm:leading-9">{copy.iorana.imageBody}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {ioranaThemes.map((theme) => (
              <article
                key={theme.title}
                className="border border-white/12 bg-white/[0.035] p-6 transition duration-300 hover:-translate-y-1 hover:border-gold/45 hover:bg-white/[0.055] sm:p-8"
              >
                <div className="h-px w-12 bg-gold" />
                <h3 className="mt-6 font-serif text-2xl font-semibold text-white">{theme.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/66 sm:text-base">{theme.detail}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 grid gap-6 border-t border-white/12 pt-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
            <p className="section-kicker">{copy.iorana.dialogueKicker}</p>
            <p className="text-lg leading-9 text-white/72 sm:text-xl">{copy.iorana.dialogueBody}</p>
          </div>
        </div>
      </section>

      <section id="uklad-posagow" className="bg-ivory px-6 py-28 sm:py-32 lg:px-10">
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
          <div className="relative -mx-6 min-h-[430px] overflow-hidden bg-navy sm:mx-0 sm:min-h-[480px]">
            <Image
              src="/ahu-tongariki-hero.png"
              alt={copy.statues.imageAlt}
              fill
              className="object-cover object-[57%_center] sm:object-center"
              sizes="(min-width: 1024px) 58vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/82 via-navy/16 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 border-t border-white/18 p-6 text-white md:p-10">
              <span className="text-xs uppercase tracking-[0.22em] text-gold">{copy.statues.imageKicker}</span>
              <p className="mt-3 max-w-2xl text-xl font-semibold leading-snug sm:text-2xl">{copy.statues.imageCaption}</p>
            </div>
          </div>
          <div className="bg-white p-6 shadow-architectural sm:p-7 md:p-10">
            <SectionHeading
              kicker={copy.statues.kicker}
              title={copy.statues.title}
              intro={copy.statues.intro}
            />
            <div className="mt-9 grid gap-4 border-0 sm:mt-10 sm:divide-y sm:divide-black/10 sm:border-y sm:border-black/10">
              {statueFacts.map(([value, label]) => (
                <div key={label} className="border border-black/10 bg-ivory/70 p-5 sm:grid sm:grid-cols-[minmax(92px,0.45fr)_1fr] sm:gap-5 sm:border-0 sm:bg-transparent sm:p-0 sm:py-5">
                  <strong className="min-w-0 break-words font-serif text-3xl font-semibold leading-tight text-navy sm:block">{value}</strong>
                  <span className="min-w-0 self-center text-base leading-7 text-ink/72">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="lokalizacja" className="bg-white px-6 py-28 sm:py-32 lg:px-10">
        <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <EuropeMap />
          <div className="lg:pl-8">
            <SectionHeading
              kicker={copy.location.kicker}
              title={copy.location.title}
              intro={copy.location.intro}
            />
            <div className="mt-12 border-l border-gold pl-7">
              <p className="text-xl font-semibold leading-snug text-navy sm:text-2xl">{copy.location.quote}</p>
            </div>
            <div className="mt-8 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-navy">
              <MapPin className="text-gold" size={18} />
              {copy.location.mapTitle}
            </div>
            <a
              href={LOCATION_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={copy.location.mapsAria}
              title={copy.accessibility.mapsTitle}
              className="mt-12 flex flex-col items-start justify-between gap-5 rounded border border-gold/65 bg-white px-6 py-5 text-navy shadow-[0_18px_45px_rgba(7,20,38,0.08)] transition duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-[0_24px_65px_rgba(7,20,38,0.13)] sm:flex-row sm:items-center sm:gap-6"
            >
              <span className="shrink-0 drop-shadow-[0_0_10px_rgba(184,150,72,0.3)]">
                <AhuTongarikiMiniature className="h-14 w-28 object-contain" />
              </span>
              <span className="min-w-0 flex-1 whitespace-pre-line text-lg font-bold leading-snug">{copy.location.openMap}</span>
              <ArrowRight className="shrink-0 text-gold" size={26} />
            </a>
          </div>
        </div>
      </section>

      <section className="bg-navy px-6 py-28 text-white sm:py-32 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr]">
            <SectionHeading
              kicker={copy.functions.kicker}
              title={copy.functions.title}
              intro={copy.functions.intro}
              light
            />
            <div className="divide-y divide-white/12 border-y border-white/12">
              {functions.map(({ title, detail, icon: Icon }) => (
                <article key={title} className="grid gap-4 py-7 sm:grid-cols-[44px_1fr]">
                  <Icon className="text-gold" size={28} />
                  <div>
                    <h3 className="text-xl font-semibold text-white sm:text-2xl">{title}</h3>
                    <p className="mt-2 max-w-2xl text-base leading-7 text-white/62">{detail}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="night-section relative overflow-hidden bg-[#06101f] px-6 py-28 text-white sm:py-32 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(200,164,90,0.12),transparent_24%),linear-gradient(180deg,rgba(7,20,38,0.96),rgba(6,16,31,0.98))]" />
        <div className="night-stars absolute inset-0 opacity-55" />
        <div className="relative mx-auto max-w-[1400px]">
          <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
            <div>
              <p className="section-kicker">{copy.night.kicker}</p>
              <h2 className="mt-5 font-serif text-[2.75rem] font-semibold leading-[0.98] text-balance sm:text-6xl lg:text-7xl">{copy.night.title}</h2>
              <p className="mt-5 font-serif text-2xl italic leading-tight text-gold sm:text-3xl">{copy.night.subtitle}</p>
            </div>
            <div className="whitespace-pre-line border-l border-gold/55 pl-6 text-lg leading-9 text-white/72 sm:pl-7 sm:text-xl">{copy.night.body}</div>
          </div>

          <div className="night-hero mt-14 overflow-hidden border border-white/12 bg-navy shadow-architectural sm:mt-16">
            <div className="relative min-h-[560px] sm:min-h-[680px] lg:min-h-[760px]">
              <Image
                src="/ahu-tongariki-night.png"
                alt={copy.night.imageAlt}
                fill
                className="night-hero-image object-cover object-[52%_center] sm:object-center"
                sizes="(min-width: 1024px) 1400px, 100vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,16,31,0.88),rgba(6,16,31,0.38)_42%,rgba(6,16,31,0.1)_76%),linear-gradient(180deg,rgba(6,16,31,0.52),rgba(6,16,31,0.08)_46%,rgba(6,16,31,0.42))]" />
              <div className="night-mist absolute inset-x-0 bottom-0 h-48 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.17),transparent_62%)] opacity-40 blur-xl" />
              <div className="night-light absolute inset-x-[12%] bottom-[18%] h-24 bg-[radial-gradient(ellipse_at_center,rgba(200,164,90,0.36),transparent_66%)] opacity-0 blur-2xl" />
              <div className="absolute left-0 right-0 top-0 z-10 p-6 pt-8 sm:p-8 sm:pt-10 lg:p-12">
                <div className="max-w-2xl">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold">{copy.night.panelKicker}</p>
                  <h3 className="mt-4 font-serif text-3xl font-semibold leading-tight text-balance sm:text-5xl">{copy.night.panelTitle}</h3>
                  <p className="mt-6 text-base leading-8 text-white/72 sm:text-lg sm:leading-9">{copy.night.panelBody}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {nightExperiences.map((experience, index) => (
              <article
                key={experience.title}
                className="night-card border border-white/12 bg-white/[0.035] p-6 transition duration-300 hover:-translate-y-1 hover:border-gold/45 hover:bg-white/[0.055] sm:p-8"
                style={{ "--night-card-delay": `${index * 90}ms` } as CSSProperties}
              >
                <span className="font-serif text-3xl text-gold">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 font-serif text-2xl font-semibold leading-tight text-white">{experience.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/66 sm:text-base">{experience.detail}</p>
              </article>
            ))}
          </div>

          <div className="mt-12 border-t border-white/12 pt-10 sm:mt-14 sm:pt-12">
            <p className="max-w-5xl font-serif text-3xl font-semibold leading-tight text-balance text-white sm:text-5xl">
              {copy.night.finalWhite} <span className="text-gold">{copy.night.finalGold}</span>
            </p>
          </div>
        </div>
      </section>

      <section className="bg-ivory px-6 py-28 sm:py-32 lg:px-10">
        <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <SectionHeading
            kicker={copy.regional.kicker}
            title={copy.regional.title}
            intro={copy.regional.intro}
          />
          <div className="grid gap-px bg-black/10">
            {regionalValue.map((item, index) => (
              <div key={item} className="grid grid-cols-[72px_1fr] bg-white">
                <span className="border-r border-black/10 p-5 font-serif text-3xl text-gold">{String(index + 1).padStart(2, "0")}</span>
                <p className="p-5 text-lg font-semibold leading-8 text-navy sm:text-xl">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-navy px-6 py-28 text-white sm:py-32 lg:px-10">
        <div className="absolute inset-0 opacity-24">
          <Image
            src="/ahu-tongariki-hero.png"
            alt={copy.partnership.imageAlt}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-navy/88" />
        <div className="relative mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <div className="border-l border-gold pl-7">
            <Handshake className="text-gold" size={34} />
            <h2 className="mt-8 max-w-3xl font-serif text-4xl font-semibold leading-tight text-balance sm:text-6xl">
              {copy.partnership.title}
            </h2>
          </div>
          <p className="text-lg leading-9 text-white/72 sm:text-xl">{copy.partnership.body}</p>
        </div>
      </section>

      <section className="bg-white px-6 py-28 sm:py-32 lg:px-10">
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <SectionHeading
            kicker={copy.technical.kicker}
            title={copy.technical.title}
            intro={copy.technical.intro}
          />
          <div className="grid gap-4 border-0 sm:block sm:border sm:border-black/10">
            {technicalData.map(([label, value]) => (
              <div key={label} className="grid gap-3 border border-black/10 bg-ivory/70 px-5 py-5 sm:grid-cols-[1fr_auto] sm:gap-5 sm:border-0 sm:border-b sm:bg-transparent sm:px-8 sm:py-6 sm:last:border-b-0">
                <span className="text-sm uppercase tracking-[0.18em] text-stone">{label}</span>
                <span className="font-serif text-3xl font-semibold text-navy sm:text-right sm:text-2xl">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="kontakt" className="bg-ivory px-6 py-28 sm:py-32 lg:px-10">
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <SectionHeading
              kicker={copy.contact.kicker}
              title={copy.contact.title}
              intro={copy.contact.intro}
            />
            <div className="mt-10 flex items-center gap-3 border-t border-black/10 pt-6 text-navy">
              <BriefcaseBusiness className="text-gold" />
              <span className="font-semibold">{copy.footer.domain}</span>
            </div>
          </div>
          <form
            onSubmit={handleContactSubmit}
            noValidate
            aria-label={copy.accessibility.contactFormLabel}
            className="bg-navy p-6 text-white shadow-architectural sm:p-9"
          >
            <input
              type="text"
              name="website"
              value={contactForm.website}
              onChange={(event) => updateContactField("website", event.target.value)}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold text-white/72">{copy.contact.fullName}</span>
                <input
                  required
                  name="fullName"
                  value={contactForm.fullName}
                  onChange={(event) => updateContactField("fullName", event.target.value)}
                  placeholder={copy.contact.placeholders.fullName}
                  aria-label={copy.contact.fullName}
                  aria-required="true"
                  aria-invalid={contactStatus === "error" && !contactForm.fullName.trim()}
                  title={copy.accessibility.requiredFieldHint}
                  className="mt-2 w-full border border-white/14 bg-white/[0.06] px-4 py-3 text-white outline-none transition hover:border-white/24 focus:border-gold"
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-white/72">{copy.contact.organization}</span>
                <input
                  name="organization"
                  value={contactForm.organization}
                  onChange={(event) => updateContactField("organization", event.target.value)}
                  placeholder={copy.contact.placeholders.organization}
                  aria-label={copy.contact.organization}
                  title={copy.accessibility.optionalFieldHint}
                  className="mt-2 w-full border border-white/14 bg-white/[0.06] px-4 py-3 text-white outline-none transition hover:border-white/24 focus:border-gold"
                />
              </label>
            </div>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold text-white/72">{copy.contact.email}</span>
                <input
                  required
                  type="email"
                  name="email"
                  value={contactForm.email}
                  onChange={(event) => updateContactField("email", event.target.value)}
                  placeholder={copy.contact.placeholders.email}
                  aria-label={copy.contact.email}
                  aria-required="true"
                  aria-invalid={contactStatus === "error" && (!contactForm.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.email.trim()))}
                  title={copy.accessibility.requiredFieldHint}
                  className="mt-2 w-full border border-white/14 bg-white/[0.06] px-4 py-3 text-white outline-none transition hover:border-white/24 focus:border-gold"
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-white/72">{copy.contact.phone}</span>
                <input
                  type="tel"
                  name="phone"
                  value={contactForm.phone}
                  onChange={(event) => updateContactField("phone", event.target.value)}
                  placeholder={copy.contact.placeholders.phone}
                  aria-label={copy.contact.phone}
                  title={copy.accessibility.optionalFieldHint}
                  className="mt-2 w-full border border-white/14 bg-white/[0.06] px-4 py-3 text-white outline-none transition hover:border-white/24 focus:border-gold"
                />
              </label>
            </div>
            <label className="mt-5 block">
              <span className="text-sm font-semibold text-white/72">{copy.contact.subject}</span>
              <input
                required
                name="subject"
                value={contactForm.subject}
                onChange={(event) => updateContactField("subject", event.target.value)}
                placeholder={copy.contact.placeholders.subject}
                aria-label={copy.contact.subject}
                aria-required="true"
                aria-invalid={contactStatus === "error" && !contactForm.subject.trim()}
                title={copy.accessibility.requiredFieldHint}
                className="mt-2 w-full border border-white/14 bg-white/[0.06] px-4 py-3 text-white outline-none transition hover:border-white/24 focus:border-gold"
              />
            </label>
            <label className="mt-5 block">
              <span className="text-sm font-semibold text-white/72">{copy.contact.message}</span>
              <textarea
                required
                rows={6}
                name="message"
                value={contactForm.message}
                onChange={(event) => updateContactField("message", event.target.value)}
                placeholder={copy.contact.placeholders.message}
                aria-label={copy.contact.message}
                aria-required="true"
                aria-invalid={contactStatus === "error" && !contactForm.message.trim()}
                title={copy.accessibility.requiredFieldHint}
                className="mt-2 w-full resize-none border border-white/14 bg-white/[0.06] px-4 py-3 text-white outline-none transition hover:border-white/24 focus:border-gold"
              />
            </label>
            <label className="mt-6 flex gap-4 border border-white/12 bg-white/[0.035] p-4 text-sm leading-6 text-white/72">
              <input
                required
                type="checkbox"
                checked={contactForm.consent}
                onChange={(event) => updateContactField("consent", event.target.checked)}
                aria-label={copy.contact.consent}
                aria-required="true"
                aria-invalid={contactStatus === "error" && !contactForm.consent}
                className="mt-1 h-4 w-4 shrink-0 accent-gold"
              />
              <span>{copy.contact.consent}</span>
            </label>
            {contactMessage ? (
              <div
                className={`mt-6 whitespace-pre-line border px-5 py-4 text-sm leading-6 ${contactStatus === "success" ? "border-gold/55 bg-gold/10 text-white" : "border-red-300/35 bg-red-500/10 text-red-100"}`}
                role={contactStatus === "success" ? "status" : "alert"}
                aria-label={contactStatus === "success" ? copy.accessibility.contactStatusSuccess : copy.accessibility.contactStatusError}
              >
                {contactMessage}
              </div>
            ) : null}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                disabled={isContactSubmitting}
                aria-busy={isContactSubmitting}
                title={copy.accessibility.submitInquiryTitle}
                className="stable-action inline-flex flex-wrap items-center justify-center gap-3 bg-gold px-6 py-4 text-center text-sm font-bold uppercase tracking-[0.13em] text-navy transition hover:bg-sand disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isContactSubmitting ? (
                  <span className="h-4 w-4 animate-spin border-2 border-navy/30 border-t-navy" aria-hidden="true" />
                ) : null}
                {isContactSubmitting ? copy.contact.sending : copy.contact.submit}
                <ArrowRight size={17} />
              </button>
            </div>
          </form>
        </div>
      </section>

      <footer className="border-t border-black/10 bg-white px-6 py-8 lg:px-10">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-3 text-sm text-ink/62 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-semibold text-navy">{copy.footer.brand}</span>
          <span>{copy.footer.domain}</span>
        </div>
      </footer>
    </main>
  );
}
