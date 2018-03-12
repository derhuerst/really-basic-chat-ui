'use strict'

const md5 = require('md5-hex')
const stripAnsi = require('strip-ansi')
const chalk = require('chalk')
const termSize = require('window-size').get
const ms = require('ms')
const wrap = require('prompt-skeleton')
const cli = require('cli-styles')
const stringWidth = require('string-width')
const runes = require('runes')

const colorHashes = Object.create(null)
const colorHash = (user) => {
	if (user in colorHashes) return colorHashes[user]
	const hash = '#' + md5(user).slice(0, 6)
	colorHashes[user] = hash
	return hash
}

const _cleanStr = str => stripAnsi(str).replace(/(\n|\r|\r\n)/g, ' ↵ ')

const cleanedStrs = Object.create(null)
const cleanStr = (str) => {
	if (str in cleanedStrs) return cleanedStrs[str]
	const cleanedStr = _cleanStr(str)
	cleanedStrs[str] = cleanedStr
	return cleanedStr
}

const UI = {
	abort: function () {
		clearInterval(this.renderInterval)
		this.close()
	},
	submit: function () {
		if (!this.input) return
		this.send(this.input)
		this.input = ''
		this.render()
		clearInterval(this.renderInterval)
	},

	_: function (key) {
		this.input += _cleanStr(key)
		this.render()
	},
	delete: function () {
		this.input = this.input.slice(0, -1)
		this.render()
	},

	clear: '',
	render: function (first) {
		const {width, height} = termSize()

		let out = ''
		if (this.messages.length > 0) {
			const messages = this.messages.slice(-height + 2)
			const now = Date.now()

			for (let msg of messages) {
				if (msg.sending) out += '⌛ '
				out += [
					chalk.gray(ms(now - msg.when)),
					chalk.hex(colorHash(msg.from))(msg.from),
					msg.content
				].join(' ') + '\n'
			}
		} else out += chalk.gray('no messages') + '\n'

		const peers = this.nrOfPeers + ' peers'
		const err = this.error && this.error.message
		if (err) out += err.slice(0, width - peers.length - 1) + ' '
		out += chalk.yellow(peers) + '\n'

		if (this.input) out += chalk.underline(this.input)
		else out += chalk.gray('type a message…')

		this.out.write(this.clear + out)
		this.clear = cli.clear(out)
	}
}

const defaults = {
	messages: [],
	input: '',
	open: false,
	error: null,
	nrOfPeers: 0,
	send: () => {},

	renderInterval: null
}

const createUI = (send) => {
	const ui = Object.assign(Object.create(UI), defaults)
	ui.send = send

	ui.renderInterval = setInterval(() => {
		ui.render()
	}, 10 * 1000)

	const render = (open, messages, err, nrOfPeers) => {
		ui.open = open
		ui.messages = messages
		ui.error = err
		ui.nrOfPeers = nrOfPeers
		ui.render()
	}

	wrap(ui)
	return render
}

module.exports = createUI
