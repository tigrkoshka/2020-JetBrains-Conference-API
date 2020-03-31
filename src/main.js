'use strict';

var _api = require('./api');

var conn = (0, _api.buildAPI)();

// eslint-disable-next-line no-console
(0, _api.runServer)(conn).then(function () {
  return console.log('\n\nServer listening on ' + conn.server.address().port + '\n\n');
});