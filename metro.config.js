// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const defaultConfig = getDefaultConfig(__dirname);
// defaultConfig.resolver.assetExts.push("cjs", "js", "json", "ts", "tsx");
defaultConfig.resolver.sourceExts.push("cjs", "js", "json", "ts", "tsx");

module.exports = defaultConfig;
