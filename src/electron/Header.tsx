import classNames from 'classnames'
import { css } from 'emotion'
import * as React from 'react'
import { flexHorizental, flexItemAdaptive, flexItemFix } from '../style/flex'
import IconRaspberry from '../svg/Raspberry'
import DateTime from './header/DateTime'

const Header: React.SFC = () => (
	<div className={classNames(flexItemFix, flexHorizental, selfStyle)}>
		<IconRaspberry width={18} height={18} fill="#666" className={classNames(headerItemStyle, iconStyle)} />
		<span className={headerItemStyle}>提醒事项</span>
		<div className={flexItemAdaptive}/>
		<div className={headerItemStyle}>
			<DateTime />
		</div>
	</div>
)

const selfStyle = css`
	height: 30px;
	color: #666;
	align-items: center;
	padding: 0 8px;
	-webkit-app-region: drag;
	box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
`

const iconStyle = css`
	position: relative;
	top: -1px;
	margin-right: 5px;
`

const headerItemStyle = css`
	margin-left: 3px;
	margin-right: 3px;
`

export default Header
