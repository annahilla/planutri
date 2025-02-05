import { useRef } from "react";
import { IoMdClose } from "react-icons/io";
import useClickOutside from "@/hooks/useClickOutside";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, closeModal, children }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null!);
  useClickOutside(modalRef, closeModal);

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[11000]">
        <div
          ref={modalRef}
          className="w-11/12 max-w-2xl relative bg-white p-7 rounded flex flex-col items-center justify-start lg:w-1/2 max-h-[90vh]"
        >
          <button className="absolute right-5 top-5" onClick={closeModal}>
            <IoMdClose />
          </button>
          <div className="overflow-y-auto w-full p-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
            {children}
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
