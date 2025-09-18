import { useContext, useEffect } from "react"
import { useDispatch } from "react-redux"
import WordLetter from "../WordLetter/WordLetter"
import styles from "./Word.module.css"
import { GameContext } from "../../context/GameProvider"
import { UNREQUIRED_CHARS, MAXERRORS, score } from "../../utils/constants.js"
import { updatePlayer } from "../../reducers/player.slice.js"
import { nextTurn } from "../../reducers/turn.slice.js"

const Word = ({currentTurn, currentPlayerId}) => {
    const dispatch = useDispatch()

    const reloadsLeft = currentTurn.reloadsLeft

    const { word, userGuesses, setErrors, newTurn } = useContext(GameContext)

    useEffect(() => {
      newTurn()     
    }, [reloadsLeft]);

    const wordToGuess = [...word]

    const wrongGuesses = userGuesses.filter(
    (letter) => !UNREQUIRED_CHARS.includes(letter) && !wordToGuess.includes(letter)
    )

    const youLose = wrongGuesses.length === MAXERRORS

    const allGuessed = word && wordToGuess.every(char => userGuesses.includes(char))

    const yourTurnIsOver = () => {
        if(youLose){
            window.alert(`PERSO! LA PAROLA ERA ${word}`)
        }
        if(allGuessed) {
            window.alert(`VINTO!`)
        }
            dispatch(updatePlayer({id: currentPlayerId, score: score(wrongGuesses.length)}))
            dispatch(nextTurn(currentTurn))

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