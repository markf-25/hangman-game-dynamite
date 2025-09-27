import logo from '../../../public/Logo.png'
import SketchButton from '../SketchButton/SketchButton'
import styles from './StartScreen.module.css'

const StartScreen = ({onStart, onRules, onCredits}) => {

return <>
<img src={logo}/>
<div className={styles.buttons_wrapper}>
  <div className={styles.start_wrapper}>
  <SketchButton text="START" fill={{color: "#A3FFC9"}} className={`${styles.buttons} ${styles.start}`} onClick={onStart}/>
  </div>
  <SketchButton text="RULES" fill={{color: "#D3A3FF"}} className={styles.buttons} onClick={onRules}/>
  <SketchButton text="CREDITS" fill={{color: "#A3C4FF"}} className={styles.buttons} onClick={onCredits}/>
  </div>
  </>
}

export default StartScreen

