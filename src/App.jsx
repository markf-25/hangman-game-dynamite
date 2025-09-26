import './App.css'
import Game from "./components/Game/Game"

import StartScreen from './components/StartScreen/StartScreen'

import { useContext } from "react"
import { GameContext } from "./context/GameProvider"



function App() {

  const {view, setView} = useContext(GameContext);


  return <>
   { view === "start" && <StartScreen  onStart={() => setView("play")}  onRules={()=> console.log("lereglloleeeeeeee")} onCredits={()=> console.log("creditsssssss")}/>}
   { view === "play" &&  <Game />}
   </>
}

export default App
