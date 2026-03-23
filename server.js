import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
        });

        const result = await model.generateContent(message);
        const response = await result.response;

        res.json({ reply: response.text() });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            reply: "⚠️ Server error, try again later"
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});