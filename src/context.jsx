import { createContext, useContext, useEffect, useReducer } from 'react';
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
import { getTotals } from './utils';

const url = 'https://www.course-api.com/react-useReducer-cart-project';

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
  const { totalAmount, totalCost } = getTotals(state.cart);

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
  const fetchData = async () => {
    dispatch({ type: LOADING });
    const res = await fetch(url);
    const data = await res.json();
    return data;
  };

  useEffect(() => {
    const data = fetchData();
    dispatch({ type: DISPLAY_ITEMS, payload: { data } });
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        remove,
        increase,
        decrease,
        totalAmount,
        totalCost,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalConetext = () => useContext(AppContext);
