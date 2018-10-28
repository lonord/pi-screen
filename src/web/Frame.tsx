import { css } from 'emotion'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { Reminder } from '../store/types'
import Store from '../store/WebStore'
import ReminderForm from './ReminderForm'

export interface FrameProps {
	store?: Store
}

@inject('store')
@observer
export default class Frame extends React.Component<FrameProps, any> {

	addOrUpdateReminder = (r: Partial<Reminder>, id: number) => {
		const { store } = this.props
		if (id) {
			//
		} else {
			store.addReminder(r).then(() => {
				return store.fetchRemindersAll()
			}).catch((err) => console.error(err))
		}
	}

	deleteReminder = (id: number) => {
		const { store } = this.props
		store.removeReminder(id).then(() => {
			return store.fetchRemindersAll()
		}).catch((err) => console.error(err))
	}

	loadMore = () => {
		const { store } = this.props
		store.fetchRemindersMore().catch((err) => console.error(err))
	}

	render() {
		const { store } = this.props
		const onlineUserCount = store ? store.onlineUserCount : 0
		const reminders = store.reminders
		return (
			<div>
				<div>{'online user count ' + onlineUserCount}</div>
				<div>
					<ReminderForm onEditComplete={this.addOrUpdateReminder}/>
				</div>
				<div>
					{reminders.map((r) => (
						<div key={r.id}>
							<span>{`${r.id}; ${r.content}; ${r.comment}; ${r.level}; ${r.orderIndex}`}</span>
							<button onClick={() => this.deleteReminder(r.id)}>删除</button>
						</div>
					))}
				</div>
				{store.reminderHasMore
					? <div>
						<button onClick={this.loadMore}>加载更多</button>
					</div>
					: null}
			</div>
		)
	}
}
