import { useState, useCallback } from 'react';

export const Search = ({ getQuery }) => {
  const [search, setSearch] = useState('');

  const onChange = (e) => {
    e.preventDefault();
    getQuery(search);
  };

  return (
    <section className='search'>
      <form onSubmit={onChange}>
        <input
          type='text'
          placeholder='Search title...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input type='submit' value='Search' />
        <input type='submit' value='Reset' onClick={() => setSearch('')} />
      </form>
    </section>
  );
};
