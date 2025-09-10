import Errors from "../Errors/Errors"
import Word from "../Word/Word"
import Keyboard from "../Keyboard/Keyboard"
import { useContext} from "react"
import { GameContext } from "../../context/GameProvider"

const Game = () => {
  const {currentPlayer} = useContext(GameContext)
    return <>
      <Errors/>
      <h3>È il turno di {currentPlayer.username}</h3>
      <Word/>
      <Keyboard />
    </>
}

export default Game