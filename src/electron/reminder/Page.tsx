import classNames from 'classnames'
import { css } from 'emotion'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import Button from '../../base/Button'
import Store from '../../store/ElectronStore'
import { flexHorizental, flexItemFix } from '../../style/flex'

const ReminderPage: React.SFC<{ store?: Store }> = ({ store }) => (
	<div className={classNames(flexItemFix, flexHorizental, selfStyle)}>
		<Button onClick={() => store.fetchFirstPageReminders()}
			disabled={store.reminderPageIndex === 0}>首页</Button>
		<Button onClick={() => store.fetchPrevPageReminders()}
			disabled={store.reminderPageIndex === 0}>上一页</Button>
		<span className={pageTextStyle}>{store.reminderPageIndex + 1}</span>
		<Button onClick={() => store.fetchNextPageReminders()}
			disabled={!store.reminderHasMore}>下一页</Button>
	</div>
)

export default inject('store')(observer(ReminderPage))

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
