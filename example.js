'use strict'

const createUI = require('.')

const send = () => {}
const render = createUI(send)

render(true, [
	{from: 'someone', when: 1507404635951, content: 'beep'},
	{from: 'someone else', when: 1507404635951, content: 'boop'}
], null, 2)
