import { Router } from "express";
import {
  getPageViewsById,
  getPageViewsActivity,
  getPageViewsByCountryOrBrowser,
  postPageViews,
  getPageViewsUserRate,
} from "../controllers/analyticsController";
import asyncHandler from "../middleware/asyncHandler";

const router = Router();

router.post("/collect", asyncHandler(postPageViews));

router.get("/pageActivity", asyncHandler(getPageViewsActivity));

router.get("/userRate", asyncHandler(getPageViewsUserRate));

router.get("/:id", asyncHandler(getPageViewsById));

router.get("/", asyncHandler(getPageViewsByCountryOrBrowser));

export default router;
