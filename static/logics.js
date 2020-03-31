'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _deleteProperty = require('babel-runtime/core-js/reflect/delete-property');

var _deleteProperty2 = _interopRequireDefault(_deleteProperty);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.findField = findField;
exports.findArray = findArray;
exports.findArrayObjects = findArrayObjects;
exports.findDate = findDate;

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fieldMatchesExactly(field, model) {
  return function (a, b) {
    var compA = (0, _lodash.cloneDeep)(a),
        compB = (0, _lodash.cloneDeep)(b);

    if (Array.isArray(field)) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(field), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var level = _step.value;

          compA = compA[level];
          compB = compB[level];
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
    } else {
      compA = compA[field];
      compB = compB[field];
    }

    if (compA === model && compB !== model) {
      return -1;
    }

    if (compB === model && compA !== model) {
      return 1;
    }

    return a.index - b.index;
  };
}

function findField(data, field, model) {
  var dataCopy = [];

  // Otherwise the standard does not provide stable sort

  for (var i = 0; i < data.length; i += 1) {
    var toPush = (0, _lodash.cloneDeep)(data[i]);

    toPush.index = i;

    dataCopy.push(toPush);
  }

  dataCopy = dataCopy.filter(function (conf) {
    var value = (0, _lodash.cloneDeep)(conf);

    if (Array.isArray(field)) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = (0, _getIterator3.default)(field), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var level = _step2.value;

          value = value[level];
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
    } else {
      value = value[field];
    }

    return value.includes(model);
  }).sort(fieldMatchesExactly(field, model));

  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = (0, _getIterator3.default)(dataCopy), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var conf = _step3.value;

      (0, _deleteProperty2.default)(conf, 'index');
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

  return dataCopy;
}

function findArray(data, field, model) {
  return data.filter(function (conf) {
    return conf[field].includes(model);
  });
}

function findArrayObjects(data, field, id) {
  return data.filter(function (conf) {
    return conf[field].filter(function (instance) {
      return Number(instance.id) === Number(id);
    }).length > 0;
  });
}

function findDate(data, after, before) {
  var filtered = data;

  if (after !== undefined) {
    filtered = filtered.filter(function (conf) {
      return new Date(conf['dateStart']) - new Date(after) >= 0;
    });
  }

  if (before !== undefined) {
    filtered = filtered.filter(function (conf) {
      return new Date(before) - new Date(conf['dateFinish']) >= 0;
    });
  }

  return filtered;
}