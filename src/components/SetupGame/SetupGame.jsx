import { useState, useEffect } from "react"
import PlayerModal from "../PlayerModal/PlayerModal"

import { useDispatch } from "react-redux"

import { clearPlayers } from "../../reducers/player.slice.js"

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
    <div>
    {!numPlayers.length && <div>
        <p>Quanti giocatori?</p>
    <button type="radio" value="1" onClick={()=>setNumPlayers(prev => [...prev, 1])}>1</button>
    <button type="radio" value="2" onClick={()=>setNumPlayers(prev => [...prev, 1, 2])}>2</button>
    </div>}

    {numPlayers.map(player => (<PlayerModal player={player} ready={setPlayerReady}/>))}
    {numPlayers.length ? (
  <button type="button" form="player" onClick={() => setNumPlayers([])}>INDIETRO</button>
) : null}

    </div>
    </>
}

export default SetupGame