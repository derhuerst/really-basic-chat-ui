'use strict'

const createUI = require('.')

const msgs = [
	{from: 'a-long-user-name', when: 1520809869146, content: 'beep\nboop'},
	{from: 'user123', when: Date.now() - 10000, content: 'foo 😀 bar', sending: true},
	{from: 'someone', when: Date.now() - 100, content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus enim ad, illo sequi? Nemo autem sequi temporibus voluptatum odio voluptas architecto molestiae vel consectetur repudiandae suscipit nulla perferendis quo, minus minima sint totam facere commodi delectus accusamus quos nesciunt velit veritatis ut? Assumenda molestiae, tenetur qui velit similique facilis consequuntur!'}
]

const send = (msg) => {
	msgs.push({
		from: 'you',
		when: Date.now(),
		content: msg
	})
	setImmediate(rerender)
}

const render = createUI(send)
const rerender = () => render(true, msgs, null)
rerender()
