import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCatsPage } from "../../api/fetch-cats-page";
import { CatImage } from "../types/cat";

const PAGE_LIMIT = 15;

type CatsFeedStatus = "idle" | "loading" | "succeeded" | "failed";

interface CatsFeedState {
  items: CatImage[];
  page: number;
  hasMore: boolean;
  status: CatsFeedStatus;
  error: string | null;
}

const initialState: CatsFeedState = {
  items: [],
  page: 0,
  hasMore: true,
  status: "idle",
  error: null,
};

export const fetchNextCatsPage = createAsyncThunk<
  CatImage[],
  void,
  { rejectValue: string; state: { catsFeed: CatsFeedState } }
>(
  "catsFeed/fetchNextCatsPage",
  async (_, { getState, rejectWithValue }) => {
    const { page } = getState().catsFeed;

    try {
      return await fetchCatsPage({
        page,
        limit: PAGE_LIMIT,
      });
    } catch {
      return rejectWithValue("Не удалось загрузить котиков");
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState() as { catsFeed: CatsFeedState };
      return state.catsFeed.status !== "loading" && state.catsFeed.hasMore;
    },
  },
);

const catsFeedSlice = createSlice({
  name: "catsFeed",
  initialState,
  reducers: {
    resetCatsFeed: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNextCatsPage.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchNextCatsPage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.push(...action.payload);
        state.page += 1;
        state.hasMore = action.payload.length > 0;
      })
      .addCase(fetchNextCatsPage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Неизвестная ошибка";
      });
  },
});

export const { resetCatsFeed } = catsFeedSlice.actions;
export const catsFeedReducer = catsFeedSlice.reducer;
