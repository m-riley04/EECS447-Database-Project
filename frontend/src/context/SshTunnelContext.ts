import { createContext } from 'react';
import { createTunnel, ForwardOptions, ServerOptions, SshOptions, TunnelOptions } from 'tunnel-ssh';

const sshConfig: SshOptions = {
    username: import.meta.env.VITE_SSH_USERNAME,
    password: import.meta.env.VITE_SSH_PASSWORD,
    host: import.meta.env.VITE_SSH_HOST,
}

const serverConfig: ServerOptions = {
    port: import.meta.env.VITE_DB_PORT
}

const tunnelConfig: TunnelOptions = {
    autoClose: true, // TODO: make this configurable
    reconnectOnError: true, // TODO: make this configurable
}

const forwardConfig: ForwardOptions = {
	srcAddr:'0.0.0.0',
	srcPort: import.meta.env.VITE_DB_PORT,
	dstAddr:'127.0.0.1',
	dstPort: import.meta.env.VITE_DB_PORT
};

const [server, conn] = await createTunnel(sshConfig, serverConfig, tunnelConfig, forwardConfig);

export const sshTunnelProviderValue = {
    sshConfig,
    serverConfig,
    tunnelConfig,
    forwardConfig,
    server,
    conn
  };

export const SshTunnelContext = createContext(sshTunnelProviderValue);