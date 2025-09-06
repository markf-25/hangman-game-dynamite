import styles from "./KeyboardButton.module.css"

import { useContext, useState } from "react"
import {GameContext} from "../../context/GameProvider"

const KeyboardButton = ({letter}) => {

    const { setUserGuesses } = useContext(GameContext)
    const [ alreadyPressed, setAlreadyPressed] = useState(false)

    const userTry = () => {
        setUserGuesses(prev => [...prev, letter])
        setAlreadyPressed(true)
    }

    return <>
    <button className={styles.key_btn} disabled={alreadyPressed} onClick={userTry}>{letter}</button>
    </>
}

export default KeyboardButton