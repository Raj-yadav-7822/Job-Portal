import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js";
import { singleUpload } from "../middlewares/multer.js";
import wrapAsyncHandler from "../utils/wrapAsync.js";

const router = express.Router();

// Register new company
router.route("/register").post(isAuthenticated, wrapAsyncHandler(registerCompany));

// Get all companies of logged-in user
router.route("/get").get(isAuthenticated, wrapAsyncHandler(getCompany));

// Get company by ID
router.route("/get/:id").get(isAuthenticated, wrapAsyncHandler(getCompanyById));

// Update company
router.route("/update/:id").put(isAuthenticated, singleUpload, wrapAsyncHandler(updateCompany));

export default router;
