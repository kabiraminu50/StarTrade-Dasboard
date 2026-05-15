import "./BottomNavbar.css";

import {
  House,
  Store,
  ShoppingCart,
  ClipboardList,
  User,
} from "lucide-react";

const navItems = [
  {
    id: 1,
    label: "Dashboard",
    icon: House,
    active: true,
    badge: null,
  },

  {
    id: 2,
    label: "All Shops",
    icon: Store,
    active: false,
    badge: null,
  },

  {
    id: 3,
    label: "My Cart",
    icon: ShoppingCart,
    active: false,
    badge: 3,
  },

  {
    id: 4,
    label: "Orders",
    icon: ClipboardList,
    active: false,
    badge: null,
  },

  {
    id: 5,
    label: "Profile",
    icon: User,
    active: false,
    badge: null,
  },
];

const BottomNavbar = () => {

  return (
    <nav className="bottom-navbar">

      {navItems.map((item) => {

        const Icon = item.icon;

        return (

          <button
            key={item.id}
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

            <span>
              {item.label}
            </span>

          </button>

        );
      })}

    </nav>
  );
};

export default BottomNavbar;