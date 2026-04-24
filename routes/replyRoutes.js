import express from "express";
import { generateReply ,saveReply ,getUserReplies,deleteReply , updateReply} from "../controller/replyController.js"
import { verifyToken } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/generate-reply", generateReply);
router.post("/save", verifyToken, saveReply);
router.get("/replies", verifyToken, getUserReplies);
router.delete("/delete/:id", verifyToken, deleteReply);
router.put("/update/:id", verifyToken, updateReply);

export default router;