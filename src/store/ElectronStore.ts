import { ipcRenderer } from 'electron'
import ipc from 'electron-better-ipc'
import { action, computed, configure, observable, runInAction } from 'mobx'
import { Reminder } from './types'

const PAGE_SIZE = 5

configure({ enforceActions: 'always' })

export default class Store {
	@observable onlineUserCount: number = 0
	@observable reminders: Reminder[] = []
	@observable reminderPageIndex: number = 0
	@observable reminderHasMore: boolean = false

	constructor() {
		ipcRenderer.on('onReminderUpdate', () => this.onReminderUpdate())
		ipcRenderer.on('onOnlineUserChange', (_, count) => {
			this.onOnlineUserChange(count)
		})

		this.fetchOnlineUserCount()
		this.fetchCurrentPageReminders()
	}

	@action.bound
	async fetchOnlineUserCount() {
		const count = await ipc.callMain('getOnlineUserCount')
		runInAction(() => {
			this.onlineUserCount = count
		})
	}

	@action.bound
	async fetchCurrentPageReminders() {
		const result = await this.fetchReminders(this.reminderPageIndex)
		if (result.reminders.length === 0 && this.reminderPageIndex > 0) {
			runInAction(() => {
				this.reminderPageIndex = this.reminderPageIndex - 1
			})
			await this.fetchCurrentPageReminders()
			return
		}
		runInAction(() => {
			this.reminders = this.trimReminders(result.reminders)
			this.reminderHasMore = result.hasMore
		})
	}

	@action.bound
	async fetchNextPageReminders() {
		const nextIndex = this.reminderPageIndex + 1
		const result = await this.fetchReminders(nextIndex)
		runInAction(() => {
			if (result.reminders.length > 0) {
				this.reminders = this.trimReminders(result.reminders)
				this.reminderHasMore = result.hasMore
				this.reminderPageIndex = nextIndex
			} else {
				this.reminderHasMore = false
			}
		})
	}

	@action.bound
	async fetchPrevPageReminders() {
		const prevIndex = this.reminderPageIndex - 1
		if (prevIndex < 0) {
			return
		}
		const result = await this.fetchReminders(prevIndex)
		runInAction(() => {
			this.reminders = this.trimReminders(result.reminders)
			this.reminderHasMore = result.hasMore
			this.reminderPageIndex = prevIndex
		})
	}

	async fetchFirstPageReminders() {
		const result = await this.fetchReminders(0)
		runInAction(() => {
			this.reminders = this.trimReminders(result.reminders)
			this.reminderHasMore = result.hasMore
			this.reminderPageIndex = 0
		})
	}

	@action.bound
	onReminderUpdate() {
		this.fetchCurrentPageReminders()
	}

	@action.bound
	onOnlineUserChange(count: number) {
		this.onlineUserCount = count
	}

	async fetchReminders(pageIndex: number): Promise<{ reminders: Reminder[], hasMore: boolean }> {
		const reminders = await ipc.callMain('findReminders', [pageIndex * PAGE_SIZE, PAGE_SIZE + 1, false])
		return reminders
			? {
				reminders,
				hasMore: reminders.length > PAGE_SIZE
			} : {
				reminders: [],
				hasMore: false
			}
	}

	trimReminders(reminders: Reminder[]): Reminder[] {
		if (reminders.length > PAGE_SIZE) {
			return reminders.slice(0, PAGE_SIZE)
		} else {
			return reminders
		}
	}
}
