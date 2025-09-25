import { useContext } from "react"
import { GameContext } from "../../context/GameProvider"
import { MAXERRORS } from "../../utils/constants.js"

import errorsLeft5 from "../../../public/5left.png"
import errorsLeft4 from "../../../public/4left.png"
import errorsLeft3 from "../../../public/3left.png"
import errorsLeft2 from "../../../public/2left.png"
import errorsLeft1 from "../../../public/1left.png"


const Errors = () => {

    const {errors} = useContext(GameContext)

    const errorFrames = [errorsLeft5, errorsLeft4, errorsLeft3, errorsLeft2, errorsLeft1, null]

    return <>
    <img src={errorFrames[errors]} style={{height: "200px"}}/>
    <p>ERRORI: {errors}/{MAXERRORS}</p>
    </>
}

export default Errors