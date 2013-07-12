/*jslint vars: true, browser: true */
/*global chrome: false, Q: false, QX: false, flickr: false*/
/**
 * @file An example interface implementation.
 */


(function () {
    "use strict";

    var handler = {
        compileDone: function () {
            console.log('template ready');
        },
        renderDone: function (data) {
            document.getElementById('share_txt').innerHTML = data.result;
        }
    };

    window.addEventListener('message', function (event) {
        var data = event.data.hogan;
        if (!data) { return; }
        var hand = handler[data.event];
        if (typeof hand === 'function') { hand(data.value); }
    }, false);

}());
