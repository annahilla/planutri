import { Schema, model, models } from "mongoose";

const RecipesSchema = new Schema(
  {
    name: { type: String, required: true },
    ingredients: [
        { 
            ingredient: { type: String, required: true }, 
            quantity: { type: Number, required: true}, 
            unit: { type: String, required: true }  
        }
    ],
    description: { type: String, required: false }
  },
  { timestamps: true }
);

const Recipe = models.Recipe || model("Recipe", RecipesSchema);

export default Recipe;