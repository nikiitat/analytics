import { Request, Response } from "express";
import PageViews from "../models/pageViews";

const getPageViewsById = async ({ params }: Request, res: Response) => {
  const view = await PageViews.findById({ _id: params.id }).lean();

  res.send({ view });
};

const getPageViewsByCountryOrBrowser = async (
  { query }: Request,
  res: Response
) => {
  if (query.browser) {
    const view = await PageViews.find({ browser: query.browser }).lean();

    res.json(view);
  } else {
    const countries = (query.country as string).split(",");

    const view = await PageViews.find({ country: [...countries] }).lean();

    res.json(view);
  }
};

const getPageViewsActivity = async (req: Request, res: Response) => {
  const startDate = req.query.startDate as string;
  const endDate = req.query.endDate as string;

  const view = await PageViews.find({
    "pageActivity.startDate": {
      $gte: new Date(startDate).toISOString(),
    },
    "pageActivity.endDate": { $lte: new Date(endDate).toISOString() },
  }).lean();

  res.json(view);
};

const getPageViewsUserRate = async (req: Request, res: Response) => {
  const startDate = req.query.startDate as string;
  const endDate = req.query.endDate as string;
  const page = req.query.page as string;

  const views = await PageViews.find({
    page,
    "pageActivity.startDate": {
      $gte: new Date(startDate).toISOString(),
    },
    "pageActivity.endDate": { $lte: new Date(endDate).toISOString() },
  }).lean();

  let sum = 0;
  const userRate = {
    page,
    returnUser: { count: 0, viewRate: "" },
    uniqueUser: { count: 0, viewRate: "" },
  };

  for (const view of views) {
    sum += view.user.returnUser || view.user.uniqueUser;
    view.user.returnUser
      ? (userRate.returnUser.count += view.user.returnUser)
      : (userRate.uniqueUser.count += view.user.uniqueUser);
  }

  userRate.returnUser.viewRate = calculateRate(userRate.returnUser.count, sum);

  userRate.uniqueUser.viewRate = calculateRate(userRate.uniqueUser.count, sum);

  res.json(userRate);
};

const postPageViews = async ({ body }: Request, res: Response) => {
  const {
    pageActivity: { startDate, endDate },
  } = body;

  await PageViews.create({
    ...body,
    pageActivity: {
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
    },
  });
  res.status(201).json({ succes: true });
};

const calculateRate = (num: number, sum: number): string => {
  return String(Math.round((num * 100) / sum)) + "%";
};

export {
  getPageViewsById,
  postPageViews,
  getPageViewsByCountryOrBrowser,
  getPageViewsActivity,
  getPageViewsUserRate,
};
