import dotenv from 'dotenv';

// Configure the .env
dotenv.config();

// Create SSH tunnel
export const sshConfig = {
    username: process.env.VITE_SSH_USERNAME,
    password: process.env.VITE_SSH_PASSWORD,
    host: process.env.VITE_SSH_HOST,
  };

export const serverConfig = {
    port: process.env.VITE_DB_PORT,
};

export const tunnelConfig = {
    autoClose: true,
    reconnectOnError: true,
};

export const forwardConfig = {
    srcAddr: '0.0.0.0',
    srcPort: Number(process.env.VITE_DB_PORT),
    dstAddr: process.env.VITE_DB_HOST,
    dstPort: Number(process.env.VITE_DB_PORT),
};