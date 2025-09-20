import { useContext, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import WordLetter from "../WordLetter/WordLetter"
import SketchDialog from "../SketchDialog/SketchDialog"
import SketchButton from "../SketchButton/SketchButton"
import styles from "./Word.module.css"
import { GameContext } from "../../context/GameProvider"
import { UNREQUIRED_CHARS, MAXERRORS, score } from "../../utils/constants.js"
import { updatePlayer } from "../../reducers/player.slice.js"
import { nextTurn } from "../../reducers/turn.slice.js"

const Word = ({currentTurn, currentPlayerId}) => {
    const dispatch = useDispatch()

    const reloadsLeft = currentTurn.reloadsLeft

    const { word, userGuesses, setErrors, newTurn } = useContext(GameContext)

    const [winOrLose, setWinOrLose] = useState(false)
    const [message, setMessage] = useState("")

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
            setMessage(`NON HAI INDOVINATO! La parola era ${word}`)
            
        }
        if(allGuessed) {
            setMessage("HAI INDOVINATO!")
        }
            setWinOrLose(true)
            dispatch(updatePlayer({id: currentPlayerId, score: score(wrongGuesses.length)}))
            dispatch(nextTurn(currentTurn))
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
    <SketchDialog isOpen={winOrLose}>
        <p>{message}</p>
        <SketchButton text="Ok, ok..." fill={{color: "bisque"}} style={{background: "none", padding: "0px 12px"}} onClick={()=>setWinOrLose(false)}/>
    </SketchDialog>
    </>
}

export default Word