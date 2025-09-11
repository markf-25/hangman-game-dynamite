import { useContext, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import WordLetter from "../WordLetter/WordLetter"
import styles from "./Word.module.css"
import { GameContext } from "../../context/GameProvider"
import { MAXERRORS } from "../../utils/constants.js"
import { updatePlayer, playersSelector } from "../../reducers/player.slice.js"
import { turnSelector, nextTurn } from "../../reducers/turn.slice.js"

const Word = () => {
    const dispatch = useDispatch()

    const playersArray = useSelector(playersSelector)

    const currentTurn = useSelector(turnSelector)

    const { unrequiredChars, word, userGuesses, currentPlayer, setErrors, newTurn } = useContext(GameContext)


    useEffect(() => {
      newTurn()  
      console.log("daveafasfasfda", currentTurn)    
    }, [currentTurn.currentPlayerId]);

    const wordToGuess = [...word]

    const wrongGuesses = userGuesses.filter(
    (letter) => !unrequiredChars.includes(letter) && !wordToGuess.includes(letter)
    )

    const youLose = wrongGuesses.length === MAXERRORS

    const allGuessed = word && wordToGuess.every(char => userGuesses.includes(char))

    const yourTurnIsOver = () => {
        if(youLose){
            window.alert(`PERSO! LA PAROLA ERA ${word}`)
           dispatch(updatePlayer({id: currentTurn.currentPlayerId, score: -10}))
        }
        if(allGuessed) {
            window.alert(`VINTO!`)
            dispatch(updatePlayer({id: currentTurn.currentPlayerId, score: 50}))
        }
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