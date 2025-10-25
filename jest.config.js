module.exports = {
  preset: "react-native",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?/.*|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|@nkzw/.*|expo-font|expo-constants|@unimodules/.*|unimodules|sentry-expo|native-base|@react-navigation/.*|react-native-svg|lucide-react-native))",
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "expo-modules-core": "<rootDir>/__tests__/mocks/expo-modules-core.js",
    "^react-native/Libraries/BatchedBridge/NativeModules$":
      "<rootDir>/__tests__/mocks/native-modules.js",
  },
  testMatch: ["**/__tests__/**/*.test.{ts,tsx}"],
  testPathIgnorePatterns: ["<rootDir>/.expo/", "<rootDir>/node_modules/"],
  clearMocks: true,
};
