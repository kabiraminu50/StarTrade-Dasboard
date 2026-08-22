import { useState } from "react";
import React from 'react';
import TopNavbar from '../../component/navbar/Topnavbar';
import AccountOverview from '../../component/hero/AccountOverview';
import "./CustomerDashboard.css";
import GreetingSection from './customerComponent/GreetingSection';
import FavouriteShop from './customerComponent/FavouriteStoreComponent';
import ShopItems from './customerComponent/ShopItems';
import CartSection from './customerComponent/CartSection';
import BottomNavbar from './customerComponent/BottomNavbar'
import Sidebar from './customerComponent/Sidebar';
function CustomerDashboard() { const [isSidebarOpen, setIsSidebarOpen] =
    useState(false);

  /* =========================
     TOGGLE SIDEBAR
  ========================= */

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (

    <div className="dashboard-page">

      {/* SIDEBAR */}

      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* MAIN */}

      <div className="dashboard-container">

        {/* TOP NAVBAR */}

        <TopNavbar
          toggleSidebar={toggleSidebar}
        />

        {/* GREETING */}

        <div className="dashboard-header">

          <GreetingSection />

        </div>

        {/* COMPONENTS */}

        <AccountOverview />

        <FavouriteShop />

        <ShopItems />

        <CartSection />

      </div>

      {/* MOBILE FOOTER */}

      <BottomNavbar />

    </div>
  );
}

export default CustomerDashboard;