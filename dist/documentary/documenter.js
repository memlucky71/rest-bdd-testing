'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by mohammad on 3/19/2019 AD.
 */

var _ = require('lodash');

var Documenter = function () {
    function Documenter(formatterFactory) {
        var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            _ref$fieldInfo = _ref.fieldInfo,
            fieldInfo = _ref$fieldInfo === undefined ? null : _ref$fieldInfo;

        (0, _classCallCheck3.default)(this, Documenter);

        this.formatterFactory = formatterFactory;
        this.fieldInfo = fieldInfo;
    }

    (0, _createClass3.default)(Documenter, [{
        key: 'writeResponse',
        value: function writeResponse(response, formatter) {
            formatter.writeHeader('Response: ' + response.status, 3);
            var headers = {};
            var ignoreHeaders = ['content-type'];

            if (!_.isEmpty(response.headers)) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = (0, _getIterator3.default)((0, _keys2.default)(response.headers)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var key = _step.value;

                        if (!ignoreHeaders.includes(key.toLocaleLowerCase())) {
                            headers[key] = response.headers[key];
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

                if (!_.isEmpty(headers)) {
                    formatter.writeHeader('Headers', 4);
                    formatter.writeList((0, _keys2.default)(headers).map(function (key) {
                        return key + ': ' + headers[key];
                    }));
                }
            }

            if (!_.isEmpty(response.body)) {
                formatter.writeHeader('Body:', 4);
                formatter.writeParagraph('Content-Type: ' + response.contentType);
                var mim = '';

                if (response.contentType && response.contentType.includes('json')) {
                    mim = 'json';
                }
                formatter.writeParagraph('```' + mim + '\n' + response.body + '\n```');
            }
        }
    }, {
        key: 'writeCall',
        value: function writeCall(baseCall, call, formatter) {
            formatter.writeHeader(call.verb + ' ' + call.url, 3);

            if (call.description) {
                formatter.writeParagraph(call.description);
            }

            if (!_.isEmpty(call.urlParams) && (baseCall === null || !_.isEqual(baseCall.urlParams, call.urlParams))) {
                formatter.writeHeader('Url Parameters', 3);
                formatter.writeTable(_.toPairs(call.urlParams), ['Name', 'Example']);
            }

            if (!_.isEmpty(call.query) && (baseCall === null || !_.isEqual(baseCall.query, call.query))) {
                formatter.writeHeader('Query Strings', 3);
                formatter.writeTable(_.toPairs(call.query), ['Name', 'Example']);
            }

            if (!_.isEmpty(call.json) && (baseCall === null || !_.isEqual(baseCall.json, call.json))) {
                formatter.writeHeader('Json', 3);
                var rows = [];

                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = (0, _getIterator3.default)(_.toPairs(call.json)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var _step2$value = (0, _slicedToArray3.default)(_step2.value, 2),
                            key = _step2$value[0],
                            value = _step2$value[1];

                        var info = {};
                        var required = '?';
                        var type = '?';

                        if (typeof this.fieldInfo === 'function') {
                            info = this.fieldInfo(call.url, call.verb, key);
                            if (info['required'] !== undefined) {
                                required = info['required'] ? 'Yes' : 'No';
                            }
                            type = info['type'];
                        }

                        rows.push([key, required, type, value]);
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

                formatter.writeTable(rows, ['Name', 'Required', 'Type', 'Example']);
            }

            if (!_.isEmpty(call.headers) && (baseCall === null || !_.isEqual(baseCall.headers, call.headers))) {
                formatter.writeHeader('Request Headers', 3);
                formatter.writeList((0, _keys2.default)(call.headers).map(function (key) {
                    return key + ': ' + call.headers[key];
                }));
            }

            if (call.response) {
                this.writeResponse(call.response, formatter);
            }
        }
    }, {
        key: 'document',
        value: function document(story, outFile) {
            var baseCall = story.baseCall;
            var formatter = new this.formatterFactory(outFile);
            formatter.writeHeader(baseCall.title, 2);
            this.writeCall(null, baseCall, formatter);

            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = (0, _getIterator3.default)(story.calls), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var call = _step3.value;

                    formatter.writeParagraph('---');
                    formatter.writeHeader('WHEN: ' + call.title, 2);
                    this.writeCall(baseCall, call, formatter);
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
        }
    }]);
    return Documenter;
}();

exports.default = Documenter;