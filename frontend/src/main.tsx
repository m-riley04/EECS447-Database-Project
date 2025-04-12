import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { SshTunnelContext, sshTunnelProviderValue } from './context/SshTunnelContext.ts'
import { MariaDbContext, pool } from './context/MariaDbContext.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SshTunnelContext.Provider value={sshTunnelProviderValue}>
      <MariaDbContext.Provider value={pool}>
        <App />
      </MariaDbContext.Provider>
    </SshTunnelContext.Provider>
  </StrictMode>,
)
