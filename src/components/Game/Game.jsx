import Errors from "../Errors/Errors"
import Word from "../Word/Word"
import Keyboard from "../Keyboard/Keyboard"

import { GameProvider } from "../../context/GameProvider"

const Game = () => {

    return <>
    <GameProvider>
      <Errors/>
      <Word playerIndex={1}/>
      <Keyboard />
    </GameProvider>
    </>
}

export default Game