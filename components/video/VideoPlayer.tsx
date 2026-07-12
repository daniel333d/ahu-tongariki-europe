"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";

export type VideoPlayerProps = {
  /** Path to the MP4 file, e.g. "/assets/video/ahu-tongariki-europe-film.mp4". */
  videoSrc: string;
  /** Poster image shown before playback starts / after it ends. Falls back to an inline poster if missing. */
  posterSrc?: string;
  /** Optional WebVTT captions track. */
  captionsSrc?: string;
  captionsLabel?: string;
  /** Accessible label for the video element and the play button. */
  playAriaLabel: string;
  /** Large centered heading shown on the poster. */
  posterHeading: string;
  /** Label shown next to the play icon, e.g. "PLAY". */
  playLabel: string;
  /** "landscape" (16:9, default) for widescreen footage, "portrait" (9:16) for phone-shot vertical footage. */
  orientation?: "landscape" | "portrait";
};

export function VideoPlayer({
  videoSrc,
  posterSrc,
  captionsSrc,
  captionsLabel,
  playAriaLabel,
  posterHeading,
  playLabel,
  orientation = "landscape"
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [posterImageFailed, setPosterImageFailed] = useState(!posterSrc);

  function handlePlay() {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => setIsPlaying(false));
    setIsPlaying(true);
  }

  return (
    <div
      className={`relative mx-auto overflow-hidden rounded-lg border border-gold/60 bg-navy shadow-architectural ${orientation === "portrait" ? "max-w-[420px]" : "max-w-[960px]"}`}
    >
      <div className={`relative w-full ${orientation === "portrait" ? "aspect-[9/16]" : "aspect-video"}`}>
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          poster={posterSrc}
          controls={isPlaying}
          controlsList="nodownload"
          playsInline
          preload="metadata"
          aria-label={playAriaLabel}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          onError={() => setIsPlaying(false)}
        >
          <source src={videoSrc} type="video/mp4" />
          {captionsSrc ? (
            <track kind="captions" src={captionsSrc} srcLang="pl" label={captionsLabel ?? "Polski"} default />
          ) : null}
        </video>

        {!isPlaying ? (
          posterSrc && !posterImageFailed ? (
            <button
              type="button"
              onClick={handlePlay}
              aria-label={playAriaLabel}
              className="group absolute inset-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={posterSrc}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                onError={() => setPosterImageFailed(true)}
              />
              <span className="absolute inset-0 bg-navy/25 transition duration-300 group-hover:bg-navy/10" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold bg-navy/70 shadow-premium backdrop-blur-md transition duration-300 group-hover:scale-110 group-hover:border-sand sm:h-24 sm:w-24">
                  <Play className="ml-1 h-9 w-9 text-gold sm:h-10 sm:w-10" fill="currentColor" aria-hidden="true" />
                </span>
              </span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handlePlay}
              aria-label={playAriaLabel}
              className="group absolute inset-0 flex flex-col items-center justify-center gap-7 overflow-hidden bg-[linear-gradient(160deg,#0c1f38_0%,#071426_55%,#04101f_100%)] px-8 text-center"
            >
              <span
                className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_20%_15%,rgba(184,150,72,0.16),transparent_40%),radial-gradient(circle_at_82%_82%,rgba(184,150,72,0.14),transparent_42%),radial-gradient(circle_at_50%_50%,rgba(184,150,72,0.05),transparent_65%)]"
                aria-hidden="true"
              />
              <span
                className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:repeating-linear-gradient(115deg,rgba(216,199,162,0.5)_0px,rgba(216,199,162,0.5)_1px,transparent_1px,transparent_5px)]"
                aria-hidden="true"
              />

              <span className="relative text-balance font-serif text-2xl font-semibold leading-snug text-gold sm:text-4xl">
                {posterHeading}
              </span>

              <span className="relative flex flex-col items-center gap-3">
                <span className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold bg-navy/70 shadow-premium backdrop-blur-md transition duration-300 group-hover:scale-110 group-hover:border-sand sm:h-24 sm:w-24">
                  <Play className="ml-1 h-9 w-9 text-gold sm:h-10 sm:w-10" fill="currentColor" aria-hidden="true" />
                </span>
                <span className="text-sm font-bold uppercase tracking-[0.32em] text-gold">{playLabel}</span>
              </span>
            </button>
          )
        ) : null}
      </div>
    </div>
  );
}

export default VideoPlayer;
