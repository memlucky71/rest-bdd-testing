'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _formatter = require('./formatter');

var _formatter2 = _interopRequireDefault(_formatter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MarkdownFormatter = function (_Formatter) {
    (0, _inherits3.default)(MarkdownFormatter, _Formatter);

    function MarkdownFormatter(outfile) {
        (0, _classCallCheck3.default)(this, MarkdownFormatter);
        return (0, _possibleConstructorReturn3.default)(this, (MarkdownFormatter.__proto__ || (0, _getPrototypeOf2.default)(MarkdownFormatter)).call(this, outfile));
    }

    (0, _createClass3.default)(MarkdownFormatter, [{
        key: '_writeLine',
        value: function _writeLine() {
            var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

            this.write(text + '\n');
        }
    }, {
        key: 'writeHeader',
        value: function writeHeader(text) {
            var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

            this._writeLine('#'.repeat(level) + ' ' + text + '\n');
        }
    }, {
        key: 'writeParagraph',
        value: function writeParagraph(text) {
            this._writeLine(text);
            this._writeLine();
        }
    }, {
        key: '_writeTableRow',
        value: function _writeTableRow() {
            var row = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            this._writeLine(row.join(' | '));
        }
    }, {
        key: 'writeTable',
        value: function writeTable(array2d) {
            var headers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

            var columns = array2d[0].length;

            if (headers.length === 0) {
                headers = [].concat((0, _toConsumableArray3.default)(new Array(columns))).map(function (_, i) {
                    return 'Column' + (i + 1);
                });
            }

            this._writeTableRow(headers);
            this._writeLine('' + [].concat((0, _toConsumableArray3.default)(new Array(columns))).map(function (_, i) {
                return '---';
            }).join('|'));

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = (0, _getIterator3.default)(array2d), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var row = _step.value;

                    this._writeTableRow(row);
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

            this._writeLine();
        }
    }, {
        key: 'writeList',
        value: function writeList(list) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = (0, _getIterator3.default)(list), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var element = _step2.value;

                    this._writeLine('* ' + element);
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

            this._writeLine();
        }
    }]);
    return MarkdownFormatter;
}(_formatter2.default); /**
                         * Created by mohammad on 3/18/2019 AD.
                         */

exports.default = MarkdownFormatter;