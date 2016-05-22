const dummyLights =  {
  "23b79f51-53a7-4f87-9f46-4c0e09bf0d2a": "Foo",
  "23b79f51-53a7-4f87-9f46-4c0e09bf0d2b": "Bar"
};

module.exports = function(lightId) {

  return lightId
    ? dummyLights[lightId]
    : dummyLights;
};
