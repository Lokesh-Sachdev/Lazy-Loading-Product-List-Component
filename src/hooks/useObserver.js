import { useEffect, useRef } from "react";

export const useObserver = ({
  onIntersect,
  threshold = 0.1,
  rootMargin = "0px",
  enabled = true,
}) => {
  const targetRef = useRef(null);

  useEffect(() => {
    if (!enabled || !targetRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onIntersect();
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(targetRef.current);
    return () => observer.disconnect();
  }, [onIntersect, threshold, rootMargin, enabled]);

  return targetRef;
};
