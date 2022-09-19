import { Router } from "express";
import {
  getPageViewsById,
  getPageViewsActivity,
  getPageViewsByCountryOrBrowser,
  postPageViews,
  getPageViewsUserRate,
} from "../controllers/analyticsController";
import asyncHandler from "../middleware/asyncHandler";
import auth from "../middleware/auth";

const router = Router();

router.use(auth)

router.post("/collect", asyncHandler(postPageViews));

router.get("/pageActivity", asyncHandler(getPageViewsActivity));

router.get("/userRate", asyncHandler(getPageViewsUserRate));

router.get("/:id", asyncHandler(getPageViewsById));

router.get("/", asyncHandler(getPageViewsByCountryOrBrowser));

export default router;
