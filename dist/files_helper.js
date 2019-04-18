'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by mohammad on 3/9/2019 AD.
 */

var fs = require('fs');
var path = require('path');

function createDirectory(targetPath) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$isRelativeToScri = _ref.isRelativeToScript,
        isRelativeToScript = _ref$isRelativeToScri === undefined ? false : _ref$isRelativeToScri;

    var sep = path.sep;
    var initDir = path.isAbsolute(targetPath) ? sep : '';
    var baseDir = isRelativeToScript ? __dirname : '.';

    return targetPath.split(sep).reduce(function (parentDir, childDir) {
        var curDir = path.resolve(baseDir, parentDir, childDir);
        try {
            fs.mkdirSync(curDir);
        } catch (err) {
            if (err.code === 'EEXIST') {
                // curDir already exists!
                return curDir;
            }

            // To avoid `EISDIR` error on Mac and `EACCES`-->`ENOENT` and `EPERM` on Windows.
            if (err.code === 'ENOENT') {
                // Throw the original parentDir error on curDir `ENOENT` failure.
                throw new Error('EACCES: permission denied, mkdir \'' + parentDir + '\'');
            }

            var caughtErr = ['EACCES', 'EPERM', 'EISDIR'].indexOf(err.code) > -1;
            if (!caughtErr || caughtErr && curDir === path.resolve(targetPath)) {
                throw err; // Throw if it's just the last created dir.
            }
        }

        return curDir;
    }, initDir);
}

function removeDirectory(targetPath) {
    if (fs.existsSync(targetPath)) {
        fs.readdirSync(targetPath).forEach(function (file, index) {
            var curPath = targetPath + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) {
                // recurse
                removeDirectory(curPath);
            } else {
                // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(targetPath);
    }
}

exports.createDirectory = createDirectory;
exports.removeDirectory = removeDirectory;