import styles from "./WordLetter.module.css";

const WordLetter = ({ letter, userTry }) => {
  console.log("VALORI", letter, userTry);
  return (
    <>
      {userTry.includes(letter) ? (
        <div className={styles.letter_card}>{letter}</div>
      ) : (
        <div className={styles.letter_card}>X</div>
      )}
    </>
  );
};

export default WordLetter;
