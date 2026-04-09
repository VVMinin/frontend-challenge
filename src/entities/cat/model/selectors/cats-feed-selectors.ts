import { RootState } from "../../../../app/store/store";

export const selectCatsFeedItems = (state: RootState) => state.catsFeed.items;
export const selectCatsFeedStatus = (state: RootState) => state.catsFeed.status;
export const selectCatsFeedError = (state: RootState) => state.catsFeed.error;
export const selectCatsFeedHasMore = (state: RootState) => state.catsFeed.hasMore;
