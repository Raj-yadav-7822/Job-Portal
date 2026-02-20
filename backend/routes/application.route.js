import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import wrapAsyncHandler from "../utils/wrapAsync.js";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controller.js";

const router = express.Router();

// Student applies to a job
router.route("/apply/:id").post( isAuthenticated, wrapAsyncHandler(applyJob));

// Student fetches all applied jobs
router.route("/get").get(isAuthenticated, wrapAsyncHandler(getAppliedJobs));

// Admin fetches all applicants for a job
router.route("/:id/applicants").get( isAuthenticated, wrapAsyncHandler(getApplicants));

// Admin updates application status
router.route("/status/:id/update").post( isAuthenticated, wrapAsyncHandler(updateStatus));

export default router;
