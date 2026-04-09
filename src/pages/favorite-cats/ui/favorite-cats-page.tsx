import { Empty } from "antd";
import { CatCard } from "../../../entities/cat/ui/cat-card";
import { selectFavoriteCats } from "../../../features/favorite-cats/model/selectors/favorite-cats-selectors";
import { FavoriteToggleButton } from "../../../features/favorite-cats/ui/favorite-toggle-button";
import { useAppSelector } from "../../../shared/lib/hooks/store-hooks";

export const FavoriteCatsPage = () => {
  const items = useAppSelector(selectFavoriteCats);

  if (items.length === 0) {
    return <Empty description="Пока нет любимых котиков" />;
  }

  return (
    <div className="cats-grid">
      {items.map((cat) => (
        <CatCard key={cat.id} cat={cat} action={<FavoriteToggleButton cat={cat} />} />
      ))}
    </div>
  );
};
