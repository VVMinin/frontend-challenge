import { useCallback, useEffect, useState } from "react";
import { Alert, Button, Empty, Typography } from "antd";
import { fetchNextCatsPage } from "../../../entities/cat/model/slice/cats-feed-slice";
import {
  selectCatsFeedError,
  selectCatsFeedHasMore,
  selectCatsFeedItems,
  selectCatsFeedStatus,
} from "../../../entities/cat/model/selectors/cats-feed-selectors";
import { CatCard } from "../../../entities/cat/ui/cat-card";
import { CatViewerModal } from "../../../entities/cat/ui/cat-viewer-modal";
import { FavoriteToggleButton } from "../../../features/favorite-cats/ui/favorite-toggle-button";
import { useAppDispatch, useAppSelector } from "../../../shared/lib/hooks/store-hooks";
import { useInfiniteScroll } from "../../../shared/lib/hooks/use-infinite-scroll";

export const CatsFeedGrid = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCatsFeedItems);
  const status = useAppSelector(selectCatsFeedStatus);
  const error = useAppSelector(selectCatsFeedError);
  const hasMore = useAppSelector(selectCatsFeedHasMore);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (items.length === 0) {
      void dispatch(fetchNextCatsPage());
    }
  }, [dispatch, items.length]);

  const loadMore = useCallback(() => {
    if (status === "loading" || !hasMore) {
      return;
    }

    void dispatch(fetchNextCatsPage());
  }, [dispatch, hasMore, status]);

  const targetRef = useInfiniteScroll({
    disabled: status === "loading" || !hasMore,
    onLoadMore: loadMore,
    rootMargin: "350px",
  });

  useEffect(() => {
    const pageIsShort =
      window.innerHeight >= document.documentElement.scrollHeight - 60;

    if (status === "succeeded" && hasMore && pageIsShort) {
      loadMore();
    }
  }, [hasMore, items.length, loadMore, status]);

  useEffect(() => {
    const onScroll = () => {
      if (status === "loading" || !hasMore) {
        return;
      }

      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 250;

      if (nearBottom) {
        loadMore();
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [hasMore, loadMore, status]);

  return (
    <div>
      {error && (
        <Alert
          className="mb-4"
          showIcon
          type="error"
          message={error}
          action={
            <Button type="link" onClick={loadMore}>
              Повторить
            </Button>
          }
        />
      )}
      {items.length === 0 && status !== "loading" && !error && (
        <Empty description="Котики не найдены" />
      )}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4 md:grid-cols-[repeat(auto-fill,minmax(180px,1fr))] md:gap-6">
        {items.map((cat, index) => (
          <CatCard
            key={cat.id}
            cat={cat}
            onClick={() => setSelectedIndex(index)}
            overlayAction={<FavoriteToggleButton cat={cat} />}
          />
        ))}
      </div>
      {status === "loading" && (
        <Typography.Text className="block py-8 text-center text-sm text-black/70">
          ... загружаем еще котиков ...
        </Typography.Text>
      )}
      {hasMore && <div ref={targetRef} className="h-px" />}
      <CatViewerModal
        cats={items}
        selectedIndex={selectedIndex}
        onClose={() => setSelectedIndex(null)}
        onChangeIndex={setSelectedIndex}
      />
    </div>
  );
};
