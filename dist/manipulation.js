'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Remove = exports.Append = exports.Update = exports.Manipulator = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by mohammad on 4/9/2019 AD.
 */

var Manipulator = function () {
    function Manipulator(objectDiff, arrayDiff) {
        (0, _classCallCheck3.default)(this, Manipulator);

        this.objectDiff = objectDiff;
        this.arrayDiff = arrayDiff;
    }

    (0, _createClass3.default)(Manipulator, [{
        key: 'apply',
        value: function apply() {
            throw new Error('This method should be implemented in the child class');
        }
    }]);
    return Manipulator;
}();

var Update = function (_Manipulator) {
    (0, _inherits3.default)(Update, _Manipulator);

    function Update(objectDiff) {
        (0, _classCallCheck3.default)(this, Update);
        return (0, _possibleConstructorReturn3.default)(this, (Update.__proto__ || (0, _getPrototypeOf2.default)(Update)).call(this, objectDiff, null));
    }

    (0, _createClass3.default)(Update, [{
        key: 'apply',
        value: function apply(container) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = (0, _getIterator3.default)((0, _keys2.default)(this.objectDiff)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var key = _step.value;

                    if (!container.hasOwnProperty(key)) {
                        throw new Error('The key ' + key + ' is not in target container');
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

            (0, _assign2.default)(container, this.objectDiff);
        }
    }]);
    return Update;
}(Manipulator);

var Append = function (_Manipulator2) {
    (0, _inherits3.default)(Append, _Manipulator2);

    function Append(objectDiff) {
        (0, _classCallCheck3.default)(this, Append);
        return (0, _possibleConstructorReturn3.default)(this, (Append.__proto__ || (0, _getPrototypeOf2.default)(Append)).call(this, objectDiff, null));
    }

    (0, _createClass3.default)(Append, [{
        key: 'apply',
        value: function apply(container) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = (0, _getIterator3.default)((0, _keys2.default)(this.objectDiff)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var key = _step2.value;

                    if (container.hasOwnProperty(key)) {
                        throw new Error('The key ' + key + ' is already exists in target container');
                    }
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

            (0, _assign2.default)(container, this.objectDiff);
        }
    }]);
    return Append;
}(Manipulator);

var Remove = function (_Manipulator3) {
    (0, _inherits3.default)(Remove, _Manipulator3);

    function Remove(arrayDiff) {
        (0, _classCallCheck3.default)(this, Remove);
        return (0, _possibleConstructorReturn3.default)(this, (Remove.__proto__ || (0, _getPrototypeOf2.default)(Remove)).call(this, null, arrayDiff));
    }

    (0, _createClass3.default)(Remove, [{
        key: 'apply',
        value: function apply(container) {
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = (0, _getIterator3.default)(this.arrayDiff), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var element = _step3.value;

                    if (!container.hasOwnProperty(element)) {
                        throw new Error('Target container has no key ' + element);
                    }

                    delete container[element];
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
    return Remove;
}(Manipulator);

exports.Manipulator = Manipulator;
exports.Update = Update;
exports.Append = Append;
exports.Remove = Remove;