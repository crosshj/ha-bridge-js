
// TODO: query milight for number of devices ??
//const getDevices = () => [0, 1, 2, 3, 4];
const getDevices = () => [0]; //All

const updateUrl = url => {
  //NOTE: this really does nothing, but it's a good example
  var brightness = url.match(/([^\/]*)$/g)[0];
  var newBrightness = brightness; //NOTE: change to some different value
  var newUrl = url.replace(new RegExp(brightness + '$'), newBrightness);
  return newUrl;
};

//base is the hub base
//deviceId is got from getDevices
//state is sent by echo
const Milight = {
  name: "Milight",
  urlPattern: "{base}/milights/{deviceId}/{state}"
};

Milight.getDevices = getDevices;
Milight.updateUrl = updateUrl;

module.exports = Milight;
