import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  players: [],
}

export const playerSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    setPlayers: (state, action) => {
      state.players.push({
        id: action.payload.id,
        username: action.payload.username,
        color: action.payload.color,
        score: action.payload.score,
      })
    },
    updatePlayer: (state, action) => {
      const { id, score } = action.payload
      const player = state.players.find(p => p.id === id)
      if (player) {
        player.score = player.score + score
      }
    },
     removePlayerById: (state, action) => {
      state.players = state.players.filter(p => p.id !== action.payload);
    },
    clearPlayers: () => {
      return initialState
    },
  },
})

export const { setPlayers, updatePlayer, removePlayerById, clearPlayers} = playerSlice.actions;

export const playersSelector = (state) => state.player.players;

export const playerSelectorById = (id) => (state) =>
  state.player.players.find(player => player.id === id);