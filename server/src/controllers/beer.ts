import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { AuthenticatedRequest } from "../utils/auth";
import APIError from "../utils/error";
import { TBeer } from "../models/beer";
import Beer from "../schemas/beer";
import Brewery from "../schemas/brewery";

export function getAll(req: Request, res: Response) {
  Beer.find({})
    .populate("brewery")
    .then((data) => res.status(200).json(data))
    .catch((err: Error) => {
      return new APIError("InternalError", err.message).sendResponse(res);
    });
}

export function getById(req: Request, res: Response) {
  const { id } = req.params;

  // Check id
  if (!ObjectId.isValid(id)) {
    return new APIError("UnprocessableError", "ID invalid").sendResponse(res);
  }

  Beer.findById(id)
    .populate("brewery")
    .then((data) => res.status(200).json(data))
    .catch((err: Error) => {
      return new APIError("InternalError", err.message).sendResponse(res);
    });
}

export function getByName(req: Request, res: Response) {
  const { name } = req.params;

  Beer.find({ name: { $regex: name, $options: "i" } })
    .populate("brewery")
    .then((data) => res.status(200).json(data))
    .catch((err: Error) => {
      return new APIError("InternalError", err.message).sendResponse(res);
    });
}

export function getByType(req: Request, res: Response) {
  const { type } = req.params;

  Beer.find({ type })
    .populate("brewery")
    .then((data) => res.status(200).json(data))
    .catch((err: Error) => {
      return new APIError("InternalError", err.message).sendResponse(res);
    });
}

export async function add(req: Request, res: Response) {
  const { name, brewery, type, hops, malts, abv, ibu } = req.body;

  // Check required fields
  if (!name || !type) {
    return new APIError(
      "UnprocessableError",
      "Required fields incomplete"
    ).sendResponse(res);
  }

  // Check brewery
  if (!ObjectId.isValid(brewery)) {
    return new APIError(
      "UnprocessableError",
      "Brewery ID invalid"
    ).sendResponse(res);
  }

  const breweryObj = await Brewery.findById(brewery);
  if (!breweryObj) {
    return new APIError(
      "UnprocessableError",
      "Brewery does not exist"
    ).sendResponse(res);
  }

  // Check number fields
  const numABV = Number(abv);
  const numIBU = Number(ibu);
  if (
    isNaN(numABV) ||
    isNaN(numIBU) ||
    numABV < 0 ||
    numABV > 100 ||
    numIBU < 0 ||
    numIBU > 100
  ) {
    return new APIError(
      "UnprocessableError",
      "Numerical fields invalid"
    ).sendResponse(res);
  }

  const arrHops = Array.isArray(hops) ? hops : [hops];
  const arrMalts = Array.isArray(malts) ? malts : [malts];

  const beer = new Beer({
    name,
    brewery,
    type,
    hops: arrHops,
    malts: arrMalts,
    abv: numABV,
    ibu: numIBU,
  });

  beer
    .save()
    .then((data: TBeer) => {
      return res.status(200).json(data);
    })
    .catch((err: Error) => {
      return new APIError("InternalError", err.message).sendResponse(res);
    });
}

export function remove(req: Request, res: Response) {
  const authReq = req as AuthenticatedRequest;
  const { id } = req.params;

  // Check permissions
  if (authReq.authLevel !== "admin" && authReq.authLevel !== "moderator") {
    return new APIError(
      "ForbiddenError",
      "User AuthLevel not admin or moderator"
    ).sendResponse(res);
  }

  // Check id
  if (!ObjectId.isValid(id)) {
    return new APIError("UnprocessableError", "ID invalid").sendResponse(res);
  }

  Beer.findByIdAndDelete(id)
    .then((data: TBeer) => res.status(200).json(data))
    .catch((err: Error) => {
      return new APIError("InternalError", err.message).sendResponse(res);
    });
}
