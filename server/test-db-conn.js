// Simple script to test DB connection
const db = require('./db');

async function test() {
  try {
    const [rows] = await db.query('SELECT NOW() AS now');
    console.log('DB connected, server time:', rows[0].now);
    process.exit(0);
  } catch (err) {
    console.error('DB connection failed:', err.message);
    process.exit(1);
  }
}

test();