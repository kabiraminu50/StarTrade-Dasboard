import React, { useEffect, useState } from "react";

import "./MrmDashboard.css";

import TopNavbar from "../ShareComponent/TopNavbar";
import SideMenu from "./MrmComponent/SideMenu";
import AccountWalletCard from "../ShareComponent/AccountWalletCard";
import NetworkOverview from "./MrmComponent/NetworkOverView";
import DailyEarningChart from "./MrmComponent/DailyEarningChart";

const MrmDashboard = () => {

  /* =========================================
     SIDEBAR STATE
  ========================================= */

  const [isSideMenuOpen, setIsSideMenuOpen] =
    useState(false);


  /* =========================================
     MRM DASHBOARD STATE
  ========================================= */

  const [dashboard] = useState({

    userName: "Kabir Aminu",

    accountNumber: "5000 1234 5678",

    walletBalance: 325750,

    walletChange: 21.5,


    /* =========================================
       MRM NETWORK
    ========================================= */

    totalSC: 6,

    totalBRM: 32,

    totalCRM: 124,

    totalCustomers: 2180,

    totalBO: 845,


    /* =========================================
       DAILY EARNINGS
    ========================================= */

    dailyEarnings: [

      {
        date: "7 Aug",
        amount: 65000,
      },

      {
        date: "8 Aug",
        amount: 95000,
      },

      {
        date: "9 Aug",
        amount: 145000,
      },

      {
        date: "10 Aug",
        amount: 125000,
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
     PREVENT BODY SCROLL
     WHEN SIDEBAR IS OPEN
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

    console.log("Open MRM notifications");

  };


  /* =========================================
     PROFILE
  ========================================= */

  const handleProfileClick = () => {

    console.log("Open MRM profile");

  };


  /* =========================================
     RENDER
  ========================================= */

  return (

    <div className="mrm-dashboard">


      {/* ======================================
          TOP NAVBAR
      ====================================== */}

      <TopNavbar

        userName={
          dashboard.userName
        }

        role="Master Relationship Manager"

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
          MAIN DASHBOARD CONTENT
      ====================================== */}

      <main className="mrm-dashboard-content">


        {/* ====================================
            ACCOUNT + WALLET
        ==================================== */}

        <section className="mrm-dashboard-section">

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

        <section className="mrm-dashboard-section">

          <NetworkOverview

            totalSC={
              dashboard.totalSC
            }

            totalBRM={
              dashboard.totalBRM
            }

            totalCRM={
              dashboard.totalCRM
            }

            totalCustomers={
              dashboard.totalCustomers
            }

            totalBO={
              dashboard.totalBO
            }

          />

        </section>


        {/* ====================================
            DAILY EARNINGS
        ==================================== */}

        <section className="mrm-dashboard-section">

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

      <div className="mrm-mobile-bottom-space" />


    </div>

  );

};


export default MrmDashboard;