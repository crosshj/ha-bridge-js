/*
main thing that changes here versus the node-ssdp version
is the SSDP header
*/

module.exports = function (serviceType, rinfo) {
  var self = this
    , peer = rinfo.address
    , port = rinfo.port
    , stRegex
    , acceptor

  // unwrap quoted string
  if (serviceType[0] == '"' && serviceType[serviceType.length-1] == '"') {
    serviceType = serviceType.slice(1, -1)
  }

  if (self._allowWildcards) {
      stRegex = new RegExp(serviceType.replace(/\*/g, '.*') + '$')
      acceptor = function(usn, serviceType) {
          return serviceType === 'ssdp:all' || stRegex.test(usn)
      }
  } else {
      acceptor = function(usn, serviceType) {
          return serviceType === 'ssdp:all' || usn === serviceType
      }
  }

  Object.keys(self._usns).forEach(function (usn) {
    var udn = self._usns[usn]

    if (self._allowWildcards) {
        udn = udn.replace(stRegex, serviceType)
    }

    if (acceptor(usn, serviceType)) {
      var pkt = self._getSSDPHeader(
        '200 OK',
        {
          'CACHE-CONTROL': 'max-age=' + self._ttl,
          'EXT': '',
          'LOCATION': self._location,
          'OPT': '"http://schemas.upnp.org/upnp/1/0/"; ns=01',
          '01-NLS': self._nls,
          'ST': serviceType === 'ssdp:all' ? usn : serviceType,
          'USN': udn
        },
        true
      )

      self._logger('Sending a 200 OK for an M-SEARCH: %o', {'peer': peer, 'port': port})

      var message = new Buffer(pkt)

      self._send(message, peer, port, function (err, bytes) {
        self._logger('Sent M-SEARCH response: %o', {'message': pkt})
      })
    }
  })
}
