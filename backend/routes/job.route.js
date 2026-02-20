import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  getAdminJobs,
  getAllJobs,
  getJobById,
  postJob,
} from "../controllers/job.controller.js";
import wrapAsyncHandler from "../utils/wrapAsync.js";

const router = express.Router();

// Admin only - create job
router.route("/post").post( isAuthenticated, wrapAsyncHandler(postJob));

// Students / All users - get all jobs, optional keyword search
router.route("/get").get( wrapAsyncHandler(getAllJobs));

// Admin only - get jobs created by logged-in admin
router.route("/getadminjobs").get( isAuthenticated, wrapAsyncHandler(getAdminJobs));
// Get single job by ID
router.route("/get/:id").get( wrapAsyncHandler(getJobById));


export default router;
