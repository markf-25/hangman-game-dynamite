import './App.css'
import StartScreen from './components/StartScreen/StartScreen'
import LanguageSelectionScreen from './components/LanguageSelectionScreen/LanguageSelectionScreen'
import Credits from "./components/Credits/Credits"
import Game from "./components/Game/Game"
import { useState, useEffect, useContext } from "react"
import { useTranslation } from "react-i18next";

import { GameContext } from "./context/GameProvider"
import SketchDialog from "./components/SketchDialog/SketchDialog";



function App() {

  const {view, setView} = useContext(GameContext);
  const { t } = useTranslation();
const [isNotLandscapeMode, setIsNotLandscapeMode] = useState(!window.matchMedia("(orientation: landscape)").matches);

useEffect(() => {
  const mediaQuery = window.matchMedia("(orientation: landscape)");
  const handleChange = (e) => setIsNotLandscapeMode(!e.matches);

  mediaQuery.addEventListener("change", handleChange);
  return () => mediaQuery.removeEventListener("change", handleChange);
}, []);


  return <>
  
   { view === "language" &&  <LanguageSelectionScreen />}
   { view === "start" && <StartScreen  onStart={() => setView("play")} onLanguage={() => setView("language")} onCredits={() => setView("credits")}/>}
   { view === "play" &&  <Game />}
   { view === "credits" && <Credits backToTitle={() => setView("start")}/>}
   <SketchDialog message={t("device warning")} isOpen={isNotLandscapeMode} dialogPurpose="turn ended" onClose={()=>null}/>
   </>
}

export default App
