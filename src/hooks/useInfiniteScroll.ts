import { useEffect, useCallback } from "react";

interface UseInfiniteScrollOptions {
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
  threshold?: number;
}

export const useInfiniteScroll = ({
  onLoadMore,
  hasMore,
  isLoading,
  threshold = 100,
}: UseInfiniteScrollOptions) => {
  const handleScroll = useCallback(() => {
    if (isLoading || !hasMore) {
      return;
    }

    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - threshold) {
      onLoadMore();
    }
  }, [onLoadMore, hasMore, isLoading, threshold]);

  useEffect(() => {
    if (!isLoading) {
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll, isLoading]);
};
