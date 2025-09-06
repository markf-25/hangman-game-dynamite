import {useContext, useEffect} from "react"
import WordLetter from "../WordLetter/WordLetter"
import styles from "./Word.module.css"
import {GameContext} from "../../context/GameProvider"
import { MAXERRORS } from "../../utils/constants.js"

const Word = ({errors}) => {

    const { word, userGuesses } = useContext(GameContext)

    const wordToGuess = [...word]

    const wrongGuesses = userGuesses.filter(
    (letter) => !wordToGuess.includes(letter)
    )

    const youLose = wrongGuesses.length === MAXERRORS

    useEffect(() => {
        if(youLose) {
        console.log("PERSO")
        /* todo FUNZIONE DI GAME OVER */
    }
    errors(wrongGuesses.length)
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