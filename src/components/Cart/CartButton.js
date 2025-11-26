import { uiActions } from '../../store/ui';
import classes from './CartButton.module.css';
import { useDispatch, useSelector } from 'react-redux';

const CartButton = (props) => {
  const totalQuantity = useSelector(state => state.cart.totalQuantity);
  const dispatch = useDispatch();

  const toggleShowCartHandler = () => {
    dispatch(uiActions.toggleShowCart());
  }

  return (
    <button className={classes.button} onClick={toggleShowCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
