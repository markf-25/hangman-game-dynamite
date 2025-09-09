import { combineReducers } from '@reduxjs/toolkit';
import { playerSlice } from './player.slice.js';
import { turnSlice } from './turn.slice.js';


export const reducers = combineReducers({
    player: playerSlice.reducer,
    turn: turnSlice.reducer
})