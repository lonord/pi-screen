import classNames from 'classnames'
import { css } from 'emotion'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import Store from '../../store/ElectronStore'
import { flexHorizental, flexItemFix } from '../../style/flex'
import IconUser from '../../svg/User'

const ReminderUserCount: React.SFC<{ store?: Store }> = ({ store }) => store.onlineUserCount > 0 ? (
	<div className={classNames(flexItemFix, flexHorizental, selfStyle)}>
		<IconUser height={20} width={20} fill="#999" />
		<span className={testStyle}>{store.onlineUserCount}</span>
	</div>
) : null

const selfStyle = css`
	align-items: center;
	height: 34px;
	padding: 0px 12px;
	justify-content: center;
`

const testStyle = css`
	color: #999;
	padding-left: 6px;
	font-weight: bold;
`

export default inject('store')(observer(ReminderUserCount))
