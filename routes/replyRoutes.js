import express from "express";
import { generateReply } from "../controller/replyController.js"
import { verifyToken } from "../middleware/authMiddleware.js";
import { saveReply } from "../controllers/replyController.js";


const router = express.Router();

router.post("/generate-reply", generateReply);
router.post("/save", verifyToken, saveReply);

export default router;