"use client";

import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from "react";
import {
  defaultLanguage,
  dictionaries,
  type Dictionary,
  isLanguageCode,
  type LanguageCode,
  translate,
  type TranslationValue
} from "./i18n";

type I18nContextValue = {
  copy: Dictionary;
  language: LanguageCode;
  hasSelectedLanguage: boolean;
  selectLanguage: (languageCode: string) => void;
  t: (path: string) => TranslationValue;
  text: (path: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<LanguageCode>(defaultLanguage);
  const [hasSelectedLanguage, setHasSelectedLanguage] = useState(false);
  const [cmsCopy, setCmsCopy] = useState<Dictionary | null>(null);
  const copy = cmsCopy ?? dictionaries[language];

  useEffect(() => {
    let isCurrent = true;

    async function loadCmsCopy() {
      setCmsCopy(null);

      if (!hasSelectedLanguage) {
        return;
      }

      try {
        const response = await fetch(`/api/cms-content?language=${language}`, {
          headers: {
            Accept: "application/json"
          }
        });

        if (!response.ok) {
          return;
        }

        const payload = (await response.json()) as { dictionary?: Dictionary };

        if (isCurrent && payload.dictionary) {
          setCmsCopy(payload.dictionary);
        }
      } catch {
        if (isCurrent) {
          setCmsCopy(null);
        }
      }
    }

    void loadCmsCopy();

    return () => {
      isCurrent = false;
    };
  }, [hasSelectedLanguage, language]);

  const value = useMemo<I18nContextValue>(() => {
    function selectLanguage(languageCode: string) {
      if (!isLanguageCode(languageCode)) {
        return;
      }

      setLanguage(languageCode);
      setHasSelectedLanguage(true);
    }

    function t(path: string) {
      return translate(copy, path);
    }

    function text(path: string) {
      const valueAtPath = t(path);
      return typeof valueAtPath === "string" ? valueAtPath : path;
    }

    return {
      copy,
      language,
      hasSelectedLanguage,
      selectLanguage,
      t,
      text
    };
  }, [copy, hasSelectedLanguage, language]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error(dictionaries[defaultLanguage].system.i18nProviderError);
  }

  return context;
}

export function Translator({ path }: { path: string }) {
  const { text } = useI18n();
  return <>{text(path)}</>;
}
