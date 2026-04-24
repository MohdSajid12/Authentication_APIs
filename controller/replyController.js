import OpenAI from "openai";
import Reply from "../models/replyModel.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateReply = async (req, res) => {

  try {
    const { emailText, tone } = req.body;
    console.log(emailText)

    if (!emailText) {
      return res.status(400).json({success: false, message: "Email text required", });
    }

    const prompt = `
        You are a professional email assistant.

        Write a ${tone} email reply for the following message.

        Rules:
        - Keep it clear and concise
        - Maintain proper tone: ${tone}
        - Use professional formatting
        - Do not be too long

        Email:
        "${emailText}"

        Reply:
      `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an expert email writer." },
        { role: "user", content: prompt },
      ],
      max_tokens: 300,
    });

    const reply = response.choices[0].message.content;

    return res.json({ success: true,reply,});

  } catch (error) {

    return res.status(500).json({ success: false,message: error.message,});
  }
};

export const saveReply = async (req, res) => {
  try {
    const { emailText, tone, replyText } = req.body;
    const userId = req.user._id; 

    if (!emailText || !replyText) {
      return res.status(400).json({success: false,message: "Missing data",});
    }

    const newReply = new Reply({ userId,emailText, tone,replyText,});

    await newReply.save();

    return res.json({ success: true,message: "Reply saved successfully",});

  } catch (err) {
    return res.status(500).json({ success: false,message: err.message,});
  }
};

export const getUserReplies = async (req, res) => {
  try {
    const userId = req.user._id;

    const replies = await Reply.find({ userId }).sort({ createdAt: -1 });

    return res.json({
      success: true,
      replies,
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const deleteReply = async (req, res) => {
  try {
    const { id } = req.params;

     await Reply.findByIdAndDelete(id);
     res.json({ success: true, message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const updateReply = async (req, res) => {
  try {
    const { id } = req.params;
    const { replyText } = req.body;

    const updated = await Reply.findByIdAndUpdate(
      id,
      { replyText },
      { new: true }
    );

    res.json({ success: true, reply: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};