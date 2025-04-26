import dotenv from 'dotenv';
import { createTunnel } from 'tunnel-ssh';

// Configure the .env
dotenv.config();

export const LOCAL_DB_PORT = Number(process.env.TUNNEL_PORT) || 3307;

// Create SSH tunnel
export const sshConfig = {
    username: process.env.SSH_USERNAME,
    password: process.env.SSH_PASSWORD,
    host: process.env.SSH_HOST,
  };

export const serverConfig = {
    port: LOCAL_DB_PORT,
};

export const tunnelConfig = {
    autoClose: false,
    reconnectOnError: true,

};

export const forwardConfig = {
    srcAddr: '0.0.0.0',
    srcPort: LOCAL_DB_PORT,
    dstAddr: process.env.DB_HOST,
    dstPort: Number(process.env.DB_PORT) || 3306,
};

let tunnelServer, sshConn, opening;

export async function openTunnel(attempt = 0) {
  if (opening) return opening;             // another call is already in flight
  console.log('SSH tunnel opening...');

  opening = (async () => {
    // 1. cleanly close any previous listener
    if (tunnelServer) {
      await new Promise(res => tunnelServer.close(res));
      tunnelServer = null;
    }

    // 2. establish a fresh tunnel
    [tunnelServer, sshConn] =
      await createTunnel(tunnelConfig, serverConfig, sshConfig, forwardConfig);

    console.log(`SSH tunnel ready on ${process.env.SERVER_HOST || 'localhost'}:${LOCAL_DB_PORT}`);

    // 3. reconnect logic
    const retry = (err) => {
      console.error('SSH tunnel dropped:', err?.message ?? 'unknown');
      setTimeout(() => openTunnel(), Math.min(30_000, 5_000 * ++attempt));
    };

    sshConn.once('error', retry).once('close', retry);

    opening = null; // we’re live again
  })().catch(err => {
    opening = null;
    console.error('SSH tunnel opening failed:', err.message);
    setTimeout(() => openTunnel(), Math.min(30_000, 5_000 * ++attempt)); // Exponentially retry
  });

  return opening;
}