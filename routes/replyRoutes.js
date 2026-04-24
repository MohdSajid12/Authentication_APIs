import express from "express";
import { generateReply ,saveReply } from "../controller/replyController.js"
import { verifyToken } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/generate-reply", generateReply);
router.post("/save", verifyToken, saveReply);

export default router;