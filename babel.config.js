module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      "nativewind/babel", // NativeWind plugin for Tailwind CSS
      [
        "module:react-native-dotenv", // Plugin to handle environment variables
        {
          moduleName: "@env", // Defines how the variables are imported
          path: ".env", // Path to your .env file
          blacklist: null,
          whitelist: null,
          safe: false,
          allowUndefined: true,
        },
      ],
    ],
  };
};
