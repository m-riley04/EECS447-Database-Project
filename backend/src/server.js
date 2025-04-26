import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { createPool } from 'mariadb';
import { initBasicGETRequests, initBasicPUTRequests, initBasicPOSTRequests, initBasicDELETERequests, initReportRequests, initActionRequests, initMiscProceduresRequests } from './db_initialization.js';
import { LOCAL_DB_PORT, openTunnel } from './ssh_initialization.js';

// Configure the .env
dotenv.config();

// Initialize express app
const app = express();
const port = process.env.SERVER_PORT || 3001;

// Initialize SSH tunnel
await openTunnel();

// TODO: If the tunnel isn't open, exit the program

// Initialize MariaDB connection pool
console.log('Connecting to MariaDB database...');
const pool = createPool({
  host: process.env.SERVER_HOST || 'localhost',
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: LOCAL_DB_PORT,

  bigIntAsNumber: true,
  multipleStatements: true, // NOTE: This is not secure, but this is not a real production app with sensitive data
  keepAliveDelay: 10000,
});
console.log('MariaDB connected.');

// Initialize CORS and app
app.use(cors()); // NOTE: This is much less secure, but this is not a real production app with sensitive data.
app.use(express.json());

///========= REQUEST INITIALIZATIONS ==========///
const params = { app, pool };
initBasicGETRequests(params);
initBasicPUTRequests(params);
initBasicPOSTRequests(params);
initBasicDELETERequests(params);
initReportRequests(params);
initActionRequests(params);
initMiscProceduresRequests(params);

// Initialize listening port
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Catch unhandled errors
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  // the tunnel layer already schedules a reconnect; just keep running
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Promise:', reason);
});