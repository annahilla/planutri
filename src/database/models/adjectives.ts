import { Schema, model, models } from "mongoose";

const AdjectivesSchema = new Schema(
  {
    adjectives: { type: [String], required: true },
  },
);

const Adjective = models.Adjective || model("Adjective", AdjectivesSchema);

export default Adjective;
