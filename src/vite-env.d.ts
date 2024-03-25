/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SPOTIFY_CLIENT_ID: string;
  readonly VITE_SPOTIFY_CLIENT_SECRET: string;
  readonly VITE_REDIRECT_TARGET: string;
  // Add more custom environment variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}