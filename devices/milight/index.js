var WifiBoxModule = require('./milight/wifibox.js');
var cmd = require('./milight/commands.js');

var box = new WifiBoxModule("192.168.1.56", 8899);
var masterBox = new WifiBoxModule("192.168.1.4", 8899);

function off(which, zone) {
  var theBox = which === 'master'
    ? masterBox
    : box;
  theBox.command(cmd.rgbw.off(zone));
}

function on(which, zone, brightness) {
  var theBox = which === 'master'
    ? masterBox
    : box;
  theBox.command(cmd.rgbw.on(zone));
  if (brightness > 0){
    setTimeout(function(){
      theBox.command(
        cmd.rgbw.brightness(Math.floor(100*brightness/255))
      );
    }, 500);
  }
}

function brightness(which, zone, level){
  on(which, zone, level);
}

module.exports = {
  on: on,
  off: off,
  brightness: brightness
}
