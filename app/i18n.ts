import pl from "../locales/pl/common.json";
import en from "../locales/en/common.json";
import fr from "../locales/fr/common.json";
import es from "../locales/es/common.json";
import de from "../locales/de/common.json";
import cs from "../locales/cs/common.json";

export const dictionaries = { pl, en, fr, es, de, cs };

export type LanguageCode = keyof typeof dictionaries;
export type Dictionary = typeof pl;
export type TranslationValue =
  | string
  | number
  | boolean
  | null
  | TranslationValue[]
  | { [key: string]: TranslationValue };

export const defaultLanguage: LanguageCode = "pl";

export const languageOptions: Array<{ code: LanguageCode }> = [
  { code: "pl" },
  { code: "en" },
  { code: "fr" },
  { code: "es" },
  { code: "de" },
  { code: "cs" }
];

export function isLanguageCode(languageCode: string): languageCode is LanguageCode {
  return languageCode in dictionaries;
}

export function translate(dictionary: Dictionary, path: string): TranslationValue {
  return path.split(".").reduce<TranslationValue>((current, segment) => {
    if (current && typeof current === "object" && !Array.isArray(current) && segment in current) {
      return current[segment];
    }

    return path;
  }, dictionary as TranslationValue);
}
