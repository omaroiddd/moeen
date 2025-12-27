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

        // customerservice: resolve(__dirname, "services/customer-service.html"),
        // cybersecurity: resolve(__dirname, "services/cybersecurity.html"),
        // dataanalysis: resolve(__dirname, "services/data-analysis.html"),
        // developers: resolve(__dirname, "services/developers.html"),
        // digitalmarketing: resolve(__dirname, "services/digital-marketing.html"),
        // estoremanagers: resolve(__dirname, "services/e-store-managers.html"),
        // financialanalysis: resolve(
        //   __dirname,
        //   "services/financial-analysis.html"
        // ),
        // graphicdesign: resolve(__dirname, "services/graphic-design.html"),
        // projectmanagers: resolve(__dirname, "services/project-managers.html"),
        // salesrepresentative: resolve(
        //   __dirname,
        //   "services/sales-representative.html"
        // ),
        // videoediting: resolve(__dirname, "services/video-editing.html"),

        en_index: resolve(__dirname, "en/index.html"),
        en_contact: resolve(__dirname, "en/contact.html"),
        en_pricing: resolve(__dirname, "en/pricing.html"),
        en_services: resolve(__dirname, "en/services.html"),
        en_thankyou: resolve(__dirname, "en/thank-you.html"),

        // en_customerservice: resolve(
        //   __dirname,
        //   "en/services/customer-service.html"
        // ),
      },
    },
  },
});
