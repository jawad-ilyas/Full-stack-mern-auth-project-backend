import { Router } from "express";
import { google, signIn, signUp } from "../controllers/auth.controller.js";


const router = Router();


router.route("/signUp").post(signUp);
router.route("/signIn").post(signIn);
router.route("/google").post(google)
export default router;