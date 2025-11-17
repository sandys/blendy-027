const expoModulesCore = jest.requireActual("expo-modules-core");

expoModulesCore.Platform = {
  OS: "android",
  select: (specs) => specs.android ?? specs.default ?? specs,
};

if (!expoModulesCore.requireNativeModule) {
  expoModulesCore.requireNativeModule = () => ({});
}

if (!expoModulesCore.requireOptionalNativeModule) {
  expoModulesCore.requireOptionalNativeModule = () => null;
}

module.exports = expoModulesCore;
