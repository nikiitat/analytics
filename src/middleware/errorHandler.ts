import { Request, Response, NextFunction } from "express";

export default function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (res.headersSent) {
    return next(err);
  }
  console.log(err);
  return res.status(500).send("Internal server Error");
}
