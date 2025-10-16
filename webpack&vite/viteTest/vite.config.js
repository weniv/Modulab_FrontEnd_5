import { defineConfig } from "vite";
import removeConsole from "vite-plugin-remove-console";
import { watermarkPlugin } from "./plugins/watermark-plugin";


export default defineConfig({
    plugins: [
        removeConsole(),
        watermarkPlugin()
    ]
});