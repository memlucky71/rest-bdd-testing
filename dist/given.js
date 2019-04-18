'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _story = require('./story');

var _story2 = _interopRequireDefault(_story);

var _base_call = require('./call/base_call');

var _base_call2 = _interopRequireDefault(_base_call);

var _altered_call = require('./call/altered_call');

var _altered_call2 = _interopRequireDefault(_altered_call);

var _manipulation = require('./manipulation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by mohammad on 4/8/2019 AD.
 */

var fs = require('fs');

var Given = function (_Story) {
    (0, _inherits3.default)(Given, _Story);

    function Given(application, title, description) {
        var otherParams = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
        (0, _classCallCheck3.default)(this, Given);
        var _otherParams$autodump = otherParams.autodump,
            autodump = _otherParams$autodump === undefined ? null : _otherParams$autodump,
            _otherParams$autodoc = otherParams.autodoc,
            autodoc = _otherParams$autodoc === undefined ? null : _otherParams$autodoc,
            _otherParams$fieldInf = otherParams.fieldInfo,
            fieldInfo = _otherParams$fieldInf === undefined ? null : _otherParams$fieldInf,
            baseCallParams = (0, _objectWithoutProperties3.default)(otherParams, ['autodump', 'autodoc', 'fieldInfo']);

        var baseCall = new _base_call2.default(title, description, baseCallParams);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Given.__proto__ || (0, _getPrototypeOf2.default)(Given)).call(this, baseCall));

        _this.autodump = autodump;
        _this.autodoc = autodoc;
        _this.fieldInfo = fieldInfo;
        _this.application = application;
        return _this;
    }

    (0, _createClass3.default)(Given, [{
        key: 'requestBaseCall',
        value: function requestBaseCall() {
            return this.baseCall.invoke(this.application);
        }
    }, {
        key: 'when',
        value: function when(title, description) {
            var callParams = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = (0, _getIterator3.default)((0, _keys2.default)(callParams)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var key = _step.value;

                    if (callParams[key] instanceof _manipulation.Manipulator) {
                        var clonedParams = (0, _extends3.default)({}, this.baseCall[key]);
                        callParams[key].apply(clonedParams);
                        callParams[key] = clonedParams;
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

            var newCall = new _altered_call2.default(this.baseCall, title, description, callParams);
            this.calls.push(newCall);
            return newCall.invoke(this.application);
        }
    }, {
        key: 'end',
        value: function end() {
            if (this.autodump) {
                var fd = fs.openSync(this.dumpedFileName, 'w+');
                this.dump(fd);
                fs.closeSync(fd);
            }

            if (this.autodoc) {
                var _fd = fs.openSync(this.docFileName, 'w+');
                this.document(_fd, { fieldInfo: this.fieldInfo });
                fs.closeSync(_fd);
            }
        }
    }, {
        key: 'dumpedFileName',
        get: function get() {
            if (this.autodump === null) return null;
            if (typeof this.autodump === 'string') return this.autodump;
            if (typeof this.autodump === 'function') return this.autodump(this);
        }
    }, {
        key: 'docFileName',
        get: function get() {
            if (this.autodoc === null) return null;
            if (typeof this.autodoc === 'string') return this.autodoc;
            if (typeof this.autodoc === 'function') return this.autodoc(this);
        }
    }]);
    return Given;
}(_story2.default);

exports.default = Given;