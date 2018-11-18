import classNames from 'classnames'
import { css } from 'emotion'
import * as React from 'react'
import ContextMenu, { ContextMenuItem } from '../base/ContextMenu'
import { flexItemAdaptive, flexItemFix, flexVertical } from '../style/flex'
import IconExit from '../svg/Exit'
import IconPower from '../svg/Power'
import IconSetting from '../svg/Setting'

const SideBar: React.SFC = () => (
	<div className={classNames(flexItemFix, flexVertical, selfStyle)}>
		<div className={flexItemAdaptive} />
		<ContextMenu>
			<div className={classNames(flexItemFix, flexVertical, settingAreaStyle)}>
				<IconSetting height={32} width={32} fill="#999" />
			</div>
			<ContextMenuItem
				icon={<IconExit height={18} width={18} fill="#999" />}
				onClick={() => window.close()}>退出应用程序</ContextMenuItem>
			<ContextMenuItem icon={<IconPower height={18} width={18} fill="#999" />}>关闭系统</ContextMenuItem>
		</ContextMenu>
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
