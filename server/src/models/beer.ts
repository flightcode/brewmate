export type TBeer = {
  _id?: string;
  name: string;
  brewery?: string;
  type: string;
  hops?: string[];
  malts?: string[];
  abv: number;
  ibu: number;
};
