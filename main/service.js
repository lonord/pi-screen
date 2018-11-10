const createDB = require('./db')

const REMINDER = {
	ID: 'id',
	CONTENT: 'content',
	COMMENT: 'comment',
	COMPLETE: 'complete',
	CREATE_DATE: 'createDate',
	UPDATE_DATE: 'updateDate',
	LEVEL: 'level',
	ORDER_INDEX: 'orderIndex'
}

exports.createService = () => {
	const db = createDB(
		`create table if not exists reminder (
			${REMINDER.ID} INTEGER PRIMARY KEY AUTOINCREMENT,
			${REMINDER.CONTENT} NVARCHAR(1000),
			${REMINDER.COMMENT} NVARCHAR(2000),
			${REMINDER.COMPLETE} BOOLEAN NOT NULL,
			${REMINDER.CREATE_DATE} TIMESTAMP,
			${REMINDER.UPDATE_DATE} TIMESTAMP,
			${REMINDER.LEVEL} INTEGER,
			${REMINDER.ORDER_INDEX} REAL
		);`
	)
	return {
		addReminder: async (reminder) => {
			reminder[REMINDER.CREATE_DATE] = new Date().getTime()
			reminder[REMINDER.UPDATE_DATE] = new Date().getTime()
			const cols = []
			const values = []
			for (const name of Object.keys(reminder)) {
				if (Object.values(REMINDER).indexOf(name) === -1) {
					throw new Error('Unknow peoperty ' + name)
				}
				cols.push(name)
				values.push(reminder[name])
			}
			const sql = `insert into reminder (${cols.join(',')}) values (${Array(cols.length).fill('?').join(',')})`
			const result = await db.execute(sql, values)
			await db.execute(`update reminder set ${REMINDER.ORDER_INDEX}=${result.lastID} where id=${result.lastID}`)
			return result.changes
		},
		updateReminder: async (id, props) => {
			props[REMINDER.UPDATE_DATE] = new Date().getTime()
			const values = []
			const fragments = []
			for (const name of Object.keys(props)) {
				if (Object.values(REMINDER).indexOf(name) === -1) {
					throw new Error('Unknow peoperty ' + name)
				}
				fragments.push(`${name}=?`)
				values.push(props[name])
			}
			values.push(id)
			const sql = `update reminder set ${fragments.join(',')} where id=?`
			const result = await db.execute(sql, values)
			return result.changes
		},
		removeReminder: async (id) => {
			const result = await db.execute(`delete from reminder where id=?`, id)
			return result.changes
		},
		findReminders: async (skip, count, complete) => {
			const where = `where ${REMINDER.COMPLETE}=${complete ? 1 : 0}`
			const orderBy = `order by ${REMINDER.ORDER_INDEX},${REMINDER.CREATE_DATE} ${complete ? 'desc' : ''}`
			const limit = skip >= 0 && count > 0
				? `limit ${count} offset ${skip}`
				: ''
			const sql = `select * from reminder ${where} ${orderBy} ${limit}`
			const resultList = await db.query(sql)
			return resultList
		}
	}
}

exports.REMINDER = REMINDER
