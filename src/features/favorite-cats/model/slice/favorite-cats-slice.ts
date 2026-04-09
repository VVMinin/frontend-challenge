import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CatImage } from "../../../../entities/cat/model/types/cat";
import { loadFavoriteCats } from "../../../../shared/lib/storage/favorite-cats-storage";

interface FavoriteCatsState {
  items: CatImage[];
}

const initialState: FavoriteCatsState = {
  items: loadFavoriteCats(),
};

const favoriteCatsSlice = createSlice({
  name: "favoriteCats",
  initialState,
  reducers: {
    addFavoriteCat: (state, action: PayloadAction<CatImage>) => {
      const exists = state.items.some((item) => item.id === action.payload.id);
      if (!exists) {
        state.items.unshift(action.payload);
      }
    },
    removeFavoriteCat: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    toggleFavoriteCat: (state, action: PayloadAction<CatImage>) => {
      const exists = state.items.some((item) => item.id === action.payload.id);

      if (exists) {
        state.items = state.items.filter((item) => item.id !== action.payload.id);
      } else {
        state.items.unshift(action.payload);
      }
    },
  },
});

export const { addFavoriteCat, removeFavoriteCat, toggleFavoriteCat } = favoriteCatsSlice.actions;
export const favoriteCatsReducer = favoriteCatsSlice.reducer;
