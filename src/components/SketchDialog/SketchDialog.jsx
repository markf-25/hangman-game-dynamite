import SketchWrapper from "../SketchWrapper/SketchWrapper"
import SketchButton from "../SketchButton/SketchButton"
import ScoreBoard from "../Scoreboard/Scoreboard"
import styles from "./SketchDialog.module.css"
import { useTranslation } from "react-i18next";

import { useEffect } from "react"

import explosion from "../../../public/explosion.png"

const SketchDialog = ({ isOpen, onClose, dialogPurpose = "info", confirmAction, dynamiteExploded, message }) => {
  const { t } = useTranslation();

  const dialogButton = (text, fillColor, onClick) => (
    <SketchButton
              text={text}
              style={{ padding: "2px 10px", margin:"0px" }}
              fill={{ color: fillColor }}
              onClick={onClick}
    />
  )
  
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
            {dynamiteExploded && <h1>{t("explosion")}</h1>}
            <p>{message}</p>
          </>

      case "scoreboard":
        return <>
            <ScoreBoard />
          {dialogButton ((confirmAction ? t("new game") : t("ok")), "bisque", (confirmAction ? confirmAction : onClose))}
          </>

      case "confirm dialog":
        return <>
            <p>{message}</p>
            <div className={styles.confirmDialog}>
            {dialogButton (t("ok"), "bisque", confirmAction)}
            {dialogButton (t("cancel"), "white", onClose)}
            </div>
          </>
          
      case "info":
        return <>
        {message}
        {dialogButton (t("ok"), "bisque", onClose)}
        </>
    }
  }

  return <>
    <div className={styles.overlay} style={{ background : dialogPurpose==="scoreboard" ? "radial-gradient(circle,rgba(163, 197, 255, 1) 28%, rgba(163, 197, 255, 0.94) 72%, rgba(163, 197, 255, 0.91) 100%)" : "#a3c5ff75" }}>
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
