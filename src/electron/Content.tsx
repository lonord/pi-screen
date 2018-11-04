import classNames from 'classnames'
import { css } from 'emotion'
import * as React from 'react'
import { flexItemAdaptive } from '../style/flex'
import ReminderIndex from './reminder/Index'

const Content: React.SFC = () => (
	<div className={classNames(flexItemAdaptive, selfStyle)}>
		<ReminderIndex/>
	</div>
)

const selfStyle = css`
	position: relative;
	overflow: hidden;
`

export default Content
