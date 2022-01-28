import { AxiosResponse } from "axios";
import { Beer } from "../models";
import { api } from "../utils";

const findAll = async (): Promise<AxiosResponse<Beer[]>> => {
  const response = await api.get<Beer[]>("/beer");
  return response;
};

const create = async ({
  name,
  type,
  brewery,
  abv,
  ibu,
}: Beer): Promise<AxiosResponse<Beer>> => {
  const response = await api.post<Beer>("/beer", {
    name,
    type,
    brewery,
    abv,
    ibu,
  });
  return response;
};

const BeerService = {
  findAll,
  create,
};

export { BeerService };
