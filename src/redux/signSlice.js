import {createSlice} from '@reduxjs/toolkit';


export const signSlice=createSlice(
{
    name: "sign",
    initialState: {
        email: ""
    },
    reducers:{
        addEmail: (state,action)=>{
            state.email= action.payload;
        },
        removeEmail: (state)=>{
            state.email="";
        },
    }
});

export const {addEmail, removeEmail}=signSlice.actions;

export default signSlice.reducer;