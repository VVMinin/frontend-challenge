import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { CatImage } from "../../../entities/cat/model/types/cat";
import { selectIsCatFavorite } from "../model/selectors/favorite-cats-selectors";
import { toggleFavoriteCat } from "../model/slice/favorite-cats-slice";
import { useAppDispatch, useAppSelector } from "../../../shared/lib/hooks/store-hooks";

interface FavoriteToggleButtonProps {
  cat: CatImage;
  mode?: "feed" | "favorites";
}

export const FavoriteToggleButton = ({ cat, mode = "feed" }: FavoriteToggleButtonProps) => {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector((state) => selectIsCatFavorite(state, cat.id));
  const isFavoritesMode = mode === "favorites";
  const shouldShowFilledHeart = isFavoritesMode || isFavorite;

  return (
    <button
      type="button"
      aria-label={isFavorite ? "Удалить из любимых" : "Добавить в любимые"}
      onClick={(event) => {
        event.stopPropagation();
        dispatch(toggleFavoriteCat(cat));
      }}
      className={[
        "favorite-toggle",
        isFavoritesMode
          ? "favorites"
          : isFavorite
            ? "feed favorite"
            : "feed not-favorite",
      ].join(" ")}
    >
      {shouldShowFilledHeart ? (
        <HeartFilled className="favorite-toggle-icon" />
      ) : (
        <HeartOutlined className="favorite-toggle-icon" />
      )}
    </button>
  );
};
