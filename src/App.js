// manage the cart where we render the cart
import React, { Fragment, useState } from 'react';

import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <Fragment>
      {cartIsShown && <Cart onClose={hideCartHandler} />}

      {/* name props which hold functions, starting with on. As they are similar to custom events  */}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </Fragment>
  );
}

export default App;
