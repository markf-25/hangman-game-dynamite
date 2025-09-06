import './App.css'

import Word from "./components/Word/Word"
import Keyboard from "./components/Keyboard/Keyboard"

function App() {

  const userTry = ["T","G","A"]

  return <>
  <Word userTry={userTry}/> 
  <Keyboard/>
  </>
}

export default App
