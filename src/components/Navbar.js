// import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  // const [state, setstate] = useState('');

  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>
            <h1>WallSmart</h1>
          </Link>
        </li>
        <li>
          <Link to='/cart'>Cart</Link>
        </li>
      </ul>
    </nav>
  );
};
