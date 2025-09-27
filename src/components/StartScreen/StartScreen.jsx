import logo from '../../../public/Logo.png'
import SketchButton from "../SketchButton/SketchButton"

const StartScreen = ({onStart, onRules, onCredits}) => {

return <>
<img src={logo}/>
<SketchButton fill={{color: "#A3FFC9"}} style={{background: "none"}} text="Punteggi" onClick={()=>console.log("CIAO")}/>
    <button onClick={onStart}>START</button>
    <button onClick={onRules}>RULES</button>
    <button onClick={onCredits}>CREDITS</button>
  </>
}

export default StartScreen