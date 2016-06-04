> Javascript version++ of a "java software that emulates philips hue api to other home automation gateways."   
> See java version at https://github.com/armzilla/amazon-echo-ha-bridge

## how to
```npm install```   
```npm start```   
Go to localhost:80 to add devices (make sure onUrl/offUrl is valid)   
Ask Alexa/Echo to discover devices   
Once done, you should see your device(s) in Alexa app   
Ask Alexa to turn your device(s) on/off   

## to do
- fix update/delete in configurator
- brightness, ie "Alexa, set {device name} to 75   
- downgrade from koa to something lighter (restify/flatiron) for embedded (Wink)   
- improve configurator (currently just a copy from original project)
  - search/add new device to Wink via configurator
  - mobile (almost native) web view
  - mobile app

## goals
- [X] emulation running on a computer
- [ ] emulation running on a rooted Wink Hub
- [ ] replace Smartthings Hub functionality
- [ ] easily add devices to Wink Hub via mobile interface
- [ ] connect devices like MiLight easily to HA hub
- [ ] color control of lights/scenes using Alexa/Echo
- [ ] solid mobile/desktop experience
