import { useSelector, useDispatch } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useEffect, useRef } from 'react';
import Notification from './components/UI/Notification';
import { uiActions } from './store/ui';
import { fetchCartData, sendCartData } from './store/cart-actions';

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector(state => state.ui.showCart);
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification);
  const isInitial = useRef(true);

  // Fetch cart data on initial render
  useEffect(() => {
    dispatch(fetchCartData()).then(() => {
      isInitial.current = false;
    });
  }, [dispatch]);

  useEffect(() => {
    // Skip sending until initial fetch completes
    if (isInitial.current) {
      return;
    }

    dispatch(sendCartData(cart));
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
