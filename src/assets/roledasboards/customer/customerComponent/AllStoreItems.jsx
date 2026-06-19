import React from "react";
import "./AllStoreItems.css";

const items = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    name: "Nike Air Max",
    shop: "TechWorld Store",
    description: "Comfortable and stylish sneakers.",
    price: 120,
  },

  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    name: "Smart Watch",
    shop: "Gadget Hub",
    description: "Track fitness and notifications.",
    price: 85,
  },

  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    name: "Wireless Headset",
    shop: "Audio Store",
    description: "High quality sound experience.",
    price: 65,
  },

  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    name: "iPhone 15",
    shop: "Mobile Shop",
    description: "Latest Apple smartphone.",
    price: 999,
  },
];

function AllStoreItems({
  cart,
  increase,
  decrease,
}) {
  // TOTAL ITEMS
  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // TOTAL PRICE
  const totalPrice = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return (
    <div className="all-store-wrapper">
      {/* HEADER */}

      <div className="cart-header">
        <h1>All Items</h1>

        <div className="cart-summary">
          <span>
            Cart Items: {totalItems}
          </span>

          <span>
            Total: ${totalPrice}
          </span>
        </div>
      </div>

      {/* ITEMS */}

      <div className="all-items-container">
        {items.map((item) => {
          const cartItem = cart.find(
            (cartItem) => cartItem.id === item.id
          );

          return (
            <div
              className="item-card"
              key={item.id}
            >
              <img
                src={item.image}
                alt={item.name}
                className="item-image"
              />

              <div className="item-details">
                <h3>{item.name}</h3>

                <p className="shop-name">
                  {item.shop}
                </p>

                <p className="description">
                  {item.description}
                </p>

                <div className="bottom-section">
                  <h2 className="price">
                    ${item.price}
                  </h2>

                  <div className="counter">
                    <button
                      onClick={() =>
                        decrease(item)
                      }
                    >
                      -
                    </button>

                    <span>
                      {cartItem?.quantity || 0}
                    </span>

                    <button
                      onClick={() =>
                        increase(item)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CART PREVIEW */}

      <div className="cart-preview">
        <h2>Cart Preview</h2>

        {cart.length === 0 ? (
          <p>No items added yet.</p>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="cart-item"
            >
              <img
                src={item.image}
                alt={item.name}
              />

              <div>
                <h4>{item.name}</h4>

                <p>
                  Qty: {item.quantity}
                </p>

                <p>
                  $
                  {item.price *
                    item.quantity}
                </p>
              </div>
            </div>
          ))
        )}

        {cart.length > 0 && (
          <button className="checkout-btn">
            Proceed To Checkout
          </button>
        )}
      </div>
    </div>
  );
}

export default AllStoreItems;