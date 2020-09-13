const db = require('../helpers/db')
const table = 'categories'

module.exports = {
  addCategoryModel: (name, cb) => {
    db.query(`insert into ${table} (name) values ('${name.replace(/'/gi, "''")}')`, (error, result, fields) => {
      cb(error, result)
    })
  },
  getCategoriesModel: (cb) => {
    db.query(`select * from ${table}`, (error, result, fields) => {
      cb(error, result)
    })
  },
  updateCategoryModel: (id, name, cb) => {
    db.query(`update ${table} set name = '${name}' where id = ${id}`, (error, result, fields) => {
      cb(error, result)
    })
  },
  deleteCategoryModel: (id, cb) => {
    db.query(`delete from ${table} where id = ${id}`, (error, result, fields) => {
      cb(error, result)
    })
  }
}
