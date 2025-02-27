import PageTitle from "@/components/ui/PageTitle";
import CreateRecipeForm from "@/components/forms/CreateRecipeForm";

const CreateRecipe = async () => {
  return (
    <div className="flex flex-col w-full items-start">
      <div className="mb-4 md:mb-6">
        <PageTitle>Create a Recipe</PageTitle>
      </div>
      <CreateRecipeForm />
    </div>
  );
};

export default CreateRecipe;
