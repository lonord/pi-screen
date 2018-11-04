import classNames from 'classnames'
import { css } from 'emotion'
import * as React from 'react'
import { flexHorizental, flexItemAdaptive, flexVertical } from '../style/flex'
import Content from './Content'
import Header from './Header'
import SideBar from './SideBar'

const Frame: React.SFC = () => (
	<div className={classNames(flexVertical, selfStyle)}>
		<Header />
		<div className={classNames(flexItemAdaptive, flexHorizental)}>
			<Content />
			<SideBar />
		</div>
		{/* <div>{'online user count ' + onlineUserCount}</div>
				{store.reminders.map((reminder) => (
					<div key={reminder.id}>
						<span>{reminder.content}</span>
						<span>,</span>
						<span>{reminder.comment}</span>
					</div>
				))}
				<div>
					{store.reminderPageIndex > 0
						? <button onClick={() => store.fetchFirstPageReminders()}>first</button>
						: null}
					{store.reminderPageIndex > 0
						? <button onClick={() => store.fetchPrevPageReminders()}>prev</button>
						: null}
					<span>{store.reminderPageIndex + 1}</span>
					{store.reminderHasMore
						? <button onClick={() => store.fetchNextPageReminders()}>next</button>
						: null}
				</div> */}
	</div>
)

const selfStyle = css`
	height: 100%;
`

export default Frame
