import { createContext, useReducer } from 'react';
import { reducer } from './reducer';

const initialState = {
  products: [],
  cart: [],
  dataFetch: true,
  disableBtn: false,
};

export const Store = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext(initialState);
