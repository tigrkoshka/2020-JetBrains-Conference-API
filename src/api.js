'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stopServer = exports.runServer = undefined;

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var runServer = exports.runServer = function () {
  var _ref16 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee16(conn) {
    return _regenerator2.default.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _context16.prev = 0;
            _context16.next = 3;
            return conn.listen(process.env.PORT || 4343, '0.0.0.0');

          case 3:
            _context16.next = 9;
            break;

          case 5:
            _context16.prev = 5;
            _context16.t0 = _context16['catch'](0);

            conn.log.error(_context16.t0);
            throw _context16.t0;

          case 9:
          case 'end':
            return _context16.stop();
        }
      }
    }, _callee16, this, [[0, 5]]);
  }));

  return function runServer(_x31) {
    return _ref16.apply(this, arguments);
  };
}();

var stopServer = exports.stopServer = function () {
  var _ref17 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee17(conn) {
    return _regenerator2.default.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _context17.prev = 0;
            _context17.next = 3;
            return conn.close();

          case 3:
            _context17.next = 9;
            break;

          case 5:
            _context17.prev = 5;
            _context17.t0 = _context17['catch'](0);

            conn.log.error(_context17.t0);
            throw _context17.t0;

          case 9:
          case 'end':
            return _context17.stop();
        }
      }
    }, _callee17, this, [[0, 5]]);
  }));

  return function stopServer(_x32) {
    return _ref17.apply(this, arguments);
  };
}();

exports.buildAPI = buildAPI;

var _queryTypes = require('../static/queryTypes');

var _logics = require('../static/logics');

var _utils = require('../static/utils');

var _conferences = require('../data/conferences');

var _conferences2 = _interopRequireDefault(_conferences);

var _fastify = require('fastify');

var _fastify2 = _interopRequireDefault(_fastify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var searchFields = ['_id', 'title', 'ytLink', 'country', 'city', 'link', 'status'];

var searchArray = ['projects', 'tags'];

var searchArrayObjects = ['participants'];

function buildAPI() {
  var _this = this;

  var conn = (0, _fastify2.default)();

  conn.get('/', function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(request, reply) {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              reply.type('application/json');

              return _context.abrupt('return', (0, _stringify2.default)((0, _queryTypes.all)(_conferences2.default)));

            case 2:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());

  conn.get('/except/', function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(request, reply) {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (request.query.fields === undefined) {
                reply.redirect(303, '/' + (0, _utils.queryString)(request));
              }

              reply.type('application/json');

              return _context2.abrupt('return', (0, _stringify2.default)((0, _queryTypes.except)(_conferences2.default, request.query.fields)));

            case 3:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());

  conn.get('/only/', function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(request, reply) {
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (request.query.fields === undefined) {
                reply.redirect(303, '/' + (0, _utils.queryString)(request));
              }

              reply.type('application/json');

              return _context3.abrupt('return', (0, _stringify2.default)((0, _queryTypes.only)(_conferences2.default, request.query.fields)));

            case 3:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this);
    }));

    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }());

  var _loop = function _loop(search) {
    conn.get('/find_' + search + '/', function () {
      var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(request, reply) {
        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (request.query[search] === undefined) {
                  reply.redirect(303, '/' + (0, _utils.queryString)(request));
                }

                reply.type('application/json');

                return _context7.abrupt('return', (0, _stringify2.default)((0, _queryTypes.all)((0, _logics.findField)(_conferences2.default, (0, _utils.getField)(search), request.query[search]))));

              case 3:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, _this);
      }));

      return function (_x13, _x14) {
        return _ref7.apply(this, arguments);
      };
    }());

    conn.get('/find_' + search + '/except/', function () {
      var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(request, reply) {
        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (request.query[search] === undefined) {
                  reply.redirect(303, '/except/' + (0, _utils.queryString)(request));
                }

                if (request.query.fields === undefined) {
                  reply.redirect(303, '/find_' + search + '/' + (0, _utils.queryString)(request));
                }

                reply.type('application/json');

                return _context8.abrupt('return', (0, _stringify2.default)((0, _queryTypes.except)((0, _logics.findField)(_conferences2.default, (0, _utils.getField)(search), request.query[search]), request.query.fields)));

              case 4:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, _this);
      }));

      return function (_x15, _x16) {
        return _ref8.apply(this, arguments);
      };
    }());

    conn.get('/find_' + search + '/only/', function () {
      var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(request, reply) {
        return _regenerator2.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                if (request.query[search] === undefined) {
                  reply.redirect(303, '/only/' + (0, _utils.queryString)(request));
                }

                if (request.query.fields === undefined) {
                  reply.redirect(303, '/find_' + search + '/' + (0, _utils.queryString)(request));
                }

                reply.type('application/json');

                return _context9.abrupt('return', (0, _stringify2.default)((0, _queryTypes.only)((0, _logics.findField)(_conferences2.default, (0, _utils.getField)(search), request.query[search]), request.query.fields)));

              case 4:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, _this);
      }));

      return function (_x17, _x18) {
        return _ref9.apply(this, arguments);
      };
    }());
  };

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)(searchFields), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var search = _step.value;

      _loop(search);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var _loop2 = function _loop2(search) {
    conn.get('/find_' + search + '/', function () {
      var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(request, reply) {
        return _regenerator2.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                if (request.query[search] === undefined) {
                  reply.redirect(303, '/' + (0, _utils.queryString)(request));
                }

                reply.type('application/json');

                return _context10.abrupt('return', (0, _stringify2.default)((0, _queryTypes.all)((0, _logics.findArray)(_conferences2.default, (0, _utils.getField)(search), request.query[search]))));

              case 3:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, _this);
      }));

      return function (_x19, _x20) {
        return _ref10.apply(this, arguments);
      };
    }());

    conn.get('/find_' + search + '/except/', function () {
      var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11(request, reply) {
        return _regenerator2.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                if (request.query[search] === undefined) {
                  reply.redirect(303, '/except/' + (0, _utils.queryString)(request));
                }

                if (request.query.fields === undefined) {
                  reply.redirect(303, '/find_' + search + '/' + (0, _utils.queryString)(request));
                }

                reply.type('application/json');

                return _context11.abrupt('return', (0, _stringify2.default)((0, _queryTypes.except)((0, _logics.findArray)(_conferences2.default, (0, _utils.getField)(search), request.query[search]), request.query.fields)));

              case 4:
              case 'end':
                return _context11.stop();
            }
          }
        }, _callee11, _this);
      }));

      return function (_x21, _x22) {
        return _ref11.apply(this, arguments);
      };
    }());

    conn.get('/find_' + search + '/only/', function () {
      var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12(request, reply) {
        return _regenerator2.default.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                if (request.query[search] === undefined) {
                  reply.redirect(303, '/only/' + (0, _utils.queryString)(request));
                }

                if (request.query.fields === undefined) {
                  reply.redirect(303, '/find_' + search + '/' + (0, _utils.queryString)(request));
                }

                reply.type('application/json');

                return _context12.abrupt('return', (0, _stringify2.default)((0, _queryTypes.only)((0, _logics.findArray)(_conferences2.default, (0, _utils.getField)(search), request.query[search]), request.query.fields)));

              case 4:
              case 'end':
                return _context12.stop();
            }
          }
        }, _callee12, _this);
      }));

      return function (_x23, _x24) {
        return _ref12.apply(this, arguments);
      };
    }());
  };

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = (0, _getIterator3.default)(searchArray), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var search = _step2.value;

      _loop2(search);
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  var _loop3 = function _loop3(search) {
    conn.get('/find_' + search + '/', function () {
      var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13(request, reply) {
        return _regenerator2.default.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                if (request.query.id === undefined) {
                  reply.redirect(303, '/' + (0, _utils.queryString)(request));
                }

                reply.type('application/json');

                return _context13.abrupt('return', (0, _stringify2.default)((0, _queryTypes.all)((0, _logics.findArrayObjects)(_conferences2.default, search, request.query.id))));

              case 3:
              case 'end':
                return _context13.stop();
            }
          }
        }, _callee13, _this);
      }));

      return function (_x25, _x26) {
        return _ref13.apply(this, arguments);
      };
    }());

    conn.get('/find_' + search + '/except/', function () {
      var _ref14 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee14(request, reply) {
        return _regenerator2.default.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                if (request.query.id === undefined) {
                  reply.redirect(303, '/except/' + (0, _utils.queryString)(request));
                }

                if (request.query.fields === undefined) {
                  reply.redirect(303, '/find_' + search + '/' + (0, _utils.queryString)(request));
                }

                reply.type('application/json');

                return _context14.abrupt('return', (0, _stringify2.default)((0, _queryTypes.except)((0, _logics.findArrayObjects)(_conferences2.default, search, request.query.id), request.query.fields), request.query.fields));

              case 4:
              case 'end':
                return _context14.stop();
            }
          }
        }, _callee14, _this);
      }));

      return function (_x27, _x28) {
        return _ref14.apply(this, arguments);
      };
    }());

    conn.get('/find_' + search + '/only/', function () {
      var _ref15 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee15(request, reply) {
        return _regenerator2.default.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                if (request.query.id === undefined) {
                  reply.redirect(303, '/only/' + (0, _utils.queryString)(request));
                }

                if (request.query.fields === undefined) {
                  reply.redirect(303, '/find_' + search + '/' + (0, _utils.queryString)(request));
                }

                reply.type('application/json');

                return _context15.abrupt('return', (0, _stringify2.default)((0, _queryTypes.only)((0, _logics.findArrayObjects)(_conferences2.default, search, request.query.id), request.query.fields), request.query.fields));

              case 4:
              case 'end':
                return _context15.stop();
            }
          }
        }, _callee15, _this);
      }));

      return function (_x29, _x30) {
        return _ref15.apply(this, arguments);
      };
    }());
  };

  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = (0, _getIterator3.default)(searchArrayObjects), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var search = _step3.value;

      _loop3(search);
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  conn.get('/find_date/', function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(request, reply) {
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (request.query.after === undefined && request.query.before === undefined) {
                reply.redirect(303, '/' + (0, _utils.queryString)(request));
              }

              reply.type('application/json');

              return _context4.abrupt('return', (0, _stringify2.default)((0, _queryTypes.all)((0, _logics.findDate)(_conferences2.default, request.query.after, request.query.before))));

            case 3:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, _this);
    }));

    return function (_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }());

  conn.get('/find_date/except/', function () {
    var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(request, reply) {
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (request.query.after === undefined && request.query.before === undefined) {
                reply.redirect(303, '/except/' + (0, _utils.queryString)(request));
              }

              if (request.query.fields === undefined) {
                reply.redirect(303, '/find_date/' + (0, _utils.queryString)(request));
              }

              reply.type('application/json');

              return _context5.abrupt('return', (0, _stringify2.default)((0, _queryTypes.except)((0, _logics.findDate)(_conferences2.default, new Date(request.query.after), new Date(request.query.before)), request.query.fields)));

            case 4:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, _this);
    }));

    return function (_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }());

  conn.get('/find_date/only/', function () {
    var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(request, reply) {
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (request.query.after === undefined && request.query.before === undefined) {
                reply.redirect(303, '/only/' + (0, _utils.queryString)(request));
              }

              if (request.query.fields === undefined) {
                reply.redirect(303, '/find_date/' + (0, _utils.queryString)(request));
              }

              reply.type('application/json');

              return _context6.abrupt('return', (0, _stringify2.default)((0, _queryTypes.only)((0, _logics.findDate)(_conferences2.default, new Date(request.query.after), new Date(request.query.before)), request.query.fields)));

            case 4:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, _this);
    }));

    return function (_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }());

  return conn;
}