import { createContext, useEffect, useReducer } from 'react';
import { reducer } from './reducer';

const initialState = {
  products: [],
  cart: [],
  dataFetch: true,
  disableBtn: false,
};

export const Store = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // const fetchData=()=>{
  //   const query = `?_sort=${sort}&_order=${order}&title_like=${search}&_limit=${itemsPerPage}&_page=${currentPage}`;
  //   const url = `${apiUrl}/products${query}`;
  //   console.log(url);
  //   const res = await fetch(url);
  //   const data = await res.json();
  //   setTotalPage(res.headers.get('X-Total-Count'));
  // }

  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext(initialState);
