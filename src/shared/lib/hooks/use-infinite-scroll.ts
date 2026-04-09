import { useEffect, useRef } from "react";

interface UseInfiniteScrollParams {
  disabled: boolean;
  onLoadMore: () => void;
}

export const useInfiniteScroll = ({ disabled, onLoadMore }: UseInfiniteScrollParams) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (disabled) {
      return;
    }

    const target = targetRef.current;
    if (!target) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [disabled, onLoadMore]);

  return targetRef;
};
