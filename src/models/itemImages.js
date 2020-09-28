const db = require('../helpers/db')
const table = 'item_images'

module.exports = {
  addItemImageModel: (url, id, cb) => {
    db.query(`insert into ${table} (url, item_id) values ('${url}', ${id})`, (error, result, fields) => {
      cb(error, result)
    })
  }
}
