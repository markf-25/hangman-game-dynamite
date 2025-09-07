import useInput from "../../hooks/useInput"
import { useDispatch } from "react-redux"
import { setPlayer } from "../../reducers/player.slice.js"

const PlayerModal = ({player}) => {

    const dispatch = useDispatch()

    const {value: username, handleChange: handleUsernameChange } = useInput(`Player ${player}`)

    const setupNewPlayer = (e) => {

        e.preventDefault() 

        const payload = {
        id: player,
        username,
        color: "red"
        }
        
        dispatch(setPlayer(payload))
        console.log("Nuovo player aggiunto:", payload)
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
      </form>
    </div>
</>
}

export default PlayerModal