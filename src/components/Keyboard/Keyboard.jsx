import KeyboardButton from "../KeyboardButton/KeyboardButton"
import SketchWrapper from "../SketchWrapper/SketchWrapper"
import styles from "./Keyboard.module.css"
import {ALPHABET} from "../../utils/constants.js"
import { useContext } from "react"
import { GameContext } from "../../context/GameProvider"

const Keyboard = () => {
    
const letters = ALPHABET

const { word } = useContext(GameContext)

    return <>
    <SketchWrapper fill="lightsteelblue" stroke="steelblue" reload={word}>
    <div className={styles.keyboardWrapper}>
        {letters.map(letter => (
            <KeyboardButton letter={letter} key={letter}/>
        ))}
    </div>
    </SketchWrapper>
    </>
}
export default Keyboard