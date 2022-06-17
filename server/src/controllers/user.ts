import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "../utils/auth";
import User from "../schemas/user";

export function getSelf(req: Request, res: Response) {
  const authReq = req as AuthenticatedRequest;

  User.findOne({ _id: authReq.userId }, "-password")
    .then((data) => res.status(200).json(data))
    .catch(() => res.status(400));
}

export function logIn(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ credentials: "invalid" });
  }

  User.findOne({ email }).then((data) => {
    if (!data) {
      return res.status(422).json({ credentials: "invalid" });
    }

    bcrypt.compare(password, data.password).then((isMatch) => {
      if (!isMatch) {
        return res.status(422).json({ credentials: "invalid" });
      }
      jwt.sign(
        { id: data._id },
        process.env.TOKEN_SECRET,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) {
            return res.status(500).json({ errors: err });
          }

          if (token) {
            return res
              .status(200)
              .json({ message: "success", token: `${token}` });
          }
        }
      );
    });
  });
}

export async function register(req: Request, res: Response) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(422).json({ credentials: "invalid" });
  }

  if (await User.exists({ name })) {
    return res.status(422).json({ credentials: "invalid" });
  }

  if (await User.exists({ email })) {
    return res.status(422).json({ credentials: "invalid" });
  }

  const user = new User({
    name,
    email,
    password,
  });

  user.password = await bcrypt.hash(user.password, 10);

  user
    .save()
    .then(() => {
      return res.status(200).json({
        success: true,
        message: "success",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        errors: err,
      });
    });
}
