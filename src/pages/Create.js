import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export const Create = () => {
  const [product, setProduct] = useState({
    title: '',
    price: '',
    description: '',
  });

  const history = useHistory();

  const createProduct = async () => {
    const newProduct = {
      id: '',
      title: product.title,
      description: product.description,
      price: product.price,
      inCart: false,
    };

    await fetch('http://localhost:5000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    });
  };

  const handleChange = (e) => {
    // e.preventDefault();
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct();
    history.push(`/main`);
  };

  return (
    <div>
      <h1>Create</h1>
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
