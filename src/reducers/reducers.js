import { combineReducers } from '@reduxjs/toolkit';
import { playerSlice } from './player.slice.js';


export const reducers = combineReducers({
    player: playerSlice.reducer
})