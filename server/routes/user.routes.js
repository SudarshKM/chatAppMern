import { Router } from "express";

import * as userController from "../controllers/user.controller.js";
import protectRoute from  '../middleware/protectRoute.js'

const router = Router();

router.get("/",protectRoute , userController.getUsersForSidebar);
router.post("/login", userController.getUsersForSidebar);
router.post("/logout", userController.getUsersForSidebar);


export default router;
