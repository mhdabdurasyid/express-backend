const db = require('../helpers/db')
const table = 'categories'

module.exports = {
  addCategoryModel: (name, cb) => {
    db.query(`insert into ${table} (name) values ('${name.replace(/'/gi, "''")}')`, (error, result, fields) => {
      cb(error, result)
    })
  },
  getCategoriesModel: (cb) => {
    db.query(`select * from ${table} order by name`, (error, result, fields) => {
      cb(error, result)
    })
  },
  updateCategoryModel: (id, name, pathImage, cb) => {
    db.query(`update ${table} set name = '${name.replace(/'/gi, "''")}', img_url = '${pathImage}' where id = ${id}`, (error, result, fields) => {
      cb(error, result)
    })
  },
  deleteCategoryModel: (id, cb) => {
    db.query(`delete from ${table} where id = ${id}`, (error, result, fields) => {
      cb(error, result)
    })
  },
  getDetailCategoryModel: (id, cb) => {
    db.query(`select * from ${table} where id = ${id}`, (error, result, fields) => {
      cb(error, result)
    })
  }
}
