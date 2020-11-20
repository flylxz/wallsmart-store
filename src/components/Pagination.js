export const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage) + 1; i++) {
    pageNumbers.push(i);
  }

  return (
    <section>
      <ul className='pagination'>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className='page-item'
            onClick={() => paginate(number)}
          >
            {number}
          </li>
        ))}
      </ul>
    </section>
  );
};
