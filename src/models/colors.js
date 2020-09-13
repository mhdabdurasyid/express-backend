const db = require('../helpers/db')
const table = 'colors'

module.exports = {
  addColorModel: (name, cb) => {
    db.query(`insert into ${table} (name) values ('${name.replace(/'/gi, "''")}')`, (error, result, fields) => {
      cb(error, result)
    })
  },
  getColorsModel: (cb) => {
    db.query(`select * from ${table}`, (error, result, fields) => {
      cb(error, result)
    })
  }
}
