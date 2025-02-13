import PageTitle from "@/components/ui/PageTitle";
import CreateRecipeForm from "@/components/forms/CreateRecipeForm";

const CreateRecipe = () => {
  return (
    <div className="flex flex-col w-full items-start">
      <PageTitle>Create a Recipe</PageTitle>
      <CreateRecipeForm />
    </div>
  );
};

export default CreateRecipe;
