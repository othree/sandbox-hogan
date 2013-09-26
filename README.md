Sandbox-Hogan
=============

Hogan uses `new Function`, which is eval code. And for security concern. Some environment didn't allow
eval code, ex: Chrome's extension environment. But it allows eval inside sandbox.
And you can use postMessage to communicate between your normal page and sandbox page.

This project defines a simple interface for compile and render mustache template via Hogan engine through postMessage.
You can use this not only in iframe. Every window you can postMessage to it. Can use this.
    
USAGE
-----

postMessage data should use an object and contains a property called 'hogan':

    sandboxHogan.postMessage({
        hogan: {
      
        }
    }, '*');

The object 'hogan' can contains two properties: 'compile', 'render':

    sandboxHogan.postMessage({
        hogan: {
            compile: 'template string'     
        }
    }, '*');

    sandboxHogan.postMessage({
        hogan: {
            render: {
                this_is: 'data object'
            }
        }
    }, '*');

And when work complete. The sandboxHogan will send message and result back:

    var handler = {
        compileDone: function () {
            console.log('template ready');
        },
        renderDone: function (result) {
            document.getElementById('share_txt').innerHTML = result;
        }
    };

    window.addEventListener('message', function (event) {
        var data = event.data.hogan;
        if (!data) { return; }
        var hand = handler[data.event];
        if (typeof hand === 'function') { hand(data.value); }
    }, false);

Result will wrapped in 'hogan' object, so you can detect it to see is it hogan's reply.
If you have multiple templates to use, you can give them name:

    sandboxHogan.postMessage({
        hogan: {
            compile: ['template name', 'template string']
        }
    }, '*');

    sandboxHogan.postMessage({
        hogan: {
            render: ['template name', {
                this_is: 'data object'
            }]
        }
    }, '*');

And when result returns, you can access the template name:

    var handler = {
        renderDone: function (result) {
            if (result.name === 'template name') {
                document.getElementById('share_txt').innerHTML = result;
            }
        }
    };

Hogan compile, render might fail. If fail, the response event will go to 'Fail' one. Ex: compileFail, renderFail.

Status
------

[![Build Status](https://travis-ci.org/othree/sandbox-hogan.png?branch=master)](https://travis-ci.org/othree/sandbox-hogan)

License
-------

Copyright (C) 2013 Wei-Ko Kao

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
