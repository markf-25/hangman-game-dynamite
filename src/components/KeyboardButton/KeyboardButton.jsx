import styles from "./KeyboardButton.module.css"

import { useContext, useState, useEffect } from "react"
import { useSelector } from "react-redux"
import {GameContext} from "../../context/GameProvider"
import { turnSelector } from "../../reducers/turn.slice.js"
const KeyboardButton = ({letter}) => {

    const { currentPlayer, setUserGuesses } = useContext(GameContext)
    const [ alreadyPressed, setAlreadyPressed] = useState(false)

    const currentTurn = useSelector(turnSelector)

    const reloadsLeft = currentTurn.reloadsLeft

    useEffect(()=>{
        setAlreadyPressed(false)
    },[reloadsLeft])

    const userTry = () => {
        setUserGuesses(prev => [...prev, letter])
        setAlreadyPressed(true)
    }

    return <>
    <button className={styles.key_btn} disabled={alreadyPressed} onClick={userTry}>{letter}</button>
    </>
}

export default KeyboardButton