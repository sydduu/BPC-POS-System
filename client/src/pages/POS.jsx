import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/POS.css";

const menuItems = [
  { id: 1, name: "Adobo", category: "Main course", price: 150 },
  { id: 2, name: "Sinigang", category: "Main course", price: 150 },
  { id: 3, name: "Lechon kawali", category: "Main course", price: 150 },
  { id: 4, name: "Rice", category: "Main course", price: 50 },
  { id: 5, name: "Halo-halo", category: "Main course", price: 50 },
  { id: 6, name: "Soft drinks", category: "Main course", price: 50 },
];

const MenuCard = ({ item, onAdd }) => (
  <div className="menu-card">
    <div className="menu-content">
      <h3>{item.name}</h3>
      <span className="category">{item.category}</span>
      <span className="price">₱{item.price}</span>
    </div>
    <button className="btn-add" onClick={() => onAdd(item)}>
      Add to order
    </button>
  </div>
);

const OrderItem = ({ item, onRemove }) => (
  <div className="order-item">
    <div className="order-item-details">
      <h4>{item.name}</h4>
      <span className="price">₱{item.price}</span>
    </div>
    <button className="btn-remove" onClick={() => onRemove(item.id)}>
      Remove
    </button>
  </div>
);

const POS = () => {
  const [currentOrder, setCurrentOrder] = useState([]);

  const addToOrder = (item) => {
    setCurrentOrder([...currentOrder, { ...item, orderId: Date.now() }]);
  };

  const removeFromOrder = (orderId) => {
    setCurrentOrder(currentOrder.filter((item) => item.orderId !== orderId));
  };

  const total = currentOrder.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="pos-page">
      <Sidebar />

      <main className="pos-main">
        <header className="page-header">
          <h1>Point of Sale</h1>
          <p className="subtitle">Process customer orders and payments</p>
        </header>

        <div className="pos-container">
          <section className="menu-section">
            <h2>Menu Items</h2>
            <div className="menu-grid">
              {menuItems.map((item) => (
                <MenuCard key={item.id} item={item} onAdd={addToOrder} />
              ))}
            </div>
          </section>

          <section className="order-section">
            <div className="order-card">
              <h2>
                Current Order
                <svg
                  className="cart-icon"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path
                    fill="currentColor"
                    d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 3c0 .5.4 1 1 1h1l3.6 7.6L5.2 14c-.1.3-.2.6-.2 1 0 1.1.9 2 2 2h12c.5 0 1-.4 1-1s-.4-1-1-1H7l1.1-2h7.4c.7 0 1.4-.4 1.7-1l3.6-6.5c.2-.3.2-.7 0-1-.2-.3-.6-.5-1-.5H5.2L4.7 3H2c-.5 0-1 .4-1 1zm16 15c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
                  />
                </svg>
              </h2>

              {currentOrder.length === 0 ? (
                <div className="empty-order">No items in cart</div>
              ) : (
                <>
                  <div className="order-items">
                    {currentOrder.map((item) => (
                      <OrderItem
                        key={item.orderId}
                        item={item}
                        onRemove={removeFromOrder}
                      />
                    ))}
                  </div>

                  <div className="order-summary">
                    <div className="total">
                      <span>Total Amount</span>
                      <span className="total-amount">₱{total}</span>
                    </div>
                    <button className="btn-checkout">
                      Proceed to Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default POS;
