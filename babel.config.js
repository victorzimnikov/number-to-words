"use strict";

module.exports = api => {
  const isTest = api.env("test");

  api.cache(() => JSON.stringify({ isTest }));

  if (!isTest) {
    return {};
  }

  return {
    compact: false,
    presets: [["@babel/preset-env", { targets: { node: true } }], "@babel/preset-typescript"],
  };
};
