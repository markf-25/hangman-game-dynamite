import useInput from "../../hooks/useInput"
import { useDispatch } from "react-redux"
import { setPlayers } from "../../reducers/player.slice.js"

const PlayerModal = ({player, ready}) => {

    const dispatch = useDispatch()

    const {value: username, handleChange: handleUsernameChange } = useInput(`Player ${player}`)

    const setupNewPlayer = (e) => {

        e.preventDefault() 

        const payload = {
        id: player,
        username,
        color: "red",
        score: 0
        }
        
        dispatch(setPlayers(payload))
        console.log("Nuovo player aggiunto:", payload)
        ready((prev) => prev+1)
    }

return <>
<div>
      <p>Player {player}</p>
      <form onSubmit={setupNewPlayer}>
        <input
          name={`username${player}`}
          value={username}
          onChange={handleUsernameChange}
        />
        <button type="submit">PRONTO!</button>
      </form>
    </div>
</>
}

export default PlayerModal