"use client";

import { CiImageOn } from "react-icons/ci";
import { CiImport } from "react-icons/ci";
import Modal from "../ui/Modal";
import { useState } from "react";
import Button from "../ui/buttons/Button";
import Image from "next/image";
import { updateRecipe, uploadRecipeImage } from "@/services/recipeService";
import { PulseLoader } from "react-spinners";
import { useRecipe } from "@/context/RecipeContext";
import { toast } from "react-toastify";

const EditRecipeImageButton = ({
  setImageUrl,
}: {
  setImageUrl: (image: string) => void;
}) => {
  const { recipe } = useRecipe();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

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

  const closeModal = () => {
    setIsModalOpen(false);
    setPreviewUrl(null);
  };

  const handleUpload = async () => {
    const cloudinaryPreset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME;

    if (!selectedImage) {
      toast.info("Please select an image first.");
      return;
    }

    if (!cloudinaryPreset) {
      console.error("Cloudinary preset is missing.");
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", selectedImage);
    formData.append("upload_preset", cloudinaryPreset);
    formData.append("folder", "recipes");

    const imageUrl = await uploadRecipeImage(formData);

    if (imageUrl) {
      try {
        const updatedRecipe = { ...recipe, imageUrl: imageUrl };
        await updateRecipe(updatedRecipe);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error(error);
      }
    }
    setImageUrl(imageUrl);
    setIsModalOpen(false);
    setIsUploading(false);
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
          <div className="flex flex-col items-center justify-center w-full">
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
                accept="image/*"
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
          <Button handleClick={handleUpload} filled color="white">
            {isUploading ? <PulseLoader size={5} color="white" /> : "Save"}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default EditRecipeImageButton;
