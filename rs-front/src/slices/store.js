import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import productReducer from "./productSlice"
import basketReducer from "./basketSlice"

const store = configureStore({
    reducer: {
        user: userReducer,
        products: productReducer,
        basket: basketReducer
    }
})


export default store