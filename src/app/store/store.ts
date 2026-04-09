import { configureStore } from "@reduxjs/toolkit";
import { catsFeedReducer } from "../../entities/cat/model/slice/cats-feed-slice";

export const store = configureStore({
  reducer: {
    catsFeed: catsFeedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
