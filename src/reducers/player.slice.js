import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  players: []
}

export const playerSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    setPlayer: (state, action) => {
      state.players.push({
        id: action.payload.id,
        username: action.payload.username,
        color: action.payload.color,
        score: 0,
      })
    },
    clearPlayers: () => {
      return initialState
    },
  },
})

export const { setPlayer, clearPlayers} = playerSlice.actions;

export const playerSelector = (state) => state.player;