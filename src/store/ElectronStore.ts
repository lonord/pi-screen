import { ipcRenderer } from 'electron'
import ipc from 'electron-better-ipc'
import { action, computed, configure, observable, runInAction } from 'mobx'

configure({ enforceActions: 'always' })

export default class Store {
	@observable onlineUserCount: number = 0

	constructor() {
		ipcRenderer.on('onReminderUpdate', () => this.onReminderUpdate())
		ipcRenderer.on('onOnlineUserChange', (_, count) => this.onOnlineUserChange(count))

		this.fetchOnlineUserCount()
	}

	@action.bound
	async fetchOnlineUserCount() {
		const count = await ipc.callMain('getOnlineUserCount')
		runInAction(() => {
			this.onlineUserCount = count
		})
	}

	@action.bound
	onReminderUpdate() {
		//
	}

	@action.bound
	onOnlineUserChange(count: number) {
		this.onlineUserCount = count
	}
}
