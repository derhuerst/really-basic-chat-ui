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

const renderTime = t => Math.abs(t) < 1000 ? 'now' : ms(t)

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

	render: function (first) {
		const now = Date.now()
		const {width: termWidth, height: termHeight} = termSize()
		const msgs = this.messages
		const lines = []

		const rows = []
		const widths = []
		const maxWidth = [1, 4, 6, 0]

		// compute table column widths
		for (let i = msgs.length - 1; i >= 0; i--) {
			const msg = msgs[i]

			const from = cleanStr(msg.from)
			const content = cleanStr(msg.content)
			const row = [
				msg.sending ? '…' : ' ',
				renderTime(now - msg.when),
				from,
				content
			]
			const width = [ // todo: cache width
				1,
				row[1].length, // we don't expect non-ASCII here
				stringWidth(from),
				stringWidth(content)
			]

			if (width[1] > maxWidth[1]) maxWidth[1] = width[1]
			if (width[2] > maxWidth[2]) maxWidth[2] = width[2]
			if (width[3] > maxWidth[3]) maxWidth[3] = width[3]
			rows.push(row)
			widths.push(width)
		}

		// render table
		for (
			let i = rows.length - 1, linesUsed = 0;
			i >= 0 && linesUsed <= termHeight;
			i--
		) {
			const r = rows[i]
			const w = widths[i]

			let pad = maxWidth[0] + maxWidth[1] + 1 + maxWidth[2]
			lines.push((
				r[0] + // sending
				' '.repeat(maxWidth[0] - w[0]) + // padding
				chalk.gray(r[1]) + // when
				' '.repeat(maxWidth[1] - w[1]) + // padding
				chalk.hex(colorHash(r[2]))(r[2]) + // from
				' '.repeat(1 + maxWidth[2] - w[2]) + // padding
				runes.substr(r[3], 0, termWidth - pad) // fill up first line
			))
			linesUsed++

			// fill more lines if necessary
			let start = termWidth - pad
			while (start < w[3]) {
				const chunkWidth = termWidth - pad
				lines.push(' '.repeat(pad) + runes.substr(r[3], start, chunkWidth))
				linesUsed++
				start += chunkWidth
			}
		}

		if (this.messages.length === 0) lines.push(chalk.gray('no messages'))

		if (this.error) {
			const err = this.error.message || (this.error + '')
			lines.push(chalk.red(err.slice(0)))
		}

		if (this.input) {
			// word wrap input
			const w = stringWidth(this.input)
			let start = 0
			while (start < w) {
				const line = runes.substr(this.input, start, termWidth)
				lines.push(chalk.cyan(line))
				start += termWidth
			}
		} else lines.push(chalk.gray('type a message…'))

		this.out.write(lines.slice(-termHeight).join('\n'))
	}
}

const defaults = {
	messages: [],
	input: '',
	open: false,
	error: null,
	send: () => {},

	renderInterval: null
}

const createUI = (send) => {
	const ui = Object.assign(Object.create(UI), defaults)
	ui.send = send

	ui.renderInterval = setInterval(() => {
		ui.render()
	}, 10 * 1000)

	const render = (open, messages, err) => {
		ui.open = open
		ui.messages = messages
		ui.error = err
		ui.render()
	}

	wrap(ui)
	return render
}

module.exports = createUI
