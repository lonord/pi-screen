import classNames from 'classnames'
import { css } from 'emotion'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import Button from '../../base/Button'
import Store from '../../store/ElectronStore'
import { flexItemFix } from '../../style/flex'

const ReminderUndoAction: React.SFC<{ store?: Store }> = ({ store }) => store.undoReminderId !== -1 ? (
	<div className={classNames(flexItemFix, selfStyle)}>
		<Button onClick={() => store.undoCompleteReminder()} cls={buttonStyle}>撤销完成</Button>
	</div>
) : null

export default inject('store')(observer(ReminderUndoAction))

const selfStyle = css`
	align-items: center;
	padding-right: 10px;
`

const buttonStyle = css`
	color: #f50057;
	border-color: #f73378;
`
