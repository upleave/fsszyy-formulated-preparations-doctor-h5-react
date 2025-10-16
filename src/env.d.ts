/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_HOST: string;
    readonly VITE_API_PORT: string;
    readonly VITE_API_H5_PATH: string;
    readonly VITE_API_ADMIN_PATH: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}