import SketchWrapper from "../SketchWrapper/SketchWrapper"
import SketchButton from "../SketchButton/SketchButton"
import ScoreBoard from "../Scoreboard/Scoreboard"
import styles from "./SketchDialog.module.css"

import { useEffect } from "react"

import explosion from "../../../public/crown.png"

const SketchDialog =({isOpen, onClose, newGame, dynamiteExploded, message})=> {


    useEffect(() => {
      if(message){
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    // cleanup per sicurezza
    return () => clearTimeout(timer);
  }
}, [message]);


    if (!isOpen) return null

    return <>
    <div className={styles.overlay}>
    { dynamiteExploded && <img className={styles.explosion} src={explosion}/>}
    <SketchWrapper fill="white">
    <div className={styles.dialog_container}>
    {message?
    <>
    <div>{message}</div>
    </>
    :
    <>
    <ScoreBoard/>
    <SketchButton text={newGame? "Nuova partita?" : "Ok!"} style={{background: "none", padding: "2px 10px"}} fill={{color: "bisque"}} onClick={newGame? newGame : onClose}/>
    </>

    }
    </div>
    </SketchWrapper>
    </div>
    </>
}

export default SketchDialog
