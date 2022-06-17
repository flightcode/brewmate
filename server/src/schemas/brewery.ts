import { model, Schema } from "mongoose";
import { TBrewery } from "../models/brewery";

const SBrewery = new Schema<TBrewery>(
  {
    name: { type: String, required: true },
    country: String,
  },
  { timestamps: true }
);

const MBrewery = model<TBrewery>("Brewery", SBrewery);

export default MBrewery;
