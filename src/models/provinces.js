const db = require('../helpers/db')
const table = 'provinces'

module.exports = {
  getProvincesModel: (cb) => {
    db.query(`select * from ${table}`, (error, result, fields) => {
      cb(error, result)
    })
  }
}
