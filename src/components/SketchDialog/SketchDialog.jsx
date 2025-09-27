import SketchWrapper from "../SketchWrapper/SketchWrapper"
import SketchButton from "../SketchButton/SketchButton"
import ScoreBoard from "../Scoreboard/Scoreboard"
import styles from "./SketchDialog.module.css"

import { useEffect } from "react"

import explosion from "../../../public/explosion.png"

const SketchDialog = ({ isOpen, onClose, dialogPurpose, newGame, dynamiteExploded, message, children }) => {
  useEffect(() => {
    if (dialogPurpose === "turn ended") {
      const timer = setTimeout(() => {
        onClose()
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [dialogPurpose, onClose])

  if (!isOpen) return null

  const renderContent = () => {
    switch (dialogPurpose) {
      case "turn ended":
        return <>
            {dynamiteExploded && <h1>KA-BOOOOM!</h1>}
            <p>{message}</p>
          </>

      case "scoreboard":
        return <>
            <ScoreBoard />
            <SketchButton
              text={newGame ? "Nuova partita?" : "Ok!"}
              style={{ background: "none", padding: "2px 10px" }}
              fill={{ color: "bisque" }}
              onClick={newGame ? newGame : onClose}
            />
          </>

      case "confirm dialog":
        return <>
            <p>{message}</p>
            <div className={styles.confirmDialog}>
            <SketchButton
              text="Annulla"
              style={{ background: "none", padding: "2px 10px" }}
              fill={{ color: "white" }}
              onClick={onClose}
            />
            <SketchButton
              text="Ok!"
              style={{ background: "none", padding: "2px 10px" }}
              fill={{ color: "bisque" }}
              onClick={newGame}
            />
            </div>
          </>
          case "popup":
        return <>
        {children}
        </>
    }
  }

  return <>
    <div className={styles.overlay}>
      {dynamiteExploded && <img className={styles.explosion} src={explosion} />}
      <SketchWrapper fill="white">
        <div className={styles.dialog_container}>
          {renderContent()}
        </div>
      </SketchWrapper>
    </div>
  </>
}

export default SketchDialog
