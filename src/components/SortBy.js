export const SortBy = ({ array, active, onSelect }) => {
  return (
    <ul className='sorting'>
      {array.map((item) => (
        <li
          key={item.name}
          value={item.type}
          className={active === item.type ? 'active' : ''}
          onClick={() => onSelect(item.type)}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};
