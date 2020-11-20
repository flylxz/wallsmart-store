import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { CardView, Search, Loading, Pagination, SortBy } from '../components';
import {
  Context,
  DISABLE_BTN_TRUE,
  DISABLE_BTN_FALSE,
  SET_DATA_FETCH_TRUE,
  SET_DATA_FETCH_FALSE,
  SET_PRODUCTS,
} from '../context/';

import { apiUrl } from '../config';

const sortItems = [
  { name: 'Title', type: 'title' },
  { name: 'Price', type: 'price' },
];

const sortOrder = [
  { name: 'Asc', type: 'asc' },
  { name: 'Desc', type: 'desc' },
];

export const Main = () => {
  const [search, setSearch] = useState('');
  const [order, setOrder] = useState('asc');
  const [sort, setSort] = useState('title');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalPage, setTotalPage] = useState(1);

  const history = useHistory();

  const [state, dispatch] = useContext(Context);

  const { dataFetch, disableBtn, products } = state;

  useEffect(() => {
    getData();
  }, [search, currentPage, sort, order]);

  const getData = async () => {
    dispatch({ type: SET_DATA_FETCH_TRUE });

    const query = `?_sort=${sort}&_order=${order}&title_like=${search}&_limit=${itemsPerPage}&_page=${currentPage}`;
    const url = `${apiUrl}/products${query}`;
    console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    setTotalPage(res.headers.get('X-Total-Count'));

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

  // Pagination change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Render
  if (dataFetch) return <Loading />;

  return (
    <div className='wrapper'>
      <h1>Main</h1>
      <div className='tools'>
        <Search getQuery={setSearch} />
        <section className='sorting'>
          Sort by:
          <SortBy array={sortItems} active={sort} onSelect={setSort} />
          <SortBy array={sortOrder} active={order} onSelect={setOrder} />
        </section>

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
        totalItems={totalPage}
        paginate={paginate}
        active={currentPage}
      />
    </div>
  );
};
