import Button from "./Button";
import Modal from "./Modal";

interface DeleteConfirmationModalProps {
  isModalOpen: boolean;
  thingToDelete: string;
  setIsModalOpen: (isOpen: boolean) => void;
  handleDelete: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isModalOpen,
  thingToDelete,
  setIsModalOpen,
  handleDelete,
}) => {
  return (
    <Modal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}>
      <p className="text-center mt-8">
        Are you sure you want to delete {thingToDelete}?
      </p>
      <div className="flex gap-10 w-2/3 my-8 m-auto">
        <Button handleClick={handleDelete} type="button" filled>
          Yes
        </Button>
        <Button
          handleClick={() => setIsModalOpen(false)}
          type="button"
          color="black"
        >
          No
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
