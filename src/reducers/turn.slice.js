import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPlayerId: 1,
  currentWordIndex: 0,
  totalWords: 0
}

export const turnSlice = createSlice({
  name: "turn",
  initialState,
  reducers: {
    nextTurn: (state) => {
  if (state.currentPlayerId < state.players.length) {
    state.currentPlayerId++
  } else {
    state.currentPlayerId = 1
    state.currentWordIndex++
  }
}
  },
})

export const { nextTurn} = turnSlice.actions;

export const turnSelector = (state) => state.turn;