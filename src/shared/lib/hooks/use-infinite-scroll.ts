import { useEffect, useRef } from "react";

interface UseInfiniteScrollParams {
  disabled: boolean;
  onLoadMore: () => void;
  rootMargin?: string;
}

export const useInfiniteScroll = ({ disabled, onLoadMore, rootMargin = "200px" }: UseInfiniteScrollParams) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (disabled) {
      return;
    }

    const target = targetRef.current;
    if (!target) {
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      const onScroll = () => {
        const nearBottom =
          window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 200;

        if (nearBottom) {
          onLoadMore();
        }
      };

      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();

      return () => {
        window.removeEventListener("scroll", onScroll);
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      { rootMargin },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [disabled, onLoadMore, rootMargin]);

  return targetRef;
};
