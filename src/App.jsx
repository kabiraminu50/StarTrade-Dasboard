import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./assets/pages/auth/login";
import Dashboard from "./assets/pages/businessOwner/dashboard";
import AddShop from "./assets/pages/businessOwner/addShop";
import ViewAllGoods from "./assets/pages/businessOwner/viewAllGoods";
import Transfer from "./assets/pages/businessOwner/transfer";
import UpdateItem from "./assets/pages/businessOwner/updateItem";
import ShopFeature from "./assets/pages/businessOwner/shopFeature";

import CustomerDashboard from "./assets/pages/customer/customerDashboard";
import AllItems from "./assets/pages/customer/cutomerPages/CustomerAllItems";
import AllStore from "./assets/pages/customer/cutomerPages/AllStore";
import Cart from "./assets/pages/customer/cutomerPages/Cart";
import CustomerOrder from "./assets/pages/customer/cutomerPages/CustomerOrder";
import CustomerProfile from "./assets/pages/customer/cutomerPages/CustomerProfile";
import PayOut from "./assets/pages/customer/cutomerPages/PayOut";
import FevoriteStore from "./assets/pages/customer/cutomerPages/FevoriteStore";

function App() {
  const [cart, setCart] = useState([]);

  const increase = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              }
            : cartItem
        );
      }

      return [
        ...prevCart,
        {
          ...item,
          quantity: 1,
        },
      ];
    });
  };

  const decrease = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem.id === item.id
      );

      if (!existingItem) return prevCart;

      if (existingItem.quantity === 1) {
        return prevCart.filter(
          (cartItem) => cartItem.id !== item.id
        );
      }

      return prevCart.map((cartItem) =>
        cartItem.id === item.id
          ? {
              ...cartItem,
              quantity: cartItem.quantity - 1,
            }
          : cartItem
      );
    });
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-shop" element={<AddShop />} />
        <Route path="/view-all-goods" element={<ViewAllGoods />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/update-item/:id" element={<UpdateItem />} />
        <Route path="/shop-feature" element={<ShopFeature />} />

        <Route path="/customer/transfer" element={<Transfer />} />
        <Route path="/customer/dashboard" element={<CustomerDashboard />} />
        <Route path="/customer/all-stores" element={<AllStore />} />

        <Route
          path="/customer/all-items"
          element={
            <AllItems
              cart={cart}
              increase={increase}
              decrease={decrease}
            />
          }
        />

        <Route
          path="/customer/cart"
          element={
            <Cart
              cart={cart}
              increase={increase}
              decrease={decrease}
            />
          }
        />

        <Route
          path="/customer/fevorite-stores"
          element={<FevoriteStore />}
        />

        <Route
          path="/customer/orders"
          element={<CustomerOrder />}
        />

        <Route
          path="/customer/profile"
          element={<CustomerProfile />}
        />

        <Route
          path="/customer/payout"
          element={<PayOut />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;