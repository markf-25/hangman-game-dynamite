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

const SetupGame = ({ startTheGame }) => {

  const wrapperColor = "rgba(255, 228, 196, 0.774)"

  const dispatch = useDispatch()

  const [numPlayers, setNumPlayers] = useState([])
  const [howManyWords, setHowManyWords] = useState(0)
  const [playerReady, setPlayerReady] = useState(0)

  const everyoneIsReady = numPlayers.length === playerReady

  const [selectedPlayers, setSelectedPlayers] = useState(null);

  const [showPlayersSetup, setShowPlayersSetup] = useState(false)

  const buttonDisabled = !numPlayers.length || !howManyWords


  const playerSelector = (num) => {
    setSelectedPlayers(num);
    setNumPlayers(Array.from({ length: num }, (_, index) => index + 1));
  };

  const resetSetup = () => {
    setPlayerReady(0)
    setHowManyWords(0)
    setShowPlayersSetup(false)
  }

  useEffect(() => {
    dispatch(clearPlayers())
    dispatch(clearGame())
    resetSetup
  }, [])

  useEffect(() => {
    console.log("sprotz", howManyWords)
  }, [howManyWords])
    
  useEffect(() => {
    console.log("PLAYERREADY", playerReady)
    console.log("tot parole", howManyWords)
    if (playerReady > 0 && everyoneIsReady) {
      dispatch(setupGame({ totalPlayers: numPlayers.length, totalWords: howManyWords }))
      startTheGame(true)
    }
  }, [playerReady])
    
    return <>
    {!showPlayersSetup && 
    <SketchWrapper fill={wrapperColor}>
      <div className={styles.setup_nplayers}>
        <h1>Quanti giocatori?</h1>
        <div className={styles.radio_btns}>
 {MAXPLAYERSANDWORDS.map(num => (
    <label key={num}>
      <SketchButton className={styles.colorButton}
         id={num}
         type="button"
          value={num}
          shape="circle"
          fill={{color: "white"}}
          stroke={{state: numPlayers.length, value: num, color: "indianred"}}
          style={{background: "none"}}
          text={num}
          onClick={() => playerSelector(num)}/>
    </label>
  ))}
  </div>
  <h1>Quante parole?</h1>
  <div className={styles.radio_btns}>
  {MAXPLAYERSANDWORDS.map(wordNum => (
    <label key={wordNum}>
      <SketchButton className={styles.colorButton}
          id={wordNum}
          type="button"
          value={wordNum}
          shape="circle"
          fill={{color: "white"}}
          stroke={{state: howManyWords, value: wordNum, color: "indianred"}}
          style={{background: "none"}}
          text={wordNum}
          onClick={() => setHowManyWords(wordNum)}/>
    </label>
  ))}
            </div>
            <SketchButton className={styles.sketch_btn}
              disabled={buttonDisabled}
              fill={{isDisabled: buttonDisabled, color: "lightsalmon"}}
              text="OK" 
              onClick={() => setShowPlayersSetup(true)}/>
          </div>
        </SketchWrapper>
      }

    

    { showPlayersSetup && (
      
    <div className={styles.modalContainer}>
      <div className={styles.lamadonna}>
      <SketchButton fill={{color:"bisque"}} className={styles.sketch_btn} type="button" form="player" onClick={resetSetup} text="Indietro"/>
      </div>
      <div className={styles.playerModalContainer}>
      {numPlayers.map(player => (<PlayerModal key={player} player={player} ready={setPlayerReady}/>))}
      </div>
      </div>
    )}
    </>
}

export default SetupGame