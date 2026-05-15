import "./CartSection.css";

import {
  Trash2,
  ArrowRight,
} from "lucide-react";

const cartItems = [
  {
    id: 1,
    name: "Golden Penny Rice 50kg",
    price: 28000,
    quantity: 1,
  },

  {
    id: 2,
    name: "Power Oil 1L",
    price: 2200,
    quantity: 2,
  },

  {
    id: 3,
    name: "Indomie Instant Noodles",
    price: 1200,
    quantity: 3,
  },
];

const CartSection = () => {

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const deliveryFee = 1000;

  const total = subtotal + deliveryFee;

  return (
    <section className="cart-section">

      {/* TOP */}

      <div className="cart-top">

        <div>

          <h2>
            My Cart ({cartItems.length})
          </h2>

        </div>

        <button className="delete-btn">
          <Trash2 size={18} />
        </button>

      </div>

      {/* EMPTY STATE */}

      {cartItems.length === 0 ? (

        <div className="empty-cart">

          <p>Your cart is empty</p>

        </div>

      ) : (

        <>
          {/* CART ITEMS */}

          <div className="cart-items">

            {cartItems.map((item) => (

              <div
                key={item.id}
                className="cart-item"
              >

                <div className="cart-item-left">

                  <h3>{item.name}</h3>

                  <p>
                    Qty: {item.quantity}
                  </p>

                </div>

                <div className="cart-item-right">

                  <h4>
                    ₦
                    {(
                      item.price * item.quantity
                    ).toLocaleString()}
                  </h4>

                </div>

              </div>

            ))}

          </div>

          {/* SUMMARY */}

          <div className="cart-summary">

            <div className="summary-row">
              <span>Subtotal</span>

              <span>
                ₦{subtotal.toLocaleString()}
              </span>
            </div>

            <div className="summary-row">
              <span>Delivery Fee</span>

              <span>
                ₦{deliveryFee.toLocaleString()}
              </span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-total">
              <span>Total</span>

              <h3>
                ₦{total.toLocaleString()}
              </h3>
            </div>

          </div>

          {/* BUTTONS */}

          <button className="checkout-btn">

            Proceed to Checkout

            <ArrowRight size={20} />

          </button>

          <button className="cart-details-btn">
            View Cart Details
          </button>
        </>

      )}

    </section>
  );
};

export default CartSection;