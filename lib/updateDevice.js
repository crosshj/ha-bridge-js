const updateThunk = require('../controllers/devices').updateThunk;
const deviceState = {};

module.exports = function* (deviceId, payload){
  const status = JSON.parse(Object.keys(payload)[0]);
  const fieldName = Object.keys(status)[0] === "on"
    ? "status"
    : undefined;
  const fieldValue = status[fieldName ? "on" : "off"] ;
  var deviceState = [{
    'success': {}
  }];

  try {
    if (!fieldName){
      throw "could not find fieldName";
    }
    // TODO: trigger updateOn / updateOff here, or maybe not (echo may do this)
    yield updateThunk(deviceId, fieldName, fieldValue);
    deviceState[0].success["/lights/" + deviceId + "/state/on"] = fieldValue;
  } catch (error) {
    deviceState = { error };
  }
  return deviceState;
}
