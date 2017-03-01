function showOnlyDevices(){
  var visibility = {};
  visibility.devices = 'All';
  visibility.hubs = false;
  visibility.bridge = false;
  return visibility;
}

function showOnlyHubs(){
  var visibility = {};
  visibility.devices = true;
  visibility.hubs = true;
  visibility.bridge = false;
  return visibility;
}

function showOnlyBridge(){
  var visibility = {};
  visibility.devices = false;
  visibility.hubs = false;
  visibility.bridge = true;
  return visibility;
}

function getVisibility(hash){
  var visibility = { devices: 'All' };
  switch(hash){
    case '#devices':
      visibility = showOnlyDevices();
      break;
    case '#hubs':
      visibility = showOnlyHubs();
      break;
    case '#bridge':
      visibility = showOnlyBridge();
      break;
    default:
      break;
  }
  return visibility;
}

export default getVisibility;
