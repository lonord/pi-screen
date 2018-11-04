import classNames from 'classnames'
import { css } from 'emotion'
import * as React from 'react'
import { flexVertical } from '../../style/flex'
import ReminderFooter from './Footer'
import ReminderList from './List'

const ReminderIndex: React.SFC = () => (
	<div className={classNames(flexVertical, selfStyle)}>
		<ReminderList />
		<ReminderFooter />
	</div>
)

export default ReminderIndex

const selfStyle = css`
	height: 100%;
	width: 100%;
	padding: 20px 40px 20px 20px;
`
