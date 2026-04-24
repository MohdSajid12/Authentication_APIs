import express from "express";
import { generateReply } from "../controllers/replyController.js";

const router = express.Router();

router.post("/generate-reply", generateReply);

export default router;