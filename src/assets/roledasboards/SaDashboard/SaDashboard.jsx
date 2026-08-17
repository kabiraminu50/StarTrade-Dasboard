import React, { useEffect, useState } from "react";

import "./SaDashboard.css";

import TopNavbar from "../ShareComponent/TopNavbar";
import SideMenu from "./SaComponent/SideMenu";
import AccountWalletCard from "../ShareComponent/AccountWalletCard";
import NetworkOverview from "./SaComponent/NetworkOverView";
import DailyEarningChart from "./SaComponent/DailyEarningChart";

const SaDashboard = () => {

  /* =========================================
     SIDEBAR STATE
  ========================================= */

  const [isSideMenuOpen, setIsSideMenuOpen] =
    useState(false);


  /* =========================================
     SA DASHBOARD DATA
  ========================================= */

  const [dashboard] = useState({

    userName: "Kabir Aminu",

    accountNumber: "5000 2468 1357",

    walletBalance: 425750,

    walletChange: 24.6,


    /* =========================================
       SA NETWORK DATA

       Keep these values aligned with the
       actual SA hierarchy.
    ========================================= */
    totalRM: 1,

    totalMRM: 4,

    totalSC: 18,

    totalMRM: 86,

    totalDA: 234,

    totalCRM: 310,

    totalCustomers: 5240,

    totalBO: 1980,


    /* =========================================
       DAILY EARNINGS
    ========================================= */

    dailyEarnings: [

      {
        date: "7 Aug",
        amount: 85000,
      },

      {
        date: "8 Aug",
        amount: 125000,
      },

      {
        date: "9 Aug",
        amount: 185000,
      },

      {
        date: "10 Aug",
        amount: 165000,
      },

      {
        date: "11 Aug",
        amount: 245000,
      },

      {
        date: "12 Aug",
        amount: 315000,
      },

      {
        date: "13 Aug",
        amount: 380000,
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

    console.log("Open SA notifications");

  };


  /* =========================================
     PROFILE
  ========================================= */

  const handleProfileClick = () => {

    console.log("Open SA profile");

  };


  /* =========================================
     RENDER
  ========================================= */

  return (

    <div className="sa-dashboard">


      {/* ======================================
          TOP NAVBAR
      ====================================== */}

      <TopNavbar

        userName={
          dashboard.userName
        }

        role="Super Administrator"

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

        isOpen={
          isSideMenuOpen
        }

        onClose={() =>
          setIsSideMenuOpen(false)
        }

        userName={
          dashboard.userName
        }

        accountNumber={
          dashboard.accountNumber
        }

      />


      {/* ======================================
          MAIN DASHBOARD
      ====================================== */}

      <main className="sa-dashboard-content">


        {/* ====================================
            ACCOUNT + WALLET
        ==================================== */}

        <section className="sa-dashboard-section">

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

        </section>


        {/* ====================================
            NETWORK OVERVIEW
        ==================================== */}

        <section className="sa-dashboard-section">

          <NetworkOverview
  totalRM={dashboard.totalRM}
  totalMRM={dashboard.totalMRM}
  totalSC={dashboard.totalSC}
  totalMRM={dashboard.totalMRM}
  totalCRM={dashboard.totalCRM}
  totalDA={dashboard.totalDA}
  totalCustomers={dashboard.totalCustomers}
  totalBO={dashboard.totalBO}
/>
        </section>


        {/* ====================================
            DAILY EARNINGS
        ==================================== */}

        <section className="sa-dashboard-section">

          <DailyEarningChart

            earnings={
              dashboard.dailyEarnings
            }

          />

        </section>


      </main>


      {/* ======================================
          MOBILE BOTTOM SPACE
      ====================================== */}

      <div className="sa-mobile-bottom-space" />


    </div>

  );

};


export default SaDashboard;