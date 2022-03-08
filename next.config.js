const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");
const { i18n } = require("./next-i18next.config");

const isProd = process.env.NODE_ENV === "production";

const apiUrl = isProd
  ? " https://vedusone.herokuapp.com/api"
  : "http://localhost:8080/api";

const publicUrl = isProd ? "https://www.vedusone.com" : "http://localhost:3000";

module.exports = withPWA({
  env: {
    PUBLIC_URL: publicUrl,
    API_URL: apiUrl,
  },
  i18n,
  pwa: {
    disable: process.env.NODE_ENV === "development",
    dest: "public",
    runtimeCaching,
  },

  images: {
    domains: [
      "via.placeholder.com",
      "res.cloudinary.com",
      "s3.amazonaws.com",
      "18.141.64.26",
      "127.0.0.1",
      "localhost",
      "picsum.photos",
      "pickbazar-sail.test",
      "pickbazarlaravel.s3.ap-southeast-1.amazonaws.com",
      "lh3.googleusercontent.com",
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
});
