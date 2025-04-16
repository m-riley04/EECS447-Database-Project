import dotenv from 'dotenv';

// Configure the .env
dotenv.config();

// Create SSH tunnel
export const sshConfig = {
    username: process.env.SSH_USERNAME,
    password: process.env.SSH_PASSWORD,
    host: process.env.SSH_HOST,
  };

export const serverConfig = {
    port: process.env.DB_PORT,
};

export const tunnelConfig = {
    autoClose: true,
    reconnectOnError: true,
};

export const forwardConfig = {
    srcAddr: '0.0.0.0',
    srcPort: Number(process.env.DB_PORT),
    dstAddr: process.env.DB_HOST,
    dstPort: Number(process.env.DB_PORT),
};