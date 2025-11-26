import { createSlice } from '@reduxjs/toolkit';

const uiInitialState = {
    showCart: false
};

const uiSlice = createSlice({
    name: 'ui',
    initialState: uiInitialState,
    reducers: {
        toggleShowCart(state) {
            state.showCart = !state.showCart;
        }
    }
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;