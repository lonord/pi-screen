import classNames from 'classnames'
import { css } from 'emotion'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import Store from '../../store/ElectronStore'
import { flexItemAdaptive, flexVertical } from '../../style/flex'
import ReminderListItem from './ListItem'

const ReminderList: React.SFC<{ store?: Store }> = ({ store }) => (
	<div className={classNames(flexItemAdaptive, flexVertical, selfStyle)}>
		{store.reminders.map((reminder, idx) => (
			<ReminderListItem
				key={reminder.id}
				reminder={reminder}
				showUnderscore={idx > 0}
				size="20%" />
		))}
	</div>
)

export default inject('store')(observer(ReminderList))

const selfStyle = css`
	border-bottom: 1px solid #ccc;
`
