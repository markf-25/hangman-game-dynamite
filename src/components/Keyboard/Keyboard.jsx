import KeyboardButton from "../KeyboardButton/KeyboardButton"
import SketchWrapper from "../SketchWrapper/SketchWrapper"
import styles from "./Keyboard.module.css"
import {ALPHABET} from "../../utils/constants.js"

const Keyboard = () => {

    
const letters = ALPHABET

    return <>
    <SketchWrapper fill="lightsteelblue" stroke="steelblue" reload={letters}>
    <div className={styles.keyboardWrapper}>
        {letters.map(letter => (
            <KeyboardButton letter={letter} key={letter}/>
        ))}
    </div>
    </SketchWrapper>
    </>
}
export default Keyboard