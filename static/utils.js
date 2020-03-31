'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queryString = queryString;
exports.getField = getField;
function queryString(request) {
  return request.raw.url.substring(request.raw.url.indexOf('?'));
}

function getField(search) {
  var field = search;

  if (field === 'city' || field === 'country') {
    field = ['location', field];
  }

  return field;
}