export const DISABLE_BTN_TRUE = 'DISABLE_BTN_TRUE';
export const DISABLE_BTN_FALSE = 'DISABLE_BTN_FALSE';
export const SET_DATA_FETCH_TRUE = 'SET_DATA_FETCH_TRUE';
export const SET_DATA_FETCH_FALSE = 'SET_DATA_FETCH_FALSE';
export const CREATE_NEW_PRODUCT = 'CREATE_NEW_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';
export const SET_CART = 'SET_CART';

export const reducer = (state, action) => {
  switch (action.type) {
    case DISABLE_BTN_FALSE:
      return { ...state, disableBtn: false };
    case DISABLE_BTN_TRUE:
      return { ...state, disableBtn: true };
    case SET_DATA_FETCH_FALSE:
      return { ...state, dataFetch: false };
    case SET_DATA_FETCH_TRUE:
      return { ...state, dataFetch: true };
    // case CREATE_NEW_PRODUCT:
    // return {...state, state:}
    case SET_PRODUCTS:
      return { ...state, products: action.payload };
    case SET_CART:
      return { ...state, cart: action.payload };
    default:
      return { ...state };
  }
};
