import mongoose, { Schema, model, models } from "mongoose";

const MenuSchema = new Schema(
  {
    recipe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
      required: true
    },
    dayOfTheWeek: { type: String, required: true, enum: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ] },
    meal: { type: String, required: true, enum: [
      "Breakfast",
      "Lunch",
      "Snack",
      "Dinner"
    ] },
    userId: {
        type: String,
        ref: "User",
        required: true
    },
    servings: {type: Number, required: true}
  },
  { timestamps: true }
);

const Menu = models.Menu || model("Menu", MenuSchema);

export default Menu;