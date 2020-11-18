import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export const Edit = ({ location }) => {
  const [product, setProduct] = useState({
    title: '',
    price: '',
    description: '',
  });

  const history = useHistory();

  const id = location.state;

  useEffect(() => {
    getData(id);
  }, [id]);

  const getData = async (id) => {
    let uri = `http://localhost:5000/products?id=${id}`;
    const res = await fetch(uri);
    const data = await res.json();
    setProduct(...data);
  };

  const handleChange = (e) => {
    // e.preventDefault();
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit');
    history.push(`/main`);
  };

  return (
    <div>
      <h1>Edit</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={product.title}
          name='title'
          onChange={(e) => handleChange(e)}
        />
        <input
          type='text'
          value={product.price}
          name='price'
          onChange={(e) => handleChange(e)}
        />
        <textarea
          type='text'
          value={product.description}
          name='description'
          onChange={(e) => handleChange(e)}
        />
        <input type='submit' value='Save' />
      </form>
    </div>
  );
};
