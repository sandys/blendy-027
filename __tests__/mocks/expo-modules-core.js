const EMC = jest.requireActual('expo-modules-core');

EMC.Platform = {
  OS: 'android',
  select: (specs) => specs.android,
};

module.exports = EMC;
