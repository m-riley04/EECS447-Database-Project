/// <reference types="vite/client" />


interface ImportMetaEnv {
    readonly VITE_DB_USERNAME: string
    readonly VITE_DB_PASSWORD: string
    readonly VITE_DB_HOST: string
    readonly VITE_DB_PORT: number
    readonly VITE_DB_DATABASE: string

    readonly VITE_SSH_USERNAME: string
    readonly VITE_SSH_PASSWORD: string
    readonly VITE_SSH_HOST: string
    readonly VITE_SSH_PORT: number
    // more env variables...
  }