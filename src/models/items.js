const db = require('../helpers/db')
const table = 'items'

module.exports = {
  getDetailItemModel: (id, cb) => {
    db.query(`select * from ${table} where id = ${id}`, (error, result, fields) => {
      cb(error, result)
    })
  },
  addItemModel: (data, cb) => {
    const { name, price, description } = data

    db.query(`insert into ${table} (name, price, description) values ('${name}', ${price}, '${description}')`, (error, result, fields) => {
      cb(error, result)
    })
  },
  updateItemModel: (id, data, cb) => {
    const { name, price, description } = data

    db.query(`update ${table} set name = '${name}', price = ${price}, description = '${description}' where id = '${id}'`, (error, result, fields) => {
      cb(error, result)
    })
  },
  updatePartiallyItemModel: (id, data, cb) => {
    db.query(`update ${table} set ${data} where id = '${id}'`, (error, result, fields) => {
      cb(error, result)
    })
  },
  deleteItemModel: (id, cb) => {
    db.query(`delete from ${table} where id = '${id}'`, (error, result, fields) => {
      cb(error, result)
    })
  },
  getItemsModel: (searchKey, searchValue, page, limit, cb) => {
    db.query(`select * from ${table} where ${searchKey} like '%${searchValue}%' limit ${limit} offset ${(page - 1) * limit}`, (error, result, fields) => {
      cb(error, result)
    })
  },
  countItemsModel: (searchKey, searchValue, cb) => {
    db.query(`select count(*) as count from items where ${searchKey} like '%${searchValue}%'`, (_error, result, fields) => {
      cb(result)
    })
  }
}
