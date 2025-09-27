import { useContext, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import WordLetter from "../WordLetter/WordLetter"
import SketchDialog from "../SketchDialog/SketchDialog"
import SketchWrapper from "../SketchWrapper/SketchWrapper"
import styles from "./Word.module.css"
import { GameContext } from "../../context/GameProvider"
import { UNREQUIRED_CHARS, MAXERRORS, score } from "../../utils/constants.js"
import { updatePlayer } from "../../reducers/player.slice.js"
import { nextTurn } from "../../reducers/turn.slice.js"

const Word = ({currentTurn, currentPlayerId}) => {
    const dispatch = useDispatch()

    const reloadsLeft = currentTurn.reloadsLeft

    const { word, userGuesses, setErrors, newTurn } = useContext(GameContext)

    const [showResults, setShowResults] = useState(false)

    const [ dynamiteExploded, setDynamiteExploded ] = useState(false)
    
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
            setMessage(`La parola era
                ${word}`)
            setDynamiteExploded(true)
            
        }
        if(allGuessed) {
            setMessage("HAI INDOVINATO!")
        }
            setShowResults(true)
            dispatch(updatePlayer({id: currentPlayerId, score: score(wrongGuesses.length)}))
            dispatch(nextTurn(currentTurn))
    }

    useEffect(() => {
        if(youLose || allGuessed) {
            yourTurnIsOver()
        }
    setErrors(wrongGuesses.length)
    }, [userGuesses])

    const closeDialogHandler = () => {
        setShowResults(false)
        setDynamiteExploded(false)
    }

    return <>
    <SketchWrapper reload={wordToGuess} stroke="transparent" fill="white">
    <div className={styles.word_wrapper}>
        {wordToGuess.map(letter => (
            <WordLetter letter={letter}/>
        ))}
    </div>
    </SketchWrapper>
    <SketchDialog isOpen={showResults} dialogPurpose="turn ended" message={message} onClose={closeDialogHandler} dynamiteExploded={dynamiteExploded} />
    </>
}

export default Word
