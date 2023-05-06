import { defineConfig } from 'astro/config';
import rome from "astro-rome";
import prefetch from "@astrojs/prefetch";

// https://astro.build/config
export default defineConfig({
    site: 'https://stream.ibro.xyz',
    integrations: [rome(), prefetch()]
});