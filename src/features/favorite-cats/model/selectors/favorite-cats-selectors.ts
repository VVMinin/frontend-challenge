import { RootState } from "../../../../app/store/store";

export const selectFavoriteCats = (state: RootState) => state.favoriteCats.items;
export const selectIsCatFavorite = (state: RootState, catId: string) =>
  state.favoriteCats.items.some((item) => item.id === catId);
