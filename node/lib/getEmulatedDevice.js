module.exports = function getEmulatedDevice(device) {
  var emulated = {
    "state": {
      "on": false,
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
    "type": "Extended color light",
    "name": device.name,
    "modelid": "LCT001",
    "manufacturername": "Philips",
    "uniqueid": device.uuid,
    "swversion": "65003148",
    "pointsymbol": {
      "1": "none",
      "2": "none",
      "3": "none",
      "4": "none",
      "5": "none",
      "6": "none",
      "7": "none",
      "8": "none"
    }
  };
  return emulated;
};
