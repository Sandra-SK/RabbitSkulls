import { createSlice } from "@reduxjs/toolkit";

const initialState = {
basket: JSON.parse(window.localStorage.getItem('rs-basket')) || [],
totalPrice: 0
};

const basketSlice = createSlice({
name: "basket",
initialState,
reducers: {
modifyBasket: (state, action) => {
state.basket = action.payload;
state.totalPrice = calculateTotalBasket(state.basket);
},
cleanBasket: (state) => {
state.basket = [];
state.totalPrice = 0;
}
}
});

const calculateTotalBasket = (basket) => {
return basket.reduce((total, product) => {
return total + parseFloat(product.sellingPrice) * parseInt(product.quantityInCart);
}, 0);
};

export const { modifyBasket, cleanBasket } = basketSlice.actions;
export const selectBasket = (state) => state.basket;
export const selectTotalBasket = (state) => state.totalPrice;
export default basketSlice.reducer;