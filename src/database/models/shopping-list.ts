import { Schema, model, models } from "mongoose";

const ShoppingListSchema = new Schema(
  {
    userId: { type: String, required: true },
    list: [
        { 
            ingredient: { type: String, required: true }, 
            quantity: { type: Number, required: true}, 
            unit: { type: String, required: true }  
        }
    ],
  },
  { timestamps: true }
);

const ShoppingList = models.ShoppingList || model("ShoppingList", ShoppingListSchema);

export default ShoppingList;