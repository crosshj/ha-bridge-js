[![Join the chat at https://gitter.im/crosshj/Lobby](https://badges.gitter.im/crosshj/Lobby.svg)](https://gitter.im/crosshj/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://travis-ci.org/crosshj/ha-bridge-js.svg?branch=master)](https://travis-ci.org/crosshj/ha-bridge-js)

Use an emulated Philips Hue bridge to tie your home automation together, complete with voice control via Amazon Echo/Dot.   

This bridge allows you to customize control of your devices *locally* using TCP and UDP with pending support for ZWave / ZigBee / Bluetooth using Wink hub radios and IR using IR blaster.

![image](https://cloud.githubusercontent.com/assets/1816471/23290958/cb9ad8ac-fa22-11e6-933e-d006e1657538.png)

## how to
```npm install```   
```npm start```   
Go to localhost:80 to add devices (make sure onUrl/offUrl is valid)   
Ask Alexa/Echo to discover devices   
Once done, you should see your device(s) in Alexa app as "Dimmable Light"  
Ask Alexa to turn your device(s) on/off or change brightness   

## goals
- [X] emulation running on a computer
- [X] configurator / UI in react
- [X] plugin architecture and example hub plugins
- [X] Milight plugin
- [ ] https://github.com/WeeJeWel/node-hyperion-client
- [ ] rooted Wink Hub plugin
- [ ] easily add devices to hubs via mobile interface (discovery for plugins)
- [ ] replace my Smartthings Hub functionality/usage
- [ ] color control of lights/scenes using Alexa/Echo
- [ ] solid mobile/desktop experience
- [ ] compatibilty with Hue apps
- [ ] group lights
- [ ] Sonoff - https://github.com/arendst/Sonoff-Tasmota/wiki/Commands

## credits / influence / direction / thank you
https://github.com/armzilla/amazon-echo-ha-bridge   
https://github.com/bwssytems/ha-bridge
