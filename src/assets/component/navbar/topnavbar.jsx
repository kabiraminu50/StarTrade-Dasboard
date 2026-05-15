// TopNavbar.jsx

import "./topNavbar.css";
import {
  Menu,
  Bell,
  ChevronDown,
} from "lucide-react";

const TopNavbar = () => {
  return (
    <header className="top-navbar">
      {/* LEFT */}
      <div className="navbar-left">
        <button className="icon-btn">
          <Menu size={24} />
        </button>

        <div className="logo-box">
          <div className="logo-icon">S</div>
          <h2>ShopEasy</h2>
        </div>
      </div>

      {/* RIGHT */}
      <div className="navbar-right">
        {/* Notification */}
        <button className="icon-btn notification-btn">
          <Bell size={22} />

          <span className="notification-badge">
            3
          </span>
        </button>

        {/* User */}
        <div className="user-box">
          <div className="avatar">
            JD
          </div>

          <ChevronDown size={18} />
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;