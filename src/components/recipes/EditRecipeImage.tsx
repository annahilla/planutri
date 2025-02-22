"use client";

import { CiImageOn } from "react-icons/ci";
import { CiImport } from "react-icons/ci";
import Modal from "../ui/Modal";
import { useState } from "react";
import Button from "../ui/buttons/Button";
import Image from "next/image";

const EditRecipeImageButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  };

  const handleSave = () => {
    if (!selectedImage) {
      alert("Please select an image first.");
      return;
    }

    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPreviewUrl(null);
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="absolute bg-neutral-50 p-2 bottom-3 right-3 hover:bg-neutral-100 rounded"
      >
        <CiImageOn />
      </button>
      <Modal isSmall={false} isOpen={isModalOpen} closeModal={closeModal}>
        <h3 className="text-xl my-2">Edit Recipe Image</h3>
        <div className="mt-8">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className={`${
                previewUrl ? "h-36" : "h-96"
              } flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-500">
                <div className="my-3">
                  <CiImport size={38} />
                </div>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (max. 800x400px)
                </p>
              </div>
              <input
                onChange={handleFileChange}
                id="dropzone-file"
                type="file"
                className="hidden"
              />
            </label>
          </div>
          <div className="mt-4">
            {previewUrl && (
              <div className="mb-4 flex justify-center">
                <Image
                  src={previewUrl}
                  alt="Selected preview"
                  width={0}
                  height={0}
                  className="rounded-md object-cover w-full h-auto max-h-80"
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-4 mt-8">
          <Button handleClick={closeModal}>Cancel</Button>
          <Button handleClick={handleSave} filled color="white">
            Save
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default EditRecipeImageButton;
