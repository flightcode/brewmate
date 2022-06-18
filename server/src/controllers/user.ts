import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validate from "deep-email-validator";
import { AuthenticatedRequest } from "../utils/auth";
import { checkStrength } from "../utils/passwordStrength";
import User from "../schemas/user";
import APIError from "../utils/error";

export function getSelf(req: Request, res: Response) {
  const authReq = req as AuthenticatedRequest;

  User.findById(authReq.userId, "-password")
    .then((data) => res.status(200).json(data))
    .catch(() => res.status(500));
}

export function logIn(req: Request, res: Response) {
  const { email, password } = req.body;

  // Check fields
  if (!email || !password) {
    return new APIError(
      "UnprocessableError",
      req,
      "Credentials incomplete"
    ).sendResponse(res);
  }

  // Check user exists
  User.findOne({ email }).then((data) => {
    if (!data) {
      return new APIError(
        "UnprocessableError",
        req,
        "User doesn't exist"
      ).sendResponse(res);
    }

    // Check password correct
    bcrypt.compare(password, data.password).then((isMatch) => {
      if (!isMatch) {
        return new APIError(
          "UnprocessableError",
          req,
          "Password incorrect"
        ).sendResponse(res);
      }

      // Sign JWT
      jwt.sign(
        { id: data._id },
        process.env.TOKEN_SECRET,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) {
            return new APIError("InternalError", req, err.message).sendResponse(
              res
            );
          }

          if (token) {
            return res.status(200).json({ token: `${token}` });
          }
        }
      );
    });
  });
}

export async function register(req: Request, res: Response) {
  const { name, email, password } = req.body;

  // Check fields
  if (!name || !email || !password) {
    return new APIError(
      "UnprocessableError",
      req,
      "Credentials incomplete"
    ).sendResponse(res);
  }

  // Check email valid
  const emailCheck = await validate({
    email: email,
    validateRegex: true,
    validateMx: true,
    validateTypo: false,
    validateDisposable: false,
    validateSMTP: false,
  });
  if (!emailCheck.valid) {
    return new APIError(
      "UnprocessableError",
      req,
      "Email invalid"
    ).sendResponse(res);
  }

  // Check password strength
  const passwordStrength = checkStrength(password);
  console.log(passwordStrength);
  if (!passwordStrength.strong) {
    return new APIError(
      "UnprocessableError",
      req,
      "Password weak"
    ).sendResponse(res);
  }

  // Check user doesn't already exist
  if (await User.exists({ name })) {
    return new APIError(
      "UnprocessableError",
      req,
      "Username already exists"
    ).sendResponse(res);
  }
  if (await User.exists({ email })) {
    return new APIError(
      "UnprocessableError",
      req,
      "Email already exists"
    ).sendResponse(res);
  }

  const user = new User({
    name,
    email,
    password,
  });

  // Encrypt password
  user.password = await bcrypt.hash(user.password, 10);

  user
    .save()
    .then(() => {
      return res.status(200).send();
    })
    .catch((err: Error) => {
      return new APIError("InternalError", req, err.message).sendResponse(res);
    });
}
