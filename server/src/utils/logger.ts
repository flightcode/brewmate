import { Request, Response, NextFunction } from "express";
import chalk from "chalk";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

/**
 * Middleware function to log request to console/file.
 *
 * @param req Request
 * @param res Response
 * @param next Function to call after log
 */
const logger = (req: Request, res: Response, next: NextFunction) => {
  const currentDate = dayjs().utc().format("YYYY-MM-DD HH:mm:ss");
  const method = req.method;
  const url = req.url;
  const status = res.statusCode;
  const log = `[${chalk.blue(currentDate)}] ${method}:${url} ${status}`;
  console.log(log);
  next();
};

export default logger;
