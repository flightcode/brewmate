import { Request, Response } from "express";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import APIError from "../utils/error";
import { AuthenticatedRequest } from "../utils/auth";
import { TBeer, TReview } from "../types/beer";
import Beer from "../schemas/beer";
import Brewery from "../schemas/brewery";

dayjs.extend(utc);

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

export function getRating(req: Request, res: Response) {
  const { id } = req.params;

  // Check id
  if (!ObjectId.isValid(id)) {
    return new APIError("UnprocessableError", "ID invalid").sendResponse(res);
  }

  Beer.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(id) } },
    { $unwind: "$reviews" },
    {
      $group: {
        _id: new mongoose.Types.ObjectId(id),
        average: { $avg: "$reviews.rating" },
      },
    },
  ])
    .then((data) => res.status(200).json(data))
    .catch((err: Error) => {
      return new APIError("InternalError", err.message).sendResponse(res);
    });
}

export async function add(req: Request, res: Response) {
  const authReq = req as AuthenticatedRequest;
  const { name, brewery, type, hops, malts, abv, ibu } = authReq.body;

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

export async function update(req: Request, res: Response) {
  const authReq = req as AuthenticatedRequest;
  const { id } = authReq.params;
  const { name, brewery, type, hops, malts, abv, ibu } = authReq.body;

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
  const beer = await Beer.findById(id);
  if (!beer) {
    return new APIError(
      "UnprocessableError",
      "Beer does not exist"
    ).sendResponse(res);
  }

  // Check fields
  if (!name && !brewery && !type && !hops && !malts && !abv && !ibu) {
    return new APIError("UnprocessableError", "Fields empty").sendResponse(res);
  }

  // Update name
  if (name) {
    beer.name = name;
  }

  // Update Brewery
  if (brewery) {
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

    beer.brewery = brewery;
  }

  // Update type
  if (type) {
    beer.type = type;
  }

  // Update ABV
  if (abv) {
    const numABV = Number(abv);
    if (isNaN(numABV) || numABV < 0 || numABV > 100) {
      return new APIError("UnprocessableError", "ABV invalid").sendResponse(
        res
      );
    }

    beer.abv = abv;
  }

  // Update IBU
  if (ibu) {
    const numIBU = Number(ibu);
    if (isNaN(numIBU) || numIBU < 0 || numIBU > 100) {
      return new APIError("UnprocessableError", "IBU invalid").sendResponse(
        res
      );
    }

    beer.ibu = ibu;
  }

  // Update Hops
  if (hops) {
    const arrHops = Array.isArray(hops) ? hops : [hops];
    beer.hops = arrHops;
  }

  // Update Malts
  if (malts) {
    const arrMalts = Array.isArray(malts) ? malts : [malts];
    beer.malts = arrMalts;
  }

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
  const { id } = authReq.params;

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

export async function addReview(req: Request, res: Response) {
  const authReq = req as AuthenticatedRequest;
  const { id } = authReq.params;
  const { date, rating, descriptors } = authReq.body;

  // Check required fields
  if (isNaN(rating) && rating !== 0 && rating !== 0.5 && rating !== 1) {
    return new APIError("UnprocessableError", "Rating invalid").sendResponse(
      res
    );
  }

  // Check id
  if (!ObjectId.isValid(id)) {
    return new APIError("UnprocessableError", "ID invalid").sendResponse(res);
  }
  const beer = await Beer.findById(id);
  if (!beer) {
    return new APIError(
      "UnprocessableError",
      "Beer does not exist"
    ).sendResponse(res);
  }

  let dateTasted: dayjs.Dayjs;
  if (date) {
    dateTasted = dayjs(date).utc();
  } else {
    dateTasted = dayjs().utc();
  }

  const arrDescriptors = Array.isArray(descriptors)
    ? descriptors
    : [descriptors];

  const review: TReview = {
    user: authReq.userId as never,
    date: dateTasted.toDate(),
    rating,
    descriptors: arrDescriptors,
  };

  beer
    .updateOne({
      $push: { reviews: review },
    })
    .then(() => {
      return res.status(200).json(review);
    })
    .catch((err: Error) => {
      return new APIError("InternalError", err.message).sendResponse(res);
    });
}

export async function removeReview(req: Request, res: Response) {
  const authReq = req as AuthenticatedRequest;
  const { id, review } = authReq.params;

  // Check id
  if (!ObjectId.isValid(id)) {
    return new APIError("UnprocessableError", "ID invalid").sendResponse(res);
  }
  const beer = await Beer.findById(id);
  if (!beer) {
    return new APIError(
      "UnprocessableError",
      "Beer does not exist"
    ).sendResponse(res);
  }

  beer
    .updateOne({
      $pull: { reviews: { _id: review } },
    })
    .then(() => {
      return res.status(200).send();
    })
    .catch((err: Error) => {
      return new APIError("InternalError", err.message).sendResponse(res);
    });
}
