"use client";

import { PrzebudzenieMoaiSection } from "../../../components/sections/PrzebudzenieMoaiSection";
import { languageOptions } from "../../i18n";
import { I18nProvider, useI18n } from "../../i18n-provider";

function PreviewLanguageSwitcher() {
  const { copy, language, selectLanguage } = useI18n();

  return (
    <div className="fixed right-4 top-4 z-[95] flex max-w-[calc(100vw-2rem)] flex-wrap justify-end gap-2">
      {languageOptions.map((languageOption) => (
        <button
          key={languageOption.code}
          type="button"
          onClick={() => selectLanguage(languageOption.code)}
          className={`min-h-10 border px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] transition focus:outline-none focus:ring-2 focus:ring-gold/70 ${
            language === languageOption.code
              ? "border-gold bg-gold text-navy"
              : "border-white/18 bg-navy/78 text-white/72 backdrop-blur hover:border-gold/65 hover:text-gold"
          }`}
          aria-label={copy.accessibility.languageOptionLabel.replace(
            "{language}",
            copy.language.names[languageOption.code]
          )}
        >
          {languageOption.code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export function PrzebudzenieMoaiPreviewClient() {
  return (
    <I18nProvider>
      <main className="min-h-screen bg-[#02080d]">
        <PreviewLanguageSwitcher />
        <PrzebudzenieMoaiSection />
      </main>
    </I18nProvider>
  );
}
