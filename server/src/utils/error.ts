import { Response } from "express";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

/**
 * ErrorResponse instance, including logMessage
 */
export type ErrorResponse = Response & { logMessage?: string };

/**
 * Check if obj is ErrorResponse
 *
 * @param obj
 * @returns obj is ErrorResponse
 */
export function instanceOfErrorResponse(
  obj: Response | ErrorResponse
): obj is ErrorResponse {
  return "logMessage" in obj;
}

/**
 * API Error
 */
export default class APIError {
  status: number; // HTTP Status Code
  message: string;
  detail: string; // Message parsed in Response
  logMessage?: string; // Message parsed in log
  source: string; // Request source

  constructor(type: ErrorType, logMessage?: string) {
    const data = errors[type];
    this.status = data.status;
    this.message = data.message;
    this.detail = data.detail;
    this.logMessage = logMessage;
  }

  sendResponse(res: Response) {
    const finalRes = res as ErrorResponse;
    finalRes.logMessage = this.logMessage;

    finalRes
      .status(this.status)
      .send({ message: this.message, detail: this.detail });
  }
}

/**
 * Different ErrorTypes for API
 */
export type ErrorType =
  | "BadRequestError"
  | "UnauthorizedError"
  | "ForbiddenError"
  | "NotFoundError"
  | "UnprocessableError"
  | "InternalError";

/**
 * Data for each ErrorType
 */
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
