'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by mohammad on 3/18/2019 AD.
 */
var fs = require('fs');

var Formatter = function () {
    function Formatter(outfile) {
        (0, _classCallCheck3.default)(this, Formatter);

        this.file = outfile;
    }

    (0, _createClass3.default)(Formatter, [{
        key: 'write',
        value: function write(text) {
            try {
                fs.writeSync(this.file, text);
            } catch (err) {
                /* Handle the error */
                throw err;
            }
        }
    }, {
        key: 'writeHeader',
        value: function writeHeader(text) {
            var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

            throw new Error('This method should be implemented in the child class');
        }
    }, {
        key: 'writeParagraph',
        value: function writeParagraph(text) {
            throw new Error('You have to implement the method doSomething!');
        }
    }, {
        key: 'writeTable',
        value: function writeTable(array2d) {
            var headers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            throw new Error('You have to implement the method doSomething!');
        }
    }, {
        key: 'writeList',
        value: function writeList(items) {
            throw new Error('You have to implement the method doSomething!');
        }
    }]);
    return Formatter;
}();

exports.default = Formatter;