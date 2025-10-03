import i18next from "i18next";
import { databaseUrl } from "../config.js";

export const getWord = async () => {
  try {
    const lang = i18next.language || "eng";
    const response = await fetch(`${databaseUrl}?lang=${lang}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    if (response.ok) {
              return data.toUpperCase();
              }


  } catch (error) {
    console.error("Errore getWord:", error);
  }
};
