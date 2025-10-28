const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/health', async (req, res) => {
  try {
    const rows = await db.query('SELECT 1 AS ok');
    res.json({ ok: true, db: rows.length ? rows[0].ok : null });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Rooms
app.get('/api/rooms', async (req, res) => {
  try {
    const rows = await db.query('SELECT id, number, type, price, status FROM rooms ORDER BY id');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Bookings
app.get('/api/bookings', async (req, res) => {
  try {
    const rows = await db.query('SELECT * FROM bookings ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/bookings', async (req, res) => {
  try {
    const { customer_name, contact, email, booking_type, room_table, check_in, check_out } = req.body;
    const result = await db.query(
      'INSERT INTO bookings (customer_name, contact, email, booking_type, room_table, check_in, check_out) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [customer_name, contact, email, booking_type, room_table, check_in || null, check_out || null]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// User registration
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'name, email and password are required' });
    }

    // check existing email
    const existing = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing && existing.length > 0) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const result = await db.query(
      'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
      [name, email, hash, role || 'staff']
    );

    res.status(201).json({ id: result.insertId, name, email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// User login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'email and password required' });

    const rows = await db.query('SELECT id, name, email, password_hash, role FROM users WHERE email = ?', [email]);
    const user = rows && rows.length ? rows[0] : null;
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password_hash || '');
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const payload = { id: user.id, name: user.name, role: user.role };
    const secret = process.env.JWT_SECRET || 'change_this_secret';
    const token = jwt.sign(payload, secret, { expiresIn: '8h' });

    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Orders
app.get('/api/orders', async (req, res) => {
  try {
    const rows = await db.query('SELECT * FROM orders ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const { table_or_room, created_by, items } = req.body;
    // Start transaction
    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();
      const insertOrder = await conn.execute(
        'INSERT INTO orders (table_or_room, created_by, total, status) VALUES (?, ?, ?, ?)',
        [table_or_room || null, created_by || null, 0, 'open']
      );
      const orderId = insertOrder[0].insertId;
      let total = 0;
      if (Array.isArray(items)) {
        for (const it of items) {
          const price = Number(it.price || 0);
          const qty = Number(it.quantity || 1);
          total += price * qty;
          await conn.execute(
            'INSERT INTO order_items (order_id, product_name, quantity, price) VALUES (?, ?, ?, ?)',
            [orderId, it.product_name, qty, price]
          );
        }
      }
      await conn.execute('UPDATE orders SET total = ? WHERE id = ?', [total, orderId]);
      await conn.commit();
      conn.release();
      res.status(201).json({ id: orderId, total });
    } catch (txErr) {
      await conn.rollback();
      conn.release();
      throw txErr;
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Simple reports endpoint
app.get('/api/reports/daily-sales', async (req, res) => {
  try {
    // Aggregate order_items by product_name for today's date
    const rows = await db.query(
      `SELECT oi.product_name, SUM(oi.quantity) AS quantity, SUM(oi.quantity * oi.price) AS revenue
       FROM order_items oi
       JOIN orders o ON o.id = oi.order_id
       WHERE DATE(o.created_at) = CURDATE()
       GROUP BY oi.product_name
       ORDER BY revenue DESC`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
