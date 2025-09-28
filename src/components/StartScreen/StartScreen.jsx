import logo from '../../../public/Logo.png'
import SketchButton from '../SketchButton/SketchButton'
import styles from './StartScreen.module.css'

import { useTranslation } from "react-i18next";

const StartScreen = ({onStart, onRules, onCredits}) => {

const { t } = useTranslation();

return <>
<img src={logo}/>
<div className={styles.buttons_wrapper}>
  <div className={styles.start_wrapper}>
  <SketchButton text={t("start")} fill={{color: "#A3FFC9"}} className={`${styles.buttons} ${styles.start}`} onClick={onStart}/>
  </div>
  <SketchButton text={t("rules")} fill={{color: "#D3A3FF"}} className={styles.buttons} onClick={onRules}/>
  <SketchButton text={t("credits")} fill={{color: "#A3C4FF"}} className={styles.buttons} onClick={onCredits}/>
  <SketchButton text={t("languages")} fill={{color: "#FFF5A3"}} className={styles.buttons} onClick={onCredits}/>
  </div>
  </>
}

export default StartScreen

