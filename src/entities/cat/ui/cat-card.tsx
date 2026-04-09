import { Card } from "antd";
import { ReactNode } from "react";
import { CatImage } from "../model/types/cat";

interface CatCardProps {
  cat: CatImage;
  action?: ReactNode;
}

export const CatCard = ({ cat, action }: CatCardProps) => {
  return (
    <Card
      cover={<img alt="cat" src={cat.url} style={{ display: "block", width: "100%", aspectRatio: "1 / 1", objectFit: "cover" }} />}
      styles={{ body: { padding: 10 } }}
    >
      {action}
    </Card>
  );
};
