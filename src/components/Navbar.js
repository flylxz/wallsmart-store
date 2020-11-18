// import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  // const [state, setstate] = useState('');

  return (
    <nav>
      <h1>Navbar</h1>
      <ul>
        <li>
          <Link to='/main'>Home</Link>
        </li>
        <li>
          <Link to='/cart'>Cart</Link>
        </li>
      </ul>
    </nav>
  );
};
