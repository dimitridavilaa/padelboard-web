// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    i18n: {
        defaultLocale: 'es', // Idioma principal
        locales: ['es', 'en'], // Idiomas disponibles
        routing: {
            prefixDefaultLocale: false
        }
      }
});
