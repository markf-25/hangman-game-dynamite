import './App.css'

import Word from "./components/Word/Word"
import Keyboard from "./components/Keyboard/Keyboard"

function App() {

  const userTry = ["t","g", "a"]

  return <>
  <Word userTry={userTry}/> 
  <Keyboard/>
  </>
}

export default App
