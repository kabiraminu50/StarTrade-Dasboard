import { useNavigate } from "react-router-dom";

import "./TopNavbar.css";

import {
  Bell,
  ChevronDown,
  Menu,
  Sparkles,
} from "lucide-react";

const TopNavbar = ({ toggleSidebar }) => {

  const navigate = useNavigate();

  return (

    <header className="top-navbar">

      {/* LEFT */}

      <div className="navbar-left">

        {/* MENU BUTTON */}

        <button
          className="menu-btn"
          onClick={toggleSidebar}
        >

          <Menu size={22} />

        </button>

        {/* LOGO */}

        <div className="navbar-logo">

          <div className="navbar-logo-icon">

            <Sparkles
              size={18}
              fill="#F0B90B"
              color="#F0B90B"
            />

          </div>

          <h2>Trade</h2>

        </div>

      </div>

      {/* RIGHT */}

      <div className="navbar-right">

        {/* NOTIFICATION */}

        <button className="icon-btn notification-btn">

          <Bell size={20} />

          <span className="notification-badge">
            3
          </span>

        </button>

        {/* USER */}

        <button
          className="user-box"
          onClick={() => navigate("/customer/profile")}
        >

          <div className="avatar">
            JD
          </div>

          <ChevronDown size={18} />

        </button>

      </div>

    </header>

  );
};

export default TopNavbar;