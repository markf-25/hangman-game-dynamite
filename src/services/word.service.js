import { t } from "i18next";

export const getWord = async () => {
  try {
    const apiUrl = t("api.url");

    const response = await fetch(`${apiUrl}&words=1`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Fetched word:", data[0].word);
      return data[0].word.toUpperCase();
    }
  } catch (error) {
    console.error(error);
  }
};
