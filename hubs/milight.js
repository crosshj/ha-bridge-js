
// TODO: query milight for number of devices ??
//const getDevices = () => [0, 1, 2, 3, 4];
const getDevices = () => [0]; //All

const Milight = {
  name: "Milight",
  urlPattern: "{base}/milights/{deviceId}/{state}"
};

Milight.getDevices = getDevices;

module.exports = Milight;
