import KeyboardButton from "../KeyboardButton/KeyboardButton"
import styles from "./Keyboard.module.css"
import {ALPHABET} from "../../utils/constants.js"

const Keyboard = () => {

    
const letters = ALPHABET

    return <>
    <div className={styles.keyboardWrapper}>
        {letters.map(letter => (
            <KeyboardButton letter={letter} key={letter}/>
        ))}
    </div>
    </>
}
export default Keyboard