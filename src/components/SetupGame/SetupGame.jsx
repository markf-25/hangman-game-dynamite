import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { clearPlayers } from "../../reducers/player.slice.js"
import { setupGame, clearGame } from "../../reducers/turn.slice.js"
import { MAXPLAYERSANDWORDS } from "../../utils/constants.js"
import PlayerModal from "../PlayerModal/PlayerModal"
import styles from "./SetupGame.module.css"

const SetupGame = ({startTheGame}) => {

    const dispatch = useDispatch()
    
    const [numPlayers, setNumPlayers] = useState([])
    const [howManyWords, setHowManyWords] = useState(0)
    const [playerReady, setPlayerReady] = useState(0)

    const everyoneIsReady = numPlayers.length === playerReady

    const playerSelector = (num) => {
      setNumPlayers(Array.from({ length: num }, (_, index) => index + 1))
    }

    const resetSetup = () =>{
        setPlayerReady(0)
        setHowManyWords(0)
    }

    useEffect(()=>{
        dispatch(clearPlayers())
        dispatch(clearGame())
        resetSetup
    },[])

     useEffect(()=>{
        console.log("PLAYERREADY", playerReady)
         if(playerReady > 0 && everyoneIsReady){
            dispatch(setupGame({totalPlayers: numPlayers.length, totalWords: howManyWords}))
            startTheGame(true)
        } 
    },[playerReady])

    return <>
    <div className={styles.setup_wrapper}>
    {(!numPlayers.length || !howManyWords) && <div className={styles.setup_nplayers}>
        <h1>Quanti giocatori?</h1>
        <div className={styles.radio_btns}>
  {MAXPLAYERSANDWORDS.map(num => (
    <label key={num}>
      <input
        type="radio"
        name="numPlayers"
        value={num}
        onChange={() => playerSelector(num)}
      />
      {num}
    </label>
  ))}
  </div>
  <h1>Quante parole?</h1>
        <div className={styles.radio_btns}>
  {MAXPLAYERSANDWORDS.map(num => (
    <label key={num}>
      <input
        type="radio"
        name="numWords"
        value={num}
        onChange={() => setHowManyWords(num)}
      />
      {num}
    </label>
  ))}
</div>
    </div>}

    {numPlayers.length > 0 && howManyWords > 0 && (
    <>
      <button type="button" form="player" className={styles.back_btn} onClick={resetSetup}>INDIETRO</button>
      {numPlayers.map(player => (<PlayerModal key={player} player={player} ready={setPlayerReady}/>))}
      </>
    )}
    

    </div>
    </>
}

export default SetupGame