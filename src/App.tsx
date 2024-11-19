import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Tracker from "./pages/Tracker";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";

import { CartProvider } from "./context/CartContext";
import { PaymentProvider } from "./context/PaymentContext";
import { MenuDataProvider } from "./context/MenuContext";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <PaymentProvider>
      <CartProvider>
        <MenuDataProvider>
          <Router>
            <div>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/payments" element={<Payment />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/tracker" element={<Tracker />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/" element={<Home />} />
              </Routes>
            </div>
          </Router>
        </MenuDataProvider>
      </CartProvider>
    </PaymentProvider>
  );
}

export default App;
