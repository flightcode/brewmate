import { Request, Response } from "express";
import Beer from "../schemas/beer";

export function getAll(req: Request, res: Response) {
  Beer.find({})
    .then((data) => res.status(200).json(data))
    .catch(() => res.status(500));
}

export function getById(req: Request, res: Response) {
  Beer.findById(req.params.id)
    .then((data) => res.status(200).json(data))
    .catch(() => res.status(500));
}

export function add(req: Request, res: Response) {
  if (req.body.name && req.body.type) {
    Beer.create(req.body)
      .then((data) => res.status(200).json(data))
      .catch(() => res.status(500));
  } else {
    return res.status(422).json({ fields: "incomplete" });
  }
}

export function remove(req: Request, res: Response) {
  if (req.body.id) {
    Beer.findByIdAndDelete({ _id: req.params.id })
      .then((data) => res.status(200).json(data))
      .catch(() => res.status(500));
  } else {
    return res.status(422).json({ fields: "incomplete" });
  }
}
