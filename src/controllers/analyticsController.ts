import { Request, Response } from "express";

const getPageViews = async ({ body }: Request, res: Response) => {
  res.send({ data: "Hello" });
};

export default getPageViews;
