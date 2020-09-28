const db = require('../helpers/db')
const table = 'item_images'

module.exports = {
  addItemImageModel: (url, id, cb) => {
    db.query(`insert into ${table} (url, item_id) values ('${url}', ${id})`, (error, result, fields) => {
      cb(error, result)
    })
  },
  getItemImageModel: (id, cb) => {
    db.query(`select * from ${table} where item_id = ${id}`, (error, result, fields) => {
      cb(error, result)
    })
  },
  updateItemImageModel: (url, id, cb) => {
    db.query(`update ${table} set url = '${url}' where id = ${id}`, (error, result, fields) => {
      cb(error, result)
    })
  }
}
