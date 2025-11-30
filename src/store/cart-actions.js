import { uiActions } from "./ui";
import { cartActions } from "./cart";

// Thunk action creator for fetching cart data from Firebase
export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch("https://redux-toolkit-practice-backend-default-rtdb.firebaseio.com/cart.json");

            if (!response.ok) {
                throw new Error("Fetching cart data failed.");
            }

            const data = await response.json();
            return data;
        };

        try {
            const cartData = await fetchData();
            if (cartData) {
                dispatch(cartActions.replaceCart({
                    items: cartData.items || [],
                    totalQuantity: cartData.totalQuantity || 0
                }));
            }
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: 'Fetching cart data failed!'
            }));
        }
    };
};

// Thunk action creator for sending cart data to Firebase
export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending cart data!'
        }));

        const sendRequest = async () => {
            const response = await fetch("https://redux-toolkit-practice-backend-default-rtdb.firebaseio.com/cart.json", {
                method: "PUT",
                body: JSON.stringify(cart)
            });

            if (!response.ok) {
                throw new Error("Sending cart data failed.");
            }
        };

        try {
            await sendRequest();
            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success!',
                message: 'Cart data sent successfully!'
            }));
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: 'Sending cart data failed!'
            }));
        }
    };
};
