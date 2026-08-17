import React, { useEffect, useState } from "react";

import TopNavbar from "../ShareComponent/TopNavbar";
import SideMenu from "./scComponent/SideMenu";
import AccountWalletCard from "../ShareComponent/AccountWalletCard";
import NetworkOverview from "./scComponent/NetworkOverView";
import DailyEarningChart from "./scComponent/DailyEarningChart";

import "./scDashboard.css";

const ScDashboard = () => {
  /* =========================================
     SIDEBAR STATE
  ========================================= */

  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  /* =========================================
     SC DASHBOARD STATE
  ========================================= */

  const [dashboard] = useState({
    userName: "Samuel Christopher",
    accountNumber: "5000 9876 5432",

    walletBalance: 185750,
    walletChange: 14.8,

    /*
      These values should eventually come
      from your backend API.
    */
    totalMRM: 12,
    totalCRM: 48,
    totalCustomers: 864,
    totalBO: 315,

    dailyEarnings: [
      {
        date: "7 Aug",
        amount: 28000,
      },
      {
        date: "8 Aug",
        amount: 52000,
      },
      {
        date: "9 Aug",
        amount: 78000,
      },
      {
        date: "10 Aug",
        amount: 69000,
      },
      {
        date: "11 Aug",
        amount: 110000,
      },
      {
        date: "12 Aug",
        amount: 135000,
      },
      {
        date: "13 Aug",
        amount: 158000,
      },
    ],
  });

  /* =========================================
     CLOSE SIDEBAR WITH ESC
  ========================================= */

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && isSideMenuOpen) {
        setIsSideMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isSideMenuOpen]);

  /* =========================================
     PREVENT BODY SCROLL WHEN SIDEBAR IS OPEN
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
    console.log("Open SC notifications");
  };

  /* =========================================
     PROFILE
  ========================================= */

  const handleProfileClick = () => {
    console.log("Open SC profile");
  };

  /* =========================================
     RENDER
  ========================================= */

  return (
    <div className="sc-dashboard">

      {/* ======================================
          TOP NAVBAR
      ====================================== */}

      <TopNavbar
        userName={dashboard.userName}
        role="Super Coordinator"
        notificationCount={3}
        onMenuClick={() => setIsSideMenuOpen(true)}
        onNotificationClick={handleNotificationClick}
        onProfileClick={handleProfileClick}
      />

      {/* ======================================
          SIDE MENU
      ====================================== */}

      <SideMenu
        isOpen={isSideMenuOpen}
        onClose={() => setIsSideMenuOpen(false)}
        userName={dashboard.userName}
        accountNumber={dashboard.accountNumber}
      />

      {/* ======================================
          MAIN DASHBOARD
      ====================================== */}

      <main className="sc-dashboard-content">

        {/* ====================================
            ACCOUNT + WALLET
        ==================================== */}

        <section className="sc-dashboard-section">
          <AccountWalletCard
            accountNumber={dashboard.accountNumber}
            walletBalance={dashboard.walletBalance}
            percentageChange={dashboard.walletChange}
          />
        </section>

        {/* ====================================
            NETWORK OVERVIEW
        ==================================== */}

        <section className="sc-dashboard-section">
          <NetworkOverview
            totalMRM={dashboard.totalMRM}
            totalCRM={dashboard.totalCRM}
            totalCustomers={dashboard.totalCustomers}
            totalBO={dashboard.totalBO}
          />
        </section>

        {/* ====================================
            DAILY EARNINGS
        ==================================== */}

        <section className="sc-dashboard-section">
          <DailyEarningChart
            earnings={dashboard.dailyEarnings}
          />
        </section>

      </main>

      {/* ======================================
          MOBILE BOTTOM NAVIGATION
      ====================================== */}

      <div className="sc-mobile-bottom-space" />

    </div>
  );
};

export default ScDashboard;