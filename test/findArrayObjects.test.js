'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _tap = require('tap');

var _tap2 = _interopRequireDefault(_tap);

var _api = require('../src/api');

var _compareData = require('./compareData');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tap2.default.test('GET \'/find_*array-of-objects-field-name*/\' route', function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(t) {
    var conn, res;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            t.plan(2);

            conn = (0, _api.buildAPI)();


            t.tearDown(function () {
              return (0, _api.stopServer)(conn);
            });

            _context.next = 5;
            return conn.inject({
              method: 'GET',
              url: '/find_participants/'
            });

          case 5:
            res = _context.sent;


            t.equal(res.statusCode, 303);

            _context.next = 9;
            return conn.inject({
              method: 'GET',
              url: '/find_participants/?id=1'
            });

          case 9:
            res = _context.sent;


            t.same(res.json(), _compareData.findArrayObjectsData);

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());

_tap2.default.test('GET \'/find_*array-of-objects-field-name*/except/\' route', function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(t) {
    var conn, res;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            t.plan(3);

            conn = (0, _api.buildAPI)();


            t.tearDown(function () {
              return (0, _api.stopServer)(conn);
            });

            _context2.next = 5;
            return conn.inject({
              method: 'GET',
              url: '/find_participants/except/?id=13'
            });

          case 5:
            res = _context2.sent;


            t.equal(res.statusCode, 303);

            _context2.next = 9;
            return conn.inject({
              method: 'GET',
              url: '/find_participants/except/?fields=attendance'
            });

          case 9:
            res = _context2.sent;


            t.equal(res.statusCode, 303);

            _context2.next = 13;
            return conn.inject({
              method: 'GET',
              url: '/find_participants/except/?id=13&fields=attendance'
            });

          case 13:
            res = _context2.sent;


            t.same(res.json(), _compareData.findArrayObjectsExceptData);

          case 15:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}());

_tap2.default.test('GET \'/find_*array-of-objects-field-name*/only/\' route', function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(t) {
    var conn, res;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            t.plan(3);

            conn = (0, _api.buildAPI)();


            t.tearDown(function () {
              return (0, _api.stopServer)(conn);
            });

            _context3.next = 5;
            return conn.inject({
              method: 'GET',
              url: '/find_participants/only/?id=33'
            });

          case 5:
            res = _context3.sent;


            t.equal(res.statusCode, 303);

            _context3.next = 9;
            return conn.inject({
              method: 'GET',
              url: '/find_participants/only/?fields=title'
            });

          case 9:
            res = _context3.sent;


            t.equal(res.statusCode, 303);

            _context3.next = 13;
            return conn.inject({
              method: 'GET',
              url: '/find_participants/only/?id=33&fields=ytLink'
            });

          case 13:
            res = _context3.sent;


            t.same(res.json(), _compareData.findArrayObjectsOnlyData);

          case 15:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function (_x3) {
    return _ref3.apply(this, arguments);
  };
}());