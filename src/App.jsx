import './App.css'
import LanguageSelectionScreen from './components/LanguageSelectionScreen/LanguageSelectionScreen'
import StartScreen from './components/StartScreen/StartScreen'
import Game from "./components/Game/Game"
import { useContext } from "react"
import { GameContext } from "./context/GameProvider"
import Credits from "./components/Credits/Credits"



function App() {

  const {view, setView} = useContext(GameContext);


  return <>
  
   { view === "language" &&  <LanguageSelectionScreen />}
   { view === "start" && <StartScreen  onStart={() => setView("play")} onLanguage={() => setView("language")} onCredits={() => setView("credits")}/>}
   { view === "play" &&  <Game />}
   { view === "credits" && <Credits backToTitle={() => setView("start")}/>}
   </>
}

export default App
