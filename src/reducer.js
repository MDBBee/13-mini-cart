import {
  CLEAR_CART,
  INCREASE,
  DECREASE,
  REMOVE,
  DISPLAY_ITEMS,
  LOADING,
} from './actions';
import { toast } from 'react-toastify';

const reducer = (state, action) => {
  if (action.type === CLEAR_CART) return { ...state, cart: new Map() };

  if (action.type === REMOVE) {
    const newCart = new Map(state.cart);
    newCart.delete(action.payload.id);
    toast.success('Update was a success !');
    return { ...state, cart: newCart };
  }

  if (action.type === INCREASE) {
    const newCart = new Map(state.cart);
    const newValue = newCart.get(action.payload.id);
    const updatedAmount = newValue.amount + 1;

    const updatedCart = newCart.set(action.payload.id, {
      ...newValue,
      amount: updatedAmount,
    });

    return { ...state, cart: updatedCart };
  }

  if (action.type === DECREASE) {
    const newCart = new Map(state.cart);
    const newValue = newCart.get(action.payload.id);

    if (newValue.amount === 1) {
      newCart.delete(action.payload.id);
      return { ...state, cart: newCart };
    }
    const updatedAmount = newValue.amount - 1;

    const updatedCart = newCart.set(action.payload.id, {
      ...newValue,
      amount: updatedAmount,
    });

    return { ...state, cart: updatedCart };
  }

  if (action.type === LOADING) {
    return { ...state };
  }

  if (action.type === DISPLAY_ITEMS) {
    return { ...state };
  }

  throw new Error(`No matching action type of : ${action.type}`);
};

export default reducer;
