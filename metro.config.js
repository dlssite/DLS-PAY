const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// 👇 Add support for .cjs (used by Tailwind v3.4+)
config.resolver.sourceExts.push("cjs");

module.exports = config;
