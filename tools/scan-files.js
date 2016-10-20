/**
 * author           xj
 * @date            2016-02-28 15:06:31
 * @email           littlebearbond@qq.com
 * @description
 */
"use strict";
let path = require('path');
let fs = require('fs');
//不扫描以点开头的文件夹
let regFilterDir = /^\./;
/**
 * 扫描文件夹下面的所有文件，包括自己目录里面的文件
 * @param  {String}   dir       文件夹的路径
 * @param  {Function}   filter  过滤器，默认为扫描js文件
 * @return {Array}              扫描得到的所有文件
 */
let readDir = (dir, filter) => {
    let readFiles = [];
    let list = fs.readdirSync(dir);
    let index = 0;

    list = list.map(function(val) {
        return path.join(dir, val);
    });

    (function next() {
        let fullPath = list[index++];
        if (!fullPath) {
            return readFiles;
        }

        let stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory() && !regFilterDir.test(fullPath)) {
            readFiles = readFiles.concat(readDir(fullPath, filter));
            next();
            return;
        }
        let fileInfo = {
            fullPath: fullPath,
            fileName: path.basename(fullPath),
            size: stat.size
        };
        if (typeof filter === 'function') {
            filter(fullPath) === true && readFiles.push(fileInfo);
        } else {
            path.extname(fullPath) === '.js' && readFiles.push(fileInfo);
        }
        next();
    }());
    return readFiles;
}
module.exports = readDir;
