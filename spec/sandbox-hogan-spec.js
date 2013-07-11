/*jslint browser: true, vars: true, plusplus: true*/
/*global describe: false, it: false, expect: false, runs: false, waits: false, waitsFor: false, console: false*/
(function () {
    "use strict";

    var inited = false;

    window.addEventListener('load', function () {
        var iframe = document.createElement('iframe');
        iframe.setAttribute('id', 'sandbox-hogan');
        iframe.setAttribute('src', '../src/hogan.html');
        document.querySelectorAll('body')[0].appendChild(iframe);
        console.log('inited');
        inited = true;
    }, false);

    var isInited = function () { return inited; };

    describe("Init", function () {
        it("jasmine initg", function () {
            waitsFor(isInited);
            runs(function () {
                var hogan = document.getElementById('sandbox-hogan');
                expect(hogan.nodeName.toLowerCase()).toBe('iframe');
            });
        });

    });


}(this));
