import { useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { clearPlayers } from "../../reducers/player.slice.js";
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
  const [howManyWords, setHowManyWords] = useState(0);
  const [playerReady, setPlayerReady] = useState(0);

  const { setView } = useContext(GameContext);

  const everyoneIsReady = numPlayers.length === playerReady;

  const [showPlayersSetup, setShowPlayersSetup] = useState(false);

  const buttonDisabled = !numPlayers.length || !howManyWords;

  const playerSelector = (num) => {
    setNumPlayers(Array.from({ length: num }, (_, index) => index + 1));
  };

  const resetSetup = () => {
    setPlayerReady(0);
    setNumPlayers(0);
    setHowManyWords(0);
    setShowPlayersSetup(false);
  };

  useEffect(() => {
    dispatch(clearPlayers());
    dispatch(clearGame());
    resetSetup;
  }, []);

  useEffect(() => {
    if (playerReady > 0 && everyoneIsReady) {
      dispatch(
        setupGame({ totalPlayers: numPlayers.length, totalWords: howManyWords })
      );
      startTheGame(true);
    }
  }, [playerReady]);

  const selectionButton = (value, state, onClick) => (
    <label key={value}>
      <SketchButton
        className={styles.radio_btn}
        id={value}
        type="button"
        value={value}
        shape="circle"
        fill={{ color: "white" }}
        stroke={{ state: state, value: value, color: "indianred" }}
        style={{ background: "none" }}
        text={value}
        onClick={() => onClick(value)}
      />
    </label>
  );

  return (
    <>
      {!showPlayersSetup && (
        <SketchWrapper fill={wrapperColor}>
          <div className={styles.setup_nplayers}>
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
              className={styles.sketch_btn}
              disabled={buttonDisabled}
              fill={{ isDisabled: buttonDisabled, color: "lightsalmon" }}
              text={t("ok")}
              onClick={() => setShowPlayersSetup(true)}
            />
          </div>
        </SketchWrapper>
      )}

      {showPlayersSetup && (
        <div className={styles.modalContainer}>
          <div className={styles.playerModalContainer}>
            {numPlayers.map((player) => (
              <PlayerModal
                key={player}
                player={player}
                ready={setPlayerReady}
              />
            ))}
          </div>
        </div>
      )}
      <div className={styles.back_btn_div}>
        <SketchButton
          fill={{ color: "bisque" }}
          className={styles.sketch_btn}
          type="button"
          form="player"
          onClick={showPlayersSetup ? resetSetup : () => setView("start")}
          text={t("back")}
        />
      </div>
    </>
  );
};

export default SetupGame;
