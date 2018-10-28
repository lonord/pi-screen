import { action, configure, observable, runInAction } from 'mobx'
import io from 'socket.io-client'
import { Reminder } from './types'

declare var WS_URL: string
const wsUrl = WS_URL
const PAGE_SIZE = 10

configure({ enforceActions: 'always' })

export default class Store {
	socket: SocketIOClient.Socket = null
	@observable onlineUserCount: number = 0
	@observable reminders: Reminder[] = []
	@observable reminderLoadedPage: number = 0
	@observable reminderHasMore: boolean = false

	constructor() {
		this.socket = io(wsUrl)
		this.socket.on('onReminderUpdate', () => this.onReminderUpdate())
		this.socket.on('onOnlineUserChange', (count) => this.onOnlineUserChange(count))

		this.fetchOnlineUserCount()
		this.fetchRemindersAll()
	}

	@action.bound
	async fetchOnlineUserCount() {
		const count = await this.wsCall('getOnlineUserCount')
		runInAction(() => {
			this.onlineUserCount = count
		})
	}

	@action.bound
	async fetchRemindersAll() {
		const pageToFetch = this.reminderLoadedPage > 1 ? this.reminderLoadedPage : 1
		const realCount = pageToFetch * PAGE_SIZE
		const countToFetch = realCount + 1
		const list = await this.wsCall('findReminders', 0, countToFetch, false)
		runInAction(() => {
			if (list instanceof Array) {
				if (list.length > 0) {
					if (list.length >= countToFetch) {
						this.reminderHasMore = true
						this.reminders = list.slice(0, realCount)
					} else {
						this.reminderHasMore = false
						this.reminders = list
					}
					this.reminderLoadedPage = pageToFetch
				} else {
					this.reminderLoadedPage = 0
				}
			}
		})
	}

	@action.bound
	async fetchRemindersMore() {
		if (this.reminderLoadedPage * PAGE_SIZE > this.reminders.length) {
			return
		} else if (this.reminderLoadedPage * PAGE_SIZE < this.reminders.length) {
			runInAction(() => {
				this.reminders = this.reminders.slice(0, this.reminderLoadedPage * PAGE_SIZE)
			})
		}
		const realCount = PAGE_SIZE
		const countToFetch = realCount + 1
		const list = await this.wsCall('findReminders', this.reminderLoadedPage * PAGE_SIZE, countToFetch, false)
		runInAction(() => {
			if (list instanceof Array) {
				if (list.length > 0) {
					if (list.length >= countToFetch) {
						this.reminderHasMore = true
						const chunk = list.slice(0, realCount)
						this.reminders.push(...chunk)
					} else {
						this.reminderHasMore = false
						this.reminders.push(...list)
					}
					this.reminderLoadedPage = this.reminderLoadedPage + 1
				} else {
					this.reminderHasMore = false
				}
			}
		})
	}

	@action.bound
	async addReminder(reminder: Partial<Reminder>) {
		await this.wsCall('addReminder', reminder)
	}

	@action.bound
	async removeReminder(id: number) {
		await this.wsCall('removeReminder', id)
	}

	@action.bound
	async updateReminder(id: number, reminderProps: Partial<Reminder>) {
		await this.wsCall('updateReminder', id, reminderProps)
	}

	@action.bound
	async reorderReminder(id: number, leftOrderIndex: number, rightOrderIndex: number) {
		const newOrderIndex = leftOrderIndex <= 0
			? rightOrderIndex / 2
			: rightOrderIndex > 0
				? (rightOrderIndex + leftOrderIndex) / 2
				: Math.ceil(leftOrderIndex) === leftOrderIndex
					? leftOrderIndex + 0.5
					: (Math.ceil(leftOrderIndex) + leftOrderIndex) / 2
		await this.wsCall('updateReminder', id, {
			orderIndex: newOrderIndex
		})
	}

	@action.bound
	onReminderUpdate() {
		this.fetchRemindersAll()
	}

	@action.bound
	onOnlineUserChange(count: number) {
		this.onlineUserCount = count
	}

	wsCall(event: string, ...args: any[]): Promise<any> {
		return new Promise((resolve, reject) => {
			if (args && args.length > 0 && Object.prototype.toString.call(args[args.length - 1]) === '[object Function]') {
				Array.prototype.splice.call(args, args.length - 1, 1)
			}
			this.socket.emit(event, ...args, (result) => {
				if (result && result.err) {
					reject(result.err)
				} else {
					resolve(result.data ? result.data : result)
				}
			})
		})
	}
}
