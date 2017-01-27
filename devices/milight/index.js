var WifiBoxModule = require('./wifibox.js');
var cmd = require('./commands.js');

const _defaultCallback = (err, threeByteArray) => {
  if (err) {
    console.log("udp error:" + err);
  } else {
    console.log('defaultCallback: send success')
  }
  return;
}

class Milight {
  constructor({ip, port=8899}) {
    if(!ip){
      return { error: 'must pass ip to constructor'}
    }
    this.box = new WifiBoxModule(ip, port);
  }

  brightness({zone=0, level, callback=defaultCallback}){
    this.on({zone, level, callback});
  }

  on({zone=0, brightness, callback=defaultCallback}){
    this.box.command(cmd.rgbw.on(zone), err => {
      if(err){
        return callback(err, cmd.rgbw.on(zone));
      }
      if (brightness > 0){
        setTimeout(() => {
          this.box.command(
            cmd.rgbw.brightness(Math.floor(100*brightness/255)),
            err => callback(err, cmd.rgbw.brightness(Math.floor(100*brightness/255)))
          );
        }, 50); //because callback fires after udp packet sent, not received??
      } else {
        callback(err, cmd.rgbw.on(zone));
      }
    });
  }

  off({zone=0, callback=defaultCallback}){
    this.box.command(cmd.rgbw.off(zone),
    err => callback(err, cmd.rgbw.off(zone)));
  }
}

function off(which, zone, callback) {
  var theBox = which === 'master'
    ? masterBox
    : box;
  theBox.off({zone, callback});
}

function on(which, zone, brightness, callback) {
  var theBox = which === 'master'
    ? masterBox
    : box;
  theBox.on({zone, brightness, callback});
}

var box = new Milight({ ip: "192.168.1.56"});
var masterBox = new Milight({ ip: "192.168.1.4"});

module.exports = {
  create: (ip, port) => new Milight({ip, port}),
  Milight,
  on,
  off,
  brightness: on
}
