const devices = [
  { url: '192.168.1.213' }
];
const getDevices = () => devices.map((device, index) => index);

const updateUrl = url => {
  const deviceId = url.toLowerCase().split('wifiplug/')[1].split('/')[0];
  var state = url.toLowerCase().split('wifiplug/')[1].split('/')[1];
  state = state === 'on' ? 'off' : 'on'; //because wifi firmware is backwards
  var newUrl = "http://" + devices[deviceId].url + '/' + state;
  return newUrl;
};

const WifiPlug = {
  name: "WifiPlug",
  urlPattern: "{base}/wifiplug/{deviceId}/{state}"
};

WifiPlug.getDevices = getDevices;
WifiPlug.updateUrl = updateUrl;

module.exports = WifiPlug;
