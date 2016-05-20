# amazon-echo-ha-bridge-js
Javascript version of a java software that emulates philips hue api to other home automation gateways.   
See https://github.com/armzilla/amazon-echo-ha-bridge

## current status
(This is a WIP until further notice)   
On npm start, responds properly to "Echo/Alexa, discover devices." Will add devices to the Echo with the caveat that devices discovered are hard-coded and fake.

## todo
- controllers (emulator and devices, upnp is mostly done)
- configurator UI
- project config

## goals
- emulation running on a computer
- emulation running on a rooted Wink Hub (will need node 0.11 there or not use Koa)
- replace Smartthings Hub functionality
- easily add devices to Wink Hub via mobile interface
