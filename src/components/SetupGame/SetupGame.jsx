import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { clearPlayers } from "../../reducers/player.slice.js"
import PlayerModal from "../PlayerModal/PlayerModal"
import styles from "./SetupGame.module.css"

const SetupGame = ({startTheGame}) => {

    const dispatch = useDispatch()
    
    const [numPlayers, setNumPlayers] = useState([])
    const [playerReady, setPlayerReady] = useState(0)

    const everyoneIsReady = numPlayers.length === playerReady

    useEffect(()=>{
        dispatch(clearPlayers())
    },[])

     useEffect(()=>{
        console.log("PLAYERREADY", playerReady)
         if(playerReady > 0 && everyoneIsReady){
            startTheGame(true)
        } 
    },[playerReady])

    return <>
    <div className={styles.setup_wrapper}>
    {!numPlayers.length && <div className={styles.setup_nplayers}>
        <h1>Quanti giocatori?</h1>
        <div className={styles.radio_btns}>
            <button type="radio" value="1" onClick={()=>setNumPlayers(prev => [...prev, 1])}>1</button>
            <button type="radio" value="2" onClick={()=>setNumPlayers(prev => [...prev, 1, 2])}>2</button>
        </div>
    </div>}

    {numPlayers.length ? (
      <button type="button" form="player" className={styles.back_btn} onClick={() => setNumPlayers([])}>INDIETRO</button>
    ) : null}
    {numPlayers.map(player => (<PlayerModal player={player} ready={setPlayerReady}/>))}

    </div>
    </>
}

export default SetupGame