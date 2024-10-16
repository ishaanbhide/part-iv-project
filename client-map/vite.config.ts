import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            manifest: {
                // content of manifest file
                name: "Geohub",
                short_name: "Geohub",
                start_url: "/",
                display: "standalone",
                background_color: "#00026E",
                theme_color: "#000000",
                description: "Part IV Project Disaster News App.",
                icons: [
                    {
                        src: "logo-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "logo-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                ],
            },
            workbox: {
                // workbox options for service worker
            },
        }),
    ],
});
