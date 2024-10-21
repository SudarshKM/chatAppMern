import { Router } from "express";
import * as messageController from "../controllers/message.controller.js";
import protectRoute from  '../middleware/protectRoute.js'
const router = Router();

router.get("/:id",protectRoute , messageController.getMessage);
router.post("/send/:id",protectRoute , messageController.sendMessage);



export default router;
