import { useState } from 'react';

export const Search = ({ getQuery }) => {
  const [search, setSearch] = useState('');
  console.log(search);

  const onChange = (q) => {
    setSearch(q);
    getQuery(q);
  };

  return (
    <section className='search'>
      <form>
        <input
          type='text'
          placeholder='Search title...'
          value={search}
          onChange={(e) => onChange(e.target.value)}
        />
      </form>
    </section>
  );
};
