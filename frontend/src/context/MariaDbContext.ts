import { createContext } from 'react';
import mariadb from 'mariadb';

export const pool = mariadb.createPool({
    host: import.meta.env.VITE_DB_HOST,
    user: import.meta.env.VITE_DB_USERNAME,
    password: import.meta.env.VITE_DB_PASSWORD,
    database: import.meta.env.VITE_DB_DATABASE,
    port: import.meta.env.VITE_DB_PORT,
    connectionLimit: 5
  });

pool.on('connection', (conn) => {
    console.log('Connection established with ID:', conn.threadId);
});

export const MariaDbContext = createContext(pool);