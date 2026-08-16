import React from "react";
import {
  Menu,
  Bell,
  Star,
} from "lucide-react";

import "./TopNavbar.css";

const TopNavbar = ({
  userName = "Kabir Aminu",
  role = "Relationship Manager",
  notificationCount = 3,

  onMenuClick,
  onNotificationClick,
  onProfileClick,
}) => {
  return (
    <header className="top-navbar">

      <div className="navbar-top">

        {/* =========================================
            LEFT - MENU
        ========================================= */}

        <button
          type="button"
          className="navbar-icon-btn menu-btn"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          aria-haspopup="true"
        >
          <Menu size={26} strokeWidth={2} />
        </button>


        {/* =========================================
            CENTER - STARTRADE LOGO
        ========================================= */}

        <div className="startrade-logo">

          <div className="logo-star">
            <Star
              size={31}
              strokeWidth={1.5}
              fill="currentColor"
            />
          </div>

          <span>
            StarTrade
          </span>

        </div>


        {/* =========================================
            RIGHT - ACTIONS
        ========================================= */}

        <div className="navbar-actions">

          {/* Notification */}

          <button
            type="button"
            className="navbar-icon-btn notification-btn"
            onClick={onNotificationClick}
            aria-label={
              notificationCount > 0
                ? `${notificationCount} notifications`
                : "Notifications"
            }
          >

            <Bell
              size={25}
              strokeWidth={1.8}
            />

            {notificationCount > 0 && (
              <span className="notification-badge">
                {notificationCount > 9
                  ? "9+"
                  : notificationCount}
              </span>
            )}

          </button>


          {/* Profile */}

          <button
            type="button"
            className="profile-container"
            onClick={onProfileClick}
            aria-label="Open profile"
          >

            <div className="profile-avatar">
              RM
            </div>

            {/* Desktop profile information */}

            <div className="profile-info">

              <span className="profile-name">
                {userName}
              </span>

              <span className="profile-role">
                {role}
              </span>

            </div>

          </button>

        </div>

      </div>

    </header>
  );
};

export default TopNavbar;