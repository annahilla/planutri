import { Schema, model, models } from "mongoose";

const RecipesSchema = new Schema(
  {
    name: { type: String, required: true },
    ingredients: [
        { 
            _id: {type: String, required: false},
            ingredient: { type: String, required: true }, 
            quantity: { type: Number, required: true}, 
            unit: { type: String, required: true },
            checked: { type: Boolean, default: false, required: false },
        }
    ],
    description: { type: String, required: false },
    userId: {
        type: String,
        ref: "User",
        required: false
    },
    isPublic: {
      type: Boolean,
      required: false
    },
    imageUrl: {type: String, required: false}
  },
  { timestamps: true }
);

const Recipe = models.Recipe || model("Recipe", RecipesSchema);

export default Recipe;