import mongoose from "mongoose";

const PageViewsSchema = new mongoose.Schema({
  page: {
    type: String,
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
    startDate: { type: Date },
    endDate: { type: Date },
    required: true,
  },
});

const PageViews = mongoose.model("PageViews", PageViewsSchema);

export default PageViews;
