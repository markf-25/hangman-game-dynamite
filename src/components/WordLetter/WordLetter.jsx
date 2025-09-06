import { useContext } from "react"
import styles from "./WordLetter.module.css";
import {GameContext} from "../../context/GameProvider"

const WordLetter = ({ letter }) => {
  
  const { userGuesses } = useContext(GameContext)

  return (
    <>
      {userGuesses.includes(letter) ? (
        <div className={styles.letter_card}>{letter}</div>
      ) : (
        <div className={styles.letter_card}>X</div>
      )}
    </>
  );
};

export default WordLetter;
