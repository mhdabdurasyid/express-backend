const db = require('../helpers/db')
const table = 'conditions'

module.exports = {
  addConditionModel: (name, cb) => {
    db.query(`insert into ${table} (name) values ('${name.replace(/'/gi, "''")}')`, (error, result, fields) => {
      cb(error, result)
    })
  },
  getConditionsModel: (cb) => {
    db.query(`select * from ${table}`, (error, result, fields) => {
      cb(error, result)
    })
  },
  updateConditionModel: (id, name, cb) => {
    db.query(`update ${table} set name = '${name.replace(/'/gi, "''")}' where id = ${id}`, (error, result, fields) => {
      cb(error, result)
    })
  },
  deleteConditionModel: (id, cb) => {
    db.query(`delete from ${table} where id = ${id}`, (error, result, fields) => {
      cb(error, result)
    })
  }
}
