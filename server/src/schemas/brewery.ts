import { model, Schema } from "mongoose";
import { TBrewery } from "../models/brewery";

/**
 * Schema representing Brewery in database
 */
const SBrewery = new Schema<TBrewery>(
  {
    name: { type: String, required: true },
    country: String,
  },
  { timestamps: true }
);

/**
 * Model representing Brewery in database
 */
const MBrewery = model<TBrewery>("Brewery", SBrewery);

export default MBrewery;
