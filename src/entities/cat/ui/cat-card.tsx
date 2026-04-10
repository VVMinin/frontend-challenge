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
      className="overflow-hidden rounded-none border-0 shadow-none transition-shadow hover:shadow-md"
      classNames={{ body: "!hidden" }}
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
            "group relative aspect-square w-full text-left",
            isInteractive ? "cursor-zoom-in" : "",
          ].join(" ")}
        >
          <img alt="cat" src={cat.url} className="block h-full w-full object-cover" />
          <div className="absolute bottom-2 right-2">{overlayAction}</div>
        </div>
      }
    />
  );
};
