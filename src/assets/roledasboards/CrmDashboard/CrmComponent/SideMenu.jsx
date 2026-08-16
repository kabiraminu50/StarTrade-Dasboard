import React from "react";
import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Network,
  UsersRound,
  UserRound,
  Store,
  ContactRound,
  CircleDollarSign,
  ArrowLeftRight,
  FileBarChart,
  WalletCards,
  CircleHelp,
  Settings,
  Copy,
  X,
} from "lucide-react";

import "./SideMenu.css";

const SideMenu = ({
  isOpen,
  onClose,

  userName = "Kabir Aminu",
  accountNumber = "5000 1234 5678",
}) => {

  const menuItems = [
    {
      label: "Dashboard",
      path: "/rm/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "My Structure",
      path: "/rm/network",
      icon: Network,
    },
    {
      label: "SC Management",
      path: "/rm/sc-management",
      icon: UsersRound,
    },
    {
      label: "BRM Management",
      path: "/rm/brm-management",
      icon: UsersRound,
    },
    {
      label: "CRM Management",
      path: "/rm/crm-management",
      icon: UserRound,
    },
    {
      label: "BO Management",
      path: "/rm/bo-management",
      icon: Store,
    },
    {
      label: "Customer Overview",
      path: "/rm/customers",
      icon: ContactRound,
    },
    {
      label: "Earnings",
      path: "/rm/earnings",
      icon: CircleDollarSign,
    },
    {
      label: "Transactions",
      path: "/rm/transactions",
      icon: ArrowLeftRight,
    },
    {
      label: "Reports",
      path: "/rm/reports",
      icon: FileBarChart,
    },
    {
      label: "Wallet & Account",
      path: "/rm/wallet",
      icon: WalletCards,
    },
    {
      label: "Support",
      path: "/rm/support",
      icon: CircleHelp,
    },
    {
      label: "Settings",
      path: "/rm/settings",
      icon: Settings,
    },
  ];


  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        accountNumber.replace(/\s/g, "")
      );
    } catch (error) {
      console.error(
        "Failed to copy account number:",
        error
      );
    }
  };


  return (
    <>
      {/* =========================================
          OVERLAY
      ========================================= */}

      <div
        className={`side-menu-overlay ${
          isOpen ? "show" : ""
        }`}
        onClick={onClose}
      />


      {/* =========================================
          SIDEBAR
      ========================================= */}

      <aside
        className={`side-menu ${
          isOpen ? "open" : ""
        }`}
        aria-hidden={!isOpen}
      >

        {/* Header */}

        <div className="side-menu-header">

          <div className="side-menu-logo">

            <span className="star-logo">
              ★
            </span>

            <span>
              StarTrade
            </span>

          </div>


          <button
            type="button"
            className="side-menu-close"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={22} />
          </button>

        </div>


        {/* Profile */}

        <div className="side-menu-profile">

          <div className="side-menu-avatar">
            RM
          </div>

          <div className="side-menu-profile-info">

            <p>
              Relationship Manager
            </p>

            <span>
              RM Dashboard
            </span>

          </div>

        </div>


        {/* Menu */}

        <nav className="side-menu-list">

          {menuItems.map((item) => {

            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `side-menu-item ${
                    isActive ? "active" : ""
                  }`
                }
              >

                <Icon
                  size={20}
                  strokeWidth={1.8}
                />

                <span>
                  {item.label}
                </span>

              </NavLink>
            );
          })}

        </nav>


        {/* Account */}

        <div className="side-menu-account">

          <p>
            RM Account Number
          </p>

          <div className="side-menu-account-row">

            <strong>
              {accountNumber}
            </strong>

            <button
              type="button"
              onClick={handleCopy}
              aria-label="Copy account number"
            >
              <Copy size={18} />
            </button>

          </div>

        </div>

      </aside>
    </>
  );
};

export default SideMenu;