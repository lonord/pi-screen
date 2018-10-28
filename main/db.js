const sqlite3 = require('sqlite3')
const os = require('os')
const path = require('path')
const mkdirp = require('mkdirp')

module.exports = (...sqls) => {
	const cfgDir = path.join(os.homedir(), '.pi-screen')
	mkdirp.sync(cfgDir)
	const dbPath = path.join(cfgDir, 'db.sqlite')
	const db = new sqlite3.Database(dbPath)
	db.serialize()
	sqls && sqls.forEach((sql) => db.run(sql))
	return {
		execute: (sql, ...params) => {
			return new Promise((resolve, reject) => {
				db.run(sql, ...params, function(err) {
					if (err) {
						reject(err.message || err)
					} else {
						resolve({
							changes: this.changes,
							lastID: this.lastID
						})
					}
				})
			})
		},
		query: (sql, ...params) => {
			return new Promise((resolve, reject) => {
				db.all(sql, ...params, (err, rows) => {
					if (err) {
						reject(err.message || err)
					} else {
						resolve(rows)
					}
				})
			})
		}
	}
}