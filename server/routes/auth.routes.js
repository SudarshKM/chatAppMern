import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";

const router = Router();

router.post("/signup", authController.signUP);
router.post("/login", authController.loginUser);
router.post("/logout", authController.logOut);


export default router;
