import PageTitle from "@/components/ui/PageTitle";
import CreateRecipeForm from "@/components/forms/CreateRecipeForm";
import DashboardHeader from "@/components/ui/DashboardHeader";

const CreateRecipe = async () => {
  return (
    <div className="flex flex-col w-full items-start">
      <DashboardHeader>
        <PageTitle>Create a Recipe</PageTitle>
      </DashboardHeader>
      <CreateRecipeForm />
    </div>
  );
};

export default CreateRecipe;
