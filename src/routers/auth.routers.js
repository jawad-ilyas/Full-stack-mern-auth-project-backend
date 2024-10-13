import { Router } from "express";
import { google, logout, signIn, signUp } from "../controllers/auth.controller.js";


const router = Router();


router.route("/signUp").post(signUp);
router.route("/signIn").post(signIn);
router.route("/google").post(google)
router.route("/logout").post(logout)
export default router;