const EventEmitter = require('events');

const EVENT_REMINDER_UPDATE = 'event-reminder-update'
const EVENT_ONLINE_USER_CHANGE = 'event-online-user-change'

const emitters = []

module.exports = () => {
	const emitter = new EventEmitter()
	emitters.push(emitter)
	return {
		onReminderUpdate: (fn) => {
			emitter.on(EVENT_REMINDER_UPDATE, fn)
		},
		emitReminderUpdate: (...args) => {
			for (const em of emitters) {
				if (em !== emitter) {
					em.emit(EVENT_REMINDER_UPDATE, ...args)
				}
			}
		},
		onOnlineUserChange: (fn) => {
			emitter.on(EVENT_ONLINE_USER_CHANGE, fn)
		},
		emitOnlineUserChange: (...args) => {
			for (const em of emitters) {
				if (em !== emitter) {
					em.emit(EVENT_ONLINE_USER_CHANGE, ...args)
				}
			}
		},
		destroy: () => {
			emitter.removeAllListeners()
			const idx = emitters.indexOf(emitter)
			if (idx >= 0) {
				emitters.splice(idx, 1)
			}
		}
	}
}