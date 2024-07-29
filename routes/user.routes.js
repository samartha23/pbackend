import express from "express";
import {
  addFollower,
  getAllFollowerFollowing,
  getAllUsers,
  getUserByUsername,
  primaryDetails,
  removeFollower,
  searchUsersByUsername,
} from "../controllers/user.controller.js";
import { auth } from "../middleware/auth.js";
import {
  chnagePasssword,
  deleteGithub,
  getAccessTokenGithub,
  login,
  sendVerificationEmail,
  signup,
  verifyOtp,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/removegithub", auth, deleteGithub);
router.post("/follow/:followerId", auth, addFollower);
router.post("/unfollow/:followerId", auth, removeFollower);
router.post("/send-verification-email", auth, sendVerificationEmail);
router.post("/verify-otp", auth, verifyOtp);

router.get("/getToken", auth, getAccessTokenGithub);
router.get("/", getAllUsers);
router.get("/allfollow/:username", getAllFollowerFollowing);
router.get("/search/", searchUsersByUsername);
router.get("/:username", getUserByUsername);

router.patch("/", auth, primaryDetails);
router.patch("/chnage-password", auth, chnagePasssword);

export default router;
