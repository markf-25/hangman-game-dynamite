import useInput from "../../hooks/useInput"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { setPlayers } from "../../reducers/player.slice.js"
import styles from "./PlayerModal.module.css"

const PlayerModal = ({player, ready}) => {

    const dispatch = useDispatch()

    const {value: username, handleChange: handleUsernameChange } = useInput(`Player ${player}`)

    const [isDisabled, setIsDisabled] = useState(false)

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
        setIsDisabled(true)
    }

return <>
<div className={styles.player_modal}>
      <h3>Player {player}</h3>
      <form onSubmit={setupNewPlayer} className={styles.player_form}>
        <label htmlFor={`username${player}`}>Username:</label>
        <input
          id={`username${player}`}
          value={username}
          onChange={handleUsernameChange}
        />
        <button className={styles.ready_btn} type="submit" disabled={isDisabled}>PRONTO!</button>
      </form>
    </div>
</>
}

export default PlayerModal