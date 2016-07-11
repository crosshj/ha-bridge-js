module.exports = function getEmulatedDevice(device) {
  var emulated = {
    "state": {
      "on": device.status === "on",
      "bri": 254,
      "hue": 15823,
      "sat": 88,
      "effect": "none",
      "ct": 313,
      "alert": "none",
      "colormode": "ct",
      "reachable": true,
      "xy": [0.4255, 0.3998]
    },
    "type": "Dimmable light",
    "name": device.name,
    "modelid": "HAB001",
    "manufacturername": "Philips",
    "uniqueid": device.uuid,
    "swversion": "65003148"
  };
  return emulated;
};
