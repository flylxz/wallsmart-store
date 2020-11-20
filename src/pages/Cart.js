import { useEffect, useContext } from 'react';

import { CardView, Loading } from '../components';

import {
  Context,
  DISABLE_BTN_TRUE,
  DISABLE_BTN_FALSE,
  SET_DATA_FETCH_TRUE,
  SET_DATA_FETCH_FALSE,
  SET_CART,
} from '../context/';

import { apiUrl } from '../config';

export const Cart = () => {
  // const [cart, setCart] = useState([]);

  const [state, dispatch] = useContext(Context);

  const { cart, dataFetch, disableBtn } = state;

  useEffect(() => {
    getData();
  }, []);

  const getData = async (sort = 'price', order = 'asc') => {
    dispatch({ type: SET_DATA_FETCH_TRUE });
    let uri = `${apiUrl}/cart`;
    const res = await fetch(uri);
    const data = await res.json();
    dispatch({ type: SET_CART, payload: data });
    dispatch({ type: SET_DATA_FETCH_FALSE });
  };

  const handleDeleteBtn = async (id) => {
    dispatch({ type: DISABLE_BTN_TRUE });
    const newCart = cart.filter((item) => item.id !== id);
    dispatch({ type: SET_CART, payload: newCart });

    await fetch(`${apiUrl}/cart/${id}`, {
      method: 'DELETE',
    });

    await fetch(`${apiUrl}/products/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inCart: false }),
    });
    dispatch({ type: DISABLE_BTN_FALSE });
  };

  const addItem = async (id, quantity) => {
    const res = quantity + 1;
    dispatch({ type: DISABLE_BTN_TRUE });
    await fetch(`${apiUrl}/cart/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity: res }),
    });
    dispatch({ type: DISABLE_BTN_FALSE });
  };

  const subItem = async (id, quantity) => {
    const res = quantity - 1;

    if (res < 1) {
      return;
    }

    dispatch({ type: DISABLE_BTN_TRUE });
    await fetch(`${apiUrl}/cart/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity: res }),
    });
    dispatch({ type: DISABLE_BTN_FALSE });
  };

  const totalCount = () =>
    cart.reduce((total, i) => +i.price * +i.quantity + +total, 0);

  if (dataFetch) return <Loading />;

  return (
    <div className='wrapper'>
      <h1>Cart</h1>

      <CardView
        type='cart'
        disableBtn={disableBtn}
        array={cart}
        firstBtn={subItem}
        secondBtn={addItem}
        thirdBtn={handleDeleteBtn}
      />

      <h3 className='total-cost'>Total cost: {totalCount()}</h3>
    </div>
  );
};
