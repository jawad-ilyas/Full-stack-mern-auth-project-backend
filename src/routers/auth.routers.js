import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controller.js";


const router = Router();


router.route("/signUp").post(signUp);
router.route("/signIn").post(signIn);



export default router;