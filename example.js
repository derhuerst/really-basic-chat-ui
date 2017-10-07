'use strict'

const createUI = require('.')

const send = () => {}
const render = createUI(send)

render(true, [
	{from: 'turtle', when: 1507404635951, content: 'beep'},
	{from: 'kitten', when: 1507404635951, content: 'boop', sending: true}
], null, 2)
