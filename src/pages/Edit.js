import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Form } from '../components';
import { apiUrl } from '../config';

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
    const res = await fetch(`${apiUrl}/products/?id=${id}`);
    const data = await res.json();
    setProduct(...data);
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // 404 status
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${apiUrl}/products/?id=${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    history.push(`/`);
  };

  return (
    <Form
      title={'Edit product'}
      product={product}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
    />
  );
};
