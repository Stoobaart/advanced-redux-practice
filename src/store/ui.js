import { createSlice } from '@reduxjs/toolkit';

const uiInitialState = {
    showCart: false,
    notification: null
};

const uiSlice = createSlice({
    name: 'ui',
    initialState: uiInitialState,
    reducers: {
        toggleShowCart(state) {
            state.showCart = !state.showCart;
        },
        showNotification(state, action) {
            state.notification = {
                status: action.payload.status,
                title: action.payload.title,
                message: action.payload.message
            };
        },
        clearNotification(state) {
            state.notification = null;
        }
    }
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;