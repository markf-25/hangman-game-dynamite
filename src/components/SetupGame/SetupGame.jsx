import { useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { removePlayerById, clearPlayers } from "../../reducers/player.slice.js";
import { setupGame, clearGame } from "../../reducers/turn.slice.js";
import { MAXPLAYERSANDWORDS } from "../../utils/constants.js";
import PlayerModal from "../PlayerModal/PlayerModal";
import styles from "./SetupGame.module.css";

import { GameContext } from "../../context/GameProvider";

import SketchWrapper from "../SketchWrapper/SketchWrapper";
import SketchButton from "../SketchButton/SketchButton";

import { useTranslation } from "react-i18next";

const SetupGame = ({ startTheGame }) => {
  const { t } = useTranslation();

  const wrapperColor = "rgba(255, 228, 196, 0.774)";

  const dispatch = useDispatch();

  const [numPlayers, setNumPlayers] = useState([]);
  const [currentNumPlayerIndex, setCurrentNumPlayerIndex] = useState(0);
  const [howManyWords, setHowManyWords] = useState(0);
  const [playerReady, setPlayerReady] = useState(0);

  const { setView } = useContext(GameContext);

  const everyoneIsReady = numPlayers.length === playerReady;

  const [showPlayersSetup, setShowPlayersSetup] = useState(false);

  const buttonDisabled = !numPlayers.length || !howManyWords;

  const playerSelector = (num) => {
    setNumPlayers(Array.from({ length: num }, (_, index) => index + 1));
  };

  const currentPlayer = numPlayers[currentNumPlayerIndex]

  const backToPrev = () => {

  if (currentNumPlayerIndex > 0) {
    dispatch(removePlayerById(currentPlayer));

    setPlayerReady((prev) => (prev > 0 ? prev - 1 : 0));

    setCurrentNumPlayerIndex((prev) => prev - 1);
    return;
  }

  if (currentNumPlayerIndex === 0) {
    resetEverything();
    dispatch(clearPlayers());
    setShowPlayersSetup(false);
    setView("start");
  }
  };

  const onClickReadyButton = () => {
    const hasNextPlayer = currentNumPlayerIndex < numPlayers.length - 1
    
    setPlayerReady((prev) => prev + 1);
          if (hasNextPlayer) {
            setCurrentNumPlayerIndex((prev) => prev + 1);
          } else {
            dispatch(setupGame({
              totalPlayers: numPlayers.length,
              totalWords: howManyWords
            }));
            startTheGame(true);
          }
  }

  const resetEverything = () => {
    setPlayerReady(0);
    setNumPlayers([]);
    setHowManyWords(0);
    setShowPlayersSetup(false);
  }

  useEffect(() => {
    dispatch(clearPlayers());
    dispatch(clearGame());
    resetEverything();
  }, []);

  useEffect(() => {
    if (playerReady > 0 && everyoneIsReady) {
      dispatch(
        setupGame({ totalPlayers: numPlayers.length, totalWords: howManyWords })
      );
      startTheGame(true);
    }
  }, [playerReady]);


  const sharedButtonProps = (className, fill, text, onClick) => ({
    className,
    fill,
    text,
    onClick,
  });

  const selectionButton = (value, state, onClick) => (
    <label key={value}>
      <SketchButton
        {...sharedButtonProps(styles.radio_btn, {color: "white"}, value, (() => onClick(value)))}
        shape="circle"
        id={value}
        type="button"
        value={value}
        stroke={{ state: state, value: value, color: "indianred" }}
        style={{ background: "none" }}
        isUseHoverActive={false}
      />
    </label>
  );

  return (
    <>
      {!showPlayersSetup && (
        <SketchWrapper fill={wrapperColor}>
          <div className={styles.setup_nplayers} >
            <h1>{t("select players")}</h1>
            <div className={styles.radio_btns_container}>
              {MAXPLAYERSANDWORDS.map((numPlayer) =>
                selectionButton(numPlayer, numPlayers.length, playerSelector)
              )}
            </div>
            <h1>{t("select turns")}</h1>
            <div className={styles.radio_btns_container}>
              {MAXPLAYERSANDWORDS.map((wordNum) =>
                selectionButton(wordNum, howManyWords, setHowManyWords)
              )}
            </div>
            <SketchButton
            {...sharedButtonProps(styles.sketch_btn,
              { isDisabled: buttonDisabled, color: "lightsalmon" } , 
              (t("ok")), 
              (() => setShowPlayersSetup(true)))}
              disabled={buttonDisabled}
              isUseHoverActive={!buttonDisabled}
            />
          </div>
        </SketchWrapper>
      )}

      {showPlayersSetup && (
  <div className={styles.modalContainer}>
    <div className={styles.playerModalContainer}>
      <PlayerModal
        key={currentPlayer}
        player={currentPlayer}
        ready={() => {
          onClickReadyButton()
        }}
      />
    </div>
  </div>
)}
      <div className={styles.back_btn_div}>
        <SketchButton
        {...sharedButtonProps(styles.sketch_btn,
              {color: "bisque"}, 
              (t("back")), 
              (backToPrev))}
          type="button"
          form="player"
        />
      </div>
    </>
  );
};

export default SetupGame;