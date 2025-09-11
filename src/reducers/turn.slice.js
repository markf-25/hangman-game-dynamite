import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPlayers: 0,
  currentPlayerId: 1,
  currentWordIndex: 0,
  totalWords: 0,
  totalReloads: 0,
  reloadsLeft: 0
}

export const turnSlice = createSlice({
  name: "turn",
  initialState,
  reducers: {
    setupGame: (state, action) =>{
    state.totalPlayers = action.payload.totalPlayers,
    state.totalWords = action.payload.totalWords

    state.totalReloads = state.totalWords * state.totalPlayers
    state.reloadsLeft = state.totalReloads
  console.log("CAIAGAGAGGASGAGAGAG", state.totalWords)
  },
    nextTurn: (state) => {
      if (state.reloadsLeft > 0) {

              if (state.totalPlayers > 1 && state.currentPlayerId < state.totalPlayers) {
                state.currentPlayerId++
                state.reloadsLeft--
                console.log("QUI")
              } else {
                state.currentWordIndex++
                state.currentPlayerId = 1
                state.reloadsLeft--
                console.log("E INVECE QUI")
              }
      }
      if (state.reloadsLeft === 0) {
        console.log("PARTITA FINITA, NON CI SONO PAROLE")    
        return
      }
},
      clearGame: () => {
      return initialState
    },
  }
})

export const { nextTurn, setupGame, clearGame} = turnSlice.actions;

export const turnSelector = (state) => state.turn;