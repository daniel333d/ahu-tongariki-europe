"use client";

import { useState, type FormEvent } from "react";
import { Eye, EyeOff, Globe2 } from "lucide-react";
import { assets } from "../../lib/asset-paths";
import { dictionaries, languageOptions, type LanguageCode } from "../i18n";

type LoginResponse = {
  ok: boolean;
  next?: string;
};

export default function AccessForm({ rawNextPath }: { rawNextPath?: string }) {
  const [language, setLanguage] = useState<LanguageCode>("pl");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const copy = dictionaries[language].access;

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (isSubmitting || !password) {
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, next: rawNextPath ?? null })
      });

      if (response.ok) {
        const data = (await response.json()) as LoginResponse;
        window.location.assign(data.next || "/");
        return;
      }

      setError(response.status === 401 ? copy.invalidPassword : copy.genericError);
    } catch {
      setError(copy.genericError);
    } finally {
      setIsSubmitting(false);
      setPassword("");
    }
  }

  return (
    <main className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-navy px-6 py-12 text-white sm:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(200,164,90,0.14),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.07),transparent_42%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:linear-gradient(120deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(30deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:72px_72px]" />
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative fixed-size silhouette, next/image's fill mode doesn't compose with partial-height positioning */}
      <img
        src={assets.moai.platform}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[38vh] w-full object-cover object-bottom opacity-[0.14] grayscale"
      />

      <div className="relative z-10 mb-8 flex w-full justify-end gap-2">
        {languageOptions.map((option) => (
          <button
            key={option.code}
            type="button"
            onClick={() => setLanguage(option.code)}
            aria-current={option.code === language ? "true" : undefined}
            aria-label={copy.languageLabel}
            className={`stable-action min-h-9 border px-2.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] transition ${
              option.code === language
                ? "border-gold bg-gold/12 text-gold"
                : "border-white/20 bg-navy/60 text-white/62 hover:border-gold hover:text-gold"
            }`}
          >
            {option.code.toUpperCase()}
          </button>
        ))}
      </div>

      <section className="relative z-10 mx-auto flex w-full max-w-lg flex-col items-center text-center">
        <p className="text-xs font-bold uppercase tracking-[0.32em] text-gold">{copy.kicker}</p>
        <h1 className="mt-6 text-balance font-serif text-3xl font-semibold leading-tight sm:text-4xl">
          {copy.title}
        </h1>
        <div className="mx-auto mt-8 h-px w-16 bg-gold/70" />
        <p className="text-white/66 mx-auto mt-8 max-w-sm text-base leading-7">{copy.description}</p>

        <form onSubmit={handleSubmit} noValidate className="mt-10 w-full max-w-sm">
          <label className="block text-left">
            <span className="text-white/72 text-sm font-semibold">{copy.passwordLabel}</span>
            <span className="relative mt-3 block">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder={copy.passwordPlaceholder}
                aria-label={copy.passwordLabel}
                aria-required="true"
                aria-invalid={Boolean(error)}
                autoComplete="current-password"
                autoFocus
                disabled={isSubmitting}
                className="border-white/16 w-full border bg-white/[0.06] px-4 py-4 pr-12 text-white outline-none transition focus:border-gold disabled:opacity-60"
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? copy.hidePassword : copy.showPassword}
                title={showPassword ? copy.hidePassword : copy.showPassword}
                className="text-white/52 absolute right-0 top-0 flex h-full w-12 items-center justify-center transition hover:text-gold focus:text-gold focus:outline-none"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </span>
          </label>

          {error ? (
            <p className="mt-4 text-left text-sm text-gold" role="alert">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting || !password}
            className="stable-action disabled:bg-white/18 disabled:text-white/38 mt-6 w-full bg-gold px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-navy transition hover:bg-sand disabled:cursor-not-allowed"
          >
            {isSubmitting ? copy.submitting : copy.submit}
          </button>
        </form>

        <p className="text-white/40 mx-auto mt-12 max-w-sm text-xs leading-6">
          <Globe2 size={12} className="mr-1.5 inline-block align-[-2px]" aria-hidden="true" />
          {copy.footerNote}
        </p>
      </section>
    </main>
  );
}
