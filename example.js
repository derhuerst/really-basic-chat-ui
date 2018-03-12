'use strict'

const createUI = require('.')

const send = () => {}
const render = createUI(send)

const msgs = [
	{from: 'a-long-user', when: 1520809869146, content: 'beep\nboop'},
	{from: 'user123', when: Date.now() - 100, content: 'foo 😀 bar', sending: true},
	{from: 'someone', when: Date.now() - 10000, content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore dignissimos totam amet possimus atque provident earum rem libero nesciunt similique.'}
]

render(true, msgs, null, 2)
