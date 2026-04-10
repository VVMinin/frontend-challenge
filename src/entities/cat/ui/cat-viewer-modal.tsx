import { CloseOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { CatImage } from "../model/types/cat";

interface CatViewerModalProps {
  cats: CatImage[];
  selectedIndex: number | null;
  onClose: () => void;
  onChangeIndex: (nextIndex: number) => void;
}

export const CatViewerModal = ({
  cats,
  selectedIndex,
  onClose,
  onChangeIndex,
}: CatViewerModalProps) => {
  const isOpen = selectedIndex !== null;
  const currentCat = selectedIndex !== null ? cats[selectedIndex] : null;
  const canGoPrev = selectedIndex !== null && selectedIndex > 0;
  const canGoNext = selectedIndex !== null && selectedIndex < cats.length - 1;

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={820}
      closeIcon={
        <span className="cat-viewer-close">
          <CloseOutlined className="cat-viewer-close-icon" />
        </span>
      }
      className="cat-viewer-modal"
      classNames={{ body: "cat-viewer-modal-body" }}
    >
      {currentCat && (
        <div className="cat-viewer-viewport">
          <img
            src={currentCat.url}
            alt="cat preview"
            className="cat-viewer-image"
          />
          <Button
            type="text"
            icon={<LeftOutlined className="cat-viewer-nav-icon" />}
            disabled={!canGoPrev}
            onClick={() => selectedIndex !== null && onChangeIndex(selectedIndex - 1)}
            className="cat-viewer-nav cat-viewer-nav-prev"
          />
          <Button
            type="text"
            icon={<RightOutlined className="cat-viewer-nav-icon" />}
            disabled={!canGoNext}
            onClick={() => selectedIndex !== null && onChangeIndex(selectedIndex + 1)}
            className="cat-viewer-nav cat-viewer-nav-next"
          />
        </div>
      )}
    </Modal>
  );
};
