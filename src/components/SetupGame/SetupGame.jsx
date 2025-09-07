import { useState, useEffect } from "react"
import PlayerModal from "../PlayerModal/PlayerModal"

import { useDispatch } from "react-redux"

import { clearPlayers } from "../../reducers/player.slice.js"

const SetupGame = () => {

    const dispatch = useDispatch()
    
    const [numPlayers, setNumPlayers] = useState([])

    useEffect(()=>{
        dispatch(clearPlayers())
    },[])

    return <>
    <div>
    <p>Quanti giocatori?</p>
    <button type="radio" value="1" onClick={()=>setNumPlayers(prev => [...prev, 1])}>1</button>
    <button type="radio" value="2" onClick={()=>setNumPlayers(prev => [...prev, 1, 2])}>2</button>

    <form id="player">
    {numPlayers.map(player => (<PlayerModal player={player}/>))}
    <button type="submit" form="player">INVIA</button>
    </form>

    </div>
    </>
}

export default SetupGame