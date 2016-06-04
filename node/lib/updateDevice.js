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
  console.log(status)
  try {
    if (!fieldName){
      throw "could not find fieldName";
    }
    // TODO: trigger updateOn / updateOff here
    yield updateThunk(deviceId, fieldName, fieldValue);
    deviceState[0].success["/lights/" + deviceId + "/state/on"] = fieldValue;
  } catch (error) {
    console.log('error updating lights: ', error)
    deviceState = { error };
  }
  return deviceState;
}
