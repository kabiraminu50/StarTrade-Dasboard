import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Activation imports
import Activation from "./assets/staffOnboarding/ActivateAccount";


//staffOnboarding imports
import StaffOnboarding from "./assets/staffOnboarding/StaffOnboarding";
import RmDashboard from "./assets/roledasboards/rmDashboard/RmDashboard";
import ScDashboard from "./assets/roledasboards/ScDashboard/ScDashboard";
import MrmDashboard from "./assets/roledasboards/MrmDashboard/MrmDashboard";
import CrmDashboard from "./assets/roledasboards/CrmDashboard/CrmDashboard";
import SaDashboard from "./assets/roledasboards/SaDashboard/SaDashboard";


import Login from "./assets/roledasboards/auth/login";
import Dashboard from "./assets/roledasboards/businessOwner/Dashboard";
import AddShop from "./assets/roledasboards/businessOwner/AddShop";
import ViewAllGoods from "./assets/roledasboards/businessOwner/ViewAllGoods";
import Transfer from "./assets/roledasboards/businessOwner/Transfer";
import UpdateItem from "./assets/roledasboards/businessOwner/UpdateItem";
import ShopFeature from "./assets/roledasboards/businessOwner/ShopFeature";
/// Bo Dashboard
import CustomerDashboard from "./assets/roledasboards/customer/CustomerDashboard";
import AllItems from "./assets/roledasboards/customer/cutomerPages/CustomerAllItems";
import AllStore from "./assets/roledasboards/customer/cutomerPages/AllStore";
import Cart from "./assets/roledasboards/customer/cutomerPages/Cart";
import CustomerOrder from "./assets/roledasboards/customer/cutomerPages/CustomerOrder";
import CustomerProfile from "./assets/roledasboards/customer/cutomerPages/CustomerProfile";
import PayOut from "./assets/roledasboards/customer/cutomerPages/PayOut";
import FevoriteStore from "./assets/roledasboards/customer/cutomerPages/FevoriteStore";

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
        //staffOnboarding Routes
        <Route path="/staff-onboarding" element={<StaffOnboarding />} />
        <Route path="/activate-account/:id" element={<Activation />} />
        <Route path="/rm/dashboard" element={<RmDashboard />} />
        <Route path="/sc/dashboard" element={<ScDashboard />} />
        <Route path="/mrm/dashboard" element={<MrmDashboard />} />
        <Route path="/crm/dashboard" element={<CrmDashboard />} />
        <Route path="/sa/dashboard" element={<SaDashboard />} />

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