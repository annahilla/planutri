import { Schema, model, models } from "mongoose";

const UnitsSchema = new Schema(
  {
    units: { type: [String], required: true },
  },
  { timestamps: true }
);

const Unit = models.Unit || model("Unit", UnitsSchema);

export default Unit;
