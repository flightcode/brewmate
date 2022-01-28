export interface Beer {
  id?: any | null;
  name: string;
  brewery?: string;
  type: string;
  hops?: string[];
  malts?: string[];
  abv?: number;
  ibu?: number;
}
