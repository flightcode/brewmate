import { Request, Response, NextFunction } from "express";
import chalk from "chalk";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import APIError from "./error";

dayjs.extend(utc);

/**
 * Middleware function to handle error. Logs to console/file, and sends appropriate response.
 *
 * @param err Error
 * @param req Request
 * @param res Response
 * @param _next Function to call after log
 */
const errorHandler = (
  err: TypeError | APIError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Convert err to APIError
  let apiError: APIError;
  if (!(err instanceof APIError)) {
    apiError = new APIError("InternalError", req, err.message);
  } else {
    apiError = err;
  }

  // Log in console/file
  console.log();
  const currentDate = dayjs().utc().format("YYYY-MM-DD HH:mm:ss");
  const log = chalk.red(
    `[${currentDate}] ${apiError.source} ${apiError.status} - ${apiError.logMessage}`
  );
  console.log(log);

  // Send Response
  res
    .status(apiError.status)
    .send({ message: apiError.message, detail: apiError.detail });
};

export default errorHandler;
