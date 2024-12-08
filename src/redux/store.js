import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productSlice";
import searchDataReducer from "./searchDataSlice"
import descReducer from "./descriptionDataSlice"

const store = configureStore({ reducer: { products: productsReducer,searchData:searchDataReducer,desc:descReducer } });
export default store;