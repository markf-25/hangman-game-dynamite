import { useContext, useRef, useEffect } from "react";
import rough from "roughjs";
import styles from "./WordLetter.module.css";
import { GameContext } from "../../context/GameProvider";
import { ALPHABET } from "../../utils/constants.js";

const WordLetter = ({ letter }) => {
  const { userGuesses } = useContext(GameContext);
  const svgRef = useRef(null);

  useEffect(() => {
    if (!ALPHABET.includes(letter) || userGuesses.includes(letter)) return;

    const svg = svgRef.current;
    if (!svg) return;
    const rc = rough.svg(svg);

    // Pulisce eventuali vecchi elementi
    while (svg.firstChild) svg.removeChild(svg.firstChild);

    const node = rc.line(5, 20, 35, 20, {
      stroke: "black",
      strokeWidth: 2,
      roughness: 2.5,
      bowing: 2,
    });

    svg.appendChild(node);
  }, [letter, userGuesses]);

  const isGuessed = userGuesses.includes(letter);
  const isAlphabet = ALPHABET.includes(letter);

  return (
    <>
      {isGuessed ? (
        <div className={styles.letter_card}>{letter}</div>
      ) : (
        <div className={styles.letter_card}>
          {!isAlphabet? 
          letter
          :
          <svg
          ref={svgRef}
          width="18px"
          height="25px"
        />}</div>
      )}
    </>
  );
};

export default WordLetter;
