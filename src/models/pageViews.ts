import mongoose from "mongoose";

export interface IPageView {
  page: string;
  country: string;
  browser: string;
  pageActivity: PageActivity;
  user: User;
}

interface User {
  returnUser: number;
  uniqueUser: number;
  viewRate?: string;
}

interface PageActivity {
  startDate: Date;
  endDate: Date;
}

const PageViewsSchema = new mongoose.Schema<IPageView>(
  {
    page: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    browser: {
      type: String,
      required: true,
    },
    pageActivity: {
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
    },
    user: {
      returnUser: { type: Number },
      uniqueUser: { type: Number },
    },
  },
  {
    versionKey: false,
  }
);

const PageViews = mongoose.model<IPageView>("PageViews", PageViewsSchema);

export default PageViews;
