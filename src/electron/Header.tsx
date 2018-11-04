import classNames from 'classnames'
import { css } from 'emotion'
import * as React from 'react'
import { flexHorizental, flexItemFix } from '../style/flex'
import IconRaspberry from '../svg/Raspberry'

const Header: React.SFC = () => (
	<div className={classNames(flexItemFix, flexHorizental, selfStyle)}>
		<IconRaspberry width={18} height={18}/>
		<span>PI SCREEN</span>
	</div>
)

const selfStyle = css`
	height: 24px;
	align-items: center;
	padding: 0 8px;
`

export default Header
