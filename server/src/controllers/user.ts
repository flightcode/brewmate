import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validate from "deep-email-validator";
import APIError from "../utils/error";
import { AuthenticatedRequest } from "../utils/auth";
import { checkStrength } from "../utils/passwordStrength";
import { TUser } from "../types/user";
import User from "../schemas/user";

export function getSelf(req: Request, res: Response) {
  const authReq = req as AuthenticatedRequest;

  User.findById(authReq.userId, "-password")
    .then((data: TUser) => res.status(200).json(data))
    .catch((err: Error) => {
      return new APIError("InternalError", err.message).sendResponse(res);
    });
}

export async function updateSelf(req: Request, res: Response) {
  const authReq = req as AuthenticatedRequest;
  const { name, email, password } = req.body;

  // Check fields
  if (!name && !email && !password) {
    return new APIError("UnprocessableError", "Credentials empty").sendResponse(
      res
    );
  }

  const user = await User.findById(authReq.userId);

  // Update name
  if (name) {
    // Check name doesn't already exist
    if (await User.exists({ name })) {
      return new APIError(
        "UnprocessableError",
        "Username already exists"
      ).sendResponse(res);
    }

    user.name = name;
  }

  // Update email
  if (email) {
    // Check email doesn't already exist
    if (await User.exists({ email })) {
      return new APIError(
        "UnprocessableError",
        "Email already exists"
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
      return new APIError("UnprocessableError", "Email invalid").sendResponse(
        res
      );
    }

    user.email = email;
  }

  // Update password
  if (password) {
    // Check password strength
    const passwordStrength = checkStrength(password);
    if (!passwordStrength.strong) {
      return new APIError("UnprocessableError", "Password weak").sendResponse(
        res
      );
    }

    // Encrypt password
    user.password = await bcrypt.hash(password, 10);
  }

  user
    .save()
    .then(() => {
      return res.status(200).send();
    })
    .catch((err: Error) => {
      return new APIError("InternalError", err.message).sendResponse(res);
    });
}

export async function deleteSelf(req: Request, res: Response) {
  const authReq = req as AuthenticatedRequest;

  User.findByIdAndDelete(authReq.userId)
    .then(() => res.status(200).send())
    .catch((err: Error) => {
      return new APIError("InternalError", err.message).sendResponse(res);
    });
}

export function logIn(req: Request, res: Response) {
  const { email, password } = req.body;

  // Check fields
  if (!email || !password) {
    return new APIError(
      "UnprocessableError",
      "Credentials incomplete"
    ).sendResponse(res);
  }

  // Check user exists
  User.findOne({ email }).then((data) => {
    if (!data) {
      return new APIError(
        "UnprocessableError",
        "User doesn't exist"
      ).sendResponse(res);
    }

    // Check password correct
    bcrypt.compare(password, data.password).then((isMatch) => {
      if (!isMatch) {
        return new APIError(
          "UnprocessableError",
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
            return new APIError("InternalError", err.message).sendResponse(res);
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
    return new APIError("UnprocessableError", "Email invalid").sendResponse(
      res
    );
  }

  // Check password strength
  const passwordStrength = checkStrength(password);
  if (!passwordStrength.strong) {
    return new APIError("UnprocessableError", "Password weak").sendResponse(
      res
    );
  }

  // Check user doesn't already exist
  if (await User.exists({ name })) {
    return new APIError(
      "UnprocessableError",
      "Username already exists"
    ).sendResponse(res);
  }
  if (await User.exists({ email })) {
    return new APIError(
      "UnprocessableError",
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
      return new APIError("InternalError", err.message).sendResponse(res);
    });
}
