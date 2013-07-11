Sandbox-Hogan
=============

Hogan uses eval code. And in chrome extension environment. It's not allow any eval out of sandbox.
So I use sandbox iframe and postMessage to use hogan in such an environment.

This project defines an interface for compile and render mustache template via Hogan engine.
You can use this not only in iframe, only need is able to postMessage to the html window.
