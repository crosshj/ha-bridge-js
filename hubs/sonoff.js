// {host}/cm?cmnd=Power%20{on|off}

  const devices = [
    { url: '192.168.1.113' }
  ];
  
  const Sonoff = {
    name: "Sonoff",
    urlPattern: "{base}/cm?cmnd=Power%20{state}"
  };

  const getDevices = () => devices.map((device, index) => index);
  const updateUrl = url => url;
  
  Sonoff.getDevices = getDevices;
  Sonoff.updateUrl = updateUrl;
  
  module.exports = Sonoff;