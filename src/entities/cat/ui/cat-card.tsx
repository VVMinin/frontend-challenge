import { Card } from "antd";
import { CatImage } from "../model/types/cat";

interface CatCardProps {
  cat: CatImage;
}

export const CatCard = ({ cat }: CatCardProps) => {
  return (
    <Card
      cover={<img alt="cat" src={cat.url} style={{ display: "block", width: "100%", aspectRatio: "1 / 1", objectFit: "cover" }} />}
      styles={{ body: { padding: 10 } }}
    />
  );
};
