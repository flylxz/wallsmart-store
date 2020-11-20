import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Form } from '../components';
import { apiUrl } from '../config';

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

    await fetch(`${apiUrl}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    });
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    createProduct();
    history.push(`/`);
  };

  return (
    <Form
      title={'Create product'}
      product={product}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
    />
  );
};
