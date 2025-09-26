import Logo from '../../../public/Logo.png'

const StartScreen = ({onStart, onRules, onCredits}) => {

return <>
    <button onClick={onStart}>START</button>
    <button onClick={onRules}>RULES</button>
    <button onClick={onCredits}>CREDITS</button>
  </>
}

export default StartScreen