import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { clearPlayers } from "../../reducers/player.slice.js"
import { setupGame, clearGame } from "../../reducers/turn.slice.js"
import { MAXPLAYERSANDWORDS } from "../../utils/constants.js"
import PlayerModal from "../PlayerModal/PlayerModal"
import styles from "./SetupGame.module.css"

import SketchWrapper from "../SketchWrapper/SketchWrapper"
import SketchButton from "../SketchButton/SketchButton"

import "wired-elements"

const SetupGame = ({startTheGame}) => {

  const wrapperColor = "rgba(255, 228, 196, 0.774)"

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
    {(!numPlayers.length || !howManyWords) && 
    <SketchWrapper fill={wrapperColor}>
      <div className={styles.setup_nplayers}>
        <h1>Quanti giocatori?</h1>
        <div className={styles.radio_btns}>
  {MAXPLAYERSANDWORDS.map(num => (
    <label key={num}>
      <wired-checkbox
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
      <wired-checkbox
        type="radio"
        name="numWords"
        value={num}
        onChange={() => setHowManyWords(num)}
      />
      {num}
    </label>
  ))}
</div>
    </div>
    </SketchWrapper>
    }

    

    {numPlayers.length > 0 && howManyWords > 0 && (
      
    <div className={styles.modalContainer}>
      <SketchButton type="button" form="player" onClick={resetSetup} text="Indietro"/>
      <div className={styles.playerModalContainer}>
      {numPlayers.map(player => (<PlayerModal key={player} player={player} ready={setPlayerReady}/>))}
      </div>
      </div>
    )}
    </>
}

export default SetupGame