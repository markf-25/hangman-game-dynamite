import styles from "./KeyboardButton.module.css"
import SketchButton from "../SketchButton/SketchButton"

import { useContext, useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { GameContext } from "../../context/GameProvider"
import { turnSelector } from "../../reducers/turn.slice.js"

const KeyboardButton = ({letter}) => {

    const { setUserGuesses } = useContext(GameContext)
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
    <SketchButton 
    text={letter} className={styles.key_btn} 
    disabled={alreadyPressed} realod={alreadyPressed} 
    onClick={userTry} 
    fill={alreadyPressed? {color: "grey"} : {color:"steelblue"}}
    stroke={{color: "darkslateblue"}}/>
    </>
}

export default KeyboardButton