/*jslint vars: true, plusplus: true, browser: true */
/*global window: false, Hogan: false */

(function (root) {
    "use strict";

    var isArray = function (arr) {
        return (Object.prototype.toString.call(arr) === '[object Array]') ? true : false;
    };

    var template = {};

    var api = {
        compile: function (name, text) {
            if (!text) {
                text = name;
                name = null;
            }
            if (!name) { name = '_default'; }
            template[name] = Hogan.compile(text);
        },
        render: function (name, data) {
            if (!data) {
                data = name;
                name = null;
            }
            if (!name) { name = '_default'; }
            if (!template[name]) { return ''; }
            return template[name].render(data);
        }
    };

    root.addEventListener('message', function (event) {
        var args = event.data,
            method,
            arg;

        for (method in api) {
            arg = args[method];
            if (arg !== null) {
                if (!isArray(arg)) { arg = [arg]; }

                event.source.postMessage({
                    hogan: {
                        event: method + 'Done',
                        value: api[method].apply(null, args[method])
                    }
                }, event.origin);
            }
        }
    }, false);

}(this));