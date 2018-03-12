# really-basic-chat-ui

**A minimal command line chat UI.** Used by [local-network-chat](https://github.com/derhuerst/local-network-chat#local-network-chat) and [p2p-local-network-chat](https://github.com/derhuerst/p2p-local-network-chat#p2p-local-network-chat).

[screenshot](screenshot.png)

[![npm version](https://img.shields.io/npm/v/really-basic-chat-ui.svg)](https://www.npmjs.com/package/really-basic-chat-ui)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/really-basic-chat-ui.svg)
[![chat on gitter](https://badges.gitter.im/derhuerst.svg)](https://gitter.im/derhuerst)
[![support me on Patreon](https://img.shields.io/badge/support%20me-on%20patreon-fa7664.svg)](https://patreon.com/derhuerst)


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
	{from: 'someone else', when: 1507404635951, content: 'boop', sending: true}
], null)
```


## API

```js
createUI(sendFn) // -> render
render(isOpen, messages, err)
```


## Contributing

If you have a question or have difficulties using `really-basic-chat-ui`, please double-check your code and setup first. If you think you have found a bug or want to propose a feature, refer to [the issues page](https://github.com/derhuerst/really-basic-chat-ui/issues).
