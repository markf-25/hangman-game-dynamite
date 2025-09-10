import { useContext, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import WordLetter from "../WordLetter/WordLetter"
import styles from "./Word.module.css"
import { GameContext } from "../../context/GameProvider"
import { MAXERRORS } from "../../utils/constants.js"
import { updatePlayer, playersSelector } from "../../reducers/player.slice.js"

const Word = () => {
    const dispatch = useDispatch()

    const playersArray = useSelector(playersSelector)

    const { word, userGuesses, currentPlayer, playerId, setPlayerId, setErrors, newTurn } = useContext(GameContext)


    useEffect(() => {
      newTurn()      
    }, [playerId]);

    const wordToGuess = [...word]

    const wrongGuesses = userGuesses.filter(
    (letter) => letter !== " " && !wordToGuess.includes(letter)
    )

    const youLose = wrongGuesses.length === MAXERRORS

    const allGuessed = word && wordToGuess.every(char => userGuesses.includes(char))

    const yourTurnIsOver = () => {
        console.log("CURRENTID", playersArray, currentPlayer.id)
        if(youLose){
            window.alert(`PERSO! LA PAROLA ERA ${word}`)
           dispatch(updatePlayer({id: currentPlayer.id, score: -10}))
        }
        else {
            window.alert(`VINTO!`)
            dispatch(updatePlayer({id: currentPlayer.id, score: 50}))
        }
        console.log("LENGTATATATATTATA", playerId, playersArray.length)
        if(currentPlayer.id < playersArray.length) {
            
            setPlayerId((prev) => prev+1)
            console.log("PLAYERID", playerId)
        }

        if(currentPlayer.id === playersArray.length){
            window.alert(`FINITA!`)
        }

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