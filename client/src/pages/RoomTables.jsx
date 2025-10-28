import React from "react";
import Sidebar from "../components/Sidebar";
import "../styles/RoomTables.css";

const rooms = [
  {
    id: 101,
    title: "Room 101",
    price: 1500,
    type: "Standard",
    status: "Available",
  },
  {
    id: 102,
    title: "Room 102",
    price: 1500,
    type: "Standard",
    status: "Occupied",
  },
  {
    id: 103,
    title: "Room 103",
    price: 1500,
    type: "Standard",
    status: "Available",
  },
  {
    id: 104,
    title: "Room 104",
    price: 1500,
    type: "Standard",
    status: "Available",
  },
  {
    id: 201,
    title: "Room 201",
    price: 2200,
    type: "Deluxe",
    status: "Available",
  },
  {
    id: 202,
    title: "Table 5",
    price: 800,
    type: "Restaurant",
    status: "Available",
  },
];

const RoomCard = ({ room }) => (
  <div className="room-card">
    <div className="room-card-top">
      <div className="room-icon">🛏️</div>
      <div className="room-title">{room.title}</div>
      <div className={`room-badge ${room.status.toLowerCase()}`}>
        {room.status}
      </div>
    </div>

    <div className="room-meta">Type: {room.type}</div>
    <div className="room-price">₱{room.price.toLocaleString()}/night</div>

    <div className="room-actions">
      <button className="btn-edit">Edit Room</button>
    </div>
  </div>
);

const RoomTables = () => {
  return (
    <div className="room-tables-page">
      <Sidebar />

      <main className="room-main">
        <header className="room-header">
          <h1>Room &amp; tables</h1>
          <p className="subtitle">Make your hotel rooms and restaurant</p>
        </header>

        <section className="room-grid">
          {rooms.map((r) => (
            <RoomCard key={r.id} room={r} />
          ))}
        </section>
      </main>
    </div>
  );
};

export default RoomTables;
