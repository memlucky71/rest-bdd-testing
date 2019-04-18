'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _base_call = require('./call/base_call');

var _base_call2 = _interopRequireDefault(_base_call);

var _altered_call = require('./call/altered_call');

var _altered_call2 = _interopRequireDefault(_altered_call);

var _documenter = require('./documentary/documenter');

var _documenter2 = _interopRequireDefault(_documenter);

var _markdown = require('./documentary/formatter/markdown');

var _markdown2 = _interopRequireDefault(_markdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by mohammad on 3/18/2019 AD.
 */

var fs = require('fs');

var Story = function () {
    function Story(baseCall) {
        var calls = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        (0, _classCallCheck3.default)(this, Story);

        this.baseCall = baseCall;
        this.calls = calls;
    }

    (0, _createClass3.default)(Story, [{
        key: 'toJson',
        value: function toJson() {
            var result = { baseCall: this.baseCall.toJson(), calls: [] };
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = (0, _getIterator3.default)(this.calls), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var call = _step.value;

                    result.calls.push(call.toJson());
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

            return result;
        }
    }, {
        key: 'dump',
        value: function dump(outfile) {
            try {
                fs.writeSync(outfile, (0, _stringify2.default)(this.toJson(), null, 4));
            } catch (err) {
                /* Handle the error */
                throw err;
            }
        }
    }, {
        key: 'document',
        value: function document(outfile) {
            var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                _ref$formatterFactory = _ref.formatterFactory,
                formatterFactory = _ref$formatterFactory === undefined ? _markdown2.default : _ref$formatterFactory,
                fieldInfo = _ref.fieldInfo;

            var documenter = new _documenter2.default(formatterFactory, { fieldInfo: fieldInfo });
            documenter.document(this, outfile);
        }
    }, {
        key: 'title',
        get: function get() {
            return this.baseCall.title;
        }
    }], [{
        key: 'fromJson',
        value: function fromJson(data) {
            var _data$baseCall = data.baseCall,
                title = _data$baseCall.title,
                description = _data$baseCall.description,
                rest = (0, _objectWithoutProperties3.default)(_data$baseCall, ['title', 'description']);

            var baseCall = new _base_call2.default(title, description, rest);

            var calls = [];
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = (0, _getIterator3.default)(data.calls), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var call = _step2.value;

                    var _title = call.title,
                        _description = call.description,
                        _rest = (0, _objectWithoutProperties3.default)(call, ['title', 'description']);

                    calls.push(new _altered_call2.default(baseCall, _title, _description, _rest));
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

            return new Story(baseCall, calls);
        }
    }]);
    return Story;
}();

exports.default = Story;