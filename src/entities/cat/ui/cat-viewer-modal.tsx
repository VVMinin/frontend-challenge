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
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition-colors hover:bg-white/35">
          <CloseOutlined className="text-base text-white" />
        </span>
      }
      className="[&_.ant-modal-content]:!overflow-hidden [&_.ant-modal-content]:!bg-black [&_.ant-modal-content]:!p-0 [&_.ant-modal-body]:!overflow-hidden"
      classNames={{ body: "p-0 overflow-hidden" }}
    >
      {currentCat && (
        <div className="relative h-[62vh] w-full overflow-hidden bg-black">
          <img
            src={currentCat.url}
            alt="cat preview"
            className="h-full w-full object-contain px-12"
          />
          <Button
            type="text"
            icon={<LeftOutlined className="text-lg text-white" />}
            disabled={!canGoPrev}
            onClick={() => selectedIndex !== null && onChangeIndex(selectedIndex - 1)}
            className="!absolute left-3 top-1/2 !h-10 !w-10 -translate-y-1/2 !rounded-full !bg-black/50 hover:!bg-black/70 disabled:!opacity-30"
          />
          <Button
            type="text"
            icon={<RightOutlined className="text-lg text-white" />}
            disabled={!canGoNext}
            onClick={() => selectedIndex !== null && onChangeIndex(selectedIndex + 1)}
            className="!absolute right-3 top-1/2 !h-10 !w-10 -translate-y-1/2 !rounded-full !bg-black/50 hover:!bg-black/70 disabled:!opacity-30"
          />
        </div>
      )}
    </Modal>
  );
};
