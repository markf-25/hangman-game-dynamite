import WordLetter from "../WordLetter/WordLetter"

const Word = ({userTry}) => {

    const prova = "gatta"
    const wordToGuess = [...prova]

    console.log("TRY", userTry)

    return <>
    <div className="blabla">
        {wordToGuess.map(letter => (
            <WordLetter letter={letter} userTry={userTry}/>
        ))}
    </div>
    </>
}

export default Word