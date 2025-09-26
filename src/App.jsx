import './App.css'
import Game from "./components/Game/Game"
import SetupGame from "./components/SetupGame/SetupGame"
import StartScreen from './components/StartScreen/StartScreen'
import SketchDialog from "./components/SketchDialog/SketchDialog"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { turnSelector } from "./reducers/turn.slice.js"


function App() {

  const [view, setView] = useState("start");

  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const currentTurn = useSelector(turnSelector)
  const reloadsLeft = currentTurn.reloadsLeft


  return <>
   { view === "start" && <StartScreen  onStart={() => setView("play")}  onRules={()=> console.log("lereglloleeeeeeee")} onCredits={()=> console.log("creditsssssss")}/>}
   { view === "play" &&  <Game />}
   </>
}

export default App
