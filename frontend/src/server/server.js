// server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createTunnel } from 'tunnel-ssh';
import { createPool } from 'mariadb';
const app = express();
const port = process.env.PORT || 3001;

// Configure the .env
dotenv.config();

// Initialize CORS
const corsOptions = {
    origin: `http://localhost:3001`, // Replace with your origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: false,
    optionsSuccessStatus: 204
};
  
app.use(cors()); // NODE: This is much less secure

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

app.use(express.json());

// API endpoint to get data from the database
app.get('/api', async (req, res) => {
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query("SELECT * FROM genre");
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.toString() });
    } finally {
      if (conn) conn.release();
    }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
