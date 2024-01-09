import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: []
}

export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        loadProducts: (state, action) => {
            state.products = action.payload
        }
    }
})

export const {loadProducts} = productSlice.actions
export const selectProducts = (state) => state.products
export default productSlice.reducer