Sandbox-Hogan
=============

Hogan uses `new Function`, which is eval code. And for security concern. Some environment didn't allow
eval code, ex: Chrome's extension environment. But it allows eval inside sandbox.
And you can use postMessage to communicate between your normal page and sandbox page.

This project defines an simple interface for compile and render mustache template via Hogan engine through postMessage.
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

License
-------

MIT
