import { localizedApi } from "../src/config.js";

export default async function handler(req, res) {
  const { lang = "en" } = req.query;
  const targetUrl = localizedApi[lang] || localizedApi["en"];

  try {
    const response = await fetch(targetUrl);
    const data = await response.json();

    let word;
    switch (lang) {
      case "en":
        word = data[0];
        break;
      case "it":
        word = data[0].word;
        break;
      default:
        word = data[0];
    }

    res.status(200).json(word);
  } catch (error) {
    console.error("Errore nel proxy:", error);
    res.status(500).json({ error: "Errore nel proxy" });
  }
}