import classNames from 'classnames'
import { css } from 'emotion'
import * as React from 'react'
import { flexHorizental, flexItemAdaptive, flexItemFix, flexVertical } from '../style/flex'
import { ContextMenuPopup } from './Popup'

export default class ContextMenu extends React.Component<any, { open: boolean, popupX: number, popupY: number }> {

	state = {
		open: false,
		popupX: -1,
		popupY: -1
	}

	popupElement: HTMLElement = null

	onTargetClick = (e: React.MouseEvent<HTMLElement>) => {
		const targetEl = e.currentTarget
		this.setState({
			open: true
		}, () => {
			const pos = calPopupPosition(targetEl, this.popupElement, 8)
			this.setState({
				popupX: pos.x,
				popupY: pos.y
			})
		})
	}

	onClose = () => {
		this.setState({
			open: false
		})
	}

	render() {
		const { open, popupX, popupY } = this.state
		const { children } = this.props
		const posStyle: React.CSSProperties = popupX >= 0 && popupY >= 0
			? {
				left: popupX,
				top: popupY
			}
			: null
		let triggerNode: any = null
		const menuItems: any[] = []
		React.Children.forEach(children, (child) => {
			if (!triggerNode) {
				triggerNode = child
			} else {
				menuItems.push(child)
			}
		})
		return (
			<>
				{React.cloneElement(triggerNode, { onClick: this.onTargetClick })}
				<ContextMenuPopup isOpen={open} onClose={this.onClose} styles={{ box: posStyle }}>
					<div ref={(r) => this.popupElement = r}
						className={menuStyle}
						onClick={this.onClose}>
						{menuItems}
					</div>
				</ContextMenuPopup>
			</>
		)
	}
}

export interface ContextMenuItemProps {
	icon?: React.ReactNode
	onClick?(e: React.MouseEvent<HTMLElement>)
	classes?: { root?: string, icon?: string, text?: string }
}

export const ContextMenuItem: React.SFC<ContextMenuItemProps> = ({ children, icon, onClick, classes = {} }) => (
	<div className={classNames(flexHorizental, menuItemStyle, classes.root)} onClick={onClick}>
		<div className={classNames(flexItemFix, flexVertical, menuItemIconStyle, classes.icon)}>{icon}</div>
		<div className={classNames(flexItemAdaptive, menuItemTextStyle, classes.text)}>{children}</div>
	</div>
)

const menuStyle = css`
	min-width: 100px;
`

const menuItemStyle = css`
	padding: 8px 16px 8px 4px;
	color: #666;
	cursor: pointer;
`

const menuItemIconStyle = css`
	width: 28px;
	height: 32px;
	margin-right: 4px;
	align-items: center;
	justify-content: center;
`

const menuItemTextStyle = css`
	height: 32px;
	line-height: 32px;
`

const calPopupPosition = (trigger: HTMLElement, popup: HTMLElement, margin: number = 0) => {
	const wW = window.innerWidth
	const wH = window.innerHeight
	const tX = trigger.offsetLeft
	const tY = trigger.offsetTop
	const tW = trigger.offsetWidth
	const tH = trigger.offsetHeight
	const pW = popup.offsetWidth + margin * 2
	const pH = popup.offsetHeight + margin * 2
	if (tY + tH + pH < wH) {
		// 在下面
		if (tX + pW < wW) {
			// 左对齐
			return {
				x: tX,
				y: tY + tH
			}
		} else {
			return {
				x: tX + tW - pW + margin,
				y: tY + tH
			}
		}
	} else {
		// 在上面
		if (tX + pW < wW) {
			// 左对齐
			return {
				x: tX,
				y: tY - pH + margin
			}
		} else {
			return {
				x: tX + tW - pW + margin,
				y: tY - pH + margin
			}
		}
	}
}
