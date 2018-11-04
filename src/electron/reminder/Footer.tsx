import classNames from 'classnames'
import { css } from 'emotion'
import * as React from 'react'
import { flexHorizental, flexItemFix } from '../../style/flex'
import ReminderPage from './Page'

const ReminderFooter: React.SFC = () => (
	<div className={classNames(flexItemFix, flexHorizental, selfStyle)}>
		<ReminderPage />
	</div>
)

export default ReminderFooter

const selfStyle = css`
	height: 48px;
	justify-content: flex-end;
	align-items: center;
	padding-top: 12px;
`
