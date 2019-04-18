'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by mohammad on 3/21/2019 AD.
 */
var _ = require('lodash');

var CONTENT_TYPE_PATTERN = /(?<contentType>\w+\/\w+);?(\s?charset=(?<charset>[\w\d_-]+))?/g;

var Response = function () {
    function Response(status, headers) {
        var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
            _ref$body = _ref.body,
            body = _ref$body === undefined ? null : _ref$body,
            _ref$json = _ref.json,
            json = _ref$json === undefined ? null : _ref$json;

        (0, _classCallCheck3.default)(this, Response);

        this.status = status;
        this.headers = headers;

        if (!_.isEmpty(json)) {
            this.body = (0, _stringify2.default)(json, null, 4);
        } else if (body) {
            this.body = body;
        }

        if (!_.isEmpty(headers)) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = (0, _getIterator3.default)((0, _keys2.default)(headers)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var key = _step.value;

                    if (key.toLowerCase() === 'content-type') {
                        CONTENT_TYPE_PATTERN.lastIndex = 0;
                        var matches = CONTENT_TYPE_PATTERN.exec(headers[key]);
                        this.contentType = matches.groups.contentType;
                        this.encoding = matches.groups.charset;
                    }
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
        }
    }

    (0, _createClass3.default)(Response, [{
        key: 'toJson',
        value: function toJson() {
            var result = { 'status': this.status };

            if (!_.isEmpty(this.headers)) {
                result['headers'] = this.headers;
            }

            if (this.body) {
                if (this.contentType === 'application/json') {
                    result['json'] = this.json;
                } else {
                    result['body'] = this.body;
                }
            }
            return result;
        }
    }, {
        key: 'json',
        get: function get() {
            return JSON.parse(this.body);
        }
    }]);
    return Response;
}();

exports.default = Response;