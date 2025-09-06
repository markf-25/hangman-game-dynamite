import WordLetter from "../WordLetter/WordLetter"
import styles from "./Word.module.css"

const Word = ({userTry}) => {

    const prova = "GATTA"
    const wordToGuess = [...prova]

    console.log("TRY", userTry)

    return <>
    <div className={styles.word_wrapper}>
        {wordToGuess.map(letter => (
            <WordLetter letter={letter} userTry={userTry}/>
        ))}
    </div>
    </>
}

export default Word