import React from "react";
import TopNavbar from "../customerComponent/topNavbar";
import "./Cart.css";

function Cart({
  cart,
  increase,
  decrease,
}) {
  return (
    <div className="cart-page">
      <TopNavbar />

      <div className="cart-container">
        <h2 className="cart-title">
          My Cart
        </h2>

        {cart.length === 0 ? (
          <div className="empty-cart">
            No items in cart
          </div>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="cart-item"
            >
              <img
                src={item.image}
                alt={item.name}
                className="cart-image"
              />

              <div className="cart-info">
                <h3>{item.name}</h3>

                <p>
                  Qty: {item.quantity}
                </p>

                <p>
                  Price: $
                  {item.price}
                </p>

                <p>
                  Total: $
                  {item.price *
                    item.quantity}
                </p>
              </div>

              <div className="cart-actions">
                <button
                  onClick={() =>
                    decrease(item)
                  }
                >
                  -
                </button>

                <span className="quantity">
                  {item.quantity}
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
          ))
        )}
      </div>
    </div>
  );
}

export default Cart;