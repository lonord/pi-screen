import classNames from 'classnames'
import { css } from 'emotion'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import Store from '../../store/ElectronStore'
import { flexHorizental, flexItemFix } from '../../style/flex'

const ReminderPage: React.SFC<{ store?: Store }> = ({ store }) => (
	<div className={classNames(flexItemFix, flexHorizental, selfStyle)}>
		<PageButton onClick={() => store.fetchFirstPageReminders()}
			disabled={store.reminderPageIndex === 0}>首页</PageButton>
		<PageButton onClick={() => store.fetchPrevPageReminders()}
			disabled={store.reminderPageIndex === 0}>上一页</PageButton>
		<span className={pageTextStyle}>{store.reminderPageIndex + 1}</span>
		<PageButton onClick={() => store.fetchNextPageReminders()}
			disabled={!store.reminderHasMore}>下一页</PageButton>
	</div>
)

export default inject('store')(observer(ReminderPage))

const PageButton: React.SFC<{ onClick: () => void, disabled?: boolean }> = ({ onClick, disabled, children }) => (
	<button onClick={onClick} className={classNames(pageButtonStyle)} disabled={disabled}>{children}</button>
)

const selfStyle = css`
	align-items: center;
`

const pageTextStyle = css`
	display: inline-block;
	width: 60px;
	text-align: center;
	color: #666;
	margin-left: 6px;
`

const pageButtonStyle = css`
	outline: none;
	padding: 8px 16px;
	margin-left: 6px;
	font-size: 14px;
	cursor: pointer;
	border: 1px solid #eee;
	border-radius: 4px;
	color: #666;
	&:disabled {
		cursor: auto;
		color: #eee;
	}
`
