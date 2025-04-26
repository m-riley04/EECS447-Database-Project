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


let tunnelServer = null;
let sshConn      = null;
let openPromise  = null;
let retryTimer   = null;
let backoffMs    = 5_000;               // start at 5 s

function scheduleReconnect() {
    if (retryTimer) return; // already queued
    console.log('Scheduling SSH tunnel reconnect...');
    retryTimer = setTimeout(() => {
        retryTimer = null;
        openTunnel();
    }, backoffMs);
    backoffMs = Math.min(backoffMs + 5_000, 30_000);   // linear back-off
}

export async function openTunnel(attempt = 0) {
    if (sshConn && sshConn._ready) return openPromise;
    if (openPromise)               return openPromise;
    console.log('SSH tunnel opening...');

    openPromise = (async () => {
        // cleanly close any previous listener
        if (tunnelServer) await new Promise(res => tunnelServer.close(res));

        // establish a fresh tunnel
        [tunnelServer, sshConn] =
            await createTunnel(tunnelConfig, serverConfig, sshConfig, forwardConfig);

        sshConn._ready = true;              // mark as live
        backoffMs = 5_000;                  // reset back-off
        console.log(`SSH tunnel ready on ${process.env.SERVER_HOST || 'localhost'}:${LOCAL_DB_PORT}`);

        // on error just log; on close trigger a reconnect
        sshConn.on('error',  (e)=>console.error('SSH tunnel error:', e.message));
        sshConn.once('close',() => {
            console.warn('SSH tunnel closed');
            sshConn._ready = false;
            scheduleReconnect();
        });
    })().catch(err => {
        console.error('SSH tunnel opening failed:', err.message);
        scheduleReconnect();
    }).finally(() => openPromise = null);

    return openPromise;
}