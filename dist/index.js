'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Remove = exports.Append = exports.Update = exports.Given = undefined;

var _given = require('./given');

var _given2 = _interopRequireDefault(_given);

var _manipulation = require('./manipulation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by mohammad on 3/9/2019 AD.
 */

exports.Given = _given2.default;
exports.Update = _manipulation.Update;
exports.Append = _manipulation.Append;
exports.Remove = _manipulation.Remove;