import { CatImage } from "../../../entities/cat/model/types/cat";

const FAVORITE_CATS_KEY = "favorite-cats";

export const loadFavoriteCats = (): CatImage[] => {
  const raw = localStorage.getItem(FAVORITE_CATS_KEY);

  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (item): item is CatImage =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as CatImage).id === "string" &&
        typeof (item as CatImage).url === "string" &&
        typeof (item as CatImage).width === "number" &&
        typeof (item as CatImage).height === "number",
    );
  } catch {
    return [];
  }
};

export const saveFavoriteCats = (items: CatImage[]) => {
  localStorage.setItem(FAVORITE_CATS_KEY, JSON.stringify(items));
};
