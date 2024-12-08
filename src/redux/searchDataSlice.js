import { createSlice } from "@reduxjs/toolkit";

const searchSlice=createSlice({
    name:"searchData",
    initialState:{list:[]},
    reducers:{
        filterData:(state,action)=>{
             state.list=action.payload
        }
    }

})

export const {filterData} = searchSlice.actions

export default searchSlice.reducer;