const template = "<?xml version=\"1.0\"?>\n" +
  "<root xmlns=\"urn:schemas-upnp-org:device-1-0\">\n" +
  "<specVersion>\n" +
  "<major>1</major>\n" +
  "<minor>0</minor>\n" +
  "</specVersion>\n" +
  "<URLBase>{{URL_BASE}}</URLBase>\n" + //hostname string
  "<device>\n" +
  "<deviceType>urn:schemas-upnp-org:device:Basic:1</deviceType>\n" +
  "<friendlyName>Amazon-Echo-HA-Bridge {{FRIENDLY_NAME}}</friendlyName>\n" +
  "<manufacturer>Royal Philips Electronics</manufacturer>\n" +
  "<manufacturerURL>http://www.armzilla..com</manufacturerURL>\n" +
  "<modelDescription>Hue Emulator for Amazon Echo bridge</modelDescription>\n" +
  "<modelName>Philips hue bridge 2012</modelName>\n" +
  "<modelNumber>929000226503</modelNumber>\n" +
  "<modelURL>http://www.armzilla.com/amazon-echo-ha-bridge</modelURL>\n" +
  "<serialNumber>01189998819991197253</serialNumber>\n" +
  "<UDN>uuid:{{UUID}}</UDN>\n" +
  "<serviceList>\n" +
  "<service>\n" +
  "<serviceType>(null)</serviceType>\n" +
  "<serviceId>(null)</serviceId>\n" +
  "<controlURL>(null)</controlURL>\n" +
  "<eventSubURL>(null)</eventSubURL>\n" +
  "<SCPDURL>(null)</SCPDURL>\n" +
  "</service>\n" +
  "</serviceList>\n" +
  "<presentationURL>index.html</presentationURL>\n" +
  "<iconList>\n" +
  "<icon>\n" +
  "<mimetype>image/png</mimetype>\n" +
  "<height>48</height>\n" +
  "<width>48</width>\n" +
  "<depth>24</depth>\n" +
  "<url>hue_logo_0.png</url>\n" +
  "</icon>\n" +
  "<icon>\n" +
  "<mimetype>image/png</mimetype>\n" +
  "<height>120</height>\n" +
  "<width>120</width>\n" +
  "<depth>24</depth>\n" +
  "<url>hue_logo_3.png</url>\n" +
  "</icon>\n" +
  "</iconList>\n" +
  "</device>\n" +
  "</root>\n";

module.exports = function(urlBase, friendlyName, uuid) {
  const filledTemplate = template
    .replace("{{URL_BASE}}", urlBase)
    .replace('{{UUID}}', uuid)
    .replace("{{FRIENDLY_NAME}}", friendlyName);
  return filledTemplate;
};
