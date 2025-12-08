import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        pricing: resolve(__dirname, "pricing.html"),
        services: resolve(__dirname, "services.html"),
        contact: resolve(__dirname, "contact.html"),
        thankyou: resolve(__dirname, "thank-you.html"),

        customerservice: resolve(__dirname, "services/customer-service.html"),

        en_index: resolve(__dirname, "en/index.html"),
        en_contact: resolve(__dirname, "en/contact.html"),
        en_pricing: resolve(__dirname, "en/pricing.html"),
        en_services: resolve(__dirname, "en/services.html"),
        en_thankyou: resolve(__dirname, "en/thank-you.html"),

        en_customerservice: resolve(
          __dirname,
          "en/services/customer-service.html"
        ),
      },
    },
  },
});
