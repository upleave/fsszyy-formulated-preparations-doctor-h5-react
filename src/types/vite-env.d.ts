/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_API_HOST: string;
  readonly VITE_API_PORT: string;
  readonly VITE_API_ADMIN_PATH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare const __ADMIN_URL__: string;
declare const __H5_URL__: string;