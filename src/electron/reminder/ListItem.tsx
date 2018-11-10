import classNames from 'classnames'
import { css } from 'emotion'
import * as React from 'react'
import { Reminder, ReminderLevel } from '../../store/types'
import { flexHorizental, flexItemAdaptive, flexItemFix, flexVertical } from '../../style/flex'
import IconCheck from '../../svg/Check'

export interface ReminderListItemProps {
	reminder: Reminder
	size: any
	showUnderscore?: boolean
	onComplete(): void
}

interface ReminderListItemState {
	checked: boolean
}

class ReminderListItem extends React.Component<ReminderListItemProps, ReminderListItemState> {

	state = {
		checked: false
	}

	check = () => {
		if (this.state.checked) {
			return
		}
		this.setState({
			checked: true
		}, () => setTimeout(() => {
			this.props.onComplete()
		}, 800))
	}

	render() {
		const { reminder, showUnderscore, size } = this.props
		const { checked } = this.state
		const iconSize = checked ? 32 : 24
		const iconColor = checked ? '#3498db' : '#ccc'
		return (
			<div className={classNames(flexHorizental, selfStyle)} style={{ height: size }}>
				<div className={classNames(
					flexItemAdaptive,
					mainAreaStyle,
					showUnderscore ? underscoreStyle : null
				)}>
					<div className={classNames(flexVertical, contentTextWrapperStyle)}>
						<div className={contentTextStyle}>
							{reminder.level === ReminderLevel.EMERGENCY
								? <span className={classNames(levelMarkStyle, levelMarkEmeStyle)}>!</span>
								: null}
							{reminder.level === ReminderLevel.NON_EMERGENCY
								? <span className={classNames(levelMarkStyle, levelMarkNonEmeStyle)}>~</span>
								: null}
							<span>{reminder.content}</span>
						</div>
					</div>
					<div className={commentTextStyle}>{reminder.comment}</div>
				</div>
				<div className={classNames(flexItemFix, flexVertical, sideAreaStyle)} onClick={() => this.check()}>
					<IconCheck width={iconSize} height={iconSize} fill={iconColor} className={sideAreaTextStyle}/>
					<div className={sideAreaTextStyle} style={{ color: iconColor }}>完成</div>
				</div>
			</div>
		)
	}
}

export default ReminderListItem

const selfStyle = css`
`

const mainAreaStyle = css`
	padding: 4px;
	border-bottom: 1px solid transparent;
`

const sideAreaStyle = css`
	width: 72px;
	justify-content: center;
	align-items: center;
	font-size: 12px;
	color: #ccc;
	cursor: pointer;
`

const sideAreaTextStyle = css`
	transition: all 0.3s;
`

const contentTextWrapperStyle = css`
	height: 44px;
	justify-content: center;
`

const contentTextStyle = css`
	font-size: 18px;
	color: #444;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
`

const commentTextStyle = css`
	font-size: 12px;
	color: #aaa;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`

const underscoreStyle = css`
	border-top: 1px solid #eee;
`

const levelMarkStyle = css`
	display: inline-block;
	width: 20px;
	text-align: center;
`

const levelMarkEmeStyle = css`
	color: red;
`

const levelMarkNonEmeStyle = css`
	color: #ccc;
`
