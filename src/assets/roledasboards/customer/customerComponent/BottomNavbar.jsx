import "./BottomNavbar.css";
import { useNavigate } from "react-router-dom";


import {
  Logs,
  Store,
  ShoppingCart,
  ClipboardList,
  Send,
} from "lucide-react";

const navItems = [
  {
    id: 1,
    label: "Items",
    icon: Logs,
    path: "/customer/all-items",
    active: true,
    badge: null,
  },

  {
    id: 2,
    label: "Stores",
    icon: Store,
    path: "/customer/all-stores",
    active: false,
    badge: 3,
  },

  {
    id: 3,
    label: "My Cart",
    icon: ShoppingCart,
    path: "/customer/cart",
    active: false,
    badge: 3,
  },

  {
    id: 4,
    label: "Orders",
    icon: ClipboardList,
    path: "/customer/orders",
    active: false,
    badge: null,
  },

  {
    id: 5,
    label: "Transfer",
    icon: Send,
    path: "/customer/payout",
    active: false,
    badge: null,
  },
];

const BottomNavbar = () => {

  const navigate = useNavigate();

  return (
    <nav className="bottom-navbar">

      {navItems.map((item) => {

        const Icon = item.icon;

        return (

          <button
            key={item.id}

            onClick={() => navigate(item.path)}

            className={
              item.active
                ? "nav-item active"
                : "nav-item"
            }
          >

            <div className="nav-icon-wrapper">

              <Icon size={22} />

              {item.badge && (
                <span className="nav-badge">
                  {item.badge}
                </span>
              )}

            </div>

            <span>{item.label}</span>

          </button>

        );
      })}

    </nav>
  );
};

export default BottomNavbar;