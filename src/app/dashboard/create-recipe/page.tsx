import Button from "@/components/ui/Button";
import React from "react";

const CreateRecipe = () => {
  return (
    <div className="flex flex-col items-center mx-10 my-6 md:ml-[20rem] md:items-start md:w-2/3">
      <h2 className="mb-6 text-2xl md:mb-10">Create a Recipe</h2>
      <form className="flex flex-col gap-5 w-full">
        <div className="flex flex-col gap-1">
          <label htmlFor="name">Recipe name</label>
          <input
            className="border py-2 px-4 rounded outline-none"
            name="name"
            type="text"
          />
        </div>
        <div className="flex flex-col justify-between items-start gap-10 sm:flex-row">
          <div className="flex-1 flex flex-col gap-1 w-full">
            <label htmlFor="name">Ingredients</label>
            <input
              className="border py-2 px-4 rounded outline-none"
              type="text"
            />
            <textarea
              className="mt-2 border py-2 px-4 rounded outline-none"
              name="ingredients"
              rows={10}
              disabled
            />
          </div>
          <div className="flex-1 flex flex-col gap-1 w-full">
            <label htmlFor="name">Description</label>
            <textarea
              className="border py-2 px-4 rounded outline-none"
              name="description"
              rows={12}
            />
          </div>
        </div>
        <div className="w-32 m-auto md:m-0">
          <Button filled type="submit">
            Create
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateRecipe;
