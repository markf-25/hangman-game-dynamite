import { useState, useEffect, useContext } from "react"
import { useDispatch } from "react-redux"
import { clearPlayers } from "../../reducers/player.slice.js"
import { setupGame, clearGame } from "../../reducers/turn.slice.js"
import { MAXPLAYERSANDWORDS } from "../../utils/constants.js"
import PlayerModal from "../PlayerModal/PlayerModal"
import styles from "./SetupGame.module.css"

import { GameContext } from "../../context/GameProvider"

import SketchWrapper from "../SketchWrapper/SketchWrapper"
import SketchButton from "../SketchButton/SketchButton"

import { useTranslation } from "react-i18next";

const SetupGame = ({ startTheGame }) => {

  const { t } = useTranslation();

  const wrapperColor = "rgba(255, 228, 196, 0.774)"

  const dispatch = useDispatch()

  const [numPlayers, setNumPlayers] = useState([])
  const [howManyWords, setHowManyWords] = useState(0)
  const [playerReady, setPlayerReady] = useState(0)

  const {setView} = useContext(GameContext);

  const everyoneIsReady = numPlayers.length === playerReady

  const [showPlayersSetup, setShowPlayersSetup] = useState(false)

  const buttonDisabled = !numPlayers.length || !howManyWords


  const playerSelector = (num) => {
    setNumPlayers(Array.from({ length: num }, (_, index) => index + 1));
  };

  const resetSetup = () => {
    setPlayerReady(0)
    setNumPlayers(0)
    setHowManyWords(0)
    setShowPlayersSetup(false)
  }

  useEffect(() => {
    dispatch(clearPlayers())
    dispatch(clearGame())
    resetSetup
  }, [])
    
  useEffect(() => {
    if (playerReady > 0 && everyoneIsReady) {
      dispatch(setupGame({ totalPlayers: numPlayers.length, totalWords: howManyWords }))
      startTheGame(true)
    }
  }, [playerReady])
    
    return <>
    {!showPlayersSetup && 
    <SketchWrapper fill={wrapperColor}>
      <div className={styles.setup_nplayers}>
        <h1>{t("select players")}</h1>
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
  <h1>{t("select turns")}</h1>
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
              text={t("ok")} 
              onClick={() => setShowPlayersSetup(true)}/>
          </div>
        </SketchWrapper>
      }

    

    { showPlayersSetup && (
      
    <div className={styles.modalContainer}>
      <div className={styles.playerModalContainer}>
      {numPlayers.map(player => (<PlayerModal key={player} player={player} ready={setPlayerReady}/>))}
      </div>
      </div>
    )}
      <div className={styles.back_btn_div }>
    <SketchButton fill={{color:"bisque"}} className={styles.sketch_btn} type="button" form="player" onClick={showPlayersSetup? resetSetup : ()=> setView("start")} text={t("back")}/>
      </div>
    </>
}

export default SetupGame