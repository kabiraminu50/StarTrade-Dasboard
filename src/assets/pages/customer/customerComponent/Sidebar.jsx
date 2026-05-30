import "./Sidebar.css";

import { useNavigate, useLocation } from "react-router-dom";

import {
  LayoutDashboard,
  Send,
  Store,
  Heart,
  ShoppingCart,
  ClipboardList,
  User,
  Settings,
  LogOut,
  Sparkles,
} from "lucide-react";

const menuItems = [
  {
    id: 1,
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/customer/dashboard",
  },

  {
    id: 2,
    label: "Transfer",
    icon: Send,
    path: "/customer/payout",
  },

  {
    id: 3,
    label: "Favourites",
    icon: Heart,
    path: "/customer/fevoriteshop",
  },

  {
    id: 4,
    label: "My Cart",
    icon: ShoppingCart,
    badge: 3,
    path: "/customer/cart",
  },

  {
    id: 5,
    label: "Orders",
    icon: ClipboardList,
    path: "/customer/orders",
  },

  {
    id: 6,
    label: "Store",
    icon: Store,
    path: "customer/order",
  },

  {
    id: 7,
    label: "Profile",
    icon: User,
    path: "/customer/profile",
  },

  {
    id: 8,
    label: "Settings",
    icon: Settings,
    path: "/customer/settings",
  },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {

  const navigate = useNavigate();

  const location = useLocation();

  return (
    <>
      {/* OVERLAY */}

      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={toggleSidebar}
        />
      )}

      {/* SIDEBAR */}

      <aside
        className={
          isOpen
            ? "sidebar active"
            : "sidebar"
        }
      >

        {/* LOGO */}

        <div className="sidebar-logo">

          <div className="logo-icon">

            <Sparkles
              size={20}
              fill="#F0B90B"
              color="#F0B90B"
            />

          </div>

          <h2>Trade</h2>

        </div>

        {/* MENU */}

        <div className="sidebar-menu">

          {menuItems.map((item) => {

            const Icon = item.icon;

            return (

              <button
                key={item.id}

                className={
                  location.pathname === item.path
                    ? "sidebar-item active"
                    : "sidebar-item"
                }

                onClick={() => {
                  navigate(item.path);
                  toggleSidebar();
                }}
              >

                <div className="sidebar-left">

                  <Icon size={20} />

                  <span>{item.label}</span>

                </div>

                {item.badge && (

                  <div className="sidebar-badge">
                    {item.badge}
                  </div>

                )}

              </button>

            );
          })}

        </div>

        {/* LOGOUT */}

        <button className="logout-btn">

          <LogOut size={20} />

          Logout

        </button>

      </aside>
    </>
  );
};

export default Sidebar;