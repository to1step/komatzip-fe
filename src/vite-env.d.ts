/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_REST_API_KEY: string;
  readonly VITE_JAVASCRIPT_KEY: string;
  readonly VITE_ADMIN_KEY: string;
  VITE_PUBLIC_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
