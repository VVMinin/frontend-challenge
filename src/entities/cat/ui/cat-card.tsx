import { Card } from "antd";
import { ReactNode } from "react";
import { CatImage } from "../model/types/cat";

interface CatCardProps {
  cat: CatImage;
  overlayAction?: ReactNode;
  onClick?: () => void;
}

export const CatCard = ({ cat, overlayAction, onClick }: CatCardProps) => {
  const isInteractive = Boolean(onClick);

  return (
    <Card
      className="cat-card"
      classNames={{ body: "cat-card-body" }}
      cover={
        <div
          role={isInteractive ? "button" : undefined}
          tabIndex={isInteractive ? 0 : undefined}
          onClick={onClick}
          onKeyDown={(event) => {
            if (!isInteractive) {
              return;
            }

            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              onClick?.();
            }
          }}
          className={[
            "cat-card-inner",
            isInteractive ? "is-interactive" : "",
          ].join(" ")}
        >
          <img alt="cat" src={cat.url} className="cat-card-image" />
          <div className="cat-card-action">{overlayAction}</div>
        </div>
      }
    />
  );
};
