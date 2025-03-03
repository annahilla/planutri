import mongoose from "mongoose";

const FavoriteRecipeSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      ref: "User",
      required: true,
      unique: true,
    },
    recipeIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe",
      },
    ],
  },
  { timestamps: true }
);


export const FavoriteRecipe =
  mongoose.models.FavoriteRecipe ||
  mongoose.model("FavoriteRecipe", FavoriteRecipeSchema);