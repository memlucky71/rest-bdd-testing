'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _call = require('./call');

var _call2 = _interopRequireDefault(_call);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by mohammad on 3/13/2019 AD.
 */

var _ = require('lodash');

var Unchanged = function Unchanged() {
    (0, _classCallCheck3.default)(this, Unchanged);
    this.temp = 'temp';
};

var UNCHANGED = new Unchanged();

var AlteredCall = function (_Call) {
    (0, _inherits3.default)(AlteredCall, _Call);

    function AlteredCall(baseCall, title, description) {
        var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
            _ref$url = _ref.url,
            url = _ref$url === undefined ? UNCHANGED : _ref$url,
            _ref$verb = _ref.verb,
            verb = _ref$verb === undefined ? UNCHANGED : _ref$verb,
            _ref$urlParams = _ref.urlParams,
            urlParams = _ref$urlParams === undefined ? UNCHANGED : _ref$urlParams,
            _ref$json = _ref.json,
            json = _ref$json === undefined ? UNCHANGED : _ref$json,
            _ref$headers = _ref.headers,
            headers = _ref$headers === undefined ? UNCHANGED : _ref$headers,
            _ref$query = _ref.query,
            query = _ref$query === undefined ? UNCHANGED : _ref$query,
            _ref$response = _ref.response,
            response = _ref$response === undefined ? null : _ref$response;

        (0, _classCallCheck3.default)(this, AlteredCall);

        var _this = (0, _possibleConstructorReturn3.default)(this, (AlteredCall.__proto__ || (0, _getPrototypeOf2.default)(AlteredCall)).call(this, title, description, response));

        _this.baseCall = baseCall;
        _this.diff = {};
        _this.url = url;

        if (!(urlParams instanceof Unchanged)) {
            _this.urlParams = urlParams;
        }

        if (!(query instanceof Unchanged)) {
            _this.query = query;
        }

        _this.verb = verb;
        _this.json = json;
        _this.headers = headers;
        return _this;
    }

    (0, _createClass3.default)(AlteredCall, [{
        key: 'toJson',
        value: function toJson() {
            var result = { title: this.title };
            result = (0, _extends3.default)({}, result, this.diff);

            if (this.description) {
                result['description'] = this.description;
            }

            if (!_.isEmpty(this.response)) {
                result['response'] = this.response.toJson();
            }

            return result;
        }
    }, {
        key: 'updateDiff',
        value: function updateDiff(key, value) {
            if (value instanceof Unchanged) {
                delete this.diff[key];
                return;
            }
            this.diff[key] = value;
        }
    }, {
        key: 'deleteUrlParams',
        value: function deleteUrlParams() {
            delete this.diff.urlParams;
        }
    }, {
        key: 'deleteVerb',
        value: function deleteVerb(value) {
            delete this.diff.verb;
        }
    }, {
        key: 'deleteHeaders',
        value: function deleteHeaders() {
            delete this.diff.headers;
        }
    }, {
        key: 'deleteQuery',
        value: function deleteQuery(value) {
            return this.diff.query;
        }
    }, {
        key: 'deleteJson',
        value: function deleteJson() {
            delete this.diff.json;
        }
    }, {
        key: 'url',
        get: function get() {
            return this.diff['url'] || this.baseCall.url;
        },
        set: function set(value) {
            if (value instanceof Unchanged) {
                delete this.diff['url'];
                return;
            }

            var _Call$destructureUrl = _call2.default.destructureUrl(value),
                url = _Call$destructureUrl.url,
                urlParams = _Call$destructureUrl.urlParams,
                query = _Call$destructureUrl.query;

            if (url && url != this.baseCall.url) {
                this.diff['url'] = url;
                this.urlParams = urlParams;
                this.query = query;
            }
        }
    }, {
        key: 'urlParams',
        get: function get() {
            return this.diff.urlParams || this.baseCall.urlParams;
        },
        set: function set(value) {
            this.updateDiff('urlParams', value);
        }
    }, {
        key: 'verb',
        get: function get() {
            return this.diff.verb || this.baseCall.verb;
        },
        set: function set(value) {
            this.updateDiff('verb', value);
        }
    }, {
        key: 'headers',
        get: function get() {
            return this.diff.headers || this.baseCall.headers;
        },
        set: function set(value) {
            this.updateDiff('headers', value);
        }
    }, {
        key: 'query',
        get: function get() {
            return this.diff.query || this.baseCall.query;
        },
        set: function set(value) {
            this.updateDiff('query', value);
        }
    }, {
        key: 'json',
        get: function get() {
            return this.diff.json || this.baseCall.json;
        },
        set: function set(value) {
            this.updateDiff('json', value);
        }
    }]);
    return AlteredCall;
}(_call2.default);

exports.default = AlteredCall;