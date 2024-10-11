import { Router } from "express";
import { getUsers } from "../controllers/users.controller.js";


const router = Router();


router.route("/getusers").get(getUsers)


export default router;