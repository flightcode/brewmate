import { TBrewery } from "./brewery";

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
};
