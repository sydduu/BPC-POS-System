import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/Bookings.css";

const BookingSummary = ({ formData }) => (
  <div className="booking-summary">
    <h2>Booking Summary</h2>
    <div className="summary-content">
      <div className="summary-row">
        <span>Room Type:</span>
        <strong>{formData.roomType || "Standard"}</strong>
      </div>
      <div className="summary-row">
        <span>Price/Night:</span>
        <strong>₱{formData.pricePerNight || "1,500"}</strong>
      </div>
      <div className="summary-row">
        <span>Nights:</span>
        <strong>{formData.nights || "2"}</strong>
      </div>
      <div className="summary-row total">
        <span>Total:</span>
        <strong className="total-price">₱{formData.total || "1,500"}</strong>
      </div>
    </div>
    <div className="summary-note">Payment will be collected upon check-in</div>
  </div>
);

const Bookings = () => {
  const [formData, setFormData] = useState({
    customerName: "",
    contactNumber: "",
    email: "",
    bookingType: "",
    roomTable: "",
    checkIn: "",
    checkOut: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="bookings-page">
      <Sidebar />

      <main className="bookings-main">
        <header className="page-header">
          <h1>New Booking</h1>
          <p className="subtitle">Create a new room or table booking</p>
        </header>

        <div className="booking-container">
          <form className="booking-form" onSubmit={handleSubmit}>
            <div className="form-card">
              <h2>Booking Details</h2>

              <div className="form-grid">
                <div className="form-group">
                  <label>Customer Name *</label>
                  <input
                    type="text"
                    placeholder="Juan Dela Cruz"
                    value={formData.customerName}
                    onChange={(e) =>
                      setFormData({ ...formData, customerName: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Contact number *</label>
                  <input
                    type="tel"
                    placeholder="09xx xxx xxxx"
                    value={formData.contactNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contactNumber: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="form-group full">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    placeholder="juan@gmail.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Booking type *</label>
                  <select
                    value={formData.bookingType}
                    onChange={(e) =>
                      setFormData({ ...formData, bookingType: e.target.value })
                    }
                    required
                  >
                    <option value="">Select booking type</option>
                    <option value="room">Room</option>
                    <option value="table">Table</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Select Room/Table *</label>
                  <select
                    value={formData.roomTable}
                    onChange={(e) =>
                      setFormData({ ...formData, roomTable: e.target.value })
                    }
                    required
                  >
                    <option value="">Choose room or table</option>
                    <option value="101">Room 101 - Standard</option>
                    <option value="102">Room 102 - Standard</option>
                    <option value="201">Room 201 - Deluxe</option>
                    <option value="t1">Table 1</option>
                    <option value="t2">Table 2</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Check-in Date</label>
                  <input
                    type="date"
                    value={formData.checkIn}
                    onChange={(e) =>
                      setFormData({ ...formData, checkIn: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Check-out Date</label>
                  <input
                    type="date"
                    value={formData.checkOut}
                    onChange={(e) =>
                      setFormData({ ...formData, checkOut: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-submit">
                  Create Booking
                </button>
                <button type="button" className="btn-cancel">
                  Cancel
                </button>
              </div>
            </div>
          </form>

          <BookingSummary formData={formData} />
        </div>
      </main>
    </div>
  );
};

export default Bookings;
