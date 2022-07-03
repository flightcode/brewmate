import { model, Schema } from "mongoose";
import { TBeer, TReview } from "../types/beer";

/**
 * Schema representing Review for Beer
 */
const SReview = new Schema<TReview>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  rating: { type: Number, required: true },
  descriptors: [String],
});

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
    image: String,
    reviews: [SReview],
  },
  { timestamps: true }
);

/**
 * Model representing Beer in database
 */
const MBeer = model<TBeer>("Beer", SBeer);

export default MBeer;
