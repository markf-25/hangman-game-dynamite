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
        if(!alreadyPressed){
        setUserGuesses(prev => [...prev, letter])
        setAlreadyPressed(true)
        }
    }

useEffect(() => {
    const handleKeyDown = (event) => {
      // Case-insensitive
      if (event.key.toLowerCase() === letter.toLowerCase()) {
        userTry();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [letter, alreadyPressed]);

    return <>
    <SketchButton 
    text={letter} className={styles.key_btn} 
    disabled={alreadyPressed}
    onClick={userTry} 
    onKeyDown={userTry}
    fill={alreadyPressed? {color: "grey"} : {color:"steelblue"}}
    stroke={{color: "darkslateblue"}}/>
    </>
}

export default KeyboardButton