const WordLetter = ({letter, userTry}) => {
    console.log("VALORI", letter, userTry)
    return <>
    {userTry.includes(letter)? <div>{letter}</div> : <div>X</div>}
    </>
}

export default WordLetter