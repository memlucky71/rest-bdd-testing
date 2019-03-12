/**
 * Created by mohammad on 3/9/2019 AD.
 */

const fs = require('fs');
const path = require('path');


function createDirectory(targetPath, { isRelativeToScript = false } = {}) {
    const sep = path.sep;
    const initDir = path.isAbsolute(targetPath) ? sep : '';
    const baseDir = isRelativeToScript ? __dirname : '.';

    return targetPath.split(sep).reduce((parentDir, childDir) => {
            const curDir = path.resolve(baseDir, parentDir, childDir);
    try {
        fs.mkdirSync(curDir);
    } catch (err) {
        if (err.code === 'EEXIST') { // curDir already exists!
            return curDir;
        }

        // To avoid `EISDIR` error on Mac and `EACCES`-->`ENOENT` and `EPERM` on Windows.
        if (err.code === 'ENOENT') { // Throw the original parentDir error on curDir `ENOENT` failure.
            throw new Error(`EACCES: permission denied, mkdir '${parentDir}'`);
        }

        const caughtErr = ['EACCES', 'EPERM', 'EISDIR'].indexOf(err.code) > -1;
        if (!caughtErr || caughtErr && curDir === path.resolve(targetPath)) {
            throw err; // Throw if it's just the last created dir.
        }
    }

    return curDir;
}, initDir);
}

function removeDirectory (targetPath) {
    if (fs.existsSync(targetPath)) {
        fs.readdirSync(targetPath).forEach(function(file, index){
            let curPath = targetPath + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                removeDirectory(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(targetPath);
    }
}


export {createDirectory, removeDirectory}