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
        "flex h-8 w-8 items-center justify-center transition-all",
        isFavoritesMode
          ? "opacity-100 text-red-500 hover:text-red-400"
          : isFavorite
            ? "opacity-100 text-red-500"
            : "opacity-0 text-red-500/70 group-hover:opacity-100 group-hover:text-red-500",
      ].join(" ")}
    >
      {shouldShowFilledHeart ? (
        <HeartFilled className="text-[26px] leading-none transition-colors" />
      ) : (
        <HeartOutlined className="text-[26px] leading-none transition-colors" />
      )}
    </button>
  );
};
