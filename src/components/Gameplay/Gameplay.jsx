import Errors from "../Errors/Errors.jsx";
import Word from "../Word/Word.jsx";
import Keyboard from "../Keyboard/Keyboard.jsx";
import PlayerScore from "../PlayerScore/PlayerScore.jsx";
import { useSelector } from "react-redux";
import { playerSelectorById } from "../../reducers/player.slice.js";
import { turnSelector } from "../../reducers/turn.slice.js";
import { useState, useContext } from "react";
import { GameContext } from "../../context/GameProvider";
import SketchButton from "../SketchButton/SketchButton";
import SketchDialog from "../SketchDialog/SketchDialog";

import styles from "./Gameplay.module.css";

import { useTranslation } from "react-i18next";

const Gameplay = () => {
  const { t } = useTranslation();

  const currentTurn = useSelector(turnSelector);
  const currentPlayerId = currentTurn.currentPlayerId;
  const player = useSelector(playerSelectorById(currentPlayerId));

  const whichTurnIsThis =
    currentTurn.totalReloads - currentTurn.reloadsLeft + 1;
  const { setView } = useContext(GameContext);
  const [showScores, setShowScores] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const actionButton = (onClick, text) => (
    <SketchButton
      fill={{ color: "lightcyan" }}
      onClick={() => onClick(true)}
      style={{ margin: "10px 4px", minWidth: "6rem" }}
      text={text}
    />
  );

  return (
    <div className={styles.gameplay_wrapper}>
      <div className={styles.header}>
        <h3 className={styles.headerTop}>
          {t("round")} :{" "}
          {whichTurnIsThis <= currentTurn.totalReloads
            ? `${whichTurnIsThis}/${currentTurn.totalReloads}`
            : `${currentTurn.totalReloads}/${currentTurn.totalReloads}`}
        </h3>
        <div className={styles.headerBottom}>
          {actionButton(setShowScores, t("show scores"))}
          <PlayerScore player={player} purpose="gameHeader" />
          {actionButton(setConfirm, t("show menu"))}
        </div>
      </div>
      <Word currentTurn={currentTurn} currentPlayerId={currentPlayerId} />
      <div className={styles.keyboardErrorsWrapper}>
        <Keyboard />
        <Errors />
      </div>
      <hr />
      <footer>© 2025 - Raccoons in a trench coat</footer>
      <SketchDialog
        isOpen={showScores || confirm}
        dialogPurpose={showScores ? "scoreboard" : "confirm dialog"}
        message={confirm ? t("back to menu confirm") : null}
        confirmAction={confirm ? () => setView("start") : null}
        onClose={() => (showScores ? setShowScores(false) : setConfirm(false))}
      />
    </div>
  );
};

export default Gameplay;
