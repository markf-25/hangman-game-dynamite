import { useContext, useState, useEffect } from "react"
import { GameContext } from "../../context/GameProvider"
import { MAXERRORS } from "../../utils/constants.js"
import errorsLeft5 from "../../../public/01.jpg"
import errorsLeft4 from "../../../public/02.jpg"
import errorsLeft3 from "../../../public/03.jpg"
import errorsLeft2 from "../../../public/04.jpg"
import errorsLeft1 from "../../../public/05.jpg"
import explosion from "../../../public/vite.svg"


const Errors = () => {

    const {errors} = useContext(GameContext)

    const errorFrames = [errorsLeft5, errorsLeft4, errorsLeft3, errorsLeft2, errorsLeft1, null]

    const youLose = errors === MAXERRORS
    const [ dynamiteExploded, setDynamiteExploded ] = useState(false)

    useEffect(()=>{
        if(youLose){
            setDynamiteExploded(true)
        }
        else{
            setDynamiteExploded(false)
        }
    }, [errors])

    return <>
    <img src={errorFrames[errors]} style={{height: "120px"}}/>
    <p>ERRORI: {errors}/{MAXERRORS}</p>
    { dynamiteExploded && <img src={explosion} style={{height: "300px", position: "absolute"}}/>}
    </>
}

export default Errors