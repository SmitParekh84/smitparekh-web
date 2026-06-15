"use client";

import { useRef, useEffect, useCallback } from "react";

const CLIPS = [
  "/videos/motion-intro.mp4",
  "/videos/motion-services.mp4",
] as const;

export default function MotionGraphicsLoop() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const indexRef = useRef(0);

  const playNext = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    indexRef.current = (indexRef.current + 1) % CLIPS.length;
    video.src = CLIPS[indexRef.current];
    video.play().catch(() => {});
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.addEventListener("ended", playNext);
    return () => video.removeEventListener("ended", playNext);
  }, [playNext]);

  return (
    <section className="w-full overflow-hidden bg-black">
      <video
        ref={videoRef}
        src={CLIPS[0]}
        autoPlay
        muted
        playsInline
        className="w-full max-h-[480px] object-cover"
        aria-hidden="true"
      />
    </section>
  );
}
