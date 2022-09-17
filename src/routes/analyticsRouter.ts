import { Router } from "express";
import getPageViews from "../controllers/analyticsController";
import asyncHandler from "../middleware/asyncHandler";

const router = Router();

// router.post("/collect/pageViews", asyncHandler(analyticsController));

router.get("/pageViews/:id", asyncHandler(getPageViews));

export default router;
