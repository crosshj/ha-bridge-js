var request = require('koa-request');
const updateThunk = require('../controllers/devices').updateThunk;
const deviceState = {};

module.exports = function* (deviceId, payload){
  const status = JSON.parse(Object.keys(payload)[0]);
  const fieldName = Object.keys(status)[0] === "on"
    ? "status"
    : undefined;
  const fieldValue = status["on"] ? "on" : "off" ;
  var deviceState = [{
    'success': {}
  }];

  try {
    if (!fieldName){
      throw "could not find fieldName";
    }

    // hard-coded now, but need to load device and use its url
    var options = {
        url: 'http://192.168.1.78:3000/milights/' + fieldValue,
        headers: {}
    };
    var response = yield request(options);
    if (response.body !== 'ok') {
      throw 'milights did not return an "okay" response';
    }

    yield updateThunk(deviceId, fieldName, fieldValue);
    deviceState[0].success["/lights/" + deviceId + "/state/on"] = fieldValue;
  } catch (error) {
    deviceState = { error };
  }
  return deviceState;
}
