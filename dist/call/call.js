'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _reponse = require('../reponse');

var _reponse2 = _interopRequireDefault(_reponse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by mohammad on 3/13/2019 AD.
 */
var URL = require('url');
var http = require('http');
var request = require('request-promise-native');
var _ = require('lodash');

var URL_PARAMETER_PATTERN = /(?<key>\w+):\s?(?<value>[\w\d_-]+)/g;

var Call = function () {
    function Call(title) {
        var description = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var response = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        (0, _classCallCheck3.default)(this, Call);

        this.title = title;
        this.description = description;
        if (response && (typeof response === 'undefined' ? 'undefined' : (0, _typeof3.default)(response)) === 'object') {
            this.response = new _reponse2.default(response.status, response.headers, { body: response.body || null, json: response.json || null });
        } else {
            this.response = response;
        }
    }

    (0, _createClass3.default)(Call, [{
        key: 'toJson',
        value: function toJson() {
            var result = { title: this.title, description: this.description, url: this.url, verb: this.verb };

            if (!_.isEmpty(this.query)) result['query'] = this.query;
            if (!_.isEmpty(this.urlParams)) result['urlParams'] = this.urlParams;
            if (!_.isEmpty(this.json)) result['json'] = this.json;
            if (!_.isEmpty(this.headers)) result['headers'] = this.headers;
            if (this.response) result['response'] = this.response.toJson();

            return result;
        }
    }, {
        key: 'invoke',
        value: function invoke(app) {
            var _this = this;

            var url = this.url;

            if (!_.isEmpty(this.urlParams)) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = (0, _getIterator3.default)((0, _keys2.default)(this.urlParams)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var key = _step.value;

                        url = url.replace(new RegExp(':' + key), '' + this.urlParams[key]);
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

            var options = {
                uri: 'http://' + app.address().address + ':' + (app.address().port || 80) + url,
                method: this.verb,
                qs: this.query,
                json: this.json,
                resolveWithFullResponse: true,
                headers: this.headers
            };

            return new _promise2.default(function (resolve, reject) {
                request(options).then(function (res) {
                    var body = res.body;
                    if (body && (typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)) === 'object') {
                        body = (0, _stringify2.default)(body, null, 4);
                    }
                    _this.response = new _reponse2.default(res.statusCode, res.headers, { body: body, json: res.json });
                    resolve(_this);
                }).catch(function (err) {
                    var res = err.response;
                    _this.response = new _reponse2.default(res.statusCode, res.headers, { body: res.body, json: res.json });
                    resolve(_this);
                });
            });
        }
    }], [{
        key: 'destructureUrl',
        value: function destructureUrl(u) {
            var urlParams = {};
            var query = null;
            var parsedUrl = URL.parse(u, true);

            if (!_.isEmpty(parsedUrl.query)) {
                query = parsedUrl.query;
            }

            var url = decodeURIComponent(parsedUrl.pathname);

            var match = URL_PARAMETER_PATTERN.exec(url);
            var result = [];
            while (match) {
                result.push(match);
                match = URL_PARAMETER_PATTERN.exec(url);
            }

            if (result) {
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = (0, _getIterator3.default)(result), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var matchedPairs = _step2.value;

                        var key = matchedPairs[1];
                        var value = matchedPairs[2];

                        urlParams[key] = value;
                        url = url.replace(new RegExp(key + ':\\s?[\\w\\d_-]+'), ':' + key);
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
            }
            return { url: url, query: query, urlParams: urlParams };
        }
    }]);
    return Call;
}();

exports.default = Call;