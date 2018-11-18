// tslint:disable:max-line-length

import classNames from 'classnames'
import { css } from 'emotion'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { flexItemFix, flexVertical } from '../style/flex'
import { getPopupElement } from '../util/dom'

export interface PopupProps {
	isOpen: boolean
	onClose: () => void
	spaceClose?: boolean
	classes?: { root?: string, box?: string }
	styles?: { root?: React.CSSProperties, box?: React.CSSProperties }
}

const BasePopup: React.SFC<PopupProps>
	= ({ isOpen, onClose, spaceClose, children, classes = {}, styles = {} }) => ReactDOM.createPortal(
		<div className={classNames(selfStyle, classes.root)} style={isOpen ? styles.root : { ...styles.root, display: 'none' }}
			onClick={(e) => {
				if (spaceClose && e.currentTarget === e.target && onClose) {
					e.stopPropagation()
					onClose()
				}
			}}>
			{isOpen
				? <div className={classNames(wrapperStyle, classes.box)} style={styles.box}>
					{React.cloneElement(React.Children.only(children), { onClose })}
				</div>
				: null}
		</div>,
		getPopupElement()
	)

export interface PopupChildProps {
	onClose?(): void
}

const Popup: React.SFC<PopupProps> = (props) => {
	const classes = props.classes || {}
	classes.root = classNames(flexVertical, popupCenterStyle, classes.root)
	classes.box = classNames(flexItemFix, classes.box)
	return (
		<BasePopup {...props} classes={classes} />
	)
}

export default Popup

export class ContextMenuPopup extends React.Component<PopupProps, any> {
	render() {
		const { classes = {}, spaceClose, ...rest } = this.props
		classes.root = classNames(contextMenuStyle, classes.root)
		classes.box = classNames(contextMenuWrapperStyle, classes.box)
		const sc = spaceClose === undefined ? true : spaceClose
		return (
			<BasePopup {...rest} spaceClose={sc} classes={classes} />
		)
	}
}

const selfStyle = css`
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	background: rgba(255,255,255,0.5);
`

const wrapperStyle = css`
	box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
	background: white;
`

const popupCenterStyle = css`
	align-items: center;
	justify-content: center;
`

const contextMenuStyle = css`
	background: transparent;
`

const contextMenuWrapperStyle = css`
	position: absolute;
`
