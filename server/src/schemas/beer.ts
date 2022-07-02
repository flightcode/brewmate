import { model, Schema } from "mongoose";
import { TBeer } from "../types/beer";

/**
 * Schema representing Beer in database
 */
const SBeer = new Schema<TBeer>(
  {
    name: { type: String, required: true },
    brewery: { type: Schema.Types.ObjectId, ref: "Brewery" },
    type: { type: String, required: true },
    subType: String,
    hops: [String],
    malts: [String],
    abv: Number,
    ibu: Number,
  },
  { timestamps: true }
);

/**
 * Model representing Beer in database
 */
const MBeer = model<TBeer>("Beer", SBeer);

export default MBeer;
