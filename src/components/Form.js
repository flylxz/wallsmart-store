export const Form = (props) => {
  const { title, product, handleSubmit, handleChange } = props;
  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit}>
        <ul className='form-items'>
          <li>
            <h1>{title}</h1>
          </li>
          <li>
            <label htmlFor='id'>Title</label>
            <input
              type='text'
              value={product.title}
              placeholder='Enter title...'
              name='title'
              id='title'
              onChange={(e) => handleChange(e)}
              required
              autoFocus
            />
          </li>
          <li>
            <label htmlFor='price'>Price</label>
            <input
              type='text'
              value={product.price}
              placeholder='Enter price...'
              name='price'
              id='price'
              onChange={(e) => handleChange(e)}
              required
            />
          </li>
          <li>
            <label htmlFor='description'>Description</label>
            <textarea
              type='text'
              value={product.description}
              placeholder='Enter description...'
              name='description'
              id='description'
              onChange={(e) => handleChange(e)}
              required
            />
          </li>
          <li>
            <input
              type='submit'
              className={title === 'Create product' ? 'success' : 'primary'}
              value='Save'
            />
          </li>
        </ul>
      </form>
    </div>
  );
};
