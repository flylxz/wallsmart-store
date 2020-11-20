import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { CardView, Search, Loading, Pagination } from '../components';
import {
  Context,
  DISABLE_BTN_TRUE,
  DISABLE_BTN_FALSE,
  SET_DATA_FETCH_TRUE,
  SET_DATA_FETCH_FALSE,
  SET_PRODUCTS,
} from '../context/';

import { apiUrl } from '../config';

export const Main = () => {
  const [search, setSearch] = useState('');
  const [order] = useState('asc');
  const [sort] = useState('title');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const history = useHistory();

  const [state, dispatch] = useContext(Context);

  const { dataFetch, disableBtn, products } = state;
  console.log(products.length, currentPage);

  useEffect(() => {
    getData();
  }, [search, currentPage]);

  const getData = async () => {
    dispatch({ type: SET_DATA_FETCH_TRUE });

    const query = `?_sort=${sort}&_order=${order}&title_like=${search}&_limit=${itemsPerPage}&_page=${currentPage}`;
    const url = `${apiUrl}/products${query}`;
    console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    dispatch({ type: SET_PRODUCTS, payload: data });
    dispatch({ type: SET_DATA_FETCH_FALSE });
  };

  const handleCreateBtn = () => {
    history.push(`/create`);
  };

  const handleEditBtn = (id) => {
    history.push(`/edit`, id);
  };

  const handleDeleteBtn = async (id) => {
    dispatch({ type: DISABLE_BTN_TRUE });
    await fetch(`${apiUrl}/products/${id}`, {
      method: 'DELETE',
    });
    dispatch({ type: DISABLE_BTN_FALSE });
  };

  const handleAddToCartBtn = async (id) => {
    dispatch({ type: DISABLE_BTN_TRUE });
    const product = products.filter((item) => item.id === id);

    const toCart = {
      id: product[0].id,
      title: product[0].title,
      description: product[0].description,
      price: product[0].price,
      quantity: 1,
    };

    await fetch(`${apiUrl}/products/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inCart: true }),
    });

    await fetch(`${apiUrl}/cart/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(toCart),
    });

    dispatch({ type: DISABLE_BTN_FALSE });
  };

  // Pagination calc
  //   Get current posts
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  //   Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (dataFetch) return <Loading />;

  return (
    <div className='wrapper'>
      <h1>Main</h1>
      <div className='tools'>
        <Search getQuery={setSearch} />

        <button className='primary' onClick={handleCreateBtn}>
          Create
        </button>
      </div>
      <CardView
        type='product'
        disableBtn={disableBtn}
        array={products}
        firstBtn={handleEditBtn}
        secondBtn={handleAddToCartBtn}
        thirdBtn={handleDeleteBtn}
      />
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={products.length}
        paginate={paginate}
      />
    </div>
  );
};
