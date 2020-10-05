const db = require('../helpers/db')
const table = 'cities'

module.exports = {
  getCitiesModel: (cb) => {
    db.query(`select * from ${table}`, (error, result, fields) => {
      cb(error, result)
    })
  }
}
