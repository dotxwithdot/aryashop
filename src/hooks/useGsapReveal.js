import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function useGsapReveal(options = {}) {
  const scope = useRef(null);

  useEffect(() => {
    if (!scope.current) return undefined;

    let observer;

    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray("[data-animate]");

      gsap.set(elements, {
        y: options.y ?? 24,
        opacity: 0,
      });

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const index = elements.indexOf(entry.target);
            gsap.to(entry.target, {
              y: 0,
              opacity: 1,
              duration: options.duration ?? 0.72,
              ease: "power3.out",
              delay: (options.delay ?? 0) + (index % 4) * (options.stagger ?? 0.05),
              overwrite: true,
            });
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
      );

      elements.forEach((element) => {
        observer.observe(element);
      });
    }, scope);

    return () => {
      observer?.disconnect();
      ctx.revert();
    };
  }, [options.delay, options.duration, options.stagger, options.y]);

  return scope;
}
