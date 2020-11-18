import { Route } from 'react-router-dom';

import { Main, Cart, Create, Edit } from './pages';
import { Navbar, Footer } from './components';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Route path='/main' component={Main} />
      <Route path='/cart' component={Cart} />
      <Route path='/create' component={Create} />
      <Route path='/edit' component={Edit} />
      <Footer />
    </div>
  );
}

export default App;
