"use client";

import RecipeDetails from "@/components/recipes/RecipeDetails";
import { RecipeInterface } from "@/types/types";
import { IoMdArrowBack } from "react-icons/io";
import { getRecipe } from "@/services/recipeService";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useAppSelector } from "@/lib/store/reduxHooks";
import Loader from "@/components/ui/Loader";
import DashboardButton from "@/components/ui/buttons/DashboardButton";
import { CiEdit } from "react-icons/ci";
import { useRouter } from "next/navigation";
import ConfirmModal from "@/components/ui/modals/ConfirmModal";

const RecipeDetailsPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { id } = useParams();
  const token = useAppSelector((state) => state.auth.user?.token);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recipe, setRecipe] = useState<RecipeInterface | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const edit = searchParams.get("edit");
    if (edit) {
      setIsEditMode(true);
    } else {
      setIsEditMode(false);
    }
  }, [searchParams]);

  useEffect(() => {
    if (token && id !== undefined) {
      getRecipe(id?.toString(), token).then((data) => setRecipe(data));
    }
  }, []);

  if (!recipe) {
    return <Loader />;
  }

  const handleEditMode = () => {
    setIsEditMode(true);
  };

  const handleBackClick = () => {
    if (isEditMode) {
      setIsModalOpen(true);
    } else {
      router.push("/dashboard/recipes");
    }
  };

  const goBack = () => {
    setIsEditMode(false);
    setIsModalOpen(false);
  };

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
          {!isEditMode && (
            <div>
              <DashboardButton handleClick={handleEditMode} icon={<CiEdit />}>
                Edit
              </DashboardButton>
            </div>
          )}
        </div>
        <RecipeDetails
          currentRecipe={recipe}
          editMode={isEditMode}
          setIsEditMode={setIsEditMode}
        />
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

export default RecipeDetailsPage;
