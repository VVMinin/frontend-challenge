import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { CatImage } from "../../../entities/cat/model/types/cat";
import { selectIsCatFavorite } from "../model/selectors/favorite-cats-selectors";
import { toggleFavoriteCat } from "../model/slice/favorite-cats-slice";
import { useAppDispatch, useAppSelector } from "../../../shared/lib/hooks/store-hooks";

interface FavoriteToggleButtonProps {
  cat: CatImage;
}

export const FavoriteToggleButton = ({ cat }: FavoriteToggleButtonProps) => {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector((state) => selectIsCatFavorite(state, cat.id));

  return (
    <Button
      type={isFavorite ? "default" : "text"}
      icon={isFavorite ? <HeartFilled style={{ color: "#f5222d" }} /> : <HeartOutlined />}
      onClick={() => dispatch(toggleFavoriteCat(cat))}
    >
      {isFavorite ? "В любимых" : "В любимые"}
    </Button>
  );
};
