import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPlayers: 0,
  currentPlayerId: 1,
  currentWordIndex: 0,
  totalWords: 0
}

export const turnSlice = createSlice({
  name: "turn",
  initialState,
  reducers: {
    setupGame: (state, action) =>{
    state.totalPlayers = action.payload.totalPlayers,
    state.totalWords = action.payload.totalWords
  console.log("CAIAGAGAGGASGAGAGAG", state.totalWords)
  },
    nextTurn: (state) => {
      if (state.currentWordIndex < state.totalWords) {

              if (state.currentPlayerId < state.totalPlayers) {
                state.currentPlayerId++
                console.log("QUI")
              } else {
                state.currentWordIndex++
                state.currentPlayerId = 1
                console.log("E INVECE QUI")
              }
      }
      if (state.currentWordIndex === state.totalWords) {
        console.log("PARTITA FINITA, NON CI SONO PAROLE")    
      }
},
      clearGame: () => {
      return initialState
    },
  }
})

export const { nextTurn, setupGame, clearGame} = turnSlice.actions;

export const turnSelector = (state) => state.turn;