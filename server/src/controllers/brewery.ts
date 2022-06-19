import { Request, Response } from "express";
import APIError from "../utils/error";
import Brewery from "../schemas/brewery";

export function getAll(req: Request, res: Response) {
  Brewery.find({})
    .then((data) => res.status(200).json(data))
    .catch((err: Error) => {
      return new APIError("InternalError", err.message).sendResponse(res);
    });
}

export function getById(req: Request, res: Response) {
  Brewery.findById(req.params.id)
    .then((data) => res.status(200).json(data))
    .catch((err: Error) => {
      return new APIError("InternalError", err.message).sendResponse(res);
    });
}

export function add(req: Request, res: Response) {
  if (req.body.name) {
    Brewery.create(req.body)
      .then((data) => res.status(200).json(data))
      .catch((err: Error) => {
        return new APIError("InternalError", err.message).sendResponse(res);
      });
  } else {
    return new APIError("UnprocessableError", "Fields incomplete").sendResponse(
      res
    );
  }
}

export function remove(req: Request, res: Response) {
  if (req.body.id) {
    Brewery.findByIdAndDelete({ _id: req.params.id })
      .then((data) => res.status(200).json(data))
      .catch((err: Error) => {
        return new APIError("InternalError", err.message).sendResponse(res);
      });
  } else {
    return new APIError("UnprocessableError", "Fields incomplete").sendResponse(
      res
    );
  }
}
