import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateReply = async (req, res) => {
  try {
    const { emailText, tone } = req.body;

    if (!emailText) {
      return res.status(400).json({
        success: false,
        message: "Email text required",
      });
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
    console.log(error);

    return res.status(500).json({ success: false,message: "AI generation failed",});
  }
};