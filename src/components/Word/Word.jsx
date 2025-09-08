import {useContext, useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import WordLetter from "../WordLetter/WordLetter"
import styles from "./Word.module.css"
import {GameContext} from "../../context/GameProvider"
import { MAXERRORS } from "../../utils/constants.js"
import { updatePlayer, playersSelector, playerSelectorById } from "../../reducers/player.slice.js"

const Word = ({playerIndex}) => {
    const dispatch = useDispatch()

    const playersArray = useSelector(playersSelector)

    const currentPlayer = useSelector(playerSelectorById(playerIndex));

    const { word, userGuesses, setErrors } = useContext(GameContext)

    const wordToGuess = [...word]

    const wrongGuesses = userGuesses.filter(
    (letter) => letter !== " " && !wordToGuess.includes(letter)
    )

    const youLose = wrongGuesses.length === MAXERRORS

    const allGuessed = word && wordToGuess.every(char => userGuesses.includes(char))

    const yourTurnIsOver = () => {
        console.log("CURRENT", playersArray, currentPlayer)
        if(youLose){
            window.alert(`HAI PERSO, SCEMO! La parola era ${word}`)
           dispatch(updatePlayer({id: currentPlayer.id, score: 5}))
        }
        if(allGuessed){
            window.alert("HAI VINTO, MA RESTI SCEMO!")
            dispatch(updatePlayer({id: currentPlayer.id, score: 50}))
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