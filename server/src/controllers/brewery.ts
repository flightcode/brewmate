import { Request, Response } from "express";
import Brewery from "../schemas/brewery";

export function getAll(req: Request, res: Response) {
  Brewery.find({})
    .then((data) => res.status(200).json(data))
    .catch(() => res.status(500));
}

export function getById(req: Request, res: Response) {
  Brewery.findById(req.params.id)
    .then((data) => res.status(200).json(data))
    .catch(() => res.status(500));
}

export function add(req: Request, res: Response) {
  if (req.body.name) {
    Brewery.create(req.body)
      .then((data) => res.status(200).json(data))
      .catch(() => res.status(500));
  } else {
    return res.status(422).json({ fields: "incomplete" });
  }
}

export function remove(req: Request, res: Response) {
  if (req.body.id) {
    Brewery.findByIdAndDelete({ _id: req.params.id })
      .then((data) => res.status(200).json(data))
      .catch(() => res.status(500));
  } else {
    return res.status(422).json({ fields: "incomplete" });
  }
}
