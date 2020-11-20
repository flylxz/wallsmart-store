import { Route, Switch } from 'react-router-dom';

import { Main, Cart, Create, Edit } from './pages';
import { Navbar, Footer } from './components';

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path='/' exact component={Main} />
        <Route path='/cart' component={Cart} />
        <Route path='/create' component={Create} />
        <Route path='/edit' component={Edit} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
