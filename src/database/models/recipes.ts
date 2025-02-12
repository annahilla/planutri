import { Schema, model, models } from "mongoose";

const RecipesSchema = new Schema(
  {
    name: { type: String, required: true },
    ingredients: [
        { 
            _id: {type: String, required: false},
            ingredient: { type: String, required: true }, 
            quantity: { type: Number, required: true}, 
            unit: { type: String, required: true }  
        }
    ],
    description: { type: String, required: false },
    userId: {
        type: String,
        ref: "User",
        required: true
    }
  },
  { timestamps: true }
);

const Recipe = models.Recipe || model("Recipe", RecipesSchema);

export default Recipe;