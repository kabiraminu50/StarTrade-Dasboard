import React, { useEffect, useState } from "react";

import TopNavbar from "../ShareComponent/TopNavbar";
import SideMenu from "./rmComponent/SideMenu";
import AccountWalletCard from "../ShareComponent/AccountWalletCard";
import NetworkOverview from "./rmComponent/NetworkOverView";
import DailyEarningChart from "./rmComponent/DailyEarningChart";

import "./RmDashboard.css";


const RmDashboard = () => {

  /* =========================================
     SIDEBAR STATE
  ========================================= */

  const [isSideMenuOpen, setIsSideMenuOpen] =
    useState(false);


  /* =========================================
     DASHBOARD STATE
  ========================================= */

  const [dashboard, setDashboard] = useState({
    userName: "Kabir Aminu",
    accountNumber: "5000 1234 5678",

    walletBalance: 245750,
    walletChange: 18.6,

    totalSC: 6,
    totalMRM: 42,
    totalCRM: 156,
    totalCustomers: 2568,
    totalBO: 1024,

    dailyEarnings: [
      {
        date: "7 Aug",
        amount: 45000,
      },
      {
        date: "8 Aug",
        amount: 95000,
      },
      {
        date: "9 Aug",
        amount: 155000,
      },
      {
        date: "10 Aug",
        amount: 120000,
      },
      {
        date: "11 Aug",
        amount: 180000,
      },
      {
        date: "12 Aug",
        amount: 235000,
      },
      {
        date: "13 Aug",
        amount: 290000,
      },
    ],
  });


  /* =========================================
     CLOSE SIDEBAR WITH ESC
  ========================================= */

  useEffect(() => {

    const handleEscape = (event) => {

      if (
        event.key === "Escape" &&
        isSideMenuOpen
      ) {
        setIsSideMenuOpen(false);
      }

    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };

  }, [isSideMenuOpen]);


  /* =========================================
     PREVENT BODY SCROLL WHEN MENU OPEN
  ========================================= */

  useEffect(() => {

    if (isSideMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };

  }, [isSideMenuOpen]);


  /* =========================================
     NOTIFICATION
  ========================================= */

  const handleNotificationClick = () => {
    console.log("Open notifications");
  };


  /* =========================================
     PROFILE
  ========================================= */

  const handleProfileClick = () => {
    console.log("Open RM profile");
  };


  /* =========================================
     RENDER
  ========================================= */

  return (
    <div className="rm-dashboard">

      {/* ======================================
          TOP NAVBAR
      ====================================== */}

      <TopNavbar
        userName={dashboard.userName}

        role="Relationship Manager"

        notificationCount={3}

        onMenuClick={() =>
          setIsSideMenuOpen(true)
        }

        onNotificationClick={
          handleNotificationClick
        }

        onProfileClick={
          handleProfileClick
        }
      />


      {/* ======================================
          SIDE MENU
      ====================================== */}

      <SideMenu
        isOpen={isSideMenuOpen}

        onClose={() =>
          setIsSideMenuOpen(false)
        }

        userName={dashboard.userName}

        accountNumber={
          dashboard.accountNumber
        }
      />


      {/* ======================================
          MAIN CONTENT
      ====================================== */}

      <main className="dashboard-content">

        {/* Account + Wallet */}

        <AccountWalletCard
          accountNumber={
            dashboard.accountNumber
          }

          walletBalance={
            dashboard.walletBalance
          }

          percentageChange={
            dashboard.walletChange
          }
        />


        {/* Network */}

        <NetworkOverview
          totalSC={dashboard.totalSC}

          totalMRM={dashboard.totalMRM}

          totalCRM={dashboard.totalCRM}

          totalCustomers={
            dashboard.totalCustomers
          }

          totalBO={dashboard.totalBO}
        />


        {/* Earnings */}

        <DailyEarningChart
          earnings={
            dashboard.dailyEarnings
          }
        />

      </main>


      {/* ======================================
          MOBILE BOTTOM NAVIGATION
      ====================================== */}

      

    </div>
  );
};


export default RmDashboard;