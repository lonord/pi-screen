import { css } from 'emotion'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { Reminder, ReminderLevel } from '../store/types'

export interface ReminderFormProps {
	reminder?: Reminder
	onEditComplete(reminder: Partial<Reminder>, id?: number)
}

interface ReminderFormState {
	content: string
	comment: string
	level: ReminderLevel
}

export default class ReminderForm extends React.Component<ReminderFormProps, ReminderFormState> {

	constructor(props) {
		super(props)
		const r = props.reminder as Reminder
		this.state = r
			? {
				content: r.content,
				comment: r.comment,
				level: r.level
			}
			: {
				content: '',
				comment: '',
				level: ReminderLevel.NORMAL
			}
	}

	onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const { reminder, onEditComplete } = this.props
		const { content, comment, level } = this.state
		if (reminder) {
			const r: Partial<Reminder> = {}
			if (content !== reminder.content) {
				r.content = content
			}
			if (comment !== reminder.comment) {
				r.comment = comment
			}
			if (level !== reminder.level) {
				r.level = level
			}
			onEditComplete(r, reminder.id)
		} else {
			onEditComplete({
				content,
				comment,
				level,
				complete: false
			})
			this.setState({
				content: '',
				comment: '',
				level: ReminderLevel.NORMAL
			})
		}
	}

	render() {
		const { content, comment, level } = this.state
		return (
			<form onSubmit={this.onSubmit}>
				<div>
					<input name="content" value={content} onChange={(e) => this.setState({ content: e.target.value })} />
				</div>
				<div>
					<input name="comment" value={comment} onChange={(e) => this.setState({ comment: e.target.value })} />
				</div>
				<div>
					<input type="radio" name="level" checked={level === ReminderLevel.NON_EMERGENCY}
						onChange={(e) => e.target.checked && this.setState({ level: ReminderLevel.NON_EMERGENCY })} />
					<span>不紧急</span>
					<input type="radio" name="level" checked={level === ReminderLevel.NORMAL}
						onChange={(e) => e.target.checked && this.setState({ level: ReminderLevel.NORMAL })} />
					<span>普通</span>
					<input type="radio" name="level" checked={level === ReminderLevel.EMERGENCY}
						onChange={(e) => e.target.checked && this.setState({ level: ReminderLevel.EMERGENCY })} />
					<span>紧急</span>
				</div>
				<div>
					<input type="submit" value="新增"/>
				</div>
			</form>
		)
	}
}
