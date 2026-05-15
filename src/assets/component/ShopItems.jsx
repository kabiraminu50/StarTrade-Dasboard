import "./ShopItems.css";

import {
  Minus,
  Plus,
  Search,
  SlidersHorizontal,
} from "lucide-react";

const shopItems = [
  {
    id: 1,
    image:
      "https://via.placeholder.com/80",

    name: "Golden Penny Rice 50kg",

    description: "Premium quality rice",

    price: 28000,

    quantity: 1,
  },

  {
    id: 2,

    image:
      "https://via.placeholder.com/80",

    name: "Power Oil 1L",

    description: "Pure vegetable oil",

    price: 2200,

    quantity: 2,
  },

  {
    id: 3,

    image:
      "https://via.placeholder.com/80",

    name: "Indomie Instant Noodles (Pack)",

    description: "Chicken flavour",

    price: 1200,

    quantity: 3,
  },

  {
    id: 4,

    image:
      "https://via.placeholder.com/80",

    name: "Peak Milk 1L",

    description: "Full cream milk",

    price: 1600,

    quantity: 1,
  },

  {
    id: 5,

    image:
      "https://via.placeholder.com/80",

    name: "Farm Fresh Eggs (Tray)",

    description: "30 pieces",

    price: 2800,

    quantity: 1,
  },
];

const ShopItems = () => {
  return (
    <section className="shop-items-section">

      {/* TOP */}

      <div className="shop-items-top">

        <div className="shop-details">

          <div className="shop-icon">
            🛒
          </div>

          <div>

            <h2>FreshMart Store</h2>

            <p>Supermarket</p>

          </div>

        </div>

        <button className="open-btn">
          Open
        </button>

      </div>

      {/* SEARCH */}

      <div className="search-container">

        <div className="search-box">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search items in FreshMart..."
          />

        </div>

        <button className="filter-btn">
          <SlidersHorizontal size={18} />
        </button>

      </div>

      {/* EMPTY STATE */}

      {shopItems.length === 0 ? (

        <div className="empty-items">

          <p>No item available</p>

        </div>

      ) : (

        <div className="items-list">

          {shopItems.map((item) => (

            <div
              key={item.id}
              className="item-card"
            >

              {/* LEFT */}

              <div className="item-left">

                <img
                  src={item.image}
                  alt={item.name}
                />

                <div className="item-info">

                  <h3>{item.name}</h3>

                  <p>{item.description}</p>

                  <h4>
                    ₦
                    {item.price.toLocaleString()}
                  </h4>

                </div>

              </div>

              {/* RIGHT */}

              <div className="item-right">

                {/* COUNTER */}

                <div className="counter-box">

                  <button>
                    <Minus size={16} />
                  </button>

                  <span>
                    {item.quantity}
                  </span>

                  <button>
                    <Plus size={16} />
                  </button>

                </div>

                {/* ADD TO CART */}

                <button className="add-cart-btn">
                  Add to Cart
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

      {/* VIEW ALL */}

      <button className="view-items-btn">

        View All Items

      </button>

    </section>
  );
};

export default ShopItems;