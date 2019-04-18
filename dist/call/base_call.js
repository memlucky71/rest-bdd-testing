'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _call = require('./call');

var _call2 = _interopRequireDefault(_call);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by mohammad on 3/13/2019 AD.
 */

var _ = require('lodash');

var BaseCall = function (_Call) {
    (0, _inherits3.default)(BaseCall, _Call);

    function BaseCall(title, description) {
        var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
            _ref$url = _ref.url,
            url = _ref$url === undefined ? '/' : _ref$url,
            _ref$verb = _ref.verb,
            verb = _ref$verb === undefined ? 'GET' : _ref$verb,
            _ref$urlParams = _ref.urlParams,
            urlParams = _ref$urlParams === undefined ? {} : _ref$urlParams,
            _ref$json = _ref.json,
            json = _ref$json === undefined ? {} : _ref$json,
            _ref$headers = _ref.headers,
            headers = _ref$headers === undefined ? {} : _ref$headers,
            _ref$query = _ref.query,
            query = _ref$query === undefined ? {} : _ref$query,
            _ref$response = _ref.response,
            response = _ref$response === undefined ? null : _ref$response;

        (0, _classCallCheck3.default)(this, BaseCall);

        var _this = (0, _possibleConstructorReturn3.default)(this, (BaseCall.__proto__ || (0, _getPrototypeOf2.default)(BaseCall)).call(this, title, description, response));

        _this._url = null;
        _this._query = null;
        _this._urlParams = null;


        _this.verb = verb;
        _this.url = url;
        if (!_.isEmpty(urlParams)) {
            _this.urlParams = urlParams;
        }
        if (!_.isEmpty(query)) {
            _this.query = query;
        }
        _this.json = json;
        _this.headers = headers;
        return _this;
    }

    (0, _createClass3.default)(BaseCall, [{
        key: 'query',
        get: function get() {
            return this._query;
        },
        set: function set(value) {
            this._query = value;
        }
    }, {
        key: 'urlParams',
        get: function get() {
            return this._urlParams;
        },
        set: function set(value) {
            this._urlParams = value;
        }
    }, {
        key: 'url',
        get: function get() {
            return this._url;
        },
        set: function set(value) {
            var result = _call2.default.destructureUrl(value);
            this._url = result.url;
            this.urlParams = result.urlParams;
            this.query = result.query;
        }
    }]);
    return BaseCall;
}(_call2.default);

exports.default = BaseCall;