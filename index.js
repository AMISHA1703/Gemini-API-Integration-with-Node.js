const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const app = express();
app.use(express.json());
app.use(bodyparser.json());



const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const prompt = "Explain how AI works";
async function generate(prompt) {
    try {
        const result = await model.generateContent(prompt);
        return result.response.text()
    }
    catch (err) {
        console.log(err);
    }
}
app.get("/", (req, res) => {
    res.send("Hello! Gemimi");

})
app.get("/api/content",  async(req, res) => {
    try {
        const data = req.body.question;
        const result = await generate(data);
        res.send({
            "result":result
        })

    }
    catch (err) {
        res.send(`error ${err}`);

    }

})
app.listen(3000, () => {
    console.log("server is running");

})
