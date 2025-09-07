import {useContext, useEffect} from "react"
import WordLetter from "../WordLetter/WordLetter"
import styles from "./Word.module.css"
import {GameContext} from "../../context/GameProvider"
import { MAXERRORS } from "../../utils/constants.js"

const Word = () => {

    const { word, userGuesses, setErrors } = useContext(GameContext)

    const wordToGuess = [...word]

    const wrongGuesses = userGuesses.filter(
    (letter) => letter !== " " && !wordToGuess.includes(letter)
    )

    const youLose = wrongGuesses.length === MAXERRORS

    const allGuessed = word && wordToGuess.every(char => userGuesses.includes(char))

    const yourTurnIsOver = () => {
        if(youLose){
            window.alert(`HAI PERSO, SCEMO! La parola era ${word}`)
        }
        if(allGuessed){
            window.alert("HAI VINTO, MA RESTI SCEMO!")
        }

        window.location.reload();

        //Mostrare se hai vinto o perso, poi salvare il punteggio, e caricare un'altra parola. Arrivati all'ultima parola, mostrare la classifica finale
    }

    useEffect(() => {
        if(youLose || allGuessed) {
            yourTurnIsOver()
        }
    setErrors(wrongGuesses.length)
    }, [userGuesses])

    return <>
    <div className={styles.word_wrapper}>
        {wordToGuess.map(letter => (
            <WordLetter letter={letter}/>
        ))}
    </div>
    </>
}

export default Word