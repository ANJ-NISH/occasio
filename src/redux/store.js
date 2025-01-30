import { configureStore } from "@reduxjs/toolkit";
import signReducer from './signSlice';

export const store=configureStore({
    reducer:{
        sign: signReducer,
    }
})
