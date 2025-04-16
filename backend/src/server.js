import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { createTunnel } from 'tunnel-ssh';
import { createPool } from 'mariadb';
import { initBasicGETRequests, initBasicPUTRequests, initBasicPOSTRequests, initBasicDELETERequests } from './db_initialization.js';
import { sshConfig, serverConfig, tunnelConfig, forwardConfig } from './ssh_initialization.js';

// Configure the .env
dotenv.config();

// Initialize express app
const app = express();
const port = process.env.SERVER_PORT || 3001;

// Initialize SSH tunnel
const [server, conn] = await createTunnel(tunnelConfig, serverConfig, sshConfig, forwardConfig);

// Initialize MariaDB connection pool
const pool = createPool({
  host: process.env.SERVER_HOST || 'localhost',
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  connectionLimit: 5
});

// Initialize CORS and app
app.use(cors()); // NODE: This is much less secure
app.use(express.json());

///========= REQUEST INITIALIZATIONS ==========///
const params = { app, pool };
initBasicGETRequests(params);
//initBasicPUTRequests(params);
//initBasicPOSTRequests(params);
//initBasicDELETERequests(params);

// Initialize listening port
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
