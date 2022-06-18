import { Request, Response } from "express";
import chalk from "chalk";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

/**
 * API Error
 */
export default class APIError {
  status: number; // HTTP Status Code
  message: string;
  detail: string; // Message parsed in Response
  logMessage?: string; // Message parsed in log
  source: string; // Request source

  constructor(type: ErrorType, req: Request, logMessage?: string) {
    const data = errors[type];
    this.status = data.status;
    this.message = data.message;
    this.detail = data.detail;
    this.logMessage = logMessage;
    this.source = `${req.method}:${req.originalUrl}`;
  }

  sendResponse(res: Response) {
    // Log in console/file
    const currentDate = dayjs().utc().format("YYYY-MM-DD HH:mm:ss");
    const log = chalk.red(
      `[${currentDate}] ${this.source} ${this.status} - ${this.logMessage}`
    );
    console.log(log);

    res
      .status(this.status)
      .send({ message: this.message, detail: this.detail });
  }
}

export type ErrorType =
  | "BadRequestError"
  | "UnauthorizedError"
  | "ForbiddenError"
  | "NotFoundError"
  | "UnprocessableError"
  | "InternalError";

const errors: {
  [key in ErrorType]: { message: string; detail: string; status: number };
} = {
  BadRequestError: {
    message: "Bad Request",
    detail: "The server cannot the request due to a client error.",
    status: 400,
  },
  UnauthorizedError: {
    message: "Unauthorized",
    detail: "The request requires user authentication.",
    status: 401,
  },
  ForbiddenError: {
    message: "Forbidden",
    detail:
      "The user does not have privileges to access the requested content.",
    status: 403,
  },
  NotFoundError: {
    message: "Not Found",
    detail: "The requested resource could not be found.",
    status: 404,
  },
  UnprocessableError: {
    message: "Unprocessable Entity",
    detail:
      "The request was well-formed but was unable to be followed due to semantic errors.",
    status: 422,
  },
  InternalError: {
    message: "Internal Server Error",
    detail:
      "The server encountered an unexpected condition which prevented it from fulfilling the request.",
    status: 500,
  },
};
