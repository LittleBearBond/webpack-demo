'use strict';
var utils = {
    getUrlData: function (url) {
        var match = (url || location.href.replace(/#.*/g, '')).match(/\?(.*)/);
        var objData = {};
        match = match && match[1];
        if (!match) {
            return objData;
        }
        match = match.split('&');
        var strKey, strVal;
        match.forEach(function (val) {
            val = val.split('=');
            strKey = decodeURIComponent(val[0]);
            strVal = val[1] === 'null' || val[1] == null ? '' : decodeURIComponent(val[1]);
            strKey && (objData[strKey] = strVal);
        });
        return objData;
    },
    getHashData: function () {
        return utils.getUrlData(location.hash);
    },
    removeScriptTags: function (str) {
        return str && str.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    },
    getElOffset: function (elem) {
        if (!elem) {
            console.log('elem is null');
            return {};
        }
        var docElem, win, rect, doc;
        var rect = elem.getBoundingClientRect();

        // Make sure element is not hidden (display: none) or disconnected
        if (rect.width || rect.height || elem.getClientRects().length) {
            doc = elem.ownerDocument;
            win = window;
            docElem = doc.documentElement;

            return {
                top: rect.top + win.pageYOffset - docElem.clientTop,
                left: rect.left + win.pageXOffset - docElem.clientLeft
            };
        }
        console.log('elem is hidde');
        return {};
    }
}
module.exports = utils;