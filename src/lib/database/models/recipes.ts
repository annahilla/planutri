import { Schema, model, models } from "mongoose";

const RecipesSchema = new Schema(
  {
    name: { type: String, required: true },
    ingredients: { type: [
        { 
            ingredient: { type: Schema.Types.ObjectId, ref: "Ingredient", required: true }, 
            quantity: { type: Number, required: true}, 
            unit: { type: Schema.Types.ObjectId, ref: "Unit", required: true }  
        }
    ], 
    required: true 
    },
    description: { type: String }
  },
  { timestamps: true }
);

const Recipe = models.Recipe || model("Recipe", RecipesSchema);

export default Recipe;