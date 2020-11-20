export const CardView = (props) => {
  const { type, array, disableBtn, firstBtn, secondBtn, thirdBtn } = props;

  return (
    <ul className='products'>
      {array.map((item) => (
        <li key={item.id}>
          <div className='product-info'>
            <h2 className='product-title'>{item.title}</h2>
            <h2 className='product-price'>{item.price}</h2>
            <p className='product-description'>{item.description}</p>
          </div>
          <div className='product-buttons'>
            <button
              disabled={item.quantity <= 1 || disableBtn}
              onClick={() => firstBtn(item.id, item.quantity)}
              className='primary'
            >
              {type === 'product' ? 'Edit' : '-1'}
            </button>
            {type === 'cart' ? (
              <p className='product-quantity'>In cart: {item.quantity}</p>
            ) : (
              ''
            )}
            <button
              disabled={item.inCart || disableBtn}
              onClick={() => secondBtn(item.id, item.quantity)}
              className='success'
            >
              {type === 'product' ? 'Add to cart' : '+1'}
            </button>
            <button
              disabled={disableBtn}
              onClick={() => thirdBtn(item.id)}
              className='error'
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};
