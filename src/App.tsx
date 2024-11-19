import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Tracker from "./pages/Tracker";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";

import { CartProvider } from "./context/CartContext";
import { PaymentProvider } from "./context/PaymentContext";

function App() {
  return (
    <PaymentProvider>
      <CartProvider>
        <Router>
          <div>
            <Routes>
              <Route path="/payments" element={<Payment />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/tracker" element={<Tracker />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </PaymentProvider>
  );
}

export default App;
