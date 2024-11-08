import { createContext, useContext, useReducer } from 'react';
import reducer from './reducer';
import cartItems from './data';
import {
  CLEAR_CART,
  INCREASE,
  DECREASE,
  REMOVE,
  DISPLAY_ITEMS,
  LOADING,
} from './actions';

const mapTypeCartItems = new Map(
  cartItems.map((item) => {
    const { id, ...others } = item;
    return [id, { ...others }];
  })
);

const AppContext = createContext();

const defaultState = {
  isLoading: false,
  cart: mapTypeCartItems,
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  const remove = (id) => {
    dispatch({ type: REMOVE, payload: { id } });
  };

  const increase = (id) => {
    dispatch({ type: INCREASE, payload: { id } });
  };

  const decrease = (id) => {
    dispatch({ type: DECREASE, payload: { id } });
  };

  return (
    <AppContext.Provider
      value={{ ...state, clearCart, remove, increase, decrease }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalConetext = () => useContext(AppContext);
