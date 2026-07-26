"use client";

import { useEffect, useState } from "react";
import { useI18n } from "../../app/i18n-provider";

const LOCAL_COUNTER_KEY = "rapa-nui-park-local-visit-count";

type CounterResponse = {
  count: number | null;
  mode: "global" | "local";
};

export function VisitCounter() {
  const { copy, language } = useI18n();
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function registerVisit() {
      try {
        const response = await fetch("/api/visit-counter", {
          method: "POST",
          cache: "no-store"
        });

        if (!response.ok) {
          throw new Error("Counter request failed");
        }

        const data = (await response.json()) as CounterResponse;

        if (data.count !== null) {
          if (isMounted) {
            setCount(data.count);
          }
          return;
        }
      } catch {
        // Local preview fallback keeps the counter visible without requiring production storage.
      }

      const currentValue = Number(window.localStorage.getItem(LOCAL_COUNTER_KEY) || "0");
      const nextValue = Number.isFinite(currentValue) ? currentValue + 1 : 1;
      window.localStorage.setItem(LOCAL_COUNTER_KEY, String(nextValue));

      if (isMounted) {
        setCount(nextValue);
      }
    }

    void registerVisit();

    return () => {
      isMounted = false;
    };
  }, []);

  if (count === null) {
    return null;
  }

  return (
    <p className="text-[11px] uppercase tracking-[0.18em] text-ink/38" aria-live="polite">
      {copy.footer.visitCounterLabel}: {count.toLocaleString(language)}
    </p>
  );
}
