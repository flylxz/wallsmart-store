export const Pagination = ({ itemsPerPage, totalItems, paginate, active }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <section>
      <ul className='pagination'>
        {pageNumbers.map((number, idx) => (
          <li
            key={number}
            className={active === idx + 1 ? 'active' : ''}
            onClick={() => paginate(number)}
          >
            {number}
          </li>
        ))}
      </ul>
    </section>
  );
};
