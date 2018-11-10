import classNames from 'classnames'
import { css } from 'emotion'
import * as React from 'react'
import { flexHorizental, flexItemAdaptive, flexItemFix } from '../../style/flex'
import ReminderPage from './Page'
import ReminderQrcodeUrl from './QrcodeUrl'
import ReminderUndoAction from './UndoAction'
import ReminderUserCount from './UserCount'

const ReminderFooter: React.SFC = () => (
	<div className={classNames(flexItemFix, flexHorizental, selfStyle)}>
		<ReminderQrcodeUrl />
		<ReminderUserCount />
		<div className={flexItemAdaptive}/>
		<ReminderUndoAction />
		<ReminderPage />
	</div>
)

export default ReminderFooter

const selfStyle = css`
	height: 48px;
	align-items: center;
	padding-top: 12px;
`
