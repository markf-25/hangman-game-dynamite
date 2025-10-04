import logo from '../../../public/Logo.png'
import SketchButton from '../SketchButton/SketchButton'
import styles from './StartScreen.module.css'

import SketchDialog from "../SketchDialog/SketchDialog"
import {useState} from "react"

import { useTranslation } from "react-i18next"

const StartScreen = ({onStart, onLanguage, onCredits}) => {

const { t } = useTranslation();

const [ openDialog, setOpenDialog] = useState(false)
const [ message, setMessage] = useState("")

const showInfo = (message) =>{
  setOpenDialog(true)
  setMessage(message)
}

return <div className={styles.startScreenContainer}>
<img src={logo}/>
<div className={styles.buttons_wrapper}>
  <div className={styles.start_wrapper}>
  <SketchButton text={t("start")} fill={{color: "#A3FFC9"}} className={`${styles.buttons} ${styles.start}`} onClick={onStart}/>
  </div>
  <SketchButton text={t("rules")} fill={{color: "#D3A3FF"}} className={styles.buttons} onClick={()=>showInfo(t("about"))}/>
  <SketchButton text={t("credits")} fill={{color: "#A3C4FF"}} className={styles.buttons} onClick={onCredits}/>
  <SketchButton text={t("languages")} fill={{color: "#FFF5A3"}} className={styles.buttons} onClick={onLanguage}/>
  </div>
  <SketchDialog isOpen={openDialog} onClose={()=>setOpenDialog(false)} message={message}/>
  <footer>© 2025 - Raccoons in a trench coat</footer>
  </div>
}

export default StartScreen

