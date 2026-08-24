"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { type TouchEvent, useCallback, useEffect, useRef, useState } from "react";
import { stageOneSlides } from "./stage-one-presentation-data";

type StageOnePresentationViewerProps = {
  isOpen: boolean;
  onClose: () => void;
};

const focusableSelector =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function StageOnePresentationViewer({ isOpen, onClose }: StageOnePresentationViewerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const activeSlide = stageOneSlides[activeIndex];
  const progress = ((activeIndex + 1) / stageOneSlides.length) * 100;

  useEffect(() => {
    setMounted(true);
  }, []);

  const goToPrevious = useCallback(() => {
    setActiveIndex((current) => Math.max(0, current - 1));
  }, []);

  const goToNext = useCallback(() => {
    setActiveIndex((current) => Math.min(stageOneSlides.length - 1, current + 1));
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const preloadIndexes = [activeIndex - 1, activeIndex + 1].filter(
      (index) => index >= 0 && index < stageOneSlides.length
    );

    preloadIndexes.forEach((index) => {
      const image = new window.Image();
      image.src = stageOneSlides[index].src;
    });
  }, [activeIndex, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key === "ArrowLeft") {
        goToPrevious();
        return;
      }

      if (event.key === "ArrowRight") {
        goToNext();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) {
        return;
      }

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector)
      ).filter((element) => !element.hasAttribute("disabled"));

      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = focusable[0];
      const lastElement = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [goToNext, goToPrevious, isOpen, onClose]);

  if (!isOpen || !isMounted) {
    return null;
  }

  const requestFullscreen = async () => {
    if (!dialogRef.current || document.fullscreenElement) {
      return;
    }

    await dialogRef.current.requestFullscreen();
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) {
      return;
    }

    const delta = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(delta) < 48) {
      return;
    }

    if (delta > 0) {
      goToPrevious();
    } else {
      goToNext();
    }
  };

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Prezentacja I Fazy Inwestycji RapaNuiPark"
      tabIndex={-1}
      className="fixed inset-0 z-[90] flex min-h-screen items-center justify-center bg-[#02080d]/96 px-3 py-4 text-white outline-none backdrop-blur-md sm:px-6"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(184,150,72,0.16),transparent_34%),linear-gradient(180deg,rgba(7,17,26,0.9),rgba(2,8,13,0.98))]" />
      <div className="relative z-10 flex h-full w-full max-w-[1500px] flex-col">
        <div className="mb-3 flex items-center justify-between gap-3 sm:mb-4">
          <div>
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.24em] text-gold">
              Etap I / I Faza Inwestycji
            </p>
            <p className="mt-1 text-sm font-semibold text-white/78">Poznaj wzorce odwzorowania</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={requestFullscreen}
              aria-label="Otwórz prezentację w pełnym ekranie"
              title="Pełny ekran"
              className="inline-flex h-11 w-11 items-center justify-center border border-white/18 bg-white/[0.04] text-white transition hover:border-gold hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <Maximize2 size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Zamknij prezentację"
              title="Zamknij"
              className="inline-flex h-11 w-11 items-center justify-center border border-white/18 bg-white/[0.04] text-white transition hover:border-gold hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="h-1 overflow-hidden bg-white/12" aria-hidden="true">
          <div className="h-full bg-gold transition-[width] duration-300" style={{ width: `${progress}%` }} />
        </div>

        <div
          className="relative mt-3 flex min-h-0 flex-1 items-center justify-center overflow-hidden border border-white/14 bg-black shadow-[0_30px_100px_rgba(0,0,0,0.45)] sm:mt-4"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <Image
            key={activeSlide.src}
            src={activeSlide.src}
            alt={activeSlide.alt}
            fill
            sizes="(min-width: 1280px) 1400px, 100vw"
            className="object-contain opacity-0 motion-safe:animate-[fadeIn_220ms_ease-out_forwards]"
          />

          <button
            type="button"
            onClick={goToPrevious}
            disabled={activeIndex === 0}
            aria-label="Poprzedni slajd"
            title="Poprzedni"
            className="absolute left-2 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/18 bg-black/46 text-white backdrop-blur transition hover:border-gold hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold disabled:cursor-not-allowed disabled:opacity-35 sm:left-4 sm:h-12 sm:w-12"
          >
            <ChevronLeft size={24} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={goToNext}
            disabled={activeIndex === stageOneSlides.length - 1}
            aria-label="Następny slajd"
            title="Następny"
            className="absolute right-2 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/18 bg-black/46 text-white backdrop-blur transition hover:border-gold hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold disabled:cursor-not-allowed disabled:opacity-35 sm:right-4 sm:h-12 sm:w-12"
          >
            <ChevronRight size={24} aria-hidden="true" />
          </button>
        </div>

        <div className="mt-3 flex items-center justify-between gap-4 text-xs font-bold uppercase tracking-[0.18em] text-white/62 sm:mt-4">
          <span>Etap I</span>
          <span aria-live="polite" aria-label={`Slajd ${activeIndex + 1} z ${stageOneSlides.length}`}>
            {activeIndex + 1} / {stageOneSlides.length}
          </span>
        </div>
      </div>
    </div>,
    document.body
  );
}
