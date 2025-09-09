import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { clearPlayers } from "../../reducers/player.slice.js"
import { SELECTPLAYERS } from "../../utils/constants.js"
import PlayerModal from "../PlayerModal/PlayerModal"
import styles from "./SetupGame.module.css"

const SetupGame = ({startTheGame}) => {

    const dispatch = useDispatch()
    
    const [numPlayers, setNumPlayers] = useState([])
    const [playerReady, setPlayerReady] = useState(0)

    const everyoneIsReady = numPlayers.length === playerReady

    useEffect(()=>{
        dispatch(clearPlayers())
        setPlayerReady(0)
    },[])

     useEffect(()=>{
        console.log("PLAYERREADY", playerReady)
         if(playerReady > 0 && everyoneIsReady){
            startTheGame(true)
        } 
    },[playerReady])

    return <>
    <div className={styles.setup_wrapper}>
    {!numPlayers.length && <div className={styles.setup_nplayers}>
        <h1>Quanti giocatori?</h1>
        <div className={styles.radio_btns}>
  {SELECTPLAYERS.map(num => (
    <label key={num}>
      <input
        type="radio"
        name="numPlayers"
        value={num}
        onChange={() =>
          setNumPlayers(Array.from({ length: num }, (_, index) => index + 1))
        }
      />
      {num}
    </label>
  ))}
</div>
    </div>}

    {numPlayers.length ? (
      <button type="button" form="player" className={styles.back_btn} onClick={() => setNumPlayers([])}>INDIETRO</button>
    ) : null}
    {numPlayers.map(player => (<PlayerModal player={player} ready={setPlayerReady}/>))}

    </div>
    </>
}

export default SetupGame