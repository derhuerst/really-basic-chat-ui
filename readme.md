# really-basic-chat-ui

**A minimal command line chat UI.** Used by [really-basic-chat-ui](https://github.com/derhuerst/really-basic-chat-ui#really-basic-chat-ui) and [p2p-really-basic-chat-ui](https://github.com/derhuerst/p2p-really-basic-chat-ui#p2p-really-basic-chat-ui).

[![asciicast](https://asciinema.org/a/131994.png)](https://asciinema.org/a/131994?t=4)

[![npm version](https://img.shields.io/npm/v/really-basic-chat-ui.svg)](https://www.npmjs.com/package/really-basic-chat-ui)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/really-basic-chat-ui.svg)
[![chat on gitter](https://badges.gitter.im/derhuerst.svg)](https://gitter.im/derhuerst)


## Installing

```shell
npm install really-basic-chat-ui
```


## Usage

```js
const createUI = require('really-basic-chat-ui')

const send = (msg) => {
	// …
}

const render = createUI(send)
render(true, [
	{from: 'someone', when: 1507404635951, content: 'beep'},
	{from: 'someone else', when: 1507404635951, content: 'boop'}
], null, 2)
```


## API

```js
createUI(sendFn) // -> render
render(isOpen, messages, err, nrOfPeers)
```


## Contributing

If you have a question or have difficulties using `really-basic-chat-ui`, please double-check your code and setup first. If you think you have found a bug or want to propose a feature, refer to [the issues page](https://github.com/derhuerst/really-basic-chat-ui/issues).
