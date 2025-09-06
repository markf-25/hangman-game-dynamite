import Word from "../Word/Word"
import Keyboard from "../Keyboard/Keyboard"

import { useState } from "react"
import { GameProvider } from "../../context/GameProvider"
import { MAXERRORS } from "../../utils/constants.js"

const Game = () => {

    const [ errors, setErrors ] = useState(0)

    return <>
    <GameProvider>
      <Word errors={setErrors}/>
      <Keyboard />
      <p>ERRORI: {errors}</p>
      {errors === MAXERRORS && <p>HAI PERSO</p>}
    </GameProvider>
    </>
}

export default Game