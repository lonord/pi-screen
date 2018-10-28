export enum ReminderLevel {
	NON_EMERGENCY = -1,
	NORMAL = 0,
	EMERGENCY = 1
}

export interface Reminder {
	readonly id: number
	content: string
	comment: string
	complete: boolean
	level: ReminderLevel
	orderIndex: number
	readonly createDate: number
	readonly updateDate: number
}
