import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: 'Gullak Wallet',
        short_name: 'GWallet',
        description: 'Our Gullak wallet',
        theme_color: '#ffffff',
        icons: [
          {
            src: './src/assets/192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: './src/assets/512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    }),
    react()
  ],
});
