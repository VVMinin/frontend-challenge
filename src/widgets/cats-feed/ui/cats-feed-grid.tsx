import { useCallback, useEffect } from "react";
import { Alert, Flex, Spin } from "antd";
import { fetchNextCatsPage } from "../../../entities/cat/model/slice/cats-feed-slice";
import {
  selectCatsFeedError,
  selectCatsFeedHasMore,
  selectCatsFeedItems,
  selectCatsFeedStatus,
} from "../../../entities/cat/model/selectors/cats-feed-selectors";
import { CatCard } from "../../../entities/cat/ui/cat-card";
import { FavoriteToggleButton } from "../../../features/favorite-cats/ui/favorite-toggle-button";
import { useAppDispatch, useAppSelector } from "../../../shared/lib/hooks/store-hooks";
import { useInfiniteScroll } from "../../../shared/lib/hooks/use-infinite-scroll";

export const CatsFeedGrid = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCatsFeedItems);
  const status = useAppSelector(selectCatsFeedStatus);
  const error = useAppSelector(selectCatsFeedError);
  const hasMore = useAppSelector(selectCatsFeedHasMore);

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
  });

  return (
    <div>
      {error && (
        <Alert
          showIcon
          type="error"
          message={error}
          style={{ marginBottom: 16 }}
        />
      )}
      <div className="cats-grid">
        {items.map((cat) => (
          <CatCard key={cat.id} cat={cat} action={<FavoriteToggleButton cat={cat} />} />
        ))}
      </div>
      <Flex justify="center" style={{ padding: "20px 0 8px" }}>
        {status === "loading" && <Spin size="large" />}
      </Flex>
      <div ref={targetRef} style={{ height: 1 }} />
    </div>
  );
};
