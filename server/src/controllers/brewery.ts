import { Request, Response } from "express";
import APIError from "../utils/error";
import { AuthenticatedRequest } from "../utils/auth";
import { TBrewery } from "../models/brewery";
import Brewery from "../schemas/brewery";

export function getAll(req: Request, res: Response) {
  Brewery.find({})
    .then((data) => res.status(200).json(data))
    .catch((err: Error) => {
      return new APIError("InternalError", err.message).sendResponse(res);
    });
}

export function getById(req: Request, res: Response) {
  const id = req.params;

  Brewery.findById(id)
    .then((data) => res.status(200).json(data))
    .catch((err: Error) => {
      return new APIError("InternalError", err.message).sendResponse(res);
    });
}

export function getByCountry(req: Request, res: Response) {
  const country = req.params;

  Brewery.find({ country: { $regex: ".*" + country + ".*" } })
    .then((data) => res.status(200).json(data))
    .catch((err: Error) => {
      return new APIError("InternalError", err.message).sendResponse(res);
    });
}

export function getByName(req: Request, res: Response) {
  const name = req.params;

  Brewery.find({ name: { $regex: ".*" + name + ".*" } })
    .then((data) => res.status(200).json(data))
    .catch((err: Error) => {
      return new APIError("InternalError", err.message).sendResponse(res);
    });
}

export function add(req: Request, res: Response) {
  // const authReq = req as AuthenticatedRequest;
  const { name, region, country } = req.body;

  // Check fields
  if (!name) {
    return new APIError(
      "UnprocessableError",
      "Required fields incomplete"
    ).sendResponse(res);
  }

  const brewery = new Brewery({
    name,
    region,
    country,
  });

  brewery
    .save()
    .then((data: TBrewery) => {
      return res.status(200).json(data);
    })
    .catch((err: Error) => {
      return new APIError("InternalError", err.message).sendResponse(res);
    });
}

export async function update(req: Request, res: Response) {
  const authReq = req as AuthenticatedRequest;
  const { id } = req.params;
  const { name, region, country } = req.body;

  // Check permissions
  if (authReq.authLevel !== "admin" && authReq.authLevel !== "moderator") {
    return new APIError(
      "ForbiddenError",
      "User AuthLevel not admin or moderator"
    ).sendResponse(res);
  }

  // Check fields
  if (!name && !region && !country) {
    return new APIError("UnprocessableError", "Fields empty").sendResponse(res);
  }

  const brewery = await Brewery.findById(id);

  // Update name
  if (name) {
    brewery.name = name;
  }
  // Update region
  if (region) {
    brewery.region = region;
  }
  // Update country
  if (country) {
    brewery.country = country;
  }

  brewery
    .save()
    .then((data: TBrewery) => {
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

  Brewery.findByIdAndDelete(id)
    .then((data: TBrewery) => res.status(200).json(data))
    .catch((err: Error) => {
      return new APIError("InternalError", err.message).sendResponse(res);
    });
}
