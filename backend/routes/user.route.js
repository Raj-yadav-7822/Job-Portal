import express from "express";
import { login, logout, register,  updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";
import wrapAsyncHandler from "../utils/wrapAsync.js";
const router = express.Router();

router.route("/register").post(singleUpload,wrapAsyncHandler(register) );
router.route("/login").post(wrapAsyncHandler(login));
router.route("/logout").get( wrapAsyncHandler(logout))
router.route("/profile/update").post(
  isAuthenticated, 
  singleUpload, 
  wrapAsyncHandler(updateProfile) 
)

export default router;