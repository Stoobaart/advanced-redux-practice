import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart";
import uiSlice from "./ui";

const store = configureStore({
    reducer: { cart: cartSlice, ui: uiSlice }
});

export default store;
