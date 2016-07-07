var request = require('koa-request');
const updateThunk = require('../controllers/devices').updateThunk;
const findThunk = require('../controllers/devices').findThunk;
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

    var deviceMatch = yield findThunk(deviceId);
    var updateUrl = deviceMatch[0][fieldValue+"Url"];
    console.log(updateUrl);

    var options = {
        url: updateUrl,
        headers: {}
    };
    var response = yield request(options);
    if (response.body !== 'ok') {
      console.log('response body of koa request to milight: ', response.body);
      throw 'milights did not return an "okay" response';
    }

    // TODO: need a queue for SQLITE DB here ???
    //yield updateThunk(deviceId, fieldName, fieldValue);
    deviceState[0].success["/lights/" + deviceId + "/state/on"] = fieldValue;
  } catch (error) {
    deviceState = { error };
  }
  return deviceState;
}
