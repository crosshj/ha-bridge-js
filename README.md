[![Build Status](https://travis-ci.org/crosshj/ha-bridge-js.svg?branch=master)](https://travis-ci.org/crosshj/ha-bridge-js)


Use an emulated Philips Hue bridge to tie your home automation together, complete with voice control via Amazon Echo/Dot.   

This bridge allows you to customize control of your devices *locally* using TCP and UDP with pending support for ZWave / ZigBee / Bluetooth using Wink hub radios and IR using IR blaster. 

## how to
```npm install```   
```npm start```   
Go to localhost:80 to add devices (make sure onUrl/offUrl is valid)   
Ask Alexa/Echo to discover devices   
Once done, you should see your device(s) in Alexa app as "Dimmable Light"  
Ask Alexa to turn your device(s) on/off   

## to do
- fix update/delete in configurator
- brightness, ie "Alexa, set {device name} to 75   
- downgrade from koa to something lighter (restify/flatiron) for embedded (Wink)   
- improve configurator (currently just a copy from original project)
  - search/add new device to Wink via configurator
  - different UI framework (react)
  - mobile web experience, responsive
  - mobile app

## goals
- [X] emulation running on a computer
- [ ] emulation running on a rooted Wink Hub
- [ ] replace my Smartthings Hub functionality/usage
- [ ] easily add devices to Wink Hub via mobile interface
- [ ] connect devices like MiLight easily to HA hub
- [ ] color control of lights/scenes using Alexa/Echo
- [ ] solid mobile/desktop experience
- [ ] compatibilty with Hue apps

## credits / influence / direction / thank you
https://github.com/armzilla/amazon-echo-ha-bridge   
https://github.com/bwssytems/ha-bridge

