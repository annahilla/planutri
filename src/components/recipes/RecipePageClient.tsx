"use client";

import RecipeDetails from "@/components/recipes/RecipeDetails";
import { RecipeInterface } from "@/types/types";
import { IoMdArrowBack } from "react-icons/io";
import { useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Loader from "@/components/ui/Loader";
import DashboardButton from "@/components/ui/buttons/DashboardButton";
import { CiEdit } from "react-icons/ci";
import { useRouter } from "next/navigation";
import ConfirmModal from "@/components/ui/modals/ConfirmModal";

const RecipeDetailsPageClient = ({ recipe }: { recipe: RecipeInterface }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isEditMode = searchParams.get("edit") === "true";
  const [discardChanges, setDiscardChanges] = useState(false);

  const handleEditMode = () => {
    const params = new URLSearchParams(searchParams);
    params.set("edit", "true");
    router.replace(`/dashboard/recipes/${id}?${params.toString()}`);
  };

  const handleBackClick = () => {
    if (isEditMode) {
      setIsModalOpen(true);
    } else {
      router.push("/dashboard/recipes");
    }
  };

  const goBack = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("edit");
    router.replace(`/dashboard/recipes/${id}?${params.toString()}`);
    setDiscardChanges(true);
    setIsModalOpen(false);
  };

  if (!recipe) {
    return <Loader />;
  }

  return (
    <>
      <div className="flex bg-white h-full py-5 flex-col rounded text-black md:items-start md:w-full">
        <div className="flex justify-between mb-5 w-full">
          <div className="flex gap-3 items-center">
            <button
              onClick={handleBackClick}
              className="text-lightBrown outline-none hover:opacity-80"
            >
              <IoMdArrowBack size={24} />
            </button>
            <h2 className="text-2xl">{recipe.name}</h2>
          </div>
          {!isEditMode && !recipe?.isPublic && (
            <div>
              <DashboardButton handleClick={handleEditMode} icon={<CiEdit />}>
                Edit
              </DashboardButton>
            </div>
          )}
        </div>
        <RecipeDetails discardChanges={discardChanges} currentRecipe={recipe} />
      </div>
      <ConfirmModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        text="Are you sure you want to go back? Any changes made won't be saved"
        handleFunction={goBack}
      />
    </>
  );
};

export default RecipeDetailsPageClient;
