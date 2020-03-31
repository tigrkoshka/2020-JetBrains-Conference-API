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

_tap2.default.test('GET \'/find_date/\' route', function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(t) {
    var conn, res;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            t.plan(4);

            conn = (0, _api.buildAPI)();


            t.tearDown(function () {
              return (0, _api.stopServer)(conn);
            });

            _context.next = 5;
            return conn.inject({
              method: 'GET',
              url: '/find_date/'
            });

          case 5:
            res = _context.sent;


            t.equal(res.statusCode, 303);

            _context.next = 9;
            return conn.inject({
              method: 'GET',
              url: '/find_date/?after=2019-02-20T12:00:00.000Z&before=2019-02-22T12:00:00.000Z'
            });

          case 9:
            res = _context.sent;


            t.same(res.json(), _compareData.findDateData);

            _context.next = 13;
            return conn.inject({
              method: 'GET',
              url: '/find_date/?after=2019-02-20T12:00:00.000Z'
            });

          case 13:
            res = _context.sent;


            t.same(res.json(), _compareData.findDateAfterData);

            _context.next = 17;
            return conn.inject({
              method: 'GET',
              url: '/find_date/?before=2019-02-20T12:00:00.000Z'
            });

          case 17:
            res = _context.sent;


            t.same(res.json(), _compareData.findDateBeforeData);

          case 19:
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

_tap2.default.test('GET \'/find_date/except/\' route', function () {
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
              url: '/find_date/except/?after=2019-02-20T12:00:00.000Z'
            });

          case 5:
            res = _context2.sent;


            t.equal(res.statusCode, 303);

            _context2.next = 9;
            return conn.inject({
              method: 'GET',
              url: '/find_date/except/?fields=comments'
            });

          case 9:
            res = _context2.sent;


            t.equal(res.statusCode, 303);

            _context2.next = 13;
            return conn.inject({
              method: 'GET',
              url: '/find_date/except/?after=2019-02-14T12:00:00.000Z&before=2019-02-20T12:00:00.000Z&fields=comments'
            });

          case 13:
            res = _context2.sent;


            t.same(res.json(), _compareData.findDateExceptData);

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

_tap2.default.test('GET \'/find_date/only/\' route', function () {
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
              url: '/find_date/only/?after=2019-02-20T12:00:00.000Z'
            });

          case 5:
            res = _context3.sent;


            t.equal(res.statusCode, 303);

            _context3.next = 9;
            return conn.inject({
              method: 'GET',
              url: '/find_date/only/?fields=comments'
            });

          case 9:
            res = _context3.sent;


            t.equal(res.statusCode, 303);

            _context3.next = 13;
            return conn.inject({
              method: 'GET',
              url: '/find_date/only/?after=2019-02-14T12:00:00.000Z&before=2019-02-20T12:00:00.000Z&fields=title&fields=link'
            });

          case 13:
            res = _context3.sent;


            t.same(res.json(), _compareData.findDateOnlyData);

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