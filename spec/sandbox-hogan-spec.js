/*jslint browser: true, vars: true, plusplus: true*/
/*global describe: false, it: false, expect: false, runs: false, waits: false, waitsFor: false, console: false*/
(function () {
    "use strict";

    var tpl = 'YES YES {{NONO}}';

    var inited = false;

    window.addEventListener('load', function () {
        var iframe = document.createElement('iframe');
        iframe.setAttribute('id', 'sandbox-hogan');
        iframe.setAttribute('src', 'src/hogan.html');
        document.querySelectorAll('body')[0].appendChild(iframe);
        inited = true;
    }, false);

    var isInited = function () { return inited; };

    describe("Sandbox Hogan", function () {
        it("Frame ready", function () {
            waitsFor(isInited);
            runs(function () {
                var hogan = document.getElementById('sandbox-hogan');
                expect(hogan.nodeName.toLowerCase()).toBe('iframe');
            });
        });

        it("Compile work", function () {
            var done = false;
            var handler = {
                compileDone: function () {
                    done = true;
                }
            };
            var onmessage = function (event) {
                var data = event.data.hogan;
                if (!data) { return; }
                var hand = handler[data.event];
                if (typeof hand === 'function') { hand(data.value); }
            };

            waitsFor(isInited);
            runs(function () {
                var hogan = document.getElementById('sandbox-hogan').contentWindow;
                var data = {
                    hogan: {
                        compile: tpl
                    }
                };
                window.addEventListener('message', onmessage, false);
                hogan.postMessage(data, '*');
            });
            waits(100);
            runs(function () {
                window.removeEventListener('message', onmessage);
                expect(done).toBe(true);
            });
        });
        it("Render work", function () {
            var done = false;
            var handler = {
                renderDone: function (text) {
                    if (text === 'YES YES NONO') {
                        done = true;
                    }
                }
            };
            var onmessage = function (event) {
                var data = event.data.hogan;
                if (!data) { return; }
                var hand = handler[data.event];
                if (typeof hand === 'function') { hand(data.value); }
            };

            waitsFor(isInited);
            runs(function () {
                var hogan = document.getElementById('sandbox-hogan').contentWindow;
                var data = {
                    hogan: {
                        compile: tpl
                    }
                };
                window.addEventListener('message', onmessage, false);
                hogan.postMessage(data, '*');
                data = {
                    hogan: {
                        render: {NONO: 'NONO'}
                    }
                };
                hogan.postMessage(data, '*');
            });
            waits(100);
            runs(function () {
                window.removeEventListener('message', onmessage);
                expect(done).toBe(true);
            });
        });
    });


}(this));
