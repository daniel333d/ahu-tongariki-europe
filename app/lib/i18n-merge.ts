import type { Dictionary } from "../i18n";

export type DeepPartial<T> = {
  [Key in keyof T]?: T[Key] extends Array<infer Item>
    ? Array<Item>
    : T[Key] extends object
      ? DeepPartial<T[Key]>
      : T[Key];
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

export function mergeDictionary(base: Dictionary, override?: DeepPartial<Dictionary> | null): Dictionary {
  if (!override) {
    return base;
  }

  function mergeValue(baseValue: unknown, overrideValue: unknown): unknown {
    if (overrideValue === undefined || overrideValue === null || overrideValue === "") {
      return baseValue;
    }

    if (Array.isArray(overrideValue)) {
      return overrideValue.length > 0 ? overrideValue : baseValue;
    }

    if (isRecord(baseValue) && isRecord(overrideValue)) {
      return Object.keys({ ...baseValue, ...overrideValue }).reduce<Record<string, unknown>>((merged, key) => {
        merged[key] = mergeValue(baseValue[key], overrideValue[key]);
        return merged;
      }, {});
    }

    return overrideValue;
  }

  return mergeValue(base, override) as Dictionary;
}
