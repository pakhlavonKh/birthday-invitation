import { useEffect, useRef } from "react";

export function useScrollReveal<T extends HTMLElement>(stagger = false, staggerDelay = 80) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (stagger) {
              const children = el.querySelectorAll(".stagger-child");
              children.forEach((child, i) => {
                setTimeout(() => child.classList.add("visible"), i * staggerDelay);
              });
            }
            el.classList.add("visible");
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [stagger, staggerDelay]);

  return ref;
}
