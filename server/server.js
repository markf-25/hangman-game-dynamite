import express from "express";
import cors from "cors";
import { databaseUrl, localizedApi } from "../src/config.js";

const app = express();
const PORT = 5000;

app.use(cors());

app.get("/api/word", async (req, res) => {
  const lang = req.query.lang || "eng";
  const targetUrl = localizedApi[lang] || localizedApi["eng"];

  try {
    const response = await fetch(targetUrl);
    const data = await response.json();
        if (response.ok) {
          
          let word;
            switch (lang) {
                case "eng":
                    word= data[0]
                    break;
                case "ita":
                    word= data[0].word
                    break;
                default:
                    word = data[0];
                }

                    res.json(word);
        }
  } catch (error) {
    console.error("Errore nel proxy:", error);
    res.status(500).json({ error: "Errore nel proxy" });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy attivo su ${databaseUrl}`);
});