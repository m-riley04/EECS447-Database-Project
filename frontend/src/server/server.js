// server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createTunnel } from 'tunnel-ssh';
import { createPool } from 'mariadb';

// Initialize express app
const app = express();
const port = process.env.PORT || 3001;

// Configure the .env
dotenv.config();

// Create SSH tunnel
const sshConfig = {
    username: process.env.VITE_SSH_USERNAME,
    password: process.env.VITE_SSH_PASSWORD,
    host: process.env.VITE_SSH_HOST,
  };

const serverConfig = {
    port: process.env.VITE_DB_PORT,
};

const tunnelConfig = {
    autoClose: true,
    reconnectOnError: true,
};

const forwardConfig = {
    srcAddr: '0.0.0.0',
    srcPort: Number(process.env.VITE_DB_PORT),
    dstAddr: process.env.VITE_DB_HOST,
    dstPort: Number(process.env.VITE_DB_PORT),
};

const [server, conn] = await createTunnel(tunnelConfig, serverConfig, sshConfig, forwardConfig);

// Create mariadb connection pool
const pool = createPool({
    host: "localhost",
    user: process.env.VITE_DB_USERNAME,
    password: process.env.VITE_DB_PASSWORD,
    database: process.env.VITE_DB_NAME,
    port: Number(process.env.VITE_DB_PORT),
    connectionLimit: 5
  });

// Initialize CORS and app
app.use(cors()); // NODE: This is much less secure
app.use(express.json());

///========= API ENDPOINTS ==========///
async function query(sql, res, req) {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(sql);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  } finally {
    if (conn) conn.release();
  }
}

/**
 * Gets all genres
 */
app.get('/api/genres', async (req, res) => {
  await query('SELECT * FROM genres', res, req);
});

/**
 * Gets all users
 */
app.get('/api/users', async (req, res) => {
  await query('SELECT * FROM users', res, req);
});

/**
 * Gets all media items
 */
app.get('/api/media_items', async (req, res) => {
  await query('SELECT * FROM media_item', res, req);
});

/**
 * Gets all authors
 */
app.get('/api/authors', async (req, res) => {
  await query('SELECT * FROM author', res, req);
});

/// TODO: Add the rest of the API endpoints

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
