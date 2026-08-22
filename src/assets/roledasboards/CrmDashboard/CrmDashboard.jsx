import React, { useEffect, useState } from "react";

import "./CrmDashboard.css";

import TopNavbar from "../ShareComponent/TopNavbar";
import SideMenu from "./CrmComponent/SideMenu";
import AccountWalletCard from "../ShareComponent/AccountWalletCard";
import NetworkOverview from "./CrmComponent/NetworkOverView";
import DailyEarningChart from "./CrmComponent/DailyEarningChart";

const CrmDashboard = () => {

  /* =========================================
     SIDEBAR STATE
  ========================================= */

  const [isSideMenuOpen, setIsSideMenuOpen] =
    useState(false);


  /* =========================================
     CRM DASHBOARD DATA
  ========================================= */

  const [dashboard] = useState({

    userName: "Kabir Aminu",

    accountNumber: "5000 4567 8912",

    walletBalance: 145750,

    walletChange: 12.8,


    /* =========================================
       CRM NETWORK
    ========================================= */

    totalCustomers: 385,

    totalBO: 142,


    /* =========================================
       DAILY EARNINGS
    ========================================= */

    dailyEarnings: [

      {
        date: "7 Aug",
        amount: 18000,
      },

      {
        date: "8 Aug",
        amount: 32000,
      },

      {
        date: "9 Aug",
        amount: 47000,
      },

      {
        date: "10 Aug",
        amount: 42000,
      },

      {
        date: "11 Aug",
        amount: 68000,
      },

      {
        date: "12 Aug",
        amount: 85000,
      },

      {
        date: "13 Aug",
        amount: 102000,
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
     PREVENT BODY SCROLL WHEN MENU IS OPEN
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
     NOTIFICATIONS
  ========================================= */

  const handleNotificationClick = () => {

    console.log("Open CRM notifications");

  };


  /* =========================================
     PROFILE
  ========================================= */

  const handleProfileClick = () => {

    console.log("Open CRM profile");

  };


  /* =========================================
     RENDER
  ========================================= */

  return (

    <div className="crm-dashboard">


      {/* ======================================
          TOP NAVBAR
      ====================================== */}

      <TopNavbar

        userName={
          dashboard.userName
        }

        role="Customer Relationship Manager"

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
          MAIN CONTENT
      ====================================== */}

      <main className="crm-dashboard-content">


        {/* ====================================
            ACCOUNT + WALLET
        ==================================== */}

        <section className="crm-dashboard-section">

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

        <section className="crm-dashboard-section">

          <NetworkOverview

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

        <section className="crm-dashboard-section">

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

      <div className="crm-mobile-bottom-space" />

    </div>

  );

};


export default CrmDashboard;