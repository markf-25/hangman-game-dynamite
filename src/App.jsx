import './App.css'
import LanguageSelectionScreen from './components/LanguageSelectionScreen/LanguageSelectionScreen'
import StartScreen from './components/StartScreen/StartScreen'
import Game from "./components/Game/Game"
import { useContext } from "react"
import { GameContext } from "./context/GameProvider"



function App() {

  const {view, setView} = useContext(GameContext);


  return <>
   { view === "language" &&  <LanguageSelectionScreen />}
   { view === "start" && <StartScreen  onStart={() => setView("play")}  onRules={()=> console.log("lereglloleeeeeeee")} onCredits={()=> console.log("creditsssssss")} onLanguage={() => setView("language")}/>}
   { view === "play" &&  <Game />}
   </>
}

export default App
