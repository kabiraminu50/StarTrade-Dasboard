import React from 'react';
import TopNavbar from '../../component/navbar/topnavbar';
import AccountOverview from '../../component/hero/AccountOverview';
import "./customerDashboard.css";
import GreetingSection from '../../component/GreetingSection';
import FavouriteShop from '../../component/FavouriteShop';
import ShopItems from '../../component/ShopItems';
import CartSection from '../../component/CartSection';
import BottomNavbar from '../../component/BottomNavbar'
function CustomerDashboard() {
  return (
   <div className="dashboard-page">

  <div className="dashboard-container">

    <TopNavbar />

    <div className="dashboard-header">
      <GreetingSection />
    </div>

    <AccountOverview />
     <FavouriteShop />
      <ShopItems/>
     <CartSection/>
    <BottomNavbar/>
  </div>

</div>
  )
}

export default CustomerDashboard