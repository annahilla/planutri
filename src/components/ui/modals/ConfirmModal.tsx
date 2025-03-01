import Button from "../buttons/Button";
import Modal from "../Modal";

interface ConfirmModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  text: string;
  handleFunction: () => void;
}

const ConfirmModal = ({
  isModalOpen,
  setIsModalOpen,
  text,
  handleFunction,
}: ConfirmModalProps) => {
  return (
    <Modal
      isSmall={true}
      isOpen={isModalOpen}
      closeModal={() => setIsModalOpen(false)}
    >
      <p className="text-center mt-8">{text}</p>
      <div className="flex gap-3 w-2/3 my-8 m-auto md:gap-10">
        <Button handleClick={handleFunction} type="button" color="white" filled>
          Yes
        </Button>
        <Button handleClick={() => setIsModalOpen(false)} type="button">
          No
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
