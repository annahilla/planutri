import { Schema, model, models } from "mongoose";

const IngredientsSchema = new Schema(
  {
    ingredients: { type: [String], required: true },
  },
  { timestamps: true }
);

const Ingredient = models.Ingredient || model("Ingredient", IngredientsSchema);

export default Ingredient;
