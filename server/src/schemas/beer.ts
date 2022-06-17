import { model, Schema } from "mongoose";
import { TBeer } from "../models/beer";

const SBeer = new Schema<TBeer>(
  {
    name: { type: String, required: true },
    brewery: String,
    type: { type: String, required: true },
    hops: [String],
    malts: [String],
    abv: Number,
    ibu: Number,
  },
  { timestamps: true }
);

const MBeer = model<TBeer>("Beer", SBeer);

export default MBeer;
