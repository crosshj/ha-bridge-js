/*

Milight LED bulbs and OEM equivalents such as:

Rocket LED, Limitless LED Applamp, Easybulb, s`luce, iLight, iBulb, and Kreuzer

*/


var WifiBoxModule = require('./wifibox.js');
var cmd = require('./commands.js');

const defaultCallback = (err, threeByteArray) => { //eslint-disable-line  no-unused-vars
  if (err) {
    console.log("udp error:" + err); //eslint-disable-line  no-console
  } else {
    console.log('defaultCallback: send success'); //eslint-disable-line  no-console
  }
  return;
};

class Milight {
  constructor({ip, port=8899}) {
    if(!ip){
      return { error: 'must pass ip to constructor'};
    }
    this.box = new WifiBoxModule(ip, port);
  }

  brightness({zone=0, level, callback=defaultCallback}){
    this.on({zone, level, callback});
  }

  on({zone=0, brightness, callback=defaultCallback}){
    console.log('box: ', this.box.toString());  //eslint-disable-line  no-console
    this.box.command(cmd.rgbw.on(zone), err => {
      if(err){
        return callback(err);
      }
      if (brightness > 0){
        setTimeout(() => {
          this.box.command(
            cmd.rgbw.brightness(Math.floor(100*brightness/255)),
            err => callback(err, 'ok')
          );
        }, 500); //because callback fires after udp packet sent, not received??
      } else {
        callback(err, 'ok');
      }
    });
  }

  off({zone=0, callback=defaultCallback}){
    console.log('box: ', this.box.toString());  //eslint-disable-line  no-console
    this.box.command(
      cmd.rgbw.off(zone),
      err => callback(err, 'ok')
    );
  }
}

module.exports = {
  create: ({ip, port}) => { return new Milight({ip, port}); }
};
