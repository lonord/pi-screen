import classNames from 'classnames'
import { css } from 'emotion'
import * as React from 'react'
import { flexHorizental, flexItemFix } from '../../style/flex'
import IconQrcode from '../../svg/Qrcode'

const ReminderQrcodeUrl: React.SFC = () => (
	<div className={classNames(flexItemFix, flexHorizental, selfStyle)}>
		<IconQrcode height={24} width={24} fill="#999"/>
	</div>
)

const selfStyle = css`
	align-items: center;
	height: 34px;
	width: 34px;
	justify-content: center;
	cursor: pointer;
`

export default ReminderQrcodeUrl
