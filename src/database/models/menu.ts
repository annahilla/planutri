import { Schema, model, models } from "mongoose";

const MenuSchema = new Schema(
  {
    recipe: {},
    dayOfTheWeek: {},
    meal: {}
  },
  { timestamps: true }
);

const Menu = models.Menu || model("Menu", MenuSchema);

export default Menu;