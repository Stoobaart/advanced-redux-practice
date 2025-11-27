import { useSelector, useDispatch } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useEffect, useRef } from 'react';
import Notification from './components/UI/Notification';
import { uiActions } from './store/ui';
import { cartActions } from './store/cart';

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector(state => state.ui.showCart);
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification);
  const isInitial = useRef(true);

  // Fetch cart data on initial render
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await fetch("https://redux-toolkit-practice-backend-default-rtdb.firebaseio.com/cart.json");

        if (!response.ok) {
          throw new Error("Fetching cart data failed.");
        }

        const data = await response.json();

        if (data) {
          dispatch(cartActions.replaceCart({
            items: data.items || [],
            totalQuantity: data.totalQuantity || 0
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

    fetchCartData();
  }, [dispatch]);

  useEffect(() => {
    // Skip sending on initial render
    if (isInitial.current) {
      isInitial.current = false;
      return;
    }

    const sendCartData = async () => {
      dispatch(uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!'
      }));

      try {
        const response = await fetch("https://redux-toolkit-practice-backend-default-rtdb.firebaseio.com/cart.json", {
          method: "PUT",
          body: JSON.stringify(cart)
        });

        if (!response.ok) {
          throw new Error("Sending cart data failed.");
        }

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

    sendCartData();
  }, [cart, dispatch]);

  // Auto-hide notification after 4 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        dispatch(uiActions.clearNotification());
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [notification, dispatch]);

  return (
    <Layout>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
          onClose={() => dispatch(uiActions.clearNotification())}
        />
      )}
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
