/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE: string;
  readonly VITE_SITE_URL: string;
  readonly VITE_CONTROL_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
