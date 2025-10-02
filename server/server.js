import express from "express";
import cors from "cors";
import config from "../src/config.js";

const app = express();
const PORT = 5000;

app.use(cors());

app.get("/api/word", async (req, res) => {
  const lang = req.query.lang || "eng";
  const targetUrl = config.api.languages[lang] || config.api.languages.eng;

  try {
    const response = await fetch(targetUrl);
    const data = await response.json();
        if (response.ok) {
          /*const word = Array.isArray(data) ? data[0].word : data.word;*/
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

          console.log("Fetched word BE:", word);
          res.json(word);
        }
  } catch (error) {
    console.error("Errore nel proxy:", error);
    res.status(500).json({ error: "Errore nel proxy" });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy attivo su ${config.api.backend}`);
});