// tslint:disable:max-line-length

import classNames from 'classnames'
import { css } from 'emotion'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { flexItemFix, flexVertical } from '../style/flex'
import { getPopupElement } from '../util/dom'

const Popup: React.SFC<{ isOpen: boolean, onClose: () => void, spaceClose?: boolean }>
	= ({ isOpen, onClose, spaceClose, children }) => ReactDOM.createPortal(
		<div className={classNames(flexVertical, selfStyle)} style={isOpen ? null : { display: 'none' }}
			onClick={(e) => {
				if (spaceClose && e.currentTarget === e.target && onClose) {
					e.stopPropagation()
					onClose()
				}
			}}>
			{isOpen
				? <div className={classNames(flexItemFix, wrapperStyle)}>
					{React.cloneElement(React.Children.only(children), { onClose })}
				</div>
				: null}
		</div>,
		getPopupElement()
	)

export interface PopupChildProps {
	onClose?(): void
}

export default Popup

const selfStyle = css`
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	background: rgba(255,255,255,0.5);
	align-items: center;
	justify-content: center;
	transition: all 0.2s;
`

const wrapperStyle = css`
	box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
`
