import { createSlice } from "@reduxjs/toolkit";

const descSlice=createSlice({
    name:"desc",
    initialState:{value:null},
    reducers:{
        descData:(state,action)=>{
             state.value=action.payload
        }
    }

})

export const {descData} = descSlice.actions

export default descSlice.reducer;