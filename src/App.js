import React, {useState} from "react";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import Cart from "./Components/Cart/Cart";
import CartProvider from "./Components/Store/CartProvider";
function App() {
  const [cartIsSHown, setcartIsSHown] = useState(false);

  const showCartHandler=()=>{
      setcartIsSHown(true);
  };

  const hideCartHandler=()=>{
    setcartIsSHown(false);
};



  return (
    <CartProvider>
      {cartIsSHown && <  Cart onClose={hideCartHandler} />}
      <Header onCartClick={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
