/*jslint vars: true*/
/**
 * @file An example interface implementation.
 */


(function (root) {
    "use strict";

    var Hogan = null;

    var callbacks = {};

    var handler = {
        compileDone: function (data) {
            if (callbacks[data.id]) {
                callbacks[data.id](data);
                delete callbacks[data.id];
            }
        },
        compileFail: function (data) {
            if (callbacks[data.id]) {
                delete callbacks[data.id];
            }
            throw new Error('Hogan compile failed in sandbox');
        },
        renderDone: function (data) {
            if (callbacks[data.id]) {
                callbacks[data.id](data);
                delete callbacks[data.id];
            }
        },
        renderFail: function (data) {
            if (callbacks[data.id]) {
                delete callbacks[data.id];
            }
            throw new Error('Hogan render failed in sandbox');
        },
    };
    var onmessage = function (event) {
        var data = event.data.hogan;
        if (!data) { return; }
        var hand = handler[data.event];
        if (typeof hand === 'function') { hand(data.value); }
    };

    var uid = function () {
        return ++uid.value;
    };
    uid.value = 0;

    var name = function () {
        return 'SHogan_' + uid();
    };

    root.SHogan = {
        set: function (input) {
            if (Hogan) { Hogan.removeEventListener('message', onmessage); }
            Hogan = input;
            Hogan.addEventListener('message', onmessage, false);
        },
        compile: function (tpl, callback) {
            if (!Hogan) { throw new Error('Sandbox Hogan not set'); }
            var n = name();
            var id = uid();
            if (typeof callback === 'function') {
                callbacks[id] = callback;
            }
            Hogan.postMessage({hogan: {compile: [tpl, n, id]}});
            return n;
        },
        render: function (n, data, callback) {
            if (!Hogan) { throw new Error('Sandbox Hogan not set'); }
            var id = uid();
            if (typeof callback === 'function') {
                callbacks[id] = callback;
            }
            Hogan.postMessage({hogan: {render: [data, n, id]}});
            return;
        }
    };

}(this));
