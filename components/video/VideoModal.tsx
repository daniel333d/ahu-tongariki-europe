"use client";

import { createPortal } from "react-dom";
import { Maximize2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export type VideoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
  title: string;
  closeLabel: string;
  fullscreenLabel: string;
};

export function VideoModal({ isOpen, onClose, videoSrc, title, closeLabel, fullscreenLabel }: VideoModalProps) {
  const [isMounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    videoRef.current?.play().catch(() => {});

    return () => {
      document.body.style.overflow = previousOverflow;
      videoRef.current?.pause();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !isMounted) {
    return null;
  }

  const requestFullscreen = async () => {
    if (!dialogRef.current || document.fullscreenElement) {
      return;
    }

    await dialogRef.current.requestFullscreen();
  };

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      tabIndex={-1}
      className="fixed inset-0 z-[90] flex min-h-screen items-center justify-center bg-[#02080d]/96 px-3 py-4 outline-none backdrop-blur-md sm:px-6"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(184,150,72,0.16),transparent_34%),linear-gradient(180deg,rgba(7,17,26,0.9),rgba(2,8,13,0.98))]"
        aria-hidden="true"
      />
      <div className="relative z-10 flex w-full max-w-[1100px] flex-col">
        <div className="mb-3 flex items-center justify-end gap-2 sm:mb-4">
          <button
            type="button"
            onClick={requestFullscreen}
            aria-label={fullscreenLabel}
            title={fullscreenLabel}
            className="inline-flex h-11 w-11 items-center justify-center border border-white/18 bg-white/[0.04] text-white transition hover:border-gold hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <Maximize2 size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            title={closeLabel}
            className="inline-flex h-11 w-11 items-center justify-center border border-white/18 bg-white/[0.04] text-white transition hover:border-gold hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <div className="relative aspect-video w-full overflow-hidden border border-white/14 bg-black shadow-[0_30px_100px_rgba(0,0,0,0.45)]">
          <video
            ref={videoRef}
            className="h-full w-full object-contain"
            controls
            controlsList="nodownload"
            playsInline
            preload="metadata"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default VideoModal;
