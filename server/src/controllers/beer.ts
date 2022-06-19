import { Request, Response } from "express";
import APIError from "../utils/error";
import Beer from "../schemas/beer";

export function getAll(req: Request, res: Response) {
  Beer.find({})
    .then((data) => res.status(200).json(data))
    .catch((err: Error) => {
      return new APIError("InternalError", err.message).sendResponse(res);
    });
}

export function getById(req: Request, res: Response) {
  Beer.findById(req.params.id)
    .then((data) => res.status(200).json(data))
    .catch((err: Error) => {
      return new APIError("InternalError", err.message).sendResponse(res);
    });
}

export function add(req: Request, res: Response) {
  if (req.body.name && req.body.type) {
    Beer.create(req.body)
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
    Beer.findByIdAndDelete({ _id: req.params.id })
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
