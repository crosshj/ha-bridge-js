## Plugins

Use plugins to define hubs (and maybe more in the future).

Current plugins:

- milight (WIP)
- wink (WIP)

### Using a plugin to create a new hub

Once a hub plugin is defined, you can add a hub or hubs of the type defined in the plugin.

![image](https://cloud.githubusercontent.com/assets/1816471/22678305/2798f242-ecc7-11e6-9953-2dd15968970a.png)

After this, you can add devices to that hub and use that device as you would a device you defined yourself.

### advantages of using a hub plugin versus defining your own device:

- avoid manual process and associated errors
- process information from Echo before calling your device
- create groups of devices that appear as one device to Echo
- create scenes from previously mentioned device groups (including color control)
- create groups that adopt a different scene based on some variable like time
