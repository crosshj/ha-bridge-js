[![Join the chat at https://gitter.im/crosshj/Lobby](https://badges.gitter.im/crosshj/Lobby.svg)](https://gitter.im/crosshj/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://travis-ci.org/crosshj/ha-bridge-js.svg?branch=master)](https://travis-ci.org/crosshj/ha-bridge-js)

Use an emulated Philips Hue bridge to tie your home automation together, complete with voice control via Amazon Echo/Dot.   

This bridge allows you to customize control of your devices *locally* using TCP and UDP with support for ZWave / ZigBee / Bluetooth using Wink hub radios (via plugin) and IR using IR blaster (pending).

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
- [X] Sonoff - https://github.com/arendst/Sonoff-Tasmota/wiki/Commands
- [X] rooted Wink Hub plugin
- [ ] hyperion plugin - https://github.com/WeeJeWel/node-hyperion-client
- [ ] replace my Smartthings Hub functionality/usage
- [ ] brightness control
- [ ] color control
- [ ] light scenes (versus group) with color
- [ ] compatibilty with Hue apps
- [ ] group lights, use hub groups
- [ ] delete hub device when deleting hub
- [ ] hub discovery, device discovery

# discover devices
```
nmap 192.168.1.* -n -sP | grep report | awk '{print $5}'
```

also see https://trello.com/b/C0Ao3HRg/home-automation for project status and TODO's

## Docker / node / Ubuntu gotcha
Won't be able to bind node or Docker to port < 1024 unless...
``` 
sudo setcap 'cap_net_bind_service=+ep' `which node`
```
AND / OR
```
sudo setcap 'cap_net_bind_service=+ep' `which docker`
```

## credits / influence / direction / thank you
https://github.com/armzilla/amazon-echo-ha-bridge   
https://github.com/bwssytems/ha-bridge


