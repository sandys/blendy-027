if (!globalThis.expo) {
  class MockEventEmitter {
    addListener() {
      return { remove: () => {} };
    }
    removeAllListeners() {}
  }

  class MockNativeModule {}

  class MockSharedObject {}

  globalThis.expo = {
    EventEmitter: MockEventEmitter,
    NativeModule: MockNativeModule,
    SharedObject: MockSharedObject,
  };
}

module.exports = {
  NativeUnimoduleProxy: {
    viewManagersMetadata: {},
  },
  NativeModulesProxy: {},
  UIManager: {},
  Linking: {},
};
