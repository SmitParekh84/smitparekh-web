"use client";

import { useRef, useEffect, useState } from "react";

const CLIPS = ["/videos/motion-intro.mp4", "/videos/motion-services.mp4"] as const;

export default function MotionGraphicsLoop() {
  const ref0 = useRef<HTMLVideoElement>(null);
  const ref1 = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState<0 | 1>(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const v0 = ref0.current;
    const v1 = ref1.current;
    if (!v0 || !v1) return;

    // Preload both clips simultaneously so switching is frame-accurate
    v0.src = CLIPS[0];
    v1.src = CLIPS[1];
    v0.load();
    v1.load();

    // Show + start clip 0 the moment it has enough data
    const onReady = () => {
      setStarted(true);
      v0.play().catch(() => {});
    };

    // clip 0 ends → immediately play clip 1 (already buffered)
    const onEnd0 = () => {
      setActive(1);
      v1.currentTime = 0;
      v1.play().catch(() => {});
    };

    // clip 1 ends → immediately play clip 0 (already buffered)
    const onEnd1 = () => {
      setActive(0);
      v0.currentTime = 0;
      v0.play().catch(() => {});
    };

    v0.addEventListener("canplay", onReady, { once: true });
    v0.addEventListener("ended", onEnd0);
    v1.addEventListener("ended", onEnd1);

    return () => {
      v0.removeEventListener("canplay", onReady);
      v0.removeEventListener("ended", onEnd0);
      v1.removeEventListener("ended", onEnd1);
      v0.pause();
      v1.pause();
    };
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden bg-black"
      style={{ height: "min(480px, 56.25vw)" }}
    >
      <video
        ref={ref0}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
        style={{ opacity: started && active === 0 ? 1 : 0 }}
        aria-hidden="true"
      />
      <video
        ref={ref1}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
        style={{ opacity: started && active === 1 ? 1 : 0 }}
        aria-hidden="true"
      />
    </section>
  );
}
