import { configureStore } from "@reduxjs/toolkit";
import { catsFeedReducer } from "../../entities/cat/model/slice/cats-feed-slice";
import { favoriteCatsReducer } from "../../features/favorite-cats/model/slice/favorite-cats-slice";
import { saveFavoriteCats } from "../../shared/lib/storage/favorite-cats-storage";

export const store = configureStore({
  reducer: {
    catsFeed: catsFeedReducer,
    favoriteCats: favoriteCatsReducer,
  },
});

store.subscribe(() => {
  saveFavoriteCats(store.getState().favoriteCats.items);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
