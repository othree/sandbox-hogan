/*jslint vars: true, plusplus: true, browser: true, forin: true, browser: true */
/*global console: false, Hogan: false, console: false */

(function (root) {
    "use strict";

    var isArray = function (arr) {
        return (Object.prototype.toString.call(arr) === '[object Array]') ? true : false;
    };

    var template = {};

    var api = {
        compile: function (name, text, id) {
            if (!id) {
                id = text;
                text = name;
                name = null;
            }
            if (!name) { name = '_default'; }
            template[name] = Hogan.compile(text);
            return { name: name };
        },
        render: function (name, data, id) {
            if (!id) {
                id = data;
                data = name;
                name = null;
            }
            if (!name) { name = '_default'; }
            if (!template[name]) { return ''; }
            var result = {
                name: name,
                result: template[name].render(data)
            };
            if (id) {
                result.id = id;
            }
            return result;
        }
    };

    root.addEventListener('message', function (event) {
        var data = event.data.hogan,
            result = 'Done',
            method,
            value,
            arg,
            id;

        if (!data) { return; }

        for (method in api) {
            arg = data[method];
            if (arg) {
                if (!isArray(arg)) { arg = [arg]; }

                try {
                    value = api[method].apply(null, arg);
                    result = 'Done';
                } catch (error) {
                    result = 'Fail';
                    id = arg[2] || arg[1] || null;
                    value = {
                        error: error
                    };
                    if (id) {
                        value.id = id;
                    }
                }

                event.source.postMessage({
                    hogan: {
                        event: method + result,
                        value: value
                    }
                }, '*');
            }
        }
    }, false);

}(this));
