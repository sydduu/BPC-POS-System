-- DB initialization script for BPC POS System
-- Run in MySQL: source db_init.sql

CREATE DATABASE IF NOT EXISTS bpc_pos;
USE bpc_pos;

-- users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,   
  password_hash VARCHAR(255),
  role ENUM('admin','staff', 'user') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- rooms table
CREATE TABLE IF NOT EXISTS rooms (
  id INT AUTO_INCREMENT PRIMARY KEY,
  number VARCHAR(32) NOT NULL,
  type VARCHAR(64) NOT NULL,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  status ENUM('available','occupied','maintenance') DEFAULT 'available',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_name VARCHAR(150) NOT NULL,
  contact VARCHAR(50),
  email VARCHAR(150),
  booking_type ENUM('room','table') NOT NULL,
  room_table VARCHAR(64) NOT NULL,
  check_in DATE,
  check_out DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- orders and order_items for POS
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  table_or_room VARCHAR(64),
  created_by INT,
  total DECIMAL(10,2) DEFAULT 0,
  status ENUM('open','paid','cancelled') DEFAULT 'open',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_name VARCHAR(150) NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- sample data
INSERT IGNORE INTO users (id, name, email, role) VALUES
(1, 'Admin User', 'admin@bpc.local', 'admin');

INSERT IGNORE INTO rooms (number, type, price, status) VALUES
('101', 'Standard', 1500.00, 'available'),
('102', 'Standard', 1500.00, 'available'),
('201', 'Deluxe', 3000.00, 'available');

INSERT IGNORE INTO bookings (customer_name, contact, email, booking_type, room_table, check_in, check_out) VALUES
('Juan Dela Cruz', '09171234567', 'juan@example.com', 'room', '101', '2025-11-01', '2025-11-03');

INSERT IGNORE INTO orders (table_or_room, created_by, total, status) VALUES
('Table 1', 1, 200.00, 'paid');

INSERT IGNORE INTO order_items (order_id, product_name, quantity, price) VALUES
(1, 'Adobo', 2, 150.00),
(1, 'Rice', 1, 50.00);

SELECT 'db_init_completed' AS status;