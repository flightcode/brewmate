import { TBrewery } from "./brewery";
import { TUser } from "./user";

export type TBeer = {
  _id?: string;
  name: string;
  brewery?: TBrewery;
  type: string;
  subType?: string;
  hops?: string[];
  malts?: string[];
  abv: number;
  ibu: number;
  image?: string;
  reviews: TReview[];
};

export type TReview = {
  _id?: string;
  user: TUser;
  date: Date;
  rating: Rating;
  descriptors?: string[];
};

export type Rating = 0 | 0.5 | 1;
