const db = require('../helpers/db')
const table = 'colors'

module.exports = {
  addColorModel: (name, cb) => {
    db.query(`insert into ${table} (name) values ('${name.replace(/'/gi, "''")}')`, (error, result, fields) => {
      cb(error, result)
    })
  },
  getColorsModel: (cb) => {
    db.query(`select * from ${table} order by name`, (error, result, fields) => {
      cb(error, result)
    })
  },
  updateColorModel: (id, name, cb) => {
    db.query(`update ${table} set name = '${name.replace(/'/gi, "''")}' where id = ${id}`, (error, result, fields) => {
      cb(error, result)
    })
  },
  deleteColorModel: (id, cb) => {
    db.query(`delete from ${table} where id = ${id}`, (error, result, fields) => {
      cb(error, result)
    })
  }
}
