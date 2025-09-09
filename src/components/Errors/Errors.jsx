import { useContext } from "react"
import { GameContext } from "../../context/GameProvider"
import { MAXERRORS } from "../../utils/constants.js"

const Errors = () => {

    const {errors} = useContext(GameContext)

    return <>
    <p>ERRORI: {errors}/{MAXERRORS}</p>
    {errors === MAXERRORS && <p>HAI PERSO!</p>}
    </>
}

export default Errors