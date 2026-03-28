const RN = jest.requireActual('react-native');

RN.Platform = {
  OS: 'android',
  select: (specs) => specs.android,
};

RN.StyleSheet = {
  create: (styles) => styles,
};

module.exports = RN;
