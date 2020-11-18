import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export const Main = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getData();
  }, [search]);

  const history = useHistory();

  const getData = async (sort = 'price', order = 'asc') => {
    let query = `?_sort=${sort}&_order=${order}&q=${search}`;
    let uri = `http://localhost:5000/products${query}`;
    const res = await fetch(uri);
    const products = await res.json();
    setProducts(products);
  };

  const handleEditClick = (id) => {
    history.push(`/edit`, id);
  };

  const handleDeleteClick = async (id) => {
    await fetch(`http://localhost:5000/products/${id}`, {
      method: 'DELETE',
    });
  };

  const handleCreateClick = () => {
    history.push(`/create`);
  };

  return (
    <div className='wrapper'>
      <h1>Main</h1>

      <form>
        <input
          type='text'
          placeholder='Search...'
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      <button onClick={handleCreateClick}>Create</button>

      <ul>
        {products.map((item) => (
          <li key={item.id}>
            <div>
              <h2>{item.title}</h2>
              <h2>{item.price}</h2>
              <p>{item.description}</p>
            </div>
            <div>
              <button onClick={() => handleEditClick(item.id)}>Edit</button>
              <button onClick={() => handleDeleteClick(item.id)}>Delete</button>
              <button disabled={item.inCart}>Add to cart</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
