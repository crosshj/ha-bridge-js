> Javascript version of a "java software that emulates philips hue api to other home automation gateways."   
> See java version at https://github.com/armzilla/amazon-echo-ha-bridge

## current status
On npm start, responds properly to "Echo/Alexa, discover devices." 
Will add devices to the Echo which have been added to DB through devices API.
Does NOT update discovered devices properly.
(This is a WIP until further notice) 

## todo
- controllers (only Update API for emulation left)
- configurator UI
- project config
- documentation / video

## goals
- emulation running on a computer
- emulation running on a rooted Wink Hub (will need node 0.11 there or not use Koa)
- replace Smartthings Hub functionality
- easily add devices to Wink Hub via mobile interface
