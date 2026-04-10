import { useState } from "react";
import { Empty } from "antd";
import { CatCard } from "../../../entities/cat/ui/cat-card";
import { CatViewerModal } from "../../../entities/cat/ui/cat-viewer-modal";
import { selectFavoriteCats } from "../../../features/favorite-cats/model/selectors/favorite-cats-selectors";
import { FavoriteToggleButton } from "../../../features/favorite-cats/ui/favorite-toggle-button";
import { useAppSelector } from "../../../shared/lib/hooks/store-hooks";

export const FavoriteCatsPage = () => {
  const items = useAppSelector(selectFavoriteCats);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (items.length === 0) {
    return <Empty description="Пока нет любимых котиков" />;
  }

  return (
    <div className="cats-grid">
      {items.map((cat, index) => (
        <CatCard
          key={cat.id}
          cat={cat}
          onClick={() => setSelectedIndex(index)}
          overlayAction={<FavoriteToggleButton cat={cat} mode="favorites" />}
        />
      ))}
      <CatViewerModal
        cats={items}
        selectedIndex={selectedIndex}
        onClose={() => setSelectedIndex(null)}
        onChangeIndex={setSelectedIndex}
      />
    </div>
  );
};
