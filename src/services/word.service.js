import { englishWord } from "../config.js"

export const getWord = async () => {
    try {

        const response = await fetch(`${englishWord}&words=1`, {
            method: "GET",
            headers: {'Content-Type': 'application/json'},
        })
        const data = await response.json();

        if (response.ok) {
            console.log("dataaaaa1", data[0].word)
            return data[0].word.toUpperCase()
        }
    } catch (error) {
        console.error(error);
    }
}