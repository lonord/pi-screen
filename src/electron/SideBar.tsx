import classNames from 'classnames'
import { css } from 'emotion'
import * as React from 'react'
import { flexItemAdaptive, flexItemFix, flexVertical } from '../style/flex'
import IconSetting from '../svg/Setting'

const SideBar: React.SFC = () => (
	<div className={classNames(flexItemFix, flexVertical, selfStyle)}>
		<div className={flexItemAdaptive} />
		<div className={classNames(flexItemFix, flexVertical, settingAreaStyle)}>
			<IconSetting height={32} width={32} fill="#999"/>
		</div>
	</div>
)

export default SideBar

const selfStyle = css`
	width: 72px;
	padding-top: 10px;
	align-items: center;
`

const settingAreaStyle = css`
	height: 78px;
	width: 72px;
	align-items: center;
	justify-content: center;
	cursor: pointer;
`

const settingIconStyle = css`
	height: 60px;
	justify-self: flex-end;
`
