const express = require('express')
const cors = require('cors')
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const os = require('os')
const path = require('path')
const createEventEmitter = require('./event')

module.exports = (service, port) => {
	if (!port) {
		port = 8070
	}
	app.use(cors())
	app.use(express.static(path.join(__dirname, '../dist')))

	let onlineUserCount = 0

	io.on('connection', function (socket) {
		console.log('a user connected');
		const eventEmitter = createEventEmitter()
		onlineUserCount++
		eventEmitter.emitOnlineUserChange(onlineUserCount)
		socket.on('disconnect', () => {
			console.log('user disconnected');
			onlineUserCount--
			eventEmitter.emitOnlineUserChange(onlineUserCount)
			eventEmitter.destroy()
		})

		socket.on('addReminder', (reminder, fn) => {
			service.addReminder(reminder)
				.then(() => fn && fn({ data: 'OK' }))
				.catch((err) => fn && fn({ err }))
				.then(() => eventEmitter.emitReminderUpdate())
		})
		socket.on('updateReminder', (id, props, fn) => {
			service.updateReminder(id, props)
				.then(() => fn && fn({ data: 'OK' }))
				.catch((err) => fn && fn({ err }))
				.then(() => eventEmitter.emitReminderUpdate())
		})
		socket.on('removeReminder', (id, fn) => {
			service.removeReminder(id)
				.then(() => fn && fn({ data: 'OK' }))
				.catch((err) => fn && fn({ err }))
				.then(() => eventEmitter.emitReminderUpdate())
		})
		socket.on('findReminders', (skip, count, complete, fn) => {
			service.findReminders(skip, count, complete)
				.then((list) => fn && fn({ data: list }))
				.catch((err) => fn && fn({ err }))
		})
		socket.on('getOnlineUserCount', (fn) => {
			fn && fn({ data: onlineUserCount })
		})

		eventEmitter.onReminderUpdate(() => {
			socket.emit('onReminderUpdate')
		})
		eventEmitter.onOnlineUserChange((count) => {
			socket.emit('onOnlineUserChange', count)
		})
	});

	http.listen(port, function () {
		console.log(`listening on *:${port}`);
	});

	return {
		getOnlineUserCount: () => onlineUserCount,
		getServerUrls: () => {
			const ifs = os.networkInterfaces()
			return Object.keys(ifs)
				.map((ifname) => ifs[ifname])
				.map((ifinfos) => ifinfos.filter((ifinfo) => ifinfo.family === 'IPv4' && !ifinfo.internal)[0])
				.filter((ifinfos) => !!ifinfos)
				.map((ifinfos) => ifinfos.address)
				.map((addr) => `http://${addr}:${port}`)
		}
	}
}
