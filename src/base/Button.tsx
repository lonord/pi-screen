import classNames from 'classnames'
import { css } from 'emotion'
import * as React from 'react'

const Button: React.SFC<{ onClick: () => void, disabled?: boolean, cls?: string }>
	= ({ onClick, disabled, cls, children }) => (
		<button onClick={onClick} className={classNames(selfStyle, cls)} disabled={disabled}>{children}</button>
	)

export default Button

const selfStyle = css`
	outline: none;
	padding: 8px 16px;
	margin-left: 6px;
	font-size: 14px;
	cursor: pointer;
	border: 1px solid #eee;
	border-radius: 4px;
	color: #666;
	background: white;
	&:disabled {
		cursor: auto;
		color: #eee;
	}
`
