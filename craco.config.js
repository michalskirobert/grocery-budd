const path = require(`path`);
const { ESLINT_MODES } = require("@craco/craco");

module.exports = {
  eslint: {
    mode: ESLINT_MODES.file,
  },
  webpack: {
    alias: {
      "@store": path.resolve(__dirname, "./src/store"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@fire": path.resolve(__dirname, "./src/firebase"),
      "@namespace": path.resolve(__dirname, "./src/typings"),
      "@shared": path.resolve(__dirname, "./src/components/shared"),
      "@helpers": path.resolve(__dirname, "./src/helpers"),
    },
  },
};
